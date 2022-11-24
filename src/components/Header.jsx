import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu, MenuItem, Popover } from "@mui/material";

const drawerWidth = 240;

export default function Header(props) {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const token = localStorage.getItem("token");

  const navItems = token
    ? [
        {
          title: "Products",
          path: "/",
        },
        {
          title: "Enquiry",
          path: "/enquiry",
        },
      ]
    : [
        {
          title: "Products",
          path: "/",
        },

        {
          title: "Contact Us",
          path: "/",
        },
      ];
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [anchorEl, setAnchorEl] = React.useState();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logoutHandler = () => {
    console.log("logout");
    localStorage.clear();
    location.reload();
    // navigate("/admin/login");
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {/* Sunshine International */}
        <img src="/assets/sunshine-logo.png" width={"100px"} />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        {token && (
          <ListItem disablePadding>
            <IconButton
              size="large"
              id="mobile"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
            <Popover
              id="mobile"
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <button
                sx={{ p: 2 }}
                style={{
                  border: "0px",
                }}
                onClick={logoutHandler}
              >
                Logout
              </button>
            </Popover>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex", sm: "block" },

              width: "140px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <img src="/assets/sunshine-logo.png" width={"100px"} />
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex", sm: "block" },
              fontFamily: "monospace",
              fontWeight: 700,
              flexGrow: 1,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Sunshine International
          </Typography>

          {/* <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "", sm: "block" } }}
          >
            MUI
          </Typography> */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "#fff" }}
                onClick={() => navigate(item.path)}
              >
                {item.title}
              </Button>
            ))}
            {token && (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <LogoutIcon />
                </IconButton>
              </>
            )}
            <Popover
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <button
                sx={{ p: 2 }}
                style={{
                  border: "0px",
                }}
                onClick={logoutHandler}
              >
                Logout
              </button>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
