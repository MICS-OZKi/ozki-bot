import { Grid, Button, Typography } from "@mui/material";
import React from "react";
import { ReactNode } from "react";

class HeaderTopButtonRightComponent extends React.Component {
  render(): ReactNode {
    return (
      <Grid container spacing={2} justifyContent="right" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{
              border: "1px solid",
              borderColor: "white",
              backgroundColor: "rgba(0, 0, 0, 0.54)",
              color: "#fff",
              fontWeight: "bold",
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#fff",
                color: "#2E3B55",
              },
            }}
            href={"/"}
            size="small"
          >
            {"Enter Game"}
          </Button>
        </Grid>
        <Grid item>
          <Typography display="inline" style={{ fontWeight: "bold" }}>
            {" "}
            OR{" "}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{
              border: "1px solid",
              borderColor: "white",
              backgroundColor: "rgba(0, 0, 0, 0.54)",
              color: "#fff",
              fontWeight: "bold",
            }}
            href={"/"}
            size="small"
            sx={{
              "&:hover": {
                backgroundColor: "#fff",
                color: "#2E3B55",
              },
            }}
          >
            {"Get Proof"}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default HeaderTopButtonRightComponent;
