import React from "react";

interface InputFieldProps {
  type: string;
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage: string;
}

export default function InputField({ type, value, placeholder, onChange, errorMessage }: InputFieldProps): JSX.Element {
  return (
    <>
      <input
        className="ml5"
        type={ type }
        value={ value }
        placeholder={ placeholder }
        onChange={ onChange }
      /><br/>
      <div style={{ color: 'red'}}>{ errorMessage }</div>
    </>
  );
}