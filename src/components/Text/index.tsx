import { TextField, TextFieldVariants } from "@mui/material";
import React from "react";

const Text = ({
  formik,
  name,
  label,
  id,
  type,
  animation = true,
  variant,
  multiline = false,
  rows = 1,
  helperText = true,
  defaultValue = "Hello world",
  required = false,
}: {
  formik: any;
  type: string;
  animation: boolean;
  name: string;
  label: string;
  id: string;
  variant?: string;
  multiline?: boolean;
  rows?: number;
  helperText?: boolean;
  defaultValue?: string;
  required?: boolean;
}) => {
  return (
    <TextField
      rows={rows}
      multiline={multiline}
      defaultValue={defaultValue}
      fullWidth
      id={id}
      variant={variant ? (variant as TextFieldVariants) : "outlined"}
      // InputLabelProps={{
      //     shrink: animation && formik.values.email ? true : false,
      // }}
      type={type}
      name={name}
      label={label}
      value={formik.values?.[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
      helperText={helperText && formik.touched?.[name] && formik.errors?.[name]}
      {...(required && { required: true })}
    />
  );
};

export default Text;
