import { Input, Spin, Typography } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/authProvider";
import {
  HEIGHT_CONTENT_CONTAINER,
  TABLE_STATUS,
} from "~/pages/Admin/Tables/components/const";
import { getTables, TableData } from "~/services/table";
import FooterTableOrder from "./components/FooterTableOrder";
import ListTableOrder from "./components/ListTableOrder";
import { permissionObject } from "~/common/const/permission";
import ButtonComponent from "~/components/ButtonComponent";

const { Search } = Input;
const { Title } = Typography;

const OrderTable = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

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

  const filteredTables = Array.isArray(tableData)
    ? tableData.filter(
        (table) =>
          table.tableName.toLowerCase().includes(searchTerm) &&
          table.statusName === TABLE_STATUS.IN_USE
      )
    : [];

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
          <div className="flex gap-2 justify-center items-center">
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
            {user?.roleName === permissionObject.ADMIN && (
              <ButtonComponent
                btnType="back"
                onClick={() => navigate("/admin/tables")}
              >
                Back
              </ButtonComponent>
            )}
          </div>
        </div>
      </div>
      <div
        className="p-4 bg-white shadow-md rounded-lg overflow-y-auto"
        style={{ height: HEIGHT_CONTENT_CONTAINER }}
      >
        <ListTableOrder
          table={filteredTables}
          onSelect={handleTableSelection}
        />
      </div>
      <FooterTableOrder
        selectedTable={selectedTable}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default OrderTable;
