import React, { useEffect, useState } from "react";
import meja1 from "../assets/CardImageGallery/galleryImage1.webp";
import { Garage, MapPin } from "@phosphor-icons/react";
import TimeFilter from "./TimeFilter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { getProductByDate } from "../redux/actions/product/product";
import ContinueLoader1 from "./loaders/ContinueLoader1";
const BookTable = () => {
  const data = [
    {
      img: meja1,
      desc: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
    },
    {
      img: meja1,
      desc: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
    },
    {
      img: meja1,
      desc: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
    },
    {
      img: meja1,
      desc: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
    },
    {
      img: meja1,
      desc: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
    }
  ];

  const {
    getProductByDateResponse,
    getProductByDateLoading,
    getProductByDateSuccess,
    getProductByDateError
  } = useSelector((state) => state.getProductByDate);

  const dataProductByDate = getProductByDateResponse?.data;

  console.log("getProductByDateResponse:", getProductByDateResponse);

  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());

  // useEffect(() => {
  //   dispatch(getProductByDate(format(selectedDate, "yyyy-MM-dd")));
  // }, [selectedDate]);

  useEffect(() => {
    dispatch(getProductByDate(format(selectedDate, "yyyy-MM-dd")));
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    console.log("Selected Date:", date);
    setSelectedDate(date);
  };

  return (
    <>
      <div id="booking" className="flex flex-col items-center gap-10">
        <div className="flex flex-col gap-5 items-center justify-center">
          <h1 className="font-bold text-32 text-primaryBlack pt-32">
            BOOKING MEJA
          </h1>
          <h2 className="text-24 text-center max-w-[1200px]">
            Pesan meja Anda dengan mudah dan cepat, pilih waktu Anda, dan kami
            akan menyiapkan semuanya
          </h2>
        </div>
        <TimeFilter onDateSelect={handleDateSelect} />
        <div className="flex justify-center lg:min-h-[1038px]">
          {getProductByDateLoading ? (
            <div className="mt-40">
              <ContinueLoader1 />
            </div>
          ) : data?.length === 0 ? (
            <div className="mt-40">
              <p>no data found</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-x-32 gap-y-16 mx-auto">
              {" "}
              {dataProductByDate?.map((table, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 items-center justify-center w-[320px] h-[487px] bg-primaryWhite rounded-2xl p-5"
                >
                  <img
                    className="w-[280px] h-[240px]"
                    src={`data:image/jpeg;base64,${table?.foto_product}`}
                    alt="meja1"
                  />
                  <div className="flex flex-col gap-3 w-full">
                    <h3 className="font-semibold text-24">{table?.nama}</h3>
                    <p className="text-12">{table?.desc}</p>
                    <div className="flex gap-3 itemx-center">
                      <Garage className="text-primaryOrange" size={20} />
                      <span className="">Billiard</span>
                    </div>
                    <div className="flex gap-3 itemx-center">
                      <MapPin className="text-primaryOrange" size={20} />
                      <span className="">Location</span>
                    </div>
                    <Link
                      to={`/booking-table?productId=${table?.product_id}`}
                      state={{ date: selectedDate }}
                      className="flex items-center w-full justify-center bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md"
                    >
                      Booking Sekarang
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookTable;
