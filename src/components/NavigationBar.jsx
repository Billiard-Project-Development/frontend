import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [visable, setVisable] = useState(true);
  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > prevScrollPosition) {
      setVisable(false);
    } else {
      setVisable(true);
    }
    setPrevScrollPosition(currentScrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const [currentPage, setCurrentPage] = useState("/");
  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  console.log("visable:", visable);
  return (
    <div
      className={`w-full fixed top-0 z-10  bg-primaryBlack transition-all ease-in-out duration-150 delay-75 mx-auto ${
        visable ? "bg-opacity-0" : "bg-opacity-100"
      }  text-white`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:flex-nowrap py-8">
        <div className="border flex items-center flex-row-reverse flex-wrap font-bold">
          <Link
            id="navigateToHomeLogo"
            className="flex justify-center items-center visible static md:visible w-32 sm:w-36 sm:only:h-8  sm:mr-3 "
            href="/"
          >
            BILLIARD
          </Link>
        </div>
        <div className="flex gap-3 text-xl">
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              currentPage === "/" ? "text-primaryOrange" : "text-PrimaryWhite"
            } `}
            href="/"
          >
            Beranda
          </Link>
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              currentPage === "/galeri"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            href="/"
          >
            Galeri
          </Link>
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              currentPage === "/booking"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            href="/"
          >
            Booking
          </Link>
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              currentPage === "/fasilitas"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            href="/"
          >
            Fasilitas
          </Link>
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              currentPage === "/events"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            href="/"
          >
            Events
          </Link>
          <Link
            id="navigateToHomeText"
            className={` hover:text-primaryOrange transition-all ease-in-out duration-200 rounded  ${
              currentPage === "/kontak"
                ? "text-primaryOrange"
                : "text-PrimaryWhite"
            } `}
            href="/"
          >
            Kontak
          </Link>
        </div>
        <div className="pl-40">
          <button className="flex bg-primaryOrange px-3 py-2 text-white hover:bg-opacity-90 transition-all ease-in-out duration-200 rounded-md">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
