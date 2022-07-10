import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

const pages = [
  { text: "Home", 	target: "/" },
  { text: "Doc", 	target: "https://vizualkei-labs.gitbook.io/ozki/" },
  { text: "Forum", 	target: "/" },
  { text: "MICS", 	target: "https://ischoolonline.berkeley.edu/cybersecurity/" },
  { text: "Team", 	target: "https://vizualkei-labs.gitbook.io/ozki/project/members" },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ minHeight: 5 }}>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Link
                    href={`${page.target}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <Typography textAlign="center">{page.text}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            justifyContent="center"
            alignItems="center"
          >
            {pages.map((page) => (
              <Link
                key={page.text}
                href={page.target}
                style={{ textDecoration: "none", display: "block" }}
              >
                <a target="_blank">
                  <Button
                    key={page.text}
                    onClick={handleCloseNavMenu}
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      display: "block",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#2E3B55",
                      },
                    }} // sx={{ my: 1, color: "white", display: "block" }}
                  >
                    {page.text}
                  </Button>
                </a>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
