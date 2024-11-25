import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Space, TableColumnsType } from "antd";
import { useState } from "react";
import useNotification from "~/hooks/useNotification";
import { ComboData } from "~/services/combos";

interface IProps {
  onSelected: (id: ComboData | undefined) => void;
  onOk: (key: string) => void;
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
      render: (price: number) => `${price.toFixed(2)} VNĐ`,
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
          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() =>
              comfirmMessage({
                description: "Do you want delete " + record.comboName + " ?",
                onSubmit: () => {
                  if (record.key) {
                    onOk(record.key as string);
                  }
                },
              })
            }
          />
        </Space>
      ),
    },
  ];

  return columns;
}

export default UseColumn;
