import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo/billiard_logo.webp";
const NavigationBar = () => {
  // const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  // const [showSideNav, setShowSideNav] = useState(false);
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
  // const [currentPage, setCurrentPage] = useState("/");

  // useEffect(() => {
  //   setCurrentPage(location.pathname);
  // }, [location]);

  const [activeSection, setActiveSection] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log("visible:", visible);
  return (
    <div
      className={`w-full ${
        homeRoot ? "fixed" : "sticky"
      } top-0 z-10  bg-primaryBlack transition-all ease-in-out duration-150 delay-75 mx-auto ${
        visible && homeRoot ? "bg-opacity-0" : "bg-opacity-100"
      }  text-white `}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:flex-nowrap py-4 md:py-6 px-4 md:px-6">
        <div className="flex items-center flex-row-reverse flex-wrap font-bold">
          <Link
            id="navigateToHomeLogo"
            className="flex justify-center items-center visible static md:visible w-32 sm:w-36 sm:only:h-8  sm:mr-3 "
            to="/"
          >
            <img src={Logo} alt="Brand Logo" className="w-[336px]" />
          </Link>
        </div>
        <div className="flex gap-3 text-20">
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              activeSection === "beranda"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            to="/"
            onClick={() => scrollToSection("beranda")}
          >
            Beranda
          </Link>
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              activeSection === "galeri"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            to="/"
            onClick={() => scrollToSection("galeri")}
          >
            Galeri
          </Link>
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              activeSection === "booking"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            to="/"
            onClick={() => scrollToSection("booking")}
          >
            Booking
          </Link>
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              activeSection === "fasilitas"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            to="/"
            onClick={() => scrollToSection("fasilitas")}
          >
            Fasilitas
          </Link>
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              activeSection === "events"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            to="/"
            onClick={() => scrollToSection("events")}
          >
            Events
          </Link>
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              activeSection === "kontak"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            to="/"
            onClick={() => scrollToSection("kontak")}
          >
            Kontak
          </Link>
        </div>
        <div className="pl-40">
          <Link
            to="/sign-in"
            className="flex bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
