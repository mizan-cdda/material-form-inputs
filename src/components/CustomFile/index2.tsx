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
  accept, // Allow image files
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
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: any) => {
    const files: File[] = Array.from(e.target?.files);

    // show file thumbnail
    const fileThumbnails = files.map((file: File) => ({
      file,
      thumbnail: URL.createObjectURL(file),
    }));
    setFileThumbnails([...fileThumbnails]);

    // Set Formik values
    formik.setFieldValue(name, [...(formik.values[name] || []), ...files]);
  };

  // const handleFileChange = (e: any) => {
  //   const files = Array.from(e.target.files);
  //   const totalFiles = files.length;
  //   let uploadedFiles = 0;
  //   let totalProgress = 0;
  //   const responses: any[] = []; // Array to store responses

  //   // show file thumbnail
  //   const fileThumbnails = files.map((file) => ({
  //     file,
  //     thumbnail: URL.createObjectURL(file as Blob),
  //   }));
  //   setFileThumbnails([...fileThumbnails] as {
  //     file: File;
  //     thumbnail: string;
  //   }[]);

  //   // Upload files
  //   files.forEach((file) => {
  //     const formData = new FormData();
  //     formData.append("file", file as Blob);

  //     const xhr = new XMLHttpRequest();

  //     xhr.upload.addEventListener("progress", (e) => {
  //       if (e.lengthComputable) {
  //         totalProgress += (e.loaded / e.total) * (100 / totalFiles);
  //         setProgress(totalProgress);
  //       }
  //     });

  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === XMLHttpRequest.DONE) {
  //         uploadedFiles++;

  //         // Handle the completion of the upload
  //         if (uploadedFiles === totalFiles) {
  //           // Log completion message after all uploads are done
  //           console.log("All uploads complete");
  //         }

  //         // Handle response from the server
  //         if (xhr.status === 200) {
  //           const response = JSON.parse(xhr.responseText);
  //           responses.push(response); // Store the response
  //           // You can use the response as needed
  //           console.log("Response from server:", response);
  //         }
  //       }
  //     };

  //     xhr.open("POST", "https://dev.cdda.io/filemanager", true);
  //     xhr.send(formData);

  //     // Set Formik values
  //     formik.setFieldValue(name, [...(formik.values[name] || []), file]);
  //   });
  // };

  const handleDelete = (index: number) => {
    const deletedFile = formik.values[name][index];

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
            {formik.values?.[name].map((thumbnail: File, index: number) => {
              const thumb = URL.createObjectURL(thumbnail);
              return (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "50px",
                      width: "120px",
                    }}
                  >
                    <Image src={thumb} alt={thumbnail?.name} fill />
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
              );
            })}
            {progress > 0 && (
              <div>
                <progress value={progress} max="100" />
                <span>{Math.round(progress)}%</span>
              </div>
            )}
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
