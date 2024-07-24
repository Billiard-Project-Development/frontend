import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import ScrollToTop from "./helpers/ScrollToTop";
import BookingTablePage from "./pages/BookingTable";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TransactionHistory from "./pages/TransactionHistory";
import AdminLayoutPage from "./pages/admin/AdminLayoutPage";
import { getUserInfo } from "./utils/auth";

function App() {
  const isAuthenticated = true; // Assuming user is authenticated
  const userInfo = getUserInfo();
  const userRole = userInfo?.role;
  console.log("userRole:", userRole);

  return (
    <div className="z-auto mx-auto font-body bg-bgWhite min-h-screen">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeNavFoot />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/booking-table" element={<BookTableNav />} />
          <Route
            path="/transaction-history"
            element={<TransactionHistoryNav />}
          />{" "}
          {/* Redirect to admin dashboard if authenticated as admin */}
          {isAuthenticated && userRole === 1 && (
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          )}
          {/* Conditional rendering for admin dashboard */}
          {isAuthenticated && userRole === 1 ? (
            <Route path="/admin/*" element={<AdminLayoutPage />} />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/sign-in" />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

function HomeNavFoot() {
  return (
    <>
      <NavigationBar />
      <Home />
      <Footer />
    </>
  );
}

function BookTableNav() {
  return (
    <>
      <NavigationBar />
      <BookingTablePage />
    </>
  );
}
function TransactionHistoryNav() {
  return (
    <>
      <NavigationBar />
      <TransactionHistory />
    </>
  );
}

export default App;
