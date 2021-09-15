import React from "react";

export default function InputField({ type, value, placeholder, onChange, errorMessage }) {
  return (
    <>
      <input
        className="ml5"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      /><br />
      <div style={{ color: 'red' }}>{errorMessage}</div>
    </>
  );
}