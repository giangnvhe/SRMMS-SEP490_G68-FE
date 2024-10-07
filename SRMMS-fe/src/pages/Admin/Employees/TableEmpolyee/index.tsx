import { Col, Form, FormInstance, Row, TableProps } from "antd";
import classNames from "classnames";
import { PAGE_NUMBER, PAGE_SIZE } from "../../../../common/const/pagingation";
import ButtonComponent from "../../../../components/ButtonComponent";
import InputComponent from "../../../../components/InputComponent";
import TableComponent from "../../../../components/TableComponent";
import { EmployeesData } from "../../../../services/employee";
import UseColumn from "./colums";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

interface IProps {
  dataTable: EmployeesData[] | [];
  refetch: () => void;
  loading: boolean;
  form: FormInstance;
}

const initialValue = {
  name: null,
  description: null,
  pageNumber: PAGE_NUMBER,
  pageSize: PAGE_SIZE,
};

const TableEmployee = ({ dataTable, refetch, loading, form }: IProps) => {
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
        <Row gutter={8} className={cx("category-search-table")}>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <InputComponent name="empId" form={form} placeholder="Search ID" />
          </Col>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <InputComponent
              name="empName"
              form={form}
              placeholder="Search By Name"
            />
          </Col>
          <Col sm={{ span: 4 }} xs={{ span: 24 }}>
            <ButtonComponent onClick={() => form.submit()}>
              Search
            </ButtonComponent>
          </Col>
        </Row>
      </Form>
      <TableComponent
        columns={columns}
        onChange={handleTableChange}
        dataSource={dataTable}
        loading={loading}
        pagination={{
          current: form.getFieldValue("pageNumber") ?? initialValue.pageNumber,
          pageSize: form.getFieldValue("pageSize") ?? initialValue.pageSize,
        }}
        scroll={{ x: 1700 }}
      />
    </div>
  );
};

export default TableEmployee;
