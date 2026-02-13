import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../styles/UserCss/UserLogin.css';
import '../../styles/comman.css'
import { SiAmazonsimpleemailservice } from "react-icons/si";
import { CiUser, CiFileOn } from "react-icons/ci";
import { PiCityThin, PiPhoneCallThin, PiAddressBookThin, PiPasswordThin } from "react-icons/pi";
import { toast, ToastContainer } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

import axios from 'axios';

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const HostLogin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 🔥 IMPORTANT → Switch ke liye controlled state
  const [asUser, setAsUser] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
    image: null,
    address: "",
    password: "",
    as_user: false,
  });

  // Background Images
  const backgroundImages = [
    "../../public/s1.jpg",
    "../../public/s2.jpg",
    "../../public/s3.jpg",
    "../../public/s4.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Password show toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle All Inputs
  const handleInput = (e) => {
    const { name, type, value, checked, files } = e.target;

    const finalValue =
      type === "checkbox" ? checked :
      type === "file" ? files[0] :
      value;

    setInput((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    if (name === "as_user") {
      setAsUser(checked);  
    }
  };

  // Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.firstName.trim()) return toast.error("Please enter first name");
    if (!/^[A-Za-z ]+$/.test(input.firstName.trim())) return toast.error("Invalid first name");

    if (!input.lastName.trim()) return toast.error("Please enter last name");
    if (!/^[A-Za-z ]+$/.test(input.lastName.trim())) return toast.error("Invalid last name");

    if (!input.email.trim()) return toast.error("Please enter email");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.email)) return toast.error("Invalid email format");

    if (!input.city.trim()) return toast.error("Please enter city");

    if (!input.phone || input.phone.length < 10) return toast.error("Phone must be 10 digits");

    if (!input.image) return toast.error("Please upload profile image");

    if (!input.address.trim()) return toast.error("Please enter address");

    if (!asUser) return toast.error("Please select 'Signup as User'");

    if (!input.password.trim() || input.password.length < 6)
      return toast.error("Password must be 6+ characters");


    
  const formData = new FormData();
  formData.append("firstName", input.firstName);
  formData.append("lastName", input.lastName);
  formData.append("email", input.email);
  formData.append("city", input.city);
  formData.append("phone", input.phone);
  formData.append("address", input.address);
  formData.append("password", input.password);
  formData.append("as_user", asUser);
  formData.append("profile_image", input.image);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/airbnb/User-Registration/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    localStorage.setItem('userActualID',response.data.user_id)
    localStorage.setItem('userName',input.firstName)

    toast.success("User registered successfully!");
    setInput({
          firstName: "",
          lastName: "",
          email: "",
          city: "",
          phone: "",
          image: null,
          address: "",
          password: false,
          as_user: false,
    })
    // location.href="http://127.0.0.1:8000/airbnb/User-Login/"
    setTimeout(()=>{
        navigate('/User-Login')
    },2000)
  } catch (error) {
    console.error(error.response.data);
    toast.error(error.response.data.message || "Signup failed!");
  }

   
     
  }; 

  return (
    <div className="login-container">
      <div
        className="background-slider"
        style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
      >
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`background-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      <div className="background-overlay"></div>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">User Signup</h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form" id="formDiv">

            <div className="left">

              <div className="form-group">
                <div className="input-container">
                  <CiUser className="input-icon" />
                  <input type="text" name="firstName" onChange={handleInput} className="form-input" placeholder="first name" />
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <CiUser className="input-icon" />
                  <input type="text" name="lastName" onChange={handleInput} className="form-input" placeholder="last name" />
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <SiAmazonsimpleemailservice className="input-icon" />
                  <input type="email" name="email" onChange={handleInput} className="form-input" placeholder="enter email" />
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <PiCityThin className="input-icon" />
                  <input type="text" name="city" onChange={handleInput} className="form-input" placeholder="Enter city" />
                </div>
              </div>

              {/* 🔥 SWITCH FIXED */}
              <div className="form-group checkbox-group">
                <PinkSwitch
                  {...label}
                  checked={asUser}
                  onChange={handleInput}
                  name="as_user"
                  id="as_user"
                />
                <label htmlFor="as_user" className="checkbox-label" style={{ fontSize: '12px' }}>
                  Sign up as User
                </label>
              </div>

            </div>

            <div className="right">

              <div className="form-group">
                <div className="input-container">
                  <PiPhoneCallThin className="input-icon" />
                  <input type="number" name="phone" onChange={handleInput} className="form-input" placeholder="phone" />
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <CiFileOn className="input-icon" />
                  <input type="file" name="image" onChange={handleInput} className="form-input"/>
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <PiAddressBookThin className="input-icon" />
                  <input type="text" name="address" onChange={handleInput} className="form-input" placeholder="full address" />
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <PiPasswordThin className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleInput}
                    className="form-input"
                    placeholder="password"
                  />
                  <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-button">
                <div className="button-content">
                  <FaLock className="button-icon" />
                  Sign up
                </div>
              </button>

            </div>

          </form>
        </div>
      </div>
      <ToastContainer position="top-left" autoClose={1000} theme="colored" />
    </div>
  );
};

export default HostLogin;
