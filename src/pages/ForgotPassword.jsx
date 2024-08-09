import { CaretLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Logo from "../assets/Signin-Signup/billiard_logo.webp";
import loginimg from "../assets/Signin-Signup/login.webp";
import InputText from "../components/InputText";
import {
  requestOTP,
  resetPassword,
  userLogin
} from "../redux/actions/auth/userAuth";
import { resetStateAuth } from "../redux/features/auth/authSlice";
import { getUserInfo } from "../utils/auth";
import { resetStateRequestOTP } from "../redux/features/auth/requestOTPSlice";
import { resetStateResetPassword } from "../redux/features/auth/resetPasswordSlice";
import SuccessPopup from "../components/popup/successPopup";

const ForgotPassword = () => {
  const {
    requestOTPSuccess,
    requestOTPLoading,
    requestOTPError,
    requestOTPResponse
  } = useSelector((state) => state.requestOTP);

  const { resetPasswordSuccess, resetPasswordLoading, resetPasswordError } =
    useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const [popupSuccess, setPopupSuccess] = useState(false);
  const [slide, setSlide] = useState(1);

  const [emailSent, setEmailSent] = useState(null);

  const navigate = useNavigate();

  const handleBack = () => {
    if (slide === 1) {
      navigate("/sign-in");
    } else if (slide === 2) {
      setSlide(1);
    }
    dispatch(resetStateRequestOTP());
    dispatch(resetStateResetPassword());
  };

  useEffect(() => {
    if (requestOTPSuccess === true) {
      setSlide(2);
    }
  }, [requestOTPSuccess]);

  useEffect(() => {
    dispatch(resetStateRequestOTP());
    dispatch(resetStateResetPassword());
  }, [slide, dispatch, navigate]);

  useEffect(() => {
    if (resetPasswordSuccess === true) {
      setPopupSuccess(true).then(() => {
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
      });
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (requestOTPError === `ValidationError: "email" must be a string`) {
      setSlide(1);
    } else if (emailSent === null) {
      setSlide(1);
    }
  }, [requestOTPError]);

  console.log("requestOTPSuccess:", requestOTPSuccess);
  console.log("requestOTPResponse:", requestOTPResponse);

  return (
    <>
      <SuccessPopup
        isOpen={popupSuccess}
        onClose={() => setPopupSuccess(false)}
        setPopupSuccess={setPopupSuccess}
        resetState={resetStateResetPassword}
        text1={"Berhasil mengatur ulang kata sandi"}
        text2={"silahkan masuk dengan kata sandi terbaru"}
      />
      <div className="flex flex-row lg:white bg-bgWhite lg:bg-accentSoftOrange h-full w-full justify-center">
        <div className="lg:w-1/2 hidden lg:flex flex-col gap-2 justify-center min-h-screen h-full w-full">
          <button
            onClick={handleBack}
            className="ml-56 flex gap-3 items-center text-primaryBlack w-fit"
          >
            <CaretLeft size={32} />
            <p className="text-20 font-medium">Kembali</p>
          </button>
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
              <p className="text-16 text-primaryBlack max-w-[400px] text-center">
                Masukkan email untuk menerima kode OTP sebelum mengatur ulang
                kata sandi
              </p>
              {requestOTPSuccess && (
                <div className="text-accentGreen font-semibold text-16">
                  {requestOTPResponse?.message}
                </div>
              )}
              {(requestOTPLoading || resetPasswordLoading) && (
                <div className="text-accentGreen font-semibold text-16">
                  Loading...
                </div>
              )}
              {(requestOTPError !== null || resetPasswordError !== null) && (
                <div className="text-accentRed font-semibold text-16">
                  {requestOTPError || resetPasswordError}
                </div>
              )}
            </div>
            {slide === 1 && (
              <RequestOtp emailSent={emailSent} setEmailSent={setEmailSent} />
            )}
            {slide === 2 && (
              <ResetPassword
                emailSent={emailSent}
                setEmailSent={setEmailSent}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

const RequestOtp = (props) => {
  const { emailSent, setEmailSent } = props;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();

  const [visiblePassword, setVisiblePassword] = useState(false);

  const toggleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const submitForm = async (data) => {
    try {
      dispatch(requestOTP(data));
      console.log("Form data submitted:", data);
      setEmailSent(data.email);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-8 w-full"
    >
      <div className="flex flex-col gap-1 w-full">
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
          <p className="text-red-500 text-10">{errors.email.message}</p>
        )}
      </div>

      <button
        id="submitEmail"
        className="flex items-center justify-center bg-primaryOrange py-3 text-center text-white rounded-lg w-full hover:bg-accentDarkOrange transition duration-300 delay-100"
        aria-label="Toggle Submit"
        type="submit"
      >
        Lanjutkan
      </button>
    </form>
  );
};

const ResetPassword = (props) => {
  const { emailSent, setEmailSent } = props;
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: emailSent,
      otp: "",
      newPassword: ""
    }
  });

  const dispatch = useDispatch();

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePassword2, setVisiblePassword2] = useState(false);

  const toggleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const toggleShowPassword2 = () => {
    setVisiblePassword2(!visiblePassword2);
  };

  const submitForm = async (data) => {
    try {
      const { confirmPassword, ...submitData } = data;
      dispatch(resetPassword(submitData));
      console.log("Form data submitted:", submitData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleSendOTP = async () => {
    dispatch(resetStateRequestOTP());
    dispatch(resetStateResetPassword());
    try {
      dispatch(requestOTP({ email: emailSent }));
      console.log("Form data submitted:", { email: emailSent });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const newPassword = watch("newPassword");

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-8 w-full"
    >
      <div className="flex flex-col gap-1 w-full">
        <InputText
          label="Kode OTP"
          name="otp"
          type="otp"
          register={register}
          handleSendOTP={handleSendOTP}
          validation={{
            required: {
              value: true,
              message: "Input otp Required"
            }
          }}
        />
        {errors.otp && (
          <p className="text-red-500 text-10">{errors.otp.message}</p>
        )}{" "}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <InputText
          label="New Password"
          name="newPassword"
          type={visiblePassword ? "text" : "password"}
          visiblePassword={visiblePassword}
          toggleShowPassword={toggleShowPassword}
          register={register}
          validation={{
            required: {
              value: true,
              message: "Input Password Required"
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          }}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-10">{errors.newPassword.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 w-full">
        <InputText
          label="Confirm New Password"
          name="confirmPassword"
          type={visiblePassword2 ? "text" : "password"}
          visiblePassword={visiblePassword2}
          toggleShowPassword={toggleShowPassword2}
          register={register}
          validation={{
            required: {
              value: true,
              message: "Input Confirm Password Required"
            },
            validate: (value) =>
              value === newPassword || "Passwords do not match"
          }}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-10">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button
        id="submitResetPassword"
        className="flex items-center justify-center bg-primaryOrange py-3 text-center text-white rounded-lg w-full hover:bg-accentDarkOrange transition duration-300 delay-100"
        aria-label="Toggle Submit"
        type="submit"
      >
        Lanjutkan
      </button>
    </form>
  );
};
