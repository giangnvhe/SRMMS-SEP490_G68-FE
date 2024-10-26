import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";
import { AccountData } from "~/services/employee";

const UseColumn = () => {
  const navigate = useNavigate();

  const columns: TableColumnsType<AccountData> = [
    {
      title: "STT",
      dataIndex: "accountId",
      align: "center",
      width: "50px",
      render: (_text, _record) => _record.accountId,
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
      title: "Action",
      width: "50px",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() =>
              navigate(`/admin/update-employee/${record.accountId}`)
            }
          />
          <DeleteOutlined />
        </Space>
      ),
    },
  ];
  return columns;
};

export default UseColumn;
