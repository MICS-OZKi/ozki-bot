import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Anchor } from "@mui/icons-material";
import Image from 'next/image';
import Box from "@mui/material/Box";

interface HomePageFeaturedPostProps {
  post: {
    description: string;
    image: string;
    imageText: string;
    title: string;
  };
}

export default function HomePageFeaturedPost(props: HomePageFeaturedPostProps) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "rgba(0, 0, 0, 0.50)",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              <Image src="/ozki-bot.png" width="300"  height="200"></Image>
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
