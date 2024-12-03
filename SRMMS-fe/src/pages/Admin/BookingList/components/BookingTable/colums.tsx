import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Badge, Popconfirm, Space, TableColumnsType, Tooltip } from "antd";
import moment from "moment";
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
      render: (dayBooking) => {
        return moment(dayBooking).format("YYYY-MM-DD");
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "statusName",
      align: "center",
      width: 100,
      render: (statusName) => {
        let badgeClass = "";

        switch (statusName) {
          case "Đã duyệt":
            badgeClass = "bg-green-100 text-green-800 border border-green-300";
            break;
          case "Đang chờ xử lý":
            badgeClass =
              "bg-yellow-100 text-yellow-800 border border-yellow-300";
            break;
          case "Hủy":
            badgeClass = "bg-red-100 text-red-800 border border-red-300";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800 border border-gray-300";
        }

        return (
          <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded ${badgeClass}`}
          >
            {statusName}
          </span>
        );
      },
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
