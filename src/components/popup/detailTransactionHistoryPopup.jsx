import { Dialog, Transition } from "@headlessui/react";
import {
  CheckCircle,
  Coins,
  MinusCircle,
  X,
  XCircle
} from "@phosphor-icons/react";
import { format } from "date-fns";
import React, { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { parseCustomDate } from "../../utils/dateUtils";
import html2canvas from "html2canvas";

export default function DetailTransactionHistoryPopup(props) {
  const { isOpen, onClose, data } = props;

  const dispatch = useDispatch();
  const printRef = React.useRef();

  console.log("data popup:", data);

  const biayaTransaksi = 2000;
  const handleDownloadInvoice = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

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
                  <div ref={printRef} className="flex flex-col gap-10 pt-2">
                    <div className="flex flex-col gap-5 divide-y-2 divide-primarySoftgray">
                      <div className="flex items-center justify-between ">
                        {data?.statusTransaksi === "Success" ? (
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
                        ) : data?.statusTransaksi ? (
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
                          {data?.transaksiId}
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
                            parseCustomDate(data?.tanggalTransaksi),
                            "dd MMM yyyy"
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
                              {data?.namaPenyewa}
                            </p>

                            <p className="text-12 text-primaryDarkgray font-semibold">
                              {data?.noHp}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 pt-4">
                          <p className="text-12">Biaya Sewa</p>
                          <div className="flex items-center justify-between ">
                            <div className="flex items-center gap-3">
                              <Coins className="text-primaryOrange" size={12} />
                              <img
                                className="rounded-lg w-[52px] h-[52px] bg-black"
                                src={`data:image/jpeg;base64,${data?.fotoProduct}`}
                              />
                              <div className="flex flex-col gap-1">
                                <p className="text-12">
                                  Meja {data?.productId}
                                </p>
                                <p className="text-12 font-medium text-primaryDarkgray">
                                  {format(
                                    parseCustomDate(data?.tanggalTransaksi),
                                    "dd MMM yyyy"
                                  )}{" "}
                                  {data?.produk?.jamMain.map(
                                    (hour, index) => hour + " "
                                  )}
                                </p>
                              </div>
                            </div>
                            <p className="text-16 font-semibold">
                              Rp. {data?.totalHarga}
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
                        Rp. {data?.totalHarga + biayaTransaksi}
                      </p>
                    </div>
                    <div className="flex flex-col gap-8 w-full ">
                      <button
                        onClick={handleDownloadInvoice}
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
