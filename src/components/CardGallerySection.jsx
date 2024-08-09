import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import GalleryImage1 from "../assets/CardImageGallery/galleryImage1.webp";
import GalleryImage2 from "../assets/CardImageGallery/galleryImage2.webp";
import GalleryImage3 from "../assets/CardImageGallery/galleryImage3.webp";
import useWindowWidth from "../hooks/useWindowWidth";

const CardGallery = () => {
  const data = [
    { img: GalleryImage1 },
    { img: GalleryImage2 },
    { img: GalleryImage3 },
    { img: GalleryImage1 },
    { img: GalleryImage2 },
    { img: GalleryImage3 },
    { img: GalleryImage1 },
    { img: GalleryImage2 },
    { img: GalleryImage3 }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true
        }
      }
    ]
  };

  return (
    <div
      id="galeri"
      className="w-full flex flex-col items-center gap-10 justify-center"
    >
      <h1 className="font-bold text-32 text-primaryBlack pt-10">GALERI</h1>

      <div className="max-w-[1280px] w-full">
        <Slider {...settings}>
          {data.map((card, index) => (
            <div
              key={index}
              className="flex h-[300px] w-[300px] xl:h-[400px] 2xl:w-[400px] items-center justify-center"
            >
              <img
                className="object-contain p-4"
                src={card.img}
                alt={`Gallery Image ${index + 1}`}
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardGallery;
