import {
  CalendarOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, TimePicker } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { useMutation } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import DatePickerComponent from "~/components/DatePickerComponent";
import InputComponent from "~/components/InputComponent";
import useNotification from "~/hooks/useNotification";
import { Booking, BookingRequest } from "~/services/booking";

const BookingForm = () => {
  const [form] = Form.useForm();
  const { successMessage, errorMessage } = useNotification();

  const bookingMutation = useMutation(Booking, {
    onSuccess: (success: AxiosResponse<{ message: string }>) => {
      successMessage({
        description: success?.data?.message || "Đã đặt bàn thành công",
      });
      form.resetFields();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorMessage({
        description:
          (error as AxiosError).message ||
          "Đã có lỗi xảy ra, Đặt bàn thất bại!!",
      });
    },
  });

  const onFinish = (values: {
    nameBooking: string;
    phoneBooking: string;
    dayBooking: moment.Moment;
    hourBooking: moment.Moment;
    numberOfPeople: number;
  }) => {
    const bookingData: BookingRequest = {
      nameBooking: values.nameBooking,
      phoneBooking: values.phoneBooking,
      dayBooking: values.dayBooking,
      hourBooking: values.hourBooking,
      numberOfPeople: values.numberOfPeople,
    };
    console.log("🚀 ~ BookingForm ~ bookingData:", bookingData);
    bookingMutation.mutate(bookingData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Đặt Bàn Ngay
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          date: moment(),
        }}
        className="space-y-4"
      >
        <InputComponent
          label="Họ và Tên"
          name="nameBooking"
          placeholder="Nhập họ tên"
          form={form}
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          prefix={<UserOutlined />}
        />
        <InputComponent
          label="Số điện thoại"
          name="phoneBooking"
          placeholder="Nhập số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^\d+$/, message: "Số điện thoại không hợp lệ!" },
          ]}
          prefix={<PhoneOutlined />}
        />

        <DatePickerComponent
          label="Ngày"
          name="dayBooking"
          form={form}
          rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
          style={{ width: "100%" }}
          prefix={<CalendarOutlined />}
        />

        <Form.Item
          label="Thời gian"
          name="hourBooking"
          rules={[{ required: true, message: "Vui lòng chọn thời gian!" }]}
          tooltip="Chọn giờ đặt bàn"
        >
          <TimePicker
            format="HH:mm"
            style={{ width: "100%" }}
            prefix={<ClockCircleOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="Số lượng người"
          name="numberOfPeople"
          rules={[{ required: true, message: "Vui lòng nhập số lượng người!" }]}
          tooltip="Nhập số lượng người tham gia"
        >
          <InputNumber
            min={1}
            max={20}
            style={{ width: "100%" }}
            placeholder="Số lượng người"
            prefix={<TeamOutlined />}
          />
        </Form.Item>

        {/* <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              borderRadius: "4px",
            }}
          >
            Đặt Bàn
          </Button>
        </Form.Item> */}
        <ButtonComponent htmlType="submit" className="w-full">Xác Nhận Đặt Bàn</ButtonComponent>
      </Form>
    </div>
  );
};

export default BookingForm;
