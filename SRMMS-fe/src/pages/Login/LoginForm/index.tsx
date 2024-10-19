import classNames from "classnames";
import styles from "./index.module.scss";
import { Form } from "antd";
import InputComponent from "~/components/InputComponent";
import ButtonComponent from "~/components/ButtonComponent";
import Logo from "~/assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import useNotification from "~/hooks/useNotification";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { login } from "~/services/auth";
import { useAuth } from "~/context/authProvider";
import { useEffect } from "react";

const cx = classNames.bind(styles);

interface FormFields {
  empEmail: string;
  empPassword: string;
}

const LoginForm = () => {
  const [form] = Form.useForm();
  const { submit } = form;
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const { errorMessage, successMessage } = useNotification();

  const handleLogin = useMutation(login, {
    onSuccess: (result) => {
      if (result.status === 200) {
        setToken(result.data.token);
        setUser({
          empEmail: result.data.empEmail,
          empName: result.data.empName,
          roleName: result.data.roleName,
          empLastName: result.data.empLastName,
        });
      }
      successMessage({
        title: "Đăng Nhập",
        description: "Đăng nhập thành công",
      });
      navigate("/admin/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorMessage({
        description:
          error.response?.data?.message ||
          "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.",
      });
    },
  });


  const onSubmitForm = (values: FormFields) => {
    handleLogin.mutate(values);
  };

  return (
    <div className={cx(styles["login-form-container"])}>
      <img
        src={Logo}
        alt="No Picture"
        className="logo-img w-40 h-24 object-cover p-2"
      />
      <p className="flex justify-center items-center mb-5 font-bold">
        We commit, we are your true partner
      </p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmitForm}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            form.submit();
          }
        }}
      >
        <InputComponent
          form={form}
          name="empEmail"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email của bạn." },
            { type: "email", message: "Email không hợp lệ." },
          ]}
          placeholder="Nhập email..."
        />
        <InputComponent
          form={form}
          name="empPassword"
          label="Password"
          rules={[
            { required: true, message: "Vui lòng nhập password của bạn." },
          ]}
          type="password"
          placeholder="Nhận password..."
        />

        <ButtonComponent
          htmlType="submit"
          className="btn-login"
          onClick={submit}
          loading={handleLogin.isLoading}
        >
          Đăng Nhập
        </ButtonComponent>
        <div className="mt-2 flex cursor-pointer">
          <span className="forgot-password">Quên mật khẩu ?</span>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
