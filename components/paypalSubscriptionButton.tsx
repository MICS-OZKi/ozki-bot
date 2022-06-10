import {
  PayPalSubscriptionPlanId,
  subscriptionCookieExpirationTime,
  PayPalSubscriptionScriptAPI,
} from "@/config/config";
import { Alert, Box, Typography } from "@mui/material";
import cookie from "js-cookie";
import Script from "next/script";
import React from "react";

class PayPalSusbscriptionButton extends React.Component {
  state = {
    errorMessage: "",
    severity: undefined,
    paypal: false,
  };

  renderPayPalSubscriptionButton = () => {
    try {
      window.paypal
        .Buttons({
          style: {
            shape: "pill",
            color: "gold",
            layout: "horizontal",
            label: "subscribe",
          },
          createSubscription: function (
            _data: any,
            actions: {
              subscription: {
                create: (arg0: {
                  /* Creates the subscription */
                  plan_id: string;
                }) => any;
              };
            }
          ) {
            return actions.subscription.create({
              /* Creates the subscription */
              plan_id: `${PayPalSubscriptionPlanId}`,
            });
          },
          onApprove: function (
            data: {
              orderID: string;
              subscriptionID: string;
              facilitatorAccessToken: string;
              paymentSource: string;
            },
            actions: { subcription: any; restart: any; redirect: any }
          ) {
            cookie.set("subscription", data.subscriptionID, {
              expires: new Date(
                new Date().getTime() +
                  subscriptionCookieExpirationTime * 60 * 1000
              ),
            });
            actions.redirect.fireAndForget("http://127.0.0.1:3000/login");
          },
        })
        .render(`#paypal-button-container-${PayPalSubscriptionPlanId}`);
    } catch (error) {
      console.log(error);
      this.setState({
        severity: "error",
        errorMessage: "Error when load Subscription PayPal API",
      });
    } // Renders the PayPal button
  };

  componentDidMount() {
    if (window.paypal && window.paypal.Buttons) {
      this.setState({
        paypal: true,
      });
      this.renderPayPalSubscriptionButton();
    }
  }

  render() {
    return (
      <>
        {!this.state.paypal ? (
          <Script
            src={PayPalSubscriptionScriptAPI}
            data-sdk-integration-source="button-factory"
            strategy="afterInteractive"
            onLoad={() => {
              this.renderPayPalSubscriptionButton();
            }}
          />
        ) : (
          <></>
        )}

        {!this.state.errorMessage ? (
          <Box
            borderRadius="1%"
            sx={{
              width: 300,
              boxShadow: 3,
              p: 2,
              backgroundColor: "primary.white",
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
              {"Purchase Subscription for OZKi Game"}
            </Typography>
            <div id={`paypal-button-container-${PayPalSubscriptionPlanId}`} />
          </Box>
        ) : (
          <Alert severity={this.state.severity}>
            {this.state.errorMessage}
          </Alert>
        )}
      </>
    );
  }
}

export default PayPalSusbscriptionButton;
