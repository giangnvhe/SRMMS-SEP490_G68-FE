import { ShoppingCartOutlined } from "@ant-design/icons";
import { faBowlFood, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { getCountOrder } from "~/services/order";
import { getCountProduct } from "~/services/product";
import Header from "./components/Header";
import CardWithIcon from "./components/Header/CardWithIcon";
import { getComboProduct } from "~/services/combos";
import RevenueChart from "./components/RevenueChart";

const Dashboard = () => {
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [comboCount, setComboCount] = useState<number | null>(null);
  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const data = await getCountOrder();
        setOrderCount(data.totalOrders);
      } catch (error) {
        console.error("Failed to fetch order count", error);
      }
    };

    fetchOrderCount();
  }, []);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const data = await getCountProduct();
        setProductCount(data.totalCount);
      } catch (error) {
        console.error("Failed to fetch order count", error);
      }
    };

    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchComboCount = async () => {
      try {
        const data = await getComboProduct();
        setComboCount(data.totalCount);
      } catch (error) {
        console.error("Failed to fetch order count", error);
      }
    };

    fetchComboCount();
  }, []);

  return (
    <div className=" bg-white p-5">
      <Row justify="space-between" align="middle">
        <Col>
          <Header
            title="DASHBOARD"
            subtitle="Chào mừng bạn đến với bảng điều khiển của bạn."
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <CardWithIcon
            icon={
              <ShoppingCartOutlined
                style={{ fontSize: "24px", color: "#1890ff" }}
              />
            }
            to="/admin/order-list"
            title="Đơn Hàng Đã Nhận"
            subtitle={
              orderCount !== null ? orderCount.toString() : "Loading..."
            }
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <CardWithIcon
            icon={
              <FontAwesomeIcon
                icon={faBowlFood}
                style={{ fontSize: "24px", color: "#1890ff" }}
              />
            }
            to="/admin/product"
            title="Món Ăn"
            subtitle={
              productCount !== null ? productCount.toString() : "Loading..."
            }
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <CardWithIcon
            icon={
              <FontAwesomeIcon
                icon={faUtensils}
                style={{ fontSize: "24px", color: "#1890ff" }}
              />
            }
            to="/admin/combos-list"
            title="Combo"
            subtitle={
              comboCount !== null ? comboCount.toString() : "Loading..."
            }
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <CardWithIcon
            icon={
              <FontAwesomeIcon
                icon={faUtensils}
                style={{ fontSize: "24px", color: "#1890ff" }}
              />
            }
            to="/admin/product"
            title="Số lượng nhân viên"
            subtitle={
              comboCount !== null ? comboCount.toString() : "Loading..."
            }
          />
        </Col>
        <Col span={24}>
          <RevenueChart />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
