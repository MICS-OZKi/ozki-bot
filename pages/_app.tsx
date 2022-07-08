import Footer from "@/components/Header/Footer";
import ResponsiveAppBar from "@/components/Header/HeaderMenu";
import HeaderTop from "@/components/Header/HeaderTop";
import { backgroundImage } from "@/config/config";
import "@/styles/globals.css";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import type { AppProps } from "next/app";
import { useState } from "react";

declare global {
  interface Window {
    paypal: any;
    google: any;
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#FFFFFF",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const [isExitButton, setIsExitButton] = useState(false);

  const isMain = [`/main`].includes(appProps.router.pathname);

  function changeIsExitButtonState(isMainPage: boolean) {
    setIsExitButton(isMainPage);
  }

  return (
     <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <HeaderTop
          isMain={isMain}
          isExitButton={isExitButton}
          changeIsExitButtonState={changeIsExitButtonState}
        />
        <ResponsiveAppBar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Component {...pageProps} setIsExitButton={changeIsExitButtonState} />
        </Container>
        <Footer />
      </ThemeProvider>
    </Box>
  );
}

export default MyApp;
