import { EyeOutlined } from "@ant-design/icons";
import { Space, TableColumnsType, Tooltip } from "antd";
import moment from "moment";
import { OrderData } from "~/services/order";

interface IProps {
  onSelected: (id: OrderData | undefined) => void;
}

const UseColumn = ({ onSelected }: IProps) => {
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
        <div className="text-sm text-gray-700">{tableName}</div>
      ),
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "orderDate",
      render: (_, record) => {
        const formattedDate = record.orderDate
          ? moment(record.orderDate).format("YYYY-MM-DD HH:mm:ss")
          : "N/A";
        return (
          <div className="truncate w-32 text-sm font-semibold">
            {formattedDate}
          </div>
        );
      },
      width: "120px",
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalMoney",
      width: "150px",
      render: (totalMoney) => (
        <div className="truncate text-sm text-gray-700">{totalMoney} VND</div>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <div className="text-sm text-gray-700">
          {status ? "Đã thanh toán" : "Chưa thanh toán"}
        </div>
      ),
      width: "120px",
      align: "center",
    },
    {
      title: "Action",
      width: "50px",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              className="text-blue-500 cursor-pointer"
              onClick={() => onSelected(record)} // Hàm này có thể dùng để chọn bản ghi
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return columns;
};

export default UseColumn;
