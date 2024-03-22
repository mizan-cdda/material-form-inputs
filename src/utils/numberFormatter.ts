const formatNumber = ({
  value,
  format = "thousand-divider",
}: {
  value: any;
  format?: string;
}) => {
  const numericValue = value.replace(/\D/g, "");
  switch (format) {
    case "thousand-divider":
      // Remove non-numeric characters
      // Add commas for thousands
      return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    case "decimal":
    case "float":
      // Remove non-numeric and non-decimal characters
      // Split the value into integer and decimal parts
      const [integerPart, decimalPart] = numericValue.split(".");
      // Add commas for thousands in the integer part
      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );
      // Combine the formatted integer and decimal parts with a decimal point
      return decimalPart
        ? `${formattedIntegerPart}.${decimalPart}`
        : formattedIntegerPart;
  }
};
