import { Alert, AlertColor, AlertTitle, Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import Router from "next/router";
import React from "react";

interface MainPageErrorProps {
  severity: AlertColor;
  title: string;
  message: string;
  button: boolean;
}

class MainPageError extends React.Component<MainPageErrorProps> {
  state = {
    subscriptionCookie: "",
  };

  async componentDidMount() {
    const subscriptionCookie = Cookies.get("subscription");
    this.setState({
      subscriptionCookie: subscriptionCookie,
    });
  }

  render() {
    return (
      <>
        <Alert severity={this.props.severity}>
          <AlertTitle>
            <strong>{this.props.title}</strong>
          </AlertTitle>
          {this.props.message} {this.props.button ? "— Please Re-Login" : ""}
        </Alert>
        {this.props.button ? (
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {" "}
            <Button variant="contained" onClick={() => Router.push("/login")}>
              {"Re-Login"}
            </Button>
          </Box>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default MainPageError;
