import { TableOutlined } from "@ant-design/icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  Col,
  Divider,
  message,
  Row,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { formatVND } from "~/common/utils/formatPrice";
import { PaymentOrder, RequestPaymentOrder } from "~/services/order";
import { getOrderTable, TableOrderData } from "~/services/orderTable";
import PaymentMethod from "./components/PaymentMethod";
import { getTableId, TableData } from "~/services/table";
import { AxiosResponse } from "axios";

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
  const [tableDatass, setTableData] = useState<TableData | null>(null);

  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchTableData = async () => {
        try {
          const response: AxiosResponse<TableData> = await getTableId(
            Number(id)
          );
          setTableData(response.data);
        } catch (error) {
          message.error("Failed to fetch table data.");
          console.error(error);
        }
      };
      fetchTableData();
    }
  }, [id]);

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
        setShowInvoice(true);
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

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    navigate("/order-table");
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
  const tableData: DataType[] = Array.isArray(data?.data)
    ? data.data.flatMap((order: TableOrderData, index) => {
        const products = order.products.map((product, productIndex) => ({
          key: `${index}-${productIndex}`,
          productName: product.proName,
          comboName: "",
          quantity: product.quantity,
          price: product.price,
          subTotal: product.price * product.quantity,
        }));

        const combos = (order.combos || []).map((combo, comboIndex) => ({
          key: `${index}-${comboIndex}`,
          productName: "",
          comboName: combo.comboName,
          quantity: combo.quantity,
          price: combo.price,
          subTotal: combo.price * combo.quantity,
        }));

        return [...products, ...combos];
      })
    : [];

  const totalBill = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) {
      return 0;
    }
    return data.data.reduce(
      (acc: number, order: any) => acc + parseFloat(order.totalMoney || 0),
      0
    );
  }, [data]);

  const handlePayNow = (
    discountId?: number,
    accId?: number,
    usedPoints?: number
  ) => {
    const orders = Array.isArray(data?.data) ? data.data : [data?.data];

    if (!orders.length) {
      message.error("Không có order để thanh toán.");
      return;
    }
    orders.forEach((order: any) => {
      paymentMutation.mutate({
        id: order.orderId,
        data: {
          discountId: discountId || null,
          accId: accId || order.accId || null,
          totalMoney: discountId
            ? totalBill - (order.discountValue || 0)
            : parseFloat(order.totalMoney.toString()),
          usedPoints: usedPoints || null, // Add usedPoints
        },
      });
    });
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
                    {tableDatass?.tableName}
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
                  Array.isArray(data?.data)
                    ? data.data.reduce(
                        (acc, order) =>
                          acc + parseFloat(order.totalMoney || "0"),
                        0
                      )
                    : 0
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
              showInvoice={showInvoice}
              handleCloseInvoice={handleCloseInvoice}
              orderData={data?.data}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
