import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Ensure you have React Router imported
import Logo from "../../assets/Logo/billiard_logo_black.webp";
import { SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { ListChecks, Power, Table, VectorTwo } from "@phosphor-icons/react";
import { handleLogout } from "../../utils/auth";
const Sidebar = (props) => {
  const { isOpen } = props;
  const [currentPage, setCurrentPage] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const logout = () => {
    handleLogout(navigate);
  };

  return (
    <div
      className={`bg-white flex flex-col gap-16 pt-6 px-8 py-8  text-primaryBlack h-screen w-[280px] top-0 left-0 overflow-y-auto transition-all duration-300 border-2 border-primarySoftGray ${
        isOpen ? "ml-0" : "-ml-[280px]"
      }`}
    >
      <img width={216} height={40} src={Logo} alt="Logo" />
      <div className="">
        <p className="text-16">Menu</p>
        <div className="mt-4 flex flex-col gap-4">
          <Link
            to="dashboard"
            className={`flex gap-3 items-center px-2 py-1 rounded-lg transition-all ease-in-out duration-200 ${
              currentPage === "/admin/dashboard"
                ? "bg-accentSoftOrange2 text-primaryOrange font-semibold"
                : "bg-white"
            }`}
          >
            <SquaresFour size={24} /> <p>Dashboard</p>
          </Link>
          <Link
            to="transaction"
            className={`flex gap-3 items-center px-2 py-1 rounded-lg transition-all ease-in-out duration-200 ${
              currentPage === "/admin/transaction"
                ? "bg-accentSoftOrange2 text-primaryOrange font-semibold"
                : "bg-white"
            }`}
          >
            <VectorTwo size={24} /> <p>Transaksi Masuk</p>
          </Link>
          <Link
            to="booking-list"
            className={`flex gap-3 items-center px-2 py-1 rounded-lg transition-all ease-in-out duration-200 ${
              currentPage === "/admin/booking-list"
                ? "bg-accentSoftOrange2 text-primaryOrange font-semibold"
                : "bg-white"
            }`}
          >
            <ListChecks size={24} /> <p>Booking List</p>
          </Link>
          <Link
            to="tables"
            className={`flex gap-3 items-center px-2 py-1 rounded-lg transition-all ease-in-out duration-200 ${
              currentPage === "/admin/tables"
                ? "bg-accentSoftOrange2 text-primaryOrange font-semibold"
                : "bg-white"
            }`}
          >
            <Table size={24} /> <p>Meja Billiard</p>
          </Link>
        </div>
      </div>
      <div>
        <p className="text-16">Lainnya</p>
        <button
          onClick={logout}

          className="mt-4 flex gap-3 px-2 py-1 w-full items-center text-start cursor-pointer text-accentRed rounded-lg transition-all ease-in-out duration-200 hover:bg-accentSoftOrange2"
        >
          <Power size={21} />
          <p className="font font-semibold w-full">Keluar</p>

        </button>
      </div>
    </div>
  );
};

export default Sidebar;
