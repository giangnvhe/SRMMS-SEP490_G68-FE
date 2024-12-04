import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Form, Image, Modal, Select, Spin, Table } from "antd";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import TextAreaComponent from "~/components/TextAreaComponent";
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file: UploadFile) => {
    const filePreview =
      file.url || file.preview || (await getBase64(file.originFileObj as File));
    setPreviewImage(filePreview);
    setPreviewOpen(true);
  };

  const handleFileChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    const lastFile = newFileList[newFileList.length - 1];
    if (lastFile?.status === "done" && lastFile.originFileObj) {
      getBase64(lastFile.originFileObj).then((base64) =>
        setPreviewImage(base64)
      );
    }
  };

  const handleCustomRequest = async ({
    file,
    onProgress,
    onSuccess,
    onError,
  }: any) => {
    let progress = 0;
    try {
      const interval = setInterval(() => {
        progress += 20;
        onProgress?.({ percent: progress }, file);
        if (progress >= 100) {
          clearInterval(interval);
          onSuccess?.("Upload successful");
        }
      }, 500);
    } catch (error) {
      onError?.(error);
    }
  };

  const clearPreviewImage = () => {
    setPreviewImage(null);
    setFileList([]);
  };

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
        clearPreviewImage();
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

  // const handleFileChange = useCallback(
  //   (info: UploadChangeParam<UploadFile>) => {
  //     const { file } = info;

  //     if (file.status === "removed") {
  //       setFile(null);
  //     } else {
  //       const rcFile = file.originFileObj || file;
  //       if (rcFile instanceof File) {
  //         setFile(rcFile as RcFile);
  //       } else {
  //         console.log("File is not an instance of File:", rcFile);
  //       }
  //     }
  //   },
  //   []
  // );

  useEffect(() => {
    console.log("File state updated:", previewImage);
  }, [previewImage]);

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
          ComboImg: comboData?.comboImg,
          ProductNames: comboData?.ProductNames,
        })
      : form.resetFields();
  }, [comboData]);

  const onSubmitForm = (values: {
    ComboName: string;
    ComboDescription: string;
    ComboImg?: string;
    ComboMoney: number;
    ComboStatus: boolean;
    ProductNames: string[];
  }) => {
    const formData: NewComboRequest = {
      ComboName: values.ComboName,
      ComboDescription: values.ComboDescription,
      ComboMoney: values.ComboMoney,
      ComboImg: previewImage,
      ComboStatus: true,
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
            <Form.Item
              label="Upload Image"
              name="comboImg"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                customRequest={handleCustomRequest}
                onChange={handleFileChange}
                fileList={fileList}
                onPreview={handlePreview}
              >
                {fileList.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              {previewImage && (
                <Image
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: setPreviewOpen,
                  }}
                  src={previewImage}
                  wrapperStyle={{ display: "none" }}
                />
              )}
            </Form.Item>
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
