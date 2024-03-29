// import { TextField } from "@mui/material";
// import React from "react";

// const ThousandDividerInput = ({
//   formik,
//   id,
//   name,
//   label,
//   rows,
//   variant,
//   required = false,
// }: {
//   formik: any;

//   id: string;
//   name: string;
//   label: string;
//   rows: number;
//   variant: string;
//   required?: boolean;
// }) => {
//   const formatNumber = (value: any) => {
//     // Remove non-numeric characters
//     const numericValue = value.replace(/\D/g, "");
//     // Add commas for thousands
//     return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   const handleChange = (event: any) => {
//     const { value, name } = event.target;
//     const formattedValue = formatNumber(value);
//     // Update the formik values with the formatted value
//     formik.setFieldValue(name, formattedValue);
//   };
//   return (
//     <TextField
//       fullWidth
//       id={id}
//       name={name}
//       label={label}
//       type="text" // Set the type to 'text'
//       //   InputLabelProps={{
//       //     shrink: true,
//       //   }}
//       variant="outlined"
//       value={formik.values?.[name]}
//       onChange={handleChange} // Custom change handler
//       onBlur={formik.handleBlur}
//       error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
//       helperText={formik.touched?.[name] && formik.errors?.[name]}
//       {...(required && { required: true })}
//     />
//   );
// };

// export default ThousandDividerInput;

import { TextField } from "@mui/material";
import React from "react";

const ThousandDividerInput = ({
  formik,
  id,
  name,
  label,
  rows,
  variant,
  decimalDigits = 3, // Default to 2 decimal digits if not provided
  required = false,
}: {
  formik: any;
  id: string;
  name: string;
  label: string;
  rows: number;
  variant: string;
  decimalDigits?: number;
  required?: boolean;
}) => {
  const formatNumber = (value: any) => {
    // Remove non-numeric characters except dot (.)
    let numericValue = value.replace(/[^\d.]/g, "");
    // Ensure only one dot (.) is present
    numericValue = numericValue.replace(/(\..*)\./g, "$1");
    // Ensure no more than specified number of digits after the decimal point
    numericValue = numericValue.replace(
      new RegExp(`(\\.[0-9]{${decimalDigits}})[0-9]+$`),
      "$1"
    );

    
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
      variant="outlined"
      value={formik.values?.[name]}
      onChange={handleChange} // Custom change handler
      onBlur={formik.handleBlur}
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
      helperText={formik.touched?.[name] && formik.errors?.[name]}
      {...(required && { required: true })}
    />
  );
};

export default ThousandDividerInput;
