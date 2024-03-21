import React from "react";
import { MuiTelInput } from "mui-tel-input";

const PhoneNumberInput = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return <MuiTelInput value={value} onChange={handleChange} />;
};

export default PhoneNumberInput;
