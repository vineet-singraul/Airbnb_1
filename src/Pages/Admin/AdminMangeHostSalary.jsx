// import axios from 'axios'
// import AdminLayout from './AdminLayout'
// import { useEffect, useState } from 'react'

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Chip,
//   CircularProgress
// } from '@mui/material'

// const AdminMangeHostSalary = () => {

//   const [hosts, setHosts] = useState([])
//   const [loading, setLoading] = useState(true)

//   const FetchAllHostDetails = async () => {
//     try {
//       const api = "http://127.0.0.1:8000/airbnb/Admin-Fatch-All-Host-Details/"
//       const res = await axios.get(api)
//       console.log("RESPONSE : ",res.data)
//       setHosts(res.data)
//     } catch (error) {
//       console.error("API Error:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     FetchAllHostDetails()
//   }, [])

//   return (
//     <AdminLayout>
//       <Typography variant="h5" gutterBottom>
//         Admin Host Salary Management
//       </Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><strong>Host Name</strong></TableCell>
//                 <TableCell><strong>Email</strong></TableCell>
//                 <TableCell><strong>Month / Year</strong></TableCell>
//                 <TableCell align="center"><strong>Properties</strong></TableCell>
//                 <TableCell align="right"><strong>Commission</strong></TableCell>
//                 <TableCell align="right"><strong>Bonus</strong></TableCell>
//                 <TableCell align="right"><strong>Penalty</strong></TableCell>
//                 <TableCell align="right"><strong>Final Payout</strong></TableCell>
//                 <TableCell align="center"><strong>Status</strong></TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {hosts.map((row) => (
//                 <TableRow key={row.id}>
//                   <TableCell>{row.host.name}</TableCell>
//                   <TableCell>{row.host.email}</TableCell>
//                   <TableCell>{row.month}/{row.year}</TableCell>
//                   <TableCell align="center">{row.total_properties}</TableCell>
//                   <TableCell align="right">₹{row.total_commission}</TableCell>
//                   <TableCell align="right">₹{row.bonus}</TableCell>
//                   <TableCell align="right">₹{row.penalty}</TableCell>
//                   <TableCell align="right">
//                     <strong>₹{row.final_payout}</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <Chip
//                       label={row.status}
//                       color={
//                         row.status === "paid"
//                           ? "success"
//                           : row.status === "pending"
//                           ? "warning"
//                           : "default"
//                       }
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </AdminLayout>
//   )
// }

// export default AdminMangeHostSalary

import axios from "axios";
import AdminLayout from "./AdminLayout";
import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";

import {
  Payment,
  CreditCard,
  CheckCircle,
  PendingActions,
  Cancel,
  AttachMoney,
  Visibility,
  Info,
} from "@mui/icons-material";

const AdminMangeHostSalary = () => {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHost, setSelectedHost] = useState(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const FetchAllHostDetails = async () => {
    try {
      const api = "http://127.0.0.1:8000/airbnb/Admin-Fatch-All-Host-Details/";
      const res = await axios.get(api);
      console.log("RESPONSE DATA STRUCTURE:", res.data);

      // Check the structure of your data
      if (res.data && res.data.length > 0) {
        console.log("First item structure:", res.data[0]);
        console.log("First item host structure:", res.data[0]?.host);
      }

      // Add unique id for DataGrid
      const hostsWithId = res.data.map((host, index) => ({
        ...host,
        id: host.id || `host-${index + 1}`,
      }));
      setHosts(hostsWithId);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchAllHostDetails();
  }, []);

  // Get last 30 entries (for Stripe payment button)
  const last30Entries = hosts.slice(-30);

  const handlePaymentClick = (host) => {
    setSelectedHost(host);
    setOpenPaymentDialog(true);
  };

  const handleStripePayment = async () => {
    if (!selectedHost) return;

    setPaymentProcessing(true);
    try {
        await axios.post(
        "http://127.0.0.1:8000/airbnb/create-payment-intent",
        {
            amount: selectedHost.final_payout * 100,
            hostId: selectedHost.id,
            hostEmail: selectedHost.host?.email || selectedHost.email,
        }
        );


      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update host status to paid
      setHosts((prevHosts) =>
        prevHosts.map((host) =>
          host.id === selectedHost.id ? { ...host, status: "paid" } : host,
        ),
      );

      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setOpenPaymentDialog(false);
        setPaymentProcessing(false);
        setSelectedHost(null);
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentProcessing(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Safe value getter for nested properties
  const getSafeValue = (params, path, defaultValue = "N/A") => {
    const keys = path.split(".");
    let value = params.row;

    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        return defaultValue;
      }
    }
    return value;
  };

  const columns = [
    {
      field: "hostName",
      headerName: "Host Name",
      flex: 1.2,
      minWidth: 180,
      valueGetter: (value, row) =>
        row.host?.name || row.name || row.host_name || "N/A",
    },

    {
      field: "hostEmail",
      headerName: "Email",
      flex: 1.5,
      minWidth: 200,
      valueGetter: (value, row) =>
        row.host?.email || row.email || row.host_email || "N/A",
    },

    {
      field: "monthYear",
      headerName: "Month / Year",
      flex: 1,
      minWidth: 120,
      valueGetter: (value, row) => `${row.month || "N/A"}/${row.year || "N/A"}`,
    },

    {
      field: "total_properties",
      headerName: "Properties",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 0.8,
      minWidth: 100,
    },

    {
      field: "total_commission",
      headerName: "Commission",
      type: "number",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 120,
      valueGetter: (value) => value ?? 0,
      valueFormatter: (value) => formatCurrency(value),
    },

    {
      field: "bonus",
      headerName: "Bonus",
      type: "number",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 100,
      valueGetter: (value) => value ?? 0,
      valueFormatter: (value) => formatCurrency(value),
    },

    {
      field: "penalty",
      headerName: "Penalty",
      type: "number",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 100,
      valueGetter: (value) => value ?? 0,
      valueFormatter: (value) => formatCurrency(value),
    },

    {
      field: "final_payout",
      headerName: "Final Payout",
      type: "number",
      headerAlign: "right",
      align: "right",
      flex: 1.2,
      minWidth: 140,
      valueGetter: (value) => value ?? 0,
      valueFormatter: (value) => formatCurrency(value),
      renderCell: ({ value }) => (
        <Typography variant="body1" fontWeight="bold" color="primary">
          {formatCurrency(value)}
        </Typography>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      valueGetter: (value) => value || "pending",
      renderCell: ({ value }) => {
        const status = value || "pending";
        const statusConfig = {
          paid: { color: "success", icon: <CheckCircle /> },
          pending: { color: "warning", icon: <PendingActions /> },
          default: { color: "error", icon: <Cancel /> },
        };

        const config = statusConfig[status] || statusConfig.default;

        return (
          <Chip
            icon={config.icon}
            label={status.toUpperCase()}
            color={config.color}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      },
    },

    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        const isLast30 = last30Entries.some((h) => h.id === row.id);
        const isPending = (row.status || "pending") === "pending";

        if (isLast30 && isPending) {
          return (
            <Tooltip title="Process Stripe Payment">
              <Button
                variant="contained"
                size="small"
                startIcon={<CreditCard />}
                onClick={() => handlePaymentClick(row)}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#635BFF",
                  "&:hover": { backgroundColor: "#4A42E6" },
                }}
              >
                Pay Now
              </Button>
            </Tooltip>
          );
        }

        return (
          <Tooltip title="View Details">
            <IconButton size="small">
              <Visibility />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AttachMoney sx={{ fontSize: 25, color: "primary.main" }} />
            Admin Host Salary Management
          </Typography>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Paper sx={{ position:'absolute',height: "calc(100vh - 200px)", width: "100%" }}>
            <DataGrid
              rows={hosts}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableSelectionOnClick
              components={{
                Toolbar: GridToolbar,
              }}
              sx={{
                border: "1px solid #e0e0e0",
                backgroundColor: "#000",
                width: "80%",
                height: "78vh",

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
              initialState={{
                sorting: {
                  sortModel: [{ field: "id", sort: "desc" }],
                },
              }}
              getRowId={(row) => row.id}
            />
          </Paper>
        )}

        {/* Stripe Payment Dialog */}
        <Dialog
          open={openPaymentDialog}
          onClose={() => !paymentProcessing && setOpenPaymentDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CreditCard color="primary" />
              Process Stripe Payment
            </Box>
          </DialogTitle>

          <DialogContent>
            {paymentSuccess ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CheckCircle
                  sx={{ fontSize: 60, color: "success.main", mb: 2 }}
                />
                <Typography variant="h6" color="success.main" gutterBottom>
                  Payment Successful!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Payment of{" "}
                  {selectedHost &&
                    formatCurrency(selectedHost.final_payout || 0)}
                  has been processed successfully.
                </Typography>
              </Box>
            ) : (
              <>
                {selectedHost && (
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Host Details
                        </Typography>
                        <Typography variant="body2">
                          <strong>Name:</strong>{" "}
                          {selectedHost.host?.name ||
                            selectedHost.name ||
                            selectedHost.host_name ||
                            "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Email:</strong>{" "}
                          {selectedHost.host?.email ||
                            selectedHost.email ||
                            selectedHost.host_email ||
                            "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Period:</strong> {selectedHost.month || "N/A"}
                          /{selectedHost.year || "N/A"}
                        </Typography>

                        <Box
                          sx={{
                            mt: 2,
                            pt: 2,
                            borderTop: 1,
                            borderColor: "divider",
                          }}
                        >
                          <Stack spacing={1}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="body2">
                                Commission:
                              </Typography>
                              <Typography variant="body2">
                                {formatCurrency(
                                  selectedHost.total_commission || 0,
                                )}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "-flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="body2">Bonus:</Typography>
                              <Typography variant="body2">
                                {formatCurrency(selectedHost.bonus || 0)}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="body2">Penalty:</Typography>
                              <Typography variant="body2">
                                -{formatCurrency(selectedHost.penalty || 0)}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 1,
                                pt: 1,
                                borderTop: 1,
                                borderColor: "divider",
                              }}
                            >
                              <Typography variant="body1" fontWeight={600}>
                                Total Payout:
                              </Typography>
                              <Typography
                                variant="body1"
                                fontWeight={600}
                                color="primary"
                              >
                                {formatCurrency(selectedHost.final_payout || 0)}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                )}

                <Alert severity="info" sx={{ mb: 2 }}>
                  This will process the payment through Stripe and mark the
                  status as "Paid". The host will receive a payment confirmation
                  email.
                </Alert>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <img
                    src="https://stripe.com/img/v3/home/social.png"
                    alt="Stripe"
                    style={{ height: "30px" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Secure payment processed by Stripe
                  </Typography>
                </Box>
              </>
            )}
          </DialogContent>

          <DialogActions>
            {!paymentSuccess && (
              <>
                <Button
                  onClick={() => setOpenPaymentDialog(false)}
                  disabled={paymentProcessing}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleStripePayment}
                  disabled={paymentProcessing}
                  startIcon={
                    paymentProcessing ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Payment />
                    )
                  }
                  sx={{
                    backgroundColor: "#635BFF",
                    "&:hover": {
                      backgroundColor: "#4A42E6",
                    },
                  }}
                >
                  {paymentProcessing ? "Processing..." : "Confirm Payment"}
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default AdminMangeHostSalary;
