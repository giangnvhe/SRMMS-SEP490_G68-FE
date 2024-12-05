import { EyeOutlined, SyncOutlined } from "@ant-design/icons";
import {
  Form,
  FormInstance,
  Space,
  TableColumnsType,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { PAGE_NUMBER, PAGE_SIZE } from "~/common/const/pagingation";
import TableComponent from "~/components/TableComponent";
import { OrderKitchenData } from "~/services/kitchen";

interface IProps {
  dataTable: OrderKitchenData[] | [];
  refetch: () => void;
  loading: boolean;
  form: FormInstance;
}

const TableKitchen = ({ dataTable, loading, form, refetch }: IProps) => {
  const columns: TableColumnsType<OrderKitchenData> = [
    {
      title: "Order",
      dataIndex: "index",
      key: "index",
      width: "50px",
      render: (text: number, record: OrderKitchenData) => `#${record.index}`,
    },
    {
      title: "Bàn",
      dataIndex: "tableName",
      key: "tableName",
      render: (tableName: string, record: OrderKitchenData) => (
        <Space>{tableName}</Space>
      ),
      width: "200px",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag color={status === 2 ? "orange" : "blue"}>
          {status === 2 ? "Preparing" : "Ready"}
        </Tag>
      ),
      width: "200px",
    },
    {
      title: "Hành động",
      width: "50px",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              className="text-blue-500 cursor-pointer"
              //onClick={() => navigate(`/admin/order/${record.orderId}`)} // Hàm này có thể dùng để chọn bản ghi
            />
          </Tooltip>
          <Tooltip title="Hoàn thành">
            <SyncOutlined
              className="text-yellow-500 cursor-pointer"
              // onClick={() => handleChangeStatus(record.orderId)} // Hàm thay đổi trạng thái
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleTableChange: TableProps["onChange"] = (pagination) => {
    form.setFieldValue("pageSize", pagination.pageSize);
    form.setFieldValue("pageNumber", pagination.current);
    refetch();
  };

  const onSubmitTable = () => {
    form.setFieldValue("pageNumber", PAGE_NUMBER);
    form.setFieldValue("pageSize", PAGE_SIZE);
    refetch();
  };

  return (
    <div>
      <Form form={form} onFinish={onSubmitTable}></Form>

      <TableComponent
        columns={columns}
        dataSource={dataTable}
        onChange={handleTableChange}
        loading={loading}
        pagination={{
          current: form.getFieldValue("pageNumber"),
          pageSize: form.getFieldValue("pageSize"),
          total: form.getFieldValue("totalOrders"),
        }}
        scroll={{ x: 1700 }}
      />
    </div>
  );
};

export default TableKitchen;
