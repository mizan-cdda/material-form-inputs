export const login = [
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
        choices: [
            {
                value: "mizan@cdda.io",
                label: "Mizanur CDDA",
            },
            {
                value: "mizanur15-911@diu.edu.bd",
                label: "Mizanur DIU",
            },
            {
                value: "imran@cdda.io",
                label: "Imran CDDA",
            },
        ],
    },
    {
        id: "Password",
        name: "Password",
        type: "password",
        placeholder: "Enter your email",
        label: "Password",
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
        choices: [
            {
                value: "+8801313124926",
                label: "+8801313124926",
            },
            {
                value: "+8801313124927",
                label: "+8801313124927",
            },
            {
                value: "+8801313124928",
                label: "+8801313124928",
            },
        ],
    },
];
