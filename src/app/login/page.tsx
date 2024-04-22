"use client";
import styles from "../page.module.css";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { renderInputs } from "@/utils/renderInputs";
import { buildInitialValuesAndValidationSchema } from "@/utils/valuesWithSchema";
import { login } from "@/data/login";

export default function Home() {
    const { initialValues, validationSchema } =
        buildInitialValuesAndValidationSchema({ fields: login });

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
                {login.map((item) => {
                    return renderInputs({ item, formik });
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
