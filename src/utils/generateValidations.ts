// Author : Dewan Mizanur Rahman


import * as Yup from "yup";
import { all_types } from "@/data/enum";
import { matchIsValidTelCustom } from "./matchIsValidTel";

// Define Yup type with additional methods
type YupType = typeof Yup & {
  [key: string]: any;
};

// Function to generate validations based on a field
export const generateValidations = (field: any): Yup.Schema<any> => {
  const { commonTypes } = all_types || {};
  const yup: YupType = Yup;

  let schema: Yup.Schema<any>;

  // Determine the initial schema based on the field type
  switch (field.type) {
    // case "repeater":
    case commonTypes.TEXT:
      schema = yup.string(); // You may need to customize this for repeater validation
      break;
    // case "checkbox":
    case commonTypes.NUMBER:
      schema = yup.string();
      break;
    // case "date":
    case commonTypes.TEXTAREA:
      schema = yup.string();
      break;
    // case "fieldArray":
    case commonTypes.SELECT:
      schema = yup.array();
      break;
    // case "email":
    case commonTypes.CHECKBOXGROUP:
      schema = yup.array();
      break;
    // case "file":
    case commonTypes.FILE:
      // console.log("file");
      schema = yup.array().of(yup.mixed()); // You may need to customize this for file validation
      break;
    // case commonTypes.FILE:
    //   // console.log("file");
    //   schema = yup.array(); // You may need to customize this for file validation
    //   break;
    // case "radio":
    case commonTypes.RADIOGROUP:
      schema = yup.string(); // You may need to customize this for radio validation
      break;

    case commonTypes.PHONE:
      // if phone is required then use yup.string().required()
      // then it will check for phone number is valid or not

      schema = yup
        .string()
        .required("Phone number is required")
        .test(
          "isValidPhoneNumber",
          `Phone number is not valid`,
          (value: any) => {
            return matchIsValidTelCustom(value);
          }
        );
      break;

    case commonTypes.SWITCH:
      schema = yup.boolean();
      break;

    case commonTypes.FLOAT:
      schema = yup
        .string()
        .typeError("Please enter a valid float number")
        .test(
          "is-decimal",
          "Please enter a valid decimal number with two decimal places",
          (value: any) => (value === null ? true : /^\d+\.\d{2}$/.test(value))
        );
      break;

    case commonTypes.DECIMAL:
      schema = yup
        .string()
        .typeError("Please enter a valid decimal number")
        .test(
          "is-decimal",
          "Please enter a valid decimal number with two decimal places",
          (value: any) =>
            value === null ? true : /^\d+(\.\d{1,2})?$/.test(value)
        );
        break;

    case commonTypes.AUTOCOMPLETE:
      schema = yup.array();
      break;

    default:
      schema = yup.string();
      break;
  }

  // Iterate through each rule in the field's validations
  field?.validations?.forEach((rule: any) => {
    // Apply the rule based on the rule type
    switch (rule.type) {
      case "required":
        schema = schema.required(`${field.label} is required`);
        break;
      case "min":
        schema = schema.min(rule.value, rule.message);
        break;
      case "max":
        schema = schema.max(rule.value, rule.message);
        break;
      case "pattern":
        schema = schema.test({
          name: "pattern",
          message: rule.message,
          test: (value: any) => {
            const regex = new RegExp(rule.value);
            return regex.test(value);
          },
        });
        break;

      case "email":
        schema = schema.email(rule.message);
        break;

      case "test":
        schema = schema.test({
          name: rule.name,
          message: rule.message,
          test: rule.value,
        });
        break;

      default:
        break;
    }
  });

  return schema;
};
