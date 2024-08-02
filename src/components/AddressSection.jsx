import { Envelope, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import mapsDummy from "../assets/Address/card_maps.webp";
const Address = () => {
  return (
    <div id="kontak" className="flex flex-col items-center gap-10">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="font-bold text-32 text-primaryBlack pt-32">ALAMAT</h1>

        <div className="flex gap-5 h-fit">
          <div className="flex flex-col gap-10 w-[660px] max-h-[556px] rounded-xl bg-primaryWhite p-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center p-2 rounded-full bg-accentSoftOrange2 text-primaryOrange">
                <Envelope size={48} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-24 font font-semibold">Emaisssl</span>
                <span className="">biliard@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center p-2 rounded-full bg-accentSoftOrange2 text-primaryOrange">
                <Envelope size={48} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-24 font font-semibold">Telepon</span>
                <span className="">087788990099</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center p-2 rounded-full bg-accentSoftOrange2 text-primaryOrange">
                <Envelope size={48} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-24 font font-semibold">Alamat</span>
                <span className="">
                  Jl. Fantasi, Kuningan, Karet Kuningan, Setiabudi, Jakarta
                  Selatan, DKI Jakarta
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-24 font font-semibold">Sosial Media</span>
              <div className="flex gap-6">
                <div className="flex items-center justify-center p-2 rounded-full bg-accentSoftOrange2 text-primaryOrange">
                  <InstagramLogo size={48} />
                </div>
                <div className="flex items-center justify-center p-2 rounded-full bg-accentSoftOrange2 text-primaryOrange">
                  <YoutubeLogo size={48} />
                </div>
                <div className="flex items-center justify-center p-2 rounded-full bg-accentSoftOrange2 text-primaryOrange">
                  <WhatsappLogo size={48} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-center">
            <img
              className="w-[600px] h-[456px]"
              src={mapsDummy}
              alt="GMaps Dummy"
            />{" "}
            <button className="flex items-center w-full justify-center bg-primaryOrange px-3 py-2 text-white hover:bg-accentDarkOrange transition-all ease-in-out duration-200 rounded-md">
              Buka di Google Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
