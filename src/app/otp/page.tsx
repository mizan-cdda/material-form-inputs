"use client";
import AutoCompleteField from "@/components/AutoComplete";
import OTPInput from "@/components/OTP";
import OTPForm from "@/components/OTP/index2";
import TransferList from "@/components/TransferList";
import { Box, Divider, Stack } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Stack
      direction="row"
      useFlexGap
      flexWrap="wrap"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="center"
      alignItems="center"
    >
      {/* <OTPInput /> */}
      <OTPForm />
    </Stack>
  );
};

export default Home;
