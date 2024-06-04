import React from "react";
import GalleryImage1 from "../assets/CardImageGallery/galleryImage1.webp";
import GalleryImage2 from "../assets/CardImageGallery/galleryImage2.webp";
import GalleryImage3 from "../assets/CardImageGallery/galleryImage3.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardGallery = () => {
  const data = [
    {
      img: GalleryImage1
    },
    {
      img: GalleryImage2
    },
    {
      img: GalleryImage3
    },
    {
      img: GalleryImage1
    },
    {
      img: GalleryImage2
    },
    {
      img: GalleryImage3
    },
    {
      img: GalleryImage1
    },
    {
      img: GalleryImage2
    },
    {
      img: GalleryImage3
    }
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 justify-center">
      <h1 className="font-bold text-3xl text-primaryBlack pt-10">GALERI</h1>
      <div className="w-[1280px]">
        <Slider {...settings}>
          {data?.map((card, index) => (
            <div className="flex items-center justify-center">
              <img
                className="w-[400px] h-[400px]"
                src={card?.img}
                alt={`${card?.img} ${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardGallery;
