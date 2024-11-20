import { useEffect, useState } from "react";
import { Card, Typography, List, Skeleton, Tag } from "antd";
import dayjs from "dayjs";
import { mockOrderService } from "../../../mocks/mockOrderService";
import { formattedAmount } from "../../../utils/formattedAmount";

const { Title, Text } = Typography;

const RecentOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recent orders using mock service
  const fetchRecentOrders = async () => {
    try {
      const result = await mockOrderService.getRecentOrders(); // Use mock service
      setOrders(result);
    } catch (err) {
      setError("Failed to fetch recent orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  if (loading) {
    return <Skeleton active />;
  }

  if (error) {
    return (
      <Card style={{ margin: "16px" }}>
        <Text type="danger">{error}</Text>
      </Card>
    );
  }

  return (
    <Card
      title={<Title level={5}>Recent Orders</Title>}
      style={{ margin: "16px" }}
      bordered
    >
      <List
        dataSource={orders}
        renderItem={(order) => (
          <List.Item
            key={order.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #f0f0f0",
              padding: "12px 0",
            }}
          >
            <div>
              <Text strong>{order.customerName || "Unknown Customer"}</Text>
              <br />
              <Text type="secondary">{order.customerPhone}</Text>
            </div>
            <div>
              <Text>{dayjs(order.createdAt).format("MMM DD, YYYY")}</Text>
            </div>
            <Tag color="green">{formattedAmount(order.totalPrice)}</Tag>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RecentOrder;
