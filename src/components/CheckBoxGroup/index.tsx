import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import React from "react";

const CheckboxGroup = ({
  formik,
  name,
  row = true,
  options = [],
  label = "",
}: {
  formik: any;
  name: string;
  row?: boolean;
  options?: { value: string; label: string; disabled: boolean }[];
  label?: string;
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    const { checkedItems } = formik.values;
    const currentIndex = checkedItems.indexOf(value as never); // Add type annotation
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(value as never);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    formik.setFieldValue("checkedItems", newCheckedItems);
  };
  return (
    <FormControl
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
    >
      {/* check box */}
      <FormLabel id="demo-row-checkbox-buttons-group-label">{label}</FormLabel>
      <FormGroup
        row={row}
        aria-labelledby="demo-row-checkbox-buttons-group-label"
      >
        {options?.map((option, i) => {
          return (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={formik.values?.[name].includes(
                    option.value as never
                  )}
                  onChange={handleCheckboxChange}
                  value={option.value}
                />
              }
              label={option.label}
              disabled={option.disabled}
            />
          );
        })}
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.checkedItems.includes(
                "checkbox1" as never
              )}
              onChange={handleCheckboxChange}
              value="checkbox1"
            />
          }
          label="Checkbox 1"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.checkedItems.includes(
                "checkbox2" as never
              )}
              onChange={handleCheckboxChange}
              value="checkbox2"
            />
          }
          label="Checkbox 2"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.checkedItems.includes(
                "checkbox3" as never
              )}
              onChange={handleCheckboxChange}
              value="checkbox3"
            />
          }
          label="Checkbox 3"
        /> */}
      </FormGroup>
      <FormHelperText>
        {formik.touched?.[name] && formik.errors?.[name]}
      </FormHelperText>
    </FormControl>
  );
};

export default CheckboxGroup;
