import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Col, Modal, Row, Tooltip, Typography } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import formatter from "~/common/utils/formatter";
import { getTables, TableData } from "~/services/table";
import {
  CONSTANT_TABLE,
  getStatusColor,
  HEIGHT_CONTENT_CONTAINER,
  NOTIFICATION_TABLE,
  TABLE_STATUS,
} from "./components/const";
import LargeTable from "./components/LargeTable";
import MediumTable from "./components/MediumTable";
import SmallTable from "./components/SmallTable";

const TablesManagement = () => {
  const navigate = useNavigate();
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
              title: "Table Status",
              content: message,
              style: { top: 20 },
              okText: "Got it",
            });
            break;

          case TABLE_STATUS.IN_USE:
            message = NOTIFICATION_TABLE.IN_USE;
            Modal.warning({
              title: "Table Status",
              content: message,
              style: { top: 20 },
              okText: "Got it",
            });
            break;

          case TABLE_STATUS.UNDER_REPAIR:
            message = NOTIFICATION_TABLE.UNDER_REPAIR;
            Modal.error({
              title: "Table Status",
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

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const filteredTableData = tableData?.filter((table) => {
    if (selectedStatus === "ALL") return true;
    return table.statusName === selectedStatus;
  });

  return (
    <div className=" bg-gray-50 p-6">
      <div className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Quản Lý Bàn
      </div>
      <div className="mb-4 flex flex-wrap space-x-2 space-y-2 md:flex-nowrap md:space-y-0">
        {["ALL", "Trống", "Đang sử dụng", "Đã đặt", "Đang sửa chữa"].map(
          (status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`w-full md:w-auto px-3 py-1 md:px-4 md:py-2 text-sm md:text-base font-semibold rounded-lg shadow-sm transition duration-200 ease-in-out
              ${
                selectedStatus === status
                  ? "bg-[#08979C] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-100 hover:text-blue-700" // Default state styles
              }
            `}
            >
              {status}
            </button>
          )
        )}
      </div>
      <div
        className="p-4 bg-white shadow-md rounded-lg overflow-y-auto"
        style={{ height: HEIGHT_CONTENT_CONTAINER }}
      >
        <Row gutter={[16, 16]}>
          {filteredTableData && filteredTableData.length > 0 ? (
            filteredTableData.map((table) => (
              <Col xs={24} sm={12} md={8} key={table.tableId}>
                <Card
                  onClick={() => handleTableSelection(table.tableName)}
                  className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200 ease-in-out cursor-pointer relative h-[200px]"
                >
                  <div>
                    {table.tableOfPeople != null &&
                      table.tableOfPeople <= 2 && <SmallTable table={table} />}
                    {table.tableOfPeople != null &&
                      table.tableOfPeople > 2 &&
                      table.tableOfPeople <= 4 && <MediumTable table={table} />}
                    {table.tableOfPeople != null &&
                      table.tableOfPeople > 4 &&
                      table.tableOfPeople <= 6 && <LargeTable table={table} />}
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-2"
                    style={{
                      backgroundColor: getStatusColor(table.statusName),
                    }}
                  />
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center w-full text-gray-500 text-lg">
              No tables available
            </div>
          )}
        </Row>
      </div>
      <div
        style={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Tooltip title={formatter(TABLE_STATUS.IN_USE)}>
            <InfoCircleOutlined style={{ color: "red", fontSize: "18px" }} />
          </Tooltip>
          <Tooltip title={formatter(TABLE_STATUS.UNDER_REPAIR)}>
            <InfoCircleOutlined style={{ color: "purple", fontSize: "18px" }} />
          </Tooltip>
          <Tooltip title={formatter(TABLE_STATUS.AVAILABLE)}>
            <InfoCircleOutlined style={{ color: "green", fontSize: "18px" }} />
          </Tooltip>
          <Tooltip title={formatter(TABLE_STATUS.BOOKED)}>
            <InfoCircleOutlined style={{ color: "orange", fontSize: "18px" }} />
          </Tooltip>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ gap: "16px", display: "flex", alignItems: "center" }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {CONSTANT_TABLE.TABLE} {selectedTable?.tableName || "N/A"}
            </Typography.Title>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablesManagement;
