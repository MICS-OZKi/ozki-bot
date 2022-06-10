import { Button, Grid } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import React from "react";
import Cookies from "js-cookie";
import Router from "next/router";

class ExitButton extends React.Component {
  clearCookies = () => {
    if (Cookies.get("proof")) {
      Cookies.remove("proof");
    }
    if (Cookies.get("subscription")) {
      Cookies.remove("subscription");
    }
    Router.push("/");
  };
  render() {
    return (
      <>
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<ExitToAppIcon />}
              onClick={this.clearCookies}
              size="large"
              style={{ marginTop: 5 }}
            >
              {"Exit Game"}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ExitButton;
