import { Form, FormInstance, Space, TableColumnsType, TableProps } from "antd";
import { PAGE_NUMBER, PAGE_SIZE } from "~/common/const/pagingation";
import { CategoryData } from "~/services/category_product";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "~/components/TableComponent";
import useNotification from "~/hooks/useNotification";

interface IProps {
  onSelected: (id: CategoryData | undefined) => void;
  dataTable: CategoryData[] | [];
  refetch: () => void;
  loading: boolean;
  form: FormInstance;
  onOk: (key: string) => void;
}

const initialValue = {
  pageNumber: PAGE_NUMBER,
  pageSize: PAGE_SIZE,
};

function TableCategory({
  onSelected,
  dataTable,
  refetch,
  loading,
  form,
  onOk,
}: IProps) {
  const { comfirmMessage } = useNotification();

  const columns: TableColumnsType<CategoryData> = [
    {
      title: "STT",
      dataIndex: "index",
      width: "10px",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Category Name",
      dataIndex: "catName",
      width: "70px",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "70px",
    },
    {
      title: "Action",
      fixed: "right",
      width: "20px",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              console.log("🚀 ~ record:", record);

              onSelected(record);
            }}
          />
          <DeleteOutlined
            onClick={() =>
              comfirmMessage({
                description: "Do you want delete " + record.catName + " ?",
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

  const handleTableChange: TableProps["onChange"] = (pagination) => {
    form.setFieldValue("pageSize", pagination.pageSize);
    form.setFieldValue("pageNumber", pagination.current);
    refetch();
  };

  return (
    <div>
      <Form form={form}>
        <TableComponent
          columns={columns}
          onChange={handleTableChange}
          dataSource={dataTable}
          loading={loading}
          pagination={{
            current:
              form.getFieldValue("pageNumber") ?? initialValue.pageNumber,
            pageSize: form.getFieldValue("pageSize") ?? initialValue.pageSize,
          }}
          scroll={{ x: 1700 }}
        />
      </Form>
    </div>
  );
}

export default TableCategory;
