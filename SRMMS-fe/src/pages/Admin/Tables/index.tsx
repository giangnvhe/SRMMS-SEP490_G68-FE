import React, { useState } from "react";
import { Card, Badge, Modal, Form, Input, Button, Select } from "antd";

interface TableItem {
  id: number;
  name: string;
  status: "available" | "occupied" | "reserved";
  seats: number;
}

const TablesManagement: React.FC = () => {
  const [tables, setTables] = useState<TableItem[]>([
    { id: 1, name: "Bàn 1", status: "available", seats: 4 },
    { id: 2, name: "Bàn 2", status: "occupied", seats: 6 },
    { id: 3, name: "Bàn 3", status: "reserved", seats: 2 },
    { id: 4, name: "Bàn 4", status: "available", seats: 8 },
    { id: 5, name: "Bàn 5", status: "occupied", seats: 4 },
    { id: 6, name: "Bàn 6", status: "reserved", seats: 6 },
    { id: 7, name: "Bàn 7", status: "available", seats: 2 },
    { id: 8, name: "Bàn 8", status: "occupied", seats: 8 },
    { id: 9, name: "Bàn 9", status: "reserved", seats: 4 },
    { id: 10, name: "Bàn 10", status: "available", seats: 6 },
    { id: 11, name: "Bàn 11", status: "occupied", seats: 2 },
    { id: 12, name: "Bàn 12", status: "reserved", seats: 8 },
    { id: 13, name: "Bàn 13", status: "available", seats: 4 },
    { id: 14, name: "Bàn 14", status: "occupied", seats: 6 },
    { id: 15, name: "Bàn 15", status: "reserved", seats: 2 },
    { id: 16, name: "Bàn 16", status: "available", seats: 8 },
    { id: 17, name: "Bàn 17", status: "occupied", seats: 4 },
    { id: 18, name: "Bàn 18", status: "reserved", seats: 6 },
    { id: 19, name: "Bàn 19", status: "available", seats: 2 },
    { id: 20, name: "Bàn 20", status: "occupied", seats: 8 },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableItem | null>(null);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "success";
      case "occupied":
        return "error";
      case "reserved":
        return "warning";
      default:
        return "default";
    }
  };

  const handleTableClick = (table: TableItem) => {
    setSelectedTable(table);
    setIsModalVisible(true);
    form.setFieldsValue(table);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const updatedTables = tables.map((table) =>
        table.id === selectedTable?.id ? { ...table, ...values } : table
      );
      setTables(updatedTables);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Sơ đồ bàn</h1>
          <Button type="primary" size="large" className="bg-blue-500">
            Thêm bàn mới
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tables.map((table) => (
            <Card
              key={table.id}
              className="cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 rounded-xl overflow-hidden"
              onClick={() => handleTableClick(table)}
              bodyStyle={{ padding: "1.5rem" }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {table.name}
                </h3>
                <Badge
                  status={getStatusColor(table.status)}
                  text={
                    <span className="text-base">
                      {table.status === "available"
                        ? "Trống"
                        : table.status === "occupied"
                        ? "Đang sử dụng"
                        : "Đã đặt"}
                    </span>
                  }
                />
                <div className="mt-4 py-2 px-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">
                      {table.seats}
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
        title={<span className="text-xl">Thông tin bàn</span>}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        className="custom-modal"
        width={500}
        centered
        bodyStyle={{ padding: "2rem" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={<span className="text-base font-medium">Tên bàn</span>}
            rules={[{ required: true, message: "Vui lòng nhập tên bàn" }]}
          >
            <Input className="rounded-lg h-10" />
          </Form.Item>
          <Form.Item
            name="status"
            label={<span className="text-base font-medium">Trạng thái</span>}
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select className="rounded-lg h-10">
              <Select.Option value="available">Trống</Select.Option>
              <Select.Option value="occupied">Đang sử dụng</Select.Option>
              <Select.Option value="reserved">Đã đặt</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="seats"
            label={<span className="text-base font-medium">Số chỗ ngồi</span>}
            rules={[{ required: true, message: "Vui lòng nhập số chỗ ngồi" }]}
          >
            <Input type="number" className="rounded-lg h-10" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TablesManagement;
