import React, { ReactNode } from "react";
import { Card, Typography, Divider } from "antd";
import { Link } from "react-router-dom";

interface IProps {
  to: string;
  icon: ReactNode; // Expect a ReactNode (a valid React element)
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}

const { Title, Text } = Typography;

const CardWithIcon = ({ to, icon, title, subtitle, children }: IProps) => (
  <Card
    style={{
      minHeight: 52,
      display: "flex",
      flexDirection: "column",
      flex: 1,
    }}
    bodyStyle={{
      padding: 0,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Link
      to={to}
      style={{ textDecoration: "none", color: "inherit" }}
      aria-label="Card Link"
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: "3em", color: "#1890ff" }}>
          {/* Render the icon directly */}
          {icon}
        </div>
        <div style={{ textAlign: "right" }}>
          <Text type="secondary" style={{ fontSize: "16px" }}>
            {title}
          </Text>
          <Title level={3} style={{ margin: 0 }}>
            {subtitle || " "}
          </Title>
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "200%",
            height: "200%",
            borderRadius: "50%",
            backgroundColor: "#1890ff",
            opacity: 0.15,
            transform: "translate(-30%, -60%)",
          }}
        />
      </div>
    </Link>
    {children && <Divider />}
    {children}
  </Card>
);

export default CardWithIcon;
