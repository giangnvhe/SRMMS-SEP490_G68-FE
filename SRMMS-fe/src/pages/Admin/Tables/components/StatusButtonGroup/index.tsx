import { PlusCircleOutlined } from "@ant-design/icons";
import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "~/components/ButtonComponent";
import { TableData } from "~/services/table";

interface IProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  refetch: () => void;
  setOpenModal: (isOpen: boolean) => void;
  setSelectedTable: (table: TableData | undefined) => void;
}

const StatusButtonGroup = ({
  selectedStatus,
  onStatusChange,
  setOpenModal,
  setSelectedTable,
}: IProps) => {
  const statuses = ["ALL", "Trống", "Đang sử dụng", "Đã đặt", "Đang sửa chữa"];
  const navigate = useNavigate();

  return (
    <div className="flex justify-between flex-wrap gap-4">
      <div className="mb-4 flex flex-wrap space-x-2 space-y-2 md:flex-nowrap md:space-y-0 w-full md:w-auto">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`w-full md:w-auto px-3 py-1 md:px-4 md:py-2 text-sm md:text-base font-semibold rounded-lg shadow-sm transition duration-200 ease-in-out ${
              selectedStatus === status
                ? "bg-[#08979C] text-white"
                : `bg-white text-gray-700 border border-gray-300 hover:bg-blue-100 hover:text-blue-700`
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap w-full md:w-auto">
        <ButtonComponent
          icon={<PlusCircleOutlined />}
          onClick={() => {
            setSelectedTable(undefined);
            setOpenModal(true);
          }}
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2 w-full sm:w-auto"
        >
          Thêm Bàn Mới
        </ButtonComponent>
        <ButtonComponent
          onClick={() => {
            startTransition(() => {
              navigate("/qr-code");
            });
          }}
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2 w-full sm:w-auto"
        >
          QR Code Bàn
        </ButtonComponent>
        <ButtonComponent
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2 w-full sm:w-auto"
          onClick={() => {
            startTransition(() => {
              navigate("/order-table");
            });
          }}
        >
          Thanh Toán
        </ButtonComponent>
      </div>
    </div>
  );
};

export default StatusButtonGroup;
