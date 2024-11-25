import { Button, Form, FormInstance, Upload } from "antd";
import { Rule } from "antd/es/form";
import classNames from "classnames";
import styles from "./index.module.scss";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";

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
  onChange?: (info: UploadChangeParam<UploadFile>) => void;
}

const UploadComponent = ({
  name,
  label,
  disabled = false,
  className = "",
  rules,
  form,
  onChange,
}: IProps) => {
  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (onChange) {
      onChange(info);
    }
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      valuePropName="fileList"
      getValueFromEvent={(e) => e && e.fileList}
      className={cx("textarea-component", { [className]: !!className })}
    >
      <Upload
        beforeUpload={() => false}
        listType="picture"
        onChange={handleChange}
        disabled={disabled}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
  );
};

export default UploadComponent;
