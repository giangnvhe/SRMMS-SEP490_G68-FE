import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Space, TableColumnsType, Tooltip } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { OrderData } from "~/services/order";

interface IProps {
  onSelected: (id: OrderData | undefined) => void;
}
const UseColumn = ({ onSelected }: IProps) => {
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
      width: "160px",
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
      render: (status) => {
        let statusText = "";
        let statusColor = "";

        switch (status) {
          case 1:
            statusText = "Chờ xác nhận";
            statusColor = "text-yellow-500";
            break;
          case 2:
            statusText = "Đang chuẩn bị";
            statusColor = "text-blue-500";
            break;
          case 3:
            statusText = "Đã hoàn thành";
            statusColor = "text-green-500";
            break;
          case 4:
            statusText = "Đã thanh toán";
            statusColor = "text-purple-500";
            break;
          default:
            statusText = "Không xác định";
            statusColor = "text-gray-500";
        }

        return (
          <div className={`text-sm font-semibold ${statusColor}`}>
            {statusText}
          </div>
        );
      },
      width: "180px",
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
              onClick={() => navigate(`/admin/order/${record.orderId}`)}
            />
          </Tooltip>
          {record.status === 1 && (
            <Tooltip title="Chỉnh Sửa">
              <EditOutlined
                className="text-blue-500 cursor-pointer"
                onClick={() => onSelected(record)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return columns;
};

export default UseColumn;
