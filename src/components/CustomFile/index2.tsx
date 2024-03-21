import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CustomFile = ({
  formik,
  id,
  name,
  label,
  variant,
  accept = ".pdf,.doc,.docx",
}: {
  formik: any;

  id: string;
  name: string;
  label: string;
  variant: string;
  accept?: string;
}) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput
        type="file"
        name={name}
        accept={accept}
        id={id}
        onChange={(e: any) => {
          const files = Array.from(e.target?.files);
          formik.setFieldValue(name, files);
        }}
      />
    </Button>
  );
};

export default CustomFile;
