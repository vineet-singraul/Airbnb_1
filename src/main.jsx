// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles/comman.css"

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )



// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles/comman.css"

// import UserBlackWight from "./Pages/User/UserBlackWight";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <UserBlackWight>
//       <App />
//     </UserBlackWight>
//   </StrictMode>
// )




import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserBlackWhite from "./Pages/User/UserBlackWight";
import "./styles/global.css"; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserBlackWhite>
      <App />
    </UserBlackWhite>
  </React.StrictMode>
);



