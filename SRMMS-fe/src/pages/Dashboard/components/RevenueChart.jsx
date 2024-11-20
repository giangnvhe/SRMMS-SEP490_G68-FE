import { Card, Typography, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import LineChart from "./LineChart";
// import { formattedAmount } from "../../../utils/formattedAmount";

const { Title, Text } = Typography;

const RevenueChart = () => {
  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Title level={5} style={{ marginBottom: "0" }}>
              Revenue Generated
            </Title>
            <Text strong style={{ fontSize: "24px", color: "#52c41a" }}>
              {/* {formattedAmount(revenue)} */}
              $1,000
            </Text>
          </div>
          <Button
            type="primary"
            shape="circle"
            icon={<DownloadOutlined />}
            style={{
              backgroundColor: "#52c41a",
              borderColor: "#52c41a",
            }}
          />
        </div>
      }
      bordered
      style={{ margin: "16px 0" }}
    >
      {/* LineChart Component */}
      <div style={{ height: "300px", marginTop: "16px" }}>
        <LineChart />
      </div>
    </Card>
  );
};

export default RevenueChart;
