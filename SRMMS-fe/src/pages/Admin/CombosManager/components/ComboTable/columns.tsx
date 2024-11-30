import { EditOutlined } from "@ant-design/icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Space, TableColumnsType, Tooltip } from "antd";
import { useState } from "react";
import { formatVND } from "~/common/utils/formatPrice";
import useNotification from "~/hooks/useNotification";
import { ComboData } from "~/services/combos";

interface IProps {
  onSelected: (id: ComboData | undefined) => void;
  onOk: (key: number) => void;
}

function UseColumn({ onSelected, onOk }: IProps) {
  const { comfirmMessage } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const columns: TableColumnsType<ComboData> = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: 20,
    },

    {
      title: "Hình Ảnh",
      dataIndex: "comboImg",
      align: "center",
      width: 100,
      render: (image: string) => (
        <>
          <div
            className="flex justify-center items-center h-16 cursor-pointer"
            onClick={() => {
              setSelectedImage(image);
              setIsModalOpen(true);
            }}
          >
            <img
              src={image}
              alt="Product"
              className="w-12 h-12 object-cover rounded"
            />
          </div>
          <Modal
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
          >
            <img
              src={selectedImage}
              alt="Product Preview"
              className="w-full object-contain"
            />
          </Modal>
        </>
      ),
    },
    {
      title: "Tên Combo",
      dataIndex: "comboName",
      width: 100,
      render: (name: string) => (
        <div className="truncate text-sm text-gray-700">{name}</div>
      ),
    },

    {
      title: "Mô tả",
      dataIndex: "comboDescription",
      align: "center",
      width: 80,
    },
    {
      title: "Giá",
      dataIndex: "comboMoney",
      align: "left",
      width: 100,
      render: (price: number) => `${formatVND(price)}`,
    },
    {
      title: "Trạng Thái",
      dataIndex: "comboStatus",
      align: "center",
      width: 100,
      render: (status: boolean) => (
        <span
          className={`px-3 py-1 rounded-full text-white font-semibold ${
            status ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
    {
      title: "Hành Động",
      width: 50,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            className="text-blue-500 cursor-pointer"
            onClick={() => onSelected(record)}
          />
          <Tooltip title="Tắt">
            <FontAwesomeIcon
              icon={faPowerOff}
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={() =>
                comfirmMessage({
                  description:
                    "Bạn chắc chắn muốn tắt trạng thái hoạt động của " +
                    record.comboName +
                    " ?",
                  onSubmit: () => {
                    if (record.key) {
                      onOk(record.key as number);
                    }
                  },
                })
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return columns;
}

export default UseColumn;
