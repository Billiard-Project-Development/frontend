import React from "react";
import CardGallery from "../components/CardGallery";
import homebg1 from "../assets/Hero/heroBackground.webp";
import BookTable from "../components/BookTable";
import Facility from "../components/Facility";
import Events from "../components/Events";
import Address from "../components/Address";

const Home = () => {
  return (
    <div className="pb-[100px]">
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
            <h1 className="text-40 font-bold text-white text-center">
              Shoot and Score! Reserve Your Table Now
            </h1>
            <button className="flex bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md">
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
      <section>
        <Facility />
      </section>
      <section>
        <Events />
      </section>
      <section>
        <Address />
      </section>
    </div>
  );
};

export default Home;
