import { AppBar, Toolbar, Grid, Typography } from "@mui/material";
import React from "react";
import ExitButton from "@/components/Header/exitButton";
import { Anchor } from "@mui/icons-material";
import SocialMediaIconButtons from "@/components/Header/SocialMediaIconButtons";
import Router from "next/router";
// import HeaderTopButtonRightComponent from "./HeaderTopButtonRightComponent";

interface HeaderTopProps {
  isMain: boolean;
  isExitButton: boolean;
  changeIsExitButtonState: (isMainPage: boolean) => void;
}

class HeaderTop extends React.Component<HeaderTopProps> {
  render() {
    return (
      <AppBar
        position="relative"
        sx={{
          px: 2,
        }}
        style={{ background: "#2E3B55" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <SocialMediaIconButtons />
            </Grid>
            <Grid item xs={6}>
              <Typography
                align="center"
                style={{ width: "100%", alignItems: "center" }}
                variant="h6"
                color="inherit"
                noWrap
                  onClick={() => {
                  if (window.unityWebgl && window.unityWebgl.isLoaded) {
                    window.unityWebgl.unmount();
                    delete window.unityWebgl;
                  }
                  Router.push("/");
                }}
              >
                OZKi BOT
              </Typography>
            </Grid>
            {this.props.isMain && this.props.isExitButton ? (
              <Grid item xs={3}>
                <ExitButton
                  setIsExitButton={this.props.changeIsExitButtonState}
                />
              </Grid>
            ) : (
              <></>
              // <Grid item xs={3}>
              //   <HeaderTopButtonRightComponent />
              // </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default HeaderTop;
