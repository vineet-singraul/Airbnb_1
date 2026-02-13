import {Container,Row,Col,Form,Button,Card,Modal,} from "react-bootstrap";
import {FaHome,FaMapMarkerAlt,FaRegBuilding,FaGlobe,FaRegAddressCard,FaUser,} from "react-icons/fa";

import HostLayout from "./HostLayout";
import "../../styles/HostServicesManage.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const HostProfileManaged = () => {
  const [inputVal, setInputVal] = useState({});
  const hostName = localStorage.getItem("HostEmail");
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [marker, setMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [Is_Host_Varifeid, setIs_Host_Varifeid] = useState(false);
  const navigate = useNavigate();


  // Load Google Maps API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });


 // 💡💡✅✅✅ YE POST REQ KA DATA VALIDATE KARE RAHA HAI ✅✅✅✅ 💡💡//
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
            setMarker({ lat: latitude, lng: longitude });
            setAddress(`Lat: ${latitude}, Lng: ${longitude}`);
          },
          (error) => {
            console.error("Error getting location: ", error);
            toast.error("Unable to get your current location!");
          }
        );
      } else {
        toast.error("Geolocation is not supported by your browser!");
      }
    }, []);

    const handleInput = (e) => {
      const { name, value } = e.target;
      setInputVal((values) => ({ ...values, [name]: value }));
    };
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅





//💡💡 ✅✅✅✅ Ye Check Karega Ki Status Verified Hi Ki Nhi ✅✅✅💡💡//
  const hostEmail = localStorage.getItem("HostEmail");
    if (!hostEmail) {
        toast.error("⚠️ Host email not found in localStorage");
        return;
    }

    const IsHostVarifedCheck = async () => {
          if (!navigator.onLine) {
            toast.error("❌ No internet connection");
            return;
          }

      try 
        {
          const response = await fetch(
            `http://127.0.0.1:8000/airbnb/host-Manage-Profile/?email=${hostEmail}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });

          // ✅ Convert to JSON
          const data = await response.json();

              // ✅ Handle based on response
          if (response.status === 200 && data.length > 0) {
            const verified = data[0].verified_status;

            if (verified === true) {
              setIs_Host_Varifeid(true);
            } else {
              setIs_Host_Varifeid(false);
            }
          } 
          else if (response.status === 401) {
            setIs_Host_Varifeid(false);
          } 
          else {
            setIs_Host_Varifeid(false);
          }

        } 
      catch (error) 
        {
            return
        }
  };

  useEffect(() => {
    IsHostVarifedCheck();
  }, []);

// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅



//💡💡 ✅✅✅✅ Ye Host Ki Form Details Verifeid Karega ✅✅✅💡💡//
  const handleSubmitForm = async (e) => {
      e.preventDefault();
      if (!inputVal.bio || inputVal.bio.trim() === "") {
        toast.error("Please enter your Bio!");
        return
      } else if (inputVal.bio.trim().split(/\s+/).length < 20) {
        toast.error("Your Bio must be at least 20 words!");
        return
      } else if (!inputVal.documentName || inputVal.documentName === "") {
        toast.error("Please select a document type!");
        return
      } else if (
        !inputVal.documentNumber ||
        inputVal.documentNumber.trim() === ""
      ) {
        toast.error("Please enter your document number!");
        return
      } else if (inputVal.documentName) {
        const docNum = inputVal.documentNumber.trim().toUpperCase();

        if (inputVal.documentName === "aadhaar" && !/^\d{12}$/.test(docNum)) {
          toast.error("Aadhaar number must be exactly 12 digits!");
          return
        } else if (
          inputVal.documentName === "pan" &&
          !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(docNum)
        ) {
          toast.error("PAN number must be in correct format (ABCDE1234F)!");
          return
        } else if (
          inputVal.documentName === "passport" &&
          !/^[A-Z0-9]{6,9}$/.test(docNum)
        ) {
          toast.error("Passport number must be 6-9 characters!");
          return
        } else if (
          inputVal.documentName === "driving_license" &&
          !/^([A-Z]{2}[0-9]{2}[0-9A-Z]{11})$/.test(docNum)
        ) {
          toast.error("Driving License number must be valid format!");
          return
        } else if (
          inputVal.documentName !== "aadhaar" &&
          inputVal.documentName !== "pan" &&
          inputVal.documentName !== "passport" &&
          inputVal.documentName !== "driving_license"
        ) {
          toast.error("Invalid document type selected!");
          return
        } else if (
          (inputVal.documentName === "aadhaar" && !/^\d{12}$/.test(docNum)) ||
          (inputVal.documentName === "pan" &&
            !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(docNum)) ||
          (inputVal.documentName === "passport" &&
            !/^[A-Z0-9]{6,9}$/.test(docNum)) ||
          (inputVal.documentName === "driving_license" &&
            !/^([A-Z]{2}[0-9]{2}[0-9A-Z]{11})$/.test(docNum))
        ) {
          return;
        } else if (!inputVal.city || inputVal.city.trim() === "") {
          toast.error("Please enter your city!");
          return
        } else if (!inputVal.country || inputVal.country.trim() === "") {
          toast.error("Please enter your country!");
          return
        } else if (!inputVal.kycDocuments) {
          toast.error("Please upload your KYC documents!");
          return
        } 
      }
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅






    //💡💡💡✅✅ {HOST PROFILE} Data Post METHOD KE THROUGH SAVE HO Raha hai ✅✅✅✅✅✅✅✅ //
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/airbnb/host-Manage-Profile/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputVal, hostName, address }),
          }
        );

        const data = await res.json();
      if (res.ok) {
        toast.success("✅ Profile saved successfully");

        setTimeout(() => {
          navigate("/host-Addservices");
        }, 2000);
      }
      else {
          toast.error("❌ Failed to save profile");
        }
      } catch (err) {
        toast.error("Server error while saving profile");
      }
    // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅//
  };

   if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <HostLayout>
      <Container className="my-5">
          <h2 className="text-center mb-5 fw-bold" id="MainHeadding">
            Manage Host Profile
          </h2>

          <Form>
          <Row xs={1} md={2} className="g-4 MainContainer">
            <Col>
              <Card className="p-4 h-100 shadow-sm" id="FormContainer">
                <h5 className="formHeadding mb-3">
                  <FaHome className="me-2" id="icons" /> Basic Details
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2 LabelIcon" /> Bio
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write something about yourself..."
                    id="inputCss"
                    onChange={handleInput}
                    name="bio"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaRegAddressCard className="me-2 LabelIcon" /> Government
                    ID Type
                  </Form.Label>
                  <Form.Select
                    id="inputCss"
                    onChange={handleInput}
                    name="documentName"
                  >
                    <option value="">-- Select ID Type --</option>
                    <option value="aadhaar">Aadhaar Card</option>
                    <option value="passport">Passport</option>
                    <option value="driving_license">Driving License</option>
                    <option value="pan">PAN Card</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2 LabelIcon" /> Document Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your document number"
                    id="inputCss"
                    onChange={handleInput}
                    name="documentNumber"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaGlobe className="me-2 LabelIcon" /> Upload ID Image
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="inputCss"
                    onChange={handleInput}
                    name="IdCard"
                  />
                </Form.Group>
              </Card>
            </Col>

            <Col>
              <Card className="p-4 shadow-sm h-100" id="FormContainer">
                <h5 className="formHeadding mb-3">
                  <FaMapMarkerAlt className="me-2" id="icons" /> Location
                  Details
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaMapMarkerAlt className="me-2 LabelIcon" /> Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Click to select your location"
                    id="inputCss"
                    value={address}
                    onClick={() => setShowMap(true)}
                    readOnly
                    name="address"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaRegBuilding className="me-2 LabelIcon" /> City
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your city"
                    id="inputCss"
                    onChange={handleInput}
                    name="city"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaGlobe className="me-2 LabelIcon" /> Country
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    id="inputCss"
                    onChange={handleInput}
                    name="country"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaGlobe className="me-2 LabelIcon" /> Upload Property KYC
                    details
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="inputCss"
                    onChange={handleInput}
                    name="kycDocuments"
                  />
                </Form.Group>
              </Card>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <Button
              variant="primary"
              size="lg"
              id="submitBtn"
              onClick={handleSubmitForm}
            >
              Save Profile
            </Button>
          </div>

          {/* Map Modal */}
          <Modal show={showMap} onHide={() => setShowMap(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Select Your Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <GoogleMap
                zoom={15}
                center={
                  marker || currentLocation || { lat: 28.6139, lng: 77.209 }
                }
                mapContainerStyle={{ height: "400px", width: "100%" }}
                onClick={(e) => {
                  const lat = e.latLng.lat();
                  const lng = e.latLng.lng();
                  setMarker({ lat, lng });
                  setAddress(`Lat: ${lat}, Lng: ${lng}`);
                  setShowMap(false);
                  value = {};
                }}
              >
                {marker && <Marker position={marker} />}
              </GoogleMap>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowMap(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          </Form>

      </Container>
      <ToastContainer position="top-right" autoClose={3000} />
    </HostLayout>
  );
};

export default HostProfileManaged;
