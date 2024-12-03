import { Modal, Spin } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { getTables, TableData, TableResponse } from "~/services/table";
import { HEIGHT_CONTENT_CONTAINER } from "./components/const";
import FooterTable from "./components/FooterTable";
import ListTable from "./components/ListTable";
import StatusButtonGroup from "./components/StatusButtonGroup";
import AddTable from "./AddTable";

const TablesManagement = () => {
  const [selectedTable, setSelectedTable] = useState<TableData | undefined>(
    undefined
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");
  const [selectedShift, setSelectedShift] = useState<string>("Tất cả");
  const [openModal, setOpenModal] = useState(false);

  const onCancel = () => {
    setOpenModal(false);
  };

  const onSelected = (id: TableData | undefined) => {
    setSelectedTable(id);
    setOpenModal(true);
  };

  const {
    data: tableResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<TableResponse>(["tables"], async () => {
    return await getTables();
  });

  const tableData = tableResponse?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
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

  const handleTableSelection = (tableName: string) => {
    if (!tableData) return;
    const chosenTable = tableData.find(
      (table) => table.tableName === tableName
    );

    if (chosenTable) {
      if (chosenTable.statusName) {
        setSelectedTable(chosenTable);
      }
    }
  };

  const filteredTableData = tableData?.filter((table) => {
    const statusMatch =
      selectedStatus === "Tất cả" || table.statusName === selectedStatus;
    const shiftMatch =
      selectedShift === "Tất cả" || table.shift === selectedShift;
    return statusMatch && shiftMatch;
  });

  return (
    <div className=" bg-gray-50 p-6">
      <div className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Quản Lý Bàn
      </div>
      <StatusButtonGroup
        selectedStatus={selectedStatus}
        selectedShift={selectedShift}
        onStatusChange={setSelectedStatus}
        onShiftChange={setSelectedShift}
        refetch={refetch}
        setOpenModal={setOpenModal}
        setSelectedTable={setSelectedTable}
      />
      <div
        className="p-4 bg-white shadow-md rounded-lg overflow-y-auto"
        style={{ height: HEIGHT_CONTENT_CONTAINER }}
      >
        <ListTable
          tables={filteredTableData || []}
          onSelect={handleTableSelection}
        />
      </div>
      <FooterTable
        selectedTable={selectedTable}
        refetch={refetch}
        onSelected={onSelected}
      />
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
            {selectedTable === undefined ? "✨ Thêm Bàn Mới" : "🛠️ Chỉnh Sửa"}
          </span>
        }
        open={openModal}
      >
        <AddTable
          refetch={refetch}
          onCancel={onCancel}
          tableData={selectedTable}
        />
      </Modal>
    </div>
  );
};

export default TablesManagement;
