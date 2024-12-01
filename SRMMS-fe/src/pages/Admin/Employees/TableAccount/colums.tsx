import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, TableColumnsType } from "antd";
import useNotification from "~/hooks/useNotification";
import { AccountData } from "~/services/account";

interface IProps {
  onSelected: (id: AccountData | undefined) => void;
  onOk: (key: string) => void;
}

const UseColumn = ({ onSelected, onOk }: IProps) => {
  const { comfirmMessage } = useNotification();

  const columns: TableColumnsType<AccountData> = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: "50px",
    },
    {
      title: "Full Name",
      render: (_, record) => (
        <div className="truncate w-32 text-sm font-semibold">
          {record.fullName}
        </div>
      ),
      width: "120px",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "150px",
      render: (email) => (
        <div className="truncate text-sm text-gray-700">{email}</div>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      width: "120px",
      render: (phone) => <div className="text-sm text-gray-700">{phone}</div>,
    },
    {
      title: "Position",
      render: (_, record) => (
        <div className="text-sm font-medium text-gray-800">
          {record.roleName}
        </div>
      ),
      width: "100px",
      align: "center",
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
      title: "Action",
      width: "50px",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            className="text-blue-500 cursor-pointer"
            onClick={() => onSelected(record)}
          />
          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() =>
              comfirmMessage({
                description: "Do you want delete " + record.fullName + " ?",
                onSubmit: () => {
                  if (record.key) {
                    onOk(record.key as string);
                  }
                },
              })
            }
          />
        </Space>
      ),
    },
  ];

  return columns;
};

export default UseColumn;
