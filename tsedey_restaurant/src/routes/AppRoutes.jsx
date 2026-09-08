import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Menu from "../components/Menu";
import Dashboard from "../pages/Dashboard";
import OrderManagement from "../components/OrderManagement";
import ContactPage from "../pages/ContactPage";
import Report from "../pages/Report";
import AddMenu from "../menu/AddMenu.jsx";
import UpdateMenu from "../menu/UpdateMenu.jsx";
import InventoryPage from "../menu/InventoryPage.jsx";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>

        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/addmenu" element={<AddMenu />} />
        <Route path="/updatemenu" element={<UpdateMenu />} />
        <Route path="/addquantity" element={<InventoryPage />} />
        <Route
          path="/ordermanagement"
          element={<OrderManagement />}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;