import { Form, Typography } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import DatePickerComponent from "~/components/DatePickerComponent";
import InputComponent from "~/components/InputComponent";
import RadioComponent from "~/components/RadioComponent";
import SelectComponent, {
  Option,
} from "~/components/SelectComponent";
import TextAreaComponent from "~/components/TextAreaComponent";
import useNotification from "~/hooks/useNotification";
import {
  addNewEmployee,
  getListEmployees,
  NewEmployeeRequest,
} from "~/services/employee";
import { getRoles } from "~/services/role";
import styles from "./index.module.scss";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const options = [
  {
    label: "Male",
    value: true,
  },
  {
    label: "Female",
    value: false,
  },
];

const initialFormValues = {
  empFirstName: "",
  empLastName: "",
  empDob: "",
  empPhoneNumber: null,
  empGender: true,
  empEmail: "",
  empAddress: "",
  empStartDate: moment(),
  empStatus: true,
  roleId: "2",
};

const AddEmployee = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { successMessage, errorMessage } = useNotification();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [roles, setRoles] = useState<Option[] | []>([]);
  const navigate = useNavigate();
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

  const getAllEmployees = useQuery("getAllEmployees", () =>
    getListEmployees(form.getFieldsValue(true))
  );

  const validateEmailFormat = (emailInput: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  };

  const checkExistEmail = (emailInput: string) => {
    const emailList = getAllEmployees.data?.data.map((value) => value.empEmail);

    if (!validateEmailFormat(emailInput)) {
      errorMessage({
        description: "Invalid email format",
      });
      return false;
    }

    const existEmail = emailList?.find((value) => value === emailInput);
    if (existEmail) {
      errorMessage({
        description: "Email already exists",
      });
      return false;
    }

    return true;
  };

  const handleCreateEmployee = useMutation(
    ({ data }: { data: NewEmployeeRequest }) => addNewEmployee(data),
    {
      onSuccess: (success: AxiosResponse<{ message: string }>) => {
        successMessage({
          description: success.data.message || "Add new employee successfully",
        });
        form.resetFields();
        setFormValues(initialFormValues);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        errorMessage({
          description:
            error.response?.data.message || "Add new employee failed!!",
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

  const onSubmitForm = () => {
    const formData = form.getFieldsValue();
    console.log("data", formData);

    formData.empStartDate = formData.empStartDate
      ? formData.empStartDate.format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    formData.empDob = formData.empDob
      ? formData.empDob.format("YYYY-MM-DD")
      : null;
    formData.empPhoneNumber = Number(formData.empPhoneNumber);
    formData.roleId = Number(formData.roleId);
    if (checkExistEmail(form.getFieldValue("empEmail"))) {
      handleCreateEmployee.mutate({ data: formData });
    }
  };

  useEffect(() => {
    if (isError) {
      errorMessage({
        description: (error as AxiosError)?.message || "API Failed",
      });
    }
  }, [isError, error]);

  return (
    <div>
      <Title level={2} className="bg-white p-2">
        Add Employee
      </Title>
      <div className={cx(styles["card-container"])}>
        <Form
          form={form}
          layout="vertical"
          className="form-container"
          onFinish={onSubmitForm}
          initialValues={formValues}
        >
          <div className="form-item">
            <InputComponent
              name="empFirstName"
              label="First Name"
              form={form}
              rules={[
                {
                  required: true,
                  message: "First Name must be non-empty",
                },
              ]}
              placeholder="Enter first name employee"
            />
            <InputComponent
              name="empLastName"
              label="Last Name"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Last Name must be non-empty",
                },
              ]}
              placeholder="Enter last name employee"
            />
            <InputComponent
              name="empPassword"
              label="Password"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Last Name must be non-empty",
                },
                {
                  min: 5,
                  message: "Password must be at least 5 characters",
                },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                  message: "Password must contain both letters and numbers",
                },
              ]}
              placeholder="Enter password employee"
            />
            <InputComponent
              name="empPhoneNumber"
              label="Phone Number"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Phone must be non-empty",
                },
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
                {
                  required: true,
                  message: "Email must be non-empty",
                },
                {
                  type: "email",
                  message: "Định dạng email không hợp lệ",
                },
              ]}
              placeholder="Email employee"
            />
            <DatePickerComponent
              name="empDob"
              label="Date of birth"
              form={form}
              format="YYYY-MM-DD"
            />
            <DatePickerComponent
              name="empStartDate"
              label="Start Date"
              form={form}
              format="YYYY-MM-DD"
              disabled
            />

            <TextAreaComponent
              name="empAddress"
              label="Address"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Email must be non-empty",
                },
              ]}
              placeholder="Address employee"
              maxLength={2000}
            />
            <RadioComponent
              name="empGender"
              label="Gender"
              form={form}
              options={options}
              direction="horizontal"
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
