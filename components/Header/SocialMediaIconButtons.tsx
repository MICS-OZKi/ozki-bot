import { Twitter, Facebook, YouTube, Google } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import Router from "next/router";
import React from "react";
import { ReactNode } from "react";
import { PayPalIconButton } from "../Icons/PayPalIconButton";

class SocialMediaIconButtons extends React.Component {
  render(): ReactNode {
    return (
      <Grid container spacing={1} justifyContent="left">
        <Grid item>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="medium"
          >
            <Twitter fontSize="medium" />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="medium"
          >
            <Facebook fontSize="medium" />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="medium"
          >
            <YouTube fontSize="medium" />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="medium"
            onClick={() => {
              Router.push("/google-login");
            }}
          >
            <Google fontSize="medium" />
          </IconButton>
           <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            size="medium"
            onClick={() => {
              Router.push("http://127.0.0.1:3000/paypal-login");
            }}
          >
            <PayPalIconButton />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default SocialMediaIconButtons;
