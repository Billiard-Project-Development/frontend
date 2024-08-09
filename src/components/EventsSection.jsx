import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Events1 from "../assets/Events/image_1.webp";
import Events2 from "../assets/Events/image_2.webp";
import Events3 from "../assets/Events/image_3.webp";

const Events = () => {
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
  const settings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3400,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div
      id="events"
      className="w-full flex flex-col items-center gap-10 justify-center"
    >
      <h1 className="font-bold text-32 text-primaryBlack pt-10">EVENTS</h1>

      <div className="max-w-[1280px] w-full">
        <Slider {...settings}>
          {data?.map((Events, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-primaryWhite w-[420px] h-[572px] rounded-2xl ml-8 sm:ml-0"
            >
              <img
                className="w-[380px] h-[532px] rounded-xl"
                src={Events?.img}
                alt={Events?.header}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Events;
