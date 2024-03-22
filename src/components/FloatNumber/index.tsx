import { TextField } from "@mui/material";
import React from "react";

const FloatNumber = ({
  formik,
  id,
  name,
  label,
  variant,
}: {
  formik: any;

  id: string;
  name: string;
  label: string;
  variant: string;
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Regex to match float number with 2 decimal places
    const regex = /^\d*\.?\d{0,2}$/;
    // Check if the input value matches the regex
    if (regex.test(value) || value === "") {
      formik.handleChange(event);
    }
  };
  return (
    <TextField
      fullWidth
      id={id}
      name={name}
      label={label}
      type="text" // Set the type to 'text'
      //   InputLabelProps={{
      //     shrink: true,
      //   }}
      variant={variant as any | undefined}
      value={formik.values?.[name]}
      onChange={handleInputChange}
      onBlur={formik.handleBlur}
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
      helperText={formik.touched?.[name] && formik.errors?.[name]}
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*[.]?[0-9]*", // Pattern to allow digits, dot, or comma
      }}
    />
  );
};

export default FloatNumber;
