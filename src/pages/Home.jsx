import React from "react";
import { Link } from "react-router-dom";
import homebg1 from "../assets/Hero/heroBackground.webp";
import AddressSection from "../components/AddressSection";
import BookTableSection from "../components/BookTableSection";
import CardGallerySection from "../components/CardGallerySection";
import EventsSection from "../components/EventsSection";
import FacilitySection from "../components/FacilitySection";
import { getUserInfo } from "../utils/auth";
import { scrollToSection } from "../utils/scrollUtils";

const Home = () => {
  const userInfo = getUserInfo();
  console.log("userInfo:", userInfo);
  return (
    <div className="pb-[100px]">
      <section>
        <div
          id="beranda"
          style={{
            backgroundImage: `url(${homebg1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
          className="flex items-center justify-center border-white h-screen bg-black "
        >
          <div className="flex flex-col gap-5 items-center justify-center max-w-[720px]">
            <h1 className="text-40 font-bold text-primaryOrange text-center uppercase">
              Shoot and Score!
              <br />
              Reserve Your Table Now
            </h1>
            <button
              onClick={() => scrollToSection("booking")}
              className="flex bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md"
            >
              Booking Sekarang
            </button>
          </div>
        </div>
      </section>

      <section>
        <CardGallerySection />
      </section>
      <section>
        <BookTableSection />
      </section>
      <section>
        <FacilitySection />
      </section>
      <section>
        <EventsSection />
      </section>
      <section>
        <AddressSection />
      </section>
    </div>
  );
};

export default Home;
