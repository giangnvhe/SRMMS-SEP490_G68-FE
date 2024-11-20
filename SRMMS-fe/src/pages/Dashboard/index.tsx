import { useEffect, useState } from "react";
import { Row, Col, Button, Divider } from "antd";
import {
  DownloadOutlined,
  UserAddOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [menuItemsSold, setMenuItemsSold] = useState(523); // Mock data
  const [staffHired, setStaffHired] = useState(12); // Mock data
  const [dishesServed, setDishesServed] = useState(340); // Mock data
  const [revenueGenerated, setRevenueGenerated] = useState(0);

  useEffect(() => {
    // Mock data for orders
    const mockOrders = [
      { id: 1, totalPrice: 100 },
      { id: 2, totalPrice: 150 },
      { id: 3, totalPrice: 200 },
    ];
    setOrders(mockOrders);

    // Simulate fetching staff count and dishes served
    setStaffHired(12); // Example number for staff hired
    setDishesServed(340); // Example number for dishes served
  }, []);

  useEffect(() => {
    // Calculate total revenue based on mock orders
    const totalRevenue = orders.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );
    setRevenueGenerated(totalRevenue);
  }, [orders]);

  return (
    <div style={{ margin: "20px" }}>
      {/* HEADER */}
      <Row justify="space-between" align="middle">
        <Col>
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Col>
        <Col>
          <Button type="primary" icon={<DownloadOutlined />}>
            Download Reports
          </Button>
        </Col>
      </Row>

      <Divider />
      {/* GRID & CHARTS */}
      <Row gutter={[20, 20]}>
        {/* ROW 1 */}
        <Col span={6}>
          <CardWithIcon
            icon={ShoppingCartOutlined}
            to="/orders"
            title="Orders Received"
            subtitle={orders.length}
          />
        </Col>
        <Col span={6}>
          <CardWithIcon
            icon={DollarOutlined}
            to="/orders"
            title="Menu Items Sold"
            subtitle={menuItemsSold}
          />
        </Col>
        <Col span={6}>
          <CardWithIcon
            icon={UserAddOutlined}
            to="/users"
            title="Staff Hired"
            subtitle={staffHired}
          />
        </Col>
        <Col span={6}>
          <CardWithIcon
            icon={DatabaseOutlined}
            to="/menu"
            title="Dishes Served"
            subtitle={dishesServed}
          />
        </Col>

        {/* ROW 2 */}
        <Col span={24}>
          <RevenueChart />
        </Col>
        {/* Here you can add more components such as RevenueChart or RecentOrder if desired */}
        <Col span={24}>
          <div
            style={{
              padding: "20px",
              background: "#f0f2f5",
              borderRadius: "8px",
            }}
          >
            <h3>Total Revenue Generated: ${revenueGenerated}</h3>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
