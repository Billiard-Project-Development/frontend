import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../../assets/Signin-Signup/billiard_logo.webp";
import InputText from "../InputText";
import { X } from "@phosphor-icons/react";

export default function SignInPopup(props) {
  const { isOpen, onClose, data, handleSwitchSignUp } = props;
  const [visiblePassword, setVisiblePassword] = useState(false);
  const toggleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const sumbitform = async (data) => {
    // await dispatch(userSignUp(data));
  };
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
                <Dialog.Panel className="w-full max-w-[480px] transform overflow-hidden rounded-2xl bg-white px-10 py-16 text-left align-middle shadow-xl transition-all">
                  <span
                    className="cursor-pointer absolute right-6 top-6"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <X size={32} />
                  </span>
                  <div className="flex flex-col gap-8 w-full ">
                    <div className="flex flex-col gap-3 items-center  ">
                      <img width={168} height={40} src={Logo} alt="Logo" />
                      <h2 className="text-16 text-primaryBlack">
                        Masuk ke Akun Anda
                      </h2>
                    </div>
                    <form
                      onSubmit={handleSubmit(sumbitform)}
                      className="flex flex-col gap-6 w-full"
                    >
                      {/* <div className="flex flex-col gap-1 text-primaryDarkgray">
              <h3 className="pl-6">Email</h3>
              <input
                className="bg-primary3 border text-black border-primaryDarkgray focus:outline-none  rounded-lg w-full h-10 px-4"
                // placeholder="Enter your email"
                type="email"
                id="emailInput"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Input Email Required"
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email Format Wrong"
                  }
                })}
              />
            </div> */}

                      <InputText
                        label="Email"
                        name="email"
                        type="email"
                        register={register}
                        validation={{
                          required: {
                            value: true,
                            message: "Input Email Required"
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email Format Wrong"
                          }
                        }}
                      />

                      {/* <div className="flex flex-col gap-1 text-primaryDarkgray">
              <h3 className="pl-6">Kata Sandi</h3>
              <div className="flex bg-primary3 border text-black border-primaryDarkgray rounded-lg w-full h-10 px-4">
                <input
                  className="bg-transparent focus:outline-none w-full"
                  // placeholder="Enter your Password"
                  type={`${visiblePassword === false ? "password" : "text"}`}
                  id="passwordInput"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password Input Required"
                    },
                    minLength: {
                      value: 8,
                      message: "Password length 8 character of min"
                    },
                    maxLength: {
                      value: 50,
                      message: "Password length 50 character of max"
                    },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                      message:
                        "Password must include with Uppercase or !@#$%^&*"
                    }
                  })}
                />
                <span
                  className="flex items-center cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {visiblePassword ? <Eye /> : <EyeClosed />}
                </span>
              </div>
            </div> */}

                      <InputText
                        label="Password"
                        name="password"
                        type="password"
                        visiblePassword={visiblePassword}
                        register={register}
                        validation={{
                          required: {
                            value: true,
                            message: "Password Input Required"
                          },
                          minLength: {
                            value: 8,
                            message: "Password length 8 characters minimum"
                          },
                          maxLength: {
                            value: 50,
                            message: "Password length 50 characters maximum"
                          },
                          pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                            message:
                              "Password must include an uppercase letter, a number, and a special character"
                          }
                        }}
                        toggleShowPassword={toggleShowPassword}
                      />
                      <button
                        id="signUpSubmitButton"
                        className="flex items-center justify-center bg-primaryOrange py-3 text-center text-white rounded-lg w-full hover:bg-accentDarkOrange transition duration-300 delay-100"
                        aria-label="Toggle Submit"
                        type="submit"
                      >
                        Masuk
                      </button>
                    </form>
                    <div className="flex flex-row gap-2 items-center justify-center font-medium">
                      <span className="text-black">Belum memiliki akun?</span>
                      <button
                        onClick={() => {
                          handleSwitchSignUp();
                        }}
                        className="text-primaryOrange"
                      >
                        Daftar Di sini
                      </button>
                    </div>
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
