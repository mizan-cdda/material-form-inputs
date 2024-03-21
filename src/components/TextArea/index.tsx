import { FormControl, FormHelperText } from "@mui/material";
import React from "react";
import Text from "../Text";

const TextArea = ({
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
  return (
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
      />
      <FormHelperText>
        {formik.touched.message && formik.errors.message}
      </FormHelperText>
    </FormControl>
  );
};

export default TextArea;
