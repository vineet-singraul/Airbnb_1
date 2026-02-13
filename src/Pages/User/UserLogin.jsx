import React, { useState } from "react";
import { Box, TextField, Button, Typography,Paper,} from "@mui/material";
import "../../styles/UserCss/UsersLogin.css"
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const navigate = useNavigate()
    const [input , setInput] = useState({
        name:'',
        email:'',
        Password : ''
    }) 

    const [errors , setErrors] = useState({
        name:'',
        email:'',
        Password : ''
    })

    const handleInput = (e) => {
        const value = e.target.value;
        const fieldName = e.target.name;
        setInput((values) => ({ ...values, [fieldName]: value }));
    }

    const handleError = (e) => {
        const value = e.target.value;
        const fieldName = e.target.name;
        let msg = "";

        switch(fieldName){
            case 'name':
                if(value.trim() === '') msg = 'Name is required';
                break;
            case 'email':
                if(value.trim() === '') msg = 'Email is required';
                else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = 'Invalid email';
                break;
            case 'Password':
                if(value.length < 6) msg = 'Password must be at least 6 characters';
                break;
            default:
                break;
        }
        setErrors((prev)=>({...prev , [fieldName] : msg}))
    }

    

const handleSubmit = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/airbnb/User-Login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });

        // ✔ ALWAYS read data FIRST
        const data = await response.json();
        console.log("Login Response:", data);

        // ✔ SUCCESS
        if (response.status === 200) {
            toast.success(data.message);
            localStorage.setItem("userActualID", data.user_id);
            localStorage.setItem("userName", data.user_name);
            setTimeout(() => {
              navigate('/')
            }, 2000);
        }

        // ✔ BAD REQUEST
        if (response.status === 400) {
            toast.error(data.error);
            return;
        }

        // ✔ INVALID CREDENTIALS
        if (response.status === 401) {
            toast.error(data.error);
            return;
        }

    } catch (error) {
        console.error("Login Error:", error);
        toast.error("Something went wrong");
    }
};



  return (
    <Box  id="Boxs">
      <Paper elevation={6} id="paperBox" >
        <Typography variant="h4"  sx={{ fontWeight: "bold", mb: 3 }} > User Login </Typography>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2,  input: { color: "#fff" },  label: { color: "#d1cfff" }, "& .MuiOutlinedInput-root fieldset": {  borderColor: "#b8a9ff", },  "& .MuiOutlinedInput-root:hover fieldset": {  borderColor: "#fff", }, }}
          name="name"
          value={input.name}
          onChange={handleInput}
          onBlur={handleError}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />




        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2,  input: { color: "#fff" },  label: { color: "#d1cfff" }, "& .MuiOutlinedInput-root fieldset": {  borderColor: "#b8a9ff", },  "& .MuiOutlinedInput-root:hover fieldset": {  borderColor: "#fff", }, }}
          name="email"
          value={input.email}
          onChange={handleInput}
          onBlur={handleError}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          sx={{ mb: 2,  input: { color: "#fff" },  label: { color: "#d1cfff" }, "& .MuiOutlinedInput-root fieldset": {  borderColor: "#b8a9ff", },  "& .MuiOutlinedInput-root:hover fieldset": {  borderColor: "#fff", }, }}
          fullWidth
          name="Password"                
          value={input.Password}             
          onChange={handleInput}
          onBlur={handleError}
          error={Boolean(errors.Password)}
          helperText={errors.Password}
        />


        <Button type="submit" onClick={handleSubmit} variant="contained" fullWidth id="buttonClick" >
          Login
        </Button>

        <Typography sx={{ mt: 2, color: "#3900d4ff" }}>
          Don't have an account?
          <span style={{ color: "#000000ff", cursor: "pointer" }}>
            {" "}
            Register
          </span>
        </Typography>



      </Paper>

       <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </Box>
  );
};

export default UserLogin;

