import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface CustomTabsProps extends Omit<TabsProps, "items"> {
  items: {
    key: string;
    label: React.ReactNode;
    onClick?: () => void; // Optional onClick for each tab
  }[];
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
  const tabItems = items.map((item) => ({
    key: item.key,
    label: (
      <div onClick={item.onClick} className="tab-label">
        {item.label}
      </div>
    ),
  }));

  return (
    <Tabs
      defaultActiveKey="1"
      items={tabItems}
      onChange={onChange}
      className={`component-tabs ${className}`}
      centered={centered}
      size={size}
      {...restProps}
    />
  );
};

export default TabComponent;
