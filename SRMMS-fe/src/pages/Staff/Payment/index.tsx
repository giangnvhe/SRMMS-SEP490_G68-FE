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
  const [showQRCode, setShowQRCode] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(
    ["orderData", id],
    () => getOrderTable(Number(id)),
    {
      enabled: !!id,
      retry: 3,
    }
  );

  const paymentMutation = useMutation(PaymentOrder, {
    onSuccess: (response) => {
      message.success("Thanh toán thành công!");
      navigate("/order-table"); // Redirect to order table page after successful payment
    },
    onError: (error) => {
      message.error("Thanh toán thất bại. Vui lòng thử lại.");
      console.error("Payment error:", error);
    },
  });

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
      //setOrderPayment(order.orderId);

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

  const handleBankTransferClick = () => {
    setShowQRCode(true);
  };

  const cancel = () => {
    setShowQRCode(false);
  };

  const totalBill = useMemo(() => {
    return (
      data?.data?.reduce(
        (acc: any, order: any) => acc + parseFloat(order.totalMoney),
        0
      ) || 0
    );
  }, [data]);

  const handlePayNow = () => {
    const orderIds = data?.data?.map((order) => order.orderId) || [];

    // Nếu chỉ có một order
    if (orderIds.length === 1) {
      const paymentData: RequestPaymentOrder = {
        orderId: orderIds[0],
        discountId: data?.data?.[0]?.discountId || null,
        totalMoney: totalBill,
      };
      paymentMutation.mutate(paymentData);
    } else {
      // Nếu nhiều order, có thể gọi multiple mutations hoặc API riêng để xử lý
      orderIds.forEach((orderId) => {
        const orderToPayment = data?.data?.find(
          (order) => order.orderId === orderId
        );
        const paymentData: RequestPaymentOrder = {
          orderId: orderId,
          discountId: orderToPayment?.discountId || null,
          totalMoney: orderToPayment?.totalMoney || 0,
        };
        paymentMutation.mutate(paymentData);
      });
    }
  };

  // const handlePayNow = async () => {
  //   if (!data?.data?.length) {
  //     message.error("Không có order để thanh toán.");
  //     return;
  //   }

  //   const paymentRequests = data.data.map((order) => ({
  //     orderId: order.orderId,
  //     discountId: order.discountId || null,
  //     totalMoney: order.totalMoney,
  //   }));
  //   console.log("Payload:", paymentRequests);
  //   paymentRequests.forEach((paymentData) => {
  //     paymentMutation.mutate(paymentData);
  //   });
  //   // try {
  //   //   await Promise.all(
  //   //     paymentRequests.map(async (paymentData: any) => {
  //   //       await paymentMutation.mutateAsync(paymentData);
  //   //       message.success(
  //   //         `Thanh toán thành công cho order ID: ${paymentData.orderId}`
  //   //       );
  //   //     })
  //   //   );
  //   // } catch (error) {
  //   //   message.error("Thanh toán thất bại cho một hoặc nhiều đơn hàng.");
  //   //   console.error("Payment error:", error);
  //   // }
  // };

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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Title style={{ margin: 0 }} level={4}>
                {CONSTANT.paymentMethod.toUpperCase()}
              </Typography.Title>
            </div>
            <Divider />
            <Row gutter={[16, 16]} style={{ margin: "20px 0 0 0" }}>
              <Col xs={24} sm={8} md={8} lg={8}>
                <Button
                  type="default"
                  style={{ height: 50, width: "100%" }}
                  onClick={cancel}
                >
                  {CONSTANT.cash.toUpperCase()}
                </Button>
              </Col>
              <Col xs={24} sm={8} md={8} lg={8}>
                <Button
                  type="default"
                  style={{ height: 50, width: "100%" }}
                  onClick={handleBankTransferClick}
                >
                  {CONSTANT.card.toUpperCase()}
                </Button>
              </Col>
              <Col xs={24} sm={8} md={8} lg={8}>
                <Button
                  type="default"
                  style={{ height: 50, width: "100%" }}
                  onClick={cancel}
                >
                  {CONSTANT.other.toUpperCase()} {/* Card */}
                </Button>
              </Col>
            </Row>
            <Divider />
            {showQRCode && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                  marginTop: "20px",
                  textAlign: "center",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              >
                <QRCode
                  value={`BANK_TRANSFER_AMOUNT_${formatVND(
                    data?.data?.reduce(
                      (acc, order) => acc + parseFloat(order.totalMoney),
                      0
                    )
                  )}`}
                />
              </div>
            )}

            <Divider />
            <Button
              type="primary"
              block
              style={{ marginTop: "24px", height: 50 }}
              onClick={handlePayNow}
              loading={paymentMutation.isLoading}
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
