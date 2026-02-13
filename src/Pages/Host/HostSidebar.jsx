// import { useState } from "react";
// import { Link } from 'react-router-dom';
// import "../../styles/HostSidebar.css";
// import { FaImage } from "react-icons/fa6";
// import { FaTachometerAlt, FaUserCog, FaTools, FaClipboardList, FaPhoneAlt, FaMoneyCheckAlt, FaStar, FaChevronDown,FaChevronUp  } from "react-icons/fa";
// const HostSidebar = () => {
//   // ✅ State to track active link
//   const [activeLink, setActiveLink] = useState("dashboard");
//   // ✅ Manu ko open Karne Ke Liye Hai
//   const [OpenManu , setOpenMaue] = useState({
//     'services':false,
//     'bookingManage':false,
//     'addImage':false,
//   })

//   const showManueAll = (manu) => {
//     setOpenMaue(prev => ({...prev, [manu] : !prev[manu]}));
//   }


//   return (
//     <div className="bg-dark text-white sidebar">
//       <div className="text-center p-3 ">
//         <img id="airbnbHostLogo" src="../../../public/logo.png" alt="Airbnb Host Logo" />
//         <div className="d-flex align-items-baseline justify-content-center text-center">
//           <h6 id="AirLogoName">Aiibnb</h6>
//           <h2 id="AirLogoHost">Host</h2>
//         </div>
//       </div>

//       <div className='list-group list-group-flush HostDhoverEffect'>

//         <div className="list-group list-group-flush">
//           <Link to='/Host-Dashboard'
//             onClick={() => setActiveLink("dashboard")}
//             className={`list-group-item list-group-item-action d-flex align-items-center ${activeLink === "dashboard" ? "active-link" : "bg-dark text-white"}`}>
//             <FaTachometerAlt className="me-2" /> Dashboard
//           </Link>
//         </div>

//         <div className="list-group list-group-flush">
//           <Link to="/host-Manage-Profile" onClick={() => setActiveLink("profile")} 
//               className={`list-group-item list-group-item-action d-flex align-items-center ${activeLink === "profile" ? "active-link" : "bg-dark text-white"}`}>
//                 <FaUserCog className="me-2" /> Manage Profile 
//           </Link>
//         </div>

//         {/*--------------- Open Manu 1 hai ye-------------------------- */}
//         <div className="list-group list-group-flush" onClick={() => setActiveLink("servises")}>
//           <button onClick={()=>showManueAll('services')}
//                 className={`list-group-item list-group-item-action d-flex align-items-center ${activeLink === "servises" ? "active-link" : "bg-dark text-white"}`}>
//                 <FaTools className="me-2" /> Manage Services 
//                 {OpenManu.services ? <FaChevronDown  className="position-absolute" style={{ right: '10px' }}/>  : <FaChevronUp  className="position-absolute" style={{ right: '10px' }}/> }
//           </button>
//        </div>
//         {OpenManu.services && 
//           <div>
//             <Link to='/host-Addservices' className="sublink list-group-item list-group-item-action d-flex align-items-center bg-dark text-white p-10">
//                   Add Services
//             </Link>

//             <Link to="/host-ManageServices" className="sublink list-group-item list-group-item-action d-flex align-items-center bg-dark text-white ">
//                   Manage Services
//             </Link>
//         </div>
//         }
//         {/* ------------------------------------------------------------- */}
        


//         {/*--------------- Open Manu 2 hai ye-------------------------- */}
//         <div className="list-group list-group-flush" onClick={() => setActiveLink("booking")}>
//           <button onClick={()=>showManueAll('bookingManage')}
//                 className={`list-group-item list-group-item-action d-flex align-items-center ${activeLink === "booking" ? "active-link" : "bg-dark text-white"}`}>
//                 <FaClipboardList className="me-2" />  Host Property
//                 {OpenManu.bookingManage ? <FaChevronDown  className="position-absolute" style={{ right: '10px' }}/>  : <FaChevronUp  className="position-absolute" style={{ right: '10px' }}/> }
//           </button>
//        </div>
//         {OpenManu.bookingManage && 
//           <div>
//             <Link to='/host-Add-Property' className="sublink list-group-item list-group-item-action d-flex align-items-center bg-dark text-white p-10">
//                   Add Property
//             </Link>

//             <Link to='/host-Manage-Property-All' className="sublink list-group-item list-group-item-action d-flex align-items-center bg-dark text-white ">
//                   Manage property
//             </Link>
//         </div>
//         }
//         {/* ------------------------------------------------------------- */}
        

//         {/*--------------- Open Manu 3 hai ye-------------------------- */}
//         <div className="list-group list-group-flush" onClick={() => setActiveLink("addImage")}>
//           <button onClick={()=>showManueAll('addImage')}
//                 className={`list-group-item list-group-item-action d-flex align-items-center ${activeLink === "addImage" ? "active-link" : "bg-dark text-white"}`}>
//                 <FaImage   className="me-2" />  Add Propert Image
//                 {OpenManu.addImage ? <FaChevronDown  className="position-absolute" style={{ right: '10px' }}/>  : <FaChevronUp  className="position-absolute" style={{ right: '10px' }}/> }
//           </button>
//        </div>
//         {OpenManu.addImage && 
//           <div>
//             <Link to="/host-Add-Property-Image" className="sublink list-group-item list-group-item-action d-flex align-items-center bg-dark text-white p-10">
//                   Add Property Image
//             </Link>
//         </div>
//         }
//         {/* ------------------------------------------------------------- */}
        



//        <div className="list-group list-group-flush">
//          <Link to="/host-Test-Card" onClick={() => setActiveLink("calls")}
//            className={`list-group-item list-group-item-action d-flex align-items-center ${activeLink === "calls" ? "active-link" : "bg-dark text-white"}`}>
//           <FaPhoneAlt className="me-2" /> Images
//          </Link>
//        </div>
       
//        <div className="list-group list-group-flush">
//           <Link onClick={() => setActiveLink("payments")}
//                className={`list-group-item list-group-item-action d-flex align-items-center ${activeLink === "payments" ? "active-link" : "bg-dark text-white"}`}>
//               <FaMoneyCheckAlt className="me-2" /> Payments
//           </Link>
//        </div>

//        <div className="list-group list-group-flush">
//           <Link nClick={() => setActiveLink("reviews")}
//               className={`list-group-item list-group-item-action d-flex align-items-center ${activeLink === "reviews" ? "active-link" : "bg-dark text-white"}`}>
//               <FaStar className="me-2" /> Reviews & Ratings
//          </Link>
//        </div>

//       </div>
//     </div>
//   );
// };

// export default HostSidebar;







import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Avatar,
  Divider,
  styled
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Build as BuildIcon,
  Home as HomeIcon,
  Image as ImageIcon,
  Phone as PhoneIcon,
  Payments as PaymentsIcon,
  Star as StarIcon,
  ExpandLess,
  ExpandMore,
  ChevronRight
} from "@mui/icons-material";

// Styled Components
const SidebarWrapper = styled(Box)({
  width: 280,
  height: '100vh',
  backgroundColor: '#1a1a1a',
  color: 'white',
  position: 'fixed',
  left: 0,
  top: 0,
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#2a2a2a',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#555',
    borderRadius: '3px',
  },
});

const LogoSection = styled(Box)({
  padding: '30px 20px',
  textAlign: 'center',
  borderBottom: '1px solid #333',
});

const MenuItem = styled(ListItemButton)(({ active }) => ({
  margin: '6px 16px',
  borderRadius: '10px',
  padding: '12px 16px',
  color: '#e0e0e0',
  transition: 'all 0.3s ease',
  backgroundColor: active ? '#1976d2' : 'transparent',
  '&:hover': {
    backgroundColor: active ? '#1565c0' : '#2a2a2a',
    transform: 'translateX(5px)',
  },
  '& .MuiListItemIcon-root': {
    color: active ? 'white' : '#b0b0b0',
    minWidth: '40px',
  },
  '& .MuiListItemText-primary': {
    fontWeight: active ? '600' : '400',
    fontSize: '0.95rem',
  },
}));

const SubMenuItem = styled(ListItemButton)(({ active }) => ({
  paddingLeft: '50px',
  paddingTop: '8px',
  paddingBottom: '8px',
  margin: '2px 16px',
  borderRadius: '8px',
  color: '#d0d0d0',
  backgroundColor: active ? '#1976d2' : 'transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: active ? '#1565c0' : '#2a2a2a',
    paddingLeft: '55px',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '30px',
    color: active ? 'white' : '#888',
  },
}));

const HostSidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    services: location.pathname.includes('services'),
    bookingManage: location.pathname.includes('Property'),
    addImage: location.pathname.includes('Image'),
  });

  // Check active path
  const isActive = (path) => location.pathname === path;

  // Check if submenu should be active
  const isSubMenuActive = (paths) => paths.some(path => location.pathname === path);

  // Toggle menu open/close
  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <SidebarWrapper>
      {/* Logo Section */}
      <LogoSection>
        <Avatar
          src="/logo.png"
          alt="Airbnb Host Logo"
          sx={{
            width: 70,
            height: 70,
            margin: '0 auto 15px',
            backgroundColor: 'white',
            padding: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
          <Typography 
            sx={{ 
              color: '#f0f0f0', 
              fontSize: '1.2rem',
              fontWeight: 300,
              letterSpacing: '1px'
            }}
          >
            Aiibnb
          </Typography>
          <Typography 
            sx={{ 
              color: 'white', 
              fontSize: '1.8rem',
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Host
          </Typography>
        </Box>
        <Typography 
          sx={{ 
            color: '#aaa',
            fontSize: '0.75rem',
            mt: 1,
            fontWeight: 300
          }}
        >
          Professional Hosting Platform
        </Typography>
      </LogoSection>

      {/* Menu Items */}
      <List sx={{ p: '16px 0' }}>
        {/* Dashboard */}
        <MenuItem
          component={Link}
          to="/Host-Dashboard"
          active={isActive('/Host-Dashboard')}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </MenuItem>

        {/* Manage Profile */}
        <MenuItem
          component={Link}
          to="/host-Manage-Profile"
          active={isActive('/host-Manage-Profile')}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Profile" />
        </MenuItem>

        {/* Manage Services */}
        <MenuItem
          onClick={() => toggleMenu('services')}
          active={isSubMenuActive(['/host-Addservices', '/host-ManageServices']) || openMenus.services}
        >
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Services" />
          {openMenus.services ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        
        <Collapse in={openMenus.services} timeout="auto" unmountOnExit>
          <Box>
            <SubMenuItem
              component={Link}
              to="/host-Addservices"
              active={isActive('/host-Addservices')}
            >
              <ListItemIcon>
                <ChevronRight fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Add Services" 
                primaryTypographyProps={{ fontSize: '0.9rem' }}
              />
            </SubMenuItem>
            
            <SubMenuItem
              component={Link}
              to="/host-ManageServices"
              active={isActive('/host-ManageServices')}
            >
              <ListItemIcon>
                <ChevronRight fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Manage Services" 
                primaryTypographyProps={{ fontSize: '0.9rem' }}
              />
            </SubMenuItem>
          </Box>
        </Collapse>

        {/* Host Property */}
        <MenuItem
          onClick={() => toggleMenu('bookingManage')}
          active={isSubMenuActive(['/host-Add-Property', '/host-Manage-Property-All']) || openMenus.bookingManage}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Host Property" />
          {openMenus.bookingManage ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        
        <Collapse in={openMenus.bookingManage} timeout="auto" unmountOnExit>
          <Box>
            <SubMenuItem
              component={Link}
              to="/host-Add-Property"
              active={isActive('/host-Add-Property')}
            >
              <ListItemIcon>
                <ChevronRight fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Add Property" 
                primaryTypographyProps={{ fontSize: '0.9rem' }}
              />
            </SubMenuItem>
            
            <SubMenuItem
              component={Link}
              to="/host-Manage-Property-All"
              active={isActive('/host-Manage-Property-All')}
            >
              <ListItemIcon>
                <ChevronRight fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Manage Property" 
                primaryTypographyProps={{ fontSize: '0.9rem' }}
              />
            </SubMenuItem>
          </Box>
        </Collapse>

        {/* Property Images */}
        <MenuItem
          onClick={() => toggleMenu('addImage')}
          active={isActive('/host-Add-Property-Image') || openMenus.addImage}
        >
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText primary="Property Images" />
          {openMenus.addImage ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        
        <Collapse in={openMenus.addImage} timeout="auto" unmountOnExit>
          <Box>
            <SubMenuItem
              component={Link}
              to="/host-Add-Property-Image"
              active={isActive('/host-Add-Property-Image')}
            >
              <ListItemIcon>
                <ChevronRight fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Add Property Image" 
                primaryTypographyProps={{ fontSize: '0.9rem' }}
              />
            </SubMenuItem>
          </Box>
        </Collapse>

        {/* Images */}
        <MenuItem
          component={Link}
          to="/host-Test-Card"
          active={isActive('/host-Test-Card')}
        >
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary="Images" />
        </MenuItem>

        {/* Payments */}
        <MenuItem
          component={Link}
          to='/host-get-payments'
          active={isActive('/host-get-payments')}
        >
          <ListItemIcon>
            <PaymentsIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </MenuItem>

        {/* Reviews & Ratings */}
        <MenuItem
          component={Link}
          to="#"
          active={isActive('#')}
        >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Reviews & Ratings" />
        </MenuItem>
      </List>

      {/* Footer Section */}
      <Box sx={{ p: 3, mt: 'auto' }}>
        <Divider sx={{ backgroundColor: '#444', mb: 2 }} />
        <Typography 
          sx={{ 
            color: '#888',
            fontSize: '0.85rem',
            textAlign: 'center',
            mb: 1,
            fontWeight: 300
          }}
        >
          🆘 Need help? Contact Support
        </Typography>
        <Typography 
          sx={{ 
            color: '#666',
            fontSize: '0.7rem',
            textAlign: 'center',
            fontWeight: 300
          }}
        >
          v2.0.1 • © 2024 Airbnb Host
        </Typography>
      </Box>
    </SidebarWrapper>
  );
};

export default HostSidebar;