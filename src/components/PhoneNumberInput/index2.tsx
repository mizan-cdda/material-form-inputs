import React from "react";
import { TextField } from "@mui/material";
import "intl-tel-input/build/css/intlTelInput.css";
import PhoneInput from "react-phone-number-input";

const PhoneNumberInput = ({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <PhoneInput
      placeholder={label}
      value={value}
      onChange={onChange}
      inputComponent={({ value, onChange, ...rest }) => (
        <TextField
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
      )}
      {...rest}
    />
  );
};

export default PhoneNumberInput;
