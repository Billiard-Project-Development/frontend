import { CaretLeft, List } from "@phosphor-icons/react";
import React from "react";
import user from "../../assets/Ava/user1.webp";
import Logo from "../../assets/Logo/billiard_logo_black.webp";
import { getUserInfo } from "../../utils/auth";

const NavAdmin = (props) => {
  const userInfo = getUserInfo();
  console.log("userInfo:", userInfo);
  const { isOpenSidebar, handleSidebar } = props;
  return (
    <div className="w-full h-[88px] bg-white border-b-2 border-primarySoftgray flex items-center justify-between px-8">
      <div className="flex items-cente gap-16">
        <button
          onClick={handleSidebar}
          className="flex items-center justify-center p-2 bg-white border border-primaryOrange text-primaryOrange rounded-xl"
        >
          {isOpenSidebar ? <CaretLeft size={24} /> : <List size={24} />}
        </button>

        <img
          className={`transition-all ease-in-out duration-200 ${
            isOpenSidebar ? "opacity-0 w-0" : "opacity-100"
          }`}
          width={216}
          height={40}
          src={Logo}
          alt="Logo"
        />
      </div>

      <div className="flex items-center justify-center gap-6">
        {/* <div className="relative">
          <div className="flex items-center justify-center rounded-full border border-primaryOrange p-2">
            <Bell className="text-primaryOrange" size={24} />
          </div>
          <div className="absolute top-1 right-2 w-4 h-4 bg-primaryOrange text-white flex items-center justify-center rounded-full">
            <p className="m-0 text-10 font-extrabold">0</p>
          </div>
        </div> */}
        <div className="flex items-center gap-2">
          <img className="rounded-lg w-[52px] h-[52px] bg-black" src={user} />
          <div className="flex flex-col justify-between">
            <p className="text-20 font-bold text-primaryOrange">
              {userInfo?.nama}
            </p>
            <p className="text-14 font-semibold text-accentSoftOrange">
              {userInfo?.role === 1 ? "Super Admin" : "Admin"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavAdmin;
