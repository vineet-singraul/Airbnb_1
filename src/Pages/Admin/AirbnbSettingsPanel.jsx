import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  Switch,
  DialogContent,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  Person,
  Notifications,
  Receipt,
  PictureAsPdf,
  Feedback,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { DataGrid } from "@mui/x-data-grid";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { jsPDF } from "jspdf";
import "../../styles/Admin/AdminAllUsers.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


/* ---------- Tab Panel ---------- */
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

/* ---------- Main Component ---------- */
const AirbnbSettingsPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows2, setRows2] = useState([]);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const [allSwitch, setAllSwitch] = useState({
    mute_add_property: false,
    mute_add_services: false,
    mute_edit: false,
    mute_notifications: false,
    mute_notification_management: false,
  });
  const adminId = localStorage.getItem("adminId")

  const location = useLocation();
  const navigate = useNavigate();



  /* ---------- Fetch Payments ---------- */
  const fetchAllPaymentsDetails = async () => {
    try {
      setLoading(true);
      const api = "http://127.0.0.1:8000/airbnb/Admin-Manage-Paymets/";
      const response = await axios.get(api);

      const formattedRows = response.data.map((item) => ({
        id: item.id,
        orderId: item.razorpay_order_id,
        paymentId: item.razorpay_payment_id,
        amount: `₹${item.amount}`,
        currency: item.currency,
        status: item.captured ? "Success" : "Failed",
        date: new Date(item.created_at).toLocaleString(),

        userName: `${item.user_details.first_name} ${item.user_details.last_name}`,
        userPhone: item.user_details.phone,
        userEmail: item.user_details.email,
        userImage: item.user_details.image,
        userAddress: item.user_details.address,

        hostName: `${item.host_details.first_name} ${item.host_details.last_name}`,
        hostPhone: item.host_details.phone,
        hostCity: item.host_details.city,
        hostCountry: item.host_details.country,
      }));

      setRows(formattedRows);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPaymentsDetails();
  }, []);


  useEffect(() => {
  if (location.state?.tab === "notifications") {
      setActiveTab(1); // Notifications tab index = 1
    }
  }, [location.state]);

  /* ---------- WhatsApp Invoice ---------- */
  const sendInvoiceWhatsApp = (row) => {
    if (!row?.userPhone) return;

    const message = `Invoice Details:%0A
        Customer: ${row.userName}%0A
        Email: ${row.userEmail}%0A
        Payment ID: ${row.paymentId}%0A
        Order ID: ${row.orderId}%0A
        Amount: ${row.amount}%0A
        Status: ${row.status}%0A
        Date: ${row.date}%0A
        Host: ${row.hostName}%0A
        Location: ${row.hostCity}, ${row.hostCountry}`;
    Image: `${row.profile_photo}`;

    const url = `https://wa.me/91${row.userPhone}?text=${message}`;
    window.open(url, "_blank");
  };

  /* ---------- Generate PDF Invoice ---------- */
  const generatePDF = (row) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Invoice Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`Customer: ${row.userName}`, 20, 40);
    doc.text(`Email: ${row.userEmail}`, 20, 50);
    doc.text(`Phone: ${row.userPhone}`, 20, 60);
    doc.text(`Address: ${row.userAddress}`, 20, 70);
    doc.text(`Host: ${row.hostName}`, 20, 80);
    doc.text(`Amount: ${row.amount}`, 20, 90);
    doc.text(`Status: ${row.status}`, 20, 100);
    doc.text(`Date: ${row.date}`, 20, 110);
    doc.text(`profile_photo: ${row.profile_photo}`, 20, 110);

    doc.save(`Invoice_${row.paymentId}.pdf`);
  };

  /* ---------- View Details ---------- */
  const handleViewDetails = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "user",
      headerName: "User",
      width: 220,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1} overflow="hidden">
          <Avatar src={params.row.userImage} sx={{ width: 32, height: 32 }} />
          <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
            {params.row.userName}
          </Typography>
        </Box>
      ),
    },
    {
      field: "hostName",
      headerName: "Host",
      width: 160,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 110,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
    },
    {
      field: "date",
      headerName: "Date",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: "#FF5A5F",
            borderColor: "#FF5A5F",
            fontSize: "11px",
          }}
          onClick={() => handleShowMore(params.row)}
        >
          Show More
        </Button>
      ),
    },
  ];

  const handleSwich = (e) => {
    const { name, value } = e.target;
    setAllSwitch((values) => ({ ...values, [name]: value }));
  };

  const handleCheckApplyed = async () => {
    const api = "http://127.0.0.1:8000/airbnb/Admin-Approved-Swich/";
    const response = await axios.post(api, allSwitch);
    toast.success("Settings saved successful");
    setTimeout(() => {
    navigate("/Admin-Mange-Host");
    }, 1500);

  };



  const fetchAllDetails = async () => {
  try {
    setLoading(true);
    const api = "http://127.0.0.1:8000/airbnb/Admin-Manage-FeedBack/";
    const response = await axios.get(api);

    // Flatten the nested data
    const formattedRows = response.data.map((item) => ({
      ...item,
      user_name: item.user ? `${item.user.first_name} ${item.user.last_name}` : "",
      host_name: item.host ? item.host.host_name : "",
    }));

    setRows2(formattedRows);
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchAllDetails();
  }, []);

  const handleShowMore = (row) => {
    setSelectedFeedback(row);
    setOpenFeedback(true);
  };

  const column = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "user_name",
      headerName: "User Name",
      width: 150,
    },
    {
      field: "host_name",
      headerName: "Host Name",
      width: 150,
    },
    {
      field: "report_count",
      headerName: "Reports",
      width: 100,
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 250,
    },
    {
      field: "is_resolved",
      headerName: "Resolved",
      width: 120,
      renderCell: (params) => (params.value ? "✅ Yes" : "❌ No"),
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: "#FF5A5F",
            borderColor: "#FF5A5F",
            fontSize: "11px",
          }}
          onClick={() => handleShowMore(params.row)}
        >
          Show More
        </Button>
      ),
    },
  ];

  const sendInvoiceAlertToHost = (feedback) => {
    if (!feedback?.host?.phone) {
      toast.error("Host phone number not available");
      return;
    }

    const message = `
                  Invoice / Report Alert

                  👤 User ID: ${feedback.user}
                  🏠 Host Name: ${feedback.host.host_name}

                  📞 Host Phone: ${feedback.host.phone}
                  📍 Location: ${feedback.host.city}, ${feedback.host.country}

                  📝 Reason: ${feedback.reason}
                  🚨 Report Count: ${feedback.report_count}
                  📅 Date: ${feedback.created_at}

                  ⚠️ Please review this report in your dashboard.
                  `;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/91${feedback.host.phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };


  const sendEmailAlertToHost = (feedback) => {
  if (!feedback?.host?.email) {
    toast.error("Host email not available");
    return;
  }

  const subject = `⚠️ Report Alert Notification to ${feedback.host.host_name}`;
  const body = `
            Hello ${feedback.host.host_name},

            You have received a report.

            Reason: ${feedback.reason}
            Report Count: ${feedback.report_count}
            Location: ${feedback.host.city}, ${feedback.host.country}

            Please login to your dashboard and review this.

            – Admin Team
              `;

  // Open default email client
  window.location.href = `mailto:${feedback.host.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};


  return (
   <>
   {adminId ? 
  
      <AdminLayout>
      <Container
        maxWidth="xl"
        sx={{ mt: 4, mb: 4, width: "100vw", position: "absolute" }}
      >
        <Paper
          id="MainSetting"
          elevation={3}
          sx={{ borderRadius: 3, background: "#262522", width: "100vw" }}
        >
          <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
            <Tab icon={<Person />} label="Payments" />
            <Tab icon={<Notifications />} label="Notifications" />
            <Tab icon={<Feedback />} label="Feedback" />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            <DataGrid
              rows={rows}
              columns={columns}
              loading={loading}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                height: "60vh",
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
              }}
              id="settinofAdmin"
            />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Typography variant="h6" sx={{ mb: 2, color: "#FF5A5F" }}>
              Notifications Management
            </Typography>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                gap: 2,
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                background: "#262522",
                width: "60vw",
              }}
            >
              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  background: "#262522",
                  border: "1px solid #0000007e",
                }}
              >
                <Typography variant="body2" sx={{ mb: 2, color: "#FF5A5F" }}>
                  Mute Add Property
                </Typography>
                <Switch
                  onChange={handleSwich}
                  name="muteAddProperty"
                  slotProps={{ input: { "aria-label": "controlled" } }}
                />
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  background: "#262522",
                  border: "1px solid #0000007e",
                }}
              >
                <Typography variant="body2" sx={{ mb: 2, color: "#FF5A5F" }}>
                  Mute Add Services
                </Typography>
                <Switch
                  onChange={handleSwich}
                  name="muteAddServices"
                  slotProps={{ input: { "aria-label": "controlled" } }}
                />
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  background: "#262522",
                  border: "1px solid #0000007e",
                }}
              >
                <Typography variant="body2" sx={{ mb: 2, color: "#FF5A5F" }}>
                  Mute edit property by host
                </Typography>
                <Switch
                  onChange={handleSwich}
                  name="muteEdit"
                  slotProps={{ input: { "aria-label": "controlled" } }}
                />
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  background: "#262522",
                  border: "1px solid #0000007e",
                }}
              >
                <Typography variant="body2" sx={{ mb: 2, color: "#FF5A5F" }}>
                  Mute Notifications
                </Typography>
                <Switch
                  onChange={handleSwich}
                  name="muteNotifications"
                  slotProps={{ input: { "aria-label": "controlled" } }}
                />
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  background: "#262522",
                  border: "1px solid #0000007e",
                }}
              >
                <Typography variant="body2" sx={{ mb: 2, color: "#FF5A5F" }}>
                  Notifications Management
                </Typography>
                <Switch
                  onChange={handleSwich}
                  name="muteNotificationManageMent"
                  slotProps={{ input: { "aria-label": "controlled" } }}
                />
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  background: "#262522",
                  border: "1px solid #0000007e",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  endIcon={<SendIcon />}
                  onClick={handleCheckApplyed}
                >
                  Applyed
                </Button>
              </Paper>
            </Paper>
            <Typography variant="body" sx={{ mb: 2, color: "#290001" }}>
              Rules & Important Notes:
              <br />
              <br />
              1. All notification switches will always remain <b>OFF</b> by
              default, even if the data is saved as <b>true</b> in the database.
              <br />
              <br />
              2. Saving the data does not automatically turn the switches ON.
              The system stores the value internally, but the UI state will not
              change.
              <br />
              <br />
              3. If you want to enable any notification, you must manually turn
              the switch ON each time.
              <br />
              <br />
              4. After a page refresh or reload, all switches will reset to the
              OFF state automatically.
              <br />
              <br />
              5. This behavior is intentional to prevent accidental activation
              of notifications and to ensure manual admin control.
            </Typography>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <DataGrid
              rows={rows2}
              columns={column}
              loading={loading}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                height: "60vh",
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
              }}
              id="settinofAdmin"
            />
          </TabPanel>

          <Paper
            sx={{
              p: 3,
              display: "flex",
              background: "#262522",
              border: "1px solid #0000007e",
            }}
          ></Paper>
        </Paper>

        {/* ---------- Details Modal ---------- */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Payment Details</DialogTitle>
          <DialogContent>
            {selectedRow && (
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography>
                  <b>User:</b> {selectedRow.userName}
                </Typography>
                <Typography>
                  <b>Email:</b> {selectedRow.userEmail}
                </Typography>
                <Typography>
                  <b>Phone:</b> {selectedRow.userPhone}
                </Typography>
                <Typography>
                  <b>Address:</b> {selectedRow.userAddress}
                </Typography>
                <Typography>
                  <b>Host:</b> {selectedRow.hostName}
                </Typography>
                <Typography>
                  <b>Amount:</b> {selectedRow.amount}
                </Typography>
                <Typography>
                  <b>Status:</b> {selectedRow.status}
                </Typography>
                <Typography>
                  <b>Date:</b> {selectedRow.date}
                </Typography>

                {/* ---------- Buttons Inside Modal ---------- */}
                <Box display="flex" gap={2} mt={2}>
                  <Button
                    variant="outlined"
                    startIcon={<PictureAsPdf />}
                    onClick={() => generatePDF(selectedRow)}
                  >
                    PDF
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<Receipt />}
                    onClick={() => sendInvoiceWhatsApp(selectedRow)}
                  >
                    WhatsApp
                  </Button>
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>

        {/* ---------- Details Modal ---------- */}
        <Dialog
          open={openFeedback}
          onClose={() => setOpenFeedback(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Feedback Details</DialogTitle>

          <DialogContent>
            {selectedFeedback && (
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography>
                  <b>User:</b> {selectedFeedback.user.first_name} {selectedFeedback.user.last_name}
                </Typography>

                <Typography>
                  <b>Host:</b> {selectedFeedback.host.host_name}
                </Typography>
                <Typography>
                  <b>Reason:</b> {selectedFeedback.reason}
                </Typography>

                <Typography>
                  <b>Reports:</b> {selectedFeedback.report_count}
                </Typography>

                <Typography>
                  <b>Resolved:</b> {selectedFeedback.is_resolved ? "Yes" : "No"}
                </Typography>

                <Typography>
                  <b>Date:</b> {selectedFeedback.created_at}
                </Typography>

                <Typography>
                  <b>phone:</b> {selectedFeedback.host.phone}
                </Typography>

                <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                  <Button variant="contained" color="success">
                    Mark Resolved
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setOpenFeedback(false)}
                  >
                    Close
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#25D366", // WhatsApp Green
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#1ebe5d",
                      },
                    }}
                    onClick={() => sendInvoiceAlertToHost(selectedFeedback)}
                  >
                    Send Invoice Report Alert to Host
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => sendEmailAlertToHost(selectedFeedback)}
                  >
                    Send Email Alert to Host
                  </Button>

                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          limit={3}
        />
      </Container>
    </AdminLayout>
  
  :


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
  
  }
   </>
  );
};

export default AirbnbSettingsPanel;
