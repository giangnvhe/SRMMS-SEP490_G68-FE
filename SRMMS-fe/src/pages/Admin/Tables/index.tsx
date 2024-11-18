import { Modal, Spin } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { getTables, TableData } from "~/services/table";
import {
  HEIGHT_CONTENT_CONTAINER,
  NOTIFICATION_TABLE,
  TABLE_STATUS,
} from "./components/const";
import FooterTable from "./components/FooterTable";
import ListTable from "./components/ListTable";
import StatusButtonGroup from "./components/StatusButtonGroup";

const TablesManagement = () => {

  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
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
        <Spin size="large" tip="Loading..." />
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
      if (chosenTable.statusName === TABLE_STATUS.AVAILABLE) {
        setSelectedTable(chosenTable);
      } else {
        let message = "";

        switch (chosenTable.statusName) {
          case TABLE_STATUS.BOOKED:
            message = NOTIFICATION_TABLE.BOOKED;
            Modal.warning({
              title: "Cảnh Báo",
              content: message,
              style: { top: 20 },
              okText: "Got it",
            });
            break;

          case TABLE_STATUS.IN_USE:
            message = NOTIFICATION_TABLE.IN_USE;
            Modal.warning({
              title: "Cảnh Báo",
              content: message,
              style: { top: 20 },
              okText: "Got it",
            });
            break;

          case TABLE_STATUS.UNDER_REPAIR:
            message = NOTIFICATION_TABLE.UNDER_REPAIR;
            Modal.error({
              title: "Cảnh Báo",
              content: message,
              style: { top: 20 },
              okText: "Got it",
            });
            break;

          default:
            Modal.info({
              title: "Table Status",
              content: "Status not recognized.",
              style: { top: 20 },
              okText: "Got it",
            });
        }
      }
    }
  };

  // const handleStatusChange = (status: string) => {
  //   setSelectedStatus(status);
  // };

  const filteredTableData = tableData?.filter((table) => {
    if (selectedStatus === "ALL") return true;
    return table.statusName === selectedStatus;
  });

  return (
    <div className=" bg-gray-50 p-6">
      <div className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Quản Lý Bàn
      </div>
      <StatusButtonGroup
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        refetch = {refetch}
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
      <FooterTable selectedTable={selectedTable} />
    </div>
  );
};

export default TablesManagement;
