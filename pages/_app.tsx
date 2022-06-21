import ExitButton from "@/components/exitButton";
import "@/styles/globals.css";
import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useState } from "react";

declare global {
  interface Window {
    paypal: any;
  }
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://127.0.0.1:3000/">
        {"OZKi Inc."}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const [isExitButton, setIsExitButton] = useState(false);

  const isMain = [`/main`].includes(appProps.router.pathname);

  function changeIsExitButtonState(isMainPage: boolean) {
    setIsExitButton(isMainPage);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="relative">
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <Typography align="center" style={{width: "100%", alignItems: "center"}} variant="h6" color="inherit" noWrap>
                  <Link href={"/"}>   OZKi Game</Link>
                </Typography>
              </Grid>
              {isMain && isExitButton ? (
                <Grid item xs={1}>
                  <ExitButton setIsExitButton={changeIsExitButtonState} />
                </Grid>
              ) : (
                <></>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Component {...pageProps} setIsExitButton={changeIsExitButtonState} />
          <Copyright sx={{ mt: 4, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
