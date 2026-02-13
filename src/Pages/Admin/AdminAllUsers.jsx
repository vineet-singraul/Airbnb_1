import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Card,
  Avatar,
  Typography,
  Chip,
  Button,
  Stack,
  Grid,
  Paper,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import "../../styles/Admin/AdminAllUsers.css";
import { useNavigate } from "react-router-dom";

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const adminId = localStorage.getItem("adminId");
  const [input, setInput] = useState({
    verify: "",
    Delete: "",
  });

  const [error, setError] = useState({
    verify: "",
    Delete: "",
  });
  const navigate = useNavigate();


  const fetchAllUsers = async () => {
    const api = "http://127.0.0.1:8000/airbnb/Admin-Mange-Users/";
    const response = await axios.get(api);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleError = (e) => {
    const { name, value } = e.target;
    let msg = "";

    if (value.trim() === "") {
      msg = "Field is required";
    } else if (value.toLowerCase() !== "verified") {
      msg = "Type 'verified' correctly";
    }

    setError((prev) => ({
      ...prev,
      [name]: msg,
    }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitField = async (id) => {
    if (!input.verify || input.verify.trim() === "") {
      toast.error("Field is required");
      return;
    }
    if (input.verify.toLowerCase() !== "verified") {
      toast.error("Please type 'verified'");
      return;
    }

    const api = `http://127.0.0.1:8000/airbnb/Admin-Varified-Host/${id}/`;
    const response = await axios.put(api, input);
    console.log("Response : ", response);
    toast.success("Host verified successfully");

    setTimeout(() => {
      navigate("/Admin-Manage-settings", {
        state: { tab: "notifications" }
      });
    }, 1500);

    setOpenPopUp(false);
  };

  const onDelete = async (id) => {
    if (input.Delete.toLowerCase() !== "delete") {
      toast.error("Please type 'delete'");
      return;
    }

    try {
      const api = `http://127.0.0.1:8000/airbnb/Admin-Varified-Delete/${id}/`;
      await axios.delete(api); // ✅ FIX (DELETE request)

      toast.success("Host deleted successfully");
      setOpenDeletePopUp(false);
      fetchAllUsers(); // refresh list
    } catch (error) {
      toast.error("Failed to delete host");
    }
  };

  return (
    <>
      {adminId ? (
        <AdminLayout>
          <Grid id="MainAllUserCard" spacing={4} sx={{ px: 3, py: 4 }}>
            {users.map((user) => (
              <Grid xs={12} md={6} lg={4} key={user.id}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    // background: "linear-gradient(145deg, #25156aff,   #020049ff)",
                    color: "#fff",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 30px 70px rgba(255,0,0,0.4)",
                    },
                  }}
                >
                  {/* HEADER */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={
                        user.profile_photo
                          ? `http://127.0.0.1:8000${user.image}`
                          : `https://ui-avatars.com/api/?name=${user.host_name}&background=8B0000&color=fff`
                      }
                      sx={{
                        width: 120,
                        height: 120,
                        border: "2px solid #ff4d4d",
                      }}
                    />

                    <Box flex={1}>
                      <Typography fontWeight={600} fontSize={18}>
                        {user.host_name}
                      </Typography>

                      <Typography fontSize={13} sx={{ opacity: 0.8 }}>
                        {user.email}
                      </Typography>

                      <Chip
                        sx={{ mt: 1 }}
                        icon={
                          user.verified_status ? (
                            <VerifiedIcon />
                          ) : (
                            <HourglassBottomIcon />
                          )
                        }
                        label={user.verified_status ? "Verified" : "Pending"}
                        color={user.verified_status ? "success" : "warning"}
                        size="small"
                      />
                    </Box>
                  </Stack>

                  {/* DETAILS */}
                  <Box mt={3}>
                    <Typography fontSize={14}>
                      📍 {user.city}, {user.country}
                    </Typography>

                    <Typography fontSize={13} mt={1}>
                      <strong>ID Type:</strong> {user.govt_id_type}
                    </Typography>

                    <Typography fontSize={13}>
                      <strong>ID No:</strong> ****
                      {user.govt_id_number?.slice(-4)}
                    </Typography>
                  </Box>

                  {/* ACTIONS */}
                  <Stack
                    direction="row"
                    spacing={1.5}
                    mt={3}
                    justifyContent="space-between"
                  >
                    <Button
                      fullWidth
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      sx={{ borderRadius: 2, background: "red" }}
                      onClick={() => setOpenDeletePopUp(true)}
                    >
                      Delete
                    </Button>

                    {user.verified_status ? (
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        color="warning"
                        startIcon={<VerifiedIcon />}
                        disabled
                        sx={{ borderRadius: 2, background: "#004f30ff" }}
                      >
                        Verified
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        color="warning"
                        startIcon={<VerifiedUserIcon sx={{ color: "pink" }} />}
                        sx={{
                          borderRadius: 2,
                          background: "rgb(164, 43, 9)",
                          color: "#000000ff",
                        }}
                        onClick={() => {
                          setSelectedUser(user); // 🔥 IMPORTANT
                          setOpenPopUp(true);
                        }}
                      >
                        Verify
                      </Button>
                    )}

                    {/* ADMIN HOST KO VARI */}
                    <Dialog
                      open={openPopUp}
                      onClose={() => setOpenPopUp(false)}
                      PaperProps={{
                        sx: {
                          backgroundColor: "#1e0063ff",
                          borderRadius: 3,
                          color: "#fff",
                          minWidth: 400,
                        },
                      }}
                    >
                      <DialogContent sx={{ background: "#1e0063ff" }}>
                        <Button
                          sx={{
                            border: "1px solid #20f300",
                            background: "#5ad00099",
                          }}
                          startIcon={<CheckIcon />}
                          endIcon={<CheckIcon />}
                          disabled
                        >
                          PLASE ENTER THE "APPROVED" INPUT FILED
                        </Button>
                        <br />
                        <br />
                        <TextField
                          fullWidth
                          label="Verify"
                          name="verify"
                          onBlur={handleError}
                          onChange={handleInput}
                          error={Boolean(error.verify)}
                          helperText={error.verify}
                          sx={{
                            input: { color: "#fff" },
                            label: { color: "#ccc" },
                            "& label.Mui-focused": {
                              color: "#00e676",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#ccc",
                              },
                              "&:hover fieldset": {
                                borderColor: "#00e676",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#00e676",
                              },
                            },
                          }}
                        />
                      </DialogContent>
                      <DialogActions sx={{ background: "#1e0063ff" }}>
                        <Button
                          sx={{ border: "1px solid red" }}
                          onClick={() => {
                            setOpenPopUp(!openPopUp);
                          }}
                        >
                          Cencel
                        </Button>

                        <Button
                          sx={{ border: "1px solid #00af69ff" }}
                          // onClick={() => onSubmitField(user.id)}
                          onClick={() => onSubmitField(selectedUser.id)}
                        >
                          Verify Host
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* ADMIN HOST KO Delete */}
                    <Dialog
                      open={openDeletePopUp}
                      onClose={() => setOpenDeletePopUp(false)}
                      PaperProps={{
                        sx: {
                          backgroundColor: "#1e0063ff",
                          borderRadius: 3,
                          color: "#fff",
                          minWidth: 400,
                        },
                      }}
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        sx={{ background: "#1e0063ff" }}
                      >
                        {"For Varifying Wright Input Verifyed"}
                      </DialogTitle>
                      <DialogContent sx={{ background: "#1e0063ff" }}>
                        <Alert
                          sx={{ background: "#009753ff" }}
                          icon={<CheckIcon fontSize="inherit" />}
                          severity="success"
                        >
                          Hare for delete Write the "Delete"
                        </Alert>
                        <br />
                        <TextField
                          fullWidth
                          label="Delete"
                          name="Delete"
                          onBlur={handleError}
                          onChange={handleInput}
                          error={Boolean(error.Delete)}
                          helperText={error.Delete}
                          sx={{
                            input: { color: "#fff" },
                            label: { color: "#ccc" },
                            "& label.Mui-focused": {
                              color: "#00e676",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#ccc",
                              },
                              "&:hover fieldset": {
                                borderColor: "#00e676",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#00e676",
                              },
                            },
                          }}
                        />
                      </DialogContent>
                      <DialogActions sx={{ background: "#1e0063ff" }}>
                        <Button
                          sx={{ border: "1px solid red" }}
                          onClick={() => {
                            setOpenDeletePopUp(!openDeletePopUp);
                          }}
                        >
                          Cencel
                        </Button>

                        <Button
                          sx={{ border: "1px solid #00af69ff" }}
                          onClick={() => onDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="dark"
            toastClassName="custom-toast"
            bodyClassName="custom-toast-body"
            progressClassName="custom-toast-progress"
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

export default AdminAllUsers;
