import { generateValidations } from "./generateValidations";
import * as Yup from "yup";

// BUILD INITIAL VALUES AND VALIDATION SCHEMA
export const buildInitialValuesAndValidationSchema = ({
  fields,
}: {
  fields: any[];
}) => {
  const initialValues: Record<string, string> = {};
  const validationSchemaFields: Record<string, any> = {};

  // Generate initial values and validation schema
  fields?.forEach((field) => {
    let newField = field;
    let fieldPath: any = field.name;

    // If the field is a nested field, generate the field path
    initialValues[fieldPath] = newField.defaultValue || "";

    // Generate validation schema fields
    validationSchemaFields[fieldPath] = generateValidations(newField);
  });

  // Generate validation schema
  const validationSchema = Yup.object().shape(validationSchemaFields);

  return { initialValues, validationSchema };
};
