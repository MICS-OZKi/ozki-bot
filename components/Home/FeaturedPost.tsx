import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface FeaturedPostProps {
  post: {
    description: string;
    title: string;
    link: string;
    target: string;
  };
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: "flex", backgroundColor: "rgba(0, 0, 0, 0.60)" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.description}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            <a href={post.target}>{post.link}</a>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
