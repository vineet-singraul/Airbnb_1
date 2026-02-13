import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
  Avatar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import {
  LocationOn,
  CalendarToday,
  Person,
  CheckCircle,
  Close,
} from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";


// -------------------- HELPERS --------------------
const formatDate = (iso) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
};

const formatCurrency = (amount = 0, currency = "INR") => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  } catch {
    return `${currency} ${amount}`;
  }
};


// -------------------- STEPPER STYLES --------------------
const ColorConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#e0e0e0",
    borderRadius: 1,
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    backgroundColor: "#ff6f61",
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundColor: "#ff6f61",
  },
}));

const StepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: ownerState.completed
    ? "#ff6f61"
    : ownerState.active
    ? "#ff6f61"
    : "#e0e0e0",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 600,
  transition: "0.3s",
}));

function StepIcon(props) {
  const { active, completed, className } = props;
  return (
    <StepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckIcon /> : props.icon}
    </StepIconRoot>
  );
}

const steps = ["pending", "confirmed", "completed"];

const getStepNumber = (status) => {
  switch (status) {
    case "pending":
      return 1;
    case "confirmed":
      return 2;
    case "completed":
      return 3;
    default:
      return 0;
  }
};


// -------------------- MAIN --------------------
export default function TrackBooking() {
  const userId = localStorage.getItem("userActualID");
  const userName = localStorage.getItem("userName");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // VIEW IMAGE POPUP STATES
  const [imageDialog, setImageDialog] = useState(false);
  const [imageList, setImageList] = useState([]);

  const [confirmLoading, setConfirmLoading] = useState(false);


  // -------------------- FETCH BOOKINGS --------------------
  const fetchBookings = async () => {
    if (!userId || !userName) {
      setError("Please login to view your bookings.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const url = `http://127.0.0.1:8000/airbnb/User-Track-Booking/${userId}/${userName}/`;
      const res = await axios.get(url);
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      setBookings(data);
    } catch (err) {
      setError("Unable to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  // -------------------- CONFIRM BOOKING --------------------
  const confirmBooking = async (bookingId) => {
    setConfirmLoading(true);
    try {
      await axios.post(`http://127.0.0.1:8000/airbnb/confirm-booking/${bookingId}/`);
      alert("Booking confirmed!");
      fetchBookings();
    } catch {
      alert("Failed to confirm.");
    }
    setConfirmLoading(false);
  };


  // -------------------- SHOW ONLY IMAGES POPUP --------------------
  const openImageViewer = (booking) => {
    const imgs =
      booking.images ||
      booking.property_images ||
      (booking.property?.images ?? []);

    setImageList(imgs);
    setImageDialog(true);
  };


  // -------------------- MAIN UI --------------------
  if (loading)
    return (
      <Container sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      </Container>
    );

  if (error)
    return (
      <Container sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={fetchBookings}>Retry</Button>
      </Container>
    );

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Bookings
      </Typography>

      <Grid container spacing={3}>
        {bookings.map((b) => {
          const id = b.id ?? b.booking_id;
          const title = b.title || b.property_title || b.property?.title || "Property";
          const location = b.location || b.property_location || b.property?.location || "-";
          const checkIn = b.check_in || b.checkin || b.available_from;
          const checkOut = b.check_out || b.checkout || b.available_to;

          const firstImage =
            b.images?.[0] ||
            b.property_image ||
            b.property?.images?.[0] ||
            null;

          const status = b.status || "pending";
          const step = getStepNumber(status);
          const total = b.total_amount || b.price_per_night || b.total;

          const host = b.host?.host_name || b.host?.name || b.host_name || "Host";

          return (
            <Grid item xs={12} md={6} key={id}>
              <Card>
                {/* IMAGE */}
                <Box sx={{ width: "100%", height: 180, overflow: "hidden" }}>
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt={title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "#3c0000ff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>No Image</Typography>
                    </Box>
                  )}
                </Box>

                <CardContent sx={{bgcolor: "#000000bd", }}>
                  {/* STEPPER */}
                  <Stepper
                    alternativeLabel
                    activeStep={step}
                    connector={<ColorConnector />}
                    sx={{ mb: 3 }}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <Typography variant="h6">{title}</Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <LocationOn fontSize="small" />
                    <Typography>{location}</Typography>
                  </Box>

                  <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
                    <Chip icon={<CalendarToday />} label={`${formatDate(checkIn)} → ${formatDate(checkOut)}`} />
                    <Chip icon={<CheckCircle />} label={status} color={status === "confirmed" ? "success" : "warning"} />
                    <Chip icon={<CheckCircle />} label={status === "confirmed" ? "Paid" : "Paid"} color={status === "confirmed" ? "success" : "warning"} />
                  </Box>

                  <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">{formatCurrency(total)}</Typography>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button variant="outlined" onClick={() => openImageViewer(b)}>
                        View
                      </Button>

                      {status !== "confirmed" && (
                        <Button
                          variant="contained"
                          color="success"
                          disabled={confirmLoading}
                          onClick={() => confirmBooking(id)}
                        >
                          {confirmLoading ? "..." : "Confirm"}
                        </Button>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>


      {/* ------------------ IMAGE ONLY VIEWER ------------------ */}
      <Dialog open={imageDialog} onClose={() => setImageDialog(false)} maxWidth="lg" fullWidth>
        <DialogActions sx={{ justifyContent: "flex-end" }}>
          <Button startIcon={<Close />} onClick={() => setImageDialog(false)}>
            Close
          </Button>
        </DialogActions>

        <DialogContent dividers>
          <Box 
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              p: 2,
            }}
          >
            {imageList.length > 0 ? (
              imageList.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  style={{
                    width: "450px",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ))
            ) : (
              <Typography>No images available</Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
