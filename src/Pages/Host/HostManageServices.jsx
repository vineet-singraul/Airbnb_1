import { Container, Row, Col, Table, Button, Badge } from "react-bootstrap";
import { FaDatabase, FaEdit, FaTrash, FaHotel, FaSearch, FaFileCsv } from "react-icons/fa";
import HostLayout from "./HostLayout";
import "../../styles/HostServicesManage.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv"

const HostManageServices = () => {
  const [allRagisterServices, setAllRagisterServices] = useState([]);  // Ye Data Jo A Raha HAI DB
  const [allSearchServices, setAllSearchServices] = useState([]);  // Ye Data Jo Serch Ke Baad Update Ho Raha HAI DB
  const hostname = localStorage.getItem("HostEmail");  // Local Storage se host Email Le Rahe hai
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/airbnb/host-ManageServices/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostname }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setAllRagisterServices(data);
        setAllSearchServices(data)
      } else {
        toast.error("Server error ...");
      }
    } catch (error) {
      toast.error("Network error ...");
    }
  };

  const handleInpSearch = (serch) => {
    const searched = serch.toLowerCase();
    if (!searched) {
      setAllRagisterServices(allSearchServices)
    }
    else
      {
        const keyword = allSearchServices.filter((service) =>
          service.services_name.toLowerCase().includes(searched)
        );
        setAllRagisterServices(keyword);
      }

  };


  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <HostLayout>
      <Container fluid="md" className="py-4">
        {/* Header Section */}
        <Row className="align-items-center mb-4">
          <Col xs={12} md={8} className="d-flex align-items-center">
            <FaHotel className="text-primary fs-3 me-2" />
            <h3 className="text-white mb-0 fw-bold">All Registered Category</h3>
          </Col>
          <Col xs={12} md={4} className="text-md-end text-center mt-3 mt-md-0">
            <FaDatabase className="fs-4 me-2" style={{ color: "#5f00f7ff" }} />
            <span className="text-white fw-semibold fs-5">Total Categories </span>
            <Badge bg="success" pill>{allRagisterServices.length}</Badge>
          </Col>
        </Row>

        {/* Search Section */}
        <Row className="mb-4">
          <div id="SearchDiv">
            <FaFileCsv className="text-primary fs-3 me-2"/>
            <CSVLink className="btn" filename="Host_Register_Services.csv" data={allRagisterServices} id="InputBox">Export All Data In CSV File</CSVLink>
          </div>
        </Row>


        {/* Search Section */}
        <Row className="mb-4">
          <div id="SearchDiv">
            <input type="text" placeholder="Search by category name..." className="shadow-sm" onChange={(e)=>{handleInpSearch(e.target.value)}} id="InputBox" />
            <FaSearch className="text-primary fs-3 me-2" />
          </div>
        </Row>

        {/* Table Section */}
        <Row>
          <Col>
            <div className="table-responsive">
              <Table className="table align-middle text-center shadow-sm">
                <thead className="table-dark bg-dark">
                  <tr className="bg-dark">
                    <th id="mobile">S.No</th>
                    <th id="mobile">Category</th>
                    <th id="mobile">Date</th>
                    <th id="mobile">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allRagisterServices.map((service, index) => (
                    <tr key={service.id} className="bg-dark">
                      <td id="TableData">{index + 1}</td>
                      <td id="TableData">{service.services_name}</td>
                      <td id="TableData">{new Date(service.reg_date).toLocaleDateString()}</td>
                      <td id="TableData">
                        <Button size="sm" className="btns edt me-2 m-1">
                          <FaEdit className="me-1" style={{ color: "#15ff00ff" }} />
                        </Button>
                        <Button size="sm" className="btns del me-1">
                          <FaTrash className="me-1" style={{ color: "#ff0000ff" }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {allRagisterServices.length === 0 && (
                    <tr>
                      <td colSpan={4}>No services registered.</td>
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

export default HostManageServices;
