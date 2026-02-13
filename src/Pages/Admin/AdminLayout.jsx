import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  CssBaseline,
  Container,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Home,
  CalendarToday,
  AttachMoney,
  Settings,
  Notifications,
  Logout,
  BarChart,
  Security,
  Message,
  CurrencyRupeeTwoTone,
  CurrencyRuble
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ColorContext } from "../User/UserBlackWight"; // path apne project ke hisaab se
import { LightMode, DarkMode } from "@mui/icons-material";

import { NavLink } from "react-router-dom";
import { ListItemButton } from "@mui/material";
import "../../styles/Admin/AdminDashboard.css";

const drawerWidth = 250;

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const { theme, toggleTheme } = useContext(ColorContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminId");
    window.location.href = "/Admin-login";
  };

  const menuItems = [
    { text: "Dashboard", to: "/Admin-Manage-Property", icon: <Dashboard /> },
    { text: "Properties", to: "/Admin-Manage-Dashboard", icon: <Home /> },
    { text: "Bookings", to: "/Admin-Mange-Booking", icon: <CalendarToday /> },
    { text: "Register Host", to: "/Admin-Mange-Host", icon: <CalendarToday /> },
    { text: "Varify Host", to: "/Admin-Mange-Users", icon: <People /> },
    { text: "Security", to: "/Admin-Manage-Security", icon: <Security /> },
    { text: "Settings", to: "/Admin-Manage-settings", icon: <Settings /> },
    {text: "Refund",to: "/Admin-Manage-refund",icon: <CurrencyRupeeTwoTone />,},
    {text: "Host Payments",to: "/Admin-Manage-Host-Payments",icon: <CurrencyRuble />,},
  ];

  const drawer = (
    <Box
    // sx={{
    //   height: "100%",
    //   bgcolor: "#0B1C2D",
    //   color: "#fff",
    //   display: "flex",
    //   flexDirection: "column",
    // }}
    >
      {/* LOGO */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Avatar sx={{ bgcolor: "#FF3D6A" }}>A</Avatar>
        <Typography fontWeight="bold" fontSize={18}>
          Admin Panel
        </Typography>
      </Box>

      {/* MENU */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.to}
              sx={{
                my: 0.5,
                px: 2,
                py: 1.4,
                borderRadius: 2,
                color: "#fff",
                transition: "all 0.3s ease",

                "& .MuiListItemIcon-root": {
                  color: "#FF3D6A",
                  transition: "0.3s",
                },

                "&.active": {
                  bgcolor: "#FF3D6A",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(255,61,106,0.4)",
                  transform: "scale(1.02)",

                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },

                "&:hover": {
                  bgcolor: "rgba(255,61,106,0.15)",
                  transform: "translateX(6px)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* LOGOUT */}
      <Box onClick={handleLogout} sx={{ p: 2, mt: "auto" }}>
        <ListItemButton
          sx={{
            bgcolor: "#000",
            color: "#fff",
            borderRadius: 2,
            transition: "0.3s",
            "&:hover": {
              bgcolor: "#FF3D6A",
              boxShadow: "0 6px 16px rgba(255,61,106,0.5)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff", cursor: "pointer" }}>
            <Logout />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* APP BAR */}
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "#fff",
          color: "#0B1C2D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Toolbar
        // sx={{ background: "#002338ff" }}
        >
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography sx={{ flexGrow: 1 }} fontWeight="bold" fontSize={18}>
            Admin Dashboard
          </Typography>

          <IconButton
            sx={{ border: "1px solid #bf606072" }}
            onClick={(e) => setNotificationAnchorEl(e.currentTarget)}
          >
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            onClick={toggleTheme}
            sx={{
              mr: 1,
              ml: 2,
              border: "1px solid #bf606072",
              background: "var(--bg-primary)!importent",
            }}
          >
            {theme === "dark" ? (
              <LightMode sx={{ color: "#FF3D6A" }} />
            ) : (
              <DarkMode sx={{ color: "#0B1C2D" }} />
            )}
          </IconButton>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ bgcolor: "#FF3D6A" }}>AD</Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                backgroundColor: "#000000", // black background
                color: "#fff", // optional: make text white
              },
            }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={() => navigate("/Admin-Manage-settings")}>
              Settings
            </MenuItem>
            <Divider sx={{ borderColor: "#555" }} />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={() => setNotificationAnchorEl(null)}
            PaperProps={{
              sx: { width: 300, backgroundColor: "#000000", color: "#fff" },
            }}
          >
            <Typography sx={{ p: 2, fontWeight: "bold" }}>
              Notifications
            </Typography>
            <Divider />
            <MenuItem>New booking received</MenuItem>
            <MenuItem>Property approval pending</MenuItem>
            <MenuItem>Revenue report ready</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Box component="nav" sx={{ width: { sm: drawerWidth } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ mt: 7, animation: "fadeIn 0.6s ease", background: "#000000b9" }}
      >
        <Box component="main">{children}</Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
