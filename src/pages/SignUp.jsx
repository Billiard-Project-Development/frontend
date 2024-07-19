// @ts-nocheck
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/Signin-Signup/billiard_logo.webp";
// import { userSignUp } from "@/redux/actions/auth/auth-action";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { getToken } from "@/helpers/helpers";
// import { resetSuccessState } from "@/redux/features/userSignUp/signup-slice";
import { CaretLeft } from "@phosphor-icons/react";
import registerimg from "../assets/Signin-Signup/register.webp";
import InputText from "../components/InputText";
import SuccessRegistration from "../components/popup/successRegistration";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/auth/userAuth";

const SignUp = () => {
  const { registerSuccess, registerLoading, registerResponse, registerError } =
    useSelector((state) => state.register);

  console.log("registerSuccess:", registerSuccess);
  console.log("registerResponse:", registerResponse);
  console.log("registerError:", registerError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(false);
  const toggleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const toggleShowConfirm = () => {
    setVisibleConfirm(!visibleConfirm);
  };

  const sumbitform = async (data) => {
    try {
      await dispatch(userRegister(data));
      console.log("data:", data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (registerSuccess === true) {
      setPopupSuccess(true);

      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    }
  }, [registerSuccess]);

  return (
    <>
      <SuccessRegistration
        isOpen={popupSuccess}
        onClose={() => {
          setPopupSuccess(false);
        }}
        setPopupSuccess={setPopupSuccess}
      />
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
                src={registerimg}
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
              <h2 className="text-xl text-lighttosca">Mulai Bergabung</h2>
              {registerLoading && (
                <div className="text-accentGreen font-semibold text-16">
                  Loading...
                </div>
              )}
              {registerError && (
                <div className="text-accentRed font-semibold text-16">
                  {registerError?.message}
                </div>
              )}
            </div>
            <form
              onSubmit={handleSubmit(sumbitform)}
              className="flex flex-col gap-8 w-full"
            >
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
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <InputText
                label="Nama"
                name="nama"
                type="name"
                register={register}
                validation={{
                  required: {
                    value: true,
                    message: "Name Input Required"
                  },
                  maxLength: {
                    value: 100,
                    message: "Name length 100 character of max"
                  },
                  minLength: {
                    value: 2,
                    message: "Name length 2 character of min"
                  }
                }}
              />
              {errors.nama && (
                <p className="text-red-500">{errors.nama.message}</p>
              )}
              <InputText
                label="No HP"
                name="noHp"
                type="tel"
                register={register}
                validation={{
                  required: {
                    value: true,
                    message: "phone Input Required"
                  }
                }}
              />
              {errors.noHp && (
                <p className="text-red-500">{errors.noHp.message}</p>
              )}
              <InputText
                label="Password"
                name="password"
                type={visiblePassword ? "text" : "password"}
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
                  }
                  // pattern: {
                  //   value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                  //   message:
                  //     "Password must include an uppercase letter, a number, and a special character"
                  // }
                }}
                toggleShowPassword={toggleShowPassword}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <button
                id="signUpSubmitButton"
                className="flex items-center justify-center bg-primaryOrange py-3 text-center text-white rounded-lg w-full hover:bg-accentDarkOrange transition duration-300 delay-100"
                aria-label="Toggle Submit"
                type="submit"
              >
                Daftar
              </button>
            </form>
            <div className="flex flex-row gap-2 items-center justify-center font-medium">
              <span className="text-black">Sudah memiliki akun?</span>
              <Link to="/sign-in" className="text-primaryOrange">
                Masuk Di sini
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
