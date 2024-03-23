import { TextField } from "@mui/material";
import React from "react";

const DecimalNumber = ({
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
  const formatNumber = (value: any) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    // Add commas for thousands
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
    />
  );
};

export default DecimalNumber;
