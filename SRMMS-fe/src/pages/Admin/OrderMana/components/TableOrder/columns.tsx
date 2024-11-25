import { EyeOutlined } from "@ant-design/icons";
import { Space, TableColumnsType, Tooltip } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { OrderData } from "~/services/order";

const UseColumn = () => {
  const navigate = useNavigate();
  const columns: TableColumnsType<OrderData> = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: "50px",
    },
    {
      title: "Bàn",
      dataIndex: "tableName",
      width: "120px",
      render: (tableName) => (
        <div className="text-sm text-gray-700 font-medium">{tableName}</div>
      ),
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "orderDate",
      render: (_, record) => {
        const formattedDate = record.orderDate
          ? moment(record.orderDate).format("YYYY-MM-DD HH:mm:ss")
          : "";
        return (
          <div className="truncate w-32 text-sm font-semibold text-gray-600">
            {formattedDate}
          </div>
        );
      },
      width: "160px", // Adjusted width for better readability
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalMoney",
      width: "150px",
      render: (totalMoney) => (
        <div className="truncate text-sm text-gray-700 font-medium">
          {totalMoney} VND
        </div>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <div
          className={`text-sm text-gray-700 font-semibold ${
            status ? "text-green-500" : "text-red-500"
          }`}
        >
          {status ? "Đã thanh toán" : "Chưa thanh toán"}
        </div>
      ),
      width: "120px",
      align: "center",
    },
    {
      title: "Hành động",
      width: "60px",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate(`/admin/order/${record.orderId}`)} // Hàm này có thể dùng để chọn bản ghi
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return columns;
};

export default UseColumn;
