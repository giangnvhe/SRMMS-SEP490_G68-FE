import { Form, Spin } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import InputComponent from "~/components/InputComponent";
import useNotification from "~/hooks/useNotification";
import { LoadingOutlined } from "@ant-design/icons";
import {
  addNewCategory,
  CategoryData,
  NewCategoryRequest,
  updateCategory,
} from "~/services/category_product";
import styles from "./index.module.scss";
import classNames from "classnames";
import TextAreaComponent from "~/components/TextAreaComponent";
import ButtonComponent from "~/components/ButtonComponent";

const cx = classNames.bind(styles);

interface IProps {
  onCancel: () => void;
  categoryData: CategoryData | undefined;
  refetch: () => void;
}

const initialFormValues = {
  name: "",
  description: null,
  parentId: "",
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
    isEditCategory
      ? form.setFieldsValue({
          catName: categoryData?.catName,
          description: categoryData?.description,
        })
      : form.resetFields();
  }, [categoryData]);

  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
      <div className={cx(styles["card"])}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmitForm}
          initialValues={formValues}
        >
          <InputComponent
            className={cx("form-item")}
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
          <div className={cx("form-button")}>
            <ButtonComponent className={cx("button-admin")} htmlType="submit">
              {isEditCategory ? "Save" : "Create"}
            </ButtonComponent>
            <ButtonComponent btnType="go-back" onClick={onCancel}>
              Cancel
            </ButtonComponent>
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default AddOrEditCategory;
