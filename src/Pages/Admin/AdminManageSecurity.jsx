import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

import {
  Box,
  Chip,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
  Badge,
  LinearProgress,
  Paper,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import LockPersonIcon from "@mui/icons-material/LockPerson";

import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import MapIcon from "@mui/icons-material/Map";
import SecurityIcon from "@mui/icons-material/Security";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import WarningIcon from "@mui/icons-material/Warning";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HistoryIcon from "@mui/icons-material/History";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../styles/Admin/AdminAllUsers.css"

const AdminManageSecurity = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loginCountFilter, setLoginCountFilter] = useState("all");
  const [showSuspiciousOnly, setShowSuspiciousOnly] = useState(false);
  const [stats, setStats] = useState({
    totalLogins: 0,
    activeUsers: 0,
    suspiciousActivities: 0,
    blockedUsers: 0,
  });
  const adminId = localStorage.getItem("adminId")


  // Dark theme styles
  const darkThemeStyles = {
    backgroundColor: '#121212',
    color: '#ffffff',
    '& .MuiTypography-root': {
      color: '#ffffff'
    },
    '& .MuiCard-root': {
      backgroundColor: '#1e1e1e',
      color: '#ffffff',
      border: '1px solid #333'
    },
    '& .MuiPaper-root': {
      backgroundColor: '#1e1e1e',
      color: '#ffffff',
      border: '1px solid #333'
    },
    '& .MuiTextField-root .MuiOutlinedInput-root': {
      color: '#ffffff',
      '& fieldset': {
        borderColor: '#555'
      },
      '&:hover fieldset': {
        borderColor: '#888'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2'
      }
    },
    '& .MuiInputLabel-root': {
      color: '#aaa'
    },
    '& .MuiSelect-select': {
      color: '#ffffff'
    },
    '& .MuiSelect-icon': {
      color: '#aaa'
    },
    '& .MuiChip-root': {
      backgroundColor: '#333',
      color: '#ffffff'
    },
    '& .MuiDivider-root': {
      borderColor: '#444'
    },
    '& .MuiDialog-root .MuiPaper-root': {
      backgroundColor: '#1e1e1e',
      color: '#ffffff'
    },
    '& .MuiButton-outlined': {
      borderColor: '#555',
      color: '#ffffff',
      '&:hover': {
        borderColor: '#888',
        backgroundColor: 'rgba(255, 255, 255, 0.08)'
      }
    },
    '& .MuiButton-contained': {
      backgroundColor: '#1976d2',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#1565c0'
      }
    },
    '& .MuiButton-text': {
      color: '#ffffff'
    }
  };

  // Fetch login history
  const fetchLoginHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/airbnb/Admin-Manage-Login-History/"
      );
      const data = response.data.map((item) => ({
        ...item,
        id: item.id,
        isSuspicious: detectSuspiciousActivity(item),
        ipDetails: null,
      }));
      setRows(data);
      setFilteredRows(data);
      updateStats(data);
    } catch (error) {
      console.error("API ERROR:", error);
      showSnackbar("Failed to load login history", "error");
    } finally {
      setLoading(false);
    }
  };

  // Detect suspicious activity
  const detectSuspiciousActivity = (user) => {
    const suspiciousPatterns = {
      highLoginCount: user.login_count > 10,
      inactiveUserActive: !user.status_login && user.login_count > 0,
      multipleLocations: false,
    };
    return Object.values(suspiciousPatterns).some(pattern => pattern === true);
  };

  // Get IP details
  const getIPDetails = async (ip) => {
    try {
      if (!ip || ip === "N/A") return { city: "Unknown", country: "Unknown", isp: "Unknown" };
      
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      return response.data;
    } catch (error) {
      console.error("IP API Error:", error);
      return { city: "Unknown", country: "Unknown", isp: "Unknown" };
    }
  };

  // Update statistics
  const updateStats = (data) => {
    const suspiciousCount = data.filter(user => user.isSuspicious).length;
    const activeCount = data.filter(user => user.status_login).length;
    const blockedCount = data.filter(user => !user.status_login).length;
    
    setStats({
      totalLogins: data.length,
      activeUsers: activeCount,
      suspiciousActivities: suspiciousCount,
      blockedUsers: blockedCount,
    });
  };

  // Filter users
  const applyFilters = useCallback(() => {
    let filtered = rows;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.host_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_names?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(user => 
        statusFilter === "active" ? user.status_login : !user.status_login
      );
    }

    if (loginCountFilter !== "all") {
      switch(loginCountFilter) {
        case "high": filtered = filtered.filter(user => user.login_count > 10); break;
        case "medium": filtered = filtered.filter(user => user.login_count > 5 && user.login_count <= 10); break;
        case "low": filtered = filtered.filter(user => user.login_count <= 5); break;
      }
    }

    if (showSuspiciousOnly) {
      filtered = filtered.filter(user => user.isSuspicious);
    }

    setFilteredRows(filtered);
  }, [rows, searchTerm, statusFilter, loginCountFilter, showSuspiciousOnly]);

  // Handle block user
  const handleBlock = async (row) => {
    if (window.confirm(`Are you sure you want to ${row.status_login ? 'block' : 'unblock'} ${row.host_email}?`)) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/airbnb/Admin-Manage-Login-History/block/",
          { email: row.host_email, block: row.status_login }
        );
        
        const updatedRows = rows.map(user =>
          user.host_email === row.host_email 
            ? { ...user, status_login: !user.status_login }
            : user
        );
        
        setRows(updatedRows);
        applyFilters();
        showSnackbar(
          `${row.host_email} has been ${row.status_login ? 'blocked' : 'unblocked'} successfully`,
          "success"
        );
      } catch (error) {
        console.error("Block user error:", error);
        showSnackbar("Failed to update user status", "error");
      }
    }
  };

  // Handle export to CSV
  const handleExportCSV = () => {
    if (filteredRows.length === 0) {
      showSnackbar("No data to export", "warning");
      return;
    }

    try {
      const csvContent = [
        ['Name', 'Email', 'Login Count', 'Status', 'Last Login', 'IP Address', 'Suspicious'],
        ...filteredRows.map(row => [
          `${row.name || ''} ${row.last_names || ''}`,
          row.host_email || '',
          row.login_count || 0,
          row.status_login ? 'Active' : 'Inactive',
          row.login_time ? new Date(row.login_time).toLocaleString() : '-',
          row.ip_address || 'N/A',
          row.isSuspicious ? 'Yes' : 'No'
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `login-history-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      showSnackbar("Data exported successfully", "success");
    } catch (error) {
      console.error("Export error:", error);
      showSnackbar("Failed to export data", "error");
    }
  };

  // Show snackbar notification
  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // View details
  const handleViewDetails = async (row) => {
    setSelectedRow(row);
    setOpenDetails(true);
    
    if (row.ip_address && !row.ipDetails) {
      try {
        const ipDetails = await getIPDetails(row.ip_address);
        const updatedRows = rows.map(user => 
          user.id === row.id ? { ...user, ipDetails } : user
        );
        setRows(updatedRows);
        setSelectedRow(prev => ({ ...prev, ipDetails }));
      } catch (error) {
        console.error("Failed to load IP details:", error);
      }
    }
  };

  // Close details dialog
  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedRow(null);
  };

  // Open map
  const handleOpenMap = (row) => {
    if (row.lat && row.lon) {
      window.open(
        `https://www.google.com/maps?q=${row.lat},${row.lon}&z=15`,
        "_blank"
      );
    } else {
      alert("Coordinates not available for this user");
    }
  };

  // View login history for user
  const handleViewLoginHistory = (row) => {
    alert(`View detailed login history for: ${row.host_email}`);
  };

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Initial fetch
  useEffect(() => {
    fetchLoginHistory();
  }, []);

  // Enhanced columns with dark theme
  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 90,
      sortable: false,
      renderCell: (params) => {
        const { name, last_names, image, isSuspicious } = params.row;
        const initials = `${name?.[0] || ""}${last_names?.[0] || ""}`.toUpperCase();
        return (
          <Badge
            color="error"
            variant="dot"
            invisible={!isSuspicious}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar 
              src={image || ""} 
              sx={{ 
                bgcolor: isSuspicious ? '#ff9800' : '#1976d2',
                width: 40,
                height: 40
              }}
            >
              {!image && initials}
            </Avatar>
          </Badge>
        );
      },
    },
    { 
      field: "name", 
      headerName: "First Name", 
      width: 150,
      valueGetter: (params) => params || "N/A",
      headerClassName: 'dark-header',
      cellClassName: 'dark-cell'
    },
    { 
      field: "last_names", 
      headerName: "Last Name", 
      width: 150,
      valueGetter: (params) => params || "N/A",
      headerClassName: 'dark-header',
      cellClassName: 'dark-cell'
    },
    { 
      field: "host_email", 
      headerName: "Email", 
      width: 260,
      valueGetter: (params) => params || "N/A",
      headerClassName: 'dark-header',
      cellClassName: 'dark-cell'
    },
    {
      field: "ip_address",
      headerName: "IP Address",
      width: 150,
      renderCell: (params) => {
        const ip = params.value;
        const ipDetails = params.row.ipDetails;
        return (
          <Tooltip 
            title={ipDetails ? 
              `${ipDetails.city || 'Unknown'}, ${ipDetails.country || 'Unknown'}` : 
              (ip ? "Click View Details for location" : "No IP available")
            }
          >
            <Chip
              label={ip || "N/A"}
              size="small"
              variant="outlined"
              sx={{ 
                backgroundColor: '#333',
                color: '#fff',
                borderColor: '#555',
                '& .MuiChip-label': {
                  color: '#fff'
                }
              }}
            />
          </Tooltip>
        );
      },
      headerClassName: 'dark-header',
    },
    {
      field: "login_time",
      headerName: "Login Time",
      width: 200,
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleString() : "-",
      headerClassName: 'dark-header',
      cellClassName: 'dark-cell'
    },
    {
      field: "login_count",
      headerName: "Login Count",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value || 0}
          size="small"
          color={
            params.value > 10 ? "error" :
            params.value > 5 ? "warning" : "default"
          }
          icon={params.value > 10 ? <WarningIcon /> : undefined}
          sx={{ 
            backgroundColor: params.value > 10 ? '#d32f2f' : 
                            params.value > 5 ? '#ed6c02' : '#333',
            color: '#fff'
          }}
        />
      ),
      headerClassName: 'dark-header',
    },
    {
      field: "status_login",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Active" : "Blocked"}
          sx={{ 
            backgroundColor: params.value ? '#2e7d32' : '#d32f2f',
            color: '#fff'
          }}
          size="small"
          icon={params.value ? <LockOpenIcon /> : <LockIcon />}
        />
      ),
      headerClassName: 'dark-header',
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon sx={{ color: '#fff' }} />}
          label="View Details"
          onClick={() => handleViewDetails(params.row)}
          showInMenu
          sx={{ backgroundColor:'#000000 !important' }}
        />,
        <GridActionsCellItem
          icon={<HistoryIcon sx={{ color: '#fff' }} />}
          label="Login History"
          onClick={() => handleViewLoginHistory(params.row)}
          showInMenu
          sx={{ backgroundColor:'#000000 !important' }}
        />,
        <GridActionsCellItem
          icon={<MapIcon sx={{ color: '#fff' }} />}
          label="View Location"
          onClick={() => handleOpenMap(params.row)}
          showInMenu
          disabled={!params.row.lat || !params.row.lon}
          sx={{ backgroundColor:'#000000 !important' }}
        />,
        <GridActionsCellItem
          icon={params.row.status_login ? 
            <BlockIcon sx={{ color: params.row.status_login ? '#f44336' : '#4caf50' }} /> : 
            <LockOpenIcon sx={{ color: params.row.status_login ? '#f44336' : '#4caf50' }} />
          }
          label={params.row.status_login ? "Block User" : "Unblock User"}
          onClick={() => handleBlock(params.row)}
          showInMenu
          sx={{ backgroundColor:'#000000 !important',color: params.row.status_login ? '#f44336' : '#4caf50' }}
        />,
      ],
      headerClassName: 'dark-header',
    },
  ];

  // DataGrid dark theme styles
  const dataGridStyles = {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
    '& .MuiDataGrid-main': {
      color: '#fff'
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#2d2d2d',
      borderBottom: '1px solid #444',
      color: '#fff'
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      color: '#fff',
      fontWeight: 'bold'
    },
    '& .MuiDataGrid-cell': {
      color: '#fff',
      borderBottom: '1px solid #333'
    },
    '& .MuiDataGrid-row': {
      backgroundColor: '#1e1e1e',
      '&:hover': {
        backgroundColor: '#2d2d2d'
      },
      '&.Mui-selected': {
        backgroundColor: '#1976d2',
        '&:hover': {
          backgroundColor: '#1565c0'
        }
      }
    },
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: '#2d2d2d',
      borderTop: '1px solid #444',
      color: '#fff'
    },
    '& .MuiTablePagination-root': {
      color: '#fff'
    },
    '& .MuiIconButton-root': {
      color: '#fff'
    },
    '& .MuiDataGrid-menuIconButton': {
      color: '#fff'
    },
    '& .MuiDataGrid-sortIcon': {
      color: '#fff'
    },
    '& .MuiDataGrid-toolbarContainer': {
      color: '#fff'
    }
  };

  return (
    <>
     {adminId ?

          <AdminLayout>
      <Box sx={{ 
        p: 3,
        backgroundColor: 'var(--card-bg) !important',
        // background:'red',
        minHeight: '100vh',
        color: '#ffffff',
        position:'absolute',
        width:'100vw',
        height:'170vh',
      }}>
        {/* Header with Stats */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" display="flex" alignItems="center" gap={1} sx={{ color: '#fff' }}>
            <SecurityIcon sx={{ color: '#1976d2' }} /> Security Dashboard
          </Typography>
          <Box display="flex" gap={1}>
            <Tooltip title="Refresh Data">
              <IconButton 
                onClick={fetchLoginHistory} 
                disabled={loading}
                sx={{ 
                  color: '#fff',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export to CSV">
              <IconButton 
                onClick={handleExportCSV} 
                disabled={filteredRows.length === 0}
                sx={{ 
                  color: '#fff',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* ********** Statistics ********** */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ 
              backgroundColor: '#1e1e1e',
              border: '1px solid #333'
            }}>
              <CardContent sx={{boxShadow:'inset 0 0 6px 3px #006385c4'}}>
                <Typography color="#aaa" gutterBottom>Total Logins</Typography>
                <Typography variant="h4" sx={{ color: '#fff' }}>{stats.totalLogins}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{boxShadow:'inset 0 0 6px 3px #006385c4'}}>
              <CardContent>
                <Typography color="#aaa" gutterBottom>Active Users</Typography>
                <Typography variant="h4" sx={{ color: '#4caf50' }}>{stats.activeUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{boxShadow:'inset 0 0 6px 3px #006385c4'}}>
              <CardContent>
                <Typography color="#aaa" gutterBottom>Suspicious U</Typography>
                <Typography variant="h4" sx={{ color: '#ff9800' }}>{stats.suspiciousActivities}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{boxShadow:'inset 0 0 6px 3px #006385c4'}}>
              <CardContent>
                <Typography color="#aaa" gutterBottom>Blocked U</Typography>
                <Typography variant="h4" sx={{ color: '#f44336' }}>{stats.blockedUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* ******************************** */}



        {/* ************ Filters *********** */}
        <Paper elevation={1} sx={{ 
          p: 2, 
          mb: 3,
          width: '70vw',
          flexShrink: 0,
          boxShadow:'inset 0 0 6px 3px #006385c4'
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: '#aaa' }} />,
                }}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background:'#000000af',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Blocked</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: '#aaa' }}>Login Count</InputLabel>
                <Select
                  value={loginCountFilter}
                  label="Login Count"
                  onChange={(e) => setLoginCountFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="high">High (&gt;10)</MenuItem>
                  <MenuItem value="medium">Medium (6-10)</MenuItem>
                  <MenuItem value="low">Low (≤5)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant={showSuspiciousOnly ? "contained" : "outlined"}
                color="warning"
                onClick={() => setShowSuspiciousOnly(!showSuspiciousOnly)}
                startIcon={<WarningIcon />}
                size="small"
                sx={{
                  backgroundColor: '#b30000f4',
                  color: '#000000',
                  borderColor: '#ed6c02',
                  '&:hover': {
                    backgroundColor: showSuspiciousOnly ? '#e65100' : 'rgba(237, 108, 2, 0.1)',
                    borderColor: '#ff9800'
                  }
                }}
              >
                Suspicious Only
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setLoginCountFilter('all');
                  setShowSuspiciousOnly(false);
                }}
                size="small"
                sx={{
                  color: '#000000',
                  backgroundColor: 'rgb(0, 255, 110)',
                  '&:hover': {
                    borderColor: '#888',
                    backgroundColor: 'rgb(255, 0, 0)'
                  }
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {/* ******************************** */}



        {/* ************ Data Grid ********* */}
        <Box id="mainSecurityAdminDataGrid" sx={{ height: 600, position: 'relative' }}>
          {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />}
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
              sorting: {
                sortModel: [{ field: 'login_time', sort: 'desc' }],
              },
            }}
            pageSizeOptions={[10, 25, 50]}
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                width: "80%",
                height:'100vh',
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
                  background:'pink !importent'
                },
              }}
              style={{width:'78vw'}}
          />
          {filteredRows.length === 0 && !loading && (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography sx={{ color: '#aaa' }}>No matching records found</Typography>
            </Box>
          )}
        </Box>
        {/* ******************************** */}


        {/* Results Count */}
        <Typography variant="body2" sx={{ color: '#aaa', mt: 1 }}>
          Showing {filteredRows.length} of {rows.length} users
        </Typography>

        {/* User Details Dialog */}
        <Dialog 
          open={openDetails} 
          onClose={handleCloseDetails}
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: {
                border: "1px solid #e0e0e0",
                backgroundColor: "#000",
                width: "75%",
                position:'absolute',

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
                  width: "100vw !important",
                },
              }
          }}
        >
          <DialogTitle sx={{ color: '#fff', borderBottom: '1px solid #333' }}>
            User Security Details
          </DialogTitle>
          <DialogContent dividers sx={{ borderColor: '#333' }}>
            {selectedRow && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <Badge
                      color="error"
                      variant="dot"
                      invisible={!selectedRow.isSuspicious}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                      <Avatar sx={{ 
                        width: 80, 
                        height: 80, 
                        bgcolor: '#1976d2' 
                      }}>
                        <PersonIcon fontSize="large" />
                      </Avatar>
                    </Badge>
                    <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
                      {selectedRow.name || 'N/A'} {selectedRow.last_names || ''}
                    </Typography>
                    <Chip
                      label={selectedRow.isSuspicious ? "Suspicious Activity" : "Normal Activity"}
                      sx={{ 
                        backgroundColor: selectedRow.isSuspicious ? '#ed6c02' : '#333',
                        color: '#fff'
                      }}
                      icon={selectedRow.isSuspicious ? 
                        <WarningIcon sx={{ color: '#fff' }} /> : 
                        <SecurityIcon sx={{ color: '#fff' }} />
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: '#fff' }}>
                        <strong style={{ color: '#aaa' }}>Email:</strong> {selectedRow.host_email || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ color: '#fff' }}>
                        <strong style={{ color: '#aaa' }}>Login Count:</strong> {selectedRow.login_count || 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ color: '#fff' }}>
                        <strong style={{ color: '#aaa' }}>Status:</strong>{" "}
                        <Chip
                          label={selectedRow.status_login ? "Active" : "Blocked"}
                          sx={{ 
                            backgroundColor: selectedRow.status_login ? '#2e7d32' : '#d32f2f',
                            color: '#fff',
                            ml: 1
                          }}
                          size="small"
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography sx={{ color: '#fff' }}>
                        <strong style={{ color: '#aaa' }}>Last Login:</strong>{" "}
                        {selectedRow.login_time
                          ? new Date(selectedRow.login_time).toLocaleString()
                          : "-"}
                      </Typography>
                    </Grid>
                    {selectedRow.ip_address && (
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1, borderColor: '#444' }} />
                        <Typography sx={{ color: '#fff' }}>
                          <strong style={{ color: '#aaa' }}>IP Address:</strong> {selectedRow.ip_address}
                        </Typography>
                        {selectedRow.ipDetails && (
                          <Typography variant="body2" sx={{ color: '#aaa', mt: 0.5 }}>
                            Location: {selectedRow.ipDetails.city}, {selectedRow.ipDetails.country}
                            {selectedRow.ipDetails.isp && ` (ISP: ${selectedRow.ipDetails.isp})`}
                          </Typography>
                        )}
                        {!selectedRow.ipDetails && selectedRow.ip_address && (
                          <Typography variant="body2" sx={{ color: '#aaa', mt: 0.5 }}>
                            Loading location details...
                          </Typography>
                        )}
                      </Grid>
                    )}
                    {selectedRow.lat && selectedRow.lon && (
                      <Grid item xs={12}>
                        <Button
                          startIcon={<LocationOnIcon />}
                          onClick={() => handleOpenMap(selectedRow)}
                          variant="outlined"
                          size="small"
                          sx={{
                            color: '#fff',
                            borderColor: '#555',
                            '&:hover': {
                              borderColor: '#1976d2',
                              backgroundColor: 'rgba(25, 118, 210, 0.1)'
                            }
                          }}
                        >
                          View Location on Map
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions sx={{ borderTop: '1px solid #333', p: 2 }}>
            <Button 
              onClick={handleCloseDetails}
              sx={{ color: '#fff' }}
            >
              Close
            </Button>
            {selectedRow && (
              <Button 
                sx={{ 
                  backgroundColor: selectedRow.status_login ? '#d32f2f' : '#2e7d32',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: selectedRow.status_login ? '#c62828' : '#1b5e20'
                  }
                }}
                onClick={() => {
                  handleBlock(selectedRow);
                  handleCloseDetails();
                }}
                startIcon={selectedRow.status_login ? <BlockIcon /> : <LockOpenIcon />}
              >
                {selectedRow.status_login ? "Block User" : "Unblock User"}
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity} 
            sx={{ 
              width: '100%',
              backgroundColor: '#1e1e1e',
              color: '#fff',
              '& .MuiAlert-icon': {
                color: '#fff'
              }
            }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
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

export default AdminManageSecurity;