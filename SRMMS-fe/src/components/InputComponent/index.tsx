import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input } from "antd";
import { FormInstance, Rule } from "antd/es/form";
import classNames from "classnames";
import { ChangeEventHandler, FocusEventHandler, ReactNode } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  placeholder?: string;
  style?: React.CSSProperties;
  defaultValue?: string;
  className?: string;
  maxLength?: number;
  disabled?: boolean;
  name: string;
  label?: string;
  rules?: Rule[];
  type?: "password" | "search" | "file";
  allowClear?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onSearch?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    info?: {
      source?: "clear" | "input";
    }
  ) => void;
  form?: FormInstance;
  prefix?: ReactNode;
}

const InputComponent = ({
  placeholder,
  style,
  defaultValue,
  className = "",
  maxLength,
  disabled,
  name,
  label,
  rules,
  type,
  allowClear = true,
  onChange,
  onFocus,
  onBlur,
  onSearch,
  form,
  prefix,
}: IProps) => {
  const value = form?.getFieldValue(name);

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      preserve={false}
      className={cx("input-component", { [className]: !!className })}
    >
      {type === "password" ? (
        <Input.Password
          placeholder={placeholder}
          style={style}
          defaultValue={defaultValue}
          maxLength={maxLength}
          disabled={disabled}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          autoComplete="password"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          size={"large"}
          name={name}
        />
      ) : type === "search" ? (
        <Input.Search
          placeholder={placeholder}
          style={style}
          defaultValue={defaultValue}
          maxLength={maxLength}
          disabled={disabled}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          allowClear={allowClear}
          value={value}
          size={"large"}
          onSearch={onSearch}
          name={name}
        />
      ) : (
        <Input
          placeholder={placeholder}
          style={style}
          defaultValue={defaultValue}
          maxLength={maxLength}
          disabled={disabled}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          prefix={prefix}
          size={"large"}
          name={name}
        />
      )}
    </Form.Item>
  );
};

export default InputComponent;
