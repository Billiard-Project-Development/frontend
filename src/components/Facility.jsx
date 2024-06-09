import React from "react";

import Facility1 from "../assets/Facility/ruang_tunggu.webp";
import Facility2 from "../assets/Facility/food_and_beverage.webp";
import Facility3 from "../assets/Facility/tournament.webp";
import Facility4 from "../assets/Facility/receptionist.webp";

const data = [
  {
    img: Facility1,
    header: "Ruang Tunggu",
    text: "Santai sejenak sebelum permainan Anda dalam ruang tunggu yang nyaman"
  },
  {
    img: Facility2,
    header: "Food & Beverages",
    text: "Nikmati pilihan makanan dan minuman untuk menemani permainan Anda"
  },
  {
    img: Facility3,
    header: "Tournament Events",
    text: "Bergabunglah dalam turnamen kami yang penuh dengan persaingan seru dan hadiah menarik"
  },
  {
    img: Facility4,
    header: "Resepsionis Ramah dan Profesional",
    text: "Tim kami siap membantu Anda dengan ramah dan profesional selama kunjungan Anda"
  }
];

const Facility = () => {
  return (
    <div className="flex flex-col items-center gap-10 pb-[500px]">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="font-bold text-32 text-primaryBlack pt-32">Fasilitas</h1>
        <h2 className="text-24 text-center max-w-[1200px]">
          Dengan suasana yang ramah dan layanan yang prima, kami menawarkan
          fasilitas yang lengkap untuk memastikan pengalaman bermain Anda lebih
          dari sekadar permainan.
        </h2>

        <div className="grid grid-cols-4 gap-x-32 gap-y-16 mx-auto">
          {data?.map((facility, index) => (
            <div
              key={index}
              className="flex flex-col p-5  items-center text-center bg-primaryWhite w-[280px] h-[480px] rounded-lg"
            >
              <img
                className="h-[240px] w-[240px]"
                src={facility?.img}
                alt={facility?.header}
              />
              <div className="flex flex-col gap-6">
                <div className="text-20 font font-semibold">
                  {facility?.header}
                </div>
                <div className="text-16">{facility?.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facility;
