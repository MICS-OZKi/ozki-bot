import PayPalLoginButton from "@/components/paypalLoginButton";
import { Box, Typography } from "@mui/material";
import Cookies from "js-cookie";
import Router from "next/router";
import React from "react";

class Login extends React.Component {
  state = {
    subscriptionCookie: "",
  };

  componentDidMount() {
    if (Cookies.get("subscription")) {
      this.setState({ subscriptionCookie: Cookies.get("subscription") });
    } else {
      Router.push("http://127.0.0.1:3000");
    }
  }

  render() {
    return (
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PayPalLoginButton subscriptionCookie={this.state.subscriptionCookie} />
      </Box>
    );
  }
}

export default Login;
