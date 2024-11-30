import { Col, Form, FormInstance, Row, TableProps } from "antd";
import { PAGE_NUMBER, PAGE_SIZE } from "~/common/const/pagingation";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import TableComponent from "~/components/TableComponent";
import { DiscountData } from "~/services/voucher";
import UseColumn from "./columns";
import DatePickerComponent from "~/components/DatePickerComponent";

interface IProps {
  dataTable: DiscountData[] | [];
  refetch: () => void;
  loading: boolean;
  form: FormInstance;
  onSelected: (id: DiscountData | undefined) => void;
  onOk: (key: number) => void;
}

const initialValue = {
  pageNumber: PAGE_NUMBER,
  pageSize: PAGE_SIZE,
};
const TableVoucher = ({
  form,
  refetch,
  dataTable,
  loading,
  onSelected,
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
              name="codeDetail"
              form={form}
              placeholder="Tìm kiếm theo tên"
            />
          </Col>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <div className="flex items-center space-x-2">
              <DatePickerComponent
                name="startDate"
                form={form}
                placeholder="Ngày bắt đầu"
                className="w-96"
              />
              <span className="mr-3 mb-6">~</span>
              <DatePickerComponent
                name="endDate"
                form={form}
                placeholder="Ngày kết thúc"
                className="w-96"
              />
            </div>
          </Col>
          <Col sm={{ span: 4 }} xs={{ span: 24 }} className="flex justify-end">
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

export default TableVoucher;
