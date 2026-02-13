// import { Link } from "react-router-dom";
// import { AiOutlineLogout } from "react-icons/ai";
// import "../../styles/UserCss/Home.css";
// import { useEffect, useState, useContext } from "react";
// import { GiTireIronCross } from "react-icons/gi";
// import { CiCircleQuestion } from "react-icons/ci";
// import { CiHeart, CiSearch, CiUser, CiMenuFries } from "react-icons/ci";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Box, Button, Menu, MenuItem } from "@mui/material";
// import { PiCarThin } from "react-icons/pi";
// import { ColorContext } from "./UserBlackWight";

// const UserCommanLayout = ({ children }) => {
//   const changeColor = useContext(ColorContext);
//   const [activeTab, setActiveTab] = useState("Home");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [serchOpen, setSearchOpen] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [isUserLogin, setIsUserLogin] = useState(false);
//   const [UserName, setUserName] = useState("");
//   const userId = localStorage.getItem("userActualID");
//   const userName = localStorage.getItem("userName");
//   const [wishCount, setWishCount] = useState();
//   const totalWishList = localStorage.getItem("wishCount");
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     console.log("BG COLOR CHANGED:", changeColor.bgColor);
//   }, [changeColor.bgColor]);

//   useEffect(() => {
//     if (userId) {
//       setIsUserLogin(true);
//       setUserName(userName);
//     }
//   }, [userId]);

//   useEffect(() => {
//     setWishCount(totalWishList);
//   }, []);

//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     const names = e.target.name;
//     setSearchValue((values) => ({ ...values, [names]: value }));
//   };

//   const handleFormValue = (e) => {
//     e.preventDefault();
//     const query = new URLSearchParams(searchValue).toString();
//     navigate(`/User-Search-Value?${query}`);
//   };

//   const handleLogut = () => {
//     localStorage.clear();
//     setTimeout(() => {
//       navigate("/User-Login");
//     }, 1000);
//   };

//   const handleWishList = () => {
//     navigate(`/User-Wishlist/${userId}`);
//   };

//   const handleExperiance = async (key) => {
//     const api = `http://127.0.0.1:8000/airbnb/Experience/${key}`;
//     const response = await axios.get(api);
//     navigate("/", {
//       state: { data: response.data },
//     });
//   };

//   const handleHome = async (key) => {
//     const api = `http://127.0.0.1:8000/airbnb/Home/${key}`;
//     const response = await axios.get(api);
//     navigate("/", {
//       state: { data: response.data },
//     });
//   };

//   const handleServices = async (key) => {
//     const api = `http://127.0.0.1:8000/airbnb/Services/${key}`;
//     const response = await axios.get(api);
//     navigate("/", {
//       state: { data: response.data },
//     });
//   };

//   return (
//     <>
//       <header
//         className="airbnb-header shadow-sm bg-dark"
//         style={{ height: "60px", width: "100vw" }}
//       >
//         {/* Top Navbar */}
//         <div
//           className="d-flex justify-content-between align-items-center px-4"
//           id="haeders"
//         >
//           {/* First Navbar */}
//           <div className="d-flex align-items-center">
//             <img
//               className="navbar-brand"
//               src="../../public/userLogo.png"
//               style={{ width: "100px" }}
//             />
//           </div>

//           {/* Center Navigation */}
//           <div className="centerDiv">
//             <div
//               className={`centrFirst d-flex ${activeTab === "Home" ? "active" : ""}`}
//               onClick={() => setActiveTab("Home")}
//             >
//               <img
//                 style={{ width: "40px" }}
//                 src="../../public/1.gif"
//                 onClick={() => handleHome("Home")}
//               />
//               <p id="centrP">Home</p>
//             </div>

//             <div
//               className={`centrFirst d-flex ${activeTab === "Experience" ? "active" : ""}`}
//               onClick={() => setActiveTab("Experience")}
//             >
//               <div className="newBadge">NEW</div>
//               <img
//                 style={{ width: "40px" }}
//                 src="../../public/2.gif"
//                 onClick={() => handleExperiance("Experience")}
//               />
//               <p id="centrP">Experience</p>
//             </div>

//             <div
//               className={`centrFirst d-flex ${activeTab === "Services" ? "active" : ""}`}
//               onClick={() => setActiveTab("Services")}
//             >
//               <div className="newBadge">NEW</div>
//               <img
//                 style={{ width: "40px" }}
//                 src="../../public/3.gif"
//                 onClick={() => handleServices("Services")}
//               />
//               <p id="centrP">Services</p>
//             </div>
//           </div>

//           {/* Last Navigation */}
//           <div className="d-flex align-items-center me-3" id="lastDiv">
//             {isUserLogin ? (
//               <Link
//                 to="/host-login"
//                 id="minHost"
//                 className="borders links text-danger fw-semibold me-4 become-host"
//               >
//                 {userName}
//               </Link>
//             ) : (
//               <Box
//                 sx={{
//                   background: "#0000003b",
//                   border: "1px solid #ffffff65",
//                   fontSize: "1px",
//                   margin: "5px",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <Button
//                   className="borders links text-primary fw-semibold  ml-3 become-host"
//                   onClick={(e) => setAnchorEl(e.currentTarget)}
//                 >
//                   admin / host
//                 </Button>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={() => setAnchorEl(null)}
//                 >
//                   <MenuItem
//                     sx={{ background: "#000000ff" }}
//                     onClick={() => setAnchorEl(null)}
//                   >
//                     <Link to="/host-login" style={{ textDecoration: "none" }}>
//                       Become as Host
//                     </Link>
//                   </MenuItem>

//                   <MenuItem
//                     sx={{ background: "#000000ff" }}
//                     onClick={() => setAnchorEl(null)}
//                   >
//                     <Link to="/Admin-login" style={{ textDecoration: "none" }}>
//                       Become as Admin
//                     </Link>
//                   </MenuItem>
//                 </Menu>
//               </Box>
//             )}

//             <div className="icondiv borderRound" data-cy="menu-btn">
//               {menuOpen ? (
//                 <GiTireIronCross
//                   id="rounded"
//                   className="fs-5 me-3 text-white cursor-pointer iconsmin"
//                   onClick={() => setMenuOpen(false)}
//                 />
//               ) : (
//                 <CiMenuFries
//                   id="animations"
//                   className="fs-5 me-3 text-white cursor-pointer iconsmin"
//                   onClick={() => setMenuOpen(true)}
//                 />
//               )}
//             </div>

//             {menuOpen && (
//               <div className="hanmburgerClickDiv">
//                 <ul>
//                   <li className="d-flex">
//                     {" "}
//                     <CiCircleQuestion className="me-3 fs-3" />
//                     <Link>Help center</Link>
//                   </li>
//                   <hr />
//                   <li>
//                     <div className="d-flex">
//                       <img
//                         style={{ width: "20px" }}
//                         src="../../public/4.webp"
//                         alt=""
//                       />{" "}
//                       <Link to="/host-login">Become a host</Link>
//                     </div>
//                     <span id="hosttext">
//                       It's easy to start hosting and earn extra income.
//                     </span>
//                   </li>
//                   <hr />
//                   {isUserLogin ? (
//                     <li className="d-flex">
//                       {" "}
//                       <AiOutlineLogout className="me-3 fs-3" />
//                       <Link data-cy="logout-btn" onClick={handleLogut}>
//                         {" "}
//                         Logout{" "}
//                       </Link>
//                     </li>
//                   ) : (
//                     <li className="d-flex">
//                       {" "}
//                       <CiUser className="me-3 fs-3" />
//                       <Link to="/User-Registration">Signup</Link> /{" "}
//                       <Link to="/User-Login">Login</Link>
//                     </li>
//                   )}
//                   <hr />
//                   <li className="d-flex">
//                     {" "}
//                     <PiCarThin className="me-3 fs-3" />
//                     <Link to="/User-Track-Booking">Track Booking</Link>
//                   </li>
//                 </ul>
//               </div>
//             )}

//             <div className="icondiv borderRound">
//               <CiUser className="fs-4 me-3 text-white" id="animations" />
//             </div>

//             <button onClick={() => changeColor.setBgColor("pink")}>
//               C
//             </button>

//             <div
//               className="icondiv borderRound"
//               id="search"
//               onClick={() => setSearchOpen(!serchOpen)}
//             >
//               {serchOpen ? (
//                 <GiTireIronCross
//                   id="rounded"
//                   className="fs-5 me-3 text-white cursor-pointer iconsmin"
//                 />
//               ) : (
//                 <CiSearch className="fs-4 me-3 text-white" id="animations" />
//               )}
//             </div>

//             {isUserLogin ? (
//               <div
//                 className="icondiv borderRound"
//                 id="search"
//                 onClick={handleWishList}
//               >
//                 <p id="countWish">{wishCount}</p>
//                 <CiHeart
//                   id="animations"
//                   className="fs-5 me-3 text-white iconsmin"
//                 />
//               </div>
//             ) : (
//               <Link
//                 to="/User-Login"
//                 className="icondiv borderRound"
//                 id="search"
//               >
//                 <CiHeart
//                   id="animations"
//                   className="fs-5 me-3 text-white iconsmin"
//                 />
//               </Link>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Middle Body*/}
//       {serchOpen && (
//         <form method="GET" onSubmit={handleFormValue} className="search-bar">
//           <div className="search-field where">
//             <label>Where</label>
//             <input
//               type="text"
//               onChange={handleSearch}
//               name="location"
//               placeholder="Search destinations"
//             />
//           </div>
//           <div className="divider"></div>
//           <div className="divider"></div>
//           <div className="search-field who">
//             <label>Who</label>
//             <input
//               type="text"
//               onChange={handleSearch}
//               name="popules"
//               placeholder="Add guests"
//             />
//           </div>
//           <button className="search-btn" type="submit">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="18"
//               width="18"
//               fill="white"
//               viewBox="0 0 24 24"
//             >
//               <path d="M21.53 20.47l-4.687-4.687A7.938 7.938 0 0016 10a8 8 0 10-8 8 7.938 7.938 0 005.783-2.157l4.687 4.687a.75.75 0 001.06-1.06zM10 16.5A6.5 6.5 0 1116.5 10 6.508 6.508 0 0110 16.5z" />
//             </svg>
//             Search
//           </button>
//         </form>
//       )}

//       <div style={{ height: "100vh" }}>{children}</div>
//     </>
//   );
// };

// export default UserCommanLayout;

import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import "../../styles/UserCss/Home.css";
import { useEffect, useState, useContext } from "react";
import { GiTireIronCross } from "react-icons/gi";
import { CiCircleQuestion } from "react-icons/ci";
import { CiHeart, CiSearch, CiUser, CiMenuFries } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Avatar,
  Paper,
} from "@mui/material";
import { PiCarThin } from "react-icons/pi";
import "../../styles/global.css";

import {
  Brightness4,
  Brightness7,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import UserBlackWhite, { ColorContext } from "./UserBlackWight";

const UserCommanLayout = ({ children }) => {
  const { theme, toggleTheme, setLightTheme, setDarkTheme } =
    useContext(ColorContext);
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [serchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [UserName, setUserName] = useState("");
  const userId = localStorage.getItem("userActualID");
  const userName = localStorage.getItem("userName");
  const [wishCount, setWishCount] = useState();
  const totalWishList = localStorage.getItem("wishCount");
  const [anchorEl, setAnchorEl] = useState(null);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);

  useEffect(() => {
    console.log("Current Theme:", theme);
  }, [theme]);

  useEffect(() => {
    if (userId) {
      setIsUserLogin(true);
      setUserName(userName);
    }
  }, [userId]);

  useEffect(() => {
    setWishCount(totalWishList);
  }, []);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    const names = e.target.name;
    setSearchValue((values) => ({ ...values, [names]: value }));
  };

  const handleFormValue = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(searchValue).toString();
    navigate(`/User-Search-Value?${query}`);
  };

  const handleLogut = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/User-Login");
    }, 1000);
  };

  const handleWishList = () => {
    navigate(`/User-Wishlist/${userId}`);
  };

  const handleExperiance = async (key) => {
    const api = `http://127.0.0.1:8000/airbnb/Experience/${key}`;
    const response = await axios.get(api);
    navigate("/", {
      state: { data: response.data },
    });
  };

  const handleHome = async (key) => {
    const api = `http://127.0.0.1:8000/airbnb/Home/${key}`;
    const response = await axios.get(api);
    navigate("/", {
      state: { data: response.data },
    });
  };

  const handleServices = async (key) => {
    const api = `http://127.0.0.1:8000/airbnb/Services/${key}`;
    const response = await axios.get(api);
    navigate("/", {
      state: { data: response.data },
    });
  };

  return (
    <>
      <header
        className="airbnb-header shadow-sm"
        style={{
          height: "60px",
          width: "100vw",
          backgroundColor: "var(--header-bg)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        {/* Top Navbar */}
        <div
          className="d-flex justify-content-between align-items-center px-4"
          id="haeders"
        >
          {/* First Navbar */}
          <div className="d-flex align-items-center">
            <img
              className="navbar-brand"
              src="../../public/userLogo.png"
              style={{ width: "100px" }}
              alt="Airbnb Logo"
            />
          </div>

          {/* Center Navigation */}
          <div className="centerDiv">
            <div
              className={`centrFirst d-flex ${activeTab === "Home" ? "active" : ""}`}
              onClick={() => setActiveTab("Home")}
            >
              <img
                style={{ width: "40px" }}
                src="../../public/1.gif"
                onClick={() => handleHome("Home")}
                alt="Home"
              />
              <p id="centrP" style={{ color: "var(--text-primary)" }}>
                Home
              </p>
            </div>

            <div
              className={`centrFirst d-flex ${activeTab === "Experience" ? "active" : ""}`}
              onClick={() => setActiveTab("Experience")}
            >
              <div className="newBadge">NEW</div>
              <img
                style={{ width: "40px" }}
                src="../../public/2.gif"
                onClick={() => handleExperiance("Experience")}
                alt="Experience"
              />
              <p id="centrP">Experience</p>
            </div>

            <div
              className={`centrFirst d-flex ${activeTab === "Services" ? "active" : ""}`}
              onClick={() => setActiveTab("Services")}
            >
              <div className="newBadge">NEW</div>
              <img
                style={{ width: "40px" }}
                src="../../public/3.gif"
                onClick={() => handleServices("Services")}
                alt="Services"
              />
              <p id="centrP">Services</p>
            </div>
          </div>

          {/* Last Navigation */}
          <div className="d-flex align-items-center me-3" id="lastDiv">
            {isUserLogin ? (
              <Link
                to="/host-login"
                id="minHost"
                className="borders links text-danger fw-semibold me-4 become-host"
              >
                {userName}
              </Link>
            ) : (
              <Box
                sx={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  fontSize: "1px",
                  margin: "5px",
                  borderRadius: "10px",
                }}
              >
                <Button
                  className="borders links fw-semibold ml-3 become-host"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ color: "var(--text-primary)" }}
                >
                  admin / host
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "var(--card-bg)",
                      color: "var(--text-primary)",
                    },
                  }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    <Link
                      to="/host-login"
                      style={{
                        textDecoration: "none",
                        color: "var(--text-primary)",
                      }}
                    >
                      Become as Host
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={() => setAnchorEl(null)}>
                    <Link
                      to="/Admin-login"
                      style={{
                        textDecoration: "none",
                        color: "var(--text-primary)",
                      }}
                    >
                      Become as Admin
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
            )}

            <Menu
              anchorEl={themeMenuAnchor}
              open={Boolean(themeMenuAnchor)}
              onClose={() => setThemeMenuAnchor(null)}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-primary)",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  setLightTheme();
                  setThemeMenuAnchor(null);
                }}
              >
                <LightMode sx={{ marginRight: 2 }} />
                Light Mode
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setDarkTheme();
                  setThemeMenuAnchor(null);
                }}
              >
                <DarkMode sx={{ marginRight: 2 }} />
                Dark Mode
              </MenuItem>
              <MenuItem
                onClick={() => {
                  toggleTheme();
                  setThemeMenuAnchor(null);
                }}
              >
                <Brightness7 sx={{ marginRight: 2 }} />
                Toggle Theme
              </MenuItem>
            </Menu>

            <div className="icondiv borderRound" data-cy="menu-btn">
              {menuOpen ? (
                <GiTireIronCross
                  id="rounded"
                  className="fs-5 me-3 cursor-pointer iconsmin"
                  onClick={() => setMenuOpen(false)}
                  style={{ color: "var(--text-primary)" }}
                />
              ) : (
                <CiMenuFries
                  id="animations"
                  className="fs-5 me-3 cursor-pointer iconsmin"
                  onClick={() => setMenuOpen(true)}
                  style={{ color: "var(--text-primary)" }}
                />
              )}
            </div>

            {menuOpen && (
              <div className="hanmburgerClickDiv">
                <ul>
                  <li className="d-flex">
                    <CiCircleQuestion className="me-3 fs-3" />
                    <Link>Help center</Link>
                  </li>
                  <hr />
                  <li>
                    <div className="d-flex">
                      <img
                        style={{ width: "20px" }}
                        src="../../public/4.webp"
                        alt="Host icon"
                      />
                      <Link to="/host-login">Become a host</Link>
                    </div>
                    <span id="hosttext">
                      It's easy to start hosting and earn extra income.
                    </span>
                  </li>
                  <hr />
                  {isUserLogin ? (
                    <li className="d-flex">
                      <AiOutlineLogout className="me-3 fs-3" />
                      <Link data-cy="logout-btn" onClick={handleLogut}>
                        Logout
                      </Link>
                    </li>
                  ) : (
                    <li className="d-flex">
                      <CiUser className="me-3 fs-3" />
                      <Link to="/User-Registration">Signup</Link> /{" "}
                      <Link to="/User-Login">Login</Link>
                    </li>
                  )}
                  <hr />
                  <li className="d-flex">
                    <PiCarThin className="me-3 fs-3" />
                    <Link to="/User-Track-Booking">Track Booking</Link>
                  </li>

                  <hr />
                  <li className="d-flex">
                    {theme === "dark" ? (
                      <LightMode className="me-3" />
                    ) : (
                      <DarkMode className="me-3" />
                    )}
                    <Link onClick={toggleTheme}>
                      Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <div className="icondiv borderRound">
              <CiUser
                className="fs-4 me-3"
                id="animations"
                style={{ color: "var(--text-primary)" }}
              />
            </div>

            <div
              className="icondiv borderRound"
              id="search"
              onClick={() => setSearchOpen(!serchOpen)}
            >
              {serchOpen ? (
                <GiTireIronCross
                  id="rounded"
                  className="fs-5 me-3 cursor-pointer iconsmin"
                  style={{ color: "var(--text-primary)" }}
                />
              ) : (
                <CiSearch
                  className="fs-4 me-3"
                  id="animations"
                  style={{ color: "var(--text-primary)" }}
                />
              )}
            </div>

            {isUserLogin ? (
              <div
                className="icondiv borderRound"
                id="search"
                onClick={handleWishList}
              >
                <p id="countWish">{wishCount}</p>
                <CiHeart
                  id="animations"
                  className="fs-5 me-3 iconsmin"
                  style={{ color: "var(--text-primary)" }}
                />
              </div>
            ) : (
              <Link
                to="/User-Login"
                className="icondiv borderRound"
                id="search"
              >
                <CiHeart
                  id="animations"
                  className="fs-5 me-3 iconsmin"
                  style={{ color: "var(--text-primary)" }}
                />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Search Bar */}
      {serchOpen && (
        <form method="GET" onSubmit={handleFormValue} className="search-bar">
          <div className="search-field where">
            <label>Where</label>
            <input
              type="text"
              onChange={handleSearch}
              name="location"
              placeholder="Search destinations"
            />
          </div>
          <div className="divider"></div>
          <div className="search-field who">
            <label>Who</label>
            <input
              type="text"
              onChange={handleSearch}
              name="popules"
              placeholder="Add guests"
            />
          </div>
          <button className="search-btn" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              width="18"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M21.53 20.47l-4.687-4.687A7.938 7.938 0 0016 10a8 8 0 10-8 8 7.938 7.938 0 005.783-2.157l4.687 4.687a.75.75 0 001.06-1.06zM10 16.5A6.5 6.5 0 1116.5 10 6.508 6.508 0 0110 16.5z" />
            </svg>
            Search
          </button>
        </form>
      )}

      <div
        style={{
          height: "100vh",
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        {children}
      </div>

      <Box
        sx={{
          position: "fixed",
          top: "76%",
          right: "20px",
          zIndex: 1300,
        }}
      >
        <Link to="/Chat-with-ai" style={{ textDecoration: "none" }}>
          <Paper
            elevation={6}
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                border: "3px solid #7a0093",
                borderRadius: "50%",
                padding: "6px",
              }}
            >
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                alt="AI Robot"
                sx={{
                  width: 70,
                  height: 70,
                  animation: "floatWave 2s ease-in-out infinite",

                  "@keyframes floatWave": {
                    "0%": { transform: "rotate(0deg) translateY(0px)" },
                    "25%": { transform: "rotate(-5deg) translateY(-4px)" },
                    "50%": { transform: "rotate(0deg) translateY(0px)" },
                    "75%": { transform: "rotate(5deg) translateY(-4px)" },
                    "100%": { transform: "rotate(0deg) translateY(0px)" },
                  },
                }}
              />
            </Box>
          </Paper>
        </Link>
      </Box>
    </>
  );
};

export default UserCommanLayout;
