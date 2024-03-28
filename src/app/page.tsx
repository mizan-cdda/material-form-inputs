"use client";
import styles from "./page.module.css";
import { Button, FormControlLabel, Switch, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { matchIsValidTel } from "mui-tel-input";
import {
  CheckboxGroup,
  CustomFile,
  CustomizedSwitch,
  DecimalNumber,
  FloatNumber,
  MultiSelect,
  PhoneNumberInput,
  RadioInput,
  Text,
  TextArea,
  ThousandDividerInput,
} from "@/components";

const matchIsValidTelCustom = (phoneNumber: string) => {
  // If phoneNumber is not a string or is empty, return false
  if (typeof phoneNumber !== "string" || phoneNumber.trim() === "") {
    return false;
  }

  // Implement your custom verification logic here
  // For demonstration, let's assume the phoneNumber is valid if it contains at least 5 characters
  return matchIsValidTel(phoneNumber, {
    onlyCountries: ["BD", "US"], // optional,
    continents: ["AS", "NA"], // optional
  });
  // return phoneNumber.length >= 5;
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
  floatNumber: Yup.string()
    .typeError("Please enter a valid number")
    .required("Required Float Number")
    .test(
      "is-decimal",
      "Please enter a valid decimal number with two decimal places",
      (value: any) => (value === null ? true : /[0-9]+\.[0-9]+$/.test(value))
    ),
  files: Yup.array().min(1, "Select at least one file"),
  phoneInput: Yup.string().test(
    "isValidPhoneNumber",
    `Phone number is not valid`,
    (value: any) => {
      return matchIsValidTelCustom(value);
    }
  ),
  numberWithCommas: Yup.string().required("Number is required"),
  message: Yup.string().required("Message is required"),
  customSwitch: Yup.boolean()
    .oneOf([true], "Custom Switch is required")
    .required("Custom Switch is required"),
});

const data = [
  {
    id: "Email",
    name: "email",
    type: "text",
    placeholder: "Enter your email",
    label: "Email",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "",
    validation: [
      {
        type: "required",
        value: true,
        message: "Email is required",
      },
      {
        type: "email",
        value: true,
        message: "Enter a valid email",
      },
    ],
  },
  {
    id: "number",
    name: "number",
    type: "number",
    placeholder: "Enter your number",
    label: "Number",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "",
    validation: [
      {
        type: "required",
        value: true,
        message: "Number is required",
      },
      {
        type: "min",
        value: 1,
        message: "Number must be greater than 0",
      },
    ],
  },
  {
    id: "message",
    name: "message",
    type: "text-area",
    placeholder: "Enter your message",
    label: "Message",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "",
    validation: [
      {
        type: "required",
        value: true,
        message: "Message is required",
      },
      {
        type: "min",
        value: 1,
        message: "Message must be greater than 0",
      },
      {
        type: "max",
        value: 255,
        message: "Message must be less than 255",
      },
    ],
  },
  {
    id: "selectedOptions",
    name: "selectedOptions",
    type: "select",
    placeholder: "Select your options",
    label: "Select Options",
    variant: "outlined", // outlined, filled, standard
    options: [
      {
        value: "Option 1",
        label: "Option 1",
      },
      {
        value: "Option 2",
        label: "Option 2",
      },
      {
        value: "Option 3",
        label: "Option 3",
      },
    ],
    multiple: true, // if true, multiple options can be selected, if false, only one option can be selected
    defaultValue: ["option1", "option2"],
    validation: [
      {
        type: "required",
        value: true,
        message: "Select at least one option",
      },
      {
        type: "min",
        value: 1,
        message: "Select at least one option",
      },
    ],
  },
  {
    id: "checkbox-group",
    name: "checkedItems",
    type: "checkbox-group",
    label: "Checkbox Group",
    options: [
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
    ],
    row: true, // if true, checkboxes will be displayed in a row, if false, checkboxes will be displayed in a column,
    defaultValue: [],
    validation: [
      {
        type: "required",
        value: true,
        message: "Select at least one checkbox",
      },
      {
        type: "min",
        value: 1,
        message: "Select at least one checkbox",
      },
    ],
  },
  {
    id: "radio-group",
    name: "radioValue",
    type: "radio-group",
    label: "Radio Group",
    options: [
      {
        value: "radio1",
        label: "Radio 1",
        disabled: false,
      },
      {
        value: "radio2",
        label: "Radio 2",
        disabled: false,
      },
      {
        value: "radio3",
        label: "Radio 3",
        disabled: false,
      },
    ],
    row: true, // if true, radios will be displayed in a row, if false, radios will be displayed in a column,
    defaultValue: "radio1",
    validation: [
      {
        type: "required",
        value: true,
        message: "Select an option",
      },
    ],
  },
  {
    id: "float-number",
    name: "floatNumber",
    type: "float-number",
    placeholder: "Enter your float number",
    label: "Float Number",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "27.00",
    validation: [
      {
        type: "required",
        value: true,
        message: "Float Number is required",
      },
      {
        type: "min",
        value: 1,
        message: "Float Number must be greater than 0",
      },
    ],
  },
  {
    id: "decimal-number",
    name: "decimalNumber",
    type: "decimal-number",
    placeholder: "Enter your decimal number",
    label: "Decimal Number",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "27.00",
    validation: [
      {
        type: "required",
        value: true,
        message: "Decimal Number is required",
      },
      {
        type: "min",
        value: 1,
        message: "Decimal Number must be greater than 0",
      },
    ],
  },
  {
    id: "number-with-thousand-separator",
    name: "numberWithThousandSeparator",
    type: "number-with-thousand-separator",
    placeholder: "Enter your number with thousand separator",
    label: "Number With Thousand Separator",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "27,000",
    validation: [
      {
        type: "required",
        value: true,
        message: "Number with Thousand Separator is required",
      },
    ],
  },
  {
    id: "file",
    name: "file",
    type: "file",
    label: "File",
    variant: "outlined", // outlined, filled, standard
    accept: ".pdf,.docx,.doc",
    defaultValue: "",
    validation: [
      {
        type: "required",
        value: true,
        message: "File is required",
      },
    ],
  },
  {
    id: "phone",
    name: "phone",
    type: "phone",
    placeholder: "Enter your phone number",
    label: "Phone",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "BD",
    onlyCountries: ["us", "bd"],
    validation: [
      {
        type: "required",
        value: true,
        message: "Phone is required",
      },
    ],
  },
  {
    id: "switch",
    name: "switch",
    type: "switch",
    label: "Custom Switch",
    defaultValue: false,
    variant: "android", // ios, android, ant, default
    validation: [
      {
        type: "required",
        value: true,
        message: "Custom Switch is required",
      },
    ],
  },
];

export default function Home() {
  const formik = useFormik({
    initialValues: {
      email: "iamprince844@gmail.com",
      number: 0,
      selectedOptions: ["option1", "option2"],
      radioValue: "other",
      checkedItems: [], // Initialize as an empty array for checked items
      floatNumber: "0.00",
      decimalNumber: "",
      numberWithCommas: "", // Initialize as a string
      files: [],
      phoneInput: "",
      message: "",
      customSwitch: false,
    },
    validationSchema,
    onSubmit: async (values: any, { setSubmitting }) => {
      console.log("values", values);
      const formData = new FormData();

      // Append all form values to formData
      for (const key in values) {
        if (key === "files") {
          values[key].forEach((file: File) => {
            formData.append(key, file);
          });
        } else {
          formData.append(key, values[key]);
        }
      }

      // Make a POST request to the server
      try {
        // Set formik submitting to true
        setSubmitting(true);
        const response = await fetch("https://dev.cdda.io/filemanager", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        // Handle response
      } catch (error) {
        // Handle error
        console.log(error);
      }
      // Set formik submitting to false
      setSubmitting(false);
    },
    // Enable reinitialize to update the form values
    enableReinitialize: true,
  });

  return (
    <main className={styles.main}>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {/* {data.map((item) => {
          switch (item.type) {
            case "text":
              return (
                <Text
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  type="text"
                  variant="outlined"
                  defaultValue={item.defaultValue}
                />
              );
            case "number":
              return (
                <Text
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  type="number"
                  variant="outlined"
                  defaultValue={item.defaultValue}
                />
              );
            case "text-area":
              return (
                <TextArea
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  rows={6}
                  variant="outlined"
                />
              );
            case "select":
              return (
                <MultiSelect
                  formik={formik}
                  name={item.name}
                  id={item.id}
                  label={item.label}
                  multiple={item.multiple}
                  options={item.options}
                  defaultValue={item.defaultValue}
                />
              );
            case "checkbox-group":
              return (
                <CheckboxGroup
                  formik={formik}
                  name={item.name}
                  label={item.label}
                  options={item.options}
                  row={item.row}
                  defaultValue={item.defaultValue}
                />
              );
            case "radio-group":
              return (
                <RadioInput
                  formik={formik}
                  name={item.name}
                  label={item.label}
                  options={item.options}
                  row={item.row}
                  defaultValue={item.defaultValue}
                />
              );
            case "float-number":
              return (
                <FloatNumber
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  variant="outlined"
                  defaultValue={item.defaultValue}
                />
              );
            case "decimal-number":
              return (
                <DecimalNumber
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  variant="outlined"
                  defaultValue={item.defaultValue}
                />
              );
            case "number-with-thousand-separator":
              return (
                <ThousandDividerInput
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  variant="outlined"
                  defaultValue={item.defaultValue}
                />
              );
            case "file":
              return (
                <CustomFile
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  variant="outlined"
                  accept={item.accept}
                />
              );
            case "phone":
              return (
                <PhoneNumberInput
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  variant="outlined"
                  defaultCountry={item.defaultValue}
                  onlyCountries={item.onlyCountries}
                />
              );
            case "switch":
              return (
                <CustomizedSwitch
                  formik={formik}
                  label={item.label}
                  name={item.name}
                  variant={item.variant}
                />
              );
            default:
              return <></>;
          }
        })} */}

        {/* Custom text input */}
        <Text
          type="text"
          animation={true}
          formik={formik}
          id="Email"
          label="Email"
          name="email"
          variant="outlined"
          defaultValue="dewan.mizanur911@gmail.com"
          // required
        />

        {/* Number input */}
        <Text
          type="number"
          name="number"
          label="Number"
          id="number"
          formik={formik}
          variant="outlined"
          animation={false}
          // required
        />

        {/* Custom text area input */}
        <TextArea
          formik={formik}
          id="message"
          label="Message"
          name="message"
          rows={6}
          variant="outlined"
          // required
        />

        {/* Multi select */}
        <MultiSelect
          formik={formik}
          name="selectedOptions"
          id="selectedOptions"
          label="Multiple"
          multiple
          options={[
            {
              value: "option1",
              label: "Option 1",
              disabled: false,
            },
            {
              value: "option2",
              label: "Option 2",
              disabled: false,
            },
            {
              value: "option3",
              label: "Option 3",
              disabled: false,
            },
          ]}
          // required
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
          // required
        />

        {/* Float number input */}
        <FloatNumber
          formik={formik}
          id="floatNumber"
          name="floatNumber"
          label="Float Number"
          variant="outlined"
        />

        {/* Decimal number input */}
        <DecimalNumber
          formik={formik}
          id="decimalNumber"
          name="decimalNumber"
          label="Decimal Number"
          variant="outlined"
          // required
        />

        {/* Number with comma */}
        <ThousandDividerInput
          formik={formik}
          id="numberWithCommas"
          name="numberWithCommas"
          label="Number with Commas"
          rows={1}
          variant="outlined"
          // required
        />
          
          {/* File upload */}
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
          defaultCountry="BD"
          onlyCountries={["BD", "US"]}
          // required
        />

        {/* Custom switch */}
        <CustomizedSwitch
          formik={formik}
          label="Custom Switch"
          name="customSwitch"
          variant="android"
        />

        <Button
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          disabled={
            // (formik.dirty && formik.isValid ? false : true) ||
            formik.isSubmitting
          }
        >
          {/* {!waiting ? 'Save' : 'Saving...'} */}
          Save
        </Button>
      </form>
    </main>
  );
}
