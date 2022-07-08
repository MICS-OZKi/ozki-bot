import React from "react";
import { Alert, Box, Typography } from "@mui/material";
import Script from "next/script";
import { googleClientID } from "@/config/config";
import Router from "next/router";

class GoogleLoginButton extends React.Component {
  state = {
    errorMessage: "",
    severity: undefined,
    google: false,
  };

  handleCredentialResponse(response: { credential: string }) {
    // console.log("Encoded JWT ID token: " + response.credential);
    Router.push({
      pathname: "/main",
      query: { google_code: response.credential },
    });
  }

  renderLoginButton = () => {
    try {
      window.google.accounts.id.initialize({
        client_id: googleClientID,
        callback: this.handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );
      // window.google.accounts.id.prompt();
    } catch (error) {
      console.log(error);
      this.setState({
        severity: "error",
        errorMessage: "Error when load PayPal API",
      });
    }
  };

  componentDidMount() {
    if (window.google && window.google.accounts) {
      this.renderLoginButton();
      this.setState({
        google: true,
      });
    }
  }

  render() {
    return (
      <>
        {!this.state.google ? (
          <Script
            src={"https://accounts.google.com/gsi/client"}
            strategy="afterInteractive"
            async
            defer
            onLoad={async () => {
              this.renderLoginButton();
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
            backgroundColor: "rgba(0, 0, 0, 0.87)",
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
            {"Sign in with Google"}
          </Typography>
          {!this.state.errorMessage ? (
            <div
              id="buttonDiv"
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

export default GoogleLoginButton;
