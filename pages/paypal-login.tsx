import React from "react";

import { Box } from "@mui/material";
import Cookies from "js-cookie";
import EnterButton from "@/components/enterButton";
import TextFieldBillingId from "@/components/textFieldBillingId";

class PayPalLogin extends React.Component {
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
      <>
        {this.state.proofCookie ? (
          <EnterButton />
        ) : (
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* {this.state.subscriptionCookie ? (
                <SubscriptionInfoBox
                  subscriptionID={this.state.subscriptionCookie}
                />
              ) : (
                <></>
              )} */}

            <TextFieldBillingId />
          </Box>
        )}
      </>
    );
  }
}

export default PayPalLogin;
