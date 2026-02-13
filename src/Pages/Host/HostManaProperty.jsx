import { Container, Row, Col, Table, Button, Badge } from "react-bootstrap";
import { FaDatabase, FaEdit, FaTrash, FaHotel, FaSearch, FaFileCsv } from "react-icons/fa";
import HostLayout from "./HostLayout";
import "../../styles/HostServicesManage.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';

const HostManaProperty = () => {
  const [registeredServices, setRegisteredServices] = useState([]); // Data from DB
  const [backupServices, setBackupServices] = useState([]); // Backup data for search
  const hostEmail = localStorage.getItem("HostEmail"); // Host email from localStorage

  // ✅ Fetch all services for this host
  const fetchAllServices = async () => {
    if (!hostEmail) {
      toast.error("Host email not found in local storage.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/airbnb/host-Manage-Property-All/?email=${hostEmail}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRegisteredServices(data);
        setBackupServices(data);
      } else {
        toast.error("Server error while fetching data.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Network error — could not connect to server.");
    }
  };

  // ✅ Search by service name
  const handleSearch = (searchText) => {
    const query = searchText.trim().toLowerCase();

    if (query === "") {
      setRegisteredServices(backupServices);
    } else {
      const filtered = backupServices.filter((service) =>
        service.services_name.toLowerCase().includes(query)
      );
      setRegisteredServices(filtered);
    }
  };

  // ✅ Fetch data on mount
  useEffect(() => {
    fetchAllServices();
  }, []);

  return (
    <HostLayout>
      <Container fluid="md" className="py-4">
        {/* === Header Section === */}
        <Row className="align-items-center mb-4">
          <Col xs={12} md={8} className="d-flex align-items-center">
            <FaHotel className="text-primary fs-3 me-2" />
            <h3 className="text-white mb-0 fw-bold">All Registered Categories</h3>
          </Col>
          <Col xs={12} md={4} className="text-md-end text-center mt-3 mt-md-0">
            <FaDatabase className="fs-4 me-2" style={{ color: "#5f00f7ff" }} />
            <span className="text-white fw-semibold fs-5">Total Categories </span>
            <Badge bg="success" pill>
              {registeredServices.length}
            </Badge>
          </Col>
        </Row>

        {/* === Export Section === */}
        <Row className="mb-4">
          <div id="SearchDiv">
            <FaFileCsv className="text-primary fs-3 me-2" />
            <CSVLink
              className="btn"
              filename="Host_Registered_Services.csv"
              data={registeredServices}
              id="InputBox"
            >
              Export All Data (CSV)
            </CSVLink>
          </div>
        </Row>

        {/* === Search Section === */}
        <Row className="mb-4">
          <div id="SearchDiv">
            <input
              type="text"
              placeholder="Search by category name..."
              className="shadow-sm"
              onChange={(e) => handleSearch(e.target.value)}
              id="InputBox"
            />
            <FaSearch className="text-primary fs-3 me-2" />
          </div>
        </Row>

        {/* === Table Section === */}
        <Row>
          <Col>
            <div className="table-responsive">
              <Table className="table align-middle text-center shadow-sm">
                <thead style={{background:'#1d91efb5'}}>
                  <tr style={{background:'#0900b7b5'}}>
                    <th style={{background:'#0900b7b5'}}>S.No</th>
                    <th style={{background:'#0900b7b5'}}> Image</th>
                    <th style={{background:'#0900b7b5'}}>Category</th>
                    <th style={{background:'#0900b7b5'}}>Date</th>
                    <th style={{background:'#0900b7b5'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredServices.length > 0 ? (
                    registeredServices.map((service, index) => (
                      <tr key={service.id || index} className="bg-dark">
                        <td className="bg-dark">{index + 1}</td>
                        <td className="bg-dark">
                            {service.images && service.images.length > 0 ? (
                            <img src={service.images[0]} alt={service.title}
                            style={{ width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' }}/> ) : (<span>No Image</span>)}
                        </td>

                        <td className="bg-dark">{service.title}</td>
                        <td className="bg-dark">
                          {service.reg_date
                            ? new Date(service.reg_date).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="bg-dark">
                          <Link   to={`/host-Edit-BTN-Property-All/${service.id}`} target="_blank"   size="sm" className="me-2 m-1" style={{ width:'10px', height:'20px'}}>
                            <FaEdit style={{ color: "#15ff00ff"}} />
                          </Link>
                          <Link size="sm" className="me-1">
                            <FaTrash style={{ color: "#ff0000ff" }} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-muted">
                        No registered categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </HostLayout>
  );
};

export default HostManaProperty;
