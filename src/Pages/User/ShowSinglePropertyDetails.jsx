import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI Core
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Avatar,
  Paper,
  Card,
  CardContent,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Tooltip,
} from "@mui/material";

// Icons
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { FaDirections } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import "../../styles/UserCss/PropertyDetailPage.css";

const ShowSinglePropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ---------- State ----------
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState("2025-11-14");
  const [checkOutDate, setCheckOutDate] = useState("2025-11-16");
  const [guests, setGuests] = useState(1);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [totalNights, setTotalNights] = useState(2);
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [comment, setComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [readComments, setReadComments] = useState([]);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [gallary, setGallary] = useState(false);

  // ---------- Helper Functions ----------
  const calculateNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 1;
  };

  const calculatePrice = (pricePerNight, nights, guestCount) => {
    const basePrice = parseFloat(pricePerNight) * nights;
    const extraGuestCharge = guestCount > 1 ? (guestCount - 1) * 200 : 0;
    return basePrice + extraGuestCharge;
  };

  const updatePriceCalculation = (checkin, checkout, guestCount) => {
    if (!property) return;
    const nights = calculateNights(checkin, checkout);
    const price = calculatePrice(property.price_per_night, nights, guestCount);
    const origPrice = parseFloat(property.price_per_night) * nights;
    setTotalNights(nights);
    setTotalPrice(price);
    setOriginalPrice(origPrice);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getMinCheckoutDate = () => {
    const checkin = new Date(checkInDate);
    checkin.setDate(checkin.getDate() + 1);
    return checkin.toISOString().split("T")[0];
  };

  // ---------- API Calls ----------
  const loadSingleCard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://127.0.0.1:8000/airbnb/User-Show-All-Cards-Detail-Diff-Page/${id}/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      const data = await response.json();
      if (!data || Object.keys(data).length === 0)
        throw new Error("Empty response data");

      setProperty(data);
      const nights = calculateNights("2025-11-14", "2025-11-16");
      const price = calculatePrice(data.price_per_night, nights, 1);
      setTotalNights(nights);
      setTotalPrice(price);
      setOriginalPrice(parseFloat(data.price_per_night) * nights);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllComments = async () => {
    if (!property?.id) return;
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/airbnb/User-Read-Comments/${property.id}/`,
      );
      setReadComments(res.data.comments || []);
    } catch {
      setReadComments([]);
    }
  };

  // ---------- Effects ----------
  useEffect(() => {
    loadSingleCard();
  }, [id]);

  useEffect(() => {
    if (property) {
      updatePriceCalculation(checkInDate, checkOutDate, guests);
    }
  }, [property]);

  useEffect(() => {
    if (property?.id) {
      fetchAllComments();
    }
  }, [property?.id]);

  // ---------- Event Handlers ----------
  const handleDateChange = (type, value) => {
    if (type === "checkin") {
      setCheckInDate(value);
      if (new Date(value) >= new Date(checkOutDate)) {
        const newCheckOut = new Date(value);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        const newCheckOutStr = newCheckOut.toISOString().split("T")[0];
        setCheckOutDate(newCheckOutStr);
        updatePriceCalculation(value, newCheckOutStr, guests);
      } else {
        updatePriceCalculation(value, checkOutDate, guests);
      }
    } else {
      setCheckOutDate(value);
      updatePriceCalculation(checkInDate, value, guests);
    }
  };

  const handleGuestChange = (change) => {
    if (!property) return;
    const newGuests = guests + change;
    if (newGuests >= 1 && newGuests <= property.guests_allowed) {
      setGuests(newGuests);
      updatePriceCalculation(checkInDate, checkOutDate, newGuests);
    }
  };

  const handleBackbtn = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleReserve = async (e) => {
    e.preventDefault();
    const userloginId = localStorage.getItem("userActualID");
    try {
      const orderData = await fetch(
        "http://127.0.0.1:8000/airbnb/create-order/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            property_id: property.id,
            check_in: checkInDate,
            check_out: checkOutDate,
            guests: guests,
            user_id: userloginId,
          }),
        },
      ).then((res) => res.json());

      const options = {
        key: orderData.razorpay_key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: property.title,
        description: `Booking for ${property.title}`,
        order_id: orderData.order_id,
        handler: async (response) => {
          const verify = await fetch(
            "http://127.0.0.1:8000/airbnb/verify-payment/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                booking_id: orderData.booking_id,
              }),
            },
          ).then((res) => res.json());

          if (verify.detail === "Payment verified and booking confirmed") {
            toast.success("Payment Successful! Booking Confirmed 🎉");
            navigate("/User-Track-Booking");
          } else {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: "Guest User",
          email: "guest@example.com",
          contact: "9999999999",
        },
        theme: { color: "#ff4d6d" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => toast.error("Payment Failed!"));
      rzp.open();
    } catch (err) {
      toast.error("Payment Error: " + err.message);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      toast.warning("Please write a comment.");
      return;
    }
    const api = "http://127.0.0.1:8000/airbnb/User-Comments/";
    const data = {
      comment: comment,
      host_name: property.host.host_name,
      host_Id: property.host.id,
      host_phone: property.host.phone,
      user_name: localStorage.getItem("userName"),
      property_id: property.id,
      userActualID: localStorage.getItem("userActualID"),
    };
    try {
      await axios.post(api, data);
      toast.success("Comment posted!");
      setComment("");
      fetchAllComments(); // refresh comments
    } catch {
      toast.error("Failed to post comment.");
    }
  };

  const handleOpenReportDialog = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setOpenReportDialog(true);
  };

  const handleCloseReportDialog = () => {
    setOpenReportDialog(false);
    setReportReason("");
    setOtherReason("");
  };

  const handleSubmitReport = async () => {
    const api = "http://127.0.0.1:8000/airbnb/User-Reported-Host/";
    const payload = {
      report_reason: reportReason,
      other_reason: reportReason === "other" ? otherReason : "",
      host_id: property.host?.id || null,
      user_id: localStorage.getItem("userActualID"),
    };

    try {
      await axios.post(api, payload);
      toast.success("Report submitted.");
    } catch {
      toast.error("Failed to submit report.");
    }
    handleCloseReportDialog();
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: property.title,
      text: `Check out this amazing property: ${property.title}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        `${shareData.text} ${shareUrl}`,
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleAskOnWhatsApp = () => {
    const hostPhone = property.host?.phone;
    if (!hostPhone) {
      toast.error("Host phone number not available");
      return;
    }

    const message = `Hi ${property.host.host_name}, 👋 
I am interested in your property: "${property.title}"

Here is the property link:
${window.location.href}`;

    window.open(
      `https://wa.me/${hostPhone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  // ---------- Derived Data ----------
  const amenities = [
    { name: "Kitchen", available: true, icon: "🔪" },
    {
      name: "Free parking on premises",
      available: property?.parking,
      icon: "🅿️",
    },
    { name: "TV", available: property?.tv, icon: "📺" },
    { name: "Air conditioning", available: property?.Ac, icon: "❄️" },
    { name: "Carbon monoxide alarm", available: true, icon: "⚠️" },
    { name: "Pets allowed", available: true, icon: "🐾" },
    { name: "Washing machine", available: true, icon: "🧼" },
    {
      name: "Exterior security cameras",
      available: property?.securityCam,
      icon: "📹",
    },
    { name: "Smoke alarm", available: true, icon: "🔥" },
    { name: "WiFi", available: property?.wifi, icon: "📶" },
    { name: "Swimming Pool", available: property?.pools, icon: "🏊" },
    { name: "Gym", available: property?.gym, icon: "💪" },
    {
      name: "Pickup Facility",
      available: property?.pickupFacility,
      icon: "🚗",
    },
    { name: "Filter Water", available: property?.filterWater, icon: "💧" },
    {
      name: "Long Stay Allowed",
      available: property?.StayLongAllow,
      icon: "📅",
    },
  ];

  const handleGalary = () => {

  }

  const availableAmenities = amenities.filter((a) => a.available);

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Box
          sx={{
            display: "inline-block",
            width: 40,
            height: 40,
            border: "4px solid #ccc",
            borderTopColor: "#ff4d6d",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <Typography sx={{ mt: 2 }}>Loading property details...</Typography>
        <Typography variant="caption" color="text.secondary">
          Fetching ID: {id}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Error Loading Property
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {error}
        </Typography>
        <Button variant="contained" onClick={loadSingleCard}>
          Try Again
        </Button>
        <Box sx={{ mt: 4, p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
          <Typography variant="caption" display="block">
            ID: {id}
          </Typography>
          <Typography variant="caption">
            Check if the API endpoint is correct
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!property) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" gutterBottom>
          Property Not Found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          The property you're looking for doesn't exist.
        </Typography>
        <Button variant="contained" onClick={loadSingleCard}>
          Try Again
        </Button>
      </Box>
    );
  }

  // ---------- Render ----------
  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
      {/* Back Button */}
      <Button variant="outlined" onClick={handleBackbtn} sx={{ mb: 3 }}>
        Back
      </Button>

      {/* Debug Info (remove in production) */}
      <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2, mb: 4 }}>
        <Typography variant="body2">
          <strong>Debug Info:</strong> ID: {id} | Images:{" "}
          {property.images?.length || 0} | Price: {property.price_per_night} |
          Status: Loaded
        </Typography>
      </Box>

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
          {property.title}
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ sm: "center" }}
          flexWrap="wrap"
        >
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            ⭐ 5.0 • 5 reviews
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.location}, {property.city}, {property.country}
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#7a0093",
              "&:hover": { bgcolor: "#5a006b" },
              borderRadius: 2,
            }}
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              `${property.location}, ${property.city}, ${property.country}`,
            )}`}
            target="_blank"
          >
            Open Map and click in layers
          </Button>
          <Typography variant="body2" color="text.secondary">
            {property.guests_allowed} guests • {property.bedrooms} bedroom •{" "}
            {property.beds} bed • {property.bathrooms} bathroom
          </Typography>
        </Stack>
      </Box>

      {/* Image Gallery */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 2,
          mb: 3,
        }}
      >
        {/* Main Image */}
        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            aspectRatio: "4/3",
            bgcolor: "grey.100",
          }}
        >
          {property.images?.length > 0 ? (
            <Box
              component="img"
              src={property.images[currentImageIndex]}
              alt={property.title}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/800x500?text=Image+Not+Found")
              }
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography color="text.secondary">No Image Available</Typography>
            </Box>
          )}
        </Box>

        {/* Thumbnails Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          {property.images?.slice(0, 4).map((image, index) => (
            <Box
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                aspectRatio: "1/1",
                cursor: "pointer",
                border:
                  index === currentImageIndex ? "2px solid #ff4d6d" : "none",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Box
                component="img"
                src={image}
                alt={`${property.title} ${index + 1}`}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/200x150?text=Image+Not+Found")
                }
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
          {property.images?.length > 4 && (
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: "grey.100",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "1/1",
              }}
            >
              <Button onClick={()=>setGallary(!gallary)}>{property.images.length - 4} OPEN GALLARY</Button>
            </Box>
          )}
          {(!property.images || property.images.length === 0) && (
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: "grey.100",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "1/1",
              }}
            >
              <Typography variant="body2">No Photos</Typography>
            </Box>
          )}
        </Box>
      </Box>


    {/* Click hone per Sari image show */}
    <Dialog
      open={gallary}
      onClose={() => setGallary(false)}
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle>
        Property Gallery
        <Button
          onClick={() => setGallary(false)}
          sx={{ position: "absolute", right: 15, top: 10 }}
        >
          Close
        </Button>
      </DialogTitle>

      <DialogContent dividers>
        {property.images?.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {property.images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`image-${index}`}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/1200x700?text=Image+Not+Found")
                }
                sx={{
                  width: "100%",
                  height: "600px",
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />
            ))}
          </Box>
        ) : (
          <Typography>No Images Available</Typography>
        )}
      </DialogContent>
    </Dialog>





      {/* ACTIONS BUTTONS HAI (Share, Ask, Wishlist, Report) */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          px: 1.5,
          py: 1,
          borderRadius: 40,
          background: "linear-gradient(180deg, #1f1f1f 0%, #171717 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
          width: "fit-content",
          mb: 4,
        }}
      >
        <Button
          startIcon={<ShareOutlinedIcon />}
          sx={actionBtnSx}
          onClick={handleShare}
        >
          Share
        </Button>
        <Button
          startIcon={<AutoAwesomeOutlinedIcon />}
          sx={actionBtnSx}
          onClick={handleAskOnWhatsApp}
        >
          Ask
        </Button>
        <Button
          startIcon={<FlagOutlinedIcon />}
          sx={actionBtnSx}
          onClick={() => handleOpenReportDialog(property.id)}
        >
          Report
        </Button>
      </Stack>

      {/* Report Dialog */}
      <Dialog
        open={openReportDialog}
        onClose={handleCloseReportDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ bgcolor: "#002bba", color: "white" }}>
          Report Property
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#002bba" }}>
          <DialogContentText sx={{ mb: 2, color: "rgba(255,255,255,0.8)" }}>
            Please select the reason for reporting this property. Our team will
            review your report and take appropriate action.
          </DialogContentText>
          <FormControl fullWidth sx={{ bgcolor: "#002bba" }}>
            <InputLabel id="report-reason-label" sx={{ color: "white" }}>
              Report Reason
            </InputLabel>
            <Select
              labelId="report-reason-label"
              value={reportReason}
              label="Report Reason"
              onChange={(e) => setReportReason(e.target.value)}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
              }}
            >
              <MenuItem value="fake_listing">Fake / Fraud Listing</MenuItem>
              <MenuItem value="incorrect_info">Incorrect Information</MenuItem>
              <MenuItem value="already_sold">Property Already Sold</MenuItem>
              <MenuItem value="duplicate_property">Duplicate Property</MenuItem>
              <MenuItem value="host_behaviour">
                Host Behaviour is not good
              </MenuItem>
              <MenuItem value="facility_issue">
                Facilities are not good
              </MenuItem>
              <MenuItem value="room_service">
                Room services are not good
              </MenuItem>
              <MenuItem value="security_issue">Security issue</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          {reportReason === "other" && (
            <TextField
              label="Please describe the issue"
              multiline
              rows={3}
              fullWidth
              sx={{ mt: 2, bgcolor: "white", borderRadius: 1 }}
              onChange={(e) => setOtherReason(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#002bba" }}>
          <Button onClick={handleCloseReportDialog} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSubmitReport}
            disabled={!reportReason}
          >
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main 2-Column Layout */}
      <Box id="MainTwoColoum">
        {/* Left Column - Details */}
        <Box>
          {/* Host Section */}
          <Paper
            elevation={0}
            sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: "background.paper" }}
          >
            <Box direction={{ xs: "column", sm: "row" }} spacing={3}>
              <Avatar
                src={property.host?.profile_photo}
                alt={property.host?.host_name}
                sx={{ width: 80, height: 80 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  Hosted by {property.host?.host_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {property.host?.bio}
                </Typography>
                <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                  🌟 3 years hosting
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" sx={{ width: 80 }}>
                  📧
                </Typography>
                <Typography variant="body2">{property.host?.email}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" sx={{ width: 80 }}>
                  📍
                </Typography>
                <Typography variant="body2">
                  {property.host?.city}, {property.host?.country}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" sx={{ width: 80 }}>
                  ✅
                </Typography>
                <Typography variant="body2">
                  {property.host?.verified_status
                    ? "Verified Host"
                    : "Not Verified"}
                </Typography>
              </Stack>
            </Stack>

            {property.host?.phone && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 3 }}
              >
                <Button
                  variant="contained"
                  startIcon={<span>💬</span>}
                  href={`https://wa.me/${property.host.phone}?text=Hi%20${property.host.host_name},%20I%20am%20interested%20in%20your%20property%20listing%20"${property.title}".%20Can%20you%20please%20share%20more%20details%3F`}
                  target="_blank"
                  sx={{ bgcolor: "#25D366", "&:hover": { bgcolor: "#128C7E" } }}
                >
                  Message on WhatsApp
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LuPhoneCall />}
                  href={`tel:${property.host.phone}`}
                  sx={{ borderColor: "#25D366", color: "#25D366" }}
                >
                  Call Host
                </Button>
              </Stack>
            )}
          </Paper>

          {/* Description */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 2,
              backgroundColor: "var(--card-bg)",
              color: "var(--text-primary)",
            }}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom>
              About this place
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "var(--text-secondary)" }}
            >
              {property.description || "No description available."}
            </Typography>
          </Box>

          {/* Amenities */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 2,
              backgroundColor: "var(--card-bg)",
              color: "var(--text-primary)",
            }}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom>
              What this place offers
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 2,
              }}
            >
              {availableAmenities.slice(0, 5).map((amenity, idx) => (
                <Stack direction="row" spacing={1} alignItems="center" key={idx}>
                  <Typography variant="body1">
                    {amenity.icon}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--text-secondary)" }}
                  >
                    {amenity.name}
                  </Typography>
                </Stack>
              ))}
            </Box>

            {availableAmenities.length > 5 && (
              <Button
                sx={{
                  mt: 2,
                  color: "var(--text-primary)",
                  borderColor: "var(--border-color)",
                }}
                variant="outlined"
              >
                Show all {availableAmenities.length} amenities
              </Button>
            )}

            <Divider sx={{ my: 3, borderColor: "var(--border-color)" }} />

            <Typography variant="h6" fontWeight={600} gutterBottom>
              Safety & Security
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 2,
                mb: 3,
              }}
            >
              {availableAmenities.slice(5, 8).map((amenity, idx) => (
                <Stack direction="row" spacing={1} alignItems="center" key={idx}>
                  <Typography variant="body1">
                    {amenity.icon}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--text-secondary)" }}
                  >
                    {amenity.name}
                  </Typography>
                </Stack>
              ))}
            </Box>

            <Typography variant="h6" fontWeight={600} gutterBottom>
              Additional Facilities
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 2,
              }}
            >
              {availableAmenities.slice(8).map((amenity, idx) => (
                <Stack direction="row" spacing={1} alignItems="center" key={idx}>
                  <Typography variant="body1">
                    {amenity.icon}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--text-secondary)" }}
                  >
                    {amenity.name}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Box>

          {/* Property Details */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 2,
              backgroundColor: "var(--card-bg)",
              color: "var(--text-primary)",
            }}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Property Details
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              {[
                { label: "Maximum Guests", value: property.guests_allowed },
                { label: "Bedrooms", value: property.bedrooms },
                { label: "Beds", value: property.beds },
                { label: "Bathrooms", value: property.bathrooms },
                { label: "Price per night", value: `₹${property.price_per_night}` },
                { label: "Available from", value: property.available_from },
                { label: "Available to", value: property.available_to },
              ].map((item, index) => (
                <Box key={index}>
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight={600}
                  >
                    {item.label}:
                  </Typography>{" "}
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ color: "var(--text-secondary)" }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

        </Box>

        {/* Right Column - Booking Card */}
        <Box item xs={12} md={5} lg={4}>
          <Paper
            elevation={3}
            sx={{ p: 3, borderRadius: 4, position: "sticky", top: 20 }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="span"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                  mr: 1,
                }}
              >
                ₹{originalPrice.toFixed(0)}
              </Typography>
              <Typography
                variant="h5"
                component="span"
                fontWeight={700}
                color="primary"
              >
                ₹{totalPrice.toFixed(0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                for {totalNights} nights
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Prices include all fees
              </Typography>
            </Box>

            {/* Date Inputs */}
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                label="Check in"
                type="date"
                value={checkInDate}
                onChange={(e) => handleDateChange("checkin", e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: getTodayDate(), max: property.available_to }}
                fullWidth
                size="small"
              />
              <TextField
                label="Check out"
                type="date"
                value={checkOutDate}
                onChange={(e) => handleDateChange("checkout", e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: getMinCheckoutDate(),
                  max: property.available_to,
                }}
                fullWidth
                size="small"
              />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="caption">
                {formatDate(checkInDate)}
              </Typography>
              <Typography variant="caption">
                {formatDate(checkOutDate)}
              </Typography>
            </Box>

            {/* Guests Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                GUESTS
              </Typography>
              <Box
                onClick={() => setShowGuestSelector(!showGuestSelector)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  cursor: "pointer",
                  background: "red",
                }}
              >
                <Typography>
                  {guests} guest{guests > 1 ? "s" : ""}
                </Typography>
                <Typography>▼</Typography>
              </Box>
              {showGuestSelector && (
                <Paper elevation={3} sx={{ mt: 1, p: 2, borderRadius: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography>Guests</Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconButton
                        size="small"
                        onClick={() => handleGuestChange(-1)}
                        disabled={guests <= 1}
                        sx={{ border: "1px solid", borderColor: "divider" }}
                      >
                        -
                      </IconButton>
                      <Typography>{guests}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleGuestChange(1)}
                        disabled={guests >= property.guests_allowed}
                        sx={{ border: "1px solid", borderColor: "divider" }}
                      >
                        +
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    Maximum {property.guests_allowed} guests
                  </Typography>
                  <Button
                    fullWidth
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={() => setShowGuestSelector(false)}
                  >
                    Done
                  </Button>
                </Paper>
              )}
            </Box>

            {/* Price Breakdown */}
            <Box sx={{ mb: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography variant="body2">
                  ₹{property.price_per_night} × {totalNights} nights
                </Typography>
                <Typography variant="body2">
                  ₹
                  {(parseFloat(property.price_per_night) * totalNights).toFixed(
                    0,
                  )}
                </Typography>
              </Stack>
              {guests > 1 && (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Typography variant="body2">
                    Extra guest charge ({guests - 1} guest
                    {guests > 2 ? "s" : ""})
                  </Typography>
                  <Typography variant="body2">
                    ₹{((guests - 1) * 200).toFixed(0)}
                  </Typography>
                </Stack>
              )}
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={700}>Total</Typography>
                <Typography fontWeight={700}>
                  ₹{totalPrice.toFixed(0)}
                </Typography>
              </Stack>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={handleReserve}
              sx={{
                bgcolor: "#ff4d6d",
                "&:hover": { bgcolor: "#e63e5c" },
                py: 1.5,
                borderRadius: 2,
                mb: 2,
              }}
            >
              Reserve
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ color: "success.main", fontWeight: 600, mb: 1 }}
            >
              Free cancellation
            </Typography>
            <Typography
              variant="caption"
              align="center"
              display="block"
              color="text.secondary"
            >
              You won't be charged yet
            </Typography>
          </Paper>
        </Box>
        
      </Box>

      {/* Google Map */}
      <Paper
        elevation={0}
        sx={{ mt: 6, p: 3, borderRadius: 3, bgcolor: "background.paper" }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <FaDirections style={{ fontSize: 20, color: "#ff4d6d" }} />
          <Typography
            component="a"
            href={`https://www.google.com/maps?q=${property.location}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {property.location}
          </Typography>
        </Stack>
        <Box
          component="iframe"
          loading="lazy"
          src={`https://www.google.com/maps?q=${property.location}&output=embed`}
          sx={{ width: "100%", height: 300, border: 0, borderRadius: 2 }}
        />
      </Paper>

      {/* Comments Section */}
      <Card sx={{ mt: 6, borderRadius: 3, boxShadow: 4, bgcolor: "#01539f86" }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <CommentIcon sx={{ color: "#ff4d6d" }} />
            <Typography variant="h6" fontWeight={600}>
              Comments on this Property
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Share your thoughts or feedback about this property.
          </Typography>

          <Box sx={{ position: "relative" }}>
            <TextField
              label="Your Comment"
              multiline
              rows={4}
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              InputProps={{
                sx: {
                  color: "white",
                  bgcolor: "#0f015379 !importent",
                  borderRadius: 2,
                },
              }}
            />
            <IconButton
              sx={{ position: "absolute", bottom: 10, right: 10 }}
              onClick={() => setShowEmoji((prev) => !prev)}
            >
              <EmojiEmotionsIcon color="warning" />
            </IconButton>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmitComment}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Stack>
            {showEmoji && (
              <Box
                sx={{
                  position: "absolute",
                  left: 400,
                  top: "-170px",
                  zIndex: 1000,
                  mt: 1,
                }}
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Comments List */}
      <CardContent sx={{ px: 0, width: "80vw", height: "1vh !importent" }}>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Please read all the comments on related property
        </Typography>
        <Box
          sx={{
            bgcolor: "#0b0b0b",
            p: { xs: 2, md: 4 },
            color: "#fff",
            borderRadius: 3,
            maxHeight: "400px", // 👈 fixed height
            overflowY: "auto", // 👈 scroll enable
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE & Edge
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari
            },
            display:'flex',
            flexWrap:'wrap'
          }}
        >
          {readComments.length === 0 ? (
            <Typography>No comments yet.</Typography>
          ) : (
            readComments.map((comment) => (
              <Paper
                key={comment.id}
                sx={{ bgcolor: "#111", width:'460px',borderRadius: 3, p: 3, mb: 3,m:4 }}
                elevation={0}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar
                    src={comment.user?.image}
                    alt={comment.user?.first_name}
                    sx={{
                      width: 56,
                      height: 56,
                      border: "2px solid #ff0000",
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={600}>
                        {comment.user.first_name}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        {new Date(comment.created_at).toLocaleDateString()}
                      </Typography>
                    </Stack>
                    <Typography sx={{ mt: 1, lineHeight: 1.7, opacity: 0.9 }}>
                      {comment.message}
                    </Typography>
                    <Stack direction="row" spacing={3} mt={2}>
                      <Typography
                        variant="caption"
                        sx={{ cursor: "pointer", opacity: 0.7 }}
                      >
                        Like
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ cursor: "pointer", opacity: 0.7 }}
                      >
                        Reply
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            ))
          )}
        </Box>
      </CardContent>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        limit={3}
      />
    </Box>
  );
};

// Reusable style for action buttons
const actionBtnSx = {
  color: "#fff",
  fontSize: 13,
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 40,
  px: 1.5,
  minHeight: 36,
  backgroundColor: "rgba(255,255,255,0.04)",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
  "& .MuiButton-startIcon": { marginRight: "6px" },
};

export default ShowSinglePropertyDetails;
