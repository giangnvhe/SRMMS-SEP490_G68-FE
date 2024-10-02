import classNames from "classnames/bind";
import styles from "./index.module.scss";
import LoginForm from "./LoginForm";
import LoginIntro from "./LoginIntro";
const cx = classNames.bind(styles);

const Login = () => {
  
  return (
    <div className={cx(styles["login-container"])}>
      <div className={cx("background-image")}></div>
      <div className={cx("background-overlay")}></div>
      <div className={cx("content")}>
        <div className={cx("login-content-container")}>
          <LoginForm />
          <LoginIntro />
        </div>
      </div>
    </div>
  );
};

export default Login;
