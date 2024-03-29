"use client";
import AutoCompleteField from "@/components/AutoComplete";
import { Divider, Stack } from "@mui/material";
import React from "react";

const AutoComplete = ({
  options,
  id,
  formik,
  name,
  Label,
  required,
  multiple,
}: {
  options: { title: string; year: number }[];
  id: string;
  formik: any;
  name: string;
  Label: string;
  required?: boolean;
  multiple?: boolean;
}) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      useFlexGap
      flexWrap="wrap"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="center"
      alignItems="center"
    >
      {/* Custom auto complete input */}
      <h2>Auto complete field</h2>
      <AutoCompleteField
        id={id}
        formik={formik}
        label={Label}
        name={name}
        required={required}
        options={options}
        multiple={true}
      />
    </Stack>
  );
};

export default AutoComplete;
