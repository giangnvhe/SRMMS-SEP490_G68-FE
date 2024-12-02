import { Form } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useNotification from "~/hooks/useNotification";
import { BookingData, FormFields, getListBooking } from "~/services/booking";
import BookingTable from "./components/BookingTable";

const BookingList = () => {
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<BookingData[]>([]);
  const { errorMessage } = useNotification();
  const [selectedProduct, setSelectedProduct] = useState<
    BookingData | undefined
  >(undefined);

  const getListBookings = useQuery("getListBooking", () =>
    getListBooking(form.getFieldsValue(true))
  );

  const onSelected = (id: BookingData | undefined) => {
    setSelectedProduct(id);
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
            onSelected={onSelected}
            dataTable={dataTable}
            refetch={getListBookings.refetch}
            loading={getListBookings.isLoading || getListBookings.isFetching}
            form={form}
            //onOk={onOk}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingList;