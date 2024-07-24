import { Dialog, Transition } from "@headlessui/react";
import { CheckCircle, Coins, X, XCircle } from "@phosphor-icons/react";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

export default function DetailTransactionHistory(props) {
  const { isOpen, onClose, data } = props;

  const dispatch = useDispatch();

  console.log("data popup:", data);

  const biayaTransaksi = 2000;

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
                <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                  <div className="absolute top-5 right-5 text-primaryBlack">
                    <button
                      className=""
                      onClick={() => {
                        onClose();
                      }}
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-10 pt-2">
                    <div className="flex flex-col gap-5 divide-y-2 divide-primarySoftgray">
                      <div className="flex items-center justify-between ">
                        {data?.status_transaksi === "Success" ? (
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center rounded-full ">
                              <CheckCircle
                                size={40}
                                color="#00df16"
                                weight="fill"
                              />
                            </div>

                            <h1 className="text-20 font-semibold">
                              Transaksi Berhasil
                            </h1>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center rounded-full ">
                              <XCircle
                                size={40}
                                color="#ff6262"
                                weight="fill"
                              />
                            </div>

                            <h1 className="text-20 font-semibold">
                              Transaksi Dibatalkan
                            </h1>
                          </div>
                        )}

                        <p className="text-12 text-primaryDarkgray font-semibold">
                          {data?.transaksi_id}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-5">
                        {" "}
                        <p className="text-16 font-semibold text-primaryBlack">
                          Tanggal Transaksi
                        </p>{" "}
                        <p className="text-16 ">
                          {" "}
                          {format(
                            new Date(data?.tanggal_transaksi),
                            "dd MMMM yyyy"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-16 font-semibold">Rincian Order</p>

                      <div className="flex flex-col gap-4 divide-y-2 divide-primarySoftgray border border-primaryOrange rounded-lg p-3">
                        <div className="flex flex-col gap-3">
                          <p className="text-12">Data Penyewa</p>
                          <div className="flex flex-col gap-1">
                            <p className="text-14 font-semibold">
                              {data?.nama_penyewa}
                            </p>

                            <p className="text-12 text-primaryDarkgray font-semibold">
                              {data?.no_hp}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 pt-4">
                          <p className="text-12">Biaya Sewa</p>
                          <div className="flex items-center justify-between ">
                            <div className="flex items-center gap-3">
                              <Coins className="text-primaryOrange" size={12} />
                              <div className="rounded-lg w-[52px] h-[52px] bg-black"></div>
                              <div className="flex flex-col gap-1">
                                <p className="text-12">
                                  Meja {data?.produk?.produk_id}
                                </p>
                                <p className="text-12 font-medium text-primaryDarkgray">
                                  {format(
                                    new Date(data?.tanggal_transaksi),
                                    "dd MMM yyyy"
                                  )}{" "}
                                  {data?.produk?.jamMain.map(
                                    (hour, index) => hour + " "
                                  )}
                                </p>
                              </div>
                            </div>
                            <p className="text-16 font-semibold">
                              Rp. {data?.total_harga}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 pt-4">
                          <p className="text-12">Biaya Tambahan</p>
                          <div className="flex items-center justify-between ">
                            <div className="flex items-center gap-3">
                              <Coins className="text-primaryOrange" size={12} />
                              <p className="text-12">Biaya Transaksi</p>
                            </div>

                            <p className="text-16 font-semibold">
                              Rp. {biayaTransaksi}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-16 font-semibold">Total</p>
                      <p className="text-16 font-semibold">
                        Rp. {data?.total_harga + biayaTransaksi}
                      </p>
                    </div>
                    <div className="flex flex-col gap-8 w-full ">
                      <button
                        onClick={onClose}
                        id="downloadInvoiceButton"
                        className="flex items-center justify-center bg-primaryOrange py-3 text-center text-white rounded-lg w-full hover:bg-accentDarkOrange transition duration-300 delay-100"
                        aria-label="Toggle Submit"
                        type="submit"
                      >
                        Unduh Invoice
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
