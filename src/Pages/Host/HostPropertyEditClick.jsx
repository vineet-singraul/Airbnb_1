import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaHome, FaMapMarkerAlt, FaMoneyBillWave, FaBed } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/comman.css"

const HostPropertyEditClick = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "", description: "", category: "", location: "",
    city: "", country: "", pincode: "", price_per_night: "",
    available_from: "", available_to: "", guests_allowed: 1,
    bedrooms: 1, bathrooms: 1, beds: 1,
    wifi: false, pools: false, gym: false, pickupFacility: false,
    smoking: false, food: false, parking: false, securityCam: false,
    tv: false, Ac: false, filterWater: false, StayLongAllow: false,
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/airbnb/host-Edit-BTN-Property-All/${id}/`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            title: data.title || "", description: data.description || "",
            category: data.category || "", location: data.location || "",
            city: data.city || "", country: data.country || "",
            pincode: data.pincode || "", price_per_night: data.price_per_night || "",
            available_from: data.available_from || "", available_to: data.available_to || "",
            guests_allowed: data.guests_allowed || 1, bedrooms: data.bedrooms || 1,
            bathrooms: data.bathrooms || 1, beds: data.beds || 1,
            wifi: data.wifi || false, pools: data.pools || false, gym: data.gym || false,
            pickupFacility: data.pickupFacility || false, smoking: data.smoking || false,
            food: data.food || false, parking: data.parking || false, securityCam: data.securityCam || false,
            tv: data.tv || false, Ac: data.Ac || false, filterWater: data.filterWater || false, StayLongAllow: data.StayLongAllow || false,
          });
          toast.success("✅ Property details loaded!");
        } else {
          toast.error("⚠️ Failed to load property details!");
        }
      } catch (err) {
        toast.error("❌ Error fetching property details!");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit Updated Property
  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("⏳ Updating property...");
    try {
      const res = await fetch(`http://127.0.0.1:8000/airbnb/host-Edit-BTN-Property-All/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      toast.update(toastId, { render: "✅ Property updated successfully!", type: "success", isLoading: false, autoClose: 2000 });
      setTimeout(() => {
        window.location.href = "http://localhost:3000/host-Manage-Property-All";
      }, 3000);
     
    } catch (err) {
      toast.update(toastId, { render: "❌ Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
    }
  };

  if (loading) return <h4 className="text-center mt-5">Loading property details...</h4>;

  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold mb-4">Edit Property</h2>

      <Form onSubmit={handleSubmit}>
        <Row xs={1} md={2} className="g-4">

          {/* Basic Info */}
          <Col>
            <Card className="p-3 bg-dark">
              <h5><FaHome className="me-2" />Basic Details</h5>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} className="inp"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" value={formData.category} onChange={handleInputChange} className="inp"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} className="inp"/>
              </Form.Group>
            </Card>
          </Col>

          {/* Location */}
          <Col>
            <Card className="p-3 bg-dark">
              <h5><FaMapMarkerAlt className="me-2" />Location</h5>
              {["location", "city", "country", "pincode"].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control type={field === "pincode" ? "number" : "text"}name={field} value={formData[field]} onChange={handleInputChange} className="inp"/>
                </Form.Group>
              ))}
            </Card>
          </Col>

          {/* Pricing */}
          <Col>
            <Card className="p-3 bg-dark">
              <h5><FaMoneyBillWave className="me-2" />Pricing</h5>
              <Form.Group className="mb-3">
                <Form.Label>Price/Night</Form.Label>
                <Form.Control type="number" name="price_per_night" value={formData.price_per_night} onChange={handleInputChange} className="inp"/>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>From</Form.Label>
                    <Form.Control type="date" name="available_from" value={formData.available_from} onChange={handleInputChange} className="inp"/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>To</Form.Label>
                    <Form.Control type="date" name="available_to" value={formData.available_to} onChange={handleInputChange} className="inp"/>
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Rooms */}
          <Col>
            <Card className="p-3 bg-dark">
              <h5><FaBed className="me-2" />Room Info</h5>
              <Row>
                {["guests_allowed", "bedrooms", "bathrooms", "beds"].map((f) => (
                  <Col xs={6} key={f}>
                    <Form.Group className="mb-3">
                      <Form.Label>{f.replace("_", " ").toUpperCase()}</Form.Label>
                      <Form.Control type="number" name={f} value={formData[f]} onChange={handleInputChange} className="inp"/>
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Facilities */}
        <Card className="p-3 mt-4 bg-dark">
          <h5>Facilities</h5>
          <Row>
            {["wifi","pools","gym","pickupFacility","smoking","food","parking","securityCam","tv","Ac","filterWater","StayLongAllow"].map((f) => (
              <Col xs={6} md={4} key={f}>
                <Form.Check  type="checkbox" label={f} name={f}checked={formData[f]}onChange={handleInputChange} />
              </Col>
            ))}
          </Row>
        </Card>

        <div className="text-center mt-4">
          <Button type="submit" variant="primary" size="lg">Update Property</Button>
        </div>
      </Form>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar theme="colored" />
    </Container>
  );
};

export default HostPropertyEditClick;
