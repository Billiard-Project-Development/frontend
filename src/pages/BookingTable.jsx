import { CaretLeft, CheckCircle } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import InputText from "../components/InputText";
import ContinueLoader1 from "../components/loaders/ContinueLoader1";
import SignInPopup from "../components/popup/signInPopup";
import SignUpPopup from "../components/popup/signUpPopup";
import { productAvailable } from "../redux/actions/product/product";
import { getUserInfo } from "../utils/auth";

const BookingTable = () => {
  const initialData = [
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "13:00 - 14:00",
      price: "50.000"
    },
    {
      minuetes: "90",
      status: "unbooked",
      jamAvail: "14:00 - 15:30",
      price: "75.000"
    },
    {
      minuetes: "120",
      status: "unbooked",
      jamAvail: "15:30 - 16:00",

      price: "100.000"
    },
    {
      minuetes: "120",
      status: "unbooked",
      jamAvail: "15:30 - 16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "unbooked",
      jamAvail: "15:30 - 16:00",

      price: "100.000"
    },
    {
      minuetes: "120",
      status: "unbooked",
      jamAvail: "15:30 - 16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "booked",
      jamAvail: "15:30 - 16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "booked",
      jamAvail: "15:30 - 16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "booked",
      jamAvail: "15:30- 16:00",

      price: "100.000"
    },
    {
      minuetes: "120",
      status: "booked",
      jamAvail: "15:30 - 16:00",
      price: "100.000"
    },
    {
      minuetes: "120",
      status: "booked",
      jamAvail: "15:30 - 16:00",
      price: "100.000"
    }
  ];

  const userInfo = getUserInfo();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const date = location?.state?.date;
  const productId = searchParams.get("productId");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const {
    productAvailableResponse,
    productAvailableError,
    productAvailableSuccess,
    productAvailableLoading
  } = useSelector((state) => state.productAvailable);
  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [signInPopup, setSignInPopup] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);

  const handleCardClick = (index) => {
    if (selectedCardIndices.includes(index)) {
      setSelectedCardIndices(selectedCardIndices.filter((i) => i !== index));
    } else {
      setSelectedCardIndices([...selectedCardIndices, index]);
    }
  };

  const handleSwitchSignIn = () => {
    setSignInPopup(true);
    setSignUpPopup(false);
  };

  const handleSwitchSignUp = () => {
    setSignInPopup(false);
    setSignUpPopup(true);
  };

  const handleBooking = () => {
    if (!userInfo) {
      setSignInPopup(true);
    }
  };

  useEffect(() => {
    dispatch(productAvailable({ produkId: productId, tanggal: date }));
  }, [dispatch]);

  console.log("productId:", productId);
  console.log("date:", date);

  const dataAvailable = productAvailableResponse?.data;

  console.log("dataAvailable:", dataAvailable);

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
        {productAvailableLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ContinueLoader1 />
          </div>
        ) : productAvailableResponse ? (
          <div className="p-4">
            {/* Back Button */}
            <Link to={"/"} className=" flex gap-3 items-center ">
              <CaretLeft size={32} />
              <p className="text-20 font-medium">Kembali</p>
            </Link>

            {/* Table Header */}
            <h1 className="mt-2 text-32 font-semibold text-center">
              {dataAvailable?.produk[0]?.nama}
            </h1>

            {/* Choose Time Header */}
            <h2 className="mt-10 text-24 font-semibold">Pilih Waktu</h2>

            {/* Time Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-4 mx-auto">
              {initialData?.map((table, index) => {
                const isBooked = table?.status === "booked";
                const isSelected = selectedCardIndices.includes(index);
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
                    <p className="text-16 font-semibold">{table?.jamAvail}</p>
                    <p
                      className={`${
                        isBooked ? "text-primaryDarkgray" : "text-primaryOrange"
                      } text-12 font-semibold`}
                    >
                      Rp. {dataAvailable?.produk[0]?.harga}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <p className="text-16 text-primaryBlack">
                Catatan: Tipe bermain LOSS merupakan tipe order tanpa batasan
                jam, dan total biaya diakumulasi dari banyaknya jam bermain
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
            <button
              onClick={handleBooking}
              className="mt-20 flex bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md"
            >
              Lanjutkan Pembayaran
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            no data found
          </div>
        )}
      </div>
    </>
  );
};

export default BookingTable;
