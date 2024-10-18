import { Form } from "antd";
import TableEmployee from "./TableEmpolyee";
import { EmployeesData, getListEmployees } from "~/services/employee";
import { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import useNotification from "~/hooks/useNotification";
import ButtonComponent from "~/components/ButtonComponent";
import { useNavigate } from "react-router-dom";

export interface FormFields {
  name: string;
  description: string;
  pagination: { pageNumber: number; pageSize: number };
  pageNumber: number;
  pageSize: number;
}

const ListEmployee = () => {
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<EmployeesData[]>([]);
  const { errorMessage } = useNotification();
  const navigate = useNavigate();

  const getAllEmployees = useQuery("getAllEmployees", () =>
    getListEmployees(form.getFieldsValue(true))
  );

  useEffect(() => {
    if (getAllEmployees.isError) {
      errorMessage({
        description:
          (getAllEmployees.error as AxiosError)?.message ||
          "Đã có lỗi xảy ra!!!",
      });
    }
    if (getAllEmployees.data) {
      setDataTable(
        getAllEmployees.data.data?.map((d) => ({ ...d, key: d.empId }))
      );
    }
  }, [getAllEmployees.data, getAllEmployees.isError, getAllEmployees.error]);

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
      <div className="mt-5 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TableEmployee
            dataTable={dataTable}
            refetch={getAllEmployees.refetch}
            loading={getAllEmployees.isLoading || getAllEmployees.isFetching}
            form={form}
          />
        </div>
      </div>
    </div>
  );
};

export default ListEmployee;
