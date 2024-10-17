import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import classNames from "classnames/bind";
import { FC, ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export interface IProps {
  children?: string | JSX.Element;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void | FC;
  btnType?:
    | "danger"
    | "info"
    | "success"
    | "warn"
    | "dark"
    | "save-draft"
    | "create"
    | "back"
    | "cancel"
    | "primary"
    | "default"
    | "go-back";
  icon?: ReactNode;
  style?: React.CSSProperties;
  size?: SizeType;
  htmlType?: "button" | "submit" | "reset" | undefined;
}

const ButtonComponent = ({
  children = "",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  btnType,
  icon,
  style = {},
  size = "large",
  htmlType,
}: IProps) => {
  const label = useMemo(() => {
    if (children) return children;

    switch (btnType) {
      case "create":
        return "create";
      case "cancel":
        return "cancel";
      case "save-draft":
        return "save-draft";
      case "back":
        return "back";
      case "go-back":
        return (
          <>
            <LeftOutlined />
            <span>Back</span>
          </>
        );
      default:
        return "";
    }
  }, [btnType, children]);

  const classColor = useMemo(() => {
    switch (btnType) {
      case "dark":
      case "back":
      case "cancel":
      case "go-back":
        return `btn-dark`;
      case "save-draft":
      case "info":
        return "btn-info";
      case "create":
      case "success":
        return "btn-success";
      case "danger":
        return "btn-danger";
      case "warn":
        return "btn-warn";
      default:
        return "";
    }
  }, [btnType]);

  const type = useMemo(() => {
    switch (btnType) {
      case "default":
        return "default";
      default:
        return "primary";
    }
  }, [btnType]);

  return (
    <Button
      type={type}
      loading={loading}
      disabled={disabled}
      className={cx(styles["button-component"], {
        [className]: !!className,
        [classColor]: !!classColor,
      })}
      onClick={onClick}
      icon={icon}
      size={size}
      style={style}
      htmlType={htmlType}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
