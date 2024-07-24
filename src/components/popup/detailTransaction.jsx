import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { getUserInfo } from "../../utils/auth";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../../redux/actions/transaction/transaction";
import ContinueLoader1 from "../loaders/ContinueLoader1";
import { resetStateCreateTransaction } from "../../redux/features/transaction/createTransactionSlice";

export default function DetailTransaction(props) {
  const { isOpen, onClose, data, bookingData } = props;
  const {
    createTransactionResponse,
    createTransactionLoading,
    createTransactionError,
    createTransactionSuccess
  } = useSelector((state) => state.createTransaction);

  const createTransactionData = createTransactionResponse?.data;
  const userInfo = getUserInfo();
  const dispatch = useDispatch();

  console.log("yas userInfo:", userInfo);
  console.log("yas data:", data);
  console.log("yas bookingData:", bookingData);

  const dataPayment = {
    ...bookingData,
    produk: { ...bookingData?.produk }
  };
  delete dataPayment?.produk?.tanggalMain;

  const handlePayment = () => {
    dispatch(createTransaction(dataPayment));
  };
  console.log("yas createTransactionResponse:", createTransactionResponse);
  useEffect(() => {
    if (createTransactionData !== null && createTransactionSuccess) {
      const url =
        createTransactionData?.responseMidtrans?.response?.redirect_url;
      window.open(url, "blank", "noreferrer");
      dispatch(resetStateCreateTransaction());
    }
  }, [createTransactionData]);
  if (!isOpen) return null;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 font-body" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {createTransactionLoading ? (
                  <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="w-full h-full flex items-center justify-center">
                      <ContinueLoader1 />
                    </div>
                  </Dialog.Panel>
                ) : (
                  <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex items-center pb-5 justify-between border-b-2 border-primarySoftgray p">
                      <Dialog.Title
                        as="h3"
                        className="text-20 font-semibold leading-6 text-primaryBlack"
                      >
                        Pesanan Sudah Benar?
                      </Dialog.Title>
                      <p className="text-16 text-primaryDarkgray font-semibold">
                        {data?.orderId}
                      </p>
                    </div>

                    <div className="mt-10 ">
                      <p className="text-16 font-semibold">Rincian Order</p>
                      <div className="mt-3 flex flex-col gap-5 p-3 border border-accentSoftOrange2 rounded-xl">
                        <div className="flex flex-col gap-3 border-b-2 pb-5">
                          <p className="text-12 font-semibold">Data Penyewa</p>
                          <div className="flex flex-col gap-1">
                            <p className="text-12 text-primaryBlack font-medium">
                              {userInfo?.nama}
                            </p>
                            <p className="text-12 text-primaryDarkgray font-medium">
                              {userInfo?.no_hp}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 border-b-2 pb-5">
                          <p className="text-12 font-semibold">Biaya Sewa</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="rounded-lg w-[52px] h-[52px] bg-black"></div>
                              <div className="flex flex-col gap-1">
                                <p className="text-12 font-medium">Meja 2</p>
                                <p className="text-12 font-medium text-primaryDarkgray">
                                  {format(
                                    bookingData?.produk?.tanggalMain,
                                    "dd MMMM yyyy"
                                  )}
                                </p>
                                <div></div>
                                <p className="text-12 font-medium text-primaryDarkgray">
                                  {bookingData?.produk?.jamMain?.map(
                                    (time, index) => (
                                      <p key={index}>{time}</p>
                                    )
                                  )}
                                </p>
                              </div>
                            </div>
                            <p className="text-16 font-semibold text-primaryBlack">
                              Rp. {bookingData?.produk?.totalHarga}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <p className="text-12 font-semibold">
                            Biaya Tambahan
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-12 font-medium text-primaryBlack">
                              Biaya Transaksi
                            </p>
                            <p className="text-16 font-semibold text-primaryBlack">
                              Rp. 2000
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center w-full gap-3 mt-10">
                      <button
                        onClick={onClose}
                        className="w-full flex items-center justify-center bg-white px-3 py-2 border border-primaryOrange text-primaryOrange hover:bg-accentSoftOrange2 transition-all ease-in-out duration-200 rounded-lg"
                      >
                        Edit Pesanan
                      </button>
                      <button
                        onClick={handlePayment}
                        className="w-full flex items-center justify-center bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-lg shadow-lg"
                      >
                        Bayar Sekarang
                      </button>
                    </div>
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
