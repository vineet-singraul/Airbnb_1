import axios from "axios";
import AdminLayout from "./AdminLayout";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Chip,
  Link as MuiLink,
  useMediaQuery,
  Paper,
  Button,
  Stack,Typography 
} from "@mui/material";
import { Link } from "react-router-dom";
import LockPersonIcon from "@mui/icons-material/LockPerson";

const AdminManageProper = () => {
  const [property, setProperty] = useState([]);

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  const adminId = localStorage.getItem("adminId");

  const FeatchAllProperty = async () => {
    const api = "http://127.0.0.1:8000/airbnb/Users-allPropertyCards/";
    const response = await axios.get(api);
    setProperty(response.data);
  };

  useEffect(() => {
    FeatchAllProperty();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: isMobile ? 60 : 70,
    },

    {
      field: "title",
      headerName: "Property",
      width: isMobile ? 200 : isTablet ? 220 : 260,
      renderCell: (params) => (
        <MuiLink
          component={Link}
          to={`/admin/property/${params.row.id}`}
          underline="hover"
          sx={{
            fontWeight: 600,
            color: "#000",
            fontSize: isMobile ? "12px" : "14px",
          }}
        >
          {params.value}
        </MuiLink>
      ),
    },

    {
      field: "city",
      headerName: "City",
      width: isMobile ? 100 : 120,
    },

    {
      field: "price_per_night",
      headerName: "Price",
      width: isMobile ? 100 : 140,
      renderCell: (params) => `₹ ${params.value}`,
    },

    {
      field: "guests_allowed",
      headerName: "Guests",
      width: isMobile ? 80 : 100,
    },

    {
      field: "is_available",
      headerName: "Status",
      width: isMobile ? 110 : 130,
      renderCell: (params) =>
        params.value ? (
          <Chip
            label="Available"
            size="small"
            sx={{
              color: "var(--text-primary)",
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
            }}
          />
        ) : (
          <Chip
            label="Booked"
            size="small"
            sx={{
              color: "var(--text-primary)",
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              fontSize: "11px",
            }}
          />
        ),
    },

    {
      field: "actions",
      headerName: "More",
      width: isMobile ? 80 : 120,
      renderCell: (params) => (
        <MuiLink
          component={Link}
          to={`/admin/property/${params.row.id}`}
          sx={{
            color: "var(--text-primary)",
            backgroundColor: "var(--card-bg)",
            fontWeight: 500,
            fontSize: "12px",
            border: "1px solid var(--border-color)",
            padding: "3px",
            borderRadius: "10px",
          }}
        >
          View
        </MuiLink>
      ),
    },
  ];

  return (
    <>
      {adminId ? (
        <AdminLayout>
          <Box
            sx={{
              height: isMobile ? 200 : 600,
              width: "100vw",
              p: 1,
              overflowX: "auto", // 🔥 MOBILE SCROLL
              backgroundColor: "var(--card-bg)",
              position: "absolute",
              height: "100vh",
            }}
          >
            <DataGrid
              rows={property}
              columns={columns}
              pageSize={isMobile ? 5 : 10}
              rowsPerPageOptions={[5, 10, 20]}
              getRowId={(row) => row.id}
              disableRowSelectionOnClick
              sx={{
                minWidth: isMobile ? 800 : "100%",
                fontSize: isMobile ? "12px" : "14px",
                border: "1px solid #e0e0e0",
                backgroundColor: "#000",
                width: "80vw",

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#000",
                },

                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "red !important",
                  fontWeight: "700",
                  fontSize: isMobile ? "12px" : "14px",
                },

                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#000000ff",
                },

                "& .MuiDataGrid-footerContainer": {
                  borderTop: "1px solid #000000ff",
                },
              }}
            />
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

export default AdminManageProper;
