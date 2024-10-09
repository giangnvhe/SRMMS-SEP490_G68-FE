import classNames from "classnames";
import styles from "./index.module.scss";
import { Form } from "antd";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import Logo from "../../../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import useNotification from "../../../hooks/useNotification";
import { useMutation } from "react-query";
import { setAccessToken } from "../../../configs/accessToken";
import { AxiosError } from "axios";
import { login } from "../../../services/auth";
import { useAuth } from "../../../context/authProvider";

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

  const { errorMessage } = useNotification();

  const handleLogin = useMutation(login, {
    onSuccess: (result) => {
      if (result.status === 200) {
        setToken(result.data.token);
        setUser({
          empEmail: result.data.empEmail,
          empName: result.data.empName,
          roleName: result.data.roleName,
          empLastName: result.data.empLastName
        })
      }
      navigate("/admin/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorMessage({
        description:
          error.response?.data.message ||
          "An unexpected error occurred. Please try again.",
      });
    },
  });

  const onSubmitForm = (_values: FormFields) => {
    handleLogin.mutate({
      empEmail: _values.empEmail,
      empPassword: _values.empPassword,
    });
  };

  return (
    <div className={cx(styles["login-form-container"])}>
      <img
        src={Logo}
        alt="No Picture"
        className="logo-img w-40 h-24 object-cover"
      />
      <p className="flex justify-center items-center mb-5">
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
          label="User Name"
          rules={[
            {
              required: true,
              message: "Please enter your user name or email.",
            },
          ]}
          placeholder="Enter your user name or email..."
        />
        <InputComponent
          form={form}
          name="empPassword"
          label="Password"
          rules={[{ required: true, message: "Please enter your password." }]}
          type="password"
          placeholder="Enter your password"
        />

        <ButtonComponent
          htmlType="submit"
          className="btn-login"
          onClick={submit}
          loading={handleLogin.isLoading}
        >
          Login
        </ButtonComponent>
      </Form>
    </div>
  );
};

export default LoginForm;
