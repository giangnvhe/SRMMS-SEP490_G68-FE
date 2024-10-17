import { Form, Select } from "antd";
import { Rule } from "antd/es/form";
import React from "react";
import styles from "./index.module.scss";

import classNames from "classnames";
const cx = classNames.bind(styles);

export interface Option {
  value: string;
  label: string;
}
interface Iprops {
  style?: React.CSSProperties;
  defaultValue?: string | undefined | null;
  label?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  status?: "error" | "warning";
  name: string;
  rules?: Rule[];
  placeholder?: string;
  allowClear?: boolean;
  className?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  onSelect?: (value: string, option: Option) => void;
  options: Option[] | [];
  showSearch?: boolean;
}
const SelectComponent = ({
  style,
  required,
  defaultValue,
  allowClear = true,
  placeholder = "Select",
  label,
  name,
  rules,
  onChange,
  loading,
  status,
  disabled,
  className = "",
  options,
  onSelect,
  showSearch = false,
}: Iprops) => {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Form.Item
      required={required}
      label={label}
      name={name}
      rules={rules}
      preserve={false}
      className={cx("select-component", { [className]: !!className })}
    >
      <Select
        defaultValue={defaultValue}
        style={style}
        placeholder={placeholder}
        allowClear={allowClear}
        onChange={handleChange}
        loading={loading}
        status={status}
        disabled={disabled}
        options={options}
        size={"large"}
        showSearch={showSearch}
        onSelect={onSelect}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
    </Form.Item>
  );
};
export default SelectComponent;
