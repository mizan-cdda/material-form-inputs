import { matchIsValidTel } from "mui-tel-input";

export const matchIsValidTelCustom = (phoneNumber: string) => {
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
