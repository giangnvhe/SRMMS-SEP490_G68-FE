import { createElement } from "react";
import PropTypes from "prop-types";
import { Card, Typography, Divider } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const CardWithIcon = ({ to, icon, title, subtitle, children }) => (
  <Card
    style={{
      minHeight: 52,
      display: "flex",
      flexDirection: "column",
      flex: "1",
    }}
    bodyStyle={{
      padding: 0,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
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
          {createElement(icon, { style: { fontSize: "24px" } })}
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

CardWithIcon.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  children: PropTypes.node,
};

export default CardWithIcon;
