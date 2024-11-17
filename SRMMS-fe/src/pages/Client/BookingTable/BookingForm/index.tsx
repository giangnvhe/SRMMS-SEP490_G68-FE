import {
  CalendarOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  TimePicker
} from "antd";
import moment from "moment";

const BookingForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Booking details:", values);
    // Handle submission, e.g., send data to an API
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: "20px",
        background: "#f7f9fc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b-2 border-gray-300 pb-2">
        Đặt Bàn
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          date: moment(),
        }}
      >
        <Form.Item
          label="Họ tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          tooltip="Nhập họ tên của bạn"
        >
          <Input placeholder="Nhập họ tên" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
          tooltip="Nhập địa chỉ email của bạn"
        >
          <Input placeholder="Nhập email" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^\d+$/, message: "Số điện thoại không hợp lệ!" },
          ]}
          tooltip="Nhập số điện thoại của bạn"
        >
          <Input placeholder="Nhập số điện thoại" prefix={<PhoneOutlined />} />
        </Form.Item>

        <Form.Item
          label="Ngày"
          name="date"
          rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
          tooltip="Chọn ngày đặt bàn"
        >
          <DatePicker style={{ width: "100%" }} prefix={<CalendarOutlined />} />
        </Form.Item>

        <Form.Item
          label="Thời gian"
          name="time"
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
          name="people"
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

        <Form.Item>
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingForm;
