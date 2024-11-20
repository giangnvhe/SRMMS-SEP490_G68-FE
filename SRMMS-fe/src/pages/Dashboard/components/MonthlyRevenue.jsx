import PropTypes from "prop-types";
import { DollarOutlined } from "@ant-design/icons";
import CardWithIcon from "./CardWithIcon";

const MonthlyRevenue = ({ value }) => {
  return (
    <CardWithIcon
      to="/orders"
      icon={DollarOutlined}
      title="Monthly Revenue"
      subtitle={value}
    />
  );
};

MonthlyRevenue.propTypes = {
  value: PropTypes.string,
};

export default MonthlyRevenue;
