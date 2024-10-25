import { LoadingOutlined } from "@ant-design/icons";
import { Form, Spin } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import SelectComponent, { Option } from "~/components/SelectComponent";
import SwitchComponent from "~/components/SwitchComponent";
import TextAreaComponent from "~/components/TextAreaComponent";
import UploadComponent from "~/components/UploadComponent";
import useNotification from "~/hooks/useNotification";
import {
  addNewProduct,
  NewProductRequest,
  ProductData,
  updateProduct,
} from "~/services/product";

import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from "antd/es/upload/interface";

const initialFormValues = {
  ProductName: "",
  Description: "",
  Price: "",
  Category: undefined,
  Calories: "",
  CookingTime: "",
  Status: false,
  image: "",
};

interface IProps {
  onCancel: () => void;
  productData: ProductData | undefined;
  refetch: () => void;
  isLoading: boolean;
  category: Option[];
}

interface MutationUpdateCategory {
  id: string | number | undefined;
  data: NewProductRequest;
}

const AddOrEditProduct = ({
  isLoading,
  category,
  refetch,
  productData,
  onCancel,
}: IProps) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState(initialFormValues);
  const isEditProduct = useMemo(() => !!productData, [productData]);
  const { successMessage, errorMessage } = useNotification();
  //const [file, setFile] = useState<UploadFile | null>(null);
  const [file, setFile] = useState<RcFile | null>(null);

  const handleUpdateCategory = useMutation(
    ({ id, data }: MutationUpdateCategory) => updateProduct(Number(id), data),
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

  const handleCreateCategory = useMutation(
    ({ data }: { data: NewProductRequest }) => addNewProduct(data),
    {
      onSuccess: (success: AxiosResponse<{ message: string }>) => {
        successMessage({
          description: success?.data?.message || "Tạo mới thành công",
        });
        form.resetFields();
        setFormValues(initialFormValues);
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

  const handleOnchangeInputNumber = (e: any) => {
    const value = e.target.value;

    const numericValue = value.replace(/[^0-9]/g, "");
    const limitedValue = numericValue.slice(0, 11);

    form.setFieldsValue({ price: limitedValue });
  };

  const handleFileChange = useCallback(
    (info: UploadChangeParam<UploadFile>) => {
      const { file } = info;

      if (file.status === "removed") {
        setFile(null);
      } else {
        const rcFile = file.originFileObj || file;
        if (rcFile instanceof File) {
          setFile(rcFile as RcFile);
        } else {
          console.log("File is not an instance of File:", rcFile);
        }
      }
    },
    []
  );

  useEffect(() => {
    console.log("File state updated:", file);
  }, [file]);

  useEffect(() => {
    isEditProduct
      ? form.setFieldsValue({
          ProductName: productData?.productName,
          Description: productData?.description,
          Price: productData?.price,
          Category: productData?.category,
          Calories: productData?.calories,
          CookingTime: productData?.cookingTime,
          Status: productData?.status,
        })
      : form.resetFields();
  }, [productData]);

  const onSubmitForm = (values: {
    ProductName: string;
    Description: string;
    Price: number;
    Category: number;
    Calories: string;
    CookingTime: number;
    Status: boolean;
  }) => {
    const formData: NewProductRequest = {
      ProductName: values.ProductName,
      Description: values.Description,
      Price: values.Price,
      Category: values.Category,
      Image: file,
      Calories: values.Calories,
      CookingTime: values.CookingTime,
      Status: values.Status,
    };
    if (isEditProduct) {
      handleUpdateCategory.mutate({
        id: productData?.productId,
        data: formData,
      });
    } else {
      handleCreateCategory.mutate({ data: formData });
    }
  };

  const isLoadings = useMemo(
    () => handleCreateCategory.isLoading || handleUpdateCategory.isLoading,
    [handleCreateCategory.isLoading, handleUpdateCategory.isLoading]
  );

  return (
    <Spin spinning={isLoadings} indicator={<LoadingOutlined spin />}>
      <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmitForm}
          initialValues={formValues}
        >
          <div className="space-y-4">
            <InputComponent
              name="ProductName"
              label="Product Name"
              placeholder="Nhập tên món ăn"
              form={form}
            />
            <InputComponent
              name="Price"
              label="Price"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Can not be empty",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Price number must be numeric",
                },
              ]}
              maxLength={11}
              onChange={handleOnchangeInputNumber}
              placeholder="Phone number employee"
            />
            <SelectComponent
              name="Category"
              label="Category"
              options={category || []}
              loading={isLoading}
            />
            <InputComponent
              name="Calories"
              label="Calories"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Can not be empty",
                },
              ]}
              placeholder="Nhập Calories"
            />
            <InputComponent
              name="CookingTime"
              label="Time"
              placeholder="Nhấp thời gian"
              form={form}
            />
            <UploadComponent
              name="Image"
              label="Image"
              form={form}
              onChange={handleFileChange}
            />
            <TextAreaComponent
              label="Description"
              name="Description"
              placeholder="Nhập mô tả"
              form={form}
            />
            <SwitchComponent
              name="Status"
              label="Status"
              form={form}
              checkedChildren="Active"
              unCheckedChildren="Inactive"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <ButtonComponent className="px-5 py-2 rounded-md" htmlType="submit">
              {productData ? "Save" : "Create"}
            </ButtonComponent>
            <ButtonComponent
              btnType="go-back"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </ButtonComponent>
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default AddOrEditProduct;
