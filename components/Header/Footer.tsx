import { Typography, Box, Container } from "@mui/material";
import Link from "@mui/material/Link";
import React from "react";

interface FooterProps {}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      textAlign="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://127.0.0.1:3000/">
        {"OZKi"}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Footer extends React.Component<FooterProps> {
  render() {
    return (
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          mt: "auto",
          backgroundColor: "#2E3B55",
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    );
  }
}

export default Footer;
