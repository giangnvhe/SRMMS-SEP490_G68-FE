import { EditOutlined } from "@ant-design/icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Space, TableColumnsType, Tooltip } from "antd";
import { useState } from "react";
import useNotification from "~/hooks/useNotification";
import { ProductData } from "~/services/product";

interface IProps {
  onSelected: (id: ProductData | undefined) => void;
  onOk: (key: string) => void;
}

function UseColumn({ onSelected, onOk }: IProps) {
  const { comfirmMessage } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const columns: TableColumnsType<ProductData> = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: 20,
    },

    {
      title: "Hình Ảnh",
      dataIndex: "image",
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
      title: "Tên Món Ăn",
      dataIndex: "productName",
      width: 100,
      render: (name: string) => (
        <div className="truncate text-sm text-gray-700">{name}</div>
      ),
    },

    {
      title: "Danh Mục",
      dataIndex: "category",
      align: "center",
      width: 80,
    },
    {
      title: "Giá",
      dataIndex: "price",
      align: "left",
      width: 100,
      render: (price: number) => `${price.toFixed(2)} VNĐ`,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      align: "center",
      width: 100,
      render: (status: boolean) => (
        <span
          className={`px-3 py-1 rounded-full text-white font-semibold ${
            status ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status ? "Còn hàng" : "Hết hàng"}
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
                    "Bạn chắc chắn muốn tắt trạng thái hoạt động của món " +
                    record.productName +
                    " ?",
                  onSubmit: () => {
                    if (record.key) {
                      onOk(record.key as string);
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
