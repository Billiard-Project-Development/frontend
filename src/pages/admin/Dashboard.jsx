// Dashboard.js

import { Calendar, Table, VectorTwo, Wallet } from "@phosphor-icons/react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-10 w-full text-primaryBlack">
      <div className="flex items-center justify-between">
        <h1 className="text-24 font-semibold">Dashboard</h1>
        <div className="flex items-center gap-3 justify-center p-2 bg-white rounded-lg border border-primarySoftGray">
          <Calendar size={24} />
          <p className="font-medium">Senin, 13 Mei 2024 • 15:30 WIB</p>
        </div>
      </div>
      <div className="flex gap-10 w-full">
        <div className="flex p-3 gap-3 bg-white rounded-lg border border-primarySoftGray w-full">
          <div className="p-2 rounded-lg bg-accentSoftGreen text-accentGreen">
            <VectorTwo size={24} />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-12">Nominal Transaksi Masuk</p>
            <p className="text-16 font-semibold">Rp. 513.333</p>
          </div>
        </div>
        <div className="flex p-3 gap-3 bg-white rounded-lg border border-primarySoftGray w-full">
          <div className="p-2 rounded-lg bg-accentSoftOrange2 text-primaryOrange">
            <Wallet size={24} />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-12">Total Transaksi</p>
            <p className="text-16 font-semibold">5</p>
          </div>
        </div>
        <div className="flex p-3 gap-3 bg-white rounded-lg border border-primarySoftGray w-full">
          <div className="p-2 rounded-lg bg-accentSoftOrange2 text-primaryOrange">
            <Table size={24} />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-12">Meja Tersedia</p>
            <p className="text-16 font-semibold">9</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
