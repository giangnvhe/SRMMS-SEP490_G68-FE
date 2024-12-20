import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import classNames from "classnames/bind";

import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface IProps {
  fontSize?: number;
  children?: JSX.Element;
  isLoading?: boolean;
}

const Spinner = ({ fontSize = 24, children, isLoading = true }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [styleComponent, setStyleComponent] = useState({});

  useEffect(() => {
    const parent = ref.current?.parentNode as HTMLDivElement;

    if (parent) {
      const parentWidth = parent.offsetWidth;
      const parentHeight = parent.offsetHeight;
      setStyleComponent({
        width: parentWidth,
        height: parentHeight,
      });
    }
  }, [ref]);

  return (
    <div className={cx("spiner")} ref={ref} style={styleComponent}>
      <Spin spinning={isLoading} indicator={<LoadingOutlined style={{ fontSize: fontSize }} spin />}>
        {children}
      </Spin>
    </div>
  );
};

export default Spinner;
