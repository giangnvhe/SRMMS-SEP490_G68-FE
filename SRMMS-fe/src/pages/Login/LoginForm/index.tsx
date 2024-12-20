import { Form } from "antd";
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
import { permissionObject } from "~/common/const/permission";
import { AxiosError } from "axios";
import { startTransition } from "react";

const cx = classNames.bind(styles);

interface FormFields {
  phone: string;
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
          id: result.data.id,
          phone: result.data.phone,
          fullName: result.data.fullName,
          roleName: result.data.roleName,
        });
      }
      successMessage({
        title: "Đăng Nhập",
        description: "Đăng nhập thành công",
      });
      if (result.data.roleName === permissionObject.ADMIN) {
        navigate("/admin/dashboard");
      } else if (
        result.data.roleName === permissionObject.STAFF.SERVICE_STAFF
      ) {
        navigate("/tables");
      } else if (result.data.roleName === permissionObject.KITCHEN) {
        navigate("/kitchen");
      } else if (result.data.roleName === permissionObject.MANAGER) {
        navigate("/admin/employees");
      } else if (result.data.roleName === permissionObject.STAFF.CASHIER) {
        navigate("/tables");
      } else {
        navigate("/home");
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const backendMessage =
        error.response?.data?.message ||
        error.message ||
        "Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản mật khẩu";
      errorMessage({
        title: "Đăng nhập",
        description: backendMessage,
      });
      navigate("/login");
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
          name="phone"
          label="Số điện thoại: "
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại của bạn." },
          ]}
          placeholder="Nhập số điện thoại"
        />
        <InputComponent
          form={form}
          name="password"
          label="Mật khẩu :"
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
            Bạn có tài khoản chưa?{" "}
            <span
              className="text-blue-500 hover:text-blue-700 font-medium ml-1 cursor-pointer"
              onClick={() => {
                startTransition(() => {
                  navigate(`/register`);
                });
              }}
            >
              Đăng kí
            </span>
          </p>
        </div>
        <div
          className="text-blue-500 hover:text-blue-700 font-medium cursor-pointer"
          onClick={() => {
            startTransition(() => {
              navigate(`/forget-password`);
            });
          }}
        >
          Quên mật khẩu?
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
