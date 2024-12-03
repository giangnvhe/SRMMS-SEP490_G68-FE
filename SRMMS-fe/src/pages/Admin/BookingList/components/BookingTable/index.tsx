import { Col, Form, FormInstance, Row, Select, TableProps } from "antd";
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
  setSelectedBooking: (booking: BookingData | undefined) => void;
  onReject: (id: number) => void;
}

const BookingTable = ({
  dataTable,
  refetch,
  loading,
  form,
  setSelectedBooking,
  onReject,
}: IProps) => {
  const columns = UseColumn({ setSelectedBooking, onReject });
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
      <Form form={form} onFinish={onSubmitTable} layout="horizontal">
        <Row gutter={8}>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <Form.Item name="statusId" label="Trạng thái">
              <Select
                placeholder="Chọn trạng thái"
                allowClear
                options={[
                  { value: 1, label: "Đang chờ xử lý" },
                  { value: 2, label: "Đã duyệt" },
                  { value: 3, label: "Hủy" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <DatePickerComponent
              label="Tìm kiếm theo ngày"
              name="bookingDate"
              form={form}
              placeholder="Tìm kiếm theo ngày"
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
          total: form.getFieldValue("totalBookings"),
        }}
        scroll={{ x: 1700 }}
      />
    </div>
  );
};

export default BookingTable;
