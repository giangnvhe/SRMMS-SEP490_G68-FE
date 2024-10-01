import classNames from "classnames/bind";
import styles from "./index.module.scss";
import br_login from "../../../assets/images/br-login.jfif";

const cx = classNames.bind(styles);

const LoginIntro = () => {
  return (
    <div className={cx(styles["login-intro-container"])}>
      <div className="flex justify-center items-center">
        <img src={br_login} alt="No picture" />
      </div>
      <p className="mt-4 p-3">
        ** SRMMS luôn mang đến cho người dùng những trải nghiệm và dịch vụ tốt
        nhất.
      </p>
    </div>
  );
};

export default LoginIntro;
