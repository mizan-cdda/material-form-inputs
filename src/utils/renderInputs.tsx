
import React from "react";
import { all_types } from "../data/enum"
import { top100Films } from "../data/fakeData";
import {
    AutoComplete,
    CheckboxGroup,
    CustomFile,
    CustomizedSwitch,
    DecimalNumber,
    FloatNumber,
    MultiSelect,
    PhoneNumberInput,
    RadioInput,
    Text,
    TextArea,
    ThousandDividerInput,
} from "../components";
import CustomPassword from "@/components/CustomPassword";

export const renderInputs = ({ item, formik }: { item: any, formik: any }) => {
    const {
        commonTypes: {
            TEXT,
            NUMBER,
            TEXTAREA,
            SELECT,
            CHECKBOXGROUP,
            RADIOGROUP,
            FLOAT,
            DECIMAL,
            THOUSAND_SEPARATOR,
            FILE,
            PHONE,
            SWITCH,
            AUTOCOMPLETE,
            PASSWORD
        },
    } = all_types || {};
    switch (item.type) {
        case PASSWORD:
            return (
                <CustomPassword
                    formik={formik}
                    id={item.id}
                    name={item.name}
                    label={item.label}
                    type={item.type}
                    variant={item.variant}
                    defaultValue={String(item.defaultValue) || ""}
                    key={item.id}
                    animation={false}
                />
            );
        case TEXT:
            return (
                <Text
                    formik={formik}
                    id={item.id}
                    name={item.name}
                    label={item.label}
                    type="text"
                    variant={item.variant}
                    defaultValue={String(item.defaultValue) || ""}
                    key={item.id}
                    choices={item.choices || []}
                    animation={false}
                />
            );

        case NUMBER:
            return (
                <Text
                    formik={formik}
                    id={item.id}
                    name={item.name}
                    label={item.label}
                    type="number"
                    variant={item.variant}
                    defaultValue={String(item.defaultValue) || ""}
                    key={item.id}
                    choices={item.choices || []}
                    animation={false}
                />
            );

        case TEXTAREA:
            return (
                <TextArea
                    formik={formik}
                    id={item.id}
                    name={item.name}
                    label={item.label}
                    rows={6}
                    variant={item.variant || "outlined"}
                    choices={item.choices || []}
                    key={item.id}
                />
            );

        case SELECT:
            return (
                <MultiSelect
                    formik={formik}
                    name={item.name}
                    id={item.id}
                    label={item.label}
                    multiple={item.multiple}
                    options={item.options || []}

                    key={item.id}
                />
            );

        case RADIOGROUP:
            return (
                <RadioInput
                    formik={formik}
                    name={item.name}
                    label={item.label}
                    options={item.options || []}
                    row={item.row}
                    key={item.id}
                />
            );

        case CHECKBOXGROUP:
            return (
                <CheckboxGroup
                    formik={formik}
                    name={item.name}
                    label={item.label}
                    options={item.options || []}
                    row={item.row}
                    key={item.id}
                />
            );

        case FLOAT:
            return (
                <FloatNumber
                    formik={formik}
                    id={item.id}
                    name={item.name}
                    label={item.label}
                    variant={item.variant || "outlined"}
                    decimalDigits={item.decimalDigits}
                    choices={item.choices || []}
                    key={item.id}
                />
            );

        case DECIMAL:
            return (
                <DecimalNumber
                    formik={formik}
                    id={item.id}
                    name={item.name}
                    label={item.label}
                    variant={item.variant || "outlined"}
                    decimalDigits={item.decimalDigits}
                    choices={item.choices || []}
                    key={item.id}
                />
            );

        case THOUSAND_SEPARATOR:
            return (
                <ThousandDividerInput
                    formik={formik}
                    id={item.id}
                    name={item.name}
                    label={item.label}
                    rows={1}
                    decimalDigits={item.decimalDigits}
                    variant={item.variant || "outlined"}
                    choices={item.choices || []}
                    key={item.id}
                />
            );

        case FILE:
            return (
                <CustomFile
                    formik={formik}
                    id={item.id}
                    name={item.name}
                    label={item.label}
                    variant={item.variant || "outlined"}
                    key={item.id}
                />
            );

        case PHONE:
            return (
                <PhoneNumberInput
                    formik={formik}
                    id={item.id}
                    name={item.name}
                    label={item.label}
                    variant={item.variant || "outlined"}
                    defaultCountry="BD"
                    onlyCountries={["BD", "US"]}
                    choices={item.choices || []}
                    key={item.id}
                />
            );

        case SWITCH:
            return (
                <CustomizedSwitch
                    formik={formik}
                    label={item.label}
                    name={item.name}
                    variant={
                        item.variant as
                        | "android"
                        | "ios"
                        | "ant"
                        | "default"
                        | undefined
                    }
                    key={item.id}
                />
            );

        case AUTOCOMPLETE:
            return (
                <AutoComplete
                    key={item.id}
                    formik={formik}
                    id={item.id}
                    name={item.name}
                    Label={item.label}
                    options={top100Films}
                    multiple={item.multiple}
                />
            );

        default:
            return null;
    }
}