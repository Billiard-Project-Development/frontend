import { CaretLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Signin-Signup/billiard_logo.webp";
import loginimg from "../assets/Signin-Signup/login.webp";
import InputText from "../components/InputText";
import { userLogin } from "../redux/actions/auth/userAuth";
import { resetStateAuth } from "../redux/features/auth/authSlice";
import { getUserInfo } from "../utils/auth";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { authLoading, authSuccess, authError } = useSelector(
    (state) => state.auth
  );
  const userInfo = getUserInfo();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visiblePassword, setVisiblePassword] = useState(false);

  console.log("authError:", authError);
  const toggleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const submitForm = async (data) => {
    try {
      dispatch(userLogin(data));
      console.log("Form data submitted:", data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  console.log("authSuccess:", authSuccess);

  useEffect(() => {
    if (authSuccess && userInfo) {
      const redirectLocation =
        userInfo?.role === 1 ? "/admin" : userInfo?.role === 2 ? "/admin" : "/";
      window.location.href = redirectLocation;
      dispatch(resetStateAuth());
    }
  }, [authSuccess, userInfo, navigate, dispatch]);

  return (
    <div className="flex flex-row lg:white bg-bgWhite lg:bg-accentSoftOrange h-full w-full justify-center">
      <div className="lg:w-1/2 hidden lg:flex flex-col gap-2 justify-center min-h-screen h-full w-full">
        <Link
          to="/"
          className="ml-56 flex gap-3 items-center text-primaryBlack"
        >
          <CaretLeft size={32} />
          <p className="text-20 font-medium">Kembali</p>
        </Link>
        <div className="group flex justify-center items-center">
          <div className="group relative">
            <img
              width={600}
              height={680}
              src={loginimg}
              alt="Login"
              className="relative z-10"
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-bgWhite flex lg:py-[100px] py-10 xl:px-36 px-6 flex-col gap-12 min-h-screen items-center justify-center">
        <div className="flex flex-col gap-12 w-full">
          <div className="flex flex-col gap-3 items-center">
            <img width={346} height={46} src={Logo} alt="Logo" />
            <h2 className="text-xl text-lighttosca">Masuk ke Akun Anda</h2>
            {authLoading && (
              <div className="text-accentGreen font-semibold text-16">
                Loading...
              </div>
            )}
            {authError !== null && (
              <div className="text-accentRed font-semibold text-16">
                {authError}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit(submitForm)}
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

            <button
              id="signUpSubmitButton"
              className="flex items-center justify-center bg-primaryOrange py-3 text-center text-white rounded-lg w-full hover:bg-accentDarkOrange transition duration-300 delay-100"
              aria-label="Toggle Submit"
              type="submit"
            >
              Lanjutkan
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

export default ForgotPassword;
