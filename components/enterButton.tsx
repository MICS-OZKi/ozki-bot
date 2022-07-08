import { Box, Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import Router from "next/router";

class EnterButton extends React.Component {
  render() {
    return (
      <Box
        borderRadius="1%"
        textAlign="center"
        sx={{
          width: 380,
          boxShadow: 3,
          p: 2,
          backgroundColor: "rgba(0, 0, 0, 0.87)",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          {"You have active subscription for OZKi game"}
        </Typography>
        <Button
          variant="contained"
          size="small"
          endIcon={<SendIcon />}
          onClick={() => Router.push("/main")}
        >
          Enter Game
        </Button>
      </Box>
    );
  }
}
export default EnterButton;
