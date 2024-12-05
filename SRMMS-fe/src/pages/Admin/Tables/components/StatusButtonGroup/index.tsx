import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { permissionObject } from "~/common/const/permission";
import ButtonComponent from "~/components/ButtonComponent";
import { useAuth } from "~/context/authProvider";
import { TableData } from "~/services/table";

interface IProps {
  selectedStatus: string;
  selectedShift: string;
  onStatusChange: (status: string) => void;
  onShiftChange: (shift: string) => void;
  refetch: () => void;
  setOpenModal: (isOpen: boolean) => void;
  setSelectedTable: (table: TableData | undefined) => void;
}

const StatusButtonGroup = ({
  selectedStatus,
  selectedShift,
  onStatusChange,
  onShiftChange,
  setOpenModal,
  setSelectedTable,
}: IProps) => {
  const statuses = [
    "Tất cả",
    "Trống",
    "Đang sử dụng",
    "Đã đặt",
    "Đang sửa chữa",
  ];
  const shifts = [
    { label: "Tất cả", value: "Tất cả" },
    { label: "Ca trưa", value: "Lunch" },
    { label: "Ca tối", value: "Dinner" },
  ];
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex flex-wrap space-x-2 space-y-2 md:flex-nowrap md:space-y-0">
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

        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">Ca:</span>
          <Select
            style={{ width: 120 }}
            value={selectedShift}
            onChange={onShiftChange}
            options={shifts}
          />
        </div>
      </div>

      {user && (
        <div className="flex gap-2 flex-wrap w-full md:w-auto">
          {(user.roleName === permissionObject.ADMIN ||
            user.roleName === permissionObject.MANAGER) && (
            <>
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
            </>
          )}
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
          {(user.roleName === permissionObject.STAFF.CASHIER ||
            user.roleName === permissionObject.ADMIN ||
            user.roleName === permissionObject.MANAGER) && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default StatusButtonGroup;
