import classNames from "classnames";
import styles from "./index.module.scss";
import { Form } from "antd";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import Logo from "../../../assets/images/Logo.png";


const cx = classNames.bind(styles);

interface FormFields {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [form] = Form.useForm();
  const { submit } = form;

  const onSubmitForm = (_values: FormFields) => {
    //handleLogin.mutate({ email: _values.username, password: _values.password });
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
      <Form form={form} layout="vertical" onFinish={onSubmitForm}>
        <InputComponent
          form={form}
          name="username"
          label="User Name"
          rules={[{ required: true, message: "" }]}
          placeholder="Enter your user name or email..."
        />
        <InputComponent
          form={form}
          name="password"
          label="Password"
          rules={[{ required: true, message: "" }]}
          type="password"
          placeholder="Enter your password"
        />

        <ButtonComponent htmlType="submit" className="btn-login">
          Login
        </ButtonComponent>
      </Form>
    </div>
  );
};

export default LoginForm;
