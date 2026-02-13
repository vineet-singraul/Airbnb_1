

// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Chip,
//   Stepper,
//   Step,
//   StepLabel,
//   Paper,
//   Avatar,
//   Button,
//   Alert,
//   Skeleton,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Divider,
//   Stack,
//   CardMedia
// } from "@mui/material";
// import {
//   LocationOn,
//   CalendarToday,
//   Person,
//   CheckCircle,
//   Pending,
//   Cancel,
//   ArrowForward,
//   Download,
//   Share,
//   Phone,
//   Email,
//   Star,
//   Hotel,
//   Wifi,
//   Kitchen,
//   Tv,
//   AcUnit,
//   LocalParking,
//   Bathtub,
//   Pool,
//   CreditCard,
//   Nightlight,
//   People
// } from "@mui/icons-material";
// import { styled, keyframes } from "@mui/material/styles";

// // Animations
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const slideIn = keyframes`
//   from { transform: translateX(-30px); opacity: 0; }
//   to { transform: translateX(0); opacity: 1; }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// // Styled Components
// const StatusChip = styled(Chip)(({ theme, status }) => ({
//   fontWeight: 700,
//   textTransform: 'uppercase',
//   fontSize: '0.7rem',
//   borderRadius: '20px',
//   backgroundColor: 
//     status === 'confirmed' ? '#10b981' :
//     status === 'pending' ? '#f59e0b' :
//     status === 'cancelled' ? '#ef4444' : '#3b82f6',
//   color: 'white',
//   '& .MuiChip-icon': {
//     color: 'white',
//     fontSize: '16px'
//   }
// }));

// const AnimatedCard = styled(Card)(({ theme, delay = 0 }) => ({
//   background: 'linear-gradient(145deg, #1e1e2e 0%, #2d2d44 100%)',
//   borderRadius: '16px',
//   border: '1px solid rgba(255, 255, 255, 0.1)',
//   boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
//   animation: `${fadeIn} 0.6s ease ${delay}s both`,
//   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//   overflow: 'hidden',
//   '&:hover': {
//     transform: 'translateY(-4px)',
//     boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
//     borderColor: 'rgba(59, 130, 246, 0.5)',
//   }
// }));

// const GradientTypography = styled(Typography)(({ theme }) => ({
//   background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   backgroundClip: 'text',
//   fontWeight: 800,
// }));



// // Booking Timeline Component
// const BookingTimeline = ({ status, activecolor = '#3b82f6' }) => {
//   const steps = ['Booked', 'Confirmed', 'Check-in', 'Stay', 'Check-out', 'Completed'];
  
//   const getActiveStep = (status) => {
//     switch (status) {
//       case 'confirmed': return 1;
//       case 'completed': return 5;
//       case 'cancelled': return 0;
//       default: return 0;
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', mt: 2 }}>
//       <Stepper 
//         activeStep={getActiveStep(status)} 
//         alternativeLabel
//         sx={{
//           '& .MuiStepIcon-root': {
//             color: '#374151',
//             border: '2px solid #374151',
//             borderRadius: '50%',
//             width: 24,
//             height: 24,
//             '&.Mui-active': {
//               color: activecolor,
//               borderColor: activecolor,
//             },
//             '&.Mui-completed': {
//               color: '#10b981',
//               borderColor: '#10b981',
//             },
//           },
//           '& .MuiStepLabel-label': {
//             color: '#9ca3af',
//             fontSize: '0.7rem',
//             fontWeight: 600,
//             '&.Mui-active': {
//               color: '#ffffff',
//               fontWeight: 700,
//             },
//             '&.Mui-completed': {
//               color: '#10b981',
//             },
//           },
//         }}
//       >
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// };

// // Booking Card Component
// const BookingCard = ({ booking, index, onViewDetails }) => {
//   const [expanded, setExpanded] = useState(false);

//   const formatDate = (dateString) => {
//     if (!dateString) return "Not specified";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         weekday: 'short',
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric'
//       });
//     } catch (e) {
//       return dateString;
//     }
//   };

//   const formatCurrency = (amount, currency) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: currency || 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'confirmed': return <CheckCircle />;
//       case 'pending': return <Pending />;
//       case 'cancelled': return <Cancel />;
//       default: return <CheckCircle />;
//     }
//   };

//   const getAmenityIcon = (amenity) => {
//     const amenityLower = amenity.toLowerCase();
//     switch (amenityLower) {
//       case 'wifi': return <Wifi sx={{ fontSize: 16 }} />;
//       case 'kitchen': return <Kitchen sx={{ fontSize: 16 }} />;
//       case 'tv': return <Tv sx={{ fontSize: 16 }} />;
//       case 'ac': case 'air conditioning': return <AcUnit sx={{ fontSize: 16 }} />;
//       case 'parking': return <LocalParking sx={{ fontSize: 16 }} />;
//       case 'pool': return <Pool sx={{ fontSize: 16 }} />;
//       case 'bathtub': case 'hot tub': return <Bathtub sx={{ fontSize: 16 }} />;
//       default: return <Star sx={{ fontSize: 16 }} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'confirmed': return '#10b981';
//       case 'pending': return '#f59e0b';
//       case 'cancelled': return '#ef4444';
//       default: return '#3b82f6';
//     }
//   };

//   return (
//     <AnimatedCard delay={index * 0.1}>
//       <CardContent>
//         <Grid container spacing={3}>
//           {/* Property Image Section */}
//           <Grid item xs={12} md={4}>
//             <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
//               <CardMedia
//                 component="img"
//                 height="240"
//                 image={booking.property_image || `https://source.unsplash.com/random/600x400/?apartment,hotel,${booking.id}`}
//                 alt={booking.property_title}
//                 sx={{
//                   objectFit: 'cover',
//                   transition: 'transform 0.3s ease',
//                   '&:hover': {
//                     transform: 'scale(1.05)'
//                   }
//                 }}
//               />
//               <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
//                 <StatusChip
//                   icon={getStatusIcon(booking.status)}
//                   label={booking.status}
//                   status={booking.status}
//                   size="small"
//                 />
//               </Box>
//               <Box sx={{ position: 'absolute', bottom: 12, right: 12 }}>
//                 <Paper sx={{ 
//                   p: 1, 
//                   background: 'rgba(0,0,0,0.8)', 
//                   backdropFilter: 'blur(10px)',
//                   borderRadius: 1 
//                 }}>
//                   <Typography variant="h6" color="white" fontWeight="bold">
//                     {formatCurrency(booking.total_amount, booking.currency)}
//                   </Typography>
//                 </Paper>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Booking Details Section */}
//           <Grid item xs={12} md={8}>
//             <Stack spacing={2}>
//               {/* Property Header */}
//               <Box>
//                 <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
//                   {booking.property_title}
//                 </Typography>
//                 <Stack direction="row" alignItems="center" spacing={1}>
//                   <LocationOn sx={{ color: '#3b82f6', fontSize: 20 }} />
//                   <Typography variant="body1" color="#9ca3af">
//                     {booking.property_location}
//                   </Typography>
//                 </Stack>
//               </Box>

//               {/* Booking Info */}
//               <Grid container spacing={2}>
//                 {[
//                   { 
//                     label: 'Check-in', 
//                     value: formatDate(booking.check_in),
//                     icon: <CalendarToday sx={{ color: '#10b981' }} />
//                   },
//                   { 
//                     label: 'Check-out', 
//                     value: formatDate(booking.check_out),
//                     icon: <CalendarToday sx={{ color: '#ef4444' }} />
//                   },
//                   { 
//                     label: 'Guests', 
//                     value: `${booking.guests} guest${booking.guests > 1 ? 's' : ''}`,
//                     icon: <People sx={{ color: '#8b5cf6' }} />
//                   },
//                   { 
//                     label: 'Nights', 
//                     value: `${booking.nights || 1}`,
//                     icon: <Nightlight sx={{ color: '#f59e0b' }} />
//                   },
//                 ].map((item, idx) => (
//                   <Grid item xs={6} sm={3} key={idx}>
//                     <Paper sx={{ 
//                       p: 1.5, 
//                       background: 'rgba(255,255,255,0.05)',
//                       border: '1px solid rgba(255,255,255,0.1)',
//                       borderRadius: 2
//                     }}>
//                       <Stack direction="row" alignItems="center" spacing={1}>
//                         {item.icon}
//                         <Box>
//                           <Typography variant="caption" color="#9ca3af" sx={{ display: 'block' }}>
//                             {item.label}
//                           </Typography>
//                           <Typography variant="body2" color="white" fontWeight="600">
//                             {item.value}
//                           </Typography>
//                         </Box>
//                       </Stack>
//                     </Paper>
//                   </Grid>
//                 ))}
//               </Grid>

//               {/* Booking Timeline */}
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle2" color="#9ca3af" sx={{ mb: 1, fontWeight: 600 }}>
//                   BOOKING PROGRESS
//                 </Typography>
//                 <BookingTimeline status={booking.status} activecolor={getStatusColor(booking.status)} />
//               </Box>

//               {/* Amenities */}
//               {booking.amenities && booking.amenities.length > 0 && (
//                 <Box>
//                   <Typography variant="subtitle2" color="#9ca3af" sx={{ mb: 1, fontWeight: 600 }}>
//                     AMENITIES
//                   </Typography>
//                   <Stack direction="row" flexWrap="wrap" gap={1}>
//                     {booking.amenities.slice(0, 5).map((amenity, idx) => (
//                       <Chip
//                         key={idx}
//                         icon={getAmenityIcon(amenity)}
//                         label={amenity}
//                         size="small"
//                         sx={{
//                           background: 'rgba(255,255,255,0.08)',
//                           color: '#d1d5db',
//                           border: '1px solid rgba(255,255,255,0.15)',
//                           fontWeight: 500
//                         }}
//                       />
//                     ))}
//                     {booking.amenities.length > 5 && (
//                       <Chip
//                         label={`+${booking.amenities.length - 5} more`}
//                         size="small"
//                         sx={{
//                           background: 'rgba(59,130,246,0.1)',
//                           color: '#3b82f6',
//                           border: '1px dashed rgba(59,130,246,0.3)'
//                         }}
//                       />
//                     )}
//                   </Stack>
//                 </Box>
//               )}

//               {/* Action Buttons */}
//               <Stack 
//                 direction={{ xs: 'column', sm: 'row' }} 
//                 spacing={2} 
//                 alignItems="center"
//                 justifyContent="space-between"
//                 sx={{ mt: 2 }}
//               >
//                 {/* Host Info */}
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <Avatar 
//                     sx={{ 
//                       bgcolor: 'rgba(59,130,246,0.2)',
//                       width: 40,
//                       height: 40
//                     }}
//                   >
//                     <Person sx={{ color: '#3b82f6' }} />
//                   </Avatar>
//                   <Box>
//                     <Typography variant="body2" color="white" fontWeight="600">
//                       {booking.host_name || "Host"}
//                     </Typography>
//                     <Typography variant="caption" color="#9ca3af">
//                       ★ 4.8 • Superhost
//                     </Typography>
//                   </Box>
//                 </Stack>

//                 {/* Action Buttons */}
//                 <Stack direction="row" spacing={1} flexWrap="wrap">
//                   <IconButton
//                     size="small"
//                     onClick={() => window.open(`https://wa.me/91${booking.host_phone?.replace(/\D/g, '') || '9876543210'}`)}
//                     sx={{
//                       background: 'rgba(37,211,102,0.1)',
//                       border: '1px solid rgba(37,211,102,0.3)',
//                       color: '#25d366',
//                       '&:hover': { background: 'rgba(37,211,102,0.2)' }
//                     }}
//                   >
//                     <Share fontSize="small" />
//                   </IconButton>
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     startIcon={<Download />}
//                     onClick={() => alert(`Downloading invoice for ${booking.booking_reference}`)}
//                     sx={{
//                       color: '#9ca3af',
//                       borderColor: 'rgba(255,255,255,0.2)',
//                       '&:hover': {
//                         borderColor: '#3b82f6',
//                         color: '#3b82f6'
//                       }
//                     }}
//                   >
//                     Invoice
//                   </Button>
//                   <Button
//                     variant="contained"
//                     size="small"
//                     endIcon={<ArrowForward />}
//                     onClick={() => onViewDetails(booking)}
//                     sx={{
//                       background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
//                       color: 'white',
//                       fontWeight: 'bold',
//                       '&:hover': {
//                         background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
//                       }
//                     }}
//                   >
//                     Details
//                   </Button>
//                 </Stack>
//               </Stack>
//             </Stack>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </AnimatedCard>
//   );
// };

// // Main Component
// const TrackBooking = () => {
//   const userId = typeof window !== "undefined" ? localStorage.getItem("userActualID") : null;
//   const nameofuser = typeof window !== "undefined" ? localStorage.getItem("userName") : null;
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const fetchAllDetails = async () => {
//     try {
//       setLoading(true);
//       const api = `http://127.0.0.1:8000/airbnb/User-Track-Booking/${userId}/${nameofuser}/`;
//       const response = await fetch(api);
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log("API Response:", data);
      
//       if (data && Array.isArray(data)) {
//         // Transform data with fallbacks
//         const transformedData = data.map((booking) => ({
//           id: booking.id,
//           property_id: booking.property?.id || booking.property,
//           property_title: booking.property_title || "Premium Apartment",
//           property_location: booking.property_location || "City Center, Location",
//           property_image: booking.property_image || getDefaultImage(booking.property_title),
//           amenities: booking.property_amenities || booking.amenities || ['WiFi', 'Kitchen', 'TV', 'AC', 'Parking'],
//           host_name: booking.host_name || "Host",
//           host_contact: booking.host_contact || "host@example.com",
//           host_phone: booking.host_phone || "+91 9876543210",
//           check_in: booking.check_in,
//           check_out: booking.check_out,
//           guests: booking.guests || 1,
//           nights: booking.nights || 1,
//           total_amount: booking.total_amount || 0,
//           currency: booking.currency || "INR",
//           status: booking.status || "pending",
//           created_at: booking.created_at,
//           payment_status: booking.payment_status || false,
//           booking_reference: `BOOK-${String(booking.id).padStart(6, '0')}`
//         }));
        
//         setBookings(transformedData);
//         setError(null);
//       } else {
//         setBookings([]);
//       }
//     } catch (err) {
//       console.error("API Error:", err);
//       setError(err.message || "Unable to fetch bookings. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDefaultImage = (title) => {
//     const tags = ['apartment', 'villa', 'beach-house', 'mountain-view', 'city-loft'];
//     const randomTag = tags[Math.floor(Math.random() * tags.length)];
//     return `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=800&h=600&fit=crop&auto=format&q=80&${randomTag}`;
//   };

//   const handleViewDetails = (booking) => {
//     setSelectedBooking(booking);
//     setDialogOpen(true);
//   };

//   const formatCurrency = (amount, currency) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: currency || 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   useEffect(() => {
//     if (userId && nameofuser) {
//       fetchAllDetails();
//     } else {
//       setError("Please login to view your bookings");
//       setLoading(false);
//     }
//   }, [userId, nameofuser]);

//   if (loading) {
//     return (
//       <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a' }}>
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//           <Stack spacing={3} sx={{ animation: `${fadeIn} 0.5s ease` }}>
//             <Skeleton variant="text" width={300} height={60} />
//             <Skeleton variant="rounded" height={120} />
//             {[1, 2, 3].map((item) => (
//               <Skeleton 
//                 key={item} 
//                 variant="rounded" 
//                 height={300} 
//                 sx={{ 
//                   borderRadius: 4,
//                   animation: `${pulse} 1.5s ease-in-out infinite`
//                 }} 
//               />
//             ))}
//           </Stack>
//         </Container>
//       </Box>
//     );
//   }

//   if (error && !loading) {
//     return (
//       <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a' }}>
//         <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
//           <Box sx={{ animation: `${fadeIn} 0.6s ease` }}>
//             <Alert 
//               severity="error"
//               sx={{ 
//                 mb: 4,
//                 background: 'rgba(239,68,68,0.1)',
//                 border: '1px solid #ef4444',
//                 borderRadius: 2,
//                 color: '#fff'
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Error Loading Bookings
//               </Typography>
//               {error}
//             </Alert>
//             <Button
//               variant="contained"
//               size="large"
//               onClick={fetchAllDetails}
//               sx={{
//                 background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 px: 6,
//                 py: 2,
//                 borderRadius: 3,
//                 animation: `${pulse} 2s ease-in-out infinite`
//               }}
//             >
//               Retry
//             </Button>
//           </Box>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a' }}>
      
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Header */}
//         <Box sx={{ animation: `${slideIn} 0.6s ease`, mb: 6 }}>
//           <GradientTypography 
//             variant="h3" 
//             sx={{ 
//               mb: 1,
//               fontSize: { xs: '2rem', md: '2.5rem' }
//             }}
//           >
//             Track Your Bookings
//           </GradientTypography>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               color: '#9ca3af',
//               lineHeight: 1.6
//             }}
//           >
//             Manage and track all your reservations in one place
//           </Typography>
//         </Box>

//         {/* Stats Summary */}
//         {bookings.length > 0 && (
//           <Box sx={{ mb: 6, animation: `${fadeIn} 0.7s ease 0.2s both` }}>
//             <Grid container spacing={3}>
//               {[
//                 { 
//                   label: 'Total Bookings', 
//                   value: bookings.length, 
//                   color: '#3b82f6',
//                   icon: <Hotel sx={{ fontSize: 30 }} />
//                 },
//                 { 
//                   label: 'Upcoming', 
//                   value: bookings.filter(b => b.status === 'confirmed' && new Date(b.check_in) > new Date()).length,
//                   color: '#10b981',
//                   icon: <CheckCircle sx={{ fontSize: 30 }} />
//                 },
//                 { 
//                   label: 'Pending', 
//                   value: bookings.filter(b => b.status === 'pending').length,
//                   color: '#f59e0b',
//                   icon: <Pending sx={{ fontSize: 30 }} />
//                 },
//                 { 
//                   label: 'Total Spent', 
//                   value: formatCurrency(bookings.reduce((sum, b) => sum + (parseFloat(b.total_amount) || 0), 0), 'INR'),
//                   color: '#8b5cf6',
//                   icon: <CreditCard sx={{ fontSize: 30 }} />
//                 },
//               ].map((stat, index) => (
//                 <Grid item xs={6} md={3} key={index}>
//                   <Paper 
//                     sx={{ 
//                       p: 3,
//                       textAlign: 'center',
//                       background: 'linear-gradient(135deg, rgba(30,30,46,0.8) 0%, rgba(45,45,68,0.8) 100%)',
//                       border: '1px solid rgba(255,255,255,0.1)',
//                       borderRadius: 3,
//                       transition: 'all 0.3s ease',
//                       '&:hover': {
//                         transform: 'translateY(-4px)',
//                       }
//                     }}
//                   >
//                     <Box sx={{ color: stat.color, mb: 2 }}>
//                       {stat.icon}
//                     </Box>
//                     <Typography 
//                       variant="h4" 
//                       sx={{ 
//                         color: 'white',
//                         fontWeight: 800,
//                         mb: 1
//                       }}
//                     >
//                       {stat.value}
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: '#9ca3af', fontWeight: 600 }}>
//                       {stat.label}
//                     </Typography>
//                   </Paper>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         )}

//         {/* Bookings List */}
//         {bookings.length === 0 ? (
//           <Box 
//             sx={{ 
//               textAlign: 'center', 
//               py: 10,
//               animation: `${fadeIn} 0.6s ease`,
//               background: 'linear-gradient(135deg, rgba(30,30,46,0.5) 0%, rgba(45,45,68,0.5) 100%)',
//               borderRadius: 4,
//               border: '2px dashed rgba(255,255,255,0.1)'
//             }}
//           >
//             <Hotel sx={{ fontSize: 80, color: '#4b5563', mb: 3, opacity: 0.5 }} />
//             <Typography variant="h5" color="white" gutterBottom fontWeight="bold">
//               No Bookings Yet
//             </Typography>
//             <Typography variant="body1" color="#9ca3af" sx={{ maxWidth: '500px', mx: 'auto', mb: 4 }}>
//               Start planning your next adventure! Your bookings will appear here once you make a reservation.
//             </Typography>
//             <Button
//               variant="contained"
//               size="large"
//               href="/properties"
//               sx={{
//                 background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 px: 6,
//                 py: 1.5,
//                 borderRadius: 3,
//                 '&:hover': {
//                   background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
//                 }
//               }}
//             >
//               Browse Properties
//             </Button>
//           </Box>
//         ) : (
//           <Stack spacing={4}>
//             {bookings.map((booking, index) => (
//               <BookingCard 
//                 key={booking.id} 
//                 booking={booking} 
//                 index={index}
//                 onViewDetails={handleViewDetails}
//               />
//             ))}
//           </Stack>
//         )}

//         {/* Footer */}
//         {bookings.length > 0 && (
//           <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
//             <Typography variant="body2" color="#6b7280" sx={{ mb: 2 }}>
//               Need assistance with your booking?
//             </Typography>
//             <Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap">
//               <Button
//                 variant="outlined"
//                 size="small"
//                 startIcon={<Phone />}
//                 href="tel:+911234567890"
//                 sx={{
//                   color: '#9ca3af',
//                   borderColor: 'rgba(255,255,255,0.2)',
//                   borderRadius: 2
//                 }}
//               >
//                 Call Support
//               </Button>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 startIcon={<Email />}
//                 href="mailto:support@airbnb.com"
//                 sx={{
//                   color: '#9ca3af',
//                   borderColor: 'rgba(255,255,255,0.2)',
//                   borderRadius: 2
//                 }}
//               >
//                 Email Support
//               </Button>
//             </Stack>
//           </Box>
//         )}
//       </Container>

//       {/* Booking Details Dialog */}
//       <Dialog 
//         open={dialogOpen} 
//         onClose={() => setDialogOpen(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         {selectedBooking && (
//           <>
//             <DialogTitle sx={{ 
//               background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
//               color: 'white',
//               fontWeight: 'bold'
//             }}>
//               Booking Details - {selectedBooking.property_title}
//             </DialogTitle>
//             <DialogContent dividers sx={{ py: 3 }}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   {/* <CardMedia
//                     component="img"
//                     height="300"
//                     image={selectedBooking.images[0]}
//                     alt={selectedBooking.property_title}
//                     sx={{ borderRadius: 2 }}
//                   /> */}
                  
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Typography variant="h6" gutterBottom>
//                     {selectedBooking.property_title}
//                   </Typography>
//                   <Typography color="textSecondary" paragraph>
//                     {selectedBooking.property_location}
//                   </Typography>
//                   <Divider sx={{ my: 2 }} />
//                   <Stack spacing={1}>
//                     <Typography variant="body2">
//                       <strong>Booking Reference:</strong> {selectedBooking.booking_reference}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Status:</strong> {selectedBooking.status}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Total Amount:</strong> {formatCurrency(selectedBooking.total_amount, selectedBooking.currency)}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Guests:</strong> {selectedBooking.guests}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Nights:</strong> {selectedBooking.nights}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Check-in:</strong> {new Date(selectedBooking.check_in).toLocaleDateString()}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Check-out:</strong> {new Date(selectedBooking.check_out).toLocaleDateString()}
//                     </Typography>
//                   </Stack>
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setDialogOpen(false)}>Close</Button>
//               <Button 
//                 variant="contained" 
//                 onClick={() => alert(`Downloading invoice for ${selectedBooking.booking_reference}`)}
//               >
//                 Download Invoice
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </Box>
//   );
// };

// export default TrackBooking;





































































// import axios from "axios"
// import { useEffect, useState } from "react"

// const TrackBooking = () => {

//   const userId = localStorage.getItem("userActualID")
//   const nameofuser = localStorage.getItem("userName")

//   const [allData , setAllData] = useState([])

//   const featchAllDetails = async () => {
//     try {
//       const api = `http://127.0.0.1:8000/airbnb/User-Track-Booking/${userId}/${nameofuser}/`;
//       const response = await axios.get(api);

//       setAllData(response.data)
//       console.log("Response : ", response.data);
//     } catch (error) {
//       console.error("API Error:", error.response);
//     }
//   };

//   useEffect(() => {
//     if (userId && nameofuser) {
//       featchAllDetails()
//     }
//   }, [userId, nameofuser])

//   return (
//     <center>
//       <h1>Track Orders</h1>

//       <div className="d-flex">
//         {allData.map((item, index) => (
//           <>
         
//           </>
//         ))}
//       </div>
//     </center>
//   )
// }

// export default TrackBooking
