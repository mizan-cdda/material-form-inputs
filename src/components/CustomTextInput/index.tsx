import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function CustomTextInput() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          name="firstName"
          id="outlined-required"
          label="Hello World!"
          defaultValue="Hello World"
        />
      </div>
    </Box>
  );
}
