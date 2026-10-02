import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = "",
  mini,
  max,
  props,
  multiple,
  inputRef,
  accept,
  name,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-[#101827]">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type={type}
        name={name}
        accept={accept}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        mini={mini}
        max={max}
        multiple={multiple}
        className={`w-full px-3 py-2 border text-[#101827] rounded-lg shadow-sm focus:outline-none focus:ring-2 transition
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-[#E5E7EB] focus:ring-[#6C3FEA]"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${className}
        `}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
