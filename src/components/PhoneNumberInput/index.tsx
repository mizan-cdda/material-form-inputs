import React, { useState } from "react";
import { MuiTelInput } from "mui-tel-input";
import { FormControl, FormHelperText } from "@mui/material";

const PhoneNumberInput = ({
  formik,
  id,
  name,
  label,
  onlyCountries = ["BD", "US"],
  defaultCountry = "BD",
  required = false,
}: {
  formik: any;

  id: string;
  name: string;
  label: string;
  variant: string;
  onlyCountries?: string[];
  defaultCountry?: string;
  required?: boolean;
}) => {
  return (
    <FormControl
      fullWidth
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
    >
      <MuiTelInput
        name={name}
        id={id}
        label={label}
        value={formik.values?.[name]}
        onChange={(phone) => formik.setFieldValue(name, phone)}
        error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
        forceCallingCode
        onlyCountries={onlyCountries as any[]}
        defaultCountry={defaultCountry as any | undefined}
        {...(required && { required: true })}
      />
      <FormHelperText>
        {formik.touched?.[name] && formik.errors?.[name]}
      </FormHelperText>
    </FormControl>
  );
};

export default PhoneNumberInput;
