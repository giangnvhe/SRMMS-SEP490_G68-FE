import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Space, TableColumnsType, Tooltip } from "antd";
import moment from "moment";
import { formatVND } from "~/common/utils/formatPrice";
import { DiscountData } from "~/services/voucher";

interface IProps {
  onSelected: (id: DiscountData | undefined) => void;
}

function UseColumn({ onSelected }: IProps) {
  const columns: TableColumnsType<DiscountData> = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: 20,
    },

    {
      title: "Tên mã code",
      dataIndex: "codeDetail",
      align: "center",
      width: 100,
    },
    {
      title: "Giảm giá tiền",
      dataIndex: "discountValue",
      width: 100,
      render: (name: number) => (
        <div className="truncate text-sm text-gray-700">{formatVND(name)}</div>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      align: "center",
      width: 80,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      align: "center",
      width: 100,
    },
    {
      title: "Hành Động",
      width: 50,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <EditOutlined
              className="text-blue-500 cursor-pointer hover:text-blue-700"
              onClick={() => onSelected(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <DeleteOutlined className="text-red-500 cursor-pointer hover:text-red-700" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return columns;
}

export default UseColumn;
