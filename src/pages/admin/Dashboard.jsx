// Dashboard.js

import { Calendar, Table, VectorTwo, Wallet } from "@phosphor-icons/react";
import React, { useMemo } from "react";
import bookingList from "../../booking_list.json";
import BasicTable from "../../components/admin/BasicTable";
import transaction from "../../MOCK_DATA.json";

const Dashboard = () => {
  const transactionData = useMemo(() => transaction, []);
  const bookingListData = useMemo(() => bookingList, []);
  const transactionColumns = [
    {
      header: "Nama",
      accessorKey: "name"
    },
    {
      header: "No HP",
      accessorKey: "phone"
    },
    {
      header: "Lama Sewa",
      accessorKey: "duration"
    },
    {
      header: "Tanggal",
      accessorKey: "date"
    },
    {
      header: "Nominal",
      accessorKey: "price"
    },
    {
      header: "Meja",
      accessorKey: "table"
    },
    {
      header: "Metode Bayar",
      accessorKey: "transaction_method"
    }
  ];

  const bookingListColumns = [
    {
      header: "ID Booking",
      accessorKey: "id_booking"
    },
    {
      header: "Nama",
      accessorKey: "name"
    },
    {
      header: "No HP",
      accessorKey: "phone"
    },
    {
      header: "Durasi Sewa",
      accessorKey: "rent_duration"
    },
    {
      header: "Tanggal Booking",
      accessorKey: "date"
    },
    {
      header: "No Meja",
      accessorKey: "table"
    }
  ];

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
      <div className="w-full">
        <BasicTable columns={transactionColumns} data={transactionData} />
      </div>
      <div className="w-full">
        <BasicTable columns={bookingListColumns} data={bookingListData} />
      </div>
    </div>
  );
};

export default Dashboard;
