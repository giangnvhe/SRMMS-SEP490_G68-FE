import { Form } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import SelectComponent, { Option } from "~/components/SelectComponent";
import useNotification from "~/hooks/useNotification";
import {
  addNewEmployee,
  getListAccount,
  NewEmployeeRequest,
} from "~/services/employee";
import { getRoles } from "~/services/role";

const initialFormValues = {
  fullName: "",
  email: "",
  empDob: "",
  phone: "",
  roleId: "2",
};

const DEFAULT_PASSWORD = "giang123";

const AddEmployee = () => {
  const [form] = Form.useForm();
  const { successMessage, errorMessage } = useNotification();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [roles, setRoles] = useState<Option[] | []>([]);
  const navigate = useNavigate();
  const goBack = () => navigate("/admin/employees");

  const { isLoading, isError, error } = useQuery("role-admin", getRoles, {
    onSuccess: (result) => {
      setRoles(
        result.data
          .filter((value: any) => value.roleName !== "Admin")
          .map((value: any) => ({
            label: value.roleName,
            value: `${value.roleId}`,
          }))
      );
    },
  });

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

    const emailList = getAllEmployees.data?.data.map(
      (employee) => employee.email
    );
    const existEmail = emailList?.find((email) => email === value);

    if (existEmail) {
      return Promise.reject(new Error("Email đã tồn tại"));
    }

    return Promise.resolve();
  };

  const handleCreateEmployee = useMutation(
    ({ data }: { data: NewEmployeeRequest }) => addNewEmployee(data),
    {
      onSuccess: (success: AxiosResponse<{ message: string }>) => {
        successMessage({
          description: success.data.message || "Tạo mới thành công",
        });
        form.resetFields();
        setFormValues(initialFormValues);
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

    const numericValue = value.replace(/[^0-9]/g, "");
    const limitedValue = numericValue.slice(0, 11);

    form.setFieldsValue({ phone: limitedValue });
  };

  const onSubmitForm = () => {
    form
      .validateFields()
      .then((formData) => {
        console.log("data", formData);

        formData.roleId = Number(formData.roleId);
        formData.password = DEFAULT_PASSWORD;

        handleCreateEmployee.mutate({ data: formData });
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  useEffect(() => {
    if (isError) {
      errorMessage({
        description: (error as AxiosError)?.message || "API Failed",
      });
    }
  }, [isError, error]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-4 shadow-md rounded-md text-2xl font-extrabold">
        Add New Employee
      </div>
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
                  pattern: /^[0-9]+$/,
                  message: "Điện thoại phải là số",
                },
              ]}
              maxLength={11}
              onChange={handleOnchangePhone}
              placeholder="Nhấp số điện thoại"
            />
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
            <SelectComponent
              name="roleId"
              label="Role"
              options={roles || []}
              loading={isLoading}
            />
          </div>
          <div className="flex gap-3 justify-end mt-5">
            <ButtonComponent htmlType="submit">Add new</ButtonComponent>
            <ButtonComponent btnType="go-back" onClick={() => goBack()}>
              Cancel
            </ButtonComponent>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddEmployee;
