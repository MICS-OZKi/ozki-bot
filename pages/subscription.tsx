import EnterButton from "@/components/enterButton";
import PayPalSusbscriptionButton from "@/components/paypalSubscriptionButton";
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";

class Subscription extends React.Component {
  state = {
    proofCookie: "",
    subscriptionCookie: "",
  };
  componentDidMount() {
    const proofCookie = Cookies.get("proof");
    const subscriptionCookie = Cookies.get("subscription");
    if (proofCookie) {
      this.setState({ proofCookie: proofCookie });
    } else if (subscriptionCookie) {
      this.setState({ subscriptionCookie: subscriptionCookie });
    }
  }

  render() {
    return (
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {this.state.proofCookie ? (
          <EnterButton />
        ) : (
          <PayPalSusbscriptionButton />
        )}
      </Box>
    );
  }
}

export default Subscription;
