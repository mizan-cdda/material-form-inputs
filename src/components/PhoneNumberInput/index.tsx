import React, { useState } from "react";
import { MuiTelInput } from "mui-tel-input";
import { FormControl, FormHelperText, Stack } from "@mui/material";
import EnumValues from "../EnumValues";

const PhoneNumberInput = ({
  formik,
  id,
  name,
  label,
  onlyCountries = ["BD", "US"],
  defaultCountry = "BD",
  required = false,
  choices = [],
}: {
  formik: any;

  id: string;
  name: string;
  label: string;
  variant: string;
  onlyCountries?: string[];
  defaultCountry?: string;
  required?: boolean;
  choices?: { value: string; label: string }[];
}) => {
  return (
    <Stack spacing={1} direction="row" position="relative">
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
      {choices?.length > 0 && (
        <EnumValues formik={formik} name={name} choices={choices} />
      )}
    </Stack>
  );
};

export default PhoneNumberInput;
