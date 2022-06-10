/* eslint-disable @next/next/inline-script-id */
import React from "react";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PayPalSusbscriptionButton from "@/components/paypalSubscriptionButton";
import TextFieldBillingId from "@/components/textFieldBillingId";
import Cookies from "js-cookie";
import EnterButton from "@/components/enterButton";
// import SubscriptionInfoBox from "@/components/subscriptionInfoBox";

class Home extends React.Component {
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
          <>
            {/* {this.state.subscriptionCookie ? (
                <SubscriptionInfoBox
                  subscriptionID={this.state.subscriptionCookie}
                />
              ) : (
                <></>
              )} */}

            <TextFieldBillingId />
          </>
        )}
      </Box>
    );
  }
}

export default Home;
