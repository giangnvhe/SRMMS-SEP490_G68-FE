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
  const [file, setFile] = useState<RcFile | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

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
        setImagePreview(undefined);
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
          const isLessThan10MB = rcFile.size / 1024 / 1024 < 10;
          if (!isLessThan10MB) {
            errorMessage({
              description: "File không được vượt quá 10MB!",
            });
            return;
          }

          setFile(rcFile as RcFile);
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(rcFile);
        } else {
          console.log("File is not an instance of File:", rcFile);
        }
      }
    },
    [errorMessage]
  );

  useEffect(() => {
    console.log("File state updated:", file);
  }, [file]);

  useEffect(() => {
    if (isEditProduct && productData) {
      const categoryId = category.find(
        (cat) => cat.label === productData?.category
      )?.value;

      form.setFieldsValue({
        ProductName: productData?.productName,
        Description: productData?.description,
        Price: productData?.price,
        Category: categoryId,
        Calories: productData?.calories,
        Status: productData?.status,
      });

      // Set the existing image preview
      if (productData.image) {
        setImagePreview(productData.image);
        setFile(null);
      }
    } else {
      form.resetFields();
      setImagePreview(undefined);
    }
  }, [productData, isEditProduct]);

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
              label="Tên Món Ăn"
              rules={[
                {
                  required: true,
                  message: "Tên món không được để trống",
                },
              ]}
              placeholder="Nhập tên món ăn"
              form={form}
            />
            <InputComponent
              name="Price"
              label="Giá"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Giá không để trống",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Giá phải là số",
                },
              ]}
              maxLength={11}
              onChange={handleOnchangeInputNumber}
              placeholder="Nhập giá"
            />
            <SelectComponent
              name="Category"
              label="Danh Mục"
              rules={[
                {
                  required: true,
                  message: "Danh mục không được để trống",
                },
              ]}
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
                  message: "Calories không được để trống",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Không phải là chữ số",
                },
              ]}
              placeholder="Nhập Calories"
            />
            <div>
              <span className="text-red-600">* </span>Hình ảnh{" "}
              <span className="text-gray-500 text-sm">
                {" "}
                (Dung lượng không vượt quá 10MB)
              </span>
            </div>
            <UploadComponent
              name="Image"
              form={form}
              rules={[
                {
                  required: !imagePreview,
                  message: "Image không được để trống",
                },
              ]}
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                {isEditProduct ? "Hình ảnh hiện tại" : "Xem trước hình ảnh"}
                </label>
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="mt-2 max-h-48 object-contain rounded-lg"
                />
              </div>
            )}
            <TextAreaComponent
              label="Mô Tả"
              name="Description"
              rules={[
                {
                  required: true,
                  message: "Description không được để trống",
                },
              ]}
              placeholder="Nhập mô tả"
              form={form}
            />
            {isEditProduct && (
              <SwitchComponent
                name="Status"
                label="Trạng Thái"
                form={form}
                checkedChildren="Còn hàng"
                unCheckedChildren="Hết hàng"
              />
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <ButtonComponent className="px-5 py-2 rounded-md" htmlType="submit">
              {productData ? "Lưu" : "Tạo mới"}
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

export default AddOrEditProduct;
