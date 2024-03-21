import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import * as Yup from "yup";

/**
 * Form Validation Schema
 */
const validationSchema = Yup.object().shape({
  name: Yup.string().required("You must enter your name"),
  email: Yup.string()
    .email("You must enter a valid email")
    .required("You must enter an email"),
  password: Yup.string()
    .required("Please enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
),
  acceptTermsConditions: Yup.boolean().oneOf(
    [true],
    "The terms and conditions must be accepted."
  ),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
};

/**
 * The classic sign up page.
 */
function ClassicSignUpPage() {
  return (
    <div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center">
      <Paper className="min-h-full w-full rounded-0 px-16 py-32 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow">
        <div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
            Sign up
          </Typography>
          <div className="mt-2 flex items-baseline font-medium">
            <Typography>Already have an account?</Typography>
            <Link className="ml-4" href="/sign-in">
              Sign in
            </Link>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Form submitted with values:", values);
              resetForm();
            }}
          >
            {({ dirty, isValid, errors }) => (
              <Form
                name="registerForm"
                noValidate
                className="mt-32 flex w-full flex-col justify-center"
              >
                <Field
                  as={TextField}
                  className="mb-24"
                  label="Name"
                  autoFocus
                  name="name"
                  error={!!errors.name}
                  helperText={errors?.name}
                  variant="outlined"
                  required
                  fullWidth
                />

                <Field
                  as={TextField}
                  className="mb-24"
                  label="Email"
                  name="email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email}
                  variant="outlined"
                  required
                  fullWidth
                />

                <Field
                  as={TextField}
                  className="mb-24"
                  label="Password"
                  name="password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password}
                  variant="outlined"
                  required
                  fullWidth
                />

                <Field
                  as={TextField}
                  className="mb-24"
                  label="Password (Confirm)"
                  name="passwordConfirm"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm}
                  variant="outlined"
                  required
                  fullWidth
                />

                <Field name="acceptTermsConditions">
                  {({ field }: any) => (
                    <FormControl
                      className="items-center"
                      error={!!errors.acceptTermsConditions}
                    >
                      <FormControlLabel
                        label="I agree to the Terms of Service and Privacy Policy"
                        control={<Checkbox size="small" {...field} />}
                      />
                      <FormHelperText>
                        {errors?.acceptTermsConditions}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Button
                  variant="contained"
                  color="secondary"
                  className=" mt-24 w-full"
                  aria-label="Register"
                  disabled={!dirty || !isValid}
                  type="submit"
                  size="large"
                >
                  Create your free account
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </div>
  );
}

export default ClassicSignUpPage;
