import { Stack, TextField } from "@mui/material";
import React from "react";
import EnumValues from "../EnumValues";

const FloatNumber = ({
  formik,
  id,
  name,
  label,
  variant,
  decimalDigits = 3, // Default to 2 decimal digits if not provided
  choices = [],
}: {
  formik: any;

  id: string;
  name: string;
  label: string;
  variant: string;
  decimalDigits?: number;
  choices?: any[];
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Regex to match float number with 2 decimal places
    const regex = new RegExp(`^\\d*\\.?\\d{0,${decimalDigits}}$`);
    // Check if the input value matches the regex
    if (regex.test(value) || value === "") {
      formik.handleChange(event);
    }
  };
  return (
    <Stack spacing={1} direction="row" position="relative">
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
      {choices?.length > 0 && (
        <EnumValues formik={formik} name={name} choices={choices} />
      )}
    </Stack>
  );
};

export default FloatNumber;
