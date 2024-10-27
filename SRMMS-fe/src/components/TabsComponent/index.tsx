import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface CustomTabsProps extends TabsProps {
  className?: string; // Allow custom class
  centered?: boolean; // Optionally center tabs
  size?: "small" | "middle" | "large"; // Control size
}

const TabComponent: React.FC<CustomTabsProps> = ({
  items,
  onChange,
  className = "",
  centered = false,
  size = "middle",
  ...restProps
}) => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
      className={`component-tabs ${className}`}
      centered={centered}
      size={size}
      {...restProps}
    />
  );
};

export default TabComponent;
