"use client";
import TransferList from "@/components/TransferList";
import { Box, Divider, Stack } from "@mui/material";
import React from "react";

const Transfer = () => {
  return (
    // Stack is like a flex container
    <Stack
      direction={{ xs: "column", sm: "row" }}
      useFlexGap
      flexWrap="wrap"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="center"
      alignItems="center"
    >
      {/* Transfer list */}
      <div>
        <h2>Transfer list</h2>
        <TransferList />
      </div>
    </Stack>
  );
};

export default Transfer;
