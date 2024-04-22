import { Stack, TextField, TextFieldVariants } from "@mui/material";
import React from "react";
import EnumValues from "../EnumValues";

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
  choices = [],
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
  choices?: any[];
}) => {
  return (
    <Stack spacing={1} direction="row" position="relative">
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
        helperText={
          helperText && formik.touched?.[name] && formik.errors?.[name]
        }
        {...(required && { required: true })}
      />
      {choices?.length > 0 && (
        <EnumValues formik={formik} name={name} choices={choices} />
      )}
    </Stack>
  );
};

export default Text;
