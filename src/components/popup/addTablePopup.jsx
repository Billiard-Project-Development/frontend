import { Dialog, Transition } from "@headlessui/react";
import { Plus, UploadSimple, X } from "@phosphor-icons/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import successState from "../../assets/StateImage/success_state.webp";
import { addProduct, getAllProduct } from "../../redux/actions/product/product";
import { resetStateAddProduct } from "../../redux/features/product/addProductSlice";
import ContinueLoader1 from "../loaders/ContinueLoader1";

export default function AddTablePopup(props) {
  const { isOpen, onClose, data, handleSwitchSignUp } = props;
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pricePerHour, setPricePerHour] = useState("");

  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const {
    addProductResponse,
    addProductLoading,
    addProductSuccess,
    addProductError
  } = useSelector((state) => state.addProduct);

  const submitForm = (dataAddProduct) => {
    dataAddProduct.foto_produk = selectedFile;
    dispatch(addProduct(dataAddProduct));
    console.log("dataAddProduct:", dataAddProduct);
  };

  console.log("selectedFile:", selectedFile);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      setSelectedFile(file);
      setValue("foto_produk", file);
    } else {
      alert("Please upload a JPG or JPEG image.");
      event.target.value = null;
    }
  };

  const handlePriceChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setPricePerHour(value);
    console.log("value:", value);
  };

  console.log("pricePerHour:", pricePerHour);

  const handleOke = () => {
    dispatch(getAllProduct());
    onClose();
    setTimeout(() => {
      dispatch(resetStateAddProduct());
    }, 1000);
  };

  useEffect(() => {
    if (addProductSuccess === true) {
      onClose();
    }
  }, [addProductSuccess]);
  console.log("addProductSuccess:", addProductSuccess);
  console.log("addProductError:", addProductError);

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
                <Dialog.Panel
                  className={`w-full ${
                    addProductSuccess ? "max-w-[600px]" : "max-w-[400px]"
                  }  transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all`}
                >
                  {!(
                    addProductLoading ||
                    addProductSuccess ||
                    addProductError !== false
                  ) && (
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
                  )}
                  <div className="flex flex-col gap-8 w-full ">
                    {addProductLoading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <ContinueLoader1 />
                      </div>
                    ) : addProductError !== false ? (
                      <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
                        <p className="py-10">
                          {addProductError ||
                            addProductError?.message ||
                            "Gagal menambahkan meja"}
                        </p>
                        <button
                          className="bg-primaryOrange text-white text-16 w-full py-2 rounded-lg"
                          onClick={handleOke}
                        >
                          Kembali
                        </button>
                      </div>
                    ) : (
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
                              {...register("noMeja")}
                            />
                          </div>
                          <div className="flex flex-col gap-1 text-primaryDarkgray">
                            <h3>Harga Meja Per Jam</h3>
                            <div className="flex items-center gap-3 bg-primary3 border text-black border-primaryDarkgray w-full rounded-lg h-10 px-4">
                              {pricePerHour && (
                                <p className="text-primaryDarkgray">Rp. </p>
                              )}
                              <input
                                className=" w-full outline-none"
                                type="text"
                                id="pricePerHour"
                                {...register("harga")}
                                value={pricePerHour}
                                onChange={handlePriceChange}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 text-primaryDarkgray">
                            <h3>Deskripsi</h3>
                            <input
                              className="bg-primary3 border text-black border-primaryDarkgray focus:outline-none rounded-lg w-full h-10 px-4"
                              type="text"
                              id="description"
                              {...register("deskripsi")}
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
                                <p className="text-12 font-medium">
                                  Unggah Foto
                                </p>
                              </label>
                              <input
                                type="file"
                                id="tablePhoto"
                                {...register("foto_produk")}
                                accept=".jpg,.jpeg"
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
                          id="submitFormButton"
                          className="flex items-center justify-center bg-primaryOrange py-3 text-center text-white rounded-lg w-full hover:bg-accentDarkOrange transition duration-300 delay-100"
                          aria-label="Toggle Submit"
                          type="submit"
                        >
                          Tambah Meja
                        </button>
                      </form>
                    )}
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
