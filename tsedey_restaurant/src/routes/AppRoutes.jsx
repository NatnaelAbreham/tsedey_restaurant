// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Menu from "../components/Menu";
import ContactPage from "../pages/ContactPage";
import AddMenu from '../menu/AddMenu.jsx';
import InventoryPage from '../menu/InventoryPage.jsx';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/addmenu" element={<AddMenu />} />
      <Route path="/addquantity" element={<InventoryPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;