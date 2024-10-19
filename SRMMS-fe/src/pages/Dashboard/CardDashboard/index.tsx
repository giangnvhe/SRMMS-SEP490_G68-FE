import { Card } from "antd";
import styles from "./index.module.scss";
import classNames from "classnames";
import { AiFillProduct } from "react-icons/ai";
import { BsPersonFill, BsPersonVcardFill } from "react-icons/bs";
const cx = classNames.bind(styles);

const CardDashboard = () => {
  return (
    <div className="flex gap-4">
      <Card className={cx(styles["card-custom"])} style={{ width: 300 }}>
        <div className="flex gap-10">
          <div className="w-16 h-16 flex justify-center items-center rounded-2xl bg-violet-200">
            <BsPersonVcardFill className="card-icon" style={{ fontSize: 50 }} />
          </div>
          <div className="flex-col">
            <div className="mt-[-10px] font-serif">Total Employee</div>
            <div className="font-bold text-2xl mt-3">40,689</div>
          </div>
        </div>
      </Card>

      <Card className={cx(styles["card-custom"])} style={{ width: 300 }}>
        <div className="flex gap-10">
          <div className="w-16 h-16 flex justify-center items-center rounded-2xl bg-green-300">
            <AiFillProduct className="card-icon" style={{ fontSize: 50 }} />
          </div>
          <div className="flex-col">
            <div className="mt-[-10px] font-serif">Total Product</div>
            <div className="font-bold text-2xl mt-3">40,689</div>
          </div>
        </div>
      </Card>

      <Card className={cx(styles["card-custom"])} style={{ width: 300 }}>
        <div className="flex gap-10">
          <div className="w-16 h-16 flex justify-center items-center rounded-2xl bg-orange-300">
            <BsPersonFill className="card-icon" style={{ fontSize: 50 }} />
          </div>
          <div className="flex-col">
            <div className="mt-[-10px] font-serif">Total Customer</div>
            <div className="font-bold text-2xl mt-3">40,689</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardDashboard;
