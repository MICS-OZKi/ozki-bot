import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import cookie from "js-cookie";
import { subscriptionCookieExpirationTime } from "@/config/config";
import Router from "next/router";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

class TextFieldBillingId extends React.Component {
  state = {
    severity: undefined,
    message: "",
    subscriptionID: "",
  };

  setSubscriptionID = (e: any) => {
    this.setState({
      subscriptionID: e.target.value,
    });
  };

  getProof = () => {
    if (this.state.subscriptionID === "") {
      this.setState({
        severity: "error",
        message: "Missing subscription/billing ID",
      });
    } else {
      cookie.set("subscription", this.state.subscriptionID, {
        expires: new Date(
          new Date().getTime() + subscriptionCookieExpirationTime * 60 * 1000
        ),
      });
      Router.push("/login");
    }
  };

  render() {
    return (
      <Box
        borderRadius="1%"
        sx={{
          width: 300,
          boxShadow: 3,
          p: 2,
          backgroundColor: "primary.white",
        }}
      >
        <Grid container spacing={1} textAlign="center">
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {"Enter Paypal Subscription Billing-Id"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="billingId"
              label="Subscription Billing-Id"
              name="billingId"
              autoComplete="billingId"
              autoFocus
              size="small"
              InputLabelProps={{
                style: {
                  fontSize: 15,
                },
              }}
              onChange={this.setSubscriptionID}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="medium"
              onClick={this.getProof}
              endIcon={<SendIcon />}
            >
              Get Proof
            </Button>
          </Grid>
          {this.state.message ? (
            <Grid item xs={12}>
              <Alert severity={this.state.severity}>{this.state.message}</Alert>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>

        <Link href="/subscription" variant="caption">
          {"*To purchase a subscription"}
        </Link>
      </Box>
    );
  }
}

export default TextFieldBillingId;
