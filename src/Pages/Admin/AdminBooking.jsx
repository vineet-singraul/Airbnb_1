import AdminLayout from "./AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { DataGrid } from "@mui/x-data-grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Admin/AdminDashboard.css";
const AdminBooking = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [input, setInput] = useState({ message: "", Process: "" });
  const [error, setError] = useState({ message: "", Process: "" });
  const adminId = localStorage.getItem("adminId");
  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/airbnb/Admin-Mange-Booking/",
        );
        const mappedRows = response.data.bookings.map((booking) => ({
          id: booking.id,
          userName: `${booking.user.first_name} ${booking.user.last_name}`,
          phone: booking.user.phone,
          checkIn: booking.check_in,
          checkOut: booking.check_out,
          propertyTitle: booking.property.title,
          city: booking.property.city,
          totalAmount: booking.total_amount,
          status: booking.status,
        }));
        setRows(mappedRows);
      } catch (err) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Tab change
  const handleTabChange = (e, value) => setTabValue(value);

  // Open dialog
  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setInput({ message: "", Process: "" });
    setError({ message: "", Process: "" });
  };

  // Input handlers
  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let msg = "";
    if (name === "Process" && !value) msg = "Booking status is required";
    if (name === "message" && !value.trim()) msg = "Message is required";
    setError({ ...error, [name]: msg });
  };

  const handleSubmit = async (id) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/airbnb/Host-Approvel-Process/${id}/`,
        input,
        { headers: { "Content-Type": "application/json" } },
      );
      toast.success(response.data.msg);
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, status: input.Process } : row
        )
      );
      handleClose();
    } catch (err) {
      if (err.response) toast.error(err.response.data.msg || "Server Error");
      else toast.error("Network Error");
    }
  };

  // Filtered rows for tabs
  const confirmedRows = rows.filter((r) => r.status === "confirmed" || r.status === "COMPLETE" || r.status === "CONFIRM");
  const pendingRows = rows.filter((r) => r.status === "pending" || r.status === "PENDING");
  const canceledRows = rows.filter((r) => r.status === "cancelled" || r.status === "CANCEL");

  

  const columns = [
    { field: "id", headerName: "Booking ID", width: 110 },
    {
      field: "show",
      headerName: "Show More",
      width: 130,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpen(params.row)}
        >
          View more
        </Button>
      ),
    },
    { field: "userName", headerName: "Guest Name", width: 160 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "propertyTitle", headerName: "Property", width: 220 },
    { field: "city", headerName: "City", width: 130 },
    { field: "checkIn", headerName: "Check-In", width: 120 },
    { field: "checkOut", headerName: "Check-Out", width: 120 },
    { field: "totalAmount", headerName: "Amount (₹)", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
  ];

  return (
    <>
      {adminId ? (
        <AdminLayout>
          <Box id="mainBox">
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Confirmed" />
              <Tab label="Pending" />
              <Tab label="Canceled" />
            </Tabs>

            <Box sx={{ height: 500, width: "100vw", mt: 2 }}>
              {tabValue === 0 && (
                <DataGrid
                  rows={confirmedRows}
                  columns={columns}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  loading={loading}
                  sx={{
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#000",
                    width: "85%",
                    height: "100vh",

                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#000",
                    },

                    "& .MuiDataGrid-columnHeaderTitle": {
                      color: "red !important",
                      fontWeight: "700",
                      fontSize: "12px",
                    },

                    "& .MuiDataGrid-row:hover": {
                      backgroundColor: "#000000ff",
                    },

                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "1px solid #000000ff",
                    },
                    "@media (max-width:600px)": {
                      width: "100vw",
                    },
                  }}
                />
              )}
              {tabValue === 1 && (
                <DataGrid
                  rows={pendingRows}
                  columns={columns}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  loading={loading}
                  sx={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    width: "85%",
                    height: "100vh",
                    position: "absolute",
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#111111",
                      color: "#ffffff",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      color: "red !important",
                      fontWeight: "700",
                      fontSize: "12px",
                    },

                    "& .MuiDataGrid-cell": {
                      color: "#ffffff",
                    },
                    "& .MuiDataGrid-row:hover": {
                      backgroundColor: "#222222",
                    },
                    "& .MuiCheckbox-root svg": {
                      color: "#ffffff",
                    },
                    "@media (max-width:600px)": {
                      width: "100vw",
                    },
                  }}
                />
              )}
              {tabValue === 2 && (
                <DataGrid
                  rows={canceledRows}
                  columns={columns}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  loading={loading}
                  sx={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    width: "85%",
                    height: "100vh",
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#111111",
                      color: "#ffffff",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      color: "red !important",
                      fontWeight: "700",
                      fontSize: "12px",
                    },

                    "& .MuiDataGrid-cell": {
                      color: "#ffffff",
                    },
                    "& .MuiDataGrid-row:hover": {
                      backgroundColor: "#222222",
                    },
                    "& .MuiCheckbox-root svg": {
                      color: "#ffffff",
                    },
                    "@media (max-width:600px)": {
                      width: "100vw",
                    },
                  }}
                />
              )}
            </Box>

            {/* Dialog for booking details */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogContent dividers sx={{ background: "#000000ad" }}>
                {selectedRow && (
                  <Box sx={{ lineHeight: 2 }}>
                    <FormControl
                      fullWidth
                      sx={{ mb: 2 }}
                      error={Boolean(error.Process)}
                    >
                      <InputLabel>Booking Status</InputLabel>
                      <Select
                        name="Process"
                        value={input.Process}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="">Select Status</MenuItem>
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="CONFIRM">Confirm</MenuItem>
                        <MenuItem value="COMPLETE">Complete</MenuItem>
                        <MenuItem value="CANCEL">Cancel</MenuItem>
                      </Select>
                      <Typography variant="caption" color="error">
                        {error.Process}
                      </Typography>
                    </FormControl>

                    <TextField
                      fullWidth
                      label="Host Message"
                      multiline
                      rows={3}
                      sx={{ mb: 2 }}
                      name="message"
                      value={input.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(error.message)}
                      helperText={error.message}
                    />

                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleSubmit(selectedRow.id)}
                    >
                      Approve
                    </Button>

                    <Box sx={{ mt: 2 }}>
                      <Typography>
                        <b>Guest Name:</b> {selectedRow.userName}
                      </Typography>
                      <Typography>
                        <b>Phone:</b> {selectedRow.phone}
                      </Typography>
                      <Typography>
                        <b>Property:</b> {selectedRow.propertyTitle}
                      </Typography>
                      <Typography>
                        <b>City:</b> {selectedRow.city}
                      </Typography>
                      <Typography>
                        <b>Check-In:</b> {selectedRow.checkIn}
                      </Typography>
                      <Typography>
                        <b>Check-Out:</b> {selectedRow.checkOut}
                      </Typography>
                      <Typography>
                        <b>Total Amount:</b> ₹ {selectedRow.totalAmount}
                      </Typography>
                      <Typography>
                        <b>Current Status:</b> {selectedRow.status}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </DialogContent>
            </Dialog>
          </Box>

          <ToastContainer
            position="top-left"
            autoClose={1000}
            newestOnTop
            pauseOnHover
            draggable
            toastStyle={{
              backgroundColor: "#111",
              color: "#fff",
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
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

export default AdminBooking;
