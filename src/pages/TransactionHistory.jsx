import { CaretLeft, Check, X } from "@phosphor-icons/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import InputText from "../components/InputText";
import DetailTransaction from "../components/popup/detailTransaction";

const TransactionHistory = () => {
  const data = [
    {
      status: true,
      orderId: "#billiard-221219/13052024",
      tableName: "Meja 1",
      day: "Minggu",
      date: "12 Mei 2024",
      timeStart: "13:00",
      timeEnd: "14:00",
      price: "50.000"
    },
    {
      status: false,
      orderId: "#billiard-221219/13052024",
      tableName: "Meja 1",
      day: "Minggu",
      date: "12 Mei 2024",
      timeStart: "13:00",
      timeEnd: "14:00",
      price: "50.000"
    }
  ];
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const handleSelectTransaction = (data) => {
    setSelectedTransaction(data);
    setOpenPopup(true);
  };

  console.log("openPopup:", openPopup);

  return (
    <>
      <DetailTransaction
        isOpen={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
        data={selectedTransaction}
      />
      <div className="px-20 text-primaryBlack">
        <div className="p-4 w-full">
          {/* Back Button */}
          <Link to={"/"} className=" flex gap-3 items-center ">
            <CaretLeft size={32} />
            <p className="text-20 font-medium">Kembali</p>
          </Link>

          {/* Table Header */}
          <h1 className="mt-2 text-32 font-semibold text-center">
            Riwayat Transaksi
          </h1>

          <div className="w-full max-w-[1024px] h-fit mx-auto rounded-lg bg-white p-10">
            <div className="flex  justify-between">
              <h2 className="text-24 font-semibold">Pilih Waktu</h2>
              <InputText
                type="text"
                maxWidth={400}
                label=""
                name="searchTransaction"
              />
            </div>
            <div className="mt-10 flex flex-col gap-10 w-full">
              {data?.map((history, index) => (
                <div
                  key={index}
                  className="p-5 flex flex-col gap-5 rounded-xl border border-primaryOrange"
                >
                  <div className="flex justify-between">
                    {history?.status === true ? (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full bg-accentGreen p-1">
                          <Check size={14} color="white" />
                        </div>

                        <p className="text-16 font-semibold">
                          Transaksi Berhasil
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full bg-accentRed p-1">
                          <X size={14} color="white" />
                        </div>

                        <p className="text-16 font-semibold">
                          Transaksi Dibatalkan
                        </p>
                      </div>
                    )}

                    <p className="text-16 text-primaryDarkgray font-semibold">
                      Order ID {history?.orderId}
                    </p>
                  </div>
                  <p className="text-20 font-medium">Biaya Sewa</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg w-[52px] h-[52px] bg-black"></div>
                      <div className="flex flex-col gap-1">
                        <p className="text-16 font-medium">
                          {history?.tableName}
                        </p>
                        <p className="text-16 font-medium text-primaryDarkgray">
                          {history?.day}, {history?.date}•{history?.timeStart} -{" "}
                          {history?.timeEnd}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleSelectTransaction(history);
                      }}
                      className="flex bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md"
                    >
                      Lihat Detail Transaksi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
