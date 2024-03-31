import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Divider, FormHelperText } from "@mui/material";

export function AutoCompleteField({
  formik,
  name,
  label,
  required = false,
  id,
  options = [],
  multiple,
}: {
  formik: any;
  id: string;
  name: string;
  label: string;
  required?: boolean;
  options?: { title: string; year: number }[];
  multiple?: boolean;
}) {
  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    // console.log("value", value)
    multiple
      ? formik.setFieldValue(name, value)
      : formik.setFieldValue(name, value ? [value] : []);
  };

  // Check if there's an error for the current field
  const selectedOptions = multiple
    ? formik.values?.[name] || [] // Initialize selected options as an array
    : options?.find(
        (option) => option.title === formik.values?.[name]?.[0]?.title
      ) || null;
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        // multiple
        {...(required && { required: true })}
        {...(multiple && { multiple: true })}
        id={id}
        options={options}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        value={selectedOptions}
        onChange={handleChange} // Ensure onChange is correctly defined
        isOptionEqualToValue={(option, value) => {
          return option.title === value.title && option.year === value.year;
        }}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              name={name}
              label={label}
              placeholder={"Select " + label}
              error={formik.touched[name] && Boolean(formik.errors[name])}
            />
            <FormHelperText
              sx={{
                color: "red",
              }}
            >
              {formik.touched?.[name] && formik.errors?.[name]}
            </FormHelperText>
          </>
        )}
      />
    </Stack>
  );
}

const AutoComplete = ({
  options,
  id,
  formik,
  name,
  Label,
  required,
  multiple,
}: {
  options: { title: string; year: number }[];
  id: string;
  formik: any;
  name: string;
  Label: string;
  required?: boolean;
  multiple?: boolean;
}) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      useFlexGap
      flexWrap="wrap"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="center"
      alignItems="center"
    >
      {/* Custom auto complete input */}
      <h2>Auto complete field</h2>
      <AutoCompleteField
        id={id}
        formik={formik}
        label={Label}
        name={name}
        required={required}
        options={options}
        multiple={multiple}
      />
    </Stack>
  );
};

export default AutoComplete;
