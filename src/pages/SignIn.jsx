// @ts-nocheck
import { Link } from "react-router-dom";

import Logo from "../assets/Signin-Signup/billiard_logo.webp";
// import { userSignUp } from "@/redux/actions/auth/auth-action";
// import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { getToken } from "@/helpers/helpers";
// import { resetSuccessState } from "@/redux/features/userSignUp/signup-slice";
import { CaretLeft } from "@phosphor-icons/react";
import loginimg from "../assets/Signin-Signup/login.webp";
import InputText from "../components/InputText";

const SignIn = () => {
  //   const dispatch = useDispatch();
  //   const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const toggleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const toggleShowConfirm = () => {
    setVisibleConfirm(!visibleConfirm);
  };

  const sumbitform = async (data) => {
    // await dispatch(userSignUp(data));
  };

  //   const token = getToken();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <div
      className={`flex flex-row lg:white  bg-bgWhite lg:bg-accentSoftOrange h-full w-full justify-center`}
    >
      <div className="lg:w-1/2 hidden lg:flex flex-col gap-2 justify-center  min-h-screen h-full w-full  ">
        <Link
          to={"/"}
          className="ml-56 flex gap-3 items-center text-primaryBlack"
        >
          <CaretLeft size={32} />
          <p className="text-20 font-medium">Kembali</p>
        </Link>
        <div className="group flex justify-center items-center">
          <div className="group relative ">
            <img
              width={600}
              height={680}
              src={loginimg}
              alt=""
              className="relative z-10"
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-bgWhite flex lg:py-[100px] py-10  xl:px-36 px-6  flex-col gap-12  min-h-screen items-center justify-center ">
        <div className="flex flex-col gap-12 w-full">
          <div className="flex flex-col gap-3 items-center  ">
            <img width={346} height={46} src={Logo} alt="" />
            <h2 className="text-xl text-lighttosca">Masuk ke Akun Anda</h2>
          </div>
          <form
            onSubmit={handleSubmit(sumbitform)}
            className="flex flex-col gap-8 w-full"
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
            <Link to="/sign-up" className="text-primaryOrange">
              Daftar Di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
