import { Form, DatePicker } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { RangePickerProps } from "antd/es/date-picker";
import { FormInstance, Rule } from "antd/es/form";
import dayjs, { Dayjs } from "dayjs";
import type { PickerMode } from "rc-picker/lib/interface";
import { IProps } from "../ButtonComponent";
import { useEffect } from "react";

interface Props {
  className?: string;
  name: string;
  label?: string;
  rules?: Rule[];
  defaultValue?: [
    start: Dayjs | null | undefined | string | number | Date,
    end: Dayjs | null | undefined | string | number | Date
  ];
  getDisabledDate?: (date: Dayjs) => boolean;
  onChange?: RangePickerProps["onChange"];
  format?: string;
  showTime?: boolean;
  placeholder?: RangePickerProps["placeholder"];
  picker?: PickerMode;
  minDate?: string | number | Date | Dayjs | undefined;
  maxDate?: string | number | Date | Dayjs | undefined;
  listDisabledHoursStart?: number[];
  listDisabledMinutesStart?: number[];
  listDisabledSecondsStart?: number[];
  listDisabledHoursEnd?: number[];
  listDisabledMinutesEnd?: number[];
  listDisabledSecondsEnd?: number[];
  showNow?: boolean;
  onOk?: RangePickerProps["onOk"];
  form?: FormInstance;
  allowEmpty?: RangePickerProps["allowEmpty"];
  onBlur?: RangePickerProps["onBlur"];
  onCalendarChange?: RangePickerProps["onCalendarChange"];
  size?: SizeType;
}

const { RangePicker } = DatePicker;

export default function DatePickerRangeComponent({
  className = "",
  name,
  label,
  rules,
  defaultValue,
  onChange,
  format,
  showTime,
  placeholder,
  picker = "date",
  getDisabledDate,
  listDisabledHoursStart = [],
  listDisabledMinutesStart = [],
  listDisabledSecondsStart = [],
  listDisabledHoursEnd = [],
  listDisabledMinutesEnd = [],
  listDisabledSecondsEnd = [],
  minDate,
  maxDate,
  showNow = false,
  form,
  onOk,
  allowEmpty = [true, true],
  onBlur,
  onCalendarChange,
  size = "large",
}: Props) {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (getDisabledDate && typeof getDisabledDate === "function") {
      return getDisabledDate(current);
    }
    return false;
  };

  const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
    if (type === "start") {
      return {
        disabledHours: () => listDisabledHoursStart,
        disabledMinutes: () => listDisabledMinutesStart,
        disabledSeconds: () => listDisabledSecondsStart,
      };
    }
    return {
      disabledHours: () => listDisabledHoursEnd,
      disabledMinutes: () => listDisabledMinutesEnd,
      disabledSeconds: () => listDisabledSecondsEnd,
    };
  };

  const handleChange: RangePickerProps["onChange"] = (values, strValues) => {
    if (onChange && typeof onChange === "function") {
      onChange(values, strValues);
    }
  };

  const handleOk: RangePickerProps["onOk"] = (values) => {
    if (onOk && typeof onOk === "function") {
      onOk(values);
    }
  };

  const handleBlur: RangePickerProps["onBlur"] = (values, strValues) => {
    if (onBlur && typeof onBlur === "function") onBlur(values, strValues);
  };

  const handleCalendarChange: RangePickerProps["onCalendarChange"] = (
    values,
    strValues,
    info
  ) => {
    if (onCalendarChange && typeof onCalendarChange === "function")
      onCalendarChange(values, strValues, info);
  };

  useEffect(() => {
    if (defaultValue && defaultValue.length === 2) {
      form?.setFieldValue(
        name,
        defaultValue.map((date) =>
          date && dayjs(date).isValid() ? dayjs(date) : null
        )
      );
    }
  }, []);

  <Form.Item label={label} name={name} rules={rules} preserve={false}>
    <RangePicker
      format={format}
      allowEmpty={allowEmpty}
      onChange={handleChange}
      showTime={showTime}
      placeholder={placeholder}
      picker={picker}
      disabledDate={disabledDate}
      disabledTime={disabledRangeTime}
      minDate={minDate && dayjs(minDate).isValid() ? dayjs(minDate) : undefined}
      maxDate={maxDate && dayjs(maxDate).isValid() ? dayjs(maxDate) : undefined}
      showNow={showNow}
      onBlur={handleBlur}
      onCalendarChange={handleCalendarChange}
      onOk={handleOk}
      size={size}
    />
  </Form.Item>;
}
