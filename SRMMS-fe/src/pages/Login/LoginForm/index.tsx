import { Form } from "antd";
import { AxiosError } from "axios";
import classNames from "classnames";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Logo from "~/assets/images/Logo.png";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import { useAuth } from "~/context/authProvider";
import useNotification from "~/hooks/useNotification";
import { login } from "~/services/auth";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface FormFields {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const { errorMessage, successMessage } = useNotification();

  const handleLogin = useMutation(login, {
    onSuccess: (result) => {
      if (result.status === 200) {
        setToken(result.data.token);
        setUser({
          email: result.data.email,
          fullName: result.data.fullName,
          roleName: result.data.roleName,
        });
      }
      successMessage({
        title: "Đăng Nhập",
        description: "Đăng nhập thành công",
      });
      if (result.data.roleName === "Customer") {
        navigate("/home");
      } else {
        navigate("/admin/dashboard");
      }
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
          if (e.key === "Enter" && !handleLogin.isLoading) {
            form.submit();
          }
        }}
      >
        <InputComponent
          form={form}
          name="email"
          label="Email :"
          rules={[
            {
              required: true,
              message: "Email không được để trống",
            },
          ]}
          placeholder="Nhập email..."
        />
        <InputComponent
          form={form}
          name="password"
          label="Password :"
          type="password"
          rules={[
            {
              required: true,
              message: "Password không được để trống",
            },
          ]}
          placeholder="Nhận password..."
        />

        <ButtonComponent
          htmlType="submit"
          className="btn-login"
          loading={handleLogin.isLoading}
        >
          Đăng Nhập
        </ButtonComponent>
        <div className="mt-2 flex cursor-pointer justify-between text-sm">
          <p>
            Do you have a account?{" "}
            <span
              className="text-blue-500 hover:text-blue-700 font-medium ml-1"
              onClick={() => navigate("/register")}
            >
              Đăng kí
            </span>
          </p>
        </div>
        <div className="text-blue-500 hover:text-blue-700 font-medium">
          Quên mật khẩu?
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
