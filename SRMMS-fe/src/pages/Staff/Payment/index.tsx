import { TableOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  message,
  QRCode,
  Row,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { formatVND } from "~/common/utils/formatPrice";
import { getOrderTable, TableOrderData } from "~/services/orderTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PaymentOrder, RequestPaymentOrder } from "~/services/order";
import PaymentMethod from "./components/PaymentMethod";

const ORDER_HEIGHT_CONTAINER = "calc(100vh - 64px)";
const ORDER_TABLE_HEIGHT = "calc(100vh - 64px - 64px - 64px - 150px)";

interface DataType {
  key: React.Key;
  productName: string;
  comboName: string;
  quantity: number;
  price: number;
  subTotal: number;
}
const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(
    ["orderData", id],
    () => getOrderTable(Number(id)),
    {
      enabled: !!id,
      retry: 3,
    }
  );

  const paymentMutation = useMutation(
    (paymentData: { id: number; data: RequestPaymentOrder }) =>
      PaymentOrder(paymentData.id, paymentData.data),
    {
      onSuccess: (response) => {
        message.success("Thanh toán thành công!");
      },
      onError: (error) => {
        message.error("Thanh toán thất bại. Vui lòng thử lại.");
        console.error("Payment error:", error);
      },
    }
  );
  const CONSTANT = {
    order: "Thanh Toán",
    table: "Bàn",
    payableAmount: "Số tiền phải trả",
    paymentMethod: "Phương Thức Thanh Toán",
    cancelOrder: "Hủy order",
    payNow: "Thanh toán ngay",
    cash: "Tiền Mặt",
    card: "Chuyển Khoản",
    other: "Khác",
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Món",
      dataIndex: "productName",
      render: (text: string) => (
        <Typography.Text ellipsis style={{ maxWidth: 200 }}>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Combo",
      dataIndex: "comboName",
      render: (text: string) => (
        <Typography.Text ellipsis style={{ maxWidth: 200 }}>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      align: "right",
      render: (price: number) => (
        <Typography.Text>{formatVND(price)}</Typography.Text>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      align: "right",
      render: (quantity: number) => (
        <Typography.Text>{quantity}</Typography.Text>
      ),
    },
    {
      title: "Tổng Cộng",
      dataIndex: "subTotal",
      align: "right",
      render: (subTotal: number) => (
        <Typography.Text strong>{formatVND(subTotal)}</Typography.Text>
      ),
    },
  ];
  const tableData: DataType[] =
    data?.data?.flatMap((order: TableOrderData) => {
      const products = order.products.map((product) => ({
        productName: product.proName,
        comboName: "",
        quantity: product.quantity,
        price: product.price,
        subTotal: product.price * product.quantity,
      }));

      const combos = order.combos?.map((combo) => ({
        productName: "",
        comboName: combo.comboName,
        quantity: combo.quantity,
        price: combo.price,
        subTotal: combo.price * combo.quantity,
      }));

      return [...products, ...combos];
    }) || [];

  const totalBill = useMemo(() => {
    return (
      data?.data?.reduce(
        (acc: any, order: any) => acc + parseFloat(order.totalMoney),
        0
      ) || 0
    );
  }, [data]);

  const handlePayNow = (discountId?: number, accId?: number) => {
    if (!data?.data?.length) {
      message.error("Không có order để thanh toán.");
      return;
    }
    if (data.data.length === 1) {
      const order = data.data[0];
      paymentMutation.mutate({
        id: order.orderId,
        data: {
          discountId: discountId || null,
          accId: accId || null,
          totalMoney: discountId
            ? totalBill - (order.discountValue || 0) // Apply discount
            : parseFloat(order.totalMoney.toString()),
        },
      });
    } else {
      // Multiple orders
      data.data.forEach((order: any) => {
        paymentMutation.mutate({
          id: order.orderId,
          data: {
            discountId: discountId || null,
            accId: order.accId || null,
            totalMoney: discountId
              ? totalBill - (order.discountValue || 0) // Apply discount
              : parseFloat(order.totalMoney.toString()),
          },
        });
      });
    }
  };

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
                <div className="flex">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate("/order-table")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      size="1x"
                      className="mr-4"
                    />
                  </div>
                  {CONSTANT.order.toUpperCase()}
                </div>
              </Typography.Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <TableOutlined style={{ marginRight: "8px" }} />
                  <Typography.Text style={{ marginRight: "16px" }}>
                    {`Bàn: ${id}`}
                  </Typography.Text>
                </div>
              </div>
            </div>
            <Divider />

            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              sticky
              style={{ height: ORDER_TABLE_HEIGHT, overflowY: "auto" }}
            />

            <Divider />

            <div style={{ marginTop: "24px" }}>
              <Typography.Text
                strong
                style={{
                  fontSize: "18px",
                  display: "block",
                  marginBottom: "8px",
                  textAlign: "center",
                  color: "#1890ff",
                }}
              >
                Tổng Bill:
              </Typography.Text>
              <div
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "12px",
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                {formatVND(
                  data?.data?.reduce(
                    (acc, order) => acc + parseFloat(order.totalMoney),
                    0
                  )
                )}
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card bordered={false}>
            <PaymentMethod
              totalAmount={totalBill}
              onPayNow={handlePayNow}
              isPaying={paymentMutation.isLoading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
