import { Card, Col, QRCode, Row, Select, Spin } from "antd"; // Import from Ant Design
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "~/components/ButtonComponent";
import { getTables, TableData } from "~/services/table";
import { HEIGHT_CONTENT_CONTAINER } from "../const";
import { useState } from "react";

const QRCodeScreen = () => {
  const navigate = useNavigate();
  const baseUrl = `http://srmms-sep-490-g68-fe.vercel.app/menu-client`;

  const {
    data: tableData = [],
    isLoading,
    isError,
    error,
  } = useQuery<TableData[]>(["tables"], async () => {
    const response = await getTables();
    return response.data;
  });

  const [selectedShift, setSelectedShift] = useState<string>("Lunch");

  const handleShiftChange = (value: string) => {
    setSelectedShift(value);
  };

  const filteredTableData = tableData.filter((table) => {
    return table.shift === selectedShift; // Assuming table has a "shift" field
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 text-center text-red-500">
          Error loading tables:{" "}
          {(error as Error)?.message || "Unknown error occurred"}
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="p-2 bg-white shadow-md">
        <h2 className="text-3xl font-bold text-center">Danh Sách Mã QR Bàn</h2>
        <div className="flex justify-between mt-4">
          <Select
            value={selectedShift}
            onChange={handleShiftChange}
            style={{ width: 120 }}
          >
            <Select.Option value="Lunch">Trưa</Select.Option>
            <Select.Option value="Dinner">Tối</Select.Option>
          </Select>
          <ButtonComponent btnType="back" onClick={handleBack}>
            Quay lại
          </ButtonComponent>
        </div>
      </header>

      {/* Content */}
      <div className="p-5">
        <div
          className="p-6 mt-3 bg-white shadow-md rounded-lg overflow-y-auto flex-grow"
          style={{ height: HEIGHT_CONTENT_CONTAINER }}
        >
          <Row gutter={[24, 24]}>
            {Array.isArray(filteredTableData) &&
            filteredTableData.length > 0 ? (
              filteredTableData.map((table) => {
                const qrValue = `${baseUrl}/${table.tableId}`;
                return (
                  <Col xs={24} sm={12} md={8} lg={6} key={table.tableId}>
                    <Card
                      hoverable
                      className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg"
                      style={{
                        backgroundColor: "#f9f9f9",
                        borderColor: "#ddd",
                      }}
                    >
                      <h3 className="text-lg font-semibold mb-4 text-center">
                        {table.tableName}
                      </h3>
                      <QRCode value={qrValue} size={128} />
                      <p className="mt-4 text-gray-500 text-sm text-center">
                        Quét mã để xem menu
                      </p>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <div className="text-center text-gray-500">
                No tables available for {selectedShift}
              </div>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScreen;
