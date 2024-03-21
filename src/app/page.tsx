"use client";
import MultiSelect from "@/components/MultiSelet";
import styles from "./page.module.css";
import CustomTextInput from "@/components/CustomTextInput";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";
import OTPInput from "@/components/OTP";
import ClassicSignUpPage from "@/components/SingleSignUp";
import AutoCompleteField from "@/components/AutoComplete";

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

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  number: Yup.string().required("Number is required"),
  selectedOptions: Yup.array().min(1, "Select at least one option"),
  radioValue: Yup.string().required("Select an option"),
  checkedItems: Yup.array().min(1, "Select at least one checkbox"),
  decimalNumber: Yup.string()
    .typeError("Please enter a valid number")
    .required("Required")
    .test(
      "is-decimal",
      "Please enter a valid decimal number with two decimal places",
      (value: any) => (value === null ? true : /^\d+(\.\d{1,2})?$/.test(value))
    ),
  files: Yup.array().required("Files are required"),
});

export default function Home() {
  const formik = useFormik({
    initialValues: {
      email: "iamprince844@gmail.com",
      number: 0,
      selectedOptions: [],
      radioValue: "other",
      checkedItems: [], // Initialize as an empty array for checked items
      floatNumber: "0.00",
      decimalNumber: "",
      numberWithCommas: "", // Initialize as a string
      files: [],
    },
    validationSchema,
    onSubmit: async (values: any) => {
      console.log("values", values);
    },
    enableReinitialize: true,
  });

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

  const formatNumber = (value: any) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    // Add commas for thousands
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    const formattedValue = formatNumber(value);
    // Update the formik values with the formatted value
    formik.setFieldValue(name, formattedValue);
  };

  const handleFileChange = (event: any) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue("files", files);
  };
  return (
    <main className={styles.main}>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <TextField
          required
          defaultValue="Hello World"
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="standard-number"
          name="number"
          label="Number"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.email && formik.errors.number}
        />
        {/* Multi select */}
        <FormControl
          fullWidth
          error={
            formik.touched.selectedOptions &&
            Boolean(formik.errors.selectedOptions)
          }
        >
          <InputLabel id="selectedOptions-label">Select Options</InputLabel>
          <Select
            labelId="selectedOptions-label"
            id="selectedOptions"
            name="selectedOptions"
            multiple
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

        {/* Radio group */}
        <FormControl
          error={formik.touched.radioValue && Boolean(formik.errors.radioValue)}
        >
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="radioValue"
            value={formik.values.radioValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <FormControlLabel
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
            />
          </RadioGroup>
          <FormHelperText>
            {formik.touched.radioValue && formik.errors.radioValue}
          </FormHelperText>
        </FormControl>

        {/* check box group */}
        <FormControl
          error={
            formik.touched.checkedItems && Boolean(formik.errors.checkedItems)
          }
        >
          {/* check box */}
          <FormGroup row>
            <FormControlLabel
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
            />
          </FormGroup>
          <FormHelperText>
            {formik.touched.checkedItems && formik.errors.checkedItems}
          </FormHelperText>
        </FormControl>

        {/* Float Number */}
        <TextField
          fullWidth
          id="floatNumber"
          name="floatNumber"
          label="Float Number"
          type="number" // Set the type to 'number'
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={formik.values.floatNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.floatNumber && Boolean(formik.errors.floatNumber)
          }
          helperText={formik.touched.floatNumber && formik.errors.floatNumber}
          inputProps={{
            step: "any", // Set the step to control float precision
          }}
        />

        {/* Decimal number input */}
        <TextField
          fullWidth
          id="decimalNumber"
          name="decimalNumber"
          label="Decimal Number"
          type="text" // Set the type to 'text'
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={formik.values.decimalNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.decimalNumber && Boolean(formik.errors.decimalNumber)
          }
          helperText={
            formik.touched.decimalNumber && formik.errors.decimalNumber
          }
          inputProps={{
            inputMode: "decimal",
            pattern: "[0-9]*[.,]?[0-9]*", // Pattern to allow digits, dot, or comma
          }}
        />

        {/* Number with comma */}
        <TextField
          fullWidth
          id="numberWithCommas"
          name="numberWithCommas"
          label="Number with Commas"
          type="text" // Set the type to 'text'
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={formik.values.numberWithCommas}
          onChange={handleChange} // Custom change handler
          onBlur={formik.handleBlur}
          error={
            formik.touched.numberWithCommas &&
            Boolean(formik.errors.numberWithCommas)
          }
          helperText={
            formik.touched.numberWithCommas && formik.errors.numberWithCommas
          }
        />

        {/* FIle upload */}
        <FormControl
          fullWidth
          error={formik.touched.files && Boolean(formik.errors.files)}
        >
          {/* <InputLabel htmlFor="file-upload">Select Files</InputLabel> */}
          <Input
            id="file-upload"
            type="file"
            name="files"
            onChange={handleFileChange}
            inputProps={{ accept: ".pdf,.doc,.docx" }} // Specify accepted file types
          />
          <FormHelperText>
            {formik.touched.files && formik.errors.files}
          </FormHelperText>
        </FormControl>

        <Button
          sx={{ mt: 3 }}
          type="submit"
          // disabled={waiting}
        >
          {/* {!waiting ? 'Save' : 'Saving...'} */}
          Save
        </Button>
      </form>

      {/* Otp input */}
      <OTPInput />

      {/* Custom auto complete input */}
      <h2>Hello World!</h2>
      <AutoCompleteField />
    </main>
  );
}
