import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import success from "../../../src/assets/Signin-Signup/success.webp";
import { useDispatch } from "react-redux";
import { resetStateRegister } from "../../redux/features/auth/registerSlice";

export default function SuccessPopup(props) {
  const { isOpen, onClose, data, setPopupSuccess } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setPopupSuccess(false);
      }, 3000);
      dispatch(resetStateRegister());
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 font-body" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[460px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col items-center justify-center gap-5 text-center">
                    <img
                      className="max-h-[280px] max-w-[280px]"
                      src={success}
                      alt="successImage"
                    />
                    <p className="text-24 text-primaryBlack">
                      selamat Akun kamu berhasil dibuat!
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
