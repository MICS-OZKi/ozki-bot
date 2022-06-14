import "@/styles/globals.css";
import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import type { AppProps } from "next/app";
import Link from "next/link";
import Router from "next/router";

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
const pages = [
  {
    id: "Menu",
    action: () => {
      Router.push("/");
    },
  },
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="relative">
          <Toolbar>
            <Typography align="center" style={{width: "100%", alignItems: "center"}} variant="h4" color="inherit" noWrap>
              <Link href={"/"}>OZKi Game</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Component {...pageProps} />
          <Copyright sx={{ mt: 4, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
