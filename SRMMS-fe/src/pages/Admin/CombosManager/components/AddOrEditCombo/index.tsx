import { Checkbox, Form, Modal, Select, Spin, Table } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { AxiosError, AxiosResponse } from "axios";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import useNotification from "~/hooks/useNotification";
import { LoadingOutlined } from "@ant-design/icons";
import {
  addNewCombo,
  ComboData,
  getListProduct,
  NewComboRequest,
  updateCombo,
} from "~/services/combos";
import InputComponent from "~/components/InputComponent";
import TextAreaComponent from "~/components/TextAreaComponent";
import UploadComponent from "~/components/UploadComponent";
import ButtonComponent from "~/components/ButtonComponent";

interface IProps {
  onCancel: () => void;
  comboData: ComboData | undefined;
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
  const [file, setFile] = useState<RcFile | null>(null);
  const [productNames, setProductNames] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);

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
    if (isModalVisible) {
      const fetchProducts = async () => {
        const response = await getListProduct();
        setAvailableProducts(response?.data);
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
    isEditCombo
      ? form.setFieldsValue({
          ComboName: comboData?.comboName,
          ComboDescription: comboData?.comboDescription,
          ComboMoney: comboData?.comboMoney,
          ComboStatus: comboData?.comboStatus,
          ProductNames: comboData?.ProductNames,
        })
      : form.resetFields();
  }, [comboData]);

  const onSubmitForm = (values: {
    comboName: string;
    comboDescription: string;
    comboImg?: RcFile | null;
    comboMoney: number;
    comboStatus: boolean;
    ProductNames: string[];
  }) => {
    const formData: NewComboRequest = {
      ComboName: values.comboName,
      ComboDescription: values.comboDescription,
      ComboMoney: values.comboMoney,
      ComboImg: file,
      ComboStatus: values.comboStatus,
      ProductNames: productNames,
    };
    console.log("🚀 ~ AddOrEditCombos ~ formData:", formData);
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
            {/* <UploadComponent
              name="ComboImg"
              label="Hình Ảnh"
              form={form}
              rules={[
                {
                  required: true,
                  message: "Image không được để trống",
                },
              ]}
              onChange={handleFileChange}
            /> */}
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
