// import { Container, Row, Col, Form, Button, Card} from "react-bootstrap";
// import {FaHome,FaMapMarkerAlt,FaMoneyBillWave,FaBed,FaUserFriends,FaBath,FaRegBuilding,FaGlobe,FaWifi,FaSwimmingPool,FaDumbbell,FaCarSide, FaSmoking,FaParking,FaTv,FaStaylinked  } from "react-icons/fa";
// import { IoFastFoodOutline } from "react-icons/io5";
// import { toast, ToastContainer } from "react-toastify";
// import { SlCamrecorder } from "react-icons/sl";
// import { TbAirConditioning } from "react-icons/tb";
// import HostLayout from "./HostLayout";
// import { GiWaterFountain } from "react-icons/gi";
// import "../../styles/HostServicesManage.css"
// import { useEffect, useState } from "react";
// import { MdRule } from "react-icons/md";
// import { RiMindMap } from "react-icons/ri";

// const HostAddProperty = () => {
//   const [Is_Host_Varifeid, setIs_Host_Varifeid] = useState(false);
//   const [hostCategoryOptions, setHostCategoryOptions] = useState([]);
//   const [hostImage, setHostImage] = useState("");
//   const [hostName, setHostName] = useState("");
//   const hostEmail = localStorage.getItem("HostEmail"); 
//   const [handleInput , setHandleInput] = useState({})
               


// // ------> 1️⃣ <-------//
// //  🟢🟢🟢🟢🟢 HOST KI ADD PROPERTY ME CATEGURY AA RAI 🟢🟢🟢🟢🟢🟢
//   const LoadAllCategoryOfServices = async () => {
//     if (!hostEmail) {
//       toast.error("⚠️ Host email not found in localStorage");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/airbnb/Show-All-Servises/?email=${hostEmail}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//       const data = await response.json();

//       if (response.ok) {
//         setHostCategoryOptions(data.data || []);
//       } else {
//         toast.error(data.error || "Something went wrong");
//       }
//     } 
//     catch (err) {
//       console.error(err);
//       toast.error("Unable to fetch host services");
//     }
//   };
// // ======================🟢🟢🟢🟢🟢🟢🟢🟢🟢==========================




// // ------> 2️⃣ <-------//
// //  🟢🟢🟢🟢🟢 HOST KA STATUS CHECK HI RAHA HAI 🟢🟢🟢🟢🟢🟢
//   const IsHostVarifeid = async () => {
//     try {
//       const hostEmail = localStorage.getItem("HostEmail");

//       if (!hostEmail) {
//         setIs_Host_Varifeid(false);
//         return;
//       }

//       const response = await fetch(
//         `http://127.0.0.1:8000/airbnb/Check-Host-Varifeid/?email=${hostEmail}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       const data = await response.json();
    
//       const hostImageFro = data.host_image;
//       const hostNameFro = data.host_name;

//       setHostImage(
//       data.host_image 
//         ? `http://127.0.0.1:8000/media/${data.host_image}` 
//         : "http://127.0.0.1:8000/media/userImage/default.jpg"
//       );


//       setHostName(hostNameFro)


//       if (response.status === 200) {

//         if (data && data.data && data.data.length > 0) {

//           const verified = data.is_verified ?? data.data[0].verified_status ?? false;

//           if (verified === true) {
//             setIs_Host_Varifeid(true);
//           } else {
//             setIs_Host_Varifeid(false);
//           }
//         } else {
//           setIs_Host_Varifeid(false);
//         }
//       }

      
//       else if (response.status === 401) {  // ❌ Unauthorized or not found
//         setIs_Host_Varifeid(false);
//       }
    
//       else {   // ⚠️ Server Error
//         setIs_Host_Varifeid(false);
//       }
//     } catch (error) {
//       setIs_Host_Varifeid(false);
//     }
//   };
// // ======================🟢🟢🟢🟢🟢🟢🟢🟢🟢==========================





// // ------> 3️⃣ <-------//
// //🟢🟢🟢🟢🟢Host ka data Property model se auto-manage ho raha hai.🟢🟢🟢🟢🟢🟢
// const handleAllInput = (e) => {
//     const name = e.target.name
//     const value = e.target.value
//     setHandleInput((prev)=>({...prev , [name] : value}))
// }
// // ======================🟢🟢🟢🟢🟢🟢🟢🟢🟢==========================






// // ------> 4️⃣ <-------//
// //🟢🟢🟢🟢🟢 HOST KA STATUS CHECK HI RAHA HAI 🟢🟢🟢🟢🟢🟢
// const handleSubmit = async (e) => {
//   e.preventDefault(); 
//   // Home Listing Form Validation
//   if (!handleInput.hometitle || handleInput.hometitle.trim().length === 0 || handleInput.hometitle.trim().length < 10 || handleInput.hometitle.trim().length > 30) {
//       toast.error("Title must be between 10 and 30 characters.");
//   } 
//   else if (!handleInput.homeType || handleInput.homeType.trim().length === 0) {
//       toast.error("Please select a property category.");
//   } 
//   else if (!handleInput.homeDiscriptions || handleInput.homeDiscriptions.trim().length === 0 || handleInput.homeDiscriptions.trim().split(/\s+/).length < 20) {
//       toast.error("Description must be between 1 and 20 words.");
//   } 
//   else if (!handleInput.homeAdress || handleInput.homeAdress.trim().length === 0  || handleInput.homeAdress.trim().split(/\s+/).length < 3) {
//       toast.error("Please enter the full address.");
//   } 
//   else if (!handleInput.homeCity || handleInput.homeCity.trim().length === 0) {
//       toast.error("Please enter a valid city name ");
//   } 
//   else if (!handleInput.homeCountry || handleInput.homeCountry.trim().length === 0) {
//       toast.error("Please enter a valid country name ");
//   } 
//   else if (!handleInput.homePin || handleInput.homePin.trim().length === 0 || !/^\d{6}$/.test(handleInput.homePin.trim())) {
//       toast.error("enter a valid 6-digit PIN code.");
//   } 
//   else if (!handleInput.homePricePerNight || handleInput.homePricePerNight.trim().length === 0 || isNaN(handleInput.homePricePerNight) || Number(handleInput.homePricePerNight) <= 0) {
//       toast.error("Please enter a valid price per night.");
//   } 
//   else if (!handleInput.homeAvailableDateFrom || handleInput.homeAvailableDateFrom.trim().length === 0) {
//       toast.error("Please select the availability start date.");
//   } 
//   else if (!handleInput.homeAvailableDateTo || handleInput.homeAvailableDateTo.trim().length === 0) {
//       toast.error("Please select the availability end date.");
//   } 
//   else if (new Date(handleInput.homeAvailableDateFrom) > new Date(handleInput.homeAvailableDateTo)) {
//       toast.error("Start date cannot be after end date.");
//   }
//   else {
//     toast.success("Form validation passed")
//   }


//   const response = await fetch("http://127.0.0.1:8000/airbnb/host-Add-Property/",{
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ handleInput , hostEmail  }),
//     })


//     if (response.status === 200) {
//        toast.success("Host property added successfully ! ")
//     } 
//     else if(response.status === 401) {
//       toast.error("Host with this email does not exist")
//     }
//     else{
//       toast.error("Host profile not found for this user")
//     }




// };
// // ======================🟢🟢🟢🟢🟢🟢🟢🟢🟢==========================



//   useEffect(() => {
//     LoadAllCategoryOfServices();
//     IsHostVarifeid()   
//   }, []);



//   return (
//     <HostLayout>
//       <Container className="my-5">
        
//         {/* Headers hai */}
//         {Is_Host_Varifeid ? 
//           <h2 className="text-center mb-5 fw-bold" id="MainHeadding">Add Property</h2> :
//           <h2 className="text-center mb-5 fw-bold" id="MainHeadding">Is Process Varifying</h2>
//         }

//         {/* Main Div hai */}
//         {Is_Host_Varifeid ? 
//         <form onSubmit={handleSubmit}>
//           <Row xs={1} md={2} className="g-4 MainContainer">
//             {/* Host Ki Details */}
//             <Col>
//               <Card className="p-3 h-100" id="FormContainer">
//                 <h5 className="formHeadding mb-3">
//                   <FaHome className="me-2" id="icons"/> Basic Details
//                 </h5>
//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     <FaRegBuilding className="me-2 LabelIcon" />
//                     Title
//                   </Form.Label>
//                   <Form.Control type="text" placeholder="Enter property title" id="inputCss" name="hometitle" onChange={handleAllInput}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     <FaRegBuilding className="me-2 LabelIcon" />
//                     Category
//                   </Form.Label>
//                   <Form.Select id="inputCss" name="homeType" onChange={handleAllInput}>
//                     <option value="">Select category</option>
//                     {Array.isArray(hostCategoryOptions) &&
//                       hostCategoryOptions.map((service, index) => (
//                         <option key={index} value={service.id}>
//                           {service.services_name}
//                         </option>
//                       ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control as="textarea" rows={2} placeholder="Description..." id="inputCss" name="homeDiscriptions" onChange={handleAllInput}/>
//                  </Form.Group>
//               </Card>
//             </Col>

//             {/* Location And Address Details */}
//             <Col>
//               <Card className="p-3 shadow-sm h-100" id="FormContainer">
//                 <h5 className="formHeadding mb-3">
//                   <FaMapMarkerAlt className="me-2" id="icons"/> Location Details
//                 </h5>

//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     <FaMapMarkerAlt className="me-2 LabelIcon" />
//                     Location
//                   </Form.Label>
//                   <Form.Control type="text" placeholder="Exact location/address" id="inputCss" name="homeAdress" onChange={handleAllInput}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     <FaRegBuilding className="me-2 LabelIcon" />
//                     City
//                   </Form.Label>
//                   <Form.Control type="text" placeholder="Enter city" id="inputCss" name="homeCity" onChange={handleAllInput}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     <FaGlobe className="me-2 LabelIcon" />
//                     Country
//                   </Form.Label>
//                   <Form.Control type="text" placeholder="Enter country" id="inputCss" name="homeCountry" onChange={handleAllInput}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Pincode</Form.Label>
//                   <Form.Control type="number" placeholder="Enter pincode" id="inputCss" name="homePin" onChange={handleAllInput}/>
//                 </Form.Group>
//               </Card>
//             </Col>

//             {/* Pricing And Available Date Hai */}
//             <Col>
//               <Card className="p-3 shadow-sm h-100" id="FormContainer">
//                 <h5 className="formHeadding mb-3">
//                   <FaMoneyBillWave className="me-2" id="icons"/> Pricing & Availability
//                 </h5>

//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     <FaMoneyBillWave className="me-2 LabelIcon" />
//                     Price Per Night
//                   </Form.Label>
//                   <Form.Control type="number" placeholder="Enter price" id="inputCss" name="homePricePerNight" onChange={handleAllInput}/>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Offer</Form.Label>
//                   <Form.Select id="inputCss" name="homeOffer" onChange={handleAllInput}>
//                     <option>Select offer</option>
//                   </Form.Select>
//                 </Form.Group>

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Available From</Form.Label>
//                       <Form.Control type="date" id="inputCss" name="homeAvailableDateFrom" onChange={handleAllInput}/>
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Available To</Form.Label>
//                       <Form.Control type="date" id="inputCss" name="homeAvailableDateTo" onChange={handleAllInput}/>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>

//             {/* Room Ki Details */}
//             <Col>
//               <Card className="p-3 shadow-sm h-100" id="FormContainer">
//                 <h5 className="formHeadding mb-3">
//                   <FaBed className="me-2" id="icons"/> Room Details & Facilities
//                 </h5>

//                 <Row id="RoomDetailsDiv" className="d-flex">
//                   <Col xs={6} md={3} id="DetailsCol">
//                     <Form.Group className="mb-3">
//                       <Form.Label>
//                         <FaUserFriends className="me-1 iconsFacilities" />
//                         Guests
//                       </Form.Label>
//                       <Form.Control type="number" defaultValue={1} id="inputCss" name="homeTotalGuest" onChange={handleAllInput}/>
//                     </Form.Group>
//                   </Col>

//                   <Col xs={6} md={3} id="DetailsCol">
//                     <Form.Group className="mb-3">
//                       <Form.Label>
//                         <FaBed className="me-1 iconsFacilities" />
//                         Bedrooms
//                       </Form.Label>
//                       <Form.Control type="number" defaultValue={1} id="inputCss" name="homeBads" onChange={handleAllInput}/>
//                     </Form.Group>
//                   </Col>

//                   <Col xs={6} md={3} id="DetailsCol">
//                     <Form.Group className="mb-3">
//                       <Form.Label>
//                         <FaBath className="me-1 iconsFacilities" />
//                         Bathrooms
//                       </Form.Label>
//                       <Form.Control type="number" defaultValue={1} id="inputCss" name="homeBathrooms" onChange={handleAllInput}/>
//                     </Form.Group>
//                   </Col>

//                   <Col xs={6} md={3} id="DetailsCol">
//                     <Form.Group className="mb-3">
//                       <Form.Label>
//                         <FaBed className="me-1 iconsFacilities" />
//                         Beds
//                       </Form.Label>
//                       <Form.Control type="number" defaultValue={1} id="inputCss" name="homeBads" onChange={handleAllInput}/>
//                     </Form.Group>
//                   </Col>
                  
//                 </Row>

//               </Card>
//             </Col>
            
//             {/* Room Ki Function */}
//             <Col>
//               <Card className="p-3 shadow-sm h-100" id="FormContainer">
//                 <h5 className="formHeadding mb-3">
//                   <MdRule  className="me-2" id="icons"/> Facilities
//                 </h5>
//                 {/* Facilities */}
//                 <h6 className="mt-3 text-secondary">Facilities</h6>
//                 <Row>
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homeWifi" onChange={handleAllInput}  label={<><FaWifi className="me-1" /> WiFi</>}/>
//                   </Col>
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox"  name="homePool" onChange={handleAllInput} label={<><FaSwimmingPool className="me-1"/> Pool</>} />
//                   </Col>
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homeGym" onChange={handleAllInput}  label={<><FaDumbbell className="me-1" /> Gym</>}/>
//                   </Col>
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homePickup" onChange={handleAllInput}  label={<><FaCarSide className="me-1"/> Pickup</>}/>
//                   </Col>
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homeSmooking" onChange={handleAllInput}  label={<><FaSmoking className="me-1"/> Smoking</>} />
//                   </Col>
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homeFood" onChange={handleAllInput}  label={<><IoFastFoodOutline className="me-1"/> Food</>}/>
//                   </Col>
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homeParking" onChange={handleAllInput}  label={<><FaParking className="me-1"/> Parking</>}/>
//                   </Col>
//                  <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homeParking" onChange={handleAllInput}  label={<><SlCamrecorder className="me-1"/>cameras</>}/>
//                   </Col>
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homeParking" onChange={handleAllInput}  label={<><FaTv  className="me-1"/> TV </>}/>
//                   </Col>  
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homeParking" onChange={handleAllInput}  label={<><TbAirConditioning  className="me-1"/> AC </>}/>
//                   </Col>   
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homeParking" onChange={handleAllInput}  label={<><GiWaterFountain  className="me-1"/> Fillter Water </>}/>
//                   </Col>  
//                   <Col xs={6} md={6}>
//                     <Form.Check type="checkbox" name="homeParking" onChange={handleAllInput}  label={<><FaStaylinked   className="me-1"/> Stay Long Allow </>}/>
//                   </Col>    
//                 </Row>
                
//              </Card>
//             </Col>

//             {/* Room Ki Function */}
//             <Col>
//               <Card className="p-3 shadow-sm h-100" id="FormContainer">
//                 <h5 className="formHeadding mb-3">
//                   <RiMindMap className="me-2" id="icons" /> Map Details
//                 </h5>
//                 <Row>
//                   <Col xs={14} md={14}>
//                   <ul>
//                     <li>Please add your complete property details carefully, including the full address and accurate location.</li>
//                     <li>Make sure the map pin is placed correctly to match your property address.</li>
//                     <li>If the entered address or location is incorrect, your property map and verification process may be cancelled.</li>
//                   </ul>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col> 

//           </Row>

//           {/* All Submit */}
//           <div className="text-center mt-5">
//             {Is_Host_Varifeid ?
//             <Button type="submit" variant="primary"  size="lg">
//               Submit Property
//             </Button>
//             :
//             <Button variant="primary" size="lg">
//               Plase Wait For Admin Action For Confirmation 
//             </Button>
//             }
//           </div>
//         </form>
//           :
//           <div>
//             <div className="MainDivOfProfileProgessing d-flex p-20">
//               <div className="RecordsDetailed w-50 m-10">
//                   <div className="d-flex">
//                     <img src={hostImage || "/default.jpg"}style={{width: "100px",height: "150px",borderRadius: "20px",objectFit:'cover', border: "2px solid #ff0077",margin:'20px'}}/>
//                      <div className="right m-20" style={{color:'#ff0000ff',padding:'20px',fontFamily:'monospace'}}>
//                         <h3 style={{ color: "white" ,fontFamily:'cursive'}}>{hostName}</h3>
//                         <strong>{hostEmail}</strong>
//                      </div>
//                   </div>
//                   <ul>
//                     <li>All records and documents are legally verified.</li>
//                     <li>Your hosting profile is under review for quality standards.</li>
//                     <li>Please ensure all property details and images are accurate.</li>
//                     <li>Our team will notify you once your host account is approved.</li>
//                   </ul>

//                   <div id="NoticeDiv" className="notice">
//                     If your record is invalid, you may update it up to two times. If you upload an invalid record twice, we will block your profile.
//                     <span className="leftLine"></span>
//                     <span className="rightLine"></span>
//                   </div>
                   
//               </div>  

//               <div className="GiftDiv w-50 m-10">
//                 <img id="imageGif" src="https://i.pinimg.com/originals/6a/95/5f/6a955fce006edf6db6814c8d689a303d.gif" alt="" />
//               </div>
//             </div> 
//           </div>
//         }



//       </Container>
//       {/* Toast container added here */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </HostLayout>
//   );
// };

// export default HostAddProperty;





import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  Paper,
  Fade,
  Slide,
  Zoom,
  Grow,
  Alert,
  Chip,
  useMediaQuery,
  useTheme,
  FormHelperText,
} from "@mui/material";
import {
  FaHome,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBed,
  FaUserFriends,
  FaBath,
  FaRegBuilding,
  FaGlobe,
  FaWifi,
  FaSwimmingPool,
  FaDumbbell,
  FaCarSide,
  FaSmoking,
  FaParking,
  FaTv,
  FaStaylinked,
} from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SlCamrecorder } from "react-icons/sl";
import { TbAirConditioning } from "react-icons/tb";
import HostLayout from "./HostLayout";
import { GiWaterFountain } from "react-icons/gi";
import "../../styles/HostServicesManage.css";
import { MdRule } from "react-icons/md";
import { RiMindMap } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HostAddProperty = () => {
  const [Is_Host_Varifeid, setIs_Host_Varifeid] = useState(false);
  const [hostCategoryOptions, setHostCategoryOptions] = useState([]);
  const [hostImage, setHostImage] = useState("");
  const [hostName, setHostName] = useState("");
  const hostEmail = localStorage.getItem("HostEmail");
  const [handleInput, setHandleInput] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  // Animation states
  const [checked, setChecked] = useState(false);

  // ------> 1️⃣ <-------//
  // 🟢🟢🟢🟢🟢 HOST KI ADD PROPERTY ME CATEGURY AA RAI 🟢🟢🟢🟢🟢🟢
  const LoadAllCategoryOfServices = async () => {
    if (!hostEmail) {
      toast.error("⚠️ Host email not found in localStorage");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/airbnb/Show-All-Servises/?email=${hostEmail}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setHostCategoryOptions(data.data || []);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to fetch host services");
    }
  };
  // ======================🟢🟢🟢🟢🟢🟢🟢🟢🟢==========================

  // ------> 2️⃣ <-------//
  // 🟢🟢🟢🟢🟢 HOST KA STATUS CHECK HI RAHA HAI 🟢🟢🟢🟢🟢🟢
  const IsHostVarifeid = async () => {
    try {
      const hostEmail = localStorage.getItem("HostEmail");

      if (!hostEmail) {
        setIs_Host_Varifeid(false);
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/airbnb/Check-Host-Varifeid/?email=${hostEmail}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      // CORRECTED: Handle image path properly
      if (data.host_image) {
        setHostImage(
          data.host_image.startsWith('http') 
            ? data.host_image 
            : `http://127.0.0.1:8000/media/${data.host_image}`
        );
      } else {
        setHostImage("http://127.0.0.1:8000/media/userImage/default.jpg");
      }

      setHostName(data.host_name || "");

      // CORRECTED: Simplified verification check
      if (response.status === 200) {
        const verified = data.is_verified || 
                        (data.data && data.data[0] && data.data[0].verified_status) || 
                        false;
        setIs_Host_Varifeid(verified === true);
      } else {
        setIs_Host_Varifeid(false);
      }
    } catch (error) {
      console.error("Verification error:", error);
      setIs_Host_Varifeid(false);
    }
  };
  // ======================🟢🟢🟢🟢🟢🟢🟢🟢🟢==========================

  // ------> 3️⃣ <-------//
  //🟢🟢🟢🟢🟢Host ka data Property model se auto-manage ho raha hai.🟢🟢🟢🟢🟢🟢
  const handleAllInput = (e) => {
    const { name, value, type, checked } = e.target;
    
    // CORRECTED: Handle checkbox inputs properly
    if (type === 'checkbox') {
      setHandleInput((prev) => ({ ...prev, [name]: checked }));
    } else {
      setHandleInput((prev) => ({ ...prev, [name]: value }));
    }
  };
  // ======================🟢🟢🟢🟢🟢🟢🟢🟢🟢==========================

  // ------> 4️⃣ <-------//
  //🟢🟢🟢🟢🟢 HOST KA STATUS CHECK HI RAHA HAI 🟢🟢🟢🟢🟢🟢
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // CORRECTED: Validation logic - Check all conditions first
    let isValid = true;
    const errors = [];

    if (!handleInput.hometitle || handleInput.hometitle.trim().length < 10) {
      errors.push("Title must be between 10 and 30 characters.");
      isValid = false;
    }
    
    if (!handleInput.homeType) {
      errors.push("Please select a property category.");
      isValid = false;
    }
    
    if (!handleInput.homeDiscriptions || handleInput.homeDiscriptions.trim().split(/\s+/).length < 20) {
      errors.push("Description must contain at least 20 words.");
      isValid = false;
    }
    
    if (!handleInput.homeAdress || handleInput.homeAdress.trim().split(/\s+/).length < 3) {
      errors.push("Please enter the full address (minimum 3 words).");
      isValid = false;
    }
    
    if (!handleInput.homeCity) {
      errors.push("Please enter a valid city name.");
      isValid = false;
    }
    
    if (!handleInput.homeCountry) {
      errors.push("Please enter a valid country name.");
      isValid = false;
    }
    
    if (!handleInput.homePin || !/^\d{6}$/.test(handleInput.homePin.trim())) {
      errors.push("Enter a valid 6-digit PIN code.");
      isValid = false;
    }
    
    if (!handleInput.homePricePerNight || Number(handleInput.homePricePerNight) <= 0) {
      errors.push("Please enter a valid price per night.");
      isValid = false;
    }
    
    if (!handleInput.homeAvailableDateFrom) {
      errors.push("Please select the availability start date.");
      isValid = false;
    }
    
    if (!handleInput.homeAvailableDateTo) {
      errors.push("Please select the availability end date.");
      isValid = false;
    }
    
    if (handleInput.homeAvailableDateFrom && handleInput.homeAvailableDateTo) {
      if (new Date(handleInput.homeAvailableDateFrom) > new Date(handleInput.homeAvailableDateTo)) {
        errors.push("Start date cannot be after end date.");
        isValid = false;
      }
    }

    // Show first error if any
    if (!isValid && errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    // If all validations pass
    toast.success("Form validation passed");
    setTimeout(() => {
      navigate("/host-Add-Property-Image");
    }, 2000); // 2 seconds delay

      const response = await fetch(
        "http://127.0.0.1:8000/airbnb/host-Add-Property/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ handleInput, hostEmail }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        toast.success("Host property added successfully!");
        setTimeout(() => {
          navigate("/host-Add-Property-Image");
        }, 2000); // 2 seconds delay
      } else if (response.status === 401) {
        toast.error("Host with this email does not exist");
      } else {
        toast.error(data.message || "Host profile not found for this user");
      }

  };
  // ======================🟢🟢🟢🟢🟢🟢🟢🟢🟢==========================

  useEffect(() => {
    LoadAllCategoryOfServices();
    IsHostVarifeid();
    // Trigger animations
    setChecked(true);
  }, []);

  const IconLabel = ({ Icon, text }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "white" }}>
      <Icon />
      <span>{text}</span>
    </Box>
  );

  return (
    <HostLayout>
      <Container
        maxWidth="xl"
        sx={{
          py: 5,
          transition: "all 0.3s ease",
          bgcolor: "black",
          minHeight: "100vh",
        }}
      >
        <Fade in={checked} timeout={800}>
          {/* Headers hai */}
          {Is_Host_Varifeid ? (
            <Typography
              variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 5,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 0.8 },
                  "50%": { opacity: 1 },
                  "100%": { opacity: 0.8 },
                },
              }}
            >
              Add Property
            </Typography>
          ) : (
            <Typography
              variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 5,
                color: "warning.main",
              }}
            >
              Verification in Process
            </Typography>
          )}
        </Fade>

        {/* Main Div hai */}
        {Is_Host_Varifeid ? (
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>

                {/* Host Ki Details */}
                <Grid item xs={12} md={6}>
                  <Grow in={checked} timeout={1000}>
                    <Card
                      sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                        bgcolor: "#1a1a1a",
                        border: "1px solid #333",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold",
                            color: "#2196F3",
                            mb: 3,
                          }}
                        >
                          <FaHome style={{ marginRight: 8 }} />
                          Basic Details
                        </Typography>

                        <TextField
                          fullWidth
                          label={
                            <IconLabel Icon={FaRegBuilding} text="Title" />
                          }
                          placeholder="Enter property title"
                          name="hometitle"
                          onChange={handleAllInput}
                          sx={{ 
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#2196F3",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#aaa",
                            },
                          }}
                          variant="outlined"
                          required
                        />

                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <InputLabel sx={{ color: "#aaa" }}>
                            <IconLabel Icon={FaRegBuilding} text="Category" />
                          </InputLabel>
                          <Select
                            name="homeType"
                            onChange={handleAllInput}
                            label={
                              <IconLabel Icon={FaRegBuilding} text="Category" />
                            }
                            sx={{
                              color: "white",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#444",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#2196F3",
                              },
                            }}
                            required
                          >
                            <MenuItem sx={{background:'black'}} value="">Select category</MenuItem>
                            {Array.isArray(hostCategoryOptions) &&
                              hostCategoryOptions.map((service, index) => (
                                <MenuItem sx={{background:'black'}} key={index} value={service.id}>
                                  {service.services_name}
                                </MenuItem>
                              ))}
                          </Select>
                          <FormHelperText sx={{ color: "#aaa" }}>
                            Required field
                          </FormHelperText>
                        </FormControl>

                        <TextField
                          fullWidth
                          label="Description"
                          placeholder="Description..."
                          name="homeDiscriptions"
                          onChange={handleAllInput}
                          multiline
                          rows={3}
                          sx={{ 
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#2196F3",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#aaa",
                            },
                          }}
                          variant="outlined"
                          required
                        />
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>


                {/* Pricing And Available Date Hai */}
                <Grid item xs={12} md={6}>
                  <Grow in={checked} timeout={1400}>
                    <Card
                      sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                        bgcolor: "#1a1a1a",
                        border: "1px solid #333",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold",
                            color: "#2196F3",
                            mb: 3,
                          }}
                        >
                          <FaMoneyBillWave style={{ marginRight: 8 }} />
                          Pricing & Availability
                        </Typography>

                        <TextField
                          fullWidth
                          label={
                            <IconLabel
                              Icon={FaMoneyBillWave}
                              text="Price Per Night"
                            />
                          }
                          placeholder="Enter price"
                          name="homePricePerNight"
                          onChange={handleAllInput}
                          type="number"
                          sx={{ 
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#2196F3",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#aaa",
                            },
                          }}
                          variant="outlined"
                          required
                        />

                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <InputLabel sx={{ color: "#aaa" }}>Offer</InputLabel>
                          <Select
                            name="homeOffer"
                            onChange={handleAllInput}
                            label="Offer"
                            sx={{
                              color: "white",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#444",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#2196F3",
                              },
                            }}
                          >
                            <MenuItem value="">Select offer</MenuItem>
                          </Select>
                        </FormControl>

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Available From"
                              name="homeAvailableDateFrom"
                              onChange={handleAllInput}
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  color: "white",
                                  "& fieldset": {
                                    borderColor: "#444",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#2196F3",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "#aaa",
                                },
                              }}
                              variant="outlined"
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Available To"
                              name="homeAvailableDateTo"
                              onChange={handleAllInput}
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  color: "white",
                                  "& fieldset": {
                                    borderColor: "#444",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#2196F3",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "#aaa",
                                },
                              }}
                              variant="outlined"
                              required
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>

                {/* Location And Address Details */}
                <Grid item xs={12} md={6}>
                  <Grow in={checked} timeout={1200}>
                    <Card
                      sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                        bgcolor: "#1a1a1a",
                        border: "1px solid #333",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold",
                            color: "#2196F3",
                            mb: 3,
                          }}
                        >
                          <FaMapMarkerAlt style={{ marginRight: 8 }} />
                          Location Details
                        </Typography>

                        <TextField
                          fullWidth
                          label={
                            <IconLabel
                              Icon={FaMapMarkerAlt}
                              text="Location"
                            />
                          }
                          placeholder="Exact location/address"
                          name="homeAdress"
                          onChange={handleAllInput}
                          sx={{ 
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#2196F3",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#aaa",
                            },
                          }}
                          variant="outlined"
                          required
                        />

                        <TextField
                          fullWidth
                          label={
                            <IconLabel Icon={FaRegBuilding} text="City" />
                          }
                          placeholder="Enter city"
                          name="homeCity"
                          onChange={handleAllInput}
                          sx={{ 
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#2196F3",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#aaa",
                            },
                          }}
                          variant="outlined"
                          required
                        />

                        <TextField
                          fullWidth
                          label={<IconLabel Icon={FaGlobe} text="Country" />}
                          placeholder="Enter country"
                          name="homeCountry"
                          onChange={handleAllInput}
                          sx={{ 
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#2196F3",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#aaa",
                            },
                          }}
                          variant="outlined"
                          required
                        />

                        <TextField
                          fullWidth
                          label="Pincode"
                          placeholder="Enter pincode"
                          name="homePin"
                          onChange={handleAllInput}
                          type="number"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#2196F3",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#aaa",
                            },
                          }}
                          variant="outlined"
                          required
                        />
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>

                {/* Room Ki Details */}
                <Grid item xs={12} md={6}>
                  <Grow in={checked} timeout={1600}>
                    <Card
                      sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                        bgcolor: "#1a1a1a",
                        border: "1px solid #333",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold",
                            color: "#2196F3",
                            mb: 3,
                          }}
                        >
                          <FaBed style={{ marginRight: 8 }} />
                          Room Details & Facilities
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={6} sm={3}>
                            <TextField
                              fullWidth
                              label={
                                <IconLabel Icon={FaUserFriends} text="Guests" />
                              }
                              defaultValue={1}
                              name="homeTotalGuest"
                              onChange={handleAllInput}
                              type="number"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  color: "white",
                                  "& fieldset": {
                                    borderColor: "#444",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#2196F3",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "#aaa",
                                },
                              }}
                              variant="outlined"
                            />
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <TextField
                              fullWidth
                              label={
                                <IconLabel Icon={FaBed} text="Bedrooms" />
                              }
                              defaultValue={1}
                              name="homeBads"
                              onChange={handleAllInput}
                              type="number"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  color: "white",
                                  "& fieldset": {
                                    borderColor: "#444",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#2196F3",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "#aaa",
                                },
                              }}
                              variant="outlined"
                            />
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <TextField
                              fullWidth
                              label={
                                <IconLabel Icon={FaBath} text="Bathrooms" />
                              }
                              defaultValue={1}
                              name="homeBathrooms"
                              onChange={handleAllInput}
                              type="number"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  color: "white",
                                  "& fieldset": {
                                    borderColor: "#444",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#2196F3",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "#aaa",
                                },
                              }}
                              variant="outlined"
                            />
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <TextField
                              fullWidth
                              label={
                                <IconLabel Icon={FaBed} text="Beds" />
                              }
                              defaultValue={1}
                              name="homeBeds"
                              onChange={handleAllInput}
                              type="number"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  color: "white",
                                  "& fieldset": {
                                    borderColor: "#444",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#2196F3",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "#aaa",
                                },
                              }}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>

                {/* Room Ki Function */}
                <Grid item xs={12} md={6}>
                  <Grow in={checked} timeout={1800}>
                    <Card
                      sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                        bgcolor: "#1a1a1a",
                        border: "1px solid #333",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold",
                            color: "#2196F3",
                            mb: 3,
                          }}
                        >
                          <MdRule style={{ marginRight: 8 }} />
                          Facilities
                        </Typography>

                        <Typography
                          variant="subtitle2"
                          color="#aaa"
                          gutterBottom
                        >
                          Facilities
                        </Typography>

                        <Grid container spacing={2}>
                          {[
                            { icon: FaWifi, label: "WiFi", name: "homeWifi" },
                            { icon: FaSwimmingPool, label: "Pool", name: "homePool" },
                            { icon: FaDumbbell, label: "Gym", name: "homeGym" },
                            { icon: FaCarSide, label: "Pickup", name: "homePickup" },
                            { icon: FaSmoking, label: "Smoking", name: "homeSmooking" },
                            { icon: IoFastFoodOutline, label: "Food", name: "homeFood" },
                            { icon: FaParking, label: "Parking", name: "homeParking" },
                            { icon: SlCamrecorder, label: "Cameras", name: "homeCameras" },
                            { icon: FaTv, label: "TV", name: "homeTV" },
                            { icon: TbAirConditioning, label: "AC", name: "homeAC" },
                            { icon: GiWaterFountain, label: "Filter Water", name: "homeFilterWater" },
                            { icon: FaStaylinked, label: "Stay Long Allow", name: "homeStayLong" },
                          ].map((item, index) => (
                            <Grid item xs={6} key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name={item.name}
                                    onChange={handleAllInput}
                                    sx={{
                                      color: "#2196F3",
                                      "&.Mui-checked": {
                                        color: "#2196F3",
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "white" }}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                  </Box>
                                }
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>

                {/* Map Details */}
                <Grid item xs={12} md={6}>
                  <Grow in={checked} timeout={2000}>
                    <Card
                      sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                        bgcolor: "#1a1a1a",
                        border: "1px solid #333",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold",
                            color: "#2196F3",
                            mb: 3,
                          }}
                        >
                          <RiMindMap style={{ marginRight: 8 }} />
                          Map Details
                        </Typography>

                        <Alert 
                          severity="info" 
                          sx={{ 
                            mb: 2,
                            bgcolor: "#0a3d62",
                            color: "white",
                            "& .MuiAlert-icon": {
                              color: "#2196F3",
                            },
                          }}
                        >
                          <List dense>
                            <ListItem sx={{ px: 0, py: 0.5, color: "white" }}>
                              <ListItemIcon sx={{ minWidth: 30, color: "#2196F3" }}>
                                •
                              </ListItemIcon>
                              Please add your complete property details carefully, including the full address and accurate location.
                            </ListItem>
                            <ListItem sx={{ px: 0, py: 0.5, color: "white" }}>
                              <ListItemIcon sx={{ minWidth: 30, color: "#2196F3" }}>
                                •
                              </ListItemIcon>
                              Make sure the map pin is placed correctly to match your property address.
                            </ListItem>
                            <ListItem sx={{ px: 0, py: 0.5, color: "white" }}>
                              <ListItemIcon sx={{ minWidth: 30, color: "#2196F3" }}>
                                •
                              </ListItemIcon>
                              If the entered address or location is incorrect, your property map and verification process may be cancelled.
                            </ListItem>
                          </List>
                        </Alert>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              </Grid>

              {/* All Submit */}
              <Zoom in={checked} timeout={2200}>
                <Box sx={{ textAlign: "center", mt: 5 }}>
                  {Is_Host_Varifeid ? (
                    <Button
                      type="submit"
                      variant="contained"
                      size={isMobile ? "medium" : "large"}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                        "&:hover": {
                          transform: "scale(1.05)",
                          transition: "transform 0.2s",
                          background: "linear-gradient(45deg, #1976D2 30%, #0D47A1 90%)",
                        },
                      }}
                    >
                      Submit Property
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size={isMobile ? "medium" : "large"}
                      disabled
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: "#555",
                      }}
                    >
                      Please Wait For Admin Action For Confirmation
                    </Button>
                  )}
                </Box>
              </Zoom>
            </Box>
          </Slide>
        ) : (
          <Fade in={checked} timeout={1000}>
            <Box>
              <Paper
                elevation={6}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  borderRadius: 4,
                  mt: 4,
                  background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid #444",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "rgba(33, 150, 243, 0.1)",
                  },
                }}
              >
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3, flexDirection: isMobile ? "column" : "row" }}>
                      <Avatar
                        src={hostImage}
                        sx={{
                          width: 100,
                          height: 150,
                          borderRadius: 3,
                          border: "3px solid #ff0077",
                          mr: isMobile ? 0 : 3,
                          mb: isMobile ? 2 : 0,
                        }}
                      />
                      <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
                        <Typography
                          variant={isMobile ? "h5" : "h4"}
                          sx={{
                            color: "white",
                            fontFamily: "cursive",
                            fontWeight: "bold",
                            mb: 1,
                          }}
                        >
                          {hostName || "Host"}
                        </Typography>
                        <Chip
                          label={hostEmail || "No email found"}
                          sx={{
                            bgcolor: "rgba(33, 150, 243, 0.2)",
                            color: "#2196F3",
                            fontWeight: "bold",
                          }}
                        />
                      </Box>
                    </Box>

                    <List sx={{ mb: 3 }}>
                      {[
                        "All records and documents are legally verified.",
                        "Your hosting profile is under review for quality standards.",
                        "Please ensure all property details and images are accurate.",
                        "Our team will notify you once your host account is approved.",
                      ].map((text, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 1 }}>
                          <ListItemIcon sx={{ color: "#2196F3", minWidth: 30 }}>
                            ✓
                          </ListItemIcon>
                          <Typography variant="body1" sx={{ color: "white" }}>{text}</Typography>
                        </ListItem>
                      ))}
                    </List>

                    <Alert
                      severity="warning"
                      sx={{
                        bgcolor: "rgba(255,165,0,0.1)",
                        color: "#ffa500",
                        border: "1px solid rgba(255,165,0,0.3)",
                        position: "relative",
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "2px",
                          background: "linear-gradient(90deg, transparent, #ffa500, transparent)",
                        },
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "2px",
                          background: "linear-gradient(90deg, transparent, #ffa500, transparent)",
                        },
                        "& .MuiAlert-icon": {
                          color: "#ffa500",
                        },
                      }}
                    >
                      If your record is invalid, you may update it up to two times. If you upload an invalid record twice, we will block your profile.
                    </Alert>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      component="img"
                      src="https://i.pinimg.com/originals/6a/95/5f/6a955fce006edf6db6814c8d689a303d.gif"
                      alt="Verification GIF"
                      sx={{
                        width: "100%",
                        maxWidth: 400,
                        height: "auto",
                        borderRadius: 3,
                        boxShadow: 6,
                        mx: "auto",
                        display: "block",
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Fade>
        )}
      </Container>

      {/* Toast container added here */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        theme="dark"
      />
    </HostLayout>
  );
};

export default HostAddProperty;