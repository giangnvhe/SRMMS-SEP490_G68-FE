import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, message, Typography, Spin } from "antd";
import {
  PointRequest,
  SettingPoints,
  getPoint,
  DataPoint,
} from "~/services/point";
import useNotification from "~/hooks/useNotification";

const { Text } = Typography;

const SettingPoint: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fetchingRates, setFetchingRates] = useState(true);
  const [currentRates, setCurrentRates] = useState<DataPoint | null>(null);
  console.log("🚀 ~ currentRates:", currentRates);
  const [form] = Form.useForm();

  const { errorMessage, successMessage } = useNotification();

  // Fetch existing point rates on component mount
  useEffect(() => {
    const fetchCurrentRates = async () => {
      try {
        setFetchingRates(true);
        const response = await getPoint();
        if (response.data) {
          const rates = response.data;
          setCurrentRates(rates);

          form.setFieldsValue({
            moneyToPointRate: rates.moneyToPointRate,
            pointToMoneyRate: rates.pointToMoneyRate,
          });
        }
      } catch (error) {
        message.error("Không thể tải tỷ giá hiện tại");
        console.error(error);
      } finally {
        setFetchingRates(false);
      }
    };

    fetchCurrentRates();
  }, [form]);

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

        // Update current rates after successful submission
        setCurrentRates({
          moneyToPointRate: values.moneyToPointRate,
          pointToMoneyRate: values.pointToMoneyRate,
        });
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
      title="Quy tắc đổi và tính điểm"
      className="w-full max-w-md mx-auto mt-10"
    >
      {/* Current Rates Display */}
      <div className="mb-4 bg-gray-50 p-3 rounded">
        <div className="flex justify-between mb-2">
          <Text strong>Tỷ giá hiện tại:</Text>
        </div>
        <div className="flex justify-between">
          {fetchingRates ? (
            <Spin size="small" />
          ) : (
            <>
              <Text>
                1 điểm ={" "}
                {currentRates?.moneyToPointRate?.toLocaleString() || "N/A"} VND
              </Text>
              <Text>
                {currentRates?.pointToMoneyRate?.toLocaleString() || "N/A"} điểm
                = 1000 VND
              </Text>
            </>
          )}
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          moneyToPointRate: currentRates?.moneyToPointRate || 1,
          pointToMoneyRate: currentRates?.pointToMoneyRate || 1,
        }}
      >
        <Form.Item
          name="moneyToPointRate"
          label="Nhập số tiền tương ứng với 1 điểm (quy tắc tính điểm)"
          rules={[{ required: true, message: "Vui lòng nhập tỷ giá tiền tệ" }]}
        >
          <Input
            type="number"
            placeholder="Nhập số tiền tương ứng với 1 điểm"
          />
        </Form.Item>

        <Form.Item
          name="pointToMoneyRate"
          label="Nhập số tiền tương ứng với 1 điểm (quy tắc đổi điểm)"
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
            Áp dụng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SettingPoint;
