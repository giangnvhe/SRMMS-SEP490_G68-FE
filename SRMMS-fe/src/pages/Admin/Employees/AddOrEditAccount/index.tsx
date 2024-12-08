import { LoadingOutlined } from "@ant-design/icons";
import { Form, Spin } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import SelectComponent, { Option } from "~/components/SelectComponent";
import useNotification from "~/hooks/useNotification";
import {
  AccountData,
  addNewEmployee,
  getListAccount,
  NewEmployeeRequest,
  updateEmployee,
  UpdateEmployeeRequest,
} from "~/services/account";

const initialFormValues = {
  fullName: "",
  email: "",
  empDob: "",
  phone: "",
  roleId: 2,
};

interface IProps {
  onCancel: () => void;
  accountData: AccountData | undefined;
  refetch: () => void;
  isLoading: boolean;
  role: Option[];
}

const DEFAULT_PASSWORD = "giang123";

interface MutationUpdateCategory {
  id: string | number | undefined;
  data: UpdateEmployeeRequest;
}

const AddOrEditAccount = ({
  isLoading,
  role,
  refetch,
  accountData,
  onCancel,
}: IProps) => {
  const [form] = Form.useForm();
  const { successMessage, errorMessage } = useNotification();
  const [formValues, setFormValues] = useState(initialFormValues);
  const isEditAccount = useMemo(() => !!accountData, [accountData]);

  const getAllEmployees = useQuery("getAllEmployees", () =>
    getListAccount(form.getFieldsValue(true))
  );

  const validateEmailFormat = (emailInput: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  };

  const checkExistEmail = async (_: any, value: string) => {
    if (!value) {
      return Promise.resolve();
    }

    if (!validateEmailFormat(value)) {
      return Promise.reject(new Error("Email không đúng định dạng"));
    }

    const emailList = getAllEmployees.data?.data?.accounts.map(
      (employee) => employee.email
    );
    const existEmail = emailList?.find((email) => email === value);

    if (existEmail) {
      return Promise.reject(new Error("Email đã tồn tại"));
    }

    return Promise.resolve();
  };

  const handleUpdateEmployee = useMutation(
    ({ id, data }: MutationUpdateCategory) => updateEmployee(Number(id), data),
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
            (error as AxiosError).message ||
            "Đã có lỗi xảy ra, chỉnh sửa không thành công!!",
        });
      },
    }
  );

  const handleCreateEmployee = useMutation(
    ({ data }: { data: NewEmployeeRequest }) => addNewEmployee(data),
    {
      onSuccess: (success: AxiosResponse<{ message: string }>) => {
        successMessage({
          description: success.data.message || "Tạo mới thành công",
        });
        form.resetFields();
        setFormValues(initialFormValues);
        onCancel();
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

  const handleOnchangePhone = (e: any) => {
    const value = e.target.value;

    let numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length > 0 && !numericValue.startsWith("0")) {
      numericValue = "0" + numericValue.slice(0, 9);
    } else {
      numericValue = numericValue.slice(0, 10);
    }

    form.setFieldsValue({ phone: numericValue });
  };

  useEffect(() => {
    isEditAccount
      ? form.setFieldsValue({
          fullName: accountData?.fullName,
          email: accountData?.email,
          phone: accountData?.phone,
          roleId: accountData?.roleId,
          status: accountData?.status,
        })
      : form.resetFields();
  }, [accountData]);

  const onSubmitForm = () => {
    form
      .validateFields()
      .then((formData) => {
        if (isEditAccount) {
          handleUpdateEmployee.mutate({
            id: accountData?.accountId,
            data: formData,
          });
        } else {
          formData.password = DEFAULT_PASSWORD;
          handleCreateEmployee.mutate({ data: formData });
        }
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  const isLoadings = useMemo(
    () => handleUpdateEmployee.isLoading || handleCreateEmployee.isLoading,
    [handleCreateEmployee.isLoading, handleUpdateEmployee.isLoading]
  );

  return (
    <Spin spinning={isLoadings} indicator={<LoadingOutlined spin />}>
      <div className="mt-5">
        <Form
          form={form}
          layout="vertical"
          className="bg-white p-6 rounded-lg shadow-lg space-y-6"
          onFinish={onSubmitForm}
          initialValues={formValues}
        >
          <div>
            <InputComponent
              name="fullName"
              label="Full Name"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Không được để trống full name",
                },
              ]}
              placeholder="Nhập tên của bạn"
            />
            <InputComponent
              name="phone"
              label="Phone Number"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống",
                },
                {
                  pattern: /^0\d{9}$/,
                  message:
                    "Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số",
                },
              ]}
              maxLength={11}
              onChange={handleOnchangePhone}
              placeholder="Nhấp số điện thoại"
            />
            {isEditAccount ? (
              <InputComponent
                name="email"
                label="Email"
                form={form}
                rules={[
                  {
                    required: true,
                    message: "Email không được để trống",
                  },
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không đúng định dạng",
                  },
                ]}
                placeholder="Nhập email"
              />
            ) : (
              <InputComponent
                name="email"
                label="Email"
                form={form}
                rules={[
                  {
                    required: true,
                    message: "Email không được để trống",
                  },
                  { validator: checkExistEmail },
                ]}
                placeholder="Nhập email"
              />
            )}

            <SelectComponent
              name="roleId"
              label="Role"
              options={role || []}
              loading={isLoading}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <ButtonComponent htmlType="submit" className="px-5 py-2 rounded-md">
              {isEditAccount ? "Chỉnh sửa" : "Tạo mới"}
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

export default AddOrEditAccount;
