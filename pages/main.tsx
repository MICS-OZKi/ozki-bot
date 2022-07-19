import React from "react";
import Image from "next/image"
import {
  AlertColor,
  Box,
  CircularProgress
} from "@mui/material";
import Router from "next/router";
import {
  OracleBasedAPIURL,
  PayPalSubscriptionPlanId,
  payPalProofFileName,
  googleProofFileName,
} from "@/config/config";
import { sendRequestExternalAPI } from "@/utils/request";
import Cookies from "js-cookie";
import MainPageError from "@/components/mainPageError";
import { errorCode } from "@/config/code";
import { ProofOfPaymentGenerator, SubscriptionData } from "./ProofOfPaymentGenerator";
import { ProofOfLoginGenerator, LoginInfo } from "./ProofOfLoginGenerator";
import Game from "@/components/Game/game";

interface oracleSubscriptionInputData {
  code: string;
  subscriptionID: string;
}

interface oracleGoogleInputData {
  googleCodeToken: string;
}

interface googleData {
  emailDomain: string;
  timestamp: number;
  signature: Array<any>;
  error?: string;
  error_description?: string;
}

interface inputGoogleAuthObject {
  domain: number[]; // payment plan id
}

interface ComponentProps {
  setIsExitButton: (isExitButton: boolean) => void;
  setIsProofVerified: (isVerified: boolean) => void;
  isUnityMounted: boolean;
}

class Main extends React.Component<ComponentProps> {
  state = {
    errorTitle: "",
    errorDescription: "",
    severity: "",
    isLoading: false,
    subscription: "",
    data: "",
    proof: "",
    showReLoginButtonError: true,
  };

  private redirectToMain = (): void => {
    Router.push("/");
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

  private generateProof = async (subscriptionData: SubscriptionData) => {
    //this.showMessage(`Generating Proof of Payment for PayPal...`);
    if (subscriptionData.subsPlanID === PayPalSubscriptionPlanId) {
      console.log("calling generator.generatorProof: %s", payPalProofFileName);
      const generator = new ProofOfPaymentGenerator("../generator/", payPalProofFileName, subscriptionData);
      const [proof, publicSignals] = await generator.generateProof(
        Uint8Array.from(subscriptionData.signature),
        subscriptionData.timestamp,
        subscriptionData
      );

      if (proof && publicSignals) {
        return [true, proof, publicSignals] as const;
      }
    }
    return [false, "", ""] as const;
  };

  private generateAuthProof = async (googleData: googleData) => {
    //this.showMessage(`Generating Proof of Login for Google...`);

    const loginInfo: LoginInfo = {
      domain: googleData.emailDomain
    }

    const generator = new ProofOfLoginGenerator("../generator/", googleProofFileName);
    const [proof, publicSignals] = await generator.generateProof(
      Uint8Array.from(googleData.signature),
      googleData.timestamp,
      loginInfo
    );

    if (proof && publicSignals) {
      return [true, proof, publicSignals] as const;
    }
    return [false, "", ""] as const;
  };

  private verifyProofOfPayment = async (
    status: boolean,
    proof: any,
    signal: any,
    type: string
  ): Promise<boolean> => {
    //this.showMessage(`Completed`);
    return await fetch("/api/VerifyProofOfPayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status, proof: proof, signal: signal, type: type }),
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

  private createCookie = async (
    status: boolean,
    proof: any,
    signal: any,
    data: any,
    type: string
  ) => {
    if (status) {
      const isGeneratedCookie = await this.verifyProofOfPayment(
        status,
        proof,
        signal,
        type
      );
      if (isGeneratedCookie) {
        this.setState({
          data: JSON.stringify(data, null, 4),
          proof: JSON.stringify(proof, null, 4),
        });
      }
      this.props.setIsExitButton(true);
       this.props.setIsProofVerified(true);
    } else {
      const msg = (type === "subscription") ? 
        "Your payment record is not valid for OZKi subscription" :
        "Your login domain is not berkeley.edu";

      this.handleError(
        "Proof Generator Error",
        msg,
        "error",
        false
      );
    }
  };

  private handlePayPalToken = async (
    codeToken: string,
    subscriptionCookie: string
  ) => {
    const subscriptionData: subscriptionData =
      await this.getPayPalSubscriptionData(codeToken, subscriptionCookie);

    if (
      subscriptionData &&
      subscriptionData.subsPlanID &&
      subscriptionData.signature &&
      subscriptionData.timestamp >= 0 &&
      subscriptionData.subsAge >= 0
    ) {
      const [status, proof, signal] = await this.generateProof(
        subscriptionData
      );

      this.createCookie(
        status,
        proof,
        signal,
        subscriptionData,
        "subscription"
      );
    } else if (subscriptionData.error && subscriptionData.error_description) {
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
  };

  private verifyGoogleSignInData = async (googleCodeToken: string) => {
    // ToDo
    const data: oracleGoogleInputData = {
      googleCodeToken: googleCodeToken,
    };

    return await sendRequestExternalAPI(
      OracleBasedAPIURL + "/oracle/VerifyGoogleCredential",
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
        console.log(error);
        this.setState({ showReLoginButtonError: false });
        return error;
      });
  };

  private handleGoogleToken = async (googleCodeToken: string) => {
    const googleData: googleData = await this.verifyGoogleSignInData(
      googleCodeToken
    );

    if (
      googleData.emailDomain &&
      googleData.signature &&
      googleData.timestamp >= 0
    ) {
      const [status, proof, signal] = await this.generateAuthProof(googleData);

      this.createCookie(status, proof, signal, googleData, "auth");
    } else if (googleData.error && googleData.error_description) {
      this.handleError(googleData.error, googleData.error_description);
    } else {
      this.handleError(
        "Client Error",
        "Something Error when generating Proof!"
      );
    }
  };

  async componentDidMount() {
    this.props.setIsProofVerified(false);
    this.setState({ isLoading: true });
    //this.showMessage(`Checking cookie...`);

    const proofCookie = Cookies.get("proof");
    const subscriptionCookie = Cookies.get("subscription");
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const googleCodeToken = params.get("google_code");

    if (!proofCookie) {
      if (subscriptionCookie) {
        //this.showMessage(
        //  `Proof was not found, get paypal data from oracle....`
        //);

        const codeToken = params.get("code");

        if (codeToken) {
          await this.handlePayPalToken(codeToken, subscriptionCookie);
        } else {
          this.handleError("Client Error", "Code Token is not found!");
        }
      } else if (googleCodeToken) {
        //this.showMessage(
        //  `Proof was not found, get google data from oracle....`
        //);
        await this.handleGoogleToken(googleCodeToken);
      } else {
        this.redirectToMain();
      }
    } else {
      //this.showMessage(`Proof was found`);
      const proofCookieJson = JSON.parse(proofCookie);
      this.setState({
        proof: JSON.stringify(proofCookieJson, null, 4),
      });
      this.props.setIsExitButton(true);
      this.props.setIsProofVerified(true);
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
        {/* <h1>Status</h1>
        <div id="output" /> */}
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
                {/* {this.state.data ? (
                    <>
                      <h1>Data</h1>
                      <div>
                        <pre>{this.state.data}</pre>
                      </div>
                      <h1>Proof</h1>
                      <div>
                        <pre>{this.state.proof}</pre>
                      </div>
                    </>
                    
                  ) : (
                    <>
                      <h1>Proof</h1>
                      <div>
                        <pre>{this.state.proof}</pre>
                      </div>
                    </>
                  )} */}

                {/* <ExitButton setIsExitButton={this.props.setIsExitButton} /> */}

                {this.props.isUnityMounted ? (
                  <Box
                    justifyContent="center"
                    alignContent="center"
                    sx={{ display: "flex" }}
                  >
                    <Game />
                  </Box>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        )}
      </Box>
    );
  }
}

export default Main;
