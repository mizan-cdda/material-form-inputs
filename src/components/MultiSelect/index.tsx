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
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelect = ({
  formik,
  name,
  multiple = true,
  id,
}: {
  formik: any;
  name: string;
  multiple?: boolean;
  id: string;
}) => {
  return (
    <FormControl
      fullWidth
      error={
        formik.touched.selectedOptions && Boolean(formik.errors.selectedOptions)
      }
    >
      <InputLabel id="selectedOptions-label">Select Options</InputLabel>
      <Select
        labelId="selectedOptions-label"
        id={id}
        name={name}
        multiple={multiple}
        input={<OutlinedInput label="Name" />}
        MenuProps={MenuProps}
        value={formik.values.selectedOptions}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        renderValue={(selected) => selected.join(", ")}
      >
        <MenuItem value="Option 1">Option 1</MenuItem>
        <MenuItem value="Option 2">Option 2</MenuItem>
        <MenuItem value="Option 3">Option 3</MenuItem>
      </Select>
      <FormHelperText>
        {formik.touched.selectedOptions && formik.errors.selectedOptions}
      </FormHelperText>
    </FormControl>
  );
};

export default MultiSelect;
