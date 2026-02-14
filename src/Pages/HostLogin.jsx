import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/hostLogin.css';
import { toast, ToastContainer } from 'react-toastify';

const HostLogin = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userEmail, setUseremail] = useState('');
  const [userPassword, setUserpassword] = useState('');
  const [location, setLocation] = useState({ lat: null, lon: null });

  // Get browser location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Location permission denied or unavailable");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);



  const handleLogin = async (e) => {
    e.preventDefault();

    if (location.lat === null || location.lon === null) {
        toast.error("Location not ready. Please allow location access.");
        return;
    }

    setIsLoading(true);

    const bodyData = {
        userEmail,
        userPassword,
        lat: location.lat,
        lon: location.lon,
        city: location.city,
        state: location.state,
        country: location.country
    };

    try {
        const response = await fetch('https://project-airbnb-84te.onrender.com/airbnb/host-login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });

        const data = await response.json();

        if (response.status === 200) {
            localStorage.setItem("HostEmail", userEmail);
            toast.success(data.message || "Login Successful!");
            setTimeout(() => {
                window.location.href = '/host-Manage-Profile';
            }, 2000);
        } else {
            toast.error(data.message || "Login Failed!");
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Server Error! Check console.");
    } finally {
        setIsLoading(false);
    }
};




  // Background image slider
  const backgroundImages = [
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="background-slider" style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}>
        {backgroundImages.map((image, index) => (
          <div key={index} className={`background-image ${index === currentImageIndex ? 'active' : ''}`} style={{ backgroundImage: `url(${image})` }} />
        ))}
      </div>

      <div className="background-overlay"></div>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Host Login</h2>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <div className="input-container">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={userEmail}
                  onChange={(e) => setUseremail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-container">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userPassword}
                  onChange={(e) => setUserpassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
                <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className={`login-button ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? (
                <div className="button-content">
                  <div className="button-loader"></div>
                  Signing In...
                </div>
              ) : (
                <div className="button-content">
                  <FaLock className="button-icon" />
                  Log In
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}             // Toast 3 seconds ke liye rahe
        hideProgressBar={false}      // Progress bar dikhaye
        newestOnTop={true}           // Naye toast upar
        closeOnClick                  // Click karne par close ho jaye
        rtl={false}                   // Right-to-left nahi
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          backgroundColor: '#1e293b', // dark blue background
          color: '#f1f5f9',           // light text color
          fontWeight: '600',
          fontSize: '16px',
          borderRadius: '12px',
          padding: '12px 20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        }}
      />

    </div>
  );
};

export default HostLogin;
