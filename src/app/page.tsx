"use client";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { matchIsValidTel } from "mui-tel-input";
import {
  CheckboxGroup,
  CustomFile,
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

        {/* Number input */}
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
        {/* <FormControl
          fullWidth
          error={formik.touched.files && Boolean(formik.errors.files)}
        >
          <InputLabel htmlFor="file-upload">Select Files</InputLabel>
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
        </FormControl> */}
        <CustomFile
          formik={formik}
          id="file-upload"
          name="files"
          label="Select Files"
          variant="outlined"
          accept="image/*,.pdf,.doc,.docx"
        />

        {/* Phone number input */}
        <PhoneNumberInput
          formik={formik}
          id="phoneInput"
          name="phoneInput"
          label="Phone Number"
          variant="outlined"
        />

        {/* <div>
          <PhoneNumberInput
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange("phoneNumber")}
            onBlur={formik.handleBlur("phoneNumber")}
            error={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <Box sx={{ color: "red" }}>{String(formik.errors.phoneNumber)}</Box>
          )}
        </div> */}

        {/* Rich text editor */}
        {/* <>
          <FormControl
            fullWidth
            error={formik.touched.content && Boolean(formik.errors.content)}
            sx={{
              border:
                formik.touched.content && formik.errors.content
                  ? "1px solid #f44336"
                  : "1px solid transparent",
              borderRadius: "4px",
            }}
          >
            <RichTextEditor
              name="content"
              ref={rteRef}
              extensions={[StarterKit]}
              content={formik.values.content}
              onChange={(content) => {
                console.log("content", content);
                formik.setFieldValue("content", content);
              }}
              renderControls={() => (
                <MenuControlsContainer>
                  <MenuSelectHeading />
                  <MenuDivider />
                  <MenuButtonBold />
                  <MenuButtonItalic />
                </MenuControlsContainer>
              )}
            />
          </FormControl>
          <FormHelperText style={{ color: "#f44336" }}>
            {formik.touched.content && formik.errors.content}
          </FormHelperText>
        </> */}

        <Button
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          // disabled={waiting}
        >
          {/* {!waiting ? 'Save' : 'Saving...'} */}
          Save
        </Button>
      </form>
    </main>
  );
}
