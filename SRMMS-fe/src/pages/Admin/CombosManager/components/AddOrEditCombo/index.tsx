import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Form, Image, Modal, Select, Spin, Table } from "antd";
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import SwitchComponent from "~/components/SwitchComponent";
import TextAreaComponent from "~/components/TextAreaComponent";
import UploadComponent from "~/components/UploadComponent";
import useNotification from "~/hooks/useNotification";
import {
  addNewCombo,
  CombosData,
  getListProduct,
  NewComboRequest,
  updateCombo,
} from "~/services/combos";

interface IProps {
  onCancel: () => void;
  comboData: CombosData | undefined;
  refetch: () => void;
}

interface MutationUpdateCombo {
  id: string | number | undefined;
  data: NewComboRequest;
}

const initialFormValues = {
  ComboName: "",
  ComboDescription: "",
  ComboMoney: "",
  ProductNames: "",
  ComboStatus: false,
  ComboImg: "",
};

const AddOrEditCombos = ({ refetch, comboData, onCancel }: IProps) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState(initialFormValues);
  const isEditCombo = useMemo(() => !!comboData, [comboData]);
  const { successMessage, errorMessage } = useNotification();
  const [productNames, setProductNames] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);
  const [file, setFile] = useState<RcFile | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  const handleUpdateCombo = useMutation(
    ({ id, data }: MutationUpdateCombo) => updateCombo(Number(id), data),
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

  const handleCreateCombo = useMutation(
    ({ data }: { data: NewComboRequest }) => addNewCombo(data),
    {
      onSuccess: (success: AxiosResponse<{ message: string }>) => {
        successMessage({
          description: success?.data?.message || "Tạo mới thành công",
        });
        form.resetFields();
        setFormValues(initialFormValues);
        setImagePreview(undefined);
        setFile(null);
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
    if (isModalVisible) {
      const fetchProducts = async () => {
        try {
          const response = await getListProduct();
          const filteredProducts = response?.data.filter(
            (product) => product.status === true
          );
          setAvailableProducts(filteredProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [isModalVisible]);

  const handleOpenProductModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseProductModal = () => {
    setIsModalVisible(false);
  };

  const handleProductSelection = (selectedProducts: string[]) => {
    setProductNames(selectedProducts);
  };

  const handleOnchangeInputNumber = (e: any) => {
    const value = e.target.value;

    const numericValue = value.replace(/[^0-9]/g, "");
    const limitedValue = numericValue.slice(0, 11);

    form.setFieldsValue({ ComboMoney: limitedValue });
  };

  useEffect(() => {
    if (isEditCombo && comboData) {
      const { productNames, ...rest } = comboData;
      form.setFieldsValue({
        ComboName: comboData?.comboName,
        ComboDescription: comboData?.comboDescription,
        ComboMoney: comboData?.comboMoney,
        ComboStatus: comboData?.comboStatus,
        ProductNames: productNames || [],
      });
      const productNamesToSet = productNames || [];
      setProductNames(productNamesToSet);

      if (comboData.comboImg) {
        setImagePreview(comboData.comboImg);
        setFile(null);
      } else {
        form.resetFields();
        setImagePreview(undefined);
        setProductNames([]);
      }
    }
  }, [comboData, isEditCombo]);

  useEffect(() => {
    if (!isEditCombo) {
      setImagePreview(undefined);
      setFile(null);
      form.resetFields();
      setFormValues(initialFormValues);
      setProductNames([]);
    }
  }, [comboData, isEditCombo, form]);

  const onSubmitForm = (values: {
    ComboName: string;
    ComboDescription: string;
    ComboImg?: string;
    ComboMoney: number;
    ComboStatus: boolean;
    ProductNames: string[];
  }) => {
    const formData: NewComboRequest = {
      ComboName: values.ComboName.trim(),
      ComboDescription: values.ComboDescription,
      ComboMoney: values.ComboMoney,
      ComboImg: file,
      ComboStatus: isEditCombo ? values.ComboStatus : true,
      ProductNames: productNames,
    };
    if (isEditCombo) {
      handleUpdateCombo.mutate({
        id: comboData?.comboId,
        data: formData,
      });
    } else {
      handleCreateCombo.mutate({ data: formData });
    }
  };

  const isLoadings = useMemo(
    () => handleCreateCombo.isLoading || handleUpdateCombo.isLoading,
    [handleCreateCombo.isLoading, handleUpdateCombo.isLoading]
  );

  const columns = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render(_: any, record: any) {
        return `${record.price.toFixed(2)} VNĐ`;
      },
    },
    {
      title: "Chọn",
      dataIndex: "productId",
      key: "productId",
      render: (text: string, record: any) => (
        <Checkbox
          value={record.productId}
          checked={productNames.includes(record.productName)}
          onChange={() =>
            handleProductSelection(
              productNames.includes(record.productName)
                ? productNames.filter((name) => name !== record.productName)
                : [...productNames, record.productName]
            )
          }
        />
      ),
    },
  ];
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
              name="ComboName"
              label="Tên Combo"
              rules={[
                {
                  required: true,
                  message: "Tên Combo không được để trống",
                },
              ]}
              placeholder="Nhập tên Combo ăn"
              form={form}
            />
            <TextAreaComponent
              label="Mô Tả"
              name="ComboDescription"
              rules={[
                {
                  required: true,
                  message: "Description không được để trống",
                },
              ]}
              placeholder="Nhập mô tả"
              form={form}
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
                  {isEditCombo ? "Hình ảnh hiện tại" : "Xem trước hình ảnh"}
                </label>
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="mt-2 max-h-48 object-contain rounded-lg"
                />
              </div>
            )}
            <InputComponent
              name="ComboMoney"
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
            <div>
              <div className="mb-2">
                {" "}
                <span className="text-red-600 text-md">*</span> Món ăn
              </div>
              <Select
                mode="multiple"
                value={productNames}
                onChange={(value) => setProductNames(value)}
                placeholder="Chọn sản phẩm"
                onClick={handleOpenProductModal}
                className="w-96"
              />
            </div>
            {isEditCombo && (
              <SwitchComponent
                name="ComboStatus"
                label="Trạng Thái"
                form={form}
                checkedChildren="Bật"
                unCheckedChildren="Tắt"
              />
            )}
            <div className="mt-6 flex justify-end space-x-3">
              <ButtonComponent
                className="px-5 py-2 rounded-md"
                htmlType="submit"
              >
                {comboData ? "Lưu" : "Tạo mới"}
              </ButtonComponent>
              <ButtonComponent
                btnType="go-back"
                onClick={onCancel}
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Hủy
              </ButtonComponent>
            </div>
          </div>
        </Form>
        <Modal
          title="Chọn Sản Phẩm"
          visible={isModalVisible}
          onCancel={handleCloseProductModal}
          onOk={() => handleProductSelection(productNames)}
          footer={null}
        >
          <Table
            columns={columns}
            dataSource={availableProducts}
            rowKey="productId"
            pagination={false}
          />
        </Modal>
      </div>
    </Spin>
  );
};

export default AddOrEditCombos;
