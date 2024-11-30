import { EditOutlined } from "@ant-design/icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Space, TableColumnsType, Tooltip } from "antd";
import moment from "moment";
import { formatVND } from "~/common/utils/formatPrice";
import useNotification from "~/hooks/useNotification";
import { DiscountData } from "~/services/voucher";

interface IProps {
  onSelected: (id: DiscountData | undefined) => void;
  onOk: (key: number) => void;
}

function UseColumn({ onSelected, onOk }: IProps) {
  const { comfirmMessage } = useNotification();
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
      render: (codeDetail: string) => (
        <div className="font-bold text-blue-600">{codeDetail}</div>
      ),
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
      render: (date: string) => <div>{moment(date).format("YYYY-MM-DD")}</div>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      align: "center",
      width: 100,
      render: (date: string) => <div>{moment(date).format("YYYY-MM-DD")}</div>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      align: "center",
      width: 100,
      render: (status: boolean) => (
        <span
          className={`px-3 py-1 rounded-full text-white font-semibold ${
            status ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
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
          <Tooltip title="Tắt">
            <FontAwesomeIcon
              icon={faPowerOff}
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={() =>
                comfirmMessage({
                  description:
                    "Bạn chắc chắn muốn tắt trạng thái hoạt động của " +
                    record.codeDetail +
                    " ?",
                  onSubmit: () => {
                    if (record.key) {
                      onOk(record.key as number);
                    }
                  },
                })
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return columns;
}

export default UseColumn;
