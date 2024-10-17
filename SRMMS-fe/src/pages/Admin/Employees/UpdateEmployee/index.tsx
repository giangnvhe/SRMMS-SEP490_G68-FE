import { LoadingOutlined } from "@ant-design/icons";
import { Form, Spin } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "~/components/ButtonComponent";
import DatePickerComponent from "~/components/DatePickerComponent";
import InputComponent from "~/components/InputComponent";
import RadioComponent from "~/components/RadioComponent";
import SelectComponent from "~/components/SelectComponent";
import useNotification from "~/hooks/useNotification";
import {
  getEmployeeById,
  updateEmployee,
  UpdateEmployeeRequest,
} from "~/services/employee";
import { getRoles } from "~/services/role";
import styles from "./index.module.scss";
import SwitchComponent from "~/components/SwitchComponent";

const cx = classNames.bind(styles);

const options = [
  { label: "Active", value: true },
  { label: "InActive", value: false },
];

interface MutationUpdateEmployee {
  id: string | number | undefined;
  data: UpdateEmployeeRequest;
}

const UpdateEmployee = () => {
  const { id } = useParams();
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { successMessage, errorMessage } = useNotification();
  const goBack = () => navigate("/admin/employees");

  const { isLoading, isError, error } = useQuery("role-admin", getRoles, {
    onSuccess: (result) => {
      setRoles(
        result.data.map((value: any) => ({
          label: value.roleName,
          value: `${value.roleId}`,
        }))
      );
    },
  });

  const handleUpdateEmployee = useMutation(
    ({ id, data }: MutationUpdateEmployee) => updateEmployee(Number(id), data),
    {
      onSuccess: (success: AxiosResponse<{ message: string }>) => {
        successMessage({
          description:
            success?.data?.message || "Employee updated successfully!",
        });
        form.resetFields();
        goBack();
      },
      onError: (error: AxiosError<{ message: string }>) => {
        errorMessage({
          description:
            (error as AxiosError).message || "Failed to update employee",
        });
      },
    }
  );

  const handleOnchangePhone = (e: any) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    const limitedValue = numericValue.slice(0, 11);
    form.setFieldsValue({ empPhoneNumber: limitedValue });
  };

  const onSubmitForm = (values: {
    empFirstName: string;
    empLastName: string;
    empDob: string;
    empPhoneNumber: number;
    empEmail: string;
    empPassword: string;
    empStartDate: string;
    roleId: number;
    empStatus: boolean;
  }) => {
    const formData: UpdateEmployeeRequest = {
      empFirstName: values.empFirstName,
      empLastName: values.empLastName,
      empDob: dayjs(values.empDob).format("YYYY-MM-DD"),
      empPhoneNumber: values.empPhoneNumber,
      empEmail: values.empEmail,
      empPassword: values.empPassword,
      empStartDate: dayjs(values.empStartDate).format("YYYY-MM-DD"),
      roleId: values.roleId,
      empStatus: values.empStatus,
    };
    console.log(formData);

    handleUpdateEmployee.mutate({ id, data: formData });
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const result = await getEmployeeById(Number(id));
        const employee = result.data;

        form.setFieldsValue({
          empFirstName: employee.empFirstName,
          empLastName: employee.empLastName,
          empPassword: employee.empPassword,
          empPhoneNumber: employee.empPhoneNumber,
          empEmail: employee.empEmail,
          empDob: dayjs(employee.empDob),
          empStartDate: dayjs(employee.empStartDate),
          empAddress: employee.empAddress,
          empGender: employee.empGender,
          empStatus: employee.empStatus,
          roleId: employee.roleId ? String(employee.roleId) : null,
        });
      } catch (error) {
        errorMessage({
          description:
            (error as AxiosError)?.message || "Failed to fetch employee data",
        });
      }
    };
    fetchEmployeeData();
  }, [id, form]);

  useEffect(() => {
    if (isError) {
      errorMessage({
        description: (error as AxiosError)?.message || "API Failed",
      });
    }
  }, [isError, error]);

  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-4 shadow-md rounded-md text-2xl font-extrabold">
          Update Employee
        </div>

        <div className="mt-5">
          <Form
            form={form}
            layout="vertical"
            className="bg-white p-6 rounded-lg shadow-lg space-y-6"
            onFinish={onSubmitForm}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputComponent
                name="empFirstName"
                label="First Name"
                form={form}
                rules={[
                  { required: true, message: "First Name must be non-empty" },
                ]}
                placeholder="Enter first name employee"
              />
              <InputComponent
                name="empLastName"
                label="Last Name"
                form={form}
                rules={[
                  { required: true, message: "Last Name must be non-empty" },
                ]}
                placeholder="Enter last name employee"
              />
              <DatePickerComponent
                name="empDob"
                label="Date of Birth"
                form={form}
              />
              <InputComponent
                name="empPhoneNumber"
                label="Phone Number"
                form={form}
                rules={[
                  { required: true, message: "Phone must be non-empty" },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Phone number must be numeric",
                  },
                ]}
                maxLength={11}
                onChange={handleOnchangePhone}
                placeholder="Phone number employee"
              />
              <InputComponent
                name="empEmail"
                label="Email"
                form={form}
                rules={[
                  { required: true, message: "Email must be non-empty" },
                  { type: "email", message: "Invalid email format" },
                ]}
                placeholder="Email employee"
              />
              <InputComponent
                name="empPassword"
                label="Password"
                form={form}
                rules={[
                  { required: true, message: "Password must be non-empty" },
                  { min: 5, message: "Password must be at least 5 characters" },
                  {
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                    message: "Password must contain both letters and numbers",
                  },
                ]}
                placeholder="Enter password employee"
              />
              <DatePickerComponent
                name="empStartDate"
                label="Start Date"
                form={form}
              />
              <SelectComponent
                defaultValue="abc"
                name="roleId"
                label="Role"
                options={roles || []}
                loading={isLoading}
                rules={[{ required: true, message: "Role must be selected" }]}
              />
            </div>

            <div className="mt-4">
              <SwitchComponent
                name="empStatus"
                label="Status"
                form={form}
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <ButtonComponent htmlType="submit">Update</ButtonComponent>
              <ButtonComponent btnType="go-back" onClick={goBack}>
                Cancel
              </ButtonComponent>
            </div>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default UpdateEmployee;
