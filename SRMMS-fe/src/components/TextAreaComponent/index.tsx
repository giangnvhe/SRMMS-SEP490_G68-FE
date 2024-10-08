import { Form } from "antd";
import { FormInstance, Rule } from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames";
import { ChangeEventHandler } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  placeholder?: string;
  style?: React.CSSProperties;
  defaultValue?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  maxLength?: number;
  disabled?: boolean;
  name: string;
  label?: string;
  rules?: Rule[];
  showCount?: boolean;
  form: FormInstance;
}

const TextAreaComponent = ({
  placeholder,
  style,
  defaultValue,
  className = "",
  maxLength = 2000,
  disabled,
  name,
  label,
  rules,
  showCount = true,
  form,
  onChange,
}: IProps) => {
  const value = form.getFieldValue(name);

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      preserve={false}
      className={cx("textarea-component", { [className]: !!className })}
    >
      <TextArea
        placeholder={placeholder}
        style={style}
        defaultValue={defaultValue}
        maxLength={maxLength}
        disabled={disabled}
        showCount={showCount}
        onChange={onChange}
        value={value}
        size={"large"}
      />
    </Form.Item>
  );
};

export default TextAreaComponent;
