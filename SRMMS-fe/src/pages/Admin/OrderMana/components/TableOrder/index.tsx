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
  onSelected: (id: OrderData | undefined) => void;
}

const initialValue = {
  fromDate: "",
  toDate: "",
  pageNumber: PAGE_NUMBER,
  pageSize: PAGE_SIZE,
};

const TableOrder = ({
  dataTable,
  refetch,
  loading,
  onSelected,
  form,
}: IProps) => {
  const columns = UseColumn({ onSelected });

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
        <Row gutter={8} className={cx("product-search-table")}>
          <Col md={{ span: 3 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <DatePickerComponent
              name="fromDate"
              form={form}
              placeholder="Ngày bắt đầu"
            />
          </Col>
          <Col md={{ span: 3 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <div> ~ </div>
          </Col>
          <Col md={{ span: 3 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <DatePickerComponent
              name="toDate"
              form={form}
              placeholder="Ngày kết thúc"
            />
          </Col>
          <Col sm={{ span: 4 }} xs={{ span: 24 }}>
            <ButtonComponent onClick={() => form.submit()}>
              Tìm Kiếm
            </ButtonComponent>
          </Col>
        </Row>
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
