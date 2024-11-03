import { Form } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import useNotification from "~/hooks/useNotification";
import { CreateTable, RequestTable } from "~/services/table";

interface IProps {
  onCancel: () => void;
  refetch: () => void;
}

const initialFormValues = {
  table_Name: "",
};
const AddTable = ({ onCancel, refetch }: IProps) => {
  const [form] = Form.useForm();
  const { errorMessage, successMessage } = useNotification();
  const [formValues, setFormValues] = useState(initialFormValues);

  const { mutate: createTableMutation, isLoading } = useMutation(
    ({ data }: { data: RequestTable }) => CreateTable(data),
    {
      onSuccess: (success: AxiosResponse<{ message: string }>) => {
        successMessage({
          description: success.data.message || "Tạo mới thành công",
        });
        form.resetFields();
        setFormValues(initialFormValues);
        refetch();
      },
      onError: (error: AxiosError<{ message: string }>) => {
        errorMessage({
          description:
            error.response?.data.message ||
            "Đã có lỗi xảy ra, tạo mới thất bại!",
        });
      },
    }
  );

  const handleSubmit = (values: RequestTable) => {
    createTableMutation({
      data: {
        ...values,
        statusId: 1,
      },
    });
  };

  return (
    <div>
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
        <div className="mt-6 flex justify-end space-x-3">
          <ButtonComponent
            className="px-5 py-2 rounded-md"
            htmlType="submit"
            loading={isLoading}
          >
            Tạo mới
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
  );
};

export default AddTable;
