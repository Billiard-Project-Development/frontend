import { CaretLeft, CheckCircle } from "@phosphor-icons/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputText from "../components/InputText";
import SignInPopup from "../components/popup/signInPopup";
import SignUpPopup from "../components/popup/signUpPopup";

const BookingTable = () => {
  const data = [
    {
      minuetes: "60",
      status: "unbooked",
      timeStart: "13:00",
      timeEnd: "14:00",
      price: "50.000"
    },
    {
      minuetes: "90",
      status: "unbooked",
      timeStart: "14:00",
      timeEnd: "15:30",
      price: "75.000"
    },
    {
      minuetes: "120",
      status: "unbooked",
      timeStart: "15:30",
      timeEnd: "16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "unbooked",
      timeStart: "15:30",
      timeEnd: "16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "unbooked",
      timeStart: "15:30",
      timeEnd: "16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "unbooked",
      timeStart: "15:30",
      timeEnd: "16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "booked",
      timeStart: "15:30",
      timeEnd: "16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "booked",
      timeStart: "15:30",
      timeEnd: "16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "booked",
      timeStart: "15:30",
      timeEnd: "16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "booked",
      timeStart: "15:30",
      timeEnd: "16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "booked",
      timeStart: "15:30",
      timeEnd: "16:00",
      price: "100.000"
    }
  ];

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [signInPopup, setSignInPopup] = useState(true);
  const [signUpPopup, setSignUpPopup] = useState(false);
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const handleSwitchSignIn = () => {
    setSignInPopup(true);
    setSignUpPopup(false);
  };

  const handleSwitchSignUp = () => {
    setSignInPopup(false);
    setSignUpPopup(true);
  };

  console.log("selectedCardIndex:", selectedCardIndex);

  return (
    <>
      <SignInPopup
        isOpen={signInPopup}
        onClose={() => {
          setSignInPopup(false);
        }}
        handleSwitchSignUp={handleSwitchSignUp}
      />
      <SignUpPopup
        isOpen={signUpPopup}
        onClose={() => {
          setSignUpPopup(false);
        }}
        handleSwitchSignIn={handleSwitchSignIn}
      />
      <div className="px-20 text-primaryBlack">
        <div className="p-4">
          {/* Back Button */}
          <Link to={"/"} className=" flex gap-3 items-center ">
            <CaretLeft size={32} />
            <p className="text-20 font-medium">Kembali</p>
          </Link>

          {/* Table Header */}
          <h1 className="mt-2 text-32 font-semibold text-center">Meja</h1>

          {/* Choose Time Header */}
          <h2 className="mt-10 text-24 font-semibold">Pilih Waktu</h2>

          {/* Time Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-4 mx-auto">
            {data?.map((table, index) => {
              const isBooked = table?.status === "booked";
              const isSelected = selectedCardIndex === index;
              return (
                <div
                  key={index}
                  className={`relative flex flex-col gap-1 items-center justify-center max-w-[200px] max-h-[96px] border py-3 rounded-xl transition-all ease-in-out duration-200 ${
                    isBooked
                      ? "bg-primarySoftgray cursor-not-allowed text-primaryDarkgray"
                      : isSelected
                      ? "bg-accentSoftOrange2 border-primaryOrange"
                      : "bg-white"
                  } cursor-pointer`}
                  onClick={() => !isBooked && handleCardClick(index)}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="text-primaryOrange" />
                    </div>
                  )}
                  <div className="relative w-full flex justify-center items-center">
                    <p className="text-12 font-semibold">
                      {table?.minuetes} menit
                    </p>
                  </div>
                  <p className="text-16 font-semibold">
                    {table?.timeStart} - {table?.timeEnd}
                  </p>
                  <p
                    className={`${
                      isBooked ? "text-primaryDarkgray" : "text-primaryOrange"
                    } text-12 font-semibold`}
                  >
                    Rp. {table?.price}
                  </p>
                </div>
              );
            })}

            {/* Add more time slots as needed */}
          </div>

          <div className="mt-10">
            <p className="text-16 text-primaryBlack">
              Catatan: Tipe bermain LOSS merupakan tipe order tanpa batasan jam,
              dan total biaya diakumulasi dari banyaknya jam bermain
            </p>
          </div>

          {/* Renter Data Input */}
          <div className="mt-20">
            <label className="block mb-2 text-sm font-medium">
              Data Penyewa
            </label>
            <div className="mt-5 flex gap-10">
              <InputText
                label="Atas Nama"
                type="text"
                name="Name"
                maxWidth={512}
              />
              <InputText
                label="Nomor HP"
                type="tel"
                name="Phone"
                maxWidth={512}
              />
            </div>
          </div>

          {/* Proceed Button */}
          <button className="mt-20 flex bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md">
            Lanjutkan Pembayaran
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingTable;
