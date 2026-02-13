import { useEffect, useState } from "react";
import HostLayout from "./HostLayout";

const Test = () => {
  const [properties, setProperties] = useState([]);
  const hostEmail = localStorage.getItem("HostEmail");

  const loadProperties = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/airbnb/host-property-details-with-images/?email=${hostEmail}`
      );
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  useEffect(() => {
    if (hostEmail) loadProperties();
  }, [hostEmail]);

  return (
    <HostLayout>
      <div
        style={{
          padding: "40px",
          backgroundColor: "#000000ff",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Host Properties with Details & Images
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "25px",
          }}
        >
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property.id}
                style={{
                  backgroundColor: "#000000ff",
                  borderRadius: "15px",
                  boxShadow: "0 4px 10px rgba(0, 26, 157, 1)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                  border:'1px solid #33009aff'
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {/* Property Images */}
                <div
                  style={{
                    display: "flex",
                    overflowX: "auto",
                    gap: "8px",
                    padding: "10px",
                  }}
                >
                  {property.images.length > 0 ? (
                    property.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={property.title}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    ))
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#aaa",
                        fontStyle: "italic",
                      }}
                    >
                      No images
                    </p>
                  )}
                </div>

                {/* Property Details */}
                <div style={{ padding: "15px" }}>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#2c3e50",
                    }}
                  >
                    {property.title}
                  </h2>
                  <p style={{ color: "#7f8c8d", fontSize: "14px" }}>
                    {property.description.slice(0, 100)}...
                  </p>
                  <p style={{ marginTop: "10px" }}>
                    <strong>Location:</strong> {property.city},{" "}
                    {property.country}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{property.price_per_night} / night
                  </p>
                  <p>
                    <strong>Bedrooms:</strong> {property.bedrooms} |{" "}
                    <strong>Bathrooms:</strong> {property.bathrooms}
                  </p>
                  <p>
                    <strong>Guests Allowed:</strong> {property.guests_allowed}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "#7f8c8d",
                fontSize: "16px",
              }}
            >
              No properties found for this host.
            </p>
          )}
        </div>
      </div>
    </HostLayout>
  );
};

export default Test;
