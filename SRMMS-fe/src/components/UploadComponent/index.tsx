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

  const handleBeforeUpload = (file: RcFile) => {
    const isLessThan20MB = file.size / 1024 / 1024 < 10;
    if (!isLessThan20MB) {
      alert("File không được vượt quá 20MB!");
    }
    return isLessThan20MB; // Chỉ cho phép upload nếu file <= 20MB
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
        beforeUpload={handleBeforeUpload}
        listType="picture"
        onChange={handleChange}
        disabled={disabled}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Chọn File</Button>
      </Upload>
    </Form.Item>
  );
};

export default UploadComponent;
