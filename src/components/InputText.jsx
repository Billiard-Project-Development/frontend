import { Eye, EyeClosed } from "@phosphor-icons/react";
import React from "react";

const InputText = (props) => {
  const {
    label,
    value,
    onChange,
    name,
    maxWidth,
    type,
    visiblePassword,
    toggleShowPassword,
    register,
    validation
  } = props;
  return (
    <div
      className="w-full"
      style={{ maxWidth: maxWidth ? `${maxWidth}px` : "none" }}
    >
      <div className="relative w-full mb-4 border rounded-lg">
        <input
          type={
            visiblePassword ? "text" : type === "password" ? "password" : type
          }
          value={value}
          onChange={onChange}
          name={name}
          className="h-10 w-full  border-primaryDarkgray text-gray-900 placeholder-transparent focus:outline-none focus:border-primaryOrange rounded-lg p-4"
          placeholder=" " // placeholder to trigger the label
          {...(register ? register(name, validation) : {})}
        />
        <label
          htmlFor={name}
          className="absolute -top-3 left-4  transition-all text-14 text-primaryDarkgray cursor-default select-none bg-bgWhite"
        >
          {label}
        </label>
        {type === "password" && (
          <span
            className="absolute right-4 top-3 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {visiblePassword ? <Eye /> : <EyeClosed />}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputText;
