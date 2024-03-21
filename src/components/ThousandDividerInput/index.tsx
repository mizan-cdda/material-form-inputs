import { TextField } from "@mui/material";
import React from "react";

const ThousandDividerInput = ({
  formik,
  id,
  name,
  label,
  rows,
  variant,
}: {
  formik: any;

  id: string;
  name: string;
  label: string;
  rows: number;
  variant: string;
}) => {
  const formatNumber = (value: any) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    // Add commas for thousands
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    const formattedValue = formatNumber(value);
    // Update the formik values with the formatted value
    formik.setFieldValue(name, formattedValue);
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
      variant="outlined"
      value={formik.values?.[name]}
      onChange={handleChange} // Custom change handler
      onBlur={formik.handleBlur}
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
      helperText={formik.touched?.[name] && formik.errors?.[name]}
    />
  );
};

export default ThousandDividerInput;
