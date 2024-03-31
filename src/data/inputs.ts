export const data = [
  {
    id: "Email",
    name: "email",
    type: "text",
    placeholder: "Enter your email",
    label: "Email",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "mizan@cdda.io",
    validations: [
      {
        type: "required",
        value: true,
        message: "Email is required",
      },
      {
        type: "email",
        value: true,
        message: "Enter a valid email",
      },
    ],
  },
  {
    id: "number",
    name: "number",
    type: "number",
    placeholder: "Enter your number",
    label: "Number",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "95866",
    validations: [
      {
        type: "required",
        value: true,
        message: "Number is required",
      },
      {
        type: "min",
        value: 1,
        message: "Number must be greater than 0",
      },
    ],
  },
  {
    id: "message",
    name: "message",
    type: "textarea",
    placeholder: "Enter your message",
    label: "Message",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "Hello there!",
    validations: [
      {
        type: "required",
        value: true,
        message: "Message is required",
      },
      {
        type: "min",
        value: 1,
        message: "Message must be greater than 0",
      },
      {
        type: "max",
        value: 255,
        message: "Message must be less than 255",
      },
    ],
  },
  {
    id: "selectedOptions",
    name: "selectedOptions",
    type: "select",
    placeholder: "Select your options",
    label: "Select Options",
    variant: "outlined", // outlined, filled, standard
    options: [
      {
        value: "option1",
        label: "Option 1",
      },
      {
        value: "option2",
        label: "Option 2",
      },
      {
        value: "Option 3",
        label: "Option 3",
      },
    ],
    multiple: true, // if true, multiple options can be selected, if false, only one option can be selected
    defaultValue: ["option1", "option2"],
    validations: [
      {
        type: "min",
        value: 1,
        message: "Select at least one option",
      },
    ],
  },
  {
    id: "checkbox-group",
    name: "checkedItems",
    type: "checkbox-group",
    label: "Checkbox Group",
    options: [
      {
        value: "checkbox1",
        label: "Checkbox 1",
        disabled: false,
      },
      {
        value: "checkbox2",
        label: "Checkbox 2",
        disabled: false,
      },
      {
        value: "checkbox3",
        label: "Checkbox 3",
        disabled: false,
      },
    ],
    row: true, // if true, checkboxes will be displayed in a row, if false, checkboxes will be displayed in a column,
    defaultValue: ["checkbox1", "checkbox2"],
    validations: [
      {
        type: "min",
        value: 1,
        message: "Select at least one checkbox",
      },
    ],
  },
  {
    id: "radio-group",
    name: "radioValue",
    type: "radio-group",
    label: "Radio Group",
    options: [
      {
        value: "female",
        label: "Female",
        disabled: false,
      },
      {
        value: "male",
        label: "Male",
        disabled: false,
      },
      {
        value: "other",
        label: "Other",
        disabled: false,
      },
      {
        value: "disabled",
        label: "Other",
        disabled: true,
      },
    ],
    row: true, // if true, radios will be displayed in a row, if false, radios will be displayed in a column,
    defaultValue: "male",
    validations: [
      {
        type: "required",
        value: true,
        message: "Select an option",
      },
    ],
  },
  {
    id: "float-number",
    name: "floatNumber",
    type: "float-number",
    placeholder: "Enter your float number",
    label: "Float Number",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "27.00",
    decimalDigits: 2,
    validations: [
      {
        type: "required",
        value: true,
        message: "Float Number is required",
      },
      {
        type: "min",
        value: 1,
        message: "Float Number must be greater than 0",
      },
    ],
  },
  {
    id: "decimal-number",
    name: "decimalNumber",
    type: "decimal-number",
    placeholder: "Enter your decimal number",
    label: "Decimal Number",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "27.00",
    decimalDigits: 2,
    validations: [
      {
        type: "required",
        value: true,
        message: "Decimal Number is required",
      },
      {
        type: "min",
        value: 1,
        message: "Decimal Number must be greater than 0",
      },
    ],
    choices: [
      {
        value: "27.00",
        label: "27.00",
      },
      {
        value: "29.00",
        label: "29.00",
      },
      {
        value: "30.00",
        label: "30.00",
      },
    ],
  },
  {
    id: "number-with-thousand-separator",
    name: "numberWithThousandSeparator",
    type: "number-with-thousand-separator",
    placeholder: "Enter your number with thousand separator",
    label: "Number With Thousand Separator",
    variant: "outlined", // outlined, filled, standard
    defaultValue: "27,000",
    decimalDigits: 2,
    validations: [
      {
        type: "required",
        value: true,
        message: "Number with Thousand Separator is required",
      },
    ],
  },
  {
    id: "files",
    name: "files",
    type: "file",
    label: "File",
    variant: "outlined", // outlined, filled, standard
    accept: ".pdf,.docx,.doc",
    defaultValue: "",
    validations: [
      {
        type: "required",
        value: true,
        message: "File is required",
      },
      {
        type: "min",
        value: 2,
        message: "Select at most two files",
      },
    ],
  },
  {
    id: "phoneInput",
    name: "phoneInput",
    type: "phone",
    placeholder: "Enter your phone number",
    label: "Phone",
    variant: "outlined", // outlined, filled, standard
    defaultCountry: "BD",
    defaultValue: "+8801313124926",
    onlyCountries: ["us", "bd"],
    validations: [
      {
        type: "required",
        value: true,
        message: "Phone is required",
      },
    ],
  },
  {
    id: "customSwitch",
    name: "customSwitch",
    type: "switch",
    label: "Custom Switch",
    defaultValue: true,
    variant: "android", // ios, android, ant, default
    validations: [
      {
        type: "required",
        value: true,
        message: "Custom Switch is required",
      },
    ],
  },
  {
    id: "auotcomplete",
    name: "autocomplete",
    type: "autocomplete",
    label: "Auto Complete Field",
    variant: "outlined",
    defaultValue: [{ title: "The Shawshank Redemption", year: 1994 }],
    multiple: true,
    validations: [
      {
        type: "min",
        value: 1,
        message: "Select at least one option",
      },
    ],
  },
];
