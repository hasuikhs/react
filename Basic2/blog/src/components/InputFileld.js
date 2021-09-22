import React from 'react';

function InputField({ type, value, placeholder, onChange, errorMessage }) {
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

export default InputField;