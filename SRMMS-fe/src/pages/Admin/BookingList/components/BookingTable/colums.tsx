import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Badge, Popconfirm, Space, TableColumnsType, Tooltip } from "antd";
import useNotification from "~/hooks/useNotification";
import { BookingData } from "~/services/booking";

interface IProps {
  setSelectedBooking: (booking: BookingData | undefined) => void;
  onReject: (id: number) => void;
}

function UseColumn({ setSelectedBooking, onReject }: IProps) {
  const { comfirmMessage } = useNotification();

  const columns: TableColumnsType<BookingData> = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: 20,
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "nameBooking",
      width: 100,
      render: (name: string) => (
        <div className="truncate text-sm text-gray-700">{name}</div>
      ),
    },

    {
      title: "Số Điện Thoại",
      dataIndex: "phoneBooking",
      align: "center",
      width: 80,
    },
    {
      title: "Số người",
      dataIndex: "numberOfPeople",
      align: "left",
      width: 100,
    },
    {
      title: "Giờ Đặt Bàn",
      dataIndex: "hourBooking",
      align: "left",
      width: 100,
    },
    {
      title: "Ngày Đặt Bàn",
      dataIndex: "dayBooking",
      align: "left",
      width: 100,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "left",
      width: 100,
      render: (status) => (
        <Badge
          status={status ? "success" : "error"}
          text={status ? "Chấp nhận" : "Từ chối"}
        />
      ),
    },
    {
      title: "Hành Động",
      width: 50,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Space size="middle">
            <Tooltip title="Duyệt">
              <CheckOutlined
                className="text-green-500 cursor-pointer hover:text-green-700"
                onClick={() => setSelectedBooking(record)}
              />
            </Tooltip>
            {/* Existing reject button */}
          </Space>

          {/* Nút "Reject" */}
          <Tooltip title="Từ chối">
            <Popconfirm
              title={`Bạn có chắc chắn muốn từ ${record?.nameBooking}?`}
              onConfirm={() =>
                comfirmMessage({
                  description: `Bạn có chắc chắn muốn duyệt món ${record.nameBooking}?`,
                  onSubmit: () => {
                    if (record.bookingId) {
                      onReject(record.bookingId); // Hàm xử lý trạng thái duyệt
                    }
                  },
                })
              }
            >
              <CloseOutlined className="text-red-500 cursor-pointer hover:text-red-700" />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return columns;
}

export default UseColumn;
