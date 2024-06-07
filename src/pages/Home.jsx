import React from "react";
import CardGallery from "../components/CardGallery";
import homebg1 from "../assets/Hero/heroBackground.webp";
import BookTable from "../components/BookTable";

const Home = () => {
  return (
    <>
      <section>
        <div
          style={{
            backgroundImage: `url(${homebg1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
          className="flex items-center justify-center border-white h-screen bg-black "
        >
          <div className="flex flex-col gap-5 items-center justify-center max-w-[720px]">
            <h1 className="text-4xl font-bold text-white text-center">
              Shoot and Score! Reserve Your Table Now
            </h1>
            <button className="flex bg-primaryOrange px-3 py-2 text-white hover:bg-opacity-90 transition-all ease-in-out duration-200 rounded-md">
              Booking Sekarang
            </button>
          </div>
        </div>
      </section>
      <section>
        <CardGallery />
      </section>
      <section>
        <BookTable />
      </section>
    </>
  );
};

export default Home;
