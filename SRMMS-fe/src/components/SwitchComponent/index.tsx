import { Switch, Form } from "antd";
import { FormInstance, Rule } from "antd/es/form";
import classNames from "classnames";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  name: string;
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
  rules?: Rule[];
  checkedChildren?: string;
  unCheckedChildren?: string;
  form: FormInstance;
  onChange?: (checked: boolean) => void;
}

const SwitchComponent = ({
  name,
  label,
  defaultChecked = false,
  disabled = false,
  className = "",
  rules,
  form,
  checkedChildren = "On",
  unCheckedChildren = "Off",
  onChange,
}: IProps) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      className={cx("switch-component", { [className]: !!className })}
      valuePropName="checked"
    >
      <Switch
        defaultChecked={defaultChecked}
        disabled={disabled}
        className={cx("custom-switch")}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default SwitchComponent;
