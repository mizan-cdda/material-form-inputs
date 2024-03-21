"use client";
import styles from "./page.module.css";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import OTPInput from "@/components/OTP";
import AutoCompleteField from "@/components/AutoComplete";
import { MuiTelInput } from "mui-tel-input";
import TransferList from "@/components/TransferList";
import Text from "@/components/Text";
import TextArea from "@/components/TextArea";
import MultiSelect from "@/components/MultiSelect";
import RadioInput from "@/components/Radio";
import CheckboxGroup from "@/components/CheckBoxGroup";
import DecimalNumber from "@/components/DecimalNumber";
import ThousandDividerInput from "@/components/ThousandDividerInput";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import CustomFile from "@/components/CustomFile/index2";

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
  phoneInput: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
  message: Yup.string().required("Message is required"),
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
      phoneInput: "",
      message: "",
      content: "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      console.log("values", values);
    },
    enableReinitialize: true,
  });

  return (
    <main className={styles.main}>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {/* Custom text input */}
        <Text
          type="text"
          animation={true}
          formik={formik}
          id="Email"
          label="Email"
          name="email"
          variant="outlined"
        />
        <Text
          type="number"
          name="number"
          label="Number"
          id="number"
          formik={formik}
          variant="outlined"
          animation={false}
        />

        {/* Custom text area input */}
        <TextArea
          formik={formik}
          id="message"
          label="Message"
          name="message"
          rows={6}
          variant="outlined"
        />

        {/* Multi select */}
        <MultiSelect
          formik={formik}
          name="selectedOptions"
          id="selectedOptions"
          multiple
        />

        {/* Radio group */}
        <RadioInput
          formik={formik}
          name="radioValue"
          label="Radio Group"
          options={[
            {
              value: "female",
              label: "Female",
              disabled: false,
            },
            {
              value: "male",
              label: "Male",
              disabled: false,
            },
            {
              value: "other",
              label: "Other",
              disabled: false,
            },
            {
              value: "disabled",
              label: "Other",
              disabled: true,
            },
          ]}
          row={true}
        />

        {/* check box group */}
        <CheckboxGroup
          formik={formik}
          name="checkedItems"
          label="Checkbox Group"
          options={[
            {
              value: "checkbox1",
              label: "Checkbox 1",
              disabled: false,
            },
            {
              value: "checkbox2",
              label: "Checkbox 2",
              disabled: false,
            },
            {
              value: "checkbox3",
              label: "Checkbox 3",
              disabled: false,
            },
          ]}
          row={true}
        />

        {/* Float Number */}
        {/* <TextField
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
        /> */}

        {/* Decimal number input */}
        <DecimalNumber
          formik={formik}
          id="decimalNumber"
          name="decimalNumber"
          label="Decimal Number"
          variant="outlined"
        />

        {/* Number with comma */}
        <ThousandDividerInput
          formik={formik}
          id="numberWithCommas"
          name="numberWithCommas"
          label="Number with Commas"
          rows={1}
          variant="outlined"
        />

        {/* FIle upload */}
        <CustomFile
          formik={formik}
          id="file-upload"
          name="files"
          label="Select Files"
          variant="outlined"
        />

        {/* Phone number input */}
        <PhoneNumberInput
          formik={formik}
          id="phoneInput"
          name="phoneInput"
          label="Phone Number"
          variant="outlined"
        />

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
      <h2>Auto complete field</h2>
      <AutoCompleteField />

      {/* Transfer list */}
      <h2>Transfer list</h2>
      <TransferList />
    </main>
  );
}
