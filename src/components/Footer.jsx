import React from "react";
import Logo from "../assets/Logo/billiard_logo.webp";
const Footer = () => {
  return (
    <footer className="bg-primaryBlack text-primaryWhite py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <img src={Logo} alt="Brand Logo" className="w-[336px] mb-4" />
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <a href="#item1" className="hover:text-primaryOrange">
              Tentang
            </a>
            <a href="#item2" className="hover:text-primaryOrange">
              Kebijakan & Privasi
            </a>
            <a href="#item3" className="hover:text-primaryOrange">
              Syarat & Ketentuan
            </a>
            <a href="#item4" className="hover:text-primaryOrange">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
        <p className="text-sm mt-4 md:mt-0">
          &copy; 2024 billiardProject All Right Deserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
