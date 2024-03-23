import React, { useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
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

  // handle submit for otp form , joining all input values together
  const handleSubmit = (values: any, actions: any) => {
    const otp = values.otp.join("");
    actions.setSubmitting(false);
    if (otp) {
      alert(`OTP submitted: ${otp}`);
    }
  };

  //  refer changes
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array.from({ length: 5 }, () => null)
  );

  // handle paste event
  const handlePaste = ({
    e,
    setFieldValue,
  }: {
    e: React.ClipboardEvent<HTMLInputElement>;
    setFieldValue: (field: string, value: string) => void;
  }) => {
    // Get pasted data from clipboard
    const pastedData = e.clipboardData.getData("Text").split("");
    if (pastedData.length === inputRefs.current.length) {
      // Update the formik values with the formatted value
      pastedData?.forEach((input, index) => {
        // Check if the pasted data is a number
        if (!isNaN(parseInt(input))) {
          inputRefs.current[index]?.setAttribute("disabled", "true"); // disable the input
          inputRefs.current[index].value = Number(pastedData[index]); // set the value
          setFieldValue(`otp[${index}]`, Number(pastedData[index])); // update the formik values
          if (index === inputRefs.current.length - 1) {
            // focus on the last input
            inputRefs.current[index]?.removeAttribute("disabled"); // enable the last input
            inputRefs.current[index]?.focus();
          }
        }
      });
    } else {
      return;
    }
  };

  // effect for initializing first input focus and disabling otherss
  useEffect(() => {
    inputRefs.current[0]?.focus();
    // others input will be disabled
    inputRefs.current.forEach((input, index) => {
      if (index !== 0) {
        input?.setAttribute("disabled", "true");
      }
    });
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
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
                    name={`otp[${index}]`}
                    type="text"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    onPaste={(e) =>
                      index === 0
                        ? handlePaste({ e, setFieldValue })
                        : undefined
                    }
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");

                      // Update the formik values with the formatted value
                      field.onChange({
                        target: {
                          // Simulate the event object
                          value: numericValue,
                          name: field.name,
                        },
                      });

                      if (
                        numericValue.length === 1 &&
                        index < inputRefs.current.length - 1
                      ) {
                        // enable the next input
                        inputRefs.current.forEach((input, i) => {
                          if (i === index + 1) {
                            input?.removeAttribute("disabled");
                          } else {
                            input?.setAttribute("disabled", "true");
                          }
                        });
                        inputRefs?.current[index + 1]?.focus();
                      }

                      // If the input is empty and the user is deleting the value
                      if (numericValue.length === 0 && index > 0) {
                        // enable the previous input
                        inputRefs.current.forEach((input, i) => {
                          if (i === index - 1) {
                            input?.removeAttribute("disabled");
                          } else {
                            input?.setAttribute("disabled", "true");
                          }
                        });
                        inputRefs?.current[index - 1]?.focus();
                      }
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 1,

                      autoComplete: "off",
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
