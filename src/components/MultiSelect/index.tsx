import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MultiSelect = ({
  formik,
  name,
  multiple = true,
  id,
  label = "Multiple",
  options,
  required,
}: {
  formik: any;
  name: string;
  multiple?: boolean;
  id: string;
  label: string;
  options: any[];
  required?: boolean;
}) => {
  return (
    <FormControl
      fullWidth
      error={
        formik.touched.selectedOptions && Boolean(formik.errors.selectedOptions)
      }
    >
      <InputLabel id="demo-simple-select-disabled-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-disabled-label"
        id={id}
        name={name}
        {...(multiple && { multiple: true })}
        input={<OutlinedInput label="Name" />}
        // MenuProps={MenuProps}
        value={formik.values.selectedOptions}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        renderValue={(selected) =>
          typeof selected === "object" ? selected?.join(", ") : selected
        }
        {...(required && { required: true })}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option?.value || option}>
            {option?.label || option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {formik.touched.selectedOptions && formik.errors.selectedOptions}
      </FormHelperText>
    </FormControl>
  );
};

export default MultiSelect;
