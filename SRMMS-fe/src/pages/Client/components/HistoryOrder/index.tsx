import { Descriptions, Drawer, message, Spin, Table } from "antd";
import moment from "moment";
import { useQuery } from "react-query";
import { getOrderByTableId, OrderData } from "~/services/order";

interface HistoryOrderProps {
  visible: boolean;
  tableId: number | null;
  onClose: () => void;
}

const HistoryOrder = ({ visible, tableId, onClose }: HistoryOrderProps) => {
  const {
    data: orderDetails,
    isLoading,
    error,
  } = useQuery<OrderData[]>(
    ["orderDetails", tableId], // Query key and variable
    () =>
      getOrderByTableId(tableId!).then((response) =>
        Array.isArray(response.data) ? response.data : [response.data]
      ), // Ensure response is always an array
    {
      enabled: !!tableId && visible, // Only fetch if tableId and visible are defined
      onError: () => {
        message.error("Failed to fetch order details!");
      },
    }
  );

  const closeDrawer = () => {
    onClose();
  };

  // Cột cho bảng sản phẩm
  const productColumns = [
    { title: "Tên Món", dataIndex: "proName", key: "proName" },
    { title: "Số Lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text: number) => `${text} VND`,
    },
  ];

  // Cột cho bảng combo
  const comboColumns = [
    { title: "Tên Combo", dataIndex: "comboName", key: "comboName" },
    { title: "Số Lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text: number) => `${text} VND`,
    },
  ];

  return (
    <>
      <Drawer
        title={
          orderDetails
            ? `Lịch sử Order - ${orderDetails[0]?.tableName}`
            : "Loading..."
        }
        width={800}
        onClose={closeDrawer}
        visible={visible}
      >
        {isLoading ? (
          <Spin size="large" />
        ) : orderDetails ? (
          <>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Ngày Order">
                {orderDetails[0]?.orderDate
                  ? orderDetails[0]?.orderDate
                  : moment().format("YYYY-MM-DD HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item label="Tên Bàn">
                {orderDetails[0]?.tableName}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng Tiền ">
                {orderDetails[0]?.totalMoney} VND
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {orderDetails[0]?.status === 1
                  ? "Chờ xác nhận"
                  : orderDetails[0]?.status === 2
                  ? "Đang chuẩn bị"
                  : orderDetails[0]?.status === 3
                  ? "Đã hoàn thành"
                  : orderDetails[0]?.status === 4
                  ? "Đã thanh toán"
                  : "Unknown"}
              </Descriptions.Item>
            </Descriptions>
            <h3 style={{ marginTop: 20 }}>Món ăn</h3>
            <Table
              dataSource={orderDetails[0]?.products || []}
              columns={productColumns}
              pagination={false}
              rowKey="productId"
            />

            {orderDetails[0]?.combos && orderDetails[0]?.combos.length > 0 && (
              <>
                <h3 style={{ marginTop: 20 }}>Combos</h3>
                <Table
                  dataSource={orderDetails[0]?.combos || []}
                  columns={comboColumns}
                  pagination={false}
                  rowKey="comboId"
                />
              </>
            )}
          </>
        ) : (
          <p>No data available</p>
        )}
      </Drawer>
    </>
  );
};

export default HistoryOrder;
