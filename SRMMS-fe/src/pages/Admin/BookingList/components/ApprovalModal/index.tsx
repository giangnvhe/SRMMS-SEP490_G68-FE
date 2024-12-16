import React, { useState, useEffect } from "react";
import { Modal, Form, Select, message } from "antd";
import { SetBookingForTable, BookingData } from "~/services/booking";
import { getTables } from "~/services/table";

interface ApprovalModalProps {
  visible: boolean;
  onClose: () => void;
  booking?: BookingData;
  onApprove: () => void;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({
  visible,
  onClose,
  booking,
  onApprove,
}) => {
  const [form] = Form.useForm();
  const [tables, setTables] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch available tables when modal opens
  useEffect(() => {
    if (visible) {
      fetchAvailableTables();
    }
  }, [visible]);

  const fetchAvailableTables = async () => {
    try {
      const response = await getTables();
      const availableTables = response.data
        .filter((table) => table.statusId === 1)
        .map((table) => ({
          id: table.tableId,
          name: `${table.tableName} (${table.tableOfPeople} chỗ ${
            table.shift === "Lunch" ? "Ca trưa" : "Ca tối"
          })`,
        }));

      setTables(availableTables);
    } catch (error) {
      message.error("Lỗi");
    }
  };

  const handleApprove = async () => {
    try {
      const tableIds = form.getFieldValue("tableId");

      if (!tableIds || tableIds.length === 0) {
        message.error("Vui lòng chọn ít nhất 1 bàn");
        return;
      }

      setLoading(true);
      await Promise.all(
        tableIds.map((tableId: number) =>
          SetBookingForTable({
            bookingId: booking!.bookingId,
            tableId,
          })
        )
      );

      message.success("Đặt bàn đã được phê duyệt thành công");
      onApprove();
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Phê duyệt thất bại, vui lòng thử lại";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Phê duyệt đặt bàn"
      visible={visible}
      onOk={handleApprove}
      onCancel={onClose}
      confirmLoading={loading}
    >
      {booking && (
        <div className="mb-6 p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Booking Chi tiết
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <p className="text-gray-600 font-medium">Tên Khách hàng:</p>
            <p className="text-gray-800">{booking.nameBooking}</p>

            <p className="text-gray-600 font-medium">Số điện thoại:</p>
            <p className="text-gray-800">{booking.phoneBooking}</p>

            <p className="text-gray-600 font-medium">Ngày đặt:</p>
            <p className="text-gray-800">
              {new Date(booking.dayBooking).toISOString().split("T")[0]}
            </p>

            <p className="text-gray-600 font-medium">Thời gian:</p>
            <p className="text-gray-800">{booking.hourBooking}</p>

            <p className="text-gray-600 font-medium">Số lượng:</p>
            <p className="text-gray-800">{booking.numberOfPeople} Người</p>
          </div>
        </div>
      )}
      <Form form={form} layout="vertical">
        <Form.Item
          name="tableId"
          label="Chọn bàn"
          rules={[{ required: true, message: "Vui lòng chọn 1 bàn" }]}
        >
          <Select placeholder="Chọn 1 bàn" mode="multiple">
            {tables.map((table) => (
              <Select.Option key={table.id} value={table.id}>
                {table.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApprovalModal;
