import { EyeOutlined, SyncOutlined } from "@ant-design/icons";
import {
  Form,
  FormInstance,
  Modal,
  Space,
  TableColumnsType,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import { PAGE_NUMBER, PAGE_SIZE } from "~/common/const/pagingation";
import TableComponent from "~/components/TableComponent";
import useNotification from "~/hooks/useNotification";
import { getOrderKitchenByStatus, OrderKitchenData } from "~/services/kitchen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  dataTable: OrderKitchenData[] | [];
  refetch: () => void;
  loading: boolean;
  form: FormInstance;
  onSelected: (id: OrderKitchenData | undefined) => void;
}

const TableKitchen = ({
  dataTable,
  loading,
  form,
  refetch,
  onSelected,
}: IProps) => {
  const navigate = useNavigate();
  const { errorMessage, successMessage } = useNotification();

  const handleChangeStatus = async (orderId: number) => {
    Modal.confirm({
      title: "Xác nhận thay đổi trạng thái",
      content: "Bạn có chắc chắn muốn thay đổi trạng thái của đơn hàng này?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await getOrderKitchenByStatus(orderId);
          if (response) {
            successMessage({
              title: "Thành công",
              description: "Đã thay đổi trạng thái đơn hàng thành công.",
            });
            refetch();
          }
        } catch (error) {
          errorMessage({
            title: "Thất bại",
            description:
              "Đã có lỗi xảy ra, thay đổi trạng thái đơn hàng thất bại.",
          });
        }
      },
    });
  };

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
      render: (status: number) => {
        let color = "";
        let text = "";

        switch (status) {
          case 1:
            color = "warning";
            text = "Chờ xác nhận";
            break;
          case 2:
            color = "processing";
            text = "Đang chuẩn bị";
            break;
          case 3:
            color = "success";
            text = "Đã hoàn thành";
            break;
          case 4:
            color = "purple";
            text = "Đã thanh toán";
            break;
          default:
            color = "default";
            text = "Không xác định";
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
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
              onClick={() => navigate(`/kitchen/${record.orderId}`)} // Hàm này có thể dùng để chọn bản ghi
            />
          </Tooltip>
          {record.status !== 3 && ( // Kiểm tra nếu status khác 3
            <Tooltip title="Hoàn thành">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-yellow-500 cursor-pointer"
                onClick={() => handleChangeStatus(record.orderId)}
              />
            </Tooltip>
          )}
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
