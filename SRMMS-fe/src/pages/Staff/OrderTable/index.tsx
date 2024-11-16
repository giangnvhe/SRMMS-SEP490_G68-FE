import { Card, Col, Row, Spin, Input, Typography, Button, Space } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  getStatusColor,
  HEIGHT_CONTENT_CONTAINER,
} from "~/pages/Admin/Tables/components/const";
import LargeTable from "~/pages/Admin/Tables/components/LargeTable";
import MediumTable from "~/pages/Admin/Tables/components/MediumTable";
import SmallTable from "~/pages/Admin/Tables/components/SmallTable";
import { getTables, TableData } from "~/services/table";
import FooterTableOrder from "./components/FooterTableOrder";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Title } = Typography;

const OrderTable = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: tableData,
    isLoading,
    isError,
    error,
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
      setSelectedTable(chosenTable);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredTables = (tableData || []).filter((table) =>
    table.tableName.toLowerCase().includes(searchTerm)
  );

  const handleCheckout = (tableId: number) => {
    navigate(`/payment/${tableId}`);
  };

  return (
    <div>
      <div className="p-4 bg-white shadow-md rounded-lg mb-8">
        {/* Tiêu đề và ô tìm kiếm */}
        <div className="flex justify-between items-center mb-4">
          <Title level={2} className="text-center">
            Thanh toán bàn
          </Title>
          <Search
            placeholder="Tìm bàn theo tên..."
            allowClear
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: "250px", // Đặt chiều rộng ô tìm kiếm
              borderRadius: "8px",
              padding: "8px",
            }}
            className="bg-gray-100 shadow-inner"
          />
        </div>
      </div>
      <div
        className="p-4 bg-white shadow-md rounded-lg overflow-y-auto"
        style={{ height: HEIGHT_CONTENT_CONTAINER }}
      >
        <Row gutter={[16, 16]}>
          {filteredTables.length > 0 ? (
            filteredTables.map((table) => (
              <Col xs={24} sm={12} md={8} lg={6} key={table.tableId}>
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
      <FooterTableOrder
        selectedTable={selectedTable}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default OrderTable;
