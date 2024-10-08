import { Form, InputNumber } from "antd";
import { FormInstance, Rule } from "antd/es/form";
import { valueType } from "antd/es/statistic/utils";
import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);
interface IProps {
  name: string;
  label?: string;
  rules?: Rule[];
  min?: number;
  max?: number;
  placeholder?: string;
  style?: React.CSSProperties;
  status?: "error" | "warning";
  size?: "large" | "middle" | "small";
  step?: number;
  disabled?: boolean;
  variant?: "outlined" | "borderless" | "filled";
  className?: string;
  prefix?: ReactNode;
  defaultValue?: number;
  decimalSeparator?: string;
  readOnly?: boolean;
  form?: FormInstance;
  parser?: ((displayString: string | undefined) => number) | undefined;
  formatter?: ((value: number | undefined, info: { userTyping: boolean; input: string }) => string) | undefined;
  onChange?: (value: number | null) => void;
  onStep?: (value: number, info: { offset: valueType; type: "up" | "down" }) => void;
}
const InputNumberComponent = ({ name, rules, className = "", label, size = "large", form, ...props }: IProps) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      preserve={false}
      className={cx("input-number-component", { [className]: !!className })}
    >
      <InputNumber value={form?.getFieldValue(name)} stringMode={true} size={size} {...props}></InputNumber>
    </Form.Item>
  );
};

export default InputNumberComponent;
