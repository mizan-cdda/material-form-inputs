"use client";
import AutoCompleteField from "@/components/AutoComplete";
import { Box, Divider, Stack } from "@mui/material";
import React from "react";

const AutoComplete = () => {
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
      <AutoCompleteField />
    </Stack>
  );
};

export default AutoComplete;
