import {
  ClockCircleOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DatePicker, Form, InputNumber, TimePicker } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { useMutation } from "react-query";
// import socket from "~/common/const/mockSocket";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import useNotification from "~/hooks/useNotification";
import { Booking, BookingRequest } from "~/services/booking";
// import socket from "socket.io-client";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const WS_URL = "http://localhost:5000";

interface ServerToClientEvents {
  "new-message": (message: string, username: string) => void;
}

interface ClientToServerEvents {
  "booking": (data: BookingRequest) => void;
  "send-message": (message: string, username: string) => void;
}

export type MySocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const BookingForm = () => {
  const [form] = Form.useForm();
  const { successMessage, errorMessage } = useNotification();
  const [socket, setSocket] = useState<MySocket>();

  useEffect(() => {
    const socket = io(WS_URL);
    setSocket(socket);
  }, [form]);

  const bookingMutation = useMutation(Booking, {
    onSuccess: (success: AxiosResponse<{ message: string }>) => {
      successMessage({
        description: success?.data?.message || "Đã đặt bàn thành công",
      });
      form.resetFields();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const backendMessage =
        error.response?.data?.message ||
        error.message ||
        "Đã có lỗi xảy ra, Đặt bàn thất bại!!";
      errorMessage({
        description: backendMessage,
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
    const socket = io(WS_URL);
    setSocket(socket);
    bookingMutation.mutate(bookingData);
    socket.emit("booking", bookingData);
  };

  const disablePastDates = (currentDate: dayjs.Dayjs) => {
    return currentDate.isBefore(dayjs(), "day"); // Disable past dates
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

        <Form.Item
          label="Ngày đặt"
          name="dayBooking"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            disabledDate={disablePastDates}
          />
        </Form.Item>

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
            disabledHours={() => {
              const hours = Array.from({ length: 24 }, (_, i) => i);
              return hours.filter(
                (hour) =>
                  hour < 10 ||
                  hour > 22 || // Trước 10:00 hoặc sau 22:30
                  (hour >= 15 && hour < 16) // Khoảng 15:00 - 16:30
              );
            }}
            disabledMinutes={(selectedHour) => {
              if (selectedHour === 15)
                return Array.from({ length: 60 }, (_, i) => i); // Vô hiệu hóa toàn bộ phút của giờ 15
              if (selectedHour === 16)
                return Array.from({ length: 30 }, (_, i) => i); // Vô hiệu hóa phút 0-29 của giờ 16
              return [];
            }}
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

        <ButtonComponent htmlType="submit" className="w-full">
          Xác Nhận Đặt Bàn
        </ButtonComponent>
      </Form>
    </div>
  );
};

export default BookingForm;
