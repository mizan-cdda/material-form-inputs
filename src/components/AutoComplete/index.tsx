// import * as React from "react";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import { FormHelperText } from "@mui/material";

// export default function AutoCompleteField({
//   formik,
//   name,
//   label,
//   required = false,
//   id,
//   options = [],
//   multiple,
// }: {
//   formik: any;
//   id: string;
//   name: string;
//   label: string;
//   required?: boolean;
//   options?: { title: string; year: number }[];
//   multiple?: boolean;
// }) {
//   // Check if there's an error for the current field
//   const isError = formik.touched?.[name] && formik.errors?.[name];

//   console.log("is Error", isError)

//   const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
//     formik.setFieldValue(name, value);
//   };
//   return (
//     <Stack spacing={3} sx={{ width: 500 }}>
//       <Autocomplete
//         // multiple
//         {...(required && { required: true })}
//         {...(multiple && { multiple: true })}
//         id={id}
//         options={options}
//         getOptionLabel={(option) => option.title}
//         // defaultValue={[top100Films[13]]}
//         filterSelectedOptions
//         value={formik.values?.[name]}
//         onChange={handleChange} // Ensure onChange is correctly defined
//         isOptionEqualToValue={(option, value) => {
//           return option.title === value.title && option.year === value.year;
//         }}
//         renderInput={(params) => (
//           <>
//             <TextField
//               {...params}
//               name={name}
//               label={label}
//               placeholder="Favorites"
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderColor: isError ? "red" : undefined, // Change border color to red if there's an error
//                 },
//               }}
//             />
//             <FormHelperText
//               sx={{
//                 color: "red",
//               }}
//             >
//               {formik.touched?.[name] && formik.errors?.[name]}
//             </FormHelperText>
//           </>
//         )}
//       />
//     </Stack>
//   );
// }

import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { FormHelperText } from "@mui/material";

export default function AutoCompleteField({
  formik,
  name,
  label,
  required = false,
  id,
  options = [],
  multiple,
}: {
  formik: any;
  id: string;
  name: string;
  label: string;
  required?: boolean;
  options?: { title: string; year: number }[];
  multiple?: boolean;
}) {
  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    formik.setFieldValue(name, value);
  };

  // Check if there's an error for the current field
  const isError = formik.touched?.[name] && formik.errors?.[name];

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        // multiple
        {...(required && { required: true })}
        {...(multiple && { multiple: true })}
        id={id}
        options={options}
        getOptionLabel={(option) => option.title}
        // defaultValue={[top100Films[13]]}
        filterSelectedOptions
        value={formik.values?.[name]}
        onChange={handleChange} // Ensure onChange is correctly defined
        isOptionEqualToValue={(option, value) => {
          return option.title === value.title && option.year === value.year;
        }}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              name={name}
              label={label}
              placeholder={"Select " + label}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: isError ? "red!important" : undefined, // Change border color to red if there's an error
                },
              }}
            />
            <FormHelperText
              sx={{
                color: "red",
              }}
            >
              {formik.touched?.[name] && formik.errors?.[name]}
            </FormHelperText>
          </>
        )}
      />
    </Stack>
  );
}
