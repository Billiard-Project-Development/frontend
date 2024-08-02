import {
  CaretLeft,
  CheckCircle,
  Coins,
  MinusCircle,
  XCircle
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { format, isValid, parse } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../components/InputText";
import ContinueLoader1 from "../components/loaders/ContinueLoader1";
import DetailTransactionHistoryPopup from "../components/popup/detailTransactionHistoryPopup";
import { getTransactionByUserId } from "../redux/actions/transaction/transaction";
import { getUserInfo } from "../utils/auth";
import { parseCustomDate } from "../utils/dateUtils";
const TransactionHistory = () => {
  const userInfo = getUserInfo();
  const dispatch = useDispatch();

  const {
    getTransactionByUserIdLoading,
    getTransactionByUserIdSuccess,
    getTransactionByUserIdError,
    getTransactionByUserIdResponse
  } = useSelector((state) => state.getTransactionByUserId);

  const dataTransactionHistory = getTransactionByUserIdResponse;

  console.log("dataHistory:", dataTransactionHistory);

  useEffect(() => {
    dispatch(getTransactionByUserId(userInfo?.user_id));
  }, [dispatch]);

  console.log("userInfo:", userInfo);
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
  const [selectedTransactionData, setSelectedTransactionData] = useState(null);
  const handleSelectTransaction = (data) => {
    setSelectedTransactionData(data);
    setOpenPopup(true);
  };
  console.log("data ini:", selectedTransactionData);
  console.log("openPopup:", openPopup);
  console.log("getTransactionByUserIdLoading:", getTransactionByUserIdLoading);

  return (
    <>
      <DetailTransactionHistoryPopup
        isOpen={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
        data={selectedTransactionData}
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
          {getTransactionByUserIdLoading === true ? (
            <div className="flex items-center justify-center h-screen">
              <ContinueLoader1 />
            </div>
          ) : (
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
                {dataTransactionHistory?.data?.map((history, index) => (
                  <>
                    {getTransactionByUserIdLoading ? (
                      <div>
                        <ContinueLoader1 />
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="p-5 flex flex-col gap-5 rounded-xl border border-primaryOrange"
                      >
                        <div className="flex justify-between">
                          {history?.statusTransaksi === "Success" ? (
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center rounded-full">
                                <CheckCircle
                                  size={32}
                                  color="#00df16"
                                  weight="fill"
                                />
                              </div>

                              <p className="text-16 font-semibold">
                                Transaksi Berhasil
                              </p>
                            </div>
                          ) : history?.statusTransaksi === "pending" ? (
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center rounded-full">
                                <MinusCircle
                                  size={32}
                                  color="#ff6b00"
                                  weight="fill"
                                />
                              </div>

                              <p className="text-16 font-semibold">
                                Transaksi Pending
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center rounded-full ">
                                <XCircle
                                  size={32}
                                  color="#ff6262"
                                  weight="fill"
                                />
                              </div>
                              <p className="text-16 font-semibold">
                                Transaksi Dibatalkan
                              </p>
                            </div>
                          )}

                          <p className="text-16 text-primaryDarkgray font-semibold">
                            {history?.transaksiId}
                          </p>
                        </div>
                        <p className="text-20 font-medium">Biaya Sewa</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Coins className="text-primaryOrange" size={12} />
                            <img
                              className="rounded-lg w-[52px] h-[52px] bg-black"
                              src={`data:image/jpeg;base64,${history?.fotoProduct}`}
                            />
                            <div className="flex flex-col gap-1">
                              <p className="text-16 font-medium">
                                Meja {history?.tableName}
                              </p>
                              <p className="text-16 font-medium text-primaryDarkgray">
                                {format(
                                  parseCustomDate(history?.tanggalTransaksi),
                                  "dd MMM yyyy"
                                )}{" "}
                                -{" "}
                                {history?.produk?.jamMain.map(
                                  (hour, index) => hour + " "
                                )}
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
                    )}
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
