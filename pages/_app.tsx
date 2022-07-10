import Footer from "@/components/Header/Footer";
import ResponsiveAppBar from "@/components/Header/HeaderMenu";
import HeaderTop from "@/components/Header/HeaderTop";
import { backgroundImage, mainBackgroundImage } from "@/config/config";
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

const darkTheme = (isMain: boolean, isProofVerified: boolean) =>
  createTheme({
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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${
              isMain && isProofVerified ? mainBackgroundImage : backgroundImage
            })`,
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
  const [isProofVerified, setIsProofVerified] = useState(false);

  const isMain = [`/main`].includes(appProps.router.pathname);
  const isHome = [`/`].includes(appProps.router.pathname);

  function changeIsExitButtonState(isMainPage: boolean) {
    setIsExitButton(isMainPage);
  }

  function changeIsProofVerified(isVerified: boolean) {
    setIsProofVerified(isVerified);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={darkTheme(isMain, isProofVerified)}>
        <HeaderTop
          isMain={isMain}
          isExitButton={isExitButton}
          changeIsExitButtonState={changeIsExitButtonState}
        />
        <ResponsiveAppBar />
        <Container component="main" maxWidth={isHome ? "lg" : "xs"}>
          <CssBaseline />
          {isMain ? (
            <Component
              {...pageProps}
              setIsExitButton={changeIsExitButtonState}
              setIsProofVerified={changeIsProofVerified}
            />
          ) : (
            <Component {...pageProps} />
          )}
        </Container>
        <Footer />
      </ThemeProvider>
    </Box>
  );
}

export default MyApp;
