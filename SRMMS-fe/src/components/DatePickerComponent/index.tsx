import { DatePicker, DatePickerProps } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import Form, { FormInstance, Rule } from "antd/es/form";
import { Dayjs } from "dayjs";
import { CSSProperties } from "react";

interface IProps {
  className?: string;
  name: string;
  label?: string;
  rules?: Rule[];
  format?: string;
  defaultValue?: Dayjs; // Made optional
  onChange?: DatePickerProps["onChange"];
  placeholder?: string;
  getDisabledDate?: (date: Dayjs) => boolean;
  form: FormInstance;
  style?: CSSProperties;
  disabled?: boolean;
}

const DatePickerComponent = ({
  className = "",
  name,
  label,
  rules,
  defaultValue,
  onChange,
  format = "YYYY-MM-DD",
  placeholder,
  getDisabledDate,
  form,
  style,
  disabled = false,
}: IProps) => {
  const handleChange: DatePickerProps["onChange"] = (date, dateString) => {
    form.setFieldValue(name, date); // Update form state
    if (onChange) {
      onChange(date, dateString); // Trigger external onChange if provided
    }
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (getDisabledDate) {
      return getDisabledDate(current);
    }
    return false;
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      preserve={false}
      className={`input-component ${className}`} // Added className support
    >
      <DatePicker
        format={format}
        defaultValue={defaultValue} // Will be undefined if not provided
        onChange={handleChange}
        placeholder={placeholder}
        disabledDate={disabledDate}
        size="large"
        style={style}
        disabled={disabled} // Added disabled support
      />
    </Form.Item>
  );
};

export default DatePickerComponent;
