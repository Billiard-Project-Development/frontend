import React from "react";
import meja1 from "../assets/CardImageGallery/galleryImage1.webp";
import { Garage, MapPin } from "@phosphor-icons/react";
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
  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col gap-5 items-center justify-center">
          <h1 className="font-bold text-3xl text-primaryBlack pt-32">
            Booking Meja
          </h1>
          <h2 className="text-2xl text-center max-w-[1200px]">
            Pesan meja Anda dengan mudah dan cepat, pilih waktu Anda, dan kami
            akan menyiapkan semuanya
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-x-32 gap-y-16 mx-auto">
          {" "}
          {data?.map((table, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 items-center justify-center w-[320px] h-[487px] bg-primaryWhite rounded-2xl p-5"
            >
              <img
                className="w-[280px] h-[240px]"
                src={table.img}
                alt="meja1"
              />
              <div className="flex flex-col gap-3 w-full">
                <h3 className="font-semibold text-2xl">Meja 1</h3>
                <p className="text-xs">{table?.desc}</p>
                <div className="flex gap-3 itemx-center">
                  <Garage className="text-primaryOrange" size={20} />
                  <span className="">Billiard</span>
                </div>
                <div className="flex gap-3 itemx-center">
                  <MapPin className="text-primaryOrange" size={20} />
                  <span className="">Location</span>
                </div>
                <button className="flex items-center w-full justify-center bg-primaryOrange px-3 py-2 text-white hover:bg-opacity-90 transition-all ease-in-out duration-200 rounded-md">
                  Booking Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookTable;
