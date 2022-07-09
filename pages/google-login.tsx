import React from "react";

import { Box } from "@mui/material";
import GoogleLoginButton from "@/components/Google/googleLoginButton";
import Cookies from "js-cookie";
import EnterButton from "@/components/enterButton";

class GoogleLogin extends React.Component {
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
          <>
            <Box
              sx={{
                marginTop: 8,
                marginBottom: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <GoogleLoginButton />
            </Box>
          </>
        )}
      </>
    );
  }
}

export default GoogleLogin;
