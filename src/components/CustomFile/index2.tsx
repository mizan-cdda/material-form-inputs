import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { Box, IconButton } from "@mui/material";

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
  accept = ".pdf,.doc,.docx,image/*", // Allow image files
}: {
  formik: any;
  id: string;
  name: string;
  label: string;
  variant: string;
  accept?: string;
}) => {
  const [fileThumbnails, setFileThumbnails] = useState<
    { file: File; thumbnail: string }[]
  >([]);

  const handleFileChange = (e: any) => {
    const files: File[] = Array.from(e.target?.files);

    // Read image files and generate thumbnails
    const imageFiles = files.filter((file: File) =>
      file.type.startsWith("image/")
    );
    const imageThumbnails = imageFiles.map((file: File) => ({
      file,
      thumbnail: URL.createObjectURL(file),
    }));
    setFileThumbnails([...fileThumbnails, ...imageThumbnails]);

    // Set Formik values
    formik.setFieldValue(name, [...(formik.values[name] || []), ...imageFiles]);
  };

  const handleDelete = (index: number) => {
    const updatedThumbnails = [...fileThumbnails];
    const deletedFile = updatedThumbnails.splice(index, 1)[0].file;
    setFileThumbnails(updatedThumbnails);

    // Remove file from Formik values
    const updatedFiles = formik.values[name].filter(
      (file: File) => file !== deletedFile
    );
    formik.setFieldValue(name, updatedFiles);
  };

  return (
    <>
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
          multiple
          name={name}
          accept={accept}
          id={id}
          onChange={handleFileChange}
        />
      </Button>
      {/* Display image thumbnails */}
      {fileThumbnails.length > 0 && (
        <div>
          <strong>Uploaded Images:</strong>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {fileThumbnails.map((thumbnail, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{ position: "relative", height: "50px", width: "120px" }}
                >
                  <Image
                    src={thumbnail.thumbnail}
                    alt={`Thumbnail ${index}`}
                    fill
                  />
                </Box>
                {/* just a delete icon */}
                <IconButton aria-label="delete">
                  <DeleteIcon
                    sx={{
                      transition: "color 0.3s",
                      ":hover": {
                        color: "red",
                      },
                    }}
                    onClick={() => handleDelete(index)}
                  />
                </IconButton>
              </div>
            ))}

            {/* {required && !formik.values[name] && (
              <div style={{ color: "red" }}>This field is required</div>
            )} */}
          </Box>
        </div>
      )}
      {/* Formik error message */}
      {formik.touched[name] && formik.errors[name] && (
        <div style={{ color: "red" }}>{formik.errors[name]}</div>
      )}
    </>
  );
};

export default CustomFile;
