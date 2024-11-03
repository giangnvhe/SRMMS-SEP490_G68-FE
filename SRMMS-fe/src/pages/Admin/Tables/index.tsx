import { PlusCircleOutlined } from "@ant-design/icons";
import { Card, Modal } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import { getTables, TableData } from "~/services/table";
import AddTable from "./AddTable";

const TablesManagement: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const onCancel = () => {
    setOpenModal(false);
  };

 const {
    data: tableData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<TableData[]>(["tables"], async () => { 
    const response = await getTables();
    return response.data;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading tables:{" "}
        {(error as Error)?.message || "Unknown error occurred"}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Sơ đồ bàn
            </h1>
            <p className="text-gray-500 mt-1">
              Quản lý và theo dõi trạng thái các bàn
            </p>
          </div>
          <ButtonComponent
            icon={<PlusCircleOutlined />}
            onClick={() => setOpenModal(true)}
            className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2"
          >
            Thêm Bàn Mới
          </ButtonComponent>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tableData?.map((table) => (
            <Card
              key={table.tableId}
              className={`cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl overflow-hidden`}
              style={{
                backgroundColor:
                  table.statusName === "Trống"
                    ? "#dcfce7"
                    : table.statusName === "Đang sử dụng"
                    ? "#f3f4f6"
                    : table.statusName === "Đã đặt"
                    ? "#ffedd5"
                    : table.statusName === "Đang sửa chữa"
                    ? "#ef4444"
                    : "white",
              }}
              styles={{
                body: { padding: "1.5rem" },
              }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {table.tableName}
                </h3>
                {/* Trạng thái */}
                <div className="flex justify-center">
                  <span
                    className={`px-6 py-2 rounded-full text-sm font-semibold shadow-sm ${
                      table.statusName === "Trống"
                        ? "bg-green-100 text-green-700 ring-1 ring-green-200"
                        : table.statusName === "Đang sử dụng"
                        ? "bg-gray-100 text-gray-700 ring-1 ring-gray-200"
                        : table.statusName === "Đã đặt"
                        ? "bg-orange-100 text-orange-700 ring-1 ring-orange-200"
                        : table.statusName === "Đang sửa chữa"
                        ? "bg-red-100 text-red-700 ring-1 ring-red-200"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {table.statusName}
                  </span>
                </div>
                <div className="mt-4 py-2 px-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">
                      {table.tableOfPeople || 0}
                    </span>{" "}
                    chỗ ngồi
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Modal
        footer={null}
        width={900}
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
            Thêm Bàn Mới
          </span>
        }
        open={openModal}
      >
        <AddTable onCancel={onCancel} refetch={refetch} />
      </Modal>
    </div>
  );
};

export default TablesManagement;
