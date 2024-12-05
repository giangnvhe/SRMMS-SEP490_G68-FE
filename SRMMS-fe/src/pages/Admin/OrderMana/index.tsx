import { useQuery } from "react-query";
import TableOrder from "./components/TableOrder";
import { getListOrder, OrderData } from "~/services/order";
import { FormFields } from "./components/conts";
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import useNotification from "~/hooks/useNotification";
import { AxiosError } from "axios";
import EditOrder from "./components/UpdateOrder";

const OrderManager = () => {
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<OrderData[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<OrderData | undefined>(
    undefined
  );
  const [openModal, setOpenModal] = useState(false);

  const { errorMessage } = useNotification();

  const getListOrders = useQuery("getListOrders", () =>
    getListOrder(form.getFieldsValue(true))
  );

  const onSelected = (id: OrderData | undefined) => {
    setSelectedAccount(id);
    setOpenModal(true);
  };

  const onCancel = () => {
    setSelectedAccount(undefined);
    setOpenModal(false);
  };

  useEffect(() => {
    if (getListOrders.isError) {
      errorMessage({
        description:
          (getListOrders.error as AxiosError)?.message || "Đã có lỗi xảy ra!!!",
      });
    }
    if (getListOrders.data) {
      setDataTable(
        getListOrders.data.data?.orders.map((d, i) => ({
          ...d,
          key: d.orderId,
          index:
            (getListOrders.data.data.pageNumber - 1) *
              getListOrders.data.data.pageSize +
            i +
            1,
        }))
      );

      form.setFieldValue("pageNumber", getListOrders.data.data.pageNumber);
      form.setFieldValue("pageSize", getListOrders.data.data.pageSize);
      form.setFieldValue("totalOrders", getListOrders.data.data.totalOrders);
    }
  }, [getListOrders.data, getListOrders.isError, getListOrders.error]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-gray-800">
          Danh Sách Đơn Hàng
        </h1>
      </div>
      <div className="mt-5 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TableOrder
            onSelected={onSelected}
            dataTable={dataTable}
            refetch={getListOrders.refetch}
            loading={getListOrders.isLoading || getListOrders.isFetching}
            form={form}
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
            {selectedAccount === undefined ? "✨ " : "🛠️ Chỉnh Sửa Order"}
          </span>
        }
        open={openModal}
      >
        <EditOrder
          refetch={getListOrders.refetch}
          onCancel={onCancel}
          orderData={selectedAccount}
        />
      </Modal>
    </div>
  );
};

export default OrderManager;
