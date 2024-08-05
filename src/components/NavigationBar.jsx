import { Coins, List, SignOut, User, X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo/billiard_logo.webp";
import { getUserInfo, handleLogout } from "../utils/auth";
import { scrollToSection } from "../utils/scrollUtils";

const NavigationBar = () => {
  const [visible, setVisible] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const userInfo = getUserInfo();
  const navigate = useNavigate();
  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    setVisible(currentScrollPosition === 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const homeRoot = location.pathname === "/";
  const [activeSection, setActiveSection] = useState(null);
  const [userDropDown, setUserDropDown] = useState(false);

  const logout = () => {
    handleLogout(navigate);
  };

  return (
    <div>
      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-primaryBlack bg-opacity-95 transform ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/" onClick={() => setSidebarVisible(false)}>
            <img src={Logo} alt="Brand Logo" className="w-32" />
          </Link>
          <button
            onClick={() => setSidebarVisible(false)}
            className="text-white"
          >
            <X size={32} />
          </button>
        </div>
        <div className="flex flex-col gap-3 text-20 p-4">
          {[
            "beranda",
            "galeri",
            "booking",
            "fasilitas",
            "events",
            "kontak"
          ].map((section) => (
            <Link
              key={section}
              id="navigateToHomeText"
              className={`hover:text-primaryOrange transition-all ease-in-out duration-200 rounded hover:bg-white lg:hover:bg-none py-1 px-2 ${
                activeSection === section
                  ? "text-primaryOrange"
                  : "text-PrimaryWhite"
              }`}
              to="/"
              onClick={() => {
                scrollToSection(section);
                setSidebarVisible(false);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
          {userInfo ? (
            <div className="flex flex-col gap-3">
              <Link
                to="/transaction-history"
                onClick={() => setSidebarVisible(false)}
                className="flex items-center py-1 px-2 gap-3 hover:bg-primarySoftgray transition-all ease-in-out rounded-lg"
              >
                <Coins size={24} />
                <p>Riwayat Transaksi</p>
              </Link>
              <button
                onClick={logout}
                className="flex items-center py-1 px-2 gap-3 w-full text-left hover:bg-primarySoftgray transition-all ease-in-out rounded-lg"
              >
                <SignOut size={24} />
                <p>Logout</p>
              </button>
            </div>
          ) : (
            <div>
              <Link
                to="/sign-in"
                className="flex bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md"
                onClick={() => setSidebarVisible(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full ${
          homeRoot ? "fixed" : "sticky"
        } top-0 z-10 bg-primaryBlack transition-all ease-in-out duration-150 delay-75 mx-auto ${
          visible && homeRoot ? "bg-opacity-0" : "bg-opacity-100"
        } text-white lg:flex lg:items-center lg:justify-between px-6 py-4`}
      >
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link id="navigateToHomeLogo" to="/" className="flex items-center">
            <img src={Logo} alt="Brand Logo" className="w-32 sm:w-36" />
          </Link>
          <button
            onClick={() => setSidebarVisible(true)}
            className="lg:hidden text-white"
          >
            <List size={32} />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-3 lg:text-lg">
          {[
            "beranda",
            "galeri",
            "booking",
            "fasilitas",
            "events",
            "kontak"
          ].map((section) => (
            <Link
              key={section}
              id="navigateToHomeText"
              className={`hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
                activeSection === section
                  ? "text-primaryOrange"
                  : "text-PrimaryWhite"
              }`}
              to="/"
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </div>
        {userInfo ? (
          <div className="hidden lg:flex lg:items-center lg:relative">
            <button
              onClick={() => setUserDropDown((current) => !current)}
              className="flex items-center"
            >
              <User size={32} />
            </button>
            {userDropDown && (
              <div className="absolute right-0 top-8 mt-2 w-64 bg-white rounded-md shadow-lg px-2 py-4 text-16 font-semibold text-primaryOrange">
                <div className="flex flex-col gap-3">
                  <Link
                    to="/transaction-history"
                    onClick={() => setUserDropDown(false)}
                    className="flex items-center py-1 px-2 gap-3 hover:bg-primarySoftgray transition-all ease-in-out rounded-lg"
                  >
                    <Coins size={24} />
                    <p>Riwayat Transaksi</p>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center py-1 px-2 gap-3 w-full text-left hover:bg-primarySoftgray transition-all ease-in-out rounded-lg"
                  >
                    <SignOut size={24} />
                    <p>Logout</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:block lg:pl-40">
            <Link
              to="/sign-in"
              className="flex bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
