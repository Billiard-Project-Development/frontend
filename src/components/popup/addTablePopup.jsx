import { Dialog, Transition } from "@headlessui/react";
import { Plus, UploadSimple, X } from "@phosphor-icons/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function AddTablePopup(props) {
  const { isOpen, onClose, data, handleSwitchSignUp } = props;
  const [visiblePassword, setVisiblePassword] = useState(false);

  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const [pricePerHour, setPricePerHour] = useState("Rp. ");

  const submitForm = (data) => {
    console.log(data);
    // handle form submission
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    // Ensure the input starts with "Rp. " and strip out any non-numeric characters except "."
    const formattedValue = "Rp. " + value.replace(/[^0-9]/g, "");
    setPricePerHour(formattedValue);
  };

  useEffect(() => {
    if (!pricePerHour.startsWith("Rp. ")) {
      setPricePerHour("Rp. " + pricePerHour.replace(/[^0-9]/g, ""));
    }
  }, [pricePerHour]);

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
                <Dialog.Panel className="w-full max-w-[400px] transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center  justify-between">
                    <div className="flex items-center gap-3">
                      <Plus size={24} />
                      <p className="text-20 font-medium">Tambah Meja</p>
                    </div>

                    <button
                      className=""
                      onClick={() => {
                        onClose();
                      }}
                    >
                      <X size={32} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-8 w-full ">
                    <form
                      onSubmit={handleSubmit(submitForm)}
                      className="w-full"
                    >
                      <div className="flex flex-col gap-6 py-10">
                        <div className="flex flex-col gap-1 text-primaryDarkgray">
                          <h3>Nomor Meja</h3>
                          <input
                            className="bg-primary3 border text-black border-primaryDarkgray focus:outline-none rounded-lg w-full h-10 px-4"
                            type="text"
                            id="tableNumber"
                            {...register("tableNumber")}
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-primaryDarkgray">
                          <h3>Harga Meja Per Jam</h3>
                          <input
                            className="bg-primary3 border text-black border-primaryDarkgray focus:outline-none rounded-lg w-full h-10 px-4"
                            type="text"
                            id="pricePerHour"
                            {...register("pricePerHour")}
                            value={pricePerHour}
                            onChange={handlePriceChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-primaryDarkgray">
                          <h3>Deskripsi</h3>
                          <input
                            className="bg-primary3 border text-black border-primaryDarkgray focus:outline-none rounded-lg w-full h-10 px-4"
                            type="text"
                            id="description"
                            {...register("description")}
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-primaryDarkgray">
                          <h3>Foto Meja</h3>
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor="tablePhoto"
                              className="flex items-center gap-3 border border-primaryOrange rounded-lg p-3 text-primaryOrange cursor-pointer"
                            >
                              <UploadSimple size={24} />
                              <p className="text-12 font-medium">Unggah Foto</p>
                            </label>
                            <input
                              type="file"
                              id="tablePhoto"
                              {...register("tablePhoto")}
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            {selectedFile ? (
                              <span className="text-primaryOrange text-12 font-medium">
                                {selectedFile.name}
                              </span>
                            ) : (
                              <span className="text-primaryOrange text-12 font-medium">
                                Belum ada file
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        id="signUpSubmitButton"
                        className="flex items-center justify-center bg-primaryOrange py-3 text-center text-white rounded-lg w-full hover:bg-accentDarkOrange transition duration-300 delay-100"
                        aria-label="Toggle Submit"
                        type="submit"
                      >
                        Tambah Meja
                      </button>
                    </form>
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
