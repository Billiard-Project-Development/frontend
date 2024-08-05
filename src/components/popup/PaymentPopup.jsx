import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

export default function PaymentPopup(props) {
  const { isOpen, onClose, paymentLink } = props;
  const dispatch = useDispatch();

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
                <Dialog.Panel className="w-full max-w-[1024px] max-h-screen transform overflow-hidden rounded-2xl bg-white p-4 md:p-12 text-left align-middle shadow-xl transition-all">
                  <div className="iframe-container w-full h-full">
                    <iframe
                      src={paymentLink}
                      title="Embedded Website"
                      className="w-full h-[95vh] md:h-[90vh]"
                    ></iframe>
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
