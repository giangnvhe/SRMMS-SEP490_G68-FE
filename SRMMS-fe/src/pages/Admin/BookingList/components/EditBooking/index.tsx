import {
  ClockCircleOutlined,
  LoadingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { DatePicker, Form, InputNumber, Select, Spin, TimePicker } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect } from "react";
import { useMutation } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import useNotification from "~/hooks/useNotification";
import {
  BookingData,
  NewBookingRequest,
  updateBooking,
} from "~/services/booking";
import { shiftOptions, statusOptions } from "../const";

interface IProps {
  onCancel: () => void;
  bookingData: BookingData | undefined;
  refetch: () => void;
}
const { Option } = Select;

interface MutationUpdateBooking {
  id: string | number | undefined;
  data: NewBookingRequest;
}
const UpdateBooking = ({ refetch, bookingData, onCancel }: IProps) => {
  const [form] = Form.useForm();
  const { successMessage, errorMessage } = useNotification();

  const handleUpdateBooking = useMutation(
    ({ id, data }: MutationUpdateBooking) => updateBooking(Number(id), data),
    {
      onSuccess: (success: AxiosResponse<{ message: string }>) => {
        successMessage({
          title: "Thành công",
          description: "Chỉnh sửa thành công",
        });
        form.resetFields();
        onCancel();
        refetch();
      },
      onError: (error: AxiosError<{ message: string }>) => {
        const backendMessage =
          error.response?.data?.message ||
          error.message ||
          "Đã có lỗi xảy ra, chỉnh sửa không thành công!!";
        errorMessage({
          title: "Thất bại",
          description: backendMessage,
        });
      },
    }
  );

  useEffect(() => {
    if (bookingData) {
      form.setFieldsValue({
        dayBooking: dayjs(bookingData?.dayBooking),
        hourBooking: moment(bookingData?.hourBooking, "HH:mm"),
        numberOfPeople: bookingData?.numberOfPeople,
        statusId: bookingData?.statusId,
        shift: bookingData?.shift,
      });
    }
  }, [bookingData]);

  const onSubmitForm = (values: {
    dayBooking: moment.Moment;
    hourBooking: moment.Moment;
    numberOfPeople: number;
    statusId: number;
    shift: string;
  }) => {
    const formData: NewBookingRequest = {
      dayBooking: values.dayBooking,
      hourBooking: values.hourBooking,
      numberOfPeople: values.numberOfPeople,
      statusId: values.statusId,
      shift: values.shift,
    };
    handleUpdateBooking.mutate({
      id: bookingData?.bookingId,
      data: formData,
    });
  };

  const isLoadings = handleUpdateBooking.isLoading;

  const disablePastDates = (currentDate: dayjs.Dayjs) => {
    return currentDate.isBefore(dayjs(), "day");
  };

  return (
    <Spin spinning={isLoadings} indicator={<LoadingOutlined spin />}>
      <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
        <Form form={form} layout="vertical" onFinish={onSubmitForm}>
          <div className="space-y-4">
            <div className="w-full flex gap-4">
              <Form.Item
                label="Ngày đặt"
                name="dayBooking"
                rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disablePastDates}
                />
              </Form.Item>
              <Form.Item
                label="Thời gian"
                name="hourBooking"
                rules={[
                  { required: true, message: "Vui lòng chọn thời gian!" },
                ]}
                tooltip="Chọn giờ đặt bàn"
              >
                <TimePicker
                  format="HH:mm"
                  prefix={<ClockCircleOutlined />}
                  disabledHours={() => {
                    const hours = Array.from({ length: 24 }, (_, i) => i);
                    return hours.filter(
                      (hour) =>
                        hour < 10 || hour > 22 || (hour >= 15 && hour < 16)
                    );
                  }}
                  disabledMinutes={(selectedHour) => {
                    if (selectedHour === 15)
                      return Array.from({ length: 60 }, (_, i) => i);
                    if (selectedHour === 16)
                      return Array.from({ length: 30 }, (_, i) => i);
                    return [];
                  }}
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Số lượng người"
              name="numberOfPeople"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng người!" },
              ]}
              tooltip="Nhập số lượng người tham gia"
            >
              <InputNumber
                min={1}
                max={20}
                style={{ width: "100%" }}
                placeholder="Số lượng người"
              />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="statusId"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
            >
              <Select placeholder="Chọn trạng thái">
                {statusOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ca làm"
              name="shift"
              rules={[{ required: true, message: "Vui lòng chọn ca làm!" }]}
            >
              <Select placeholder="Chọn ca làm">
                {shiftOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <ButtonComponent className="px-5 py-2 rounded-md" htmlType="submit">
              Lưu
            </ButtonComponent>
            <ButtonComponent
              btnType="go-back"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Hủy
            </ButtonComponent>
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default UpdateBooking;
