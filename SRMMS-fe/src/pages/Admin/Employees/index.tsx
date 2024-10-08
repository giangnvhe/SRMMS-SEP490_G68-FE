import { Form } from "antd";
import TableEmployee from "./TableEmpolyee";
import { EmployeesData, getListEmployees } from "../../../services/employee";
import { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import useNotification from "../../../hooks/useNotification";
import ButtonComponent from "../../../components/ButtonComponent";
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
      setDataTable(getAllEmployees.data.data);
    }
  }, [getAllEmployees.data, getAllEmployees.isError, getAllEmployees.error]);

  return (
    <div>
      <div className="flex justify-between bg-white p-6">
        <div className="flex justify-center items-center font-bold text-2xl">
          List Employee
        </div>
        <ButtonComponent
          icon={<PlusCircleOutlined />}
          onClick={() => navigate("/admin/addEmployee")}
        >
          Create Employee
        </ButtonComponent>
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
