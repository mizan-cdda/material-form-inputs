"use client";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import {
  AutoComplete,
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
import { buildInitialValuesAndValidationSchema } from "@/utils/valuesWithSchema";
import { data } from "@/data/inputs";
import { all_types } from "@/data/enum";
import { top100Films } from "@/data/fakeData";

export default function Home() {
  const {
    commonTypes: {
      TEXT,
      NUMBER,
      TEXTAREA,
      SELECT,
      CHECKBOXGROUP,
      RADIOGROUP,
      FLOAT,
      DECIMAL,
      THOUSAND_SEPARATOR,
      FILE,
      PHONE,
      SWITCH,
      AUTOCOMPLETE,
    },
  } = all_types || {};
  const { initialValues, validationSchema } =
    buildInitialValuesAndValidationSchema({ fields: data });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any, { setSubmitting }) => {
      console.log("Form values:", values);
      const formData = new FormData();
      // Loop through form values and append them to FormData
      Object.entries(values).forEach(([fieldName, fieldValue]) => {
        // Handle file inputs separately
        if (
          Array.isArray(fieldValue) &&
          fieldValue.some((item) => item instanceof File)
        ) {
          fieldValue.forEach((file, index) => {
            formData.append(fieldName, file);
          });
        }
      });

      // Make a POST request to the server
      try {
        // Create an AbortController instance
        const controller = new AbortController();
        // Get the signal from the controller
        const signal = controller.signal;
        // Set formik submitting to true
        setSubmitting(true);
        // Override the default timeout by setting an unlimited AbortController timeout
        const timeoutDuration = 10800000;
        setTimeout(() => controller.abort(), timeoutDuration);
        const response = await fetch("https://dev.cdda.io/filemanager", {
          method: "POST",
          body: formData,
          signal,
        });

        // Check if the request was aborted
        if (signal.aborted) {
          throw new Error("Request aborted");
        }

        // Check for successful response status
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (response.status < 400) {
          const newResponse = await fetch("https://dev.cdda.io/test", {
            method: "POST",
            body: JSON.stringify({ ...values, ...data }),
          });
          const nData = await newResponse.json();
          console.log("Response from server:", nData);
        }
        // Handle response
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch request was aborted:", error);
        } else {
          console.error("Error occurred during fetch request:", error);
          // Handle other errors
        }
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
        {data.map((item, i) => {
          switch (item.type) {
            case TEXT:
              return (
                <Text
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  type="text"
                  variant={item.variant}
                  defaultValue={String(item.defaultValue) || ""}
                  key={i}
                  animation={false}
                />
              );

            case NUMBER:
              return (
                <Text
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  type="number"
                  variant={item.variant}
                  defaultValue={String(item.defaultValue) || ""}
                  key={i}
                  animation={false}
                />
              );

            case TEXTAREA:
              return (
                <TextArea
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  rows={6}
                  variant={item.variant || "outlined"}
                  key={i}
                />
              );

            case SELECT:
              return (
                <MultiSelect
                  formik={formik}
                  name={item.name}
                  id={item.id}
                  label={item.label}
                  multiple={item.multiple}
                  options={item.options || []}
                  key={i}
                />
              );

            case RADIOGROUP:
              return (
                <RadioInput
                  formik={formik}
                  name={item.name}
                  label={item.label}
                  options={item.options || []}
                  row={item.row}
                  key={i}
                />
              );

            case CHECKBOXGROUP:
              return (
                <CheckboxGroup
                  formik={formik}
                  name={item.name}
                  label={item.label}
                  options={item.options || []}
                  row={item.row}
                  key={i}
                />
              );

            case FLOAT:
              return (
                <FloatNumber
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  variant={item.variant || "outlined"}
                  decimalDigits={item.decimalDigits}
                  key={i}
                />
              );

            case DECIMAL:
              return (
                <DecimalNumber
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  variant={item.variant || "outlined"}
                  decimalDigits={item.decimalDigits}
                  choices={item.choices || []}
                  key={i}
                />
              );

            case THOUSAND_SEPARATOR:
              return (
                <ThousandDividerInput
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  rows={1}
                  decimalDigits={item.decimalDigits}
                  variant={item.variant || "outlined"}
                  key={i}
                />
              );

            case FILE:
              return (
                <CustomFile
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  variant={item.variant || "outlined"}
                  key={i}
                />
              );

            case PHONE:
              return (
                <PhoneNumberInput
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  label={item.label}
                  variant={item.variant || "outlined"}
                  defaultCountry="BD"
                  onlyCountries={["BD", "US"]}
                  key={i}
                />
              );

            case SWITCH:
              return (
                <CustomizedSwitch
                  formik={formik}
                  label={item.label}
                  name={item.name}
                  variant={
                    item.variant as
                      | "android"
                      | "ios"
                      | "ant"
                      | "default"
                      | undefined
                  }
                  key={i}
                />
              );

            case AUTOCOMPLETE:
              return (
                <AutoComplete
                  key={i}
                  formik={formik}
                  id={item.id}
                  name={item.name}
                  Label={item.label}
                  options={top100Films}
                  multiple={item.multiple}
                />
              );

            default:
              return null;
          }
        })}

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
