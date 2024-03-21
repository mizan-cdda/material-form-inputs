import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const RadioInput = ({
  formik,
  name,
  row = true,
  options = [],
  label = "Gender"
}: {
  formik: any;
  name: string;
  row?: boolean;
  options?: { value: string; label: string; disabled: boolean }[];
  label?: string;
}) => {

  return (
    <FormControl
      error={formik.touched.radioValue && Boolean(formik.errors.radioValue)}
    >
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={name}
        value={formik.values?.[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {/* <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="other"
            /> */}
        {options.map((option, i) => {
          return (
            <FormControlLabel
              key={i}
              value={option.value}
              control={<Radio />}
              label={option.label}
              disabled={option.disabled}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText>
        {formik.touched.radioValue && formik.errors.radioValue}
      </FormHelperText>
    </FormControl>
  );
};

export default RadioInput;
