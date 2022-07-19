import { Button, Grid } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import React from "react";
import Cookies from "js-cookie";
import Router from "next/router";

interface ExitButtonProps {
  setIsExitButton: (isExitButton: boolean) => void;
}

class ExitButton extends React.Component<ExitButtonProps> {
  clearCookies = () => {
    //this.props.setIsExitButton(false);
    if (Cookies.get("proof")) {
      Cookies.remove("proof");
    }
    if (Cookies.get("subscription")) {
      Cookies.remove("subscription");
    }
    if (window.unityWebgl && window.unityWebgl.isLoaded) {
      window.unityWebgl.unmount();
      delete window.unityWebgl;
    }
    Router.push("/");
  };
  render() {
    return (
      <>
        <Grid container justifyContent="right">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{
                border: "1px solid",
                borderColor: "white",
                backgroundColor: "rgba(0, 0, 0, 0.54)",
                color: "#fff",
                fontWeight: "bold",
              }}
              startIcon={<ExitToAppIcon />}
              onClick={this.clearCookies}
              size="large"
            >
              {"Exit"}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ExitButton;
