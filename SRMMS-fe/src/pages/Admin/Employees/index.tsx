import { PlusCircleOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "~/components/ButtonComponent";
import useNotification from "~/hooks/useNotification";
import { AccountData, getListAccount } from "~/services/employee";
import TableEmployee, { FormFields } from "./TableAccount";



const ListEmployee = () => {
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<AccountData[]>([]);
  const { errorMessage } = useNotification();
  const navigate = useNavigate();

  const getAllAccount = useQuery("getAllEmployees", () =>
    getListAccount(form.getFieldsValue(true))
  );

  useEffect(() => {
    if (getAllAccount.isError) {
      errorMessage({
        description:
          (getAllAccount.error as AxiosError)?.message || "Đã có lỗi xảy ra!!!",
      });
    }
    if (getAllAccount.data) {
      setDataTable(
        getAllAccount.data.data?.map((d) => ({ ...d, key: d.accountId }))
      );
    }
  }, [getAllAccount.data, getAllAccount.isError, getAllAccount.error]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-gray-800">
          Management Employee
        </h1>
        <ButtonComponent
          icon={<PlusCircleOutlined />}
          onClick={() => navigate("/admin/add-employee")}
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2"
        >
          Create Employee
        </ButtonComponent>
      </div>
      <div className="mt-10 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TableEmployee
            dataTable={dataTable}
            refetch={getAllAccount.refetch}
            loading={getAllAccount.isLoading || getAllAccount.isFetching}
            form={form}
          />
        </div>
      </div>
    </div>
  );
};

export default ListEmployee;
