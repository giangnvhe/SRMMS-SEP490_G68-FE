import { Form } from "antd";
import TableEmployee from "./TableEmpolyee";
import { EmployeesData, getListEmployees } from "../../../services/employee";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import useNotification from "../../../hooks/useNotification";
import ButtonComponent from "../../../components/ButtonComponent";

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
      // form.setFieldValue("pageNumber", getAllEmployees?.data?.pageNumber);
      // form.setFieldValue("pageSize", getAllEmployees?.data?.pageSize);
      setDataTable(getAllEmployees.data.data);
    }
  }, [getAllEmployees.data, getAllEmployees.isError, getAllEmployees.error]);

  return (
    <div>
      <div className="flex justify-between bg-white p-6">
        <div className="flex justify-center items-center font-bold text-2xl">
          List Employee
        </div>
        <ButtonComponent>Create Employee</ButtonComponent>
      </div>
      <div className="mt-5 p-9">
        <div className="bg-white p-5">
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
