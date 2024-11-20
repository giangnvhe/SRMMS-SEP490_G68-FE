import { LoadingOutlined } from "@ant-design/icons";
import { Form, Spin } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import TextAreaComponent from "~/components/TextAreaComponent";
import useNotification from "~/hooks/useNotification";
import {
  addNewCategory,
  CategoryData,
  NewCategoryRequest,
  updateCategory,
} from "~/services/category_product";

interface IProps {
  onCancel: () => void;
  categoryData: CategoryData | undefined;
  refetch: () => void;
}

const initialFormValues = {
  catName: "",
  description: null,
};

interface MutationUpdateCategory {
  id: string | number | undefined;
  data: NewCategoryRequest;
}

const AddOrEditCategory = ({ onCancel, categoryData, refetch }: IProps) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState(initialFormValues);
  const isEditCategory = useMemo(() => !!categoryData, [categoryData]);
  const { successMessage, errorMessage } = useNotification();

  const handleUpdateCategory = useMutation(
    ({ id, data }: MutationUpdateCategory) => updateCategory(Number(id), data),
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
    ({ data }: { data: NewCategoryRequest }) => addNewCategory(data),
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

  const onSubmitForm = (values: { catName: string; description: string }) => {
    const formData: NewCategoryRequest = {
      catName: values.catName,
      description: values.description,
    };
    isEditCategory
      ? handleUpdateCategory.mutate({ id: categoryData?.catId, data: formData })
      : handleCreateCategory.mutate({ data: formData });
  };

  const isLoading = useMemo(
    () => handleCreateCategory.isLoading || handleUpdateCategory.isLoading,
    [handleCreateCategory.isLoading, handleUpdateCategory.isLoading]
  );

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ categoryData:", categoryData)

    isEditCategory
      ? form.setFieldsValue({
          catName: categoryData?.catName,
          description: categoryData?.description,
        })
      : form.resetFields();
  }, [categoryData]);

  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
      <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmitForm}
          initialValues={formValues}
        >
          <div className="space-y-4">
            <InputComponent
              name="catName"
              label="Category Name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống",
                },
              ]}
              form={form}
              placeholder="Nhập tên category"
            />
            <TextAreaComponent
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống",
                },
              ]}
              form={form}
              placeholder="Nhập mô tả"
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <ButtonComponent className="px-5 py-2 rounded-md" htmlType="submit">
              {categoryData ? "Lưu" : "Tạo Mới"}
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

export default AddOrEditCategory;
