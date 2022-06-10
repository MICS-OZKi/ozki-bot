import { Box, Button, Grid, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import Router from "next/router";

interface SubscriptionInfoBoxProps {
  subscriptionID: string;
}

class SubscriptionInfoBox extends React.Component<SubscriptionInfoBoxProps> {
  render() {
    return (
      <Box
        borderRadius="1%"
        sx={{
          width: 550,
          height: 60,
          boxShadow: 3,
          p: 2,
          marginBottom: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography
              variant="subtitle1"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Found Subscription ID
              <strong>{`: ${this.props.subscriptionID}`}</strong>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              size="small"
              endIcon={<SendIcon />}
              onClick={() => Router.push("/login")}
            >
              Get Proof
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
export default SubscriptionInfoBox;
