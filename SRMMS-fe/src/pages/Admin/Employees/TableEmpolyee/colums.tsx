import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, TableColumnsType } from "antd";
import { EmployeesData } from "../../../../services/employee";
import { useNavigate } from "react-router-dom";

const UseColumn = () => {
  const navigate = useNavigate();

  const columns: TableColumnsType<EmployeesData> = [
    {
      title: "ID",
      dataIndex: "empId",
      width: "70px",
    },
    {
      title: "Name",
      render: (_, record) => `${record.empFirstName} ${record.empLastName}`,
      width: "70px",
    },
    {
      title: "Gender",
      dataIndex: "empGender",
      width: "70px",
    },
    {
      title: "Email",
      dataIndex: "empEmail",
      width: "70px",
    },
    {
      title: "Phone Number",
      dataIndex: "empPhoneNumber",
      width: "70px",
    },
    {
      title: "Address",
      dataIndex: "empAddress",
      width: "70px",
    },
    {
      title: "Start Date",
      dataIndex: "empStartDate",
      width: "70px",
    },
    {
      title: "Position",
      dataIndex: "roleName",
      width: "70px",
    },
    {
      title: "Status",
      dataIndex: "empStatus",
      align: "center",
      width: "70px",
      render: (status) => (
        <span
          style={{
            color: "white",
            fontSize: "15px",
            background: status ? "green" : "red",
            fontWeight: "bold",
            border: `2px solid ${status ? "green" : "red"}`,
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          {status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Action",
      width: "70px",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => navigate(`/admin/updateEmployee/${record.empId}`)}
          />
          <DeleteOutlined />
        </Space>
      ),
    },
  ];
  return columns;
};

export default UseColumn;
