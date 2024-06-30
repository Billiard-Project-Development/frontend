import React from "react";

const InputWithLabel = (props) => {
  const { label, value, onChange, name } = props;
  return (
    <div className="relative w-full mb-4 border rounded-lg p-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        name={name}
        className="peer h-10 w-full  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primaryOrange rounded-lg p-4"
        placeholder=" " // placeholder to trigger the label
      />
      <label
        htmlFor={name}
        className="absolute  -top-3 left-4 bg-white transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-primaryOrange text-sm text-gray-500"
      >
        {label}
      </label>
    </div>
  );
};

export default InputWithLabel;
