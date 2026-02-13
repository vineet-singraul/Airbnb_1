// import HostLayout from "./HostLayout"
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// const AddServices = () => {
  

//   const hostname = localStorage.getItem("HostEmail");
//   const [addServicesName , setAddServicesName] = useState('')
//   const [allowedAssess, setAllowedAssess] = useState(false)

//   const handleAddServicesName = async (e) => {
//     e.preventDefault();

//     if (!addServicesName) {
//       toast.error("Please select a property type!");
//       return;
//     }
 
//     const response = await fetch("http://127.0.0.1:8000/airbnb/host-Addservices/",{
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ addServicesName,hostname }),
//     })


//     if (response.status === 200) {
//        toast.success("Yas Servicees Added Successfully ..... "); 
//        setTimeout(() => {
//        }, 2000);
//     }
//     else{
//         toast.error(data.message)
//     }

//   }

//   const SwichAllowedCaseAdmin = async () => {
//     const api = "http://127.0.0.1:8000/airbnb/Admin-Alllow/";
//     const respon = await axios.get(api)
//     if (respon.data.muteAddProperty) {
//       setAllowedAssess(true)      
//     }
//   } 

//   useEffect(()=>{
//     SwichAllowedCaseAdmin()
//   },[])

//   return (
//    <HostLayout>
//       <section className="container-fluid py-5 bg-dark">
        
//         {allowedAssess ?

//         <div className="row align-items-center justify-content-center">
//           <div className="col-12 col-md-6 col-lg-5 mb-4">
//             <div className="card border-0 shadow-lg rounded-4">
//               <div className="card-body p-4 bg-dark">
//                 <h4 className="mb-4 text-center text-primary fw-bold"> Add Your Property</h4>
//                 <Form onSubmit={handleAddServicesName}>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="fw-semibold"> Select Property Type </Form.Label>
//                     <Form.Select className="bg-dark" aria-label="Select property type" value={addServicesName} onChange={(e)=>{setAddServicesName(e.target.value)}}>
//                       <option value="">Select property type</option>
//                       <option value="apartment">Apartment</option>
//                       <option value="house">House</option>
//                       <option value="Experience">Experience</option>
//                       <option value="Services">Services</option>
//                       <option value="villa">Villa</option>
//                       <option value="guesthouse">Guesthouse</option>
//                       <option value="farmstay">Farm Stay</option>
//                       <option value="cabin">Cabin</option>
//                       <option value="cottage">Cottage</option>
//                       <option value="bungalow">Bungalow</option>
//                       <option value="loft">Loft</option>
//                       <option value="studio">Studio</option>
//                       <option value="beach-house">Beach House</option>
//                       <option value="lake-house">Lake House</option>
//                       <option value="mountain-cabin">Mountain Cabin</option>
//                       <option value="treehouse">Treehouse</option>
//                       <option value="tiny-home">Tiny Home</option>
//                       <option value="camping-tent">Camping Tent</option>
//                       <option value="rv">RV / Campervan</option>
//                       <option value="castle">Castle</option>
//                       <option value="resort">Resort</option>
//                       <option value="hotel-room">Hotel Room</option>
//                       <option value="shared-room">Shared Room</option>
//                     </Form.Select>
//                   </Form.Group>

//                     <Form.Group className="mb-4" hidden>
//                         <input type="email" value={hostname}/>
//                     </Form.Group>

//                   <div className="d-flex justify-content-end gap-3 mt-3">
//                     <Button variant="secondary" type="reset"> Reset</Button>
//                     <Button variant="primary" type="submit">Submit</Button>
//                   </div>
//                 </Form>
//               </div>
//             </div>
//           </div>

//           <div className="col-12 col-md-6 col-lg-5 d-flex justify-content-center">
//             <img
//               src="/addservicesimage.png"
//               alt="Add Services"
//               className="img-fluid rounded-4 shadow"
//               style={{ maxWidth: "400px" }}
//             />
//           </div>
//         </div>

//          :

//         <div className="row align-items-center justify-content-center">
//           <div className="col-12 col-md-6 col-lg-5 mb-4">
//              <h1>{hostname} From Admin Side You Have Not Access To Add The Services</h1>
//           </div>

//           <div className="col-12 col-md-6 col-lg-5 d-flex justify-content-center">
//             <img
//               src="/addservicesimage.png"
//               alt="Add Services"
//               className="img-fluid rounded-4 shadow"
//               style={{ maxWidth: "400px" }}
//             />
//           </div>
//         </div>
//         }

//       </section>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
//     </HostLayout>
//   )
// }

// export default AddServices







import HostLayout from "./HostLayout"
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// MUI Components
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";

const AddServices = () => {
  const hostname = localStorage.getItem("HostEmail");
  const [addServicesName, setAddServicesName] = useState('')
  const [allowedAssess, setAllowedAssess] = useState(false)
  const navigate = useNavigate();

  const handleAddServicesName = async (e) => {
    e.preventDefault();

    if (!addServicesName) {
      toast.error("Please select a property type!");
      return;
    }

 
    const response = await fetch("http://127.0.0.1:8000/airbnb/host-Addservices/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addServicesName, hostname }),
    })

    if (response.status === 200) {
      toast.success("Yas Servicees Added Successfully .....");
      setTimeout(() => {
        navigate("/host-Add-Property");
      }, 2000); // 2 seconds delay
    } else {
      const data = await response.json();
      toast.error(data.message)
    }
  }

  const SwichAllowedCaseAdmin = async () => {
    const api = "http://127.0.0.1:8000/airbnb/Admin-Alllow/";
    const respon = await axios.get(api)
    if (respon.data.muteAddProperty) {
      setAllowedAssess(true)      
    }
  } 

  useEffect(() => {
    SwichAllowedCaseAdmin()
  }, [])

  return (
    <HostLayout>
      <Container 
        maxWidth={false} 
        disableGutters 
        sx={{ 
          py: 5, 
          bgcolor: 'background.default',
          minHeight: '100vh'
        }}
      >
        {allowedAssess ? (
          <Grid container justifyContent="center" alignItems="center" spacing={4}>
            <Grid item xs={12} md={6} lg={5}>
              <Card 
                elevation={10}
                sx={{
                  borderRadius: 4,
                  border: 'none',
                  overflow: 'hidden'
                }}
              >
                <CardContent sx={{ p: 4, bgcolor: 'background.default' }}>
                  <Typography 
                    variant="h5" 
                    align="center" 
                    sx={{ 
                      mb: 4, 
                      color: 'primary.main',
                      fontWeight: 'bold'
                    }}
                  >
                    Add Your Property
                  </Typography>
                  <Box component="form" onSubmit={handleAddServicesName}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel sx={{ color: 'text.primary' }}>
                        Select Property Type
                      </InputLabel>
                      <Select
                        value={addServicesName}
                        onChange={(e) => { setAddServicesName(e.target.value) }}
                        label="Select Property Type"
                        sx={{ bgcolor: 'background.default' }}
                      >
                        <MenuItem value="">Select property type</MenuItem>
                        <MenuItem value="apartment">Apartment</MenuItem>
                        <MenuItem value="house">House</MenuItem>
                        <MenuItem value="Experience">Experience</MenuItem>
                        <MenuItem value="Services">Services</MenuItem>
                        <MenuItem value="villa">Villa</MenuItem>
                        <MenuItem value="guesthouse">Guesthouse</MenuItem>
                        <MenuItem value="farmstay">Farm Stay</MenuItem>
                        <MenuItem value="cabin">Cabin</MenuItem>
                        <MenuItem value="cottage">Cottage</MenuItem>
                        <MenuItem value="bungalow">Bungalow</MenuItem>
                        <MenuItem value="loft">Loft</MenuItem>
                        <MenuItem value="studio">Studio</MenuItem>
                        <MenuItem value="beach-house">Beach House</MenuItem>
                        <MenuItem value="lake-house">Lake House</MenuItem>
                        <MenuItem value="mountain-cabin">Mountain Cabin</MenuItem>
                        <MenuItem value="treehouse">Treehouse</MenuItem>
                        <MenuItem value="tiny-home">Tiny Home</MenuItem>
                        <MenuItem value="camping-tent">Camping Tent</MenuItem>
                        <MenuItem value="rv">RV / Campervan</MenuItem>
                        <MenuItem value="castle">Castle</MenuItem>
                        <MenuItem value="resort">Resort</MenuItem>
                        <MenuItem value="hotel-room">Hotel Room</MenuItem>
                        <MenuItem value="shared-room">Shared Room</MenuItem>
                      </Select>
                      <FormHelperText>Choose the type of property you want to add</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 4, display: 'none' }}>
                      <TextField 
                        type="email" 
                        value={hostname}
                        sx={{ display: 'none' }}
                      />
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 3 }}>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        type="reset"
                      >
                        Reset
                      </Button>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={5} container justifyContent="center">
              <Box
                component="img"
                src="/addservicesimage.png"
                alt="Add Services"
                sx={{
                  maxWidth: 400,
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container justifyContent="center" alignItems="center" spacing={4}>
            <Grid item xs={12} md={6} lg={5}>
              <Typography variant="h4" align="center">
                {hostname} From Admin Side You Have Not Access To Add The Services
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={5} container justifyContent="center">
              <Box
                component="img"
                src="/addservicesimage.png"
                alt="Add Services"
                sx={{
                  maxWidth: 400,
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        )}
      </Container>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored"
      />
    </HostLayout>
  )
}

export default AddServices