import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import HostLayout from "./HostLayout";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  Skeleton,
  IconButton,
  useTheme,
  alpha,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast, ToastContainer } from "react-toastify";
import RefreshIcon from "@mui/icons-material/Refresh";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const HostDashboard = () => {
  const theme = useTheme();
  const HostEmail = localStorage.getItem("HostEmail");

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [input, setInput] = useState({
    message: "",
    Process: "",
  });

  // Premium color palette
  const COLORS = [
    theme.palette.warning.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  // ================= FETCH DATA =================
  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     try {
  //       const api = `http://127.0.0.1:8000/airbnb/Host-Dashboard/${HostEmail}`;
  //       const response = await axios.get(api);

  //       const mappedRows = response.data.bookings.map((booking) => ({
  //         id: booking.id,
  //         userName: `${booking.user.first_name} ${booking.user.last_name}`,
  //         phone: booking.user.phone,
  //         checkIn: booking.check_in,
  //         checkOut: booking.check_out,
  //         propertyTitle: booking.property.title,
  //         city: booking.property.city,
  //         totalAmount: booking.total_amount,
  //         status: booking.status?.toLowerCase(),
  //         createdAt: booking.created_at,
  //       }));

  //       setRows(mappedRows);
  //     } catch (error) {
  //       console.error("Error fetching bookings:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDetails();
  // }, [HostEmail]);


  const fetchDetails = async () => {
  setLoading(true);
  try {
    const api = `http://127.0.0.1:8000/airbnb/Host-Dashboard/${HostEmail}`;
    const response = await axios.get(api);

    const mappedRows = response.data.bookings.map((booking) => ({
      id: booking.id,
      userName: `${booking.user.first_name} ${booking.user.last_name}`,
      phone: booking.user.phone,
      checkIn: booking.check_in,
      checkOut: booking.check_out,
      propertyTitle: booking.property.title,
      city: booking.property.city,
      totalAmount: booking.total_amount,
      status: booking.status?.toLowerCase(),
      createdAt: booking.created_at,
    }));

    setRows(mappedRows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchDetails();
}, [HostEmail]);

  // ================= DASHBOARD CALCULATIONS =================
  const totalRevenue = useMemo(
    () => rows.reduce((sum, row) => sum + Number(row.totalAmount || 0), 0),
    [rows]
  );

  const totalProperty = useMemo(
    () => new Set(rows.map((row) => row.propertyTitle)).size,
    [rows]
  );

  const pendingCount = rows.filter((r) => r.status === "pending").length;


  const bookingsByDate = Object.values(
  rows.reduce((acc, row) => {
    const dateObj = new Date(row.createdAt);

    // Local date format without timezone shifting
    const date = dateObj.getFullYear() +
      "-" +
      String(dateObj.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(dateObj.getDate()).padStart(2, "0");

    if (!acc[date]) {
      acc[date] = { date, count: 0 };
    }

    acc[date].count += 1;
    return acc;
  }, {})
).sort((a, b) => new Date(a.date) - new Date(b.date));


  const pendingRows = rows.filter((r) => r.status === "pending" || r.status === "PENDING");
  const confirmedRows = rows.filter(
    (r) => r.status === "complete" || r.status === "confirmed"
  );
  const cancelRows = rows.filter((r) => r.status === "cancel");


  const statusDistribution = [
    { name: "Pending", value: pendingRows.length },
    { name: "Confirmed", value: confirmedRows.length },
    { name: "Cancelled", value: cancelRows.length },
  ];

  // ================= HANDLERS =================
  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setInput({ message: "", Process: "" });
  };

  const handleSubmit = async (id) => {
    if (!input.Process || !input.message) {
      toast.error("All fields required");
      return;
    }

    try {
      const api = `http://127.0.0.1:8000/airbnb/Host-Approvel-Process/${id}/`;
      const response = await axios.put(api, input);
      toast.success(response.data.msg);
      handleClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ================= DATAGRID COLUMNS =================
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "userName", headerName: "Guest", width: 160 },
    { field: "propertyTitle", headerName: "Property", width: 180 },
    { field: "city", headerName: "City", width: 120 },
    { field: "checkIn", headerName: "Check-In", width: 120 },
    { 
      field: "totalAmount", 
      headerName: "Amount", 
      width: 120,
      renderCell: (params) => (
        <Typography fontWeight="600" color="success.main">
          ₹ {params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value?.toUpperCase()}
          color={
            params.value === "pending"
              ? "warning"
              : params.value === "cancel"
              ? "error"
              : "success"
          }
          size="small"
          sx={{ fontWeight: 600, borderRadius: 1 }}
        />
      ),
    },
    {
      field: "action",
      headerName: "View",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpen(params.row)}
          sx={{
            borderRadius: 2,
            boxShadow: 0,
            '&:hover': { boxShadow: 2 }
          }}
        >
          View
        </Button>
      ),
    },
  ];

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper elevation={3} sx={{ p: 1.5, bgcolor: 'background.paper' }}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h6" color="primary.main">
            {payload[0].value} bookings
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <HostLayout>
      <Box sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="800" 
            sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dashboard Overview
          </Typography>
          <Chip 
            label={`Host: ${HostEmail || 'N/A'}`} 
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
        </Box>

        {/* ================= SUMMARY CARDS ================= */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {loading ? (
            Array.from(new Array(4)).map((_, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Skeleton variant="rounded" height={140} sx={{ borderRadius: 4 }} />
              </Grid>
            ))
          ) : (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <Card 
                  sx={{ 
                    borderRadius: 4,
                    background: `linear-gradient(145deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: 'white',
                    boxShadow: 4,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                          Total Bookings
                        </Typography>
                        <Typography variant="h3" fontWeight="700">
                          {rows.length}
                        </Typography>
                      </Box>
                      <TrendingUpIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card 
                  sx={{ 
                    borderRadius: 4,
                    background: `linear-gradient(145deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                    color: 'white',
                    boxShadow: 4,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                          Revenue
                        </Typography>
                        <Typography variant="h3" fontWeight="700">
                          ₹{totalRevenue.toLocaleString()}
                        </Typography>
                      </Box>
                      <AttachMoneyIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card 
                  sx={{ 
                    borderRadius: 4,
                    background: `linear-gradient(145deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
                    color: 'white',
                    boxShadow: 4,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                          Properties
                        </Typography>
                        <Typography variant="h3" fontWeight="700">
                          {totalProperty}
                        </Typography>
                      </Box>
                      <HomeIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card 
                  sx={{ 
                    borderRadius: 4,
                    background: `linear-gradient(145deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
                    color: 'white',
                    boxShadow: 4,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                          Pending
                        </Typography>
                        <Typography variant="h3" fontWeight="700">
                          {pendingCount}
                        </Typography>
                      </Box>
                      <PendingActionsIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>

        {/* ================= CHARTS SECTION ================= */}
        <div container spacing={3} sx={{ mb: 5 }}>
          {/* Line Chart */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 4,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="700" gutterBottom>
                  Bookings Trend
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Daily booking volume
                </Typography>
                <Box sx={{ height: 280, width: '100%' }}>
                  {loading ? (
                    <Skeleton variant="rounded" height={280} />
                  ) : (
                    <ResponsiveContainer>
                      <LineChart data={bookingsByDate} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                          tickLine={false}
                        />
                        <YAxis 
                          allowDecimals={false}
                          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke={theme.palette.primary.main}
                          strokeWidth={3}
                          dot={{ fill: theme.palette.primary.main, strokeWidth: 2, stroke: theme.palette.background.paper }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 4,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="700" gutterBottom>
                  Booking Status
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Current distribution
                </Typography>
                <Box sx={{ height: 280, width: '100%' }}>
                  {loading ? (
                    <Skeleton variant="circular" width={200} height={200} sx={{ mx: 'auto' }} />
                  ) : (
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={statusDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {statusDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend 
                          verticalAlign="bottom" 
                          align="center"
                          wrapperStyle={{ paddingTop: 20 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </div>

        {/* ================= TABS & TABLE ================= */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: 2,
            overflow: 'hidden',
            mb: 4
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2 }}>
            <Tabs 
              value={tabValue} 
              onChange={(e, val) => setTabValue(val)}
              sx={{
                '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: '1rem' },
                '& .Mui-selected': { color: theme.palette.primary.main },
                '& .MuiTabs-indicator': { backgroundColor: theme.palette.primary.main, height: 3 }
              }}
            >
              <Tab label={`Confirmed (${confirmedRows.length})`} />
              <Tab label={`Pending (${pendingRows.length})`} />
              <Tab label={`Cancelled (${cancelRows.length})`} />
            </Tabs>
          </Box>

          <Box sx={{ height: 450, width: '100%', p: 2 }}>
          <Button 
            variant="contained" 
            startIcon={<RefreshIcon />} 
            onClick={fetchDetails}
          >
          </Button>

            <DataGrid
              rows={
                tabValue === 0
                  ? confirmedRows
                  : tabValue === 1
                  ? pendingRows
                  : cancelRows
              }
              columns={columns}
              loading={loading}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': { borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  fontWeight: 700,
                },
                '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700 },
                '& .MuiDataGrid-row:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.02) },
              }}
            />
          </Box>
        </Paper>

        {/* ================= DIALOG ================= */}
        <Dialog 
          open={open} 
          onClose={handleClose} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: { borderRadius: 4, p: 1 }
          }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
            <Typography variant="h6" fontWeight="700">Booking Management</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ px: 3, py: 2 }}>
            {selectedRow && (
              <Box>
                {/* Booking Summary */}
                <Paper 
                  variant="outlined" 
                  sx={{ p: 2, mb: 3, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.02) }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Booking #{selectedRow.id}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Guest</Typography>
                      <Typography variant="body1" fontWeight="600">{selectedRow.userName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Property</Typography>
                      <Typography variant="body1" fontWeight="600">{selectedRow.propertyTitle}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Amount</Typography>
                      <Typography variant="body1" fontWeight="700" color="success.main">
                        ₹ {selectedRow.totalAmount}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Current Status</Typography>
                      <Chip 
                        label={selectedRow.status?.toUpperCase()} 
                        size="small"
                        color={
                          selectedRow.status === "pending" ? "warning" :
                          selectedRow.status === "cancel" ? "error" : "success"
                        }
                        sx={{ mt: 0.5 }}
                      />
                    </Grid>
                  </Grid>
                </Paper>

                <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                  Update Status
                </Typography>

                <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                  <InputLabel>Select Action</InputLabel>
                  <Select
                    label="Select Action"
                    value={input.Process}
                    onChange={(e) => setInput({ ...input, Process: e.target.value })}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="pending">⏳ Pending</MenuItem>
                    <MenuItem value="confirmed">✅ Confirm</MenuItem>
                    <MenuItem value="complete">🎉 Complete</MenuItem>
                    <MenuItem value="cancel">❌ Cancel</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Message to guest"
                  placeholder="Write a brief note..."
                  sx={{ mt: 3 }}
                  value={input.message}
                  onChange={(e) => setInput({ ...input, message: e.target.value })}
                  InputProps={{ sx: { borderRadius: 2 } }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: 3, 
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: 700,
                    boxShadow: 4,
                    '&:hover': { boxShadow: 8 }
                  }}
                  onClick={() => handleSubmit(selectedRow.id)}
                >
                  Update Booking
                </Button>
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
          theme="light"
        />
      </Box>
    </HostLayout>
  );
};

export default HostDashboard;