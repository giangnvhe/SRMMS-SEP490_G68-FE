import { Col, Form, FormInstance, Row, TableProps } from "antd";
import { PAGE_NUMBER, PAGE_SIZE } from "~/common/const/pagingation";
import ButtonComponent from "~/components/ButtonComponent";
import DatePickerComponent from "~/components/DatePickerComponent";
import TableComponent from "~/components/TableComponent";
import { BookingData } from "~/services/booking";
import UseColumn from "./colums";

interface IProps {
  dataTable: BookingData[] | [];
  refetch: () => void;
  loading: boolean;
  form: FormInstance;
  onSelected: (id: BookingData | undefined) => void;
 // onOk: (key: string) => void;
}

const BookingTable = ({
  dataTable,
  refetch,
  loading,
  form,
  onSelected,
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
      <Form form={form} onFinish={onSubmitTable}>
        <Row gutter={8}>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <DatePickerComponent name="bookingDate" form={form} placeholder="Tìm kiếm theo ngày"/>
          </Col>
          {/* <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            
          </Col> */}
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
          total: form.getFieldValue("totalBookings"),
        }}
        scroll={{ x: 1700 }}
      />
    </div>
  );
};

export default BookingTable;
