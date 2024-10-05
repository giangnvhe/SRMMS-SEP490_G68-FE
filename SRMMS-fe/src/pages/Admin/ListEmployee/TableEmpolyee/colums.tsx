import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, TableColumnsType } from "antd";
import { EmployeesData } from "../../../../services/employee";

const UseColumn = () => {
  const columns: TableColumnsType<EmployeesData> = [
    {
      title: "ID",
      dataIndex: "empId",
      width: "70px",
    },
    {
      title: "Name",
      render: (text, record) => `${record.empFirstName} ${record.empLastName}`,
    },
    {
      title: "Gender",
      dataIndex: "empGender",
    },
    {
      title: "Email",
      dataIndex: "empEmail",
    },
    {
      title: "Phone Number",
      dataIndex: "empPhoneNumber",
    },
    {
      title: "Address",
      dataIndex: "empAdress",
    },
    {
      title: "Start Date",
      dataIndex: "empStartDate",
    },
    {
      title: "Position",
      dataIndex: "roleName",
    },
    {
      title: "Status",
      dataIndex: "empStatus",
      align: "center",
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
      width: "10%",
      fixed: "right",
      align: "center",
      render: () => (
        <Space size="middle">
          <EditOutlined />
          <DeleteOutlined />
        </Space>
      ),
    },
  ];
  return columns;
};

export default UseColumn;
