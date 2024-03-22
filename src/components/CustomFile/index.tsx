import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";

const CustomFile = ({
  formik,
  id,
  name,
  label,
  variant,
  accept = ".pdf,.doc,.docx",
  multiple = false,
}: {
  formik: any;

  id: string;
  name: string;
  label: string;
  variant: string;
  accept?: string;
  multiple?: boolean;
}) => {
  const [filesArr, setFilesArr] = useState([]);
  const handleFileChange = (event: any) => {
    const files = Array.from(event.target?.[name]);
    setFilesArr([...filesArr, files]);
    formik.setFieldValue(name, files);
  };
  return (
    <FormControl
      fullWidth
      error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
    >
      <InputLabel htmlFor="file-upload" aria-labelledby="demo-row-file-label">
        {label}
      </InputLabel>
      <Input
        id={id}
        aria-labelledby="demo-row-file-label"
        type="file"
        name={name}
        onChange={handleFileChange}
        inputProps={{ accept }} // Specify accepted file types
      />
      <FormHelperText>
        {formik.touched?.[name] && formik.errors?.[name]}
      </FormHelperText>
      {filesArr?.map((file: any, index: number) => {
        console.log(file);
        return (
          <div key={index}>
            <p>{file.name}</p>
            <p>{file.size} bytes</p>
          </div>
        );
      })}
    </FormControl>
  );
};

export default CustomFile;
