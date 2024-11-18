import { Row, Col, Typography, Card, Table, Button, Divider } from "antd";
import { TableOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const ORDER_HEIGHT_CONTAINER = "calc(100vh - 64px)";
const ORDER_TABLE_HEIGHT = "calc(100vh - 64px - 64px - 64px - 150px)";

const getTableName = (tableId: number): string => {
  return `Table ${tableId}`;
};

const Payment = () => {
  const { tableId } = useParams<{ tableId: string }>();

  const data = [
    {
      key: "1",
      name: "Noodle Soup",
      price: "50,000",
      quantity: 2,
      subtotal: "100,000",
    },
    {
      key: "2",
      name: "Fried Rice",
      price: "40,000",
      quantity: 1,
      subtotal: "40,000",
    },
    {
      key: "3",
      name: "Spring Rolls",
      price: "30,000",
      quantity: 3,
      subtotal: "90,000",
    },
    {
      key: "4",
      name: "Chicken Wings",
      price: "45,000",
      quantity: 2,
      subtotal: "90,000",
    },
    {
      key: "5",
      name: "Beef Pho",
      price: "60,000",
      quantity: 1,
      subtotal: "60,000",
    },
    {
      key: "6",
      name: "Pork Banh Mi",
      price: "35,000",
      quantity: 2,
      subtotal: "70,000",
    },
    {
      key: "7",
      name: "Salad Bowl",
      price: "25,000",
      quantity: 1,
      subtotal: "25,000",
    },
    {
      key: "8",
      name: "Grilled Pork",
      price: "55,000",
      quantity: 2,
      subtotal: "110,000",
    },
    {
      key: "9",
      name: "Shrimp Tempura",
      price: "50,000",
      quantity: 3,
      subtotal: "150,000",
    },
    {
      key: "10",
      name: "Vegetable Stir-fry",
      price: "40,000",
      quantity: 1,
      subtotal: "40,000",
    },
    {
      key: "11",
      name: "Fried Noodles",
      price: "45,000",
      quantity: 1,
      subtotal: "45,000",
    },
    {
      key: "12",
      name: "Tofu Soup",
      price: "30,000",
      quantity: 2,
      subtotal: "60,000",
    },
    {
      key: "13",
      name: "Grilled Fish",
      price: "70,000",
      quantity: 1,
      subtotal: "70,000",
    },
    {
      key: "14",
      name: "Sushi Roll",
      price: "60,000",
      quantity: 2,
      subtotal: "120,000",
    },
    {
      key: "15",
      name: "Egg Rolls",
      price: "20,000",
      quantity: 5,
      subtotal: "100,000",
    },
    {
      key: "16",
      name: "Pork Chops",
      price: "80,000",
      quantity: 1,
      subtotal: "80,000",
    },
    {
      key: "17",
      name: "Seafood Paella",
      price: "95,000",
      quantity: 1,
      subtotal: "95,000",
    },
    {
      key: "18",
      name: "Lemonade",
      price: "15,000",
      quantity: 2,
      subtotal: "30,000",
    },
    {
      key: "19",
      name: "Fruit Salad",
      price: "25,00 0",
      quantity: 1,
      subtotal: "25,000",
    },
    {
      key: "20",
      name: "Iced Coffee",
      price: "20,000",
      quantity: 3,
      subtotal: "60,000",
    },
  ];

  const TITLE = {
    item: "item",
    price: "price",
    quantity: "quantity",
    subtotal: "subtotal",
  };

  const CONSTANT = {
    order: "order",
    table: "Bàn",
    time: "time",
    payableAmount: "payable amount",
    paymentMethod: "payment method",
    serviceCharge: "service charge",
    total: "total",
    cancelOrder: "Hủy order",
    payNow: "Thanh toán ngay",
    cash: "cash",
    card: "card",
    voucher: "voucher",
  };

  const columns = [
    {
      title: TITLE.item.toUpperCase(),
      dataIndex: "name",
      key: "name",
    },
    {
      title: TITLE.price.toUpperCase(),
      dataIndex: "price",
      key: "price",
      align: "right",
    },
    {
      title: TITLE.quantity.toUpperCase(),
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
    },
    {
      title: TITLE.subtotal.toUpperCase(),
      dataIndex: "subtotal",
      key: "subtotal",
      align: "right",
    },
  ];

  return (
    <div style={{ padding: "24px", height: "100%" }}>
      <Row gutter={24}>
        <Col xs={24} md={16}>
          <Card bordered={false} style={{ height: ORDER_HEIGHT_CONTAINER }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Title style={{ margin: 0 }} level={4}>
                {CONSTANT.order.toUpperCase()}
              </Typography.Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <TableOutlined style={{ marginRight: "8px" }} />
                  <Typography.Text style={{ marginRight: "16px" }}>
                    {`TABLE: ${tableId}`}
                  </Typography.Text>
                </div>
                <div>
                  <ClockCircleOutlined style={{ marginRight: "8px" }} />
                  <Typography.Text>
                    {CONSTANT.time.toUpperCase()}
                  </Typography.Text>
                </div>
              </div>
            </div>
            <Divider />

            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              sticky
              style={{ height: ORDER_TABLE_HEIGHT, overflowY: "auto" }}
            />

            <Divider />

            <Button
              type="primary"
              danger
              block
              style={{ marginTop: "24px", height: 50 }}
            >
              {CONSTANT.cancelOrder.toUpperCase()}
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card bordered={false}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Title style={{ margin: 0 }} level={4}>
                {CONSTANT.payableAmount.toUpperCase()}
              </Typography.Title>
              <Typography.Title
                style={{ margin: 0 }}
                level={4}
              ></Typography.Title>
            </div>
            <Divider />
            <Typography.Text style={{ display: "block" }}>
              {CONSTANT.paymentMethod.toUpperCase()}
            </Typography.Text>
            <Row gutter={[16, 16]} style={{ margin: "20px 0 0 0" }}>
              <Col xs={24} sm={8} md={8} lg={8}>
                <Button type="default" style={{ height: 50, width: "100%" }}>
                  {CONSTANT.cash.toUpperCase()}
                </Button>
              </Col>
              <Col xs={24} sm={8} md={8} lg={8}>
                <Button type="default" style={{ height: 50, width: "100%" }}>
                  {CONSTANT.card.toUpperCase()}
                </Button>
              </Col>
              <Col xs={24} sm={8} md={12} lg={8}>
                <Button type="default" style={{ height: 50, width: "100%" }}>
                  {CONSTANT.voucher.toUpperCase()}
                </Button>
              </Col>
            </Row>
            <Divider />
            <Row
              justify="space-between"
              style={{ marginTop: "24px", marginBottom: "10px" }}
            >
              <Col>
                <Typography.Text>
                  {TITLE.subtotal.toUpperCase()}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text></Typography.Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Typography.Text>
                  {CONSTANT.serviceCharge.toUpperCase()}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text></Typography.Text>
              </Col>
            </Row>
            <Divider />
            <Row justify="space-between">
              <Col>
                <Typography.Title level={4}>
                  {CONSTANT.total.toUpperCase()}
                </Typography.Title>
              </Col>
              <Col>
                <Typography.Title level={4}></Typography.Title>
              </Col>
            </Row>
            <Button
              type="primary"
              block
              style={{ marginTop: "24px", height: 50 }}
            >
              {CONSTANT.payNow.toUpperCase()}
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
