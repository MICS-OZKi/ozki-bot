import { Twitter, Facebook, YouTube, Google } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import Router from "next/router";
import React from "react";
import { ReactNode } from "react";

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
        </Grid>
      </Grid>
    );
  }
}

export default SocialMediaIconButtons;
