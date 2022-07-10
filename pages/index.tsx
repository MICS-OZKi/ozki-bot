/* eslint-disable @next/next/inline-script-id */
import React from "react";

import Cookies from "js-cookie";
import HomePageFeaturedPost from "@/components/Home/homePageFeaturedPost";
import FeaturedPost from "@/components/Home/FeaturedPost";
import { Grid } from "@mui/material";
// import SubscriptionInfoBox from "@/components/subscriptionInfoBox";

const homePageFeaturedPost = {
  title: "OZKi-BOT",
  description:
    "OZKi-BOT is a demo webapp which protects the users' privacy by using the OZKi Proof Framework to implement authorization flows based on the Zero Knowledge Proof.",
  //image: "https://source.unsplash.com/random",
  //imageText: "main image description",
};

const featuredPosts = [
  {
    title: "Proof of Payment with PayPal",
    description: "Click the PayPal icon on the top left to get started.",
    link: "Or click here",
    target: "http://127.0.0.1:3000/paypal-login",
  },
  {
    title: "Proof of Login with Google",
    description: "Click the Google icon on the top left to get started.",
    link: "Or click here",
    target: "http://localhost:3000/google-login",
  },
  {
    title: "Proof of Key",
    description: "Play the game to try this feature.",
  },
];

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
      <>
        <HomePageFeaturedPost post={homePageFeaturedPost} />
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
      </>
    );
  }
}

export default Home;
