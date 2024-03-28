import { TextField } from "@mui/material";
import React from "react";

const DecimalNumber = ({
  formik,
  id,
  name,
  label,
  variant,
  required = false,
}: {
  formik: any;

  id: string;
  name: string;
  label: string;
  variant: string;
  required?: boolean;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Regex to match decimal number
    const regex = /^\d*\.?\d*$/;
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
      onChange={handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
      helperText={formik.touched?.[name] && formik.errors?.[name]}
      inputProps={{
        inputMode: "decimal",
        pattern: "[0-9]*[.,]?[0-9]*", // Pattern to allow digits, dot, or comma
      }}
      // {...(required && { required: true })}
    />
  );
};

export default DecimalNumber;
