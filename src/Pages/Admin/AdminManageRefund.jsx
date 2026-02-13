// import { useEffect, useState } from "react";
// import AdminLayout from "./AdminLayout";
// import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import { Button, Box, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";

// const AdminManageRefund = () => {

// const [cancelRows, setCancelRows] = useState([]);
// const [loading, setLoading] = useState(true);
// const [open, setOpen] = useState(false);
// const [selectedRow, setSelectedRow] = useState(null); // <-- add this

//   const fetchRefunds = async () => {
//     try {
//       const url = "http://127.0.0.1:8000/airbnb/Admin-Mange-Booking/";
//       const response = await axios.get(url);

//       // Filter only CANCEL bookings
//       const canceled = response.data.bookings.filter(
//         (b) => b.status === "CANCEL",
//       );

//       // Map data for DataGrid
//       const mappedRows = canceled.map((b) => ({
//         id: b.id,
//         userName: `${b.user.first_name} ${b.user.last_name}`,
//         phone: b.user.phone || "-",
//         propertyTitle: b.property.title,
//         city: b.property.city,
//         checkIn: b.check_in,
//         checkOut: b.check_out,
//         totalAmount: b.total_amount,
//         status: b.status,
//       }));

//       setCancelRows(mappedRows);
//     } catch (error) {
//       console.error("ERROR:", error.response || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRefunds();
//   }, []);

//     // --- Dialog handlers ---
//   const handleOpen = (row) => {
//     setSelectedRow(row);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedRow(null);
//   };

//   const columns = [
//     // { field: "id", headerName: "Booking ID", width: 110 },
//     { field: "userName", headerName: "Guest Name", width: 160 },
//     { field: "phone", headerName: "Phone", width: 140 },
//     { field: "city", headerName: "City", width: 130 },
//     { field: "checkIn", headerName: "Check-In", width: 120 },
//     { field: "checkOut", headerName: "Check-Out", width: 120 },
//     { field: "totalAmount", headerName: "Amount (₹)", width: 130 },
//     { field: "status", headerName: "Status", width: 130 },
//     {
//       field: "Refunds",
//       headerName: "Refunds AM",
//       width: 130,
//       renderCell: (params) => (
//       <Button variant="outlined" color="error"  onClick={() => handleOpen(params.row)}>
//         Refund
//       </Button>
//       ),
//     },
//   ];

//   return (
//     <AdminLayout>
//       <Typography variant="body2" sx={{ mb: 2, mt: 5, ml: 5 }}>
//         Admin Refund Management (CANCELED)
//       </Typography>

//       <Box sx={{ height: 500, width: "100%" }}>
//         <DataGrid
//           rows={cancelRows}
//           columns={columns}
//           pageSizeOptions={[5, 10]}
//           loading={loading}
//           sx={{
//             border: "1px solid #e0e0e0",
//             backgroundColor: "#000",
//             width: "85vw",
//             height: "80vh",
//             position: "absolute",

//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: "#000",
//             },

//             "& .MuiDataGrid-columnHeaderTitle": {
//               color: "red !important",
//               fontWeight: "700",
//               fontSize: "12px",
//             },

//             "& .MuiDataGrid-row:hover": {
//               backgroundColor: "#000000ff",
//             },

//             "& .MuiDataGrid-footerContainer": {
//               borderTop: "1px solid #000000ff",
//             },
//             "@media (max-width:600px)": {
//               width: "100vw",
//             },
//           }}
//         />
//       </Box>

//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Booking Details</DialogTitle>
//         <DialogContent dividers sx={{ backgroundColor: "#111", color: "#fff" }}>
//           {selectedRow && (
//             <Box sx={{ lineHeight: 2 }}>
//               <Typography>
//                 <b>Guest Name:</b> {selectedRow.userName}
//               </Typography>
//             </Box>
//           )}

//         </DialogContent>
//       </Dialog>

//     </AdminLayout>
//   );
// };

// export default AdminManageRefund;

// import { useEffect, useState } from "react";
// import AdminLayout from "./AdminLayout";
// import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import {
//   Button,
//   Box,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Alert,
//   Snackbar,
//   CircularProgress,
//   Paper,
//   Card,
//   CardContent,
//   Chip,
//   Fade,
//   Zoom,
//   Slide,
//   Collapse,
//   LinearProgress,
//   Divider
// } from "@mui/material";
// import {
//   Payment,
//   CheckCircle,
//   Close,
//   AccountBalanceWallet,
//   CurrencyRupee,
//   ArrowForward,
//   Verified,
//   ReceiptLong
// } from "@mui/icons-material";

// const AdminManageRefund = () => {
//   const [cancelRows, setCancelRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [loadingRefund, setLoadingRefund] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success"
//   });
//   const [paymentStep, setPaymentStep] = useState(0); // 0: Enter amount, 1: Processing, 2: Success
//   const [paymentProgress, setPaymentProgress] = useState(0);
//   const [transactionId, setTransactionId] = useState("");

//   const fetchRefunds = async () => {
//     try {
//       const url = "http://127.0.0.1:8000/airbnb/Admin-Mange-Booking/";
//       const response = await axios.get(url);

//       const canceled = response.data.bookings.filter(
//         (b) => b.status === "CANCEL"
//       );

//       const mappedRows = canceled.map((b) => ({
//         id: b.id,
//         userName: `${b.user.first_name} ${b.user.last_name}`,
//         email: b.user.email || "-",
//         phone: b.user.phone || "-",
//         propertyTitle: b.property.title,
//         city: b.property.city,
//         checkIn: b.check_in,
//         checkOut: b.check_out,
//         totalAmount: b.total_amount,
//         refundAmount: Math.round(b.total_amount * 0.8), // 80% refund
//         status: b.status,
//         bookingDate: b.created_at,
//         userId: b.user.id
//       }));

//       setCancelRows(mappedRows);
//     } catch (error) {
//       console.error("ERROR:", error.response || error.message);
//       showSnackbar("Failed to fetch bookings", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRefunds();
//   }, []);

//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleOpen = (row) => {
//     setSelectedRow(row);
//     setAmount(row.refundAmount);
//     setOpen(true);
//     setPaymentStep(0);
//     setPaymentProgress(0);
//     setTransactionId("");
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedRow(null);
//     setAmount("");
//     setPaymentStep(0);
//     setPaymentProgress(0);
//     setTransactionId("");
//   };

//   // Validate amount
//   const validateAmount = () => {
//     if (!amount || amount <= 0) {
//       showSnackbar("Please enter a valid amount", "error");
//       return false;
//     }

//     if (amount > selectedRow.refundAmount * 1.5) { // Allow up to 150% of refund amount
//       showSnackbar("Amount exceeds maximum refund limit", "error");
//       return false;
//     }

//     return true;
//   };

//   // Simulate payment processing with animation
//   const simulatePaymentProcessing = () => {
//     return new Promise((resolve) => {
//       let progress = 0;
//       const interval = setInterval(() => {
//         progress += 5;
//         setPaymentProgress(progress);

//         if (progress >= 100) {
//           clearInterval(interval);

//           // Generate transaction ID
//           const txnId = `TXN${Date.now()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
//           resolve({
//             success: true,
//             transactionId: txnId,
//             timestamp: new Date().toISOString()
//           });
//         }
//       }, 150);
//     });
//   };

//   const handleProcessPayment = async () => {
//     if (!validateAmount()) {
//       return;
//     }

//     setLoadingRefund(true);
//     setPaymentStep(1);

//     try {
//       // Step 1: Initiating payment
//       await new Promise(resolve => setTimeout(resolve, 800));

//       // Step 2: Processing payment with progress animation
//       const result = await simulatePaymentProcessing();

//       if (result.success) {
//         setTransactionId(result.transactionId);

//         // Update booking status in backend
//         await axios.post("http://127.0.0.1:8000/airbnb/update-refund-status/", {
//           bookingId: selectedRow.id,
//           status: "REFUNDED",
//           refundAmount: amount,
//           refundMethod: "System Payment",
//           transactionId: result.transactionId,
//           notes: "Payment processed via admin panel"
//         });

//         // Show success
//         await new Promise(resolve => setTimeout(resolve, 500));
//         setPaymentStep(2);

//         // Refresh data
//         setTimeout(() => {
//           fetchRefunds();
//         }, 1000);
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       showSnackbar("Failed to process payment", "error");
//       setPaymentStep(0);
//       setPaymentProgress(0);
//     } finally {
//       setLoadingRefund(false);
//     }
//   };

//   const columns = [
//     { field: "id", headerName: "Booking ID", width: 110 },
//     { field: "userName", headerName: "Guest Name", width: 160 },
//     { field: "phone", headerName: "Phone", width: 140 },
//     { field: "city", headerName: "City", width: 130 },
//     { field: "checkIn", headerName: "Check-In", width: 120 },
//     { field: "checkOut", headerName: "Check-Out", width: 120 },
//     {
//       field: "totalAmount",
//       headerName: "Total (₹)",
//       width: 100,
//       renderCell: (params) => `₹${params.value}`
//     },
//     {
//       field: "refundAmount",
//       headerName: "Refund (₹)",
//       width: 120,
//       renderCell: (params) => (
//         <Typography color="primary" fontWeight="bold">
//           ₹{params.value}
//         </Typography>
//       )
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 130,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           color="error"
//           size="small"
//           variant="outlined"
//         />
//       )
//     },
//     {
//       field: "actions",
//       headerName: "Refund Action",
//       width: 180,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           color="primary"
//           size="small"
//           onClick={() => handleOpen(params.row)}
//           startIcon={<Payment />}
//         >
//           Process Refund
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <AdminLayout>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: "primary.main" }}>
//           Refund Management
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//           Process refunds for canceled bookings
//         </Typography>

//         <Paper sx={{ height: 600, width: "100%", borderRadius: 2 }}>
//           <DataGrid
//             rows={cancelRows}
//             columns={columns}
//             pageSizeOptions={[5, 10, 25]}
//             loading={loading}
//             initialState={{
//               pagination: {
//                 paginationModel: { pageSize: 10 },
//               },
//             }}
//             sx={{
//               border: "none",
//               '& .MuiDataGrid-columnHeaders': {
//                 backgroundColor: 'primary.light',
//                 color: 'white',
//               },
//               '& .MuiDataGrid-row:hover': {
//                 backgroundColor: 'action.hover',
//               },
//               '& .MuiDataGrid-cell:focus': {
//                 outline: 'none',
//               },
//             }}
//           />
//         </Paper>

//         {/* Payment Dialog */}
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           maxWidth="sm"
//           fullWidth
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               overflow: 'hidden'
//             }
//           }}
//         >
//           <DialogTitle sx={{
//             bgcolor: 'primary.main',
//             color: 'white',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}>
//             <Typography variant="h6">
//               {paymentStep === 0 ? "Process Refund" :
//                paymentStep === 1 ? "Processing Payment" :
//                "Payment Successful"}
//             </Typography>
//             <IconButton onClick={handleClose} sx={{ color: 'white' }}>
//               <Close />
//             </IconButton>
//           </DialogTitle>

//           <DialogContent sx={{ p: 0 }}>
//             {paymentStep === 0 ? (
//               <Fade in={paymentStep === 0}>
//                 <Box sx={{ p: 3 }}>
//                   {/* Customer Info */}
//                   <Card sx={{ mb: 3, bgcolor: 'primary.light', color: 'white' }}>
//                     <CardContent>
//                       <Typography variant="subtitle1" gutterBottom>
//                         <AccountBalanceWallet sx={{ mr: 1, verticalAlign: 'middle' }} />
//                         Refund to Customer
//                       </Typography>
//                       <Typography variant="h6" fontWeight="bold">
//                         {selectedRow?.userName}
//                       </Typography>
//                       <Typography variant="body2">
//                         {selectedRow?.email} | {selectedRow?.phone}
//                       </Typography>
//                     </CardContent>
//                   </Card>

//                   {/* Booking Info */}
//                   <Card sx={{ mb: 3, border: '1px solid', borderColor: 'divider' }}>
//                     <CardContent>
//                       <Typography variant="subtitle1" gutterBottom color="primary">
//                         Booking Details
//                       </Typography>
//                       <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
//                         <Typography variant="body2"><b>Booking ID:</b> #{selectedRow?.id}</Typography>
//                         <Typography variant="body2"><b>Property:</b> {selectedRow?.propertyTitle}</Typography>
//                         <Typography variant="body2"><b>Check-in:</b> {selectedRow?.checkIn}</Typography>
//                         <Typography variant="body2"><b>Check-out:</b> {selectedRow?.checkOut}</Typography>
//                         <Typography variant="body2"><b>Original Amount:</b> ₹{selectedRow?.totalAmount}</Typography>
//                         <Typography variant="body2" color="primary" fontWeight="bold">
//                           <b>Refundable:</b> ₹{selectedRow?.refundAmount}
//                         </Typography>
//                       </Box>
//                     </CardContent>
//                   </Card>

//                   {/* Amount Input */}
//                   <Box sx={{ mb: 4 }}>
//                     <Typography variant="subtitle1" gutterBottom color="primary">
//                       Enter Refund Amount
//                     </Typography>
//                     <TextField
//                       fullWidth
//                       label="Amount in ₹"
//                       type="number"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                       InputProps={{
//                         startAdornment: <CurrencyRupee sx={{ mr: 1, color: 'text.secondary' }} />,
//                         sx: { fontSize: '1.5rem', fontWeight: 'bold', py: 1 }
//                       }}
//                       helperText={`Maximum refundable amount: ₹${selectedRow?.refundAmount}`}
//                       error={amount > selectedRow?.refundAmount * 1.5}
//                     />

//                     <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <Button
//                         size="small"
//                         onClick={() => setAmount(selectedRow?.refundAmount * 0.5)}
//                         variant="outlined"
//                       >
//                         50%
//                       </Button>
//                       <Button
//                         size="small"
//                         onClick={() => setAmount(selectedRow?.refundAmount)}
//                         variant="outlined"
//                       >
//                         100%
//                       </Button>
//                       <Button
//                         size="small"
//                         onClick={() => setAmount(selectedRow?.refundAmount * 0.8)}
//                         variant="outlined"
//                       >
//                         80%
//                       </Button>
//                     </Box>
//                   </Box>

//                   {/* Payment Summary */}
//                   <Card sx={{ bgcolor: 'grey.50', border: '1px dashed', borderColor: 'primary.main' }}>
//                     <CardContent>
//                       <Typography variant="subtitle1" gutterBottom color="primary">
//                         Payment Summary
//                       </Typography>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                         <Typography>Refund Amount:</Typography>
//                         <Typography fontWeight="bold">₹{amount || 0}</Typography>
//                       </Box>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                         <Typography>Processing Fee:</Typography>
//                         <Typography>₹0</Typography>
//                       </Box>
//                       <Divider sx={{ my: 1 }} />
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                         <Typography variant="subtitle1" fontWeight="bold">Total to Pay:</Typography>
//                         <Typography variant="h6" color="primary" fontWeight="bold">
//                           ₹{amount || 0}
//                         </Typography>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Box>
//               </Fade>
//             ) : paymentStep === 1 ? (
//               <Slide direction="left" in={paymentStep === 1}>
//                 <Box sx={{ p: 4, textAlign: 'center' }}>
//                   {/* Payment Processing Animation */}
//                   <Box sx={{ position: 'relative', width: 120, height: 120, mx: 'auto', mb: 3 }}>
//                     <CircularProgress
//                       variant="determinate"
//                       value={paymentProgress}
//                       size={120}
//                       thickness={4}
//                       sx={{ color: 'primary.main' }}
//                     />
//                     <Box sx={{
//                       position: 'absolute',
//                       top: '50%',
//                       left: '50%',
//                       transform: 'translate(-50%, -50%)',
//                       textAlign: 'center'
//                     }}>
//                       <Typography variant="h5" fontWeight="bold">
//                         {paymentProgress}%
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Typography variant="h5" gutterBottom fontWeight="bold">
//                     Processing Payment
//                   </Typography>

//                   <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//                     Please wait while we process your payment of ₹{amount}
//                   </Typography>

//                   {/* Step by step animation */}
//                   <Box sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
//                     <Collapse in={paymentProgress > 20}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                         <CheckCircle sx={{ color: 'success.main', mr: 2 }} />
//                         <Typography>Payment initiated</Typography>
//                       </Box>
//                     </Collapse>

//                     <Collapse in={paymentProgress > 50}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                         <CheckCircle sx={{ color: paymentProgress > 50 ? 'success.main' : 'disabled', mr: 2 }} />
//                         <Typography>Verifying transaction</Typography>
//                       </Box>
//                     </Collapse>

//                     <Collapse in={paymentProgress > 80}>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <CheckCircle sx={{ color: paymentProgress > 80 ? 'success.main' : 'disabled', mr: 2 }} />
//                         <Typography>Processing refund</Typography>
//                       </Box>
//                     </Collapse>
//                   </Box>

//                   <LinearProgress
//                     variant="determinate"
//                     value={paymentProgress}
//                     sx={{ height: 8, borderRadius: 4, mb: 2 }}
//                   />

//                   <Typography variant="caption" color="text.secondary">
//                     Do not close this window while payment is being processed
//                   </Typography>
//                 </Box>
//               </Slide>
//             ) : (
//               <Zoom in={paymentStep === 2}>
//                 <Box sx={{ p: 4, textAlign: 'center' }}>
//                   {/* Success Animation */}
//                   <Box sx={{
//                     width: 100,
//                     height: 100,
//                     borderRadius: '50%',
//                     bgcolor: 'success.light',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mx: 'auto',
//                     mb: 3,
//                     animation: 'pulse 1.5s infinite'
//                   }}>
//                     <CheckCircle sx={{ fontSize: 60, color: 'success.main' }} />
//                   </Box>

//                   <Typography variant="h4" gutterBottom fontWeight="bold" color="success.main">
//                     Payment Successful!
//                   </Typography>

//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     ₹{amount} has been refunded
//                   </Typography>

//                   <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//                     to {selectedRow?.userName}
//                   </Typography>

//                   {/* Transaction Details */}
//                   <Card sx={{ maxWidth: 400, mx: 'auto', mb: 3, bgcolor: 'success.50' }}>
//                     <CardContent>
//                       <Typography variant="subtitle1" gutterBottom color="success.main">
//                         <ReceiptLong sx={{ mr: 1, verticalAlign: 'middle' }} />
//                         Transaction Details
//                       </Typography>
//                       <Box sx={{ textAlign: 'left', pl: 1 }}>
//                         <Typography variant="body2"><b>Transaction ID:</b> {transactionId}</Typography>
//                         <Typography variant="body2"><b>Date & Time:</b> {new Date().toLocaleString()}</Typography>
//                         <Typography variant="body2"><b>Booking ID:</b> #{selectedRow?.id}</Typography>
//                         <Typography variant="body2"><b>Payment Method:</b> System Payment</Typography>
//                       </Box>
//                     </CardContent>
//                   </Card>

//                   <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
//                     <Verified sx={{ color: 'primary.main' }} />
//                     <Typography variant="body2" color="text.secondary">
//                       Transaction completed successfully
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Zoom>
//             )}
//           </DialogContent>

//           <DialogActions sx={{ p: 3, bgcolor: 'grey.50' }}>
//             {paymentStep === 0 ? (
//               <>
//                 <Button onClick={handleClose} color="inherit">
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={handleProcessPayment}
//                   disabled={!amount || amount <= 0 || loadingRefund}
//                   startIcon={<Payment />}
//                   endIcon={<ArrowForward />}
//                   size="large"
//                   sx={{
//                     minWidth: 180,
//                     boxShadow: 3,
//                     '&:hover': {
//                       boxShadow: 6,
//                       transform: 'translateY(-2px)'
//                     },
//                     transition: 'all 0.3s'
//                   }}
//                 >
//                   Pay ₹{amount || 0}
//                 </Button>
//               </>
//             ) : paymentStep === 1 ? (
//               <Button
//                 variant="outlined"
//                 onClick={handleClose}
//                 disabled={loadingRefund}
//               >
//                 Cancel Payment
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 onClick={handleClose}
//                 startIcon={<CheckCircle />}
//                 size="large"
//                 sx={{
//                   bgcolor: 'success.main',
//                   '&:hover': { bgcolor: 'success.dark' }
//                 }}
//               >
//                 Done
//               </Button>
//             )}
//           </DialogActions>
//         </Dialog>

//         {/* Snackbar for notifications */}
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={4000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         >
//           <Alert
//             severity={snackbar.severity}
//             onClose={() => setSnackbar({ ...snackbar, open: false })}
//             variant="filled"
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>

//         {/* CSS Animation for pulse effect */}
//         <style>
//           {`
//             @keyframes pulse {
//               0% {
//                 transform: scale(1);
//                 opacity: 1;
//               }
//               50% {
//                 transform: scale(1.05);
//                 opacity: 0.9;
//               }
//               100% {
//                 transform: scale(1);
//                 opacity: 1;
//               }
//             }
//           `}
//         </style>
//       </Box>
//     </AdminLayout>
//   );
// };

// export default AdminManageRefund;

import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  Chip,
  Fade,
  Zoom,
  Slide,
  Collapse,
  LinearProgress,
  Divider,
  Stack,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import {
  Payment,
  CheckCircle,
  Close,
  AccountBalanceWallet,
  CurrencyRupee,
  ArrowForward,
  Verified,
  ReceiptLong,
} from "@mui/icons-material";

const AdminManageRefund = () => {
  const [cancelRows, setCancelRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [amount, setAmount] = useState("");
  const [loadingRefund, setLoadingRefund] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [paymentStep, setPaymentStep] = useState(0);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [apiError, setApiError] = useState("");
  const adminId = localStorage.getItem("adminId");

  const fetchRefunds = async () => {
    try {
      setLoading(true);
      const url = "http://127.0.0.1:8000/airbnb/Admin-Mange-Booking/";
      const response = await axios.get(url);

      if (response.data && response.data.bookings) {
        // Handle both status cases: "cancelled" and "CANCEL"
        const canceled = response.data.bookings.filter(
          (b) => b.status === "cancelled" || b.status === "CANCEL",
        );

        const mappedRows = canceled.map((b) => {
          const refundAmt = b.refund_amount || Math.round(b.total_amount * 0.8);

          return {
            id: b.id,
            userName: `${b.user.first_name} ${b.user.last_name}`,
            email: b.user.email || "-",
            phone: b.user.phone || "-",
            propertyTitle: b.property.title,
            city: b.property.city,
            checkIn: b.check_in,
            checkOut: b.check_out,
            totalAmount: b.total_amount,
            refundAmount: refundAmt,
            status: b.status,
            bookingDate: b.created_at,
            userId: b.user.id,
          };
        });

        setCancelRows(mappedRows);
      } else {
        showSnackbar("No booking data found", "warning");
      }
    } catch (error) {
      console.error("ERROR:", error);
      showSnackbar("Failed to fetch bookings. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleOpen = (row) => {
    setSelectedRow(row);
    setAmount(row.refundAmount);
    setOpen(true);
    setPaymentStep(0);
    setPaymentProgress(0);
    setTransactionId("");
    setApiError("");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setAmount("");
    setPaymentStep(0);
    setPaymentProgress(0);
    setTransactionId("");
    setApiError("");
  };

  const validateAmount = () => {
    if (!amount || amount <= 0) {
      showSnackbar("Please enter a valid amount", "error");
      return false;
    }

    if (amount > selectedRow.refundAmount * 1.5) {
      showSnackbar("Amount exceeds maximum refund limit", "error");
      return false;
    }

    return true;
  };

  const simulatePaymentProcessing = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setPaymentProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);

          const txnId = `TXN${Date.now()}${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`;
          resolve({
            success: true,
            transactionId: txnId,
            timestamp: new Date().toISOString(),
          });
        }
      }, 150);
    });
  };

  const handleProcessPayment = async () => {
    if (!validateAmount()) {
      return;
    }

    setLoadingRefund(true);
    setPaymentStep(1);
    setApiError("");

    try {
      // Step 1: Initiating payment
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Step 2: Processing payment with progress animation
      const result = await simulatePaymentProcessing();

      if (result.success) {
        setTransactionId(result.transactionId);

        // Prepare request data
        const requestData = {
          bookingId: selectedRow.id,
          status: "REFUNDED",
          refundAmount: parseFloat(amount),
          refundMethod: "System Payment",
          transactionId: result.transactionId,
          notes: "Payment processed via admin panel",
        };

        console.log("Sending refund request:", requestData);

        try {
          // Update booking status in backend
          const response = await axios.post(
            "http://127.0.0.1:8000/airbnb/update-refund-status/",
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          console.log("Backend response:", response.data);

          if (response.data.success) {
            // Show success
            await new Promise((resolve) => setTimeout(resolve, 500));
            setPaymentStep(2);

            // Refresh data
            setTimeout(() => {
              fetchRefunds();
            }, 1000);

            showSnackbar(
              response.data.message || "Refund processed successfully!",
              "success",
            );
          } else {
            throw new Error(
              response.data.message || "Failed to update refund status",
            );
          }
        } catch (apiError) {
          console.error("API Error:", apiError);
          setApiError(
            apiError.response?.data?.message || apiError.message || "API Error",
          );
          throw apiError;
        }
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      showSnackbar(
        apiError ||
          error.message ||
          "Failed to process payment. Please try again.",
        "error",
      );
      setPaymentStep(0);
      setPaymentProgress(0);
    } finally {
      setLoadingRefund(false);
    }
  };

  const columns = [
    { field: "id", headerName: "Booking ID", width: 110 },
    { field: "userName", headerName: "Guest Name", width: 160 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "city", headerName: "City", width: 130 },
    { field: "checkIn", headerName: "Check-In", width: 120 },
    { field: "checkOut", headerName: "Check-Out", width: 120 },
    {
      field: "totalAmount",
      headerName: "Total (₹)",
      width: 100,
      renderCell: (params) => `₹${params.value}`,
    },
    {
      field: "refundAmount",
      headerName: "Refund (₹)",
      width: 120,
      renderCell: (params) => (
        <Typography color="primary" fontWeight="bold">
          ₹{params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="error"
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Refund Action",
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleOpen(params.row)}
          startIcon={<Payment />}
        >
          Process Refund
        </Button>
      ),
    },
  ];

  return (
    <>
      {adminId ? (
        <AdminLayout>
          <Box sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Process refunds for canceled bookings
            </Typography>

            {apiError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {apiError}
              </Alert>
            )}

            <Paper sx={{ height: 600, width: "100%", borderRadius: 2 }}>
              <DataGrid
                rows={cancelRows}
                columns={columns}
                pageSizeOptions={[5, 10, 25]}
                loading={loading}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }}
                sx={{
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#000",
                  width: "75%",
                  position: "absolute",
                  // left:'0px',

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
                    left: "0px",
                  },
                }}
              />
            </Paper>

            {/* Payment Dialog */}
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="sm"
              fullWidth
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  overflow: "hidden",
                },
              }}
            >
              <DialogTitle
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  {paymentStep === 0
                    ? "Process Refund"
                    : paymentStep === 1
                      ? "Processing Payment"
                      : "Payment Successful"}
                </Typography>
                <IconButton onClick={handleClose} sx={{ color: "white" }}>
                  <Close />
                </IconButton>
              </DialogTitle>

              <DialogContent sx={{ p: 0 }}>
                {paymentStep === 0 ? (
                  <Fade in={paymentStep === 0}>
                    <Box sx={{ p: 3 }}>
                      {/* Customer Info */}
                      <Card
                        sx={{ mb: 3, bgcolor: "primary.light", color: "white" }}
                      >
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom>
                            <AccountBalanceWallet
                              sx={{ mr: 1, verticalAlign: "middle" }}
                            />
                            Refund to Customer
                          </Typography>
                          <Typography variant="h6" fontWeight="bold">
                            {selectedRow?.userName}
                          </Typography>
                          <Typography variant="body2">
                            {selectedRow?.email} | {selectedRow?.phone}
                          </Typography>
                        </CardContent>
                      </Card>

                      {/* Booking Info */}
                      <Card
                        sx={{
                          mb: 3,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            color="primary"
                          >
                            Booking Details
                          </Typography>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: 1.5,
                            }}
                          >
                            <Typography variant="body2">
                              <b>Booking ID:</b> #{selectedRow?.id}
                            </Typography>
                            <Typography variant="body2">
                              <b>Property:</b> {selectedRow?.propertyTitle}
                            </Typography>
                            <Typography variant="body2">
                              <b>Check-in:</b> {selectedRow?.checkIn}
                            </Typography>
                            <Typography variant="body2">
                              <b>Check-out:</b> {selectedRow?.checkOut}
                            </Typography>
                            <Typography variant="body2">
                              <b>Original Amount:</b> ₹
                              {selectedRow?.totalAmount}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="primary"
                              fontWeight="bold"
                            >
                              <b>Refundable:</b> ₹{selectedRow?.refundAmount}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>

                      {/* Amount Input */}
                      <Box sx={{ mb: 4 }}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          color="primary"
                        >
                          Enter Refund Amount
                        </Typography>
                        <TextField
                          fullWidth
                          label="Amount in ₹"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <CurrencyRupee
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                            ),
                            sx: {
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                              py: 1,
                            },
                          }}
                          helperText={`Maximum refundable amount: ₹${selectedRow?.refundAmount}`}
                          error={amount > selectedRow?.refundAmount * 1.5}
                        />

                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Button
                            size="small"
                            onClick={() =>
                              setAmount(
                                Math.round(selectedRow?.refundAmount * 0.5),
                              )
                            }
                            variant="outlined"
                          >
                            50%
                          </Button>
                          <Button
                            size="small"
                            onClick={() => setAmount(selectedRow?.refundAmount)}
                            variant="outlined"
                          >
                            100%
                          </Button>
                          <Button
                            size="small"
                            onClick={() =>
                              setAmount(
                                Math.round(selectedRow?.refundAmount * 0.8),
                              )
                            }
                            variant="outlined"
                          >
                            80%
                          </Button>
                        </Box>
                      </Box>

                      {/* Payment Summary */}
                      <Card
                        sx={{
                          bgcolor: "grey.50",
                          border: "1px dashed",
                          borderColor: "primary.main",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            color="primary"
                          >
                            Payment Summary
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography>Refund Amount:</Typography>
                            <Typography fontWeight="bold">
                              ₹{amount || 0}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography>Processing Fee:</Typography>
                            <Typography>₹0</Typography>
                          </Box>
                          <Divider sx={{ my: 1 }} />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle1" fontWeight="bold">
                              Total to Pay:
                            </Typography>
                            <Typography
                              variant="h6"
                              color="primary"
                              fontWeight="bold"
                            >
                              ₹{amount || 0}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Fade>
                ) : paymentStep === 1 ? (
                  <Slide direction="left" in={paymentStep === 1}>
                    <Box sx={{ p: 4, textAlign: "center" }}>
                      {/* Payment Processing Animation */}
                      <Box
                        sx={{
                          position: "relative",
                          width: 120,
                          height: 120,
                          mx: "auto",
                          mb: 3,
                        }}
                      >
                        <CircularProgress
                          variant="determinate"
                          value={paymentProgress}
                          size={120}
                          thickness={4}
                          sx={{ color: "primary.main" }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h5" fontWeight="bold">
                            {paymentProgress}%
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        Processing Payment
                      </Typography>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                      >
                        Please wait while we process your payment of ₹{amount}
                      </Typography>

                      {/* Step by step animation */}
                      <Box sx={{ maxWidth: 400, mx: "auto", mb: 3 }}>
                        <Collapse in={paymentProgress > 20}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <CheckCircle
                              sx={{ color: "success.main", mr: 2 }}
                            />
                            <Typography>Payment initiated</Typography>
                          </Box>
                        </Collapse>

                        <Collapse in={paymentProgress > 50}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <CheckCircle
                              sx={{
                                color:
                                  paymentProgress > 50
                                    ? "success.main"
                                    : "disabled",
                                mr: 2,
                              }}
                            />
                            <Typography>Verifying transaction</Typography>
                          </Box>
                        </Collapse>

                        <Collapse in={paymentProgress > 80}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CheckCircle
                              sx={{
                                color:
                                  paymentProgress > 80
                                    ? "success.main"
                                    : "disabled",
                                mr: 2,
                              }}
                            />
                            <Typography>Processing refund</Typography>
                          </Box>
                        </Collapse>
                      </Box>

                      <LinearProgress
                        variant="determinate"
                        value={paymentProgress}
                        sx={{ height: 8, borderRadius: 4, mb: 2 }}
                      />

                      <Typography variant="caption" color="text.secondary">
                        Do not close this window while payment is being
                        processed
                      </Typography>
                    </Box>
                  </Slide>
                ) : (
                  <Zoom in={paymentStep === 2}>
                    <Box sx={{ p: 4, textAlign: "center" }}>
                      {/* Success Animation */}
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: "50%",
                          bgcolor: "success.light",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 3,
                          animation: "pulse 1.5s infinite",
                        }}
                      >
                        <CheckCircle
                          sx={{ fontSize: 60, color: "success.main" }}
                        />
                      </Box>

                      <Typography
                        variant="h4"
                        gutterBottom
                        fontWeight="bold"
                        color="success.main"
                      >
                        Payment Successful!
                      </Typography>

                      <Typography variant="h6" sx={{ mb: 2 }}>
                        ₹{amount} has been refunded
                      </Typography>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                      >
                        to {selectedRow?.userName}
                      </Typography>

                      {/* Transaction Details */}
                      <Card
                        sx={{
                          maxWidth: 400,
                          mx: "auto",
                          mb: 3,
                          bgcolor: "success.50",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            color="success.main"
                          >
                            <ReceiptLong
                              sx={{ mr: 1, verticalAlign: "middle" }}
                            />
                            Transaction Details
                          </Typography>
                          <Box sx={{ textAlign: "left", pl: 1 }}>
                            <Typography variant="body2">
                              <b>Transaction ID:</b> {transactionId}
                            </Typography>
                            <Typography variant="body2">
                              <b>Date & Time:</b> {new Date().toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                              <b>Booking ID:</b> #{selectedRow?.id}
                            </Typography>
                            <Typography variant="body2">
                              <b>Payment Method:</b> System Payment
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 2,
                          mt: 3,
                        }}
                      >
                        <Verified sx={{ color: "primary.main" }} />
                        <Typography variant="body2" color="text.secondary">
                          Transaction completed successfully
                        </Typography>
                      </Box>
                    </Box>
                  </Zoom>
                )}
              </DialogContent>

              <DialogActions sx={{ p: 3, bgcolor: "grey.50" }}>
                {paymentStep === 0 ? (
                  <>
                    <Button onClick={handleClose} color="inherit">
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleProcessPayment}
                      disabled={!amount || amount <= 0 || loadingRefund}
                      startIcon={<Payment />}
                      endIcon={<ArrowForward />}
                      size="large"
                      sx={{
                        minWidth: 180,
                        boxShadow: 3,
                        "&:hover": {
                          boxShadow: 6,
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s",
                      }}
                    >
                      Pay ₹{amount || 0}
                    </Button>
                  </>
                ) : paymentStep === 1 ? (
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    disabled={loadingRefund}
                  >
                    Cancel Payment
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    startIcon={<CheckCircle />}
                    size="large"
                    sx={{
                      bgcolor: "success.main",
                      "&:hover": { bgcolor: "success.dark" },
                    }}
                  >
                    Done
                  </Button>
                )}
              </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
              open={snackbar.open}
              autoHideDuration={4000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                variant="filled"
              >
                {snackbar.message}
              </Alert>
            </Snackbar>

            {/* CSS Animation for pulse effect */}
            <style>
              {`
            @keyframes pulse {
              0% {
                transform: scale(1);
                opacity: 1;
              }
              50% {
                transform: scale(1.05);
                opacity: 0.9;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}
            </style>
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

export default AdminManageRefund;
