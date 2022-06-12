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
  MaximumPaymentAge,
  OracleBasedAPIURL,
  PayPalSubscriptionPlanId,
} from "@/config/config";
import { sendRequestExternalAPI } from "@/utils/request";
import Cookies from "js-cookie";
import MainPageError from "@/components/mainPageError";
import ExitButton from "@/components/exitButton";

interface oracleSubscriptionInputData {
  code: string;
  subscriptionID: string;
  PlanID: string;
  maximumPaymentAge: number;
}

interface subscriptionData {
  subsPlanID: string;
  timestamp: number;
  subsAge: number;
  signature: string;
  error?: string;
  error_description?: string;
}

class Main extends React.Component {
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
    severity: AlertColor = "error"
  ): void => {
    this.setState({
      errorTitle: errorTitle,
      errorDescription: errorDescription,
      severity: severity,
    });
  };

  getPayPalSubscriptionData = async (
    code: string,
    subscriptionID: string,
    maximumPaymentAge: number
  ): Promise<any> => {
    const data: oracleSubscriptionInputData = {
      code: code,
      subscriptionID: subscriptionID,
      PlanID: PayPalSubscriptionPlanId,
      maximumPaymentAge: maximumPaymentAge,
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

        this.setState({
          subscription: JSON.stringify(response, null, 4),
        });

        return response;
      })
      .catch((error) => {
        this.setState({
          showReLoginButtonError: false,
        });
        return error;
      });
  };

  private generateProof = async (subscriptionData: subscriptionData) => {
    // TODO: generate Proof to portal services
    if (subscriptionData.subsPlanID === PayPalSubscriptionPlanId) {
      return [true, "This is a dummy proof"] as const;
    }
    return [false, ""] as const;
  };

  private sendProof = async (status: boolean, proof: string): Promise<void> => {
    fetch("/api/SendProof", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status, proof: proof }),
    }).catch((error) => {
      console.log(error);
      throw error;
    });
    this.showMessage(`Completed`);
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
    this.showMessage(`Processing...`);

    const proofCookie = Cookies.get("proof");
    const subscriptionCookie = Cookies.get("subscription");

    if (!proofCookie && !subscriptionCookie) {
      this.redirectToMain();
    }

    if (!proofCookie && subscriptionCookie) {
      this.showMessage(`Retrieving proof of payment...`);

      const windowUrl = window.location.search;
      const params = new URLSearchParams(windowUrl);
      const codeToken = params.get("code");

      if (codeToken) {
        const subscriptionData: subscriptionData =
          await this.getPayPalSubscriptionData(
            codeToken,
            subscriptionCookie,
            MaximumPaymentAge
          );

        if (
          subscriptionData &&
          subscriptionData.subsPlanID &&
          subscriptionData.signature &&
          subscriptionData.timestamp >= 0 &&
          subscriptionData.subsAge >= 0
        ) {
          const [status, proof] = await this.generateProof(subscriptionData);

          if (status) {
            await this.sendProof(status, proof);
            await this.sendProof(true, proof);
            this.setState({ proof: proof });
          } else {
            this.handleError(
              "Proof Generator Error",
              "Payment record did not satisfy requirements"
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
        this.handleError("Client Error", "Code Token is not found!");
      }
    } else if (proofCookie) {
      this.showMessage(`Proof of payment verified`);
      this.setState({
        proof: proofCookie,
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
          <h1>Status</h1>
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
