import { Col, Form, FormInstance, Row, TableProps } from "antd";
import { PAGE_NUMBER, PAGE_SIZE } from "~/common/const/pagingation";
import { OrderData } from "~/services/order";
import styles from "./index.module.scss";
import classNames from "classnames";
import TableComponent from "~/components/TableComponent";
import UseColumn from "./columns";
import ButtonComponent from "~/components/ButtonComponent";
import DatePickerComponent from "~/components/DatePickerComponent";
const cx = classNames.bind(styles);

interface IProps {
  dataTable: OrderData[] | [];
  refetch: () => void;
  loading: boolean;
  form: FormInstance;
}

const initialValue = {
  fromDate: "",
  toDate: "",
  pageNumber: PAGE_NUMBER,
  pageSize: PAGE_SIZE,
};

const TableOrder = ({ dataTable, refetch, loading, form }: IProps) => {
  const columns = UseColumn();

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
      <Form form={form} onFinish={onSubmitTable} initialValues={initialValue}>
        <div className={cx(styles["order-search-table"])}>
          <div className="flex items-center w-96">
            <DatePickerComponent
              name="fromDate"
              form={form}
              placeholder="Ngày bắt đầu"
              className="w-96"
            />
            <span className="mr-3 mb-6">~</span>
            <DatePickerComponent
              name="toDate"
              form={form}
              placeholder="Ngày kết thúc"
              className="w-96"
            />
          </div>
          <div>
            <ButtonComponent onClick={() => form.submit()} className="mb-2">
              Tìm Kiếm
            </ButtonComponent>
          </div>
        </div>
      </Form>

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

export default TableOrder;
