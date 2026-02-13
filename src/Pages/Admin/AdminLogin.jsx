import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // make sure react-toastify installed
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: " ",
    password: "",
  });

  const navigate = useNavigate();

  const handleErrorHouver = (e) => {
    const { name, value } = e.target;
    let msg = "";

    switch (name) {
      case "email":
        if (!value.trim()) msg = "Email field is required";
        else if (!value.includes("@")) msg = "(@) is required";
        else if (!/[a-z]/.test(value)) msg = "letter is required";
        // else if (!/[0-9]/.test(value)) msg = "number is required";
        break;

      case "password":
        if (!value.trim()) msg = "Password field is required";
        break;

      default:
        break;
    }
    setError((errors) => ({ ...errors, [name]: msg }));
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleLoginAdmin = async () => {
    const api = "http://127.0.0.1:8000/airbnb/Admin-login/";

    if (!input.email || !input.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(api, input);

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem("adminId",input.email)
        setTimeout(() => {
          navigate("/Admin-Manage-Dashboard");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.error(error.response.data.error);
        } else if (status === 401) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        toast.error("Network error!");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <Box
        component="form"
        sx={{
          width: 420,
          p: 4,
          borderRadius: 4,
          backgroundColor: "var(--card-bg)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        noValidate
        autoComplete="off"
      >
        {/* Title */}
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <p style={{ color: "var(--text-primary)" }}>Admin Login</p>
          </Box>
          <p style={{ color: "var(--text-primary)" }}>
            {" "}
            Secure access for administrators
          </p>
        </Box>

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
          name="email"
          onBlur={handleErrorHouver}
          error={Boolean(error.email)}
          helperText={error.email}
          onChange={handleInput}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
          name="password"
          onBlur={handleErrorHouver}
          error={Boolean(error.password)}
          helperText={error.password}
          onChange={handleInput}
        />

        {/* Login Button (Box styled) */}
        <Button
          sx={{
            mt: 2,
            py: 1.5,
            textAlign: "center",
            borderRadius: 2,
            fontWeight: 700,
            color: "#fff",
            cursor: "pointer",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            boxShadow: "0 10px 30px rgba(118,75,162,0.4)",
            transition: "0.3s",
            ":hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 14px 40px rgba(118,75,162,0.55)",
            },
          }}
          onClick={handleLoginAdmin}
        >
          Sign In
        </Button>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            fontSize: 12,
            color: "text.secondary",
            mt: 1,
          }}
        >
          Authorized personnel only
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastStyle={{
          background: "#000",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "8px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
        }}
      />
    </Box>
  );
}


























