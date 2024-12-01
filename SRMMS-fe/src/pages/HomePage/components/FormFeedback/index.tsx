import { Button, Form, Input, Rate, Spin } from "antd";
import { useMutation } from "react-query";
import { useAuth } from "~/context/authProvider";
import useNotification from "~/hooks/useNotification";
import { postFeedback } from "~/services/feedback";

interface IProps {
  refetch: () => void;
}

const FeedbackForm = ({ refetch }: IProps) => {
  const { user, token } = useAuth();
  const { successMessage, errorMessage } = useNotification();

  const [form] = Form.useForm();
  const { mutateAsync, isLoading } = useMutation(postFeedback, {
    onSuccess: () => {
      successMessage({ description: "Phản hồi đã được gửi thành công!" });
      form.resetFields();
      refetch();
    },
    onError: () => {
      errorMessage({
        description: "Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại.",
      });
    },
  });

  const handleSubmit = async (values: any) => {
    if (!user) {
      errorMessage({
        description: "Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại.",
      });
      return;
    }

    const data = {
      feedback1: values.feedback,
      rateStar: values.rateStar,
      accId: user.id,
    };

    try {
      await mutateAsync(data);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="mt-8">
      {token ? (
        <h2 className="text-2xl font-bold mb-4">Gửi Phản Hồi Của Bạn</h2>
      ) : (
        <h5 className="text-2xl text-red-500 font-bold mb-4">
          Bạn cần đăng nhập để có thể gửi phản hồi !
        </h5>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          onFinish={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
        >
          <Form.Item
            name="feedback"
            label="Phản hồi"
            rules={[{ required: true, message: "Vui lòng nhập phản hồi" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Nhập phản hồi của bạn..."
              disabled={!token}
            />
          </Form.Item>

          <Form.Item
            name="rateStar"
            label="Đánh giá (1-5 sao)"
            rules={[{ required: true, message: "Vui lòng chọn đánh giá" }]}
          >
            <Rate allowHalf disabled={!token} />
          </Form.Item>

          {token && (
            <Form.Item>
              <Button type="primary" htmlType="submit" className="float-right">
                Gửi Phản Hồi
              </Button>
            </Form.Item>
          )}
        </Form>
      )}
    </div>
  );
};

export default FeedbackForm;
