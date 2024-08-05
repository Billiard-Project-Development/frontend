import { CaretLeft, CheckCircle } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import ContinueLoader1 from "../components/loaders/ContinueLoader1";
import DetailTransaction from "../components/popup/detailTransaction";
import SignInPopup from "../components/popup/signInPopup";
import SignUpPopup from "../components/popup/signUpPopup";
import { productAvailable } from "../redux/actions/product/product";
import { getUserInfo } from "../utils/auth";

const BookingTable = () => {
  const initialData = [
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "11:00 - 12:00",
      price: 50000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "12:00 - 13:00",
      price: 50000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "13:00 - 14:00",
      price: 50000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "13:00 - 14:00",
      price: 75000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "14:00 - 15:00",
      price: 100000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "15:00 - 16:00",
      price: 100000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "16:00 - 17:00",
      price: 100000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "17:00 - 18:00",
      price: 100000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "18:00 - 19:00",
      price: 100000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "19:00 - 20:00",
      price: 100000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "20:00 - 21:00",
      price: 100000
    },
    {
      minuetes: "60",
      status: "unbooked",
      jamAvail: "21:00 - 22:00",
      price: 100000
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

  const dataAvailable = productAvailableResponse?.data;

  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [signInPopup, setSignInPopup] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [detailTransactionPopup, setDetailTransactionPopup] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [errorSelect, setErrorSelect] = useState(null);

  const handleCardClick = (index) => {
    if (selectedCardIndices.includes(index)) {
      const newSelectedIndices = selectedCardIndices.filter((i) => i !== index);
      setSelectedCardIndices(newSelectedIndices);

      const newSelectedTimes = selectedTimes.filter(
        (time) => time.jamAvail !== initialData[index].jamAvail
      );
      setSelectedTimes(newSelectedTimes);

      const newTotalPrice = newSelectedTimes.reduce(
        (acc, time) => acc + time.price,
        0
      );
      setTotalPrice(newTotalPrice);
    } else {
      const newSelectedIndices = [...selectedCardIndices, index];
      setSelectedCardIndices(newSelectedIndices);

      const newSelectedTimes = [
        ...selectedTimes,
        {
          jamAvail: initialData[index].jamAvail,
          price: initialData[index].price
        }
      ];
      setSelectedTimes(newSelectedTimes);

      const newTotalPrice = newSelectedTimes.reduce(
        (acc, time) => acc + time.price,
        initialData[index].price
      );
      setTotalPrice(newTotalPrice);
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

  const handleSwitchDetail = () => {
    setSignInPopup(false);
    setSignUpPopup(false);
    handleBooking();
    setDetailTransactionPopup(true);
  };

  const handleBooking = () => {
    if (!userInfo) {
      setSignInPopup(true);
      setErrorSelect(null);
    } else if (selectedCardIndices.length === 0) {
      setErrorSelect("Pilih jam yang tersedia");
    } else {
      const bookingData = {
        nama: userInfo.name,
        email: userInfo.email,
        noHp: userInfo.no_hp,
        produk: {
          produk_id: productId,
          totalHarga: totalPrice,
          jamMain: selectedTimes.map((time) => time.jamAvail),
          tanggalMain: date,
          foto_product: dataAvailable?.produk[0]?.foto_product
        }
      };
      setDetailTransactionPopup(true);
      setBookingData(bookingData);
      setErrorSelect(null);
    }
  };

  useEffect(() => {
    dispatch(productAvailable({ produkId: productId, tanggal: date }));
  }, [dispatch, productId, date]);

  console.log("productId:", productId);
  console.log("date:", date);

  console.log("dataAvailable:", dataAvailable);
  const compareData = (initialData, dataAvailable) => {
    const availableTimes = dataAvailable.jamAvail;
    return initialData.map((data) => {
      if (availableTimes.includes(data.jamAvail)) {
        return { ...data, status: "unbooked" };
      } else {
        return { ...data, status: "booked" };
      }
    });
  };

  const updatedInitialData = dataAvailable
    ? compareData(initialData, dataAvailable)
    : initialData;

  return (
    <>
      <SignInPopup
        isOpen={signInPopup}
        onClose={() => {
          setSignInPopup(false);
        }}
        handleSwitchSignUp={handleSwitchSignUp}
        handleSwitchDetail={handleSwitchDetail}
      />
      <SignUpPopup
        isOpen={signUpPopup}
        onClose={() => {
          setSignUpPopup(false);
        }}
        handleSwitchSignIn={handleSwitchSignIn}
      />
      <DetailTransaction
        isOpen={detailTransactionPopup}
        onClose={() => {
          setDetailTransactionPopup(false);
        }}
        bookingData={bookingData}
        handleSwitchDetail={handleSwitchDetail}
      />
      <div className="px-4 md:px-20 text-primaryBlack">
        {productAvailableLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ContinueLoader1 />
          </div>
        ) : productAvailableResponse ? (
          <div className="p-4">
            <Link to={"/"} className=" flex gap-3 items-center ">
              <CaretLeft size={32} />
              <p className="text-20 font-medium">Kembali</p>
            </Link>

            <h1 className="mt-2 text-32 font-semibold text-center">
              {dataAvailable?.produk[0]?.nama}
            </h1>

            <h2 className="mt-10 text-24 font-semibold">Pilih Waktu</h2>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-4 mx-auto">
              {updatedInitialData?.map((table, index) => {
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
                      Rp. {table?.price}
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

            {/* <div className="mt-20">
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
            </div> */}

            <button
              onClick={handleBooking}
              className="mt-20 flex bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md"
            >
              Lanjutkan Pembayaran
            </button>

            <p className="text-red-500">{errorSelect}</p>
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
