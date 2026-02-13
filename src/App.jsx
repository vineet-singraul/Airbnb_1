import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import HostLogin from "./Pages/HostLogin";
import HostDashboard from "./Pages/Host/HostDashboard";
import AddServices from "./Pages/Host/AddServices";
import HostManageServices from "./Pages/Host/HostManageServices";
import HostAddProperty from "./Pages/Host/HostAddProperty";
import HostProfileManaged from "./Pages/Host/HostProfileManaged";
import HostAddPropertyImage from "./Pages/Host/HostAddPropertyImage";
import Test from "./Pages/Host/Test";
import HostManaProperty from "./Pages/Host/HostManaProperty";
import HostPropertyEditClick from "./Pages/Host/HostPropertyEditClick";
import ShowSinglePropertyDetails from "./Pages/User/ShowSinglePropertyDetails";
import Search from "./Pages/User/Search";
import UserSignup from "./Pages/User/UserSignup";
import UserLogin from "./Pages/User/UserLogin";
import Wishlist from "./Pages/User/Wishlist";
import TrackBooking from "./Pages/User/TrackBooking";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminManageProper from "./Pages/Admin/AdminManageProper";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminBooking from "./Pages/Admin/AdminBooking";
import AdminAllUsers from "./Pages/Admin/AdminAllUsers";
import AdminAllHost from "./Pages/Admin/AdminAllHost";
import AdminManageSecurity from "./Pages/Admin/AdminManageSecurity";
import AirbnbSettingsPanel from "./Pages/Admin/AirbnbSettingsPanel";
import AdminManageRefund from "./Pages/Admin/AdminManageRefund";
import HostPayments from "./Pages/Host/HostPayments";
import AdminMangeHostSalary from "./Pages/Admin/AdminMangeHostSalary";
import Chatbot from "./Pages/User/Chatbot";




const App = () => {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/host-login" element={<HostLogin/>}></Route>
          <Route path="/host-Addservices" element={<AddServices/>}></Route>
          <Route path="/host-ManageServices" element={<HostManageServices/>}></Route>
          <Route path="/host-Add-Property" element={<HostAddProperty/>}></Route>
          <Route path="/host-Manage-Profile" element={<HostProfileManaged/>}></Route>
          <Route path="/host-Add-Property" element={<HostAddProperty/>}></Route>
          <Route path="/host-Add-Property-Image" element={<HostAddPropertyImage/>}></Route>
          <Route path="/host-Test-Card" element={<Test/>}></Route>
          <Route path="/host-Manage-Property-All" element={<HostManaProperty/>}></Route>
          <Route path="/host-Edit-BTN-Property-All/:id" element={<HostPropertyEditClick />} />
          <Route path="/host-get-payments" element={<HostPayments/>}></Route>
          <Route path="/User-Show-All-Cards-Detail-Diff-Page/:id" element={<ShowSinglePropertyDetails/>}></Route>
          <Route path="/User-Search-Value" element={<Search />} />
          <Route path="/User-Registration" element={<UserSignup/>}></Route>
          <Route path="/User-Login" element={<UserLogin/>}></Route>
          <Route path="/User-Wishlist/:id" element={<Wishlist />} />
          <Route path="/User-Track-Booking" element={<TrackBooking/>}></Route>
          <Route path="/Host-Dashboard" element={<HostDashboard/>}></Route>
          <Route path="/Admin-login" element={<AdminLogin/>}></Route>
          <Route path="/Admin-Dashboard" element={<AdminLayout/>}></Route>
          <Route path="/Admin-Manage-Dashboard" element={<AdminManageProper/>}></Route>
          <Route path="/Admin-Manage-Property" element={<AdminDashboard/>}></Route>
          <Route path="/Admin-Mange-Booking" element={<AdminBooking/>}></Route>
          <Route path="/Admin-Mange-Users" element={<AdminAllUsers/>}></Route>
          <Route path="/Admin-Mange-Host" element={<AdminAllHost/>}></Route>
          <Route path="/Admin-Manage-Security" element={<AdminManageSecurity/>}></Route>
          <Route path="/Admin-Manage-settings" element={<AirbnbSettingsPanel/>}></Route>
          <Route path="/Admin-Manage-refund" element={<AdminManageRefund />} />
          <Route path="/Admin-Manage-Host-Payments" element={<AdminMangeHostSalary/>}></Route>
          <Route path="/Chat-with-ai" element={<Chatbot/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )    
}

export default App;