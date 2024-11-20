import { Typography } from "antd";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

const Header = ({ title, subtitle }) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Title level={4} style={{ color: "#595959", fontWeight: "bold" }}>
        {title}
      </Title>
      <Text style={{ color: "#52c41a", fontSize: "16px" }}>{subtitle}</Text>
    </div>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Header;