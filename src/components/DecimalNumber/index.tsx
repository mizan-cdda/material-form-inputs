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
  return         <TextField
          fullWidth
          id={id}
          name={name}
          label={label}
          type="text" // Set the type to 'text'
        //   InputLabelProps={{
        //     shrink: true,
        //   }}
          variant={variant as any | undefined}
          value={formik.values.decimalNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.decimalNumber && Boolean(formik.errors.decimalNumber)
          }
          helperText={
            formik.touched.decimalNumber && formik.errors.decimalNumber
          }
          inputProps={{
            inputMode: "decimal",
            pattern: "[0-9]*[.,]?[0-9]*", // Pattern to allow digits, dot, or comma
          }}
        />;
};

export default DecimalNumber;
