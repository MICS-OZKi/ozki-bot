import React from "react";
import Image from "next/image"
import {
  AlertColor,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
} from "@mui/material";
import Router from "next/router";
import {
  OracleBasedAPIURL,
  PayPalSubscriptionPlanId,
  proofFileName,
} from "@/config/config";
import { sendRequestExternalAPI } from "@/utils/request";
import Cookies from "js-cookie";
import MainPageError from "@/components/mainPageError";
import ExitButton from "@/components/exitButton";
import { generator } from "ozki-lib/dist/proof-generator/src";
import { errorCode } from "@/config/code";
import { ZkUtils } from "ozki-lib/dist/common/src";

interface oracleSubscriptionInputData {
  code: string;
  subscriptionID: string;
}

interface subscriptionData {
  subsPlanID: string;
  timestamp: number;
  subsAge: number;
  signature: Array<any>;
  error?: string;
  error_description?: string;
}

interface inputPayPalObject {
  payment_subs_id: number[]; // payment plan id
  pa: number[];
}

interface ComponentProps {
  setIsExitButton: (isExitButton: boolean) => void;
}

class Main extends React.Component<ComponentProps> {
  state = {
    errorTitle: "",
    errorDescription: "",
    severity: "",
    isLoading: false,
    subscription: "",
    proof: "",
    showReLoginButtonError: true,
  };

  handleError = (
    errorTitle: string,
    errorDescription: string,
    severity: AlertColor = "error",
    showReLoginButtonError: boolean = true
  ): void => {
    this.setState({
      errorTitle: errorTitle,
      errorDescription: errorDescription,
      severity: severity,
      showReLoginButtonError: showReLoginButtonError,
    });
  };

  getPayPalSubscriptionData = async (
    code: string,
    subscriptionID: string
  ): Promise<any> => {
    const data: oracleSubscriptionInputData = {
      code: code,
      subscriptionID: subscriptionID,
    };

    return await sendRequestExternalAPI(
      OracleBasedAPIURL + "/oracle/GetSubscriptionInfo",
      JSON.stringify(data),
      "POST",
      { "Content-Type": "application/json" }
    )
      .then((response) => {
        if (response.error) {
          console.log(response);
          this.handleError(response.error, response.error_description);
        }

        return response;
      })
      .catch((error) => {
        this.setState({ showReLoginButtonError: false });
        return error;
      });
  };

  private generateProof = async (subscriptionData: subscriptionData) => {
    //this.showMessage(`Generating Proof....`);
    let zkutils = new ZkUtils();
    if (subscriptionData.subsPlanID === PayPalSubscriptionPlanId) {
      const inputObject: inputPayPalObject = {
        payment_subs_id: zkutils.stringToBytes(subscriptionData.subsPlanID), // payment plan id
        pa: zkutils.numberToBytes(subscriptionData.subsAge, 4),
      };

      console.log("calling generator.generatorProof: %s", proofFileName);
      console.log("2 calling generator.generatorProof: %s", proofFileName);
      const [proof, publicSignals] = await generator.generateProof(
        "../generator/",
        proofFileName,
        Uint8Array.from(subscriptionData.signature),
        subscriptionData.timestamp,
        inputObject
      );

      if (proof && publicSignals) {
        return [true, proof, publicSignals] as const;
      }
    }
    return [false, "", ""] as const;
  };

  private verifyProofOfPayment = async (
    status: boolean,
    proof: any,
    signal: any
  ): Promise<boolean> => {
    //this.showMessage(`Completed`);
    return await fetch("/api/VerifyProofOfPayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status, proof: proof, signal: signal }),
      })
    .then((result) => {
      if (result.status === errorCode.VERIFICATION_FAILED) {
        this.handleError(
          "Proof Verifier Error",
          "The subscription proof failed the verification process",
          "error",
          false
        );
        return false;
      } else {
        //this.showMessage(`Process done, proof cookie was created....`);
        return true;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  };

  private showMessage = (text: string) => {
    const output = document.getElementById("output");
    if (!output) {
      return;
    }
    const node = document.createElement("div");
    node.innerText = text;
    output.appendChild(node);
  };

  private redirectToMain = (): void => {
    Router.push("/");
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    //this.showMessage(`Processing...`);

    const proofCookie = Cookies.get("proof");
    const subscriptionCookie = Cookies.get("subscription");

    if (!proofCookie && !subscriptionCookie) {
      this.redirectToMain();
    }

    if (!proofCookie && subscriptionCookie) {
      const windowUrl = window.location.search;
      const params = new URLSearchParams(windowUrl);
      const codeToken = params.get("code");

      if (codeToken) {
        console.log("**** PayPal's code token found");
        console.log("**** calling oracle's GetSubscriptionInfo api...")
        const subscriptionData: subscriptionData =
          await this.getPayPalSubscriptionData(codeToken, subscriptionCookie);

        if (
          subscriptionData &&
          subscriptionData.subsPlanID &&
          subscriptionData.signature &&
          subscriptionData.timestamp >= 0 &&
          subscriptionData.subsAge >= 0
        ) {
          console.log("**** generating proof...")
          const [status, proof, signal] = await this.generateProof(
            subscriptionData
          );

          if (status) {
            console.log("**** calling portal's VerifyProofOfPayment api...")
            const isGeneratedCookie = await this.verifyProofOfPayment(
              status,
              proof,
              signal
            );
            if (isGeneratedCookie) {
              this.setState({
                subscription: JSON.stringify(subscriptionData, null, 4),
                proof: JSON.stringify(proof, null, 4),
              });
            }
            this.props.setIsExitButton(true);
            console.log("**** proof processing completed")
          } else {
            this.handleError(
              "Proof Generator Error",
              "Payment record did not satisfy requirements",
              "error",
              false
            );
          }
        } else if (
          subscriptionData.error &&
          subscriptionData.error_description
        ) {
          this.handleError(
            subscriptionData.error,
            subscriptionData.error_description
          );
        } else {
          this.handleError(
            "Client Error",
            "Something Error when generating Proof!"
          );
        }
      } else {
        console.log("**** no PayPal's code token found");
        this.handleError("Client Error", "Code Token is not found!");
      }
    } else if (proofCookie) {
      //this.showMessage(`Proof of payment verified`);
      const proofCookieJson = JSON.parse(proofCookie);
      this.setState({
        proof: JSON.stringify(proofCookieJson, null, 4),
      });
    } else {
      this.redirectToMain();
    }
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <div id="output" />
          <hr />
          {this.state.errorTitle !== "" ? (
            <MainPageError
              title={this.state.errorTitle}
              message={this.state.errorDescription}
              severity={"error"}
              button={this.state.showReLoginButtonError}
            />
          ) : (
            <>
              {this.state.isLoading ? (
                <Box justifyContent="center" sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
        				{
                    <>
                          <h1>OZKi Game Page</h1>
			<Image src="/static/ozki-logo.png" width="260px" height="200px" />
                    </>
                }
		<ExitButton />
                </>
              )}
            </>
          )}
        </Container>
      </Box>
    );
  }
}

export default Main;
