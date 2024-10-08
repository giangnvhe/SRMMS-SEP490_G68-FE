import { CheckboxOptionType, Form, Radio, RadioChangeEvent, Space } from "antd";
import { FormInstance, Rule } from "antd/es/form";
import classNames from "classnames";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  options: Array<CheckboxOptionType>;
  optionType?: "button";
  direction?: "vertical" | "horizontal";
  buttonStyle?: "solid";
  defaultValue?: number | string | boolean;
  value?: number | string | boolean;
  className?: string;
  disabled?: boolean;
  name: string;
  size?: "large" | "middle" | "small";
  label?: string;
  rules?: Rule[];
  form?: FormInstance;
  onChange?: (e: RadioChangeEvent) => void;
}
const RadioComponent = ({
  label,
  defaultValue,
  buttonStyle,
  direction,
  disabled,
  name,
  optionType,
  rules,
  size,
  className = "",
  options,
  form,
  onChange,
}: IProps) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      preserve={false}
      className={cx("radio-component", { [className]: !!className })}
    >
      <Radio.Group
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        size={size}
        optionType={optionType}
        options={optionType ? options : []}
        buttonStyle={buttonStyle}
        value={form?.getFieldValue(name)}
      >
        <Space direction={direction}>
          {options?.map((option) => (
            <Radio
              key={option?.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Form.Item>
  );
};

export default RadioComponent;
