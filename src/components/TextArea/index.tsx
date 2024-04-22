import { FormControl, FormHelperText, Stack } from "@mui/material";
import React from "react";
import Text from "../Text";
import EnumValues from "../EnumValues";

const TextArea = ({
  formik,
  id,
  name,
  label,
  rows,
  variant,
  required = false,
  choices = [],
}: {
  formik: any;

  id: string;
  name: string;
  label: string;
  rows: number;
  variant: string;
  required?: boolean;
  choices?: { value: string; label: string }[];
}) => {
  return (
    <Stack spacing={1} direction="row" position="relative">
      <FormControl
        fullWidth
        error={formik.touched.message && Boolean(formik.errors.message)}
      >
        <Text
          id={id}
          name={name}
          label={label}
          multiline
          rows={rows}
          formik={formik}
          variant={variant}
          animation={false}
          type="text"
          helperText={false}
          {...(required && { required: true })}
        />
        <FormHelperText>
          {formik.touched.message && formik.errors.message}
        </FormHelperText>
      </FormControl>
      {choices?.length > 0 && (
        <EnumValues formik={formik} name={name} choices={choices}  top="5%"/>
      )}
    </Stack>
  );
};

export default TextArea;
