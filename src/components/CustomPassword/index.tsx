import { IconButton, InputAdornment, Stack, TextField, TextFieldVariants } from "@mui/material";
import React, { useState } from "react";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomPassword = ({
    formik,
    name,
    label,
    id,
    type,
    animation = true,
    variant,
    multiline = false,
    rows = 1,
    helperText = true,
    defaultValue = "Hello world",
    required = false,
    choices = [],
}: {
    formik: any;
    type: string;
    animation: boolean;
    name: string;
    label: string;
    id: string;
    variant?: string;
    multiline?: boolean;
    rows?: number;
    helperText?: boolean;
    defaultValue?: string;
    required?: boolean;
    choices?: any[];
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <Stack spacing={1} direction="row" position="relative">
            <TextField
                rows={rows}
                multiline={multiline}
                defaultValue={defaultValue}
                fullWidth
                id={id}
                variant={variant ? (variant as TextFieldVariants) : "outlined"}
                // InputLabelProps={{
                //     shrink: animation && formik.values.email ? true : false,
                // }}
                type={showPassword ? "text" : "password"}
                name={name}
                label={label}
                value={formik.values?.[name]}

                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleToggleShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
                helperText={
                    helperText && formik.touched?.[name] && formik.errors?.[name]
                }
                {...(required && { required: true })}
            />
        </Stack>
    );
};

export default CustomPassword;
