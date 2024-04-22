import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import { LuDatabase } from "react-icons/lu";

const EnumValues = ({
  formik,
  name,
  choices,
  top = "25%",
  right = "1%",
}: {
  formik: any;
  name: string;
  choices: { value: string; label: string }[];
  top?: string;
  right?: string;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = ({ value }: { value: string }) => {
    if (value) formik.setFieldValue(name, value);
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top,
        right,
      }}
    >
      <Tooltip
        title="Enum"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // height: "100%",
          width: "100%",
          borderRadius: "10%",
        }}
      >
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          {/* <AccountCircle /> */}
          <LuDatabase />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {choices?.map((choice, i) => {
          return (
            <MenuItem
              key={i}
              onClick={() => handleClose({ value: choice.value })}
            >
              {choice.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default EnumValues;
