import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavAdmin from "../../components/admin/NavAdmin";
import Sidebar from "../../components/admin/Sidebar";
import BookingList from "./BookingList";
import Dashboard from "./Dashboard";
import Tables from "./Tables";
import Transaction from "./Transaction";

const AdminLayoutPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleSidebar = () => {
    setIsOpenSidebar((current) => !current);
  };
  return (
    <div className="flex">
      <Sidebar isOpen={isOpenSidebar} setIsOpen={setIsOpenSidebar} />
      <div className="flex-1 h-screen overflow-y-auto">
        <NavAdmin isOpenSidebar={isOpenSidebar} handleSidebar={handleSidebar} />
        <div className="p-8">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="booking-list" element={<BookingList />} />
            <Route path="tables" element={<Tables />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutPage;
