import React from "react";
import {
  PayPalAuthEndPoint,
  PayPalClientId,
  PayPalReturnURL,
  PayPalScriptAPI,
} from "@/config/config";
import { Alert, Box, Typography } from "@mui/material";
import Script from "next/script";
import Router from "next/router";

class PayPalLoginButton extends React.Component {
  state = {
    errorMessage: "",
    severity: undefined,
    paypal: false,
  };
  renderPayPalLoginButton = () => {
    try {
      window.paypal.use(["login"], function (login: any) {
        try {
          login.render({
            appid: PayPalClientId,
            authend: PayPalAuthEndPoint,
            scopes:
              "openid profile address https://uri.paypal.com/services/paypalattributes",
            containerid: "lippButton",
            responseType: "code id_Token",
            locale: "en-us",
            buttonType: "LWP",
            buttonShape: "pill",
            buttonSize: "lg",
            fullPage: "true",
            returnurl: PayPalReturnURL,
          });
        } catch (error) {
          console.log(error);
          delete window.paypal;
          Router.reload();
        }
      });
    } catch (error) {
      console.log(error);
      this.setState({
        severity: "error",
        errorMessage: "Error when load PayPal API",
      });
    }
  };

  componentDidMount() {
    if (window.paypal && window.paypal.use) {
      this.renderPayPalLoginButton();
      this.setState({
        paypal: true,
      });
    }
  }

  render() {
    return (
      <>
        {!this.state.paypal ? (
          <Script
            src={PayPalScriptAPI}
            strategy="afterInteractive"
            onLoad={async () => {
              this.renderPayPalLoginButton();
            }}
          />
        ) : (
          <></>
        )}

        <Box
          borderRadius="1%"
          sx={{
            width: 300,
            boxShadow: 3,
            p: 2,
            backgroundColor: "primary.white",
          }}
          justifyContent="center"
        >
          <Typography
            component="h1"
            variant="h5"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            {""}
          </Typography>
          {!this.state.errorMessage ? (
            <span
              id="lippButton"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            <Alert severity={this.state.severity}>
              {this.state.errorMessage}
            </Alert>
          )}
        </Box>
      </>
    );
  }
}

export default PayPalLoginButton;
