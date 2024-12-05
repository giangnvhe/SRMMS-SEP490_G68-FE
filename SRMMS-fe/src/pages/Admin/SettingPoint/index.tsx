import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { PointRequest, SettingPoints } from "~/services/point";
import useNotification from "~/hooks/useNotification";

const SettingPoint: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { errorMessage, successMessage } = useNotification();

  const handleSubmit = async (values: PointRequest) => {
    try {
      setLoading(true);
      const response = await SettingPoints(values);

      if (response) {
        successMessage({
          title: "Thành công",
          description:
            response.data.message || "Đã cập nhật cài đặt điểm thành công",
        });
        form.resetFields();
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi cập nhật cài đặt điểm");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Cài đặt chuyển đổi điểm"
      className="w-full max-w-md mx-auto mt-10"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ moneyToPointRate: 1, pointToMoneyRate: 1 }}
      >
        <Form.Item
          name="moneyToPointRate"
          label="Tỷ lệ chuyển đổi tiền sang điểm"
          rules={[{ required: true, message: "Vui lòng nhập tỷ giá tiền tệ" }]}
        >
          <Input
            type="number"
            placeholder="Nhập tỷ giá quy đổi tiền sang điểm"
          />
        </Form.Item>

        <Form.Item
          name="pointToMoneyRate"
          label="Tỷ lệ chuyển đổi điểm thành tiền"
          rules={[
            { required: true, message: "Vui lòng nhập điểm đến tỷ giá tiền" },
          ]}
        >
          <Input
            type="number"
            placeholder="Nhập tỷ giá chuyển đổi điểm thành tiền"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Cập nhật cài đặt điểm
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SettingPoint;
