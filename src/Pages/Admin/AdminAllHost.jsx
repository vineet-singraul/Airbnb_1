import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AdminLayout from "./AdminLayout";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Grid, Typography, TextField } from "@mui/material";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Chip,
  Button,
  Link as MuiLink,
  Switch,
  useMediaQuery,
  Paper,
  Stack,
} from "@mui/material";
import "../../styles/Admin/AdminAllUsers.css";

const AdminAllHost = () => {
  const [property, setProperty] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);

  // 🔥 SINGLE SOURCE OF TRUTH
  const [selectedHost, setSelectedHost] = useState(null);
  const isMobile = useMediaQuery("(width:80vw)");
  const adminId = localStorage.getItem("adminId")
  const navigate = useNavigate();

  const FeatchAllProperty = async () => {
    const api = "http://127.0.0.1:8000/airbnb/Admin-Mange-Hosts/";
    const response = await axios.get(api);
    setProperty(response.data);
  };

  useEffect(() => {
    FeatchAllProperty();
  }, []);

  const handleOpenHostPopUp = (rowData) => {
    setSelectedHost(rowData);
    setOpenPopUp(true);
  };

  // ✅ FIXED INPUT HANDLER
  const handleInput = (e, valueFromPicker = null) => {
    // DateTimePicker
    if (valueFromPicker) {
      setSelectedHost((prev) => ({
        ...prev,
        created_at: valueFromPicker.toISOString(),
      }));
      return;
    }

    const { name, value, checked, type } = e.target;

    setSelectedHost((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateHostDetailsByAdmin = async () => {
    const payload = {
      host: {
        first_name: selectedHost.host_name,
        last_name: selectedHost.last_name,
        email: selectedHost.email,
        phone: selectedHost.phone,
        address: selectedHost.user_address,
        image: selectedHost.image,
        as_host: selectedHost.as_host,
      },
      bio: selectedHost.bio,
      profile_photo: selectedHost.profile_photo,
      govt_id_type: selectedHost.govt_id_type,
      govt_id_number: selectedHost.govt_id_number,
      address: selectedHost.address,
      city: selectedHost.city,
      country: selectedHost.country,
      verified_status: selectedHost.verified_status,
    };

    const api = `http://127.0.0.1:8000/airbnb/Admin-Update-Hosts-Details/${selectedHost.id}/`;

    // 🔥 Send 'payload' instead of 'selectedHost'
    const response = await axios.patch(api, payload);
    toast.success("Host Profile Is Updated succesfull");
    setOpenPopUp(false);
    FeatchAllProperty();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "host_name", headerName: "Host Name", width: 220 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "city", headerName: "City", width: 170 },
    {
      field: "verified_status",
      headerName: "Verified",
      width: 130,
      renderCell: (params) =>
        params.value ? (
          <Chip label="Verified" size="small" color="success" />
        ) : (
          <Chip label="Not Verified" size="small" color="error" />
        ),
    },
    {
      field: "more_details",
      headerName: "More Details",
      width: 170,
      renderCell: (params) => (
        <Button
          onClick={() => handleOpenHostPopUp(params.row)}
          variant="contained"
          id="ButtonHai"
        >
          Host Details
        </Button>
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
              p: 1,
              overflowX: "auto",
              background: "#000000ff",
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
                backgroundColor: "#000",
                width: "100vw",
                position: "absolute",
              }}
            />
          </Box>

          <Dialog open={openPopUp} maxWidth="md" fullWidth>
            <DialogTitle id="BG_Black_Clr_Black">Host Full Details</DialogTitle>

            <DialogContent dividers>
              {selectedHost && (
                <Box>
                  <Box display="flex" gap={3} mb={3} alignItems="center">
                    <Avatar
                      src={`http://127.0.0.1:8000${selectedHost.image}`}
                      sx={{ width: 90, height: 90 }}
                    />
                    <Avatar
                      src={`http://127.0.0.1:8000${selectedHost.profile_photo}`}
                      sx={{ width: 90, height: 90 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {selectedHost.host_name} {selectedHost.last_name}
                      </Typography>
                      <Chip
                        label={selectedHost.as_host ? "Host Account" : "User"}
                        color="primary"
                        size="small"
                      />
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    {[
                      ["First Name", "host_name"],
                      ["Last Name", "last_name"],
                      ["Email", "email"],
                      ["Phone", "phone"],
                      ["User Address", "user_address"],
                      ["Host Address", "address"],
                      ["City", "city"],
                      ["Country", "country"],
                    ].map(([label, name]) => (
                      <Grid item xs={12} sm={6} key={name}>
                        <TextField
                          label={label}
                          name={name}
                          value={selectedHost[name] || ""}
                          onChange={handleInput}
                          fullWidth
                          id="ButtonHai"
                        />
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <TextField
                        label="Bio"
                        name="bio"
                        value={selectedHost.bio || ""}
                        onChange={handleInput}
                        fullWidth
                        multiline
                        rows={3}
                        id="ButtonHai"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Govt ID Type"
                        name="govt_id_type"
                        value={selectedHost.govt_id_type || ""}
                        onChange={handleInput}
                        fullWidth
                        id="ButtonHai"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Govt ID Number"
                        name="govt_id_number"
                        value={selectedHost.govt_id_number || ""}
                        onChange={handleInput}
                        fullWidth
                        id="ButtonHai"
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Typography variant="caption">Host Verified</Typography>
                      <Switch
                        name="verified_status"
                        checked={Boolean(selectedHost.verified_status)}
                        onChange={handleInput}
                        id="ButtonHai"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Account Created"
                          value={dayjs(selectedHost.created_at)}
                          onChange={(newValue) => handleInput(null, newValue)}
                          disabled
                          fullWidth
                          id="ButtonHai"
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => setOpenPopUp(false)}
                color="error"
                variant="contained"
              >
                Close
              </Button>
              <Button
                onClick={handleUpdateHostDetailsByAdmin}
                color="success"
                variant="contained"
              >
                Update Details
              </Button>
            </DialogActions>
          </Dialog>

          <ToastContainer
            position="top-left"
            autoClose={1000}
            newestOnTop
            pauseOnHover
            draggable
            toastStyle={{
              backgroundColor: "#111", // dark background
              color: "#fff", // white text
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)", // subtle shadow
              borderRadius: "8px",
            }}
            bodyStyle={{
              fontSize: "14px",
            }}
          />
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

export default AdminAllHost;
