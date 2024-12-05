import { Form } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  FormFields,
  getListOrderKitchen,
  OrderKitchenData,
} from "~/services/kitchen";
import TableKitchen from "./components/KitchenTable";
import { socket } from "./components/KitchenTable/socket";

const Kitchen = () => {
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<OrderKitchenData[]>([]);

  const getListOrders = useQuery("getListOrders", () =>
    getListOrderKitchen(form.getFieldsValue(true))
  );

  useEffect(() => {
    if (getListOrders.data) {
      updateDataTable(getListOrders.data);
    }
  }, [getListOrders.data]);

  useEffect(() => {
    if (getListOrders.data) {
      updateDataTable(getListOrders.data);
    }
  }, [getListOrders.data]);

  const updateDataTable = (response: any) => {
    const processedData = response.data?.orders.map((d: any, i: any) => ({
      ...d,
      key: d.orderId,
      index: (response.data.pageNumber - 1) * response.data.pageSize + i + 1,
    }));

    setDataTable(processedData);
    form.setFieldsValue({
      pageNumber: response.data.pageNumber,
      pageSize: response.data.pageSize,
      totalOrders: response.data.totalOrders,
    });
  };

  return (
    <div>
      <div className="mt-5 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TableKitchen
            dataTable={dataTable}
            refetch={getListOrders.refetch}
            loading={getListOrders.isLoading || getListOrders.isFetching}
            form={form}
          />
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
