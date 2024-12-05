import { Col, Form, FormInstance, Row, TableProps } from "antd";
import { PAGE_NUMBER, PAGE_SIZE } from "~/common/const/pagingation";
import { OrderData } from "~/services/order";
import styles from "./index.module.scss";
import classNames from "classnames";
import TableComponent from "~/components/TableComponent";
import UseColumn from "./columns";
import ButtonComponent from "~/components/ButtonComponent";
import DatePickerComponent from "~/components/DatePickerComponent";
import InputComponent from "~/components/InputComponent";
import SelectComponent, { Option } from "~/components/SelectComponent";
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
  form,
  onSelected,
}: IProps) => {
  const columns = UseColumn({ onSelected });

  const options: Option[] = [
    { value: 1, label: "Chờ xác nhận" },
    { value: 2, label: "Đang chuẩn bị" },
    { value: 3, label: "Đã hoàn thành" },
    { value: 4, label: "Đã thanh toán" },
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
      <Form form={form} onFinish={onSubmitTable} initialValues={initialValue}>
        <Row gutter={8} className={cx("category-search-table")}>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <InputComponent
              name="tableName"
              form={form}
              placeholder="Tìm bàn"
            />
          </Col>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <SelectComponent
              name="statusId"
              options={options}
              placeholder="Trạng thái"
            />
          </Col>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <div className="flex items-center">
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
          </Col>
          <Col sm={{ span: 4 }} xs={{ span: 24 }}>
            <ButtonComponent onClick={() => form.submit()}>
              TÌm Kiếm
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
