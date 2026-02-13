import HostLayout from "./HostLayout";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const HostAddPropertyImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("");
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(""); 
  const hostEmail = localStorage.getItem('HostEmail')

// ⚠️⚠️✅✅ --- >> Host IMAGE ADD KRNE KI ACCESS DE RAHA HAI ✅✅⚠️⚠️// 
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};
// ⚠️⚠️✅✅ ------------------------------------------------⚠️⚠️✅✅ //



// ⚠️⚠️✅✅ --- >> Host IMAGE CATEGORY SELECT KARNE KI ACCESS DE RAHA HAI ✅✅⚠️⚠️// 
const handleCategoryChange = (e) => {
 setCategory(e.target.value);
};
// ⚠️⚠️✅✅ ------------------------------------------------⚠️⚠️✅✅ //




// ⚠️⚠️✅✅ --- >> Select ki hui PROPERTY ko state me save kar raha hai ✅✅⚠️⚠️// 
const handlePropertyChange = (e) => {
 setSelectedProperty(e.target.value);
};
// ⚠️⚠️✅✅ ------------------------------------------------⚠️⚠️✅✅ //




// ⚠️⚠️✅✅ --- >> Form submit hone par selected values console me show kar raha hai ✅✅⚠️⚠️// 
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedFile || !selectedProperty) {
    toast.error("Please select both property and image!");
    return;
  }

  const formData = new FormData();
  formData.append("hostEmail", hostEmail);
  formData.append("selectedProperty", selectedProperty);
  formData.append("selectedFile", selectedFile);

  try {
    const response = await fetch("http://127.0.0.1:8000/airbnb/host-Add-Property-Image/", {
      method: "POST",
      body: formData, 
    });

    const data = await response.json();
    toast.success("✅ Image uploaded successfully!");

  } catch (error) {
    toast.error("❌ Failed to upload image!");
  }
};
// ⚠️⚠️✅✅ ------------------------------------------------⚠️⚠️✅✅ //




// ⚠️⚠️✅✅ --- >> Backend se host ki properties fetch kar raha hai aur state me save kar raha hai ✅✅⚠️⚠️// 
const GettingAllPropertyDetails = async () => {
    if (!navigator.onLine) {
        toast.error("❌ No internet connection");
        return;
    }
   
    try {
        const response = await fetch(`http://127.0.0.1:8000/airbnb/host-Get-Property-Details/?email=${hostEmail}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        // ✅ Save fetched properties
        setProperties(data);
    } catch (error) {
        console.error("Error fetching property data:", error);
        toast.error("❌ Failed to fetch property data");
    }
};  
// ⚠️⚠️✅✅ ------------------------------------------------⚠️⚠️✅✅ //





// ⚠️⚠️✅✅ --- >> Component mount hone par properties fetch karne ke liye useEffect ✅✅⚠️⚠️// 
  useEffect(()=>{
    GettingAllPropertyDetails()
  },[])
// ⚠️⚠️✅✅ ------------------------------------------------⚠️⚠️✅✅ //




  return (
    <HostLayout>
      <h1 className="row align-items-center justify-content-center" style={{border:'1px solid red',borderRadius:'10px',padding:'10px',width:'90%',margin:"0px 0px 0px 52px"}}>Host Add Property Image</h1>      
      <section className="image-upload-section container-fluid" style={{background:'#121212',height:'70vh',border:'1px solid #fff',borderRadius:'10px',margin:'10px',color:'#fff'}}>
        <div className="row justify-content-center align-items-center">
          
          {/* Left: Form */}
          <div className="col-md-5 upload-form">

            {/* ⚠️⚠️✅✅ --- >> Property select dropdown ✅✅⚠️⚠️// */}
            <div className="form-group mb-4">
              <label htmlFor="propertySelect" className="form-label fw-bold">
                Select Property
              </label>
              <select id="propertySelect" className="form-select custom-select bg-dark" value={selectedProperty} onChange={handlePropertyChange} required>
                <option value="">-- Choose Property --</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                   {property.name} {property.title ? `- ${property.title}` : ""} ({property.city})
                  </option>
                ))}
              </select>
            </div>
            {/* ⚠️⚠️✅✅ ------------------------------------------------⚠️⚠️✅✅ //*/}



            {/* ⚠️⚠️✅✅ --- >> Image upload input ✅✅⚠️⚠️// */}
            <div className="form-group mb-4">
              <label htmlFor="propertyImage" className="form-label fw-bold">
                Upload Property Image
              </label>
              <input type="file" id="propertyImage"accept="image/*" className="form-control custom-file-input bg-dark"onChange={handleFileChange} required/>
            </div>
            {/* ⚠️⚠️✅✅ ------------------------------------------------⚠️⚠️✅✅ //*/}




            {/* ⚠️⚠️✅✅ --- >> Submit button ✅✅⚠️⚠️// */}
            <button
              onClick={handleSubmit}
              className="btn btn-primary w-100 fw-bold"
              style={{background:'#ff007f',border:'none',borderRadius:'8px',padding:'10px'}}
            >
              Upload & Check Data
            </button>
            {/* ⚠️⚠️✅✅ ------------------------------------------------⚠️⚠️✅✅ //*/}
          </div>


          {/* Right: Preview */}
          <div className="col-md-5 text-center preview-section">
            {/* ⚠️⚠️✅✅ --- >> Selected image preview show kar raha hai ✅✅⚠️⚠️// */}
            {selectedFile ? (
              <>
                <p className="preview-text mt-3">Preview:</p>
                <img style={{width:'300px',height:'350px',borderRadius:'10px',border:'2px solid #ff007f',objectFit:'cover'}}src={URL.createObjectURL(selectedFile)} alt="Preview"className="preview-image"/>
              </>
            ) : (
              <p className="placeholder-text mt-5">No image selected</p>
            )}
            {/* ⚠️⚠️✅✅ ------------------------------------------------⚠️⚠️✅✅ //*/}
          </div>
        </div>
      </section>
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
    </HostLayout>
  );
};

export default HostAddPropertyImage;
