import React from "react";
import Slider from "react-slick";

import Events1 from "../assets/Events/image_1.webp";
import Events2 from "../assets/Events/image_2.webp";
import Events3 from "../assets/Events/image_3.webp";

const Events = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  const data = [
    {
      img: Events1,
      header: "Ruang Tunggu",
      text: "Santai sejenak sebelum permainan Anda dalam ruang tunggu yang nyaman"
    },
    {
      img: Events2,
      header: "Food & Beverages",
      text: "Nikmati pilihan makanan dan minuman untuk menemani permainan Anda"
    },
    {
      img: Events3,
      header: "Tournament Events",
      text: "Bergabunglah dalam turnamen kami yang penuh dengan persaingan seru dan hadiah menarik"
    },
    {
      img: Events1,
      header: "Resepsionis Ramah dan Profesional",
      text: "Tim kami siap membantu Anda dengan ramah dan profesional selama kunjungan Anda"
    },
    {
      img: Events2,
      header: "Food & Beverages",
      text: "Nikmati pilihan makanan dan minuman untuk menemani permainan Anda"
    },
    {
      img: Events3,
      header: "Tournament Events",
      text: "Bergabunglah dalam turnamen kami yang penuh dengan persaingan seru dan hadiah menarik"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center gap-10 justify-center">
      <h1 className="font-bold text-32 text-primaryBlack pt-10">EVENTS</h1>

      <div className="w-[1380px]">
        <Slider {...settings}>
          {data?.map((Events, index) => (
            <div key={index} className="">
              <div className="flex items-center justify-center p-4 bg-primaryWhite w-[420px] h-[572px] rounded-2xl">
                <img
                  className="w-[380px] h-[532px] rounded-xl"
                  src={Events?.img}
                  alt={Events?.header}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Events;
