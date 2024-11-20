import { LoadingOutlined } from "@ant-design/icons";
import { Form, Spin } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import useNotification from "~/hooks/useNotification";
import {
  CreateTable,
  RequestTable,
  TableData,
  updateTable,
} from "~/services/table";

interface IProps {
  onCancel: () => void;
  refetch: () => void;
  tableData?: TableData;
}

const initialFormValues = {
  table_Name: "",
  tableOfPeople: 0,
};

interface MutationUpdateCategory {
  id: string | number | undefined;
  data: RequestTable;
}

const AddTable = ({ onCancel, refetch, tableData }: IProps) => {
  const [form] = Form.useForm();
  const { errorMessage, successMessage } = useNotification();
  const [formValues, setFormValues] = useState(initialFormValues);
  const isEditTable = useMemo(() => !!tableData, [tableData]);

  const handleCreateTable = useMutation(
    ({ data }: { data: RequestTable }) => CreateTable(data),
    {
      onSuccess: (success: AxiosResponse<{ message: string }>) => {
        successMessage({
          description: success?.data?.message || "Tạo mới thành công",
        });
        setFormValues(initialFormValues);
        form.resetFields();
        refetch();
      },
      onError: (error: AxiosError<{ message: string }>) => {
        errorMessage({
          description:
            error.response?.data.message ||
            "Đã có lỗi xảy ra, tạo mới không thành công!!",
        });
      },
    }
  );

  const handleUpdateTable = useMutation(
    ({ id, data }: MutationUpdateCategory) => updateTable(Number(id), data),
    {
      onSuccess: (success: AxiosResponse<{ message: string }>) => {
        successMessage({
          description: success?.data?.message || "Chỉnh sửa thành công",
        });
        form.resetFields();
        onCancel();
        refetch();
      },
      onError: (error: AxiosError<{ message: string }>) => {
        errorMessage({
          description:
            error.response?.data.message ||
            "Đã có lỗi xảy ra, chỉnh sửa không thành công!!",
        });
      },
    }
  );
  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [formValues, form]);

  const handleSubmit = (values: RequestTable) => {
    const formData: RequestTable = {
      table_Name: values.table_Name,
      statusId: values.statusId,
      tableOfPeople: values.tableOfPeople,
    };
    isEditTable
      ? handleUpdateTable.mutate({ id: tableData?.tableId, data: formData })
      : handleCreateTable.mutate({ data: formData });
  };

  // const handleTableOfPeopleChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = e.target.value;
  //   if (/^[0-9]*$/.test(value)) {
  //     setFormValues((prev) => ({ ...prev, tableOfPeople: value }));
  //     form.setFieldsValue({ tableOfPeople: value });
  //   }
  // };

  const isLoading = useMemo(
    () => handleCreateTable.isLoading || handleUpdateTable.isLoading,
    [handleCreateTable.isLoading, handleUpdateTable.isLoading]
  );

  useEffect(() => {
    console.log("tableData:", tableData);
    isEditTable
      ? form.setFieldsValue({
          table_Name: tableData?.tableName,
          statusId: tableData?.statusId,
          tableOfPeople: tableData?.tableOfPeople,
        })
      : form.resetFields();
  }, [tableData]);
  console.log("🚀 ~ useEffect ~ tableData:", tableData?.statusId);

  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
      <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          initialValues={formValues}
        >
          <InputComponent
            name="table_Name"
            label="Tên Bàn"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên bàn",
              },
            ]}
            placeholder="Nhập tên bàn"
          />
          <InputComponent
            name="tableOfPeople"
            label="Số lượng người của bàn"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng người của bàn",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Chỉ được nhập số từ 0-9",
              },
            ]}
            placeholder="số lượng người của bàn"
            //onChange={handleTableOfPeopleChange}
          />
          <div className="mt-6 flex justify-end space-x-3">
            <ButtonComponent className="px-5 py-2 rounded-md" htmlType="submit">
              {tableData ? "Lưu" : "Tạo Mới"}
            </ButtonComponent>
            <ButtonComponent
              btnType="go-back"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Hủy
            </ButtonComponent>
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default AddTable;
