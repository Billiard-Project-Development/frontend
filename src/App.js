import React from "react";
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
import NotFound from "./pages/NotFound";
import NotAuthorized from "./pages/NotAuthorized";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const userInfo = getUserInfo();
  const userRole = userInfo?.role;
  console.log("userRole app.js:", userRole);
  // 1 = superAdmin, 2 = admin, 3 = user
  return (
    <div className="z-auto mx-auto font-body bg-bgWhite min-h-screen">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeNavFoot />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/booking-table" element={<BookTableNav />} />
          {userRole !== undefined ? (
            <Route
              path="/transaction-history"
              element={<TransactionHistoryNav />}
            />
          ) : (
            <Route
              path="/transaction-history"
              element={<Navigate to="/sign-in" />}
            />
          )}
          {/* Redirect to admin dashboard if authenticated as admin */}
          {(userRole === 1 || userRole === 2) && (
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          )}
          {/* Conditional rendering for admin dashboard */}
          {userRole === 1 || userRole === 2 ? (
            <Route path="/admin/*" element={<AdminLayoutPage />} />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/sign-in" />} />
          )}
          <Route path="*" element={<NotFound />}></Route>
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

function withRole(Component, allowedRoles) {
  return class WithRole extends React.Component {
    render() {
      const userRole = this.props.userRole;

      if (allowedRoles.includes(userRole)) {
        return <Component {...this.props} />;
      } else {
        return <NotAuthorized />;
      }
    }
  };
}

export default App;
