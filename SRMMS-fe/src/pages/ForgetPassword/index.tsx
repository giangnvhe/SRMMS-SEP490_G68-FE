import { Button, Card, Form, Input, message, Typography } from "antd";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import InputComponent from "~/components/InputComponent";
import useNotification from "~/hooks/useNotification";
import {
  forgetPassword,
  OtpResponse,
  RequestResetPassword,
  resetPassword,
  VerificationOTP,
} from "~/services/account";

const ForgotPassword = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumbers, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [form] = Form.useForm();
  const { errorMessage, successMessage } = useNotification();

  const forgotPasswordApiCall = async (
    params: VerificationOTP
  ): Promise<OtpResponse> => {
    const response: AxiosResponse<OtpResponse> = await forgetPassword(params);
    return response.data;
  };

  const resetPasswordApiCall = async (
    params: RequestResetPassword
  ): Promise<OtpResponse> => {
    const response: AxiosResponse<OtpResponse> = await resetPassword(params);
    return response.data;
  };
  console.log(isOtpSent);

  const forgotPasswordMutation = useMutation<
    OtpResponse,
    Error,
    VerificationOTP
  >(forgotPasswordApiCall, {
    onSuccess: (response) => {
      if (response) {
        successMessage({
          title: "Thành công",
          description:
            response.message || "Mã Otp đã được gửi đến điện thoại của bạn.",
        });
      }
      setIsOtpSent(true);
    },
    onError: (error) => {
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      console.error(error);
    },
  });

  const resetPasswordMutation = useMutation<
    OtpResponse,
    Error,
    RequestResetPassword
  >(resetPasswordApiCall, {
    onSuccess: (response) => {
      if (response) {
        successMessage({
          title: "Thành công",
          description:
            response.message ||
            "Mật khẩu đã được thay đổi thành công, vui lòng thử đăng nhập lại",
        });
      }
      form.resetFields();
      setIsOtpSent(false);
      setPhoneNumber("");
      setOtp("");
      setNewPassword("");
    },
    onError: (error) => {
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      console.error(error);
    },
  });

  const handleSubmitPhoneNumber = (values: VerificationOTP) => {
    forgotPasswordMutation.mutate(values);
    setPhoneNumber(values.phoneNumber);
  };

  const handleSubmitResetPassword = () => {
    const resetParams: RequestResetPassword = {
      phoneNumber: phoneNumbers,
      newPassword: newPassword,
    };
    resetPasswordMutation.mutate(resetParams);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <Card style={{ width: 400, padding: "20px" }} title="Quên Mật Khẩu">
        <Typography.Paragraph style={{ textAlign: "center" }}>
          {isOtpSent
            ? "Nhập mã OTP và mật khẩu mới để thiết lập lại mật khẩu."
            : "Nhập số điện thoại của bạn để nhận mã otp thiết lập lại mật khẩu."}
        </Typography.Paragraph>

        <Form
          form={form}
          onFinish={
            isOtpSent ? handleSubmitResetPassword : handleSubmitPhoneNumber
          }
        >
          {isOtpSent ? (
            <>
              <InputComponent
                label="Mã OTP"
                name="otp"
                rules={[
                  { required: true, message: "Vui lòng nhập mã OTP" },
                  {
                    pattern: /^[0-9]{6}$/,
                    message: "Mã OTP chỉ bao gồm 6 chữ số",
                  },
                ]}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới" },
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                  {
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/, // Ensure both letters and numbers are included
                    message:
                      "Mật khẩu phải có ít nhất một chữ cái và một chữ số",
                  },
                ]}
              >
                <Input.Password
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  maxLength={20}
                />
              </Form.Item>
            </>
          ) : (
            <InputComponent
              name="phoneNumber"
              label="Số Điện Thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Số điện thoại phải là 10 chữ số",
                },
              ]}
              maxLength={10}
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              style={{ height: 40, fontSize: "16px" }}
              loading={
                forgotPasswordMutation.isLoading ||
                resetPasswordMutation.isLoading
              }
            >
              {isOtpSent ? "Xác Nhận" : "Gửi Mã OTP"}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="link" onClick={() => (window.location.href = "/login")}>
            Quay lại đăng nhập
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
