import { Form, Modal } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useNotification from "~/hooks/useNotification";
import {
  BookingData,
  ChangeStatusBooking,
  FormFields,
  getListBooking,
} from "~/services/booking";
import BookingTable from "./components/BookingTable";
import ApprovalModal from "./components/ApprovalModal";
import UpdateBooking from "./components/EditBooking";
import { HubConnectionBuilder } from "@microsoft/signalr";

const BookingList = () => {
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<BookingData[]>([]);
  const { errorMessage, successMessage } = useNotification();
  const [selectedBooking, setSelectedBooking] = useState<
    BookingData | undefined
  >(undefined);
  const [openModal, setOpenModal] = useState(false);

  const getListBookings = useQuery("getListBooking", () =>
    getListBooking(form.getFieldsValue(true))
  );

  const onSelected = (id: BookingData | undefined) => {
    setSelectedBooking(id);
    setOpenModal(true);
  };

  const onCancel = () => {
    setSelectedBooking(undefined);
    setOpenModal(false);
  };

  const onReject = async (id: number) => {
    try {
      await ChangeStatusBooking(id, { statusId: 3 });
      successMessage({
        title: "Thành công",
        description: "Đã từ chối đặt bàn thành công.",
      });
      getListBookings.refetch();
    } catch (error) {
      errorMessage({
        description:
          (error as AxiosError)?.message || "Từ chối đặt bàn thất bại!",
      });
    }
  };

  useEffect(() => {
    if (getListBookings.isError) {
      errorMessage({
        description:
          (getListBookings.error as AxiosError)?.message ||
          "Đã có lỗi xảy ra!!!",
      });
    }
    if (getListBookings.data) {
      setDataTable(
        getListBookings.data.data?.bookings.map((d, i) => ({
          ...d,
          key: d.bookingId,
          index:
            (getListBookings.data.data.pageNumber - 1) *
              getListBookings.data.data.pageSize +
            i +
            1,
        }))
      );

      form.setFieldValue("pageNumber", getListBookings.data.data.pageNumber);
      form.setFieldValue("pageSize", getListBookings.data.data.pageSize);
      form.setFieldValue(
        "totalBookings",
        getListBookings.data.data.totalBookings
      );
    }
  }, [getListBookings.data, getListBookings.isError, getListBookings.error]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-gray-800">
          Quản lý Booking
        </h1>
      </div>
      <div className="mt-5 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <BookingTable
            setSelectedBooking={setSelectedBooking}
            dataTable={dataTable}
            refetch={getListBookings.refetch}
            loading={getListBookings.isLoading || getListBookings.isFetching}
            form={form}
            onReject={onReject}
            onSelected={onSelected}
          />
          <ApprovalModal
            visible={!!selectedBooking}
            booking={selectedBooking}
            onClose={() => setSelectedBooking(undefined)}
            onApprove={() => {
              getListBookings.refetch();
              setSelectedBooking(undefined);
            }}
          />
        </div>
      </div>
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
            {selectedBooking === undefined
              ? "✨ Thêm Món Ăn Mới"
              : "🛠️ Chỉnh Sửa"}
          </span>
        }
        open={openModal}
      >
        <UpdateBooking
          refetch={getListBookings.refetch}
          onCancel={onCancel}
          bookingData={selectedBooking}
        />
      </Modal>
    </div>
  );
};

export default BookingList;
