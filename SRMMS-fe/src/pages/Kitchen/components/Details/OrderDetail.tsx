import {
  CalendarOutlined,
  DollarOutlined,
  GiftOutlined,
  PercentageOutlined,
  TrophyOutlined,
  UserOutlined
} from "@ant-design/icons";
import { faBowlFood, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Descriptions,
  Result,
  Space,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById, OrderData } from "~/services/order";

const { Title } = Typography;

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderById(Number(id));
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!orderData) {
    return (
      <Result
        status="warning" // Use 'warning' or any other suitable status
        title="Chưa Thanh Toán"
        subTitle="Khách hàng chưa thanh toán, nên chưa thể xem đơn hàng."
        extra={<Button type="primary">Quay lại danh sách đơn hàng</Button>}
      />
    );
  }

  const productColumns = [
    {
      title: "Tên món ăn",
      dataIndex: "proName",
      key: "proName",
      render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "right" as const,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "right" as const,
      render: (price: number) => formatCurrency(price),
    },
    {
      title: "Tổng tiền",
      align: "right" as const,
      render: (_: any, record: any) =>
        formatCurrency(record.quantity * record.price),
      key: "total",
    },
  ];

  const comboColumns = [
    {
      title: "Têm Combo",
      dataIndex: "comboName",
      key: "comboName",
      render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "right" as const,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "right" as const,
      render: (price: number) => formatCurrency(price),
    },
    {
      title: "Tổng tiền",
      align: "right" as const,
      render: (_: any, record: any) =>
        formatCurrency(record.quantity * record.price),
      key: "total",
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header Section */}
      <Card
        style={{ marginBottom: 24 }}
        title={
          <Space size="middle">
            <Title level={3} style={{ margin: 0 }}>
              Order #{orderData.orderId}
            </Title>
          </Space>
        }
        extra={
          <Tag
            color={
              orderData.status === 1
                ? "warning" // Chờ xác nhận
                : orderData.status === 2
                ? "processing" // Đang chuẩn bị
                : orderData.status === 3
                ? "success" // Đã hoàn thành
                : orderData.status === 4
                ? "purple" // Đã thanh toán
                : "default"
            }
            style={{ padding: "4px 12px", fontSize: "14px" }}
          >
            {orderData.status === 1
              ? "Chờ xác nhận"
              : orderData.status === 2
              ? "Đang chuẩn bị"
              : orderData.status === 3
              ? "Đã hoàn thành"
              : orderData.status === 4
              ? "Đã thanh toán"
              : "Không xác định"}
          </Tag>
        }
      >
        <Descriptions column={{ xs: 1, sm: 2, md: 2 }} bordered>
          <Descriptions.Item
            label={
              <Space>
                <CalendarOutlined /> Ngày gọi món
              </Space>
            }
          >
            {moment(orderData.orderDate).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Space>
                <FontAwesomeIcon icon={faTable} /> Bàn
              </Space>
            }
          >
            {orderData.tableName}
          </Descriptions.Item>
          {orderData?.customers && orderData.customers.length > 0 && (
            <Descriptions.Item
              label={
                <Space>
                  <UserOutlined /> Khách hàng
                </Space>
              }
              span={2}
            >
              {orderData.customers[0].customerName}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      {/* Products Section */}
      {orderData.products && orderData.products.length > 0 && (
        <Card
          style={{ marginBottom: 24 }}
          title={
            <Space>
              <FontAwesomeIcon icon={faBowlFood} />
              <span>Món ăn</span>
            </Space>
          }
        >
          <Table
            dataSource={orderData.products}
            columns={productColumns}
            pagination={false}
            bordered
          />
        </Card>
      )}

      {/* Combos Section */}
      {orderData.combos && orderData.combos.length > 0 && (
        <Card
          style={{ marginBottom: 24 }}
          title={
            <Space>
              <GiftOutlined />
              <span>Combos</span>
            </Space>
          }
        >
          <Table
            dataSource={orderData.combos}
            columns={comboColumns}
            pagination={false}
            bordered
          />
        </Card>
      )}

      {/* Additional Information */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        {/* Discount Section */}
        {orderData.discountValue > 0 && (
          <Card
            title={
              <Space>
                <PercentageOutlined />
                <span>Discount</span>
              </Space>
            }
          >
            <Statistic
              value={orderData.discountValue}
              suffix="%"
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        )}

        {/* Points Section */}
        {orderData.pointIds && orderData.pointIds.length > 0 && (
          <Card
            title={
              <Space>
                <TrophyOutlined />
                <span>Points Earned</span>
              </Space>
            }
          >
            {orderData.pointIds.map((point) => (
              <Statistic
                key={point.pointId}
                title={point.pointName}
                value={point.pointValue}
                suffix="points"
                style={{ marginBottom: 8 }}
              />
            ))}
          </Card>
        )}
      </div>

      {/* Total Section */}
      <Card
        style={{ backgroundColor: "#fafafa" }}
        title={
          <Space>
            <DollarOutlined />
            <span>Tổng hóa đơn</span>
          </Space>
        }
      >
        <Statistic
          value={orderData.totalMoney}
          suffix=" VNĐ"
          groupSeparator="."
          valueStyle={{ color: "#1890ff", fontSize: 24 }}
        />
      </Card>
    </div>
  );
};

export default OrderDetails;
