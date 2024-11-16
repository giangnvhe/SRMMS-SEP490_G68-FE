import ButtonComponent from "~/components/ButtonComponent";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Modal } from "antd";
import AddTable from "../../AddTable";
import { useNavigate } from "react-router-dom";

interface IProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  refetch: () => void;
}

const StatusButtonGroup = ({
  selectedStatus,
  onStatusChange,
  refetch,
}: IProps) => {
  const statuses = ["ALL", "Trống", "Đang sử dụng", "Đã đặt", "Đang sửa chữa"];
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const onCancel = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex justify-between">
      <div className="mb-4 flex flex-wrap space-x-2 space-y-2 md:flex-nowrap md:space-y-0">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`w-full md:w-auto px-3 py-1 md:px-4 md:py-2 text-sm md:text-base font-semibold rounded-lg shadow-sm transition duration-200 ease-in-out ${
              selectedStatus === status
                ? "bg-[#08979C] text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-100 hover:text-blue-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <ButtonComponent
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenModal(true)}
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2"
        >
          Thêm Bàn Mới
        </ButtonComponent>
        <ButtonComponent
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2"
          onClick={() => navigate("/order-table")}
        >
          Thanh Toán
        </ButtonComponent>
      </div>

      <Modal
        footer={null}
        width={900}
        onCancel={onCancel}
        title={
          <span
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#fff",
              background: "linear-gradient(90deg, #4A90E2, #50E3C2)",
              padding: "10px 20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              display: "inline-block",
            }}
          >
            ✨ Thêm Bàn Mới
          </span>
        }
        open={openModal}
      >
        <AddTable refetch={refetch} onCancel={onCancel} />
      </Modal>
    </div>
  );
};

export default StatusButtonGroup;
