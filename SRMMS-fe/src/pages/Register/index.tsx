import { Button, Form, notification } from "antd";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import LoginImage from "../../assets/images/background.jpg";
import styles from "./index.module.scss";
import classNames from "classnames";
import { useMutation } from "react-query";
import { register, resendOtp, verifyOtp } from "~/services/auth";
import { startTransition, useState } from "react";
import { useNavigate } from "react-router";
const cx = classNames.bind(styles);

const Register = () => {
  const [form] = Form.useForm();
  const [isRegistered, setIsRegistered] = useState(false);
  const [phoneNumberOtp, setPhoneNumberOtp] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [countdown, setCountdown] = useState(180);
  const [isOtpLoadings, setIsOtpLoadings] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const startCountdown = () => {
    setIsTimerActive(true);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(timer);
          setIsTimerActive(false);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const { mutate: registerUser, isLoading: isRegisterLoading } = useMutation(
    register,
    {
      onSuccess: () => {
        notification.success({
          message: "Đăng ký thành công!",
          description:
            "Vui lòng kiểm tra số điện thoại để xác nhận mã OTP kích hoạt tài khoản.",
        });
        setIsRegistered(true);
        setApiErrorMessage(null);
      },

      onError: (error: any) => {
        let apiMessage = "";
        const responseMessage = error.response?.data;
        if (responseMessage === "Email is already registered.") {
          apiMessage = "Email đã tồn tại.";
        }
        setApiErrorMessage(apiMessage);
        notification.error({
          message: "Đăng ký thất bại",
          description: error.message || "Có lỗi xảy ra. Vui lòng thử lại.",
        });
        setIsRegistered(false);
      },
    }
  );

  //api resend verifyUserOtp
  const { mutate: verifyUserOtp } = useMutation(verifyOtp, {
    onSuccess: () => {
      notification.success({
        message: "Xác thực OTP thành công!",
        description: "Chúc mừng bạn đã đăng ký thành công!",
      });
      startTransition(() => {
        navigate("/login");
      });
    },
    onError: (error: any) => {
      notification.error({
        message: "Xác thực OTP thất bại",
        description:
          "Mã OTP không chính xác hoặc đã hết hạn. Vui lòng thử lại.",
      });
    },
  });

  //api resend otp
  const { mutate: resendOtpMutate, isLoading: isResendOtpLoading } =
    useMutation(resendOtp, {
      onSuccess: (data) => {
        notification.success({
          message: "Gửi lại mã OTP thành công!",
          description:
            data?.data?.message || "Vui lòng kiểm tra tin nhắn để nhận mã OTP.",
        });
        setCountdown(100);
        startCountdown();
      },
      onError: (error: any) => {
        notification.error({
          message: "Gửi lại mã OTP thất bại",
          description: "Có lỗi xảy ra. Vui lòng thử lại.",
        });
      },
    });

  const handleSubmit = async (values: any) => {
    const { fullName, email, phoneNumber, password } = values;
    setPhoneNumberOtp(phoneNumber);
    try {
      await registerUser({ fullName, email, phoneNumber, password });
      startCountdown();
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    const values = await form.validateFields();

    const otpCode = values.verificationCode;

    const payload = {
      phoneNumber: phoneNumberOtp,
      verificationCode: otpCode,
    };

    setIsOtpLoadings(true);
    try {
      await verifyUserOtp(payload);
      setIsOtpLoadings(false);
    } catch (error) {
      setIsOtpLoadings(false);
      notification.error({
        message: "Xác thực OTP thất bại",
        description: "Mã OTP không hợp lệ. Vui lòng thử lại.",
      });
    }
  };

  const handleResendOtp = () => {
    resendOtpMutate({ phoneNumber: phoneNumberOtp });
  };

  return (
    <div className={cx(styles["container-register"])}>
      <div className={cx("wrapper")}>
        {/* Image Section */}
        <div
          className={cx("imageSection")}
          style={{ backgroundImage: `url(${LoginImage})` }}
        >
          <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
            <h2 className="text-4xl font-serif text-white text-center p-6">
              Chào mừng đến với chúng tôi!
            </h2>
          </div>
        </div>

        {apiErrorMessage && (
          <p className="text-red-500 text-center mt-4">{apiErrorMessage}</p>
        )}

        {/* Form Section */}
        <div className={cx("formSection")}>
          <h2 className={cx("formTitle")}>Đăng Ký Thành Viên</h2>

          {!isRegistered && (
            <Form
              onFinish={handleSubmit}
              layout="vertical"
              className="space-y-6"
            >
              <div>
                <InputComponent
                  name="fullName"
                  label="Họ và Tên"
                  placeholder="Nhập họ và tên"
                  form={form}
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên!" },
                  ]}
                  className={cx("inputField")}
                />
              </div>
              <div>
                <InputComponent
                  name="email"
                  label="Email"
                  form={form}
                  placeholder="Nhập địa chỉ email"
                  className="mt-2 border-gold-300 focus:border-gold-500"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ email!" },
                    {
                      type: "email",
                      message: "Vui lòng nhập một địa chỉ email hợp lệ!",
                    },
                  ]}
                />
              </div>
              <div>
                <InputComponent
                  name="phoneNumber"
                  label="Số điện thoại"
                  form={form}
                  placeholder="Nhập số điện thoại"
                  className="mt-2 border-gold-300 focus:border-gold-500"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      pattern: /^(0[3-9][0-9]{8})$/,
                      message: "Số điện thoại không hợp lệ! Vui lòng nhập lại.",
                    },
                  ]}
                />
              </div>
              <div>
                <InputComponent
                  name="password"
                  label="Mật Khẩu"
                  type="password"
                  form={form}
                  placeholder="Nhập mật khẩu"
                  className="mt-2 border-gold-300 focus:border-gold-500"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                    {
                      pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,12}$/,
                      message:
                        "Mật khẩu phải có từ 8 đến 12 ký tự, bao gồm cả chữ và số!",
                    },
                  ]}
                  maxLength={12}
                />
              </div>
              <ButtonComponent
                htmlType="submit"
                className="w-full mt-6 bg-gold-600 hover:bg-gold-700 text-white py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                loading={isRegisterLoading}
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? "Đang xử lý..." : "Đăng Ký Ngay"}
              </ButtonComponent>
            </Form>
          )}

          <p className={cx("loginLink")}>
            Đã có tài khoản?{" "}
            <a href="/login" className="text-gold-600 hover:underline">
              Đăng nhập
            </a>
          </p>
          {isRegistered && (
            <Form layout="vertical" className="otp-section" form={form}>
              <h3 className="text-center text-xl mb-4 font-semibold">
                Nhập mã OTP đã gửi đến số điện thoại của bạn
              </h3>

              <p className="text-center text-gray-600 text-sm mb-2">
                Mã OTP gồm <strong>6 chữ số</strong> được gửi qua tin nhắn SMS
                đến số điện thoại mà bạn đã đăng ký. Vui lòng nhập mã để hoàn
                tất xác thực.
              </p>

              {isTimerActive && (
                <p className="text-center text-red-600 text-sm mt-2">
                  Thời gian còn lại để sử dụng mã OTP:{" "}
                  <strong>{formatTime(countdown)}</strong>
                </p>
              )}

              {!isTimerActive && (
                <p className="text-center text-gray-500 text-sm mt-2">
                  Mã OTP đã hết hạn. Vui lòng nhấn{" "}
                  <strong>"Gửi lại mã OTP"</strong> để nhận mã mới.
                </p>
              )}

              <div>
                <InputComponent
                  name="verificationCode"
                  label="Nhập mã OTP"
                  form={form}
                  placeholder="Nhập mã OTP"
                  className="mt-2 border-gold-300 focus:border-gold-500"
                  rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
                />
              </div>

              <Button
                onClick={handleVerifyOtp}
                className="mt-4 w-full bg-gold-600 hover:bg-gold-700 py-3 rounded-xl"
                loading={isOtpLoadings}
                disabled={countdown <= 0}
              >
                Xác thực OTP
              </Button>

              {countdown <= 0 && (
                <Button
                  onClick={handleResendOtp}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl"
                  disabled={isTimerActive}
                  loading={isResendOtpLoading}
                >
                  Gửi lại mã OTP
                </Button>
              )}

              <p className="text-center text-sm text-gray-500 mt-4">
                Nếu bạn không nhận được mã OTP, vui lòng kiểm tra tin nhắn SMS
                hoặc liên hệ bộ phận hỗ trợ qua
                <a href="tel:0845280902" className="text-blue-600 underline">
                  {" "}
                  số điện thoại hỗ trợ.
                </a>
              </p>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
