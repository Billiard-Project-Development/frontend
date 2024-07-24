// Dashboard.js

import { Calendar, Table, VectorTwo, Wallet } from "@phosphor-icons/react";
import React, { useEffect, useMemo } from "react";
import bookingList from "../../booking_list.json";
import BasicTable from "../../components/admin/BasicTable";
import transaction from "../../MOCK_DATA.json";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransaction } from "../../redux/actions/transaction/transaction";
import { getAllBooking } from "../../redux/actions/booking/booking";
import ContinueLoader1 from "../../components/loaders/ContinueLoader1";

const Dashboard = () => {
  const {
    getAllBookingResponse,
    getAllBookingLoading,
    getAllBookingError,
    getAllBookingSuccess
  } = useSelector((state) => state.getAllBooking);
  const {
    getAllTransactionResponse,
    getAllTransactionLoading,
    getAllTransactionError,
    getAllTransactionSuccess
  } = useSelector((state) => state.getAllTransaction);

  const dataBooking = getAllBookingResponse?.data;
  const dataTransaction = getAllTransactionResponse?.data;

  const transactionData = useMemo(() => transaction, []);
  const bookingListData = useMemo(() => bookingList, []);
  const transactionColumns = [
    {
      header: "Nama",
      accessorKey: "namaPenyewa"
    },
    {
      header: "No HP",
      accessorKey: "noHp"
    },
    {
      header: "Lama Sewa",
      accessorKey: "lamaSewa"
    },
    {
      header: "Tanggal",
      accessorKey: "tanggalTransaksi"
    },
    {
      header: "Nominal",
      accessorKey: "totalHarga"
    },
    {
      header: "Meja",
      accessorKey: "noMeja"
    },
    {
      header: "Metode Bayar",
      accessorKey: "paymentMethod"
    }
  ];

  const bookingListColumns = [
    {
      header: "ID Booking",
      accessorKey: "bookingId"
    },
    {
      header: "Nama",
      accessorKey: "namaPenyewa"
    },
    {
      header: "No HP",
      accessorKey: "noHp"
    },
    {
      header: "Durasi Sewa",
      accessorKey: "lamaSewa"
    },
    {
      header: "Tanggal Booking",
      accessorKey: "tanggalBooking"
    },
    {
      header: "No Meja",
      accessorKey: "noMeja"
    }
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTransaction());
    dispatch(getAllBooking());
  }, [dispatch]);

  const totalHargaSum = dataTransaction?.reduce(
    (acc, curr) => acc + curr.totalHarga,
    0
  );

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
            <p className="text-16 font-semibold">Rp.{totalHargaSum}</p>
          </div>
        </div>
        <div className="flex p-3 gap-3 bg-white rounded-lg border border-primarySoftGray w-full">
          <div className="p-2 rounded-lg bg-accentSoftOrange2 text-primaryOrange">
            <Wallet size={24} />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-12">Total Transaksi</p>
            <p className="text-16 font-semibold">
              {dataTransaction?.length || 0}{" "}
            </p>
          </div>
        </div>
        <div className="flex p-3 gap-3 bg-white rounded-lg border border-primarySoftGray w-full">
          <div className="p-2 rounded-lg bg-accentSoftOrange2 text-primaryOrange">
            <Table size={24} />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-12">Meja Tersedia</p>
            <p className="text-16 font-semibold">{dataBooking?.length || 0}</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        {getAllTransactionLoading ? (
          <div className="flex items-center justify-center mt-32">
            <ContinueLoader1 />
          </div>
        ) : getAllTransactionError ? (
          <div className="flex items-center justify-center mt-32">
            {getAllTransactionError}
          </div>
        ) : getAllTransactionSuccess === true &&
          getAllBookingResponse !== null ? (
          <BasicTable
            columns={transactionColumns}
            data={dataTransaction}
            tableName={"Transaksi Masuk"}
          />
        ) : null}
      </div>
      <div className="w-full">
        {getAllBookingLoading ? (
          <div className="flex items-center justify-center mt-32">
            <ContinueLoader1 />
          </div>
        ) : getAllBookingError ? (
          <div className="flex items-center justify-center mt-32">
            {getAllBookingError}
          </div>
        ) : getAllBookingSuccess === true && getAllBookingResponse !== null ? (
          <BasicTable
            columns={bookingListColumns}
            data={dataBooking}
            tableName={"Booking List"}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
