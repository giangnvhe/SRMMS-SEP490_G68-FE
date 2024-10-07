import { Typography } from "antd";
import styles from "./index.module.scss";
import classNames from "classnames";

const cx = classNames.bind(styles);
const FooterComponent = () => {
  return (
    <div className={cx(styles["footer-container"])}>
      <Typography.Link href="#">+84 123456789</Typography.Link>
      <Typography.Link href="#" target="_blank">Privacy Policy</Typography.Link>
      <Typography.Link href="#">Email: srmms@gmail.com</Typography.Link>
    </div>
  );
};
export default FooterComponent;
