"use client";
import styles from "./page.module.css";
import { Button } from "@mui/material";
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
import { buildInitialValuesAndValidationSchema } from "@/utils/valuesWithSchema";
import { data } from "@/data/inputs";
import { all_types } from "@/data/enum";

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
      IS_EMAIL,
    },
  } = all_types || {};
  const { initialValues, validationSchema } =
    buildInitialValuesAndValidationSchema({ fields: data });

  const formik = useFormik({
    initialValues,
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
