import AdminLayout from "./AdminLayout";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Paper,
  Stack,Button
} from "@mui/material";
import {
  Home,
  BookOnline,
  People,
  AttachMoney,
  CurrencyRupeeSharp,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart, LineChart } from "@mui/x-charts";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import "../../styles/Admin/AdminDashboard.css";

const AdminDashboard = () => {
  const [totalProperty, setTotalProperty] = useState([]);
  const [totalBooking, setTotalBooking] = useState([]);
  const [totalUser, setTotalUsers] = useState([]);
  const [revenue, setRevenew] = useState(null);
  const adminId = localStorage.getItem("adminId");

  const LoadAdminDashboard = async () => {
    const api = "http://127.0.0.1:8000/airbnb/Users-allPropertyCards/";
    const response = await axios.get(api);
    setTotalProperty(response.data);
  };

  const LoadAdminBooking = async () => {
    const api = "http://127.0.0.1:8000/airbnb/Admin-Booking/";
    const response = await axios.get(api);
    setTotalBooking(response.data.bookings);
    setRevenew(response.data.total_revenue);
  };

  const LoadAdminAllUsers = async () => {
    const api = "http://127.0.0.1:8000/airbnb/Admin-Users/";
    const response = await axios.get(api);
    setTotalUsers(response.data);
  };

  useEffect(() => {
    LoadAdminDashboard();
    LoadAdminBooking();
    LoadAdminAllUsers();
  }, []);

  const stats = [
    {
      title: " Listings",
      value: totalProperty.length,
      icon: <Home />,
      color: "#1976d2",
    },
    {
      title: " Bookings",
      value: totalBooking.length,
      icon: <BookOnline />,
      color: "#9c27b0",
    },
    {
      title: " Users",
      value: totalUser.length,
      icon: <People />,
      color: "#2e7d32",
    },
    {
      title: " Revenue",
      value: revenue,
      icon: <CurrencyRupeeSharp />,
      color: "#ed6c02",
    },
  ];

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getMonthlyCount = (data, dateKey) => {
    const months = Array(12).fill(0);

    data.forEach((item) => {
      if (item[dateKey]) {
        const date = new Date(item[dateKey]);
        const month = date.getMonth();
        months[month] += 1;
      }
    });

    return months;
  };




  /* ================= CHART DATA ================= */

  const bookingByMonth = getMonthlyCount(totalBooking, "created_at");
  const usersByMonth = getMonthlyCount(totalUser, "reg_date");
  const ListingByMonth = getMonthlyCount(totalProperty, "reg_date");

  return (
    <>
      {adminId ? (
        <AdminLayout>
          <Box id="mainBox" p={3}>
            <Typography variant="h5" fontWeight={600} mb={4}>
              Admin Dashboard
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={2} mb={4}>
              {stats.map((stat) => (
                <Grid item xs={12} sm={4} md={2} key={stat.title}>
                  <Card sx={{ borderRadius: 3 }}>
                    <CardContent
                      sx={{
                        width: "140px",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        background: "#00292fff",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: stat.color,
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {stat.title}
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {stat.value}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* ================= CHARTS ================= */}
            <Grid container spacing={3}>
              {/* Bookings Chart */}
              <Grid item xs={12} md={6}>
                <Card id="BookinCharts" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" mb={2}>
                      Month-wise Bookings
                    </Typography>

                    <BarChart
                      xAxis={[{ scaleType: "band", data: monthLabels }]}
                      series={[
                        {
                          data: bookingByMonth,
                          label: "Bookings",
                        },
                      ]}
                      height={300}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Users Chart */}
              <Grid item xs={12} md={6}>
                <Card id="UsersCharts" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" mb={2}>
                      Month-wise Users
                    </Typography>

                    <LineChart
                      xAxis={[{ scaleType: "point", data: monthLabels }]}
                      series={[
                        {
                          data: usersByMonth,
                          label: "Users",
                        },
                      ]}
                      height={300}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Listtings Chart */}
              <Grid item xs={12} md={6}>
                <Card id="BookinCharts" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" mb={2}>
                      Month-wise Listings
                    </Typography>

                    <BarChart
                      xAxis={[{ scaleType: "band", data: monthLabels }]}
                      series={[
                        {
                          data: ListingByMonth,
                          label: "Listings",
                        },
                      ]}
                      height={300}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </AdminLayout>
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0B1C2D, #000)",
          }}
        >
          <Paper
            elevation={12}
            sx={{
              p: 5,
              maxWidth: 420,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor: "#111",
              color: "#fff",
            }}
          >
            <Stack spacing={3} alignItems="center">
              <LockPersonIcon
                sx={{
                  fontSize: 70,
                  color: "#FF3D6A",
                }}
              />

              <Typography variant="h5" fontWeight="bold">
                Admin Access Denied
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                You are not authenticated as an admin.
                <br />
                Please login with admin credentials.
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  px: 4,
                  borderRadius: 3,
                  backgroundColor: "#FF3D6A",
                  boxShadow: "0 8px 20px rgba(255,61,106,0.4)",
                  "&:hover": {
                    backgroundColor: "#ff1744",
                  },
                }}
                onClick={() => navigate("http://localhost:3000/Admin-login")}
              >
                Go to Admin Login
              </Button>
            </Stack>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default AdminDashboard;
