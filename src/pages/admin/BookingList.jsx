import { Wallet } from "@phosphor-icons/react";
import React from "react";
const BookingList = () => {
  return (
    <div>
      <div className="flex w-[352px] p-3 bg-primaryWhite rounded-xl items-center gap-3">
        <div className="bg-accentSoftOrange2 rounded-lg flex p-1 items-center text-primaryOrange">
          <Wallet size={32} />
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <p className="text-12 font-normal">Total Transaksi</p>
          <p className="text-16 font-semibold">5</p>
        </div>
      </div>

      <Wallet size={32} />
    </div>
  );
};

export default BookingList;
