import { LoadingOutlined } from "@ant-design/icons";
import { Form, Spin } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import DatePickerComponent from "~/components/DatePickerComponent";
import InputComponent from "~/components/InputComponent";
import SwitchComponent from "~/components/SwitchComponent";
import useNotification from "~/hooks/useNotification";
import {
  addVoucher,
  DiscountData,
  updateVoucher,
  VoucherRequest,
} from "~/services/voucher";

interface IProps {
  onCancel: () => void;
  voucherData: DiscountData | undefined;
  refetch: () => void;
}

interface MutationUpdateVoucher {
  id: string | number | undefined;
  data: VoucherRequest;
}

const initialFormValues = {
  codeDetail: "",
  discountValue: "",
  startDate: dayjs(),
  endDate: dayjs().add(1, "day"),
  status: true,
};

const AddOrEditVoucher = ({ refetch, voucherData, onCancel }: IProps) => {
  const [form] = Form.useForm();
  const { successMessage, errorMessage } = useNotification();
  const [formValues, setFormValues] = useState(initialFormValues);
  const isEditVoucher = useMemo(() => !!voucherData, [voucherData]);

  const handleCreateVoucher = useMutation(
    ({ data }: { data: VoucherRequest }) => addVoucher(data),
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

  const handleUpdateEmployee = useMutation(
    ({ id, data }: MutationUpdateVoucher) => updateVoucher(Number(id), data),
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

  useEffect(() => {
    if (isEditVoucher) {
      const startDate = voucherData?.startDate
        ? dayjs(voucherData.startDate)
        : null;
      const endDate = voucherData?.endDate ? dayjs(voucherData.endDate) : null;

      form.setFieldsValue({
        codeDetail: voucherData?.codeDetail,
        discountValue: voucherData?.discountValue,
        startDate: startDate,
        endDate: endDate,
        status: voucherData?.status,
      });
    } else {
      form.resetFields();
    }
  }, [voucherData, isEditVoucher, form]);

  const onSubmitForm = (values: {
    codeDetail: string;
    discountValue: number;
    startDate: string;
    endDate: string;
    status: boolean;
  }) => {
    const formData: VoucherRequest = {
      codeDetail: values.codeDetail,
      discountValue: values.discountValue,
      startDate: dayjs(values.startDate).format("YYYY-MM-DD"), // Format ngày bắt đầu
      endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
      status: values.status !== undefined ? values.status : true,
    };
    if (isEditVoucher) {
      handleUpdateEmployee.mutate({
        id: voucherData?.codeId,
        data: formData,
      });
    } else {
      handleCreateVoucher.mutate({ data: formData });
    }
  };
  const isLoadings = useMemo(
    () => handleCreateVoucher.isLoading || handleUpdateEmployee.isLoading,
    [handleCreateVoucher.isLoading, handleUpdateEmployee.isLoading]
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
              name="codeDetail"
              label="Tên Mã giảm giá"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Không được để trống tên Mã giảm giá",
                },
              ]}
              placeholder="Nhập tên mã"
            />
            <InputComponent
              name="discountValue"
              label="Giá trị"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Chỉ được nhập số từ 0 đến 9",
                },
              ]}
              placeholder="Nhập giá trị"
            />
            <div className="flex gap-6">
              <DatePickerComponent
                name="startDate"
                label="Ngày bắt đầu"
                form={form}
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
                defaultValue={dayjs()}
                getDisabledDate={(date) => date.isBefore(dayjs(), "day")}
              />
              <DatePickerComponent
                name="endDate"
                label="Ngày kết thúc"
                form={form}
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
                defaultValue={dayjs().add(1, "day")}
                getDisabledDate={(date) =>
                  date.isBefore(dayjs().add(1, "day"), "day")
                }
              />
              {isEditVoucher && (
                <SwitchComponent
                  name="status"
                  label="Trạng Thái"
                  form={form}
                  checkedChildren="Bật"
                  unCheckedChildren="Tắt"
                />
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <ButtonComponent htmlType="submit" className="px-5 py-2 rounded-md">
              {isEditVoucher ? "Chỉnh sửa" : "Tạo mới"}
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

export default AddOrEditVoucher;
