import React, { useState } from "react";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { FormControl, FormHelperText } from "@mui/material";

const PhoneNumberInput = ({
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
  return (
    <FormControl
      fullWidth
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
    >
      <MuiTelInput
        name={name}
        label={label}
        value={formik.values?.[name]}
        onChange={(phone) => formik.setFieldValue(name, phone)}
        // onChange={handleChange}
        error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
      />
      <FormHelperText>
        {formik.touched?.[name] && formik.errors?.[name]}
      </FormHelperText>
    </FormControl>
  );
};

export default PhoneNumberInput;
