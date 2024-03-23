import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField } from "@mui/material";

const validationSchema = Yup.object().shape({
  otp: Yup.array()
    .of(
      Yup.string()
        .length(1, "Each digit must be exactly 1 character long")
        .required("This field is required")
    )
    .required("OTP is required")
    .min(5, "OTP must be 5 digits")
    .max(5, "OTP must be 5 digits"),
});

const OTPForm = () => {
  const initialValues = {
    otp: ["", "", "", "", ""],
  };

  const handleSubmit = (values: any, actions: any) => {
    const otp = values.otp.join("");
    console.log("Valid OTP:", otp);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              maxWidth: "300px",
            }}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Field
                key={index}
                name={`otp[${index}]`}
                render={({ field }: { field: any }) => (
                  <TextField
                    {...field}
                    type="text"
                    // label={`Digit ${index + 1}`}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");

                      // Update the formik values with the formatted value
                      field.onChange({
                        target: { // Simulate the event object
                          value: numericValue,
                          name: field.name,
                        },
                      });
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 1,
                    }}
                    error={
                      field.touched?.[`otp[${index}]`] &&
                      (field.value.length === 0 ||
                        (field.value.length === 1 &&
                          isNaN(parseInt(field.value))))
                    }
                  />
                )}
              />
            ))}
          </Box>
          {/* <ErrorMessage name="otp" component="div" /> */}
          <Button
            sx={{
              marginTop: "1rem",
              width: "100%",
            }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || values.otp.some((digit) => digit === "")}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default OTPForm;
