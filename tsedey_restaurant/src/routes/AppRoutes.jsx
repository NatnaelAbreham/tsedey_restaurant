// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import Home from "./src/pages/Home";
import Menu from "./src/components/Menu";
import ContactPage from "./src/pages/ContactPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;