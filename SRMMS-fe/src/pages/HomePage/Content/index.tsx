import classNames from "classnames";
import Grap1 from "./grap1";
import Grap2 from "./Grap2";
import Grap3 from "./Grap3";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Content = () => {
  const navigate = useNavigate();

  return (
    <div className={cx(styles["content-container"])}>
      <div className={cx("content-line")}>
        <div className={cx("content-line-text")}>
          <h1>Chào mừng đến với Tinh Hoa Ẩm Thực</h1>
          <a onClick={() => navigate("/dat-ban")}>Đặt Bàn</a>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Grap1 />
      </div>
      <div className="container mx-auto px-4 py-8">
        <Grap2 />
      </div>
      <div className="container mx-auto px-4 py-8">
        <Grap3 />
      </div>
    </div>
  );
};

export default Content;
