import { Col, Form, FormInstance, Row, TableProps } from "antd";
import { PAGE_NUMBER, PAGE_SIZE } from "~/common/const/pagingation";
import { ComboData } from "~/services/combos";
import UseColumn from "./columns";
import InputComponent from "~/components/InputComponent";
import ButtonComponent from "~/components/ButtonComponent";
import TableComponent from "~/components/TableComponent";

interface IProps {
  dataTable: ComboData[] | [];
  refetch: () => void;
  loading: boolean;
  form: FormInstance;
  onSelected: (id: ComboData | undefined) => void;
  onOk: (key: number) => void;
}

const initialValue = {
  cbName: null,
  minPrice: null,
  maxPrice: null,
  pageNumber: PAGE_NUMBER,
  pageSize: PAGE_SIZE,
};

const ComboTable = ({
  dataTable,
  refetch,
  loading,
  onSelected,
  form,
  onOk,
}: IProps) => {
  const columns = UseColumn({ onSelected, onOk });

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
        <Row gutter={8} className="">
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <InputComponent
              name="cbName"
              form={form}
              placeholder="Tìm kiếm theo tên"
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
          total: form.getFieldValue("totalProducts"),
        }}
        scroll={{ x: 1700 }}
      />
    </div>
  );
};

export default ComboTable;
