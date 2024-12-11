import React, { useEffect, useMemo, useState } from "react";
import { Form, InputNumber, Button, Table, Space, Modal } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useMutation } from "react-query";
import useNotification from "~/hooks/useNotification";
import { OrderData } from "~/services/order";
import { ProductTableRequest, updateProductTable } from "~/services/orderTable";
import { formatVND } from "~/common/utils/formatPrice";
import socket from "~/common/const/socketKitchen";

interface IProps {
  orderData: OrderData | undefined;
  refetch: () => void;
  onCancel: () => void;
}

interface MutationUpdateCategory {
  id: string | number | undefined;
  data: ProductTableRequest;
}

interface ComboDetail {
  comboId: number;
  quantity: number;
  price: number;
}

interface ProductDetail {
  proId: number;
  quantity: number;
  price: number;
}

const EditOrder: React.FC<IProps> = ({ orderData, refetch, onCancel }) => {
  const [form] = Form.useForm();
  const { successMessage, errorMessage } = useNotification();

  const [comboDetails, setComboDetails] = useState<ComboDetail[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);

  const totalMoney = useMemo(() => {
    const comboTotal = comboDetails.reduce(
      (sum, combo) => sum + combo.price * combo.quantity,
      0
    );
    const productTotal = productDetails.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    return comboTotal + productTotal;
  }, [comboDetails, productDetails]);

  // Update Order Mutation
  const handleUpdateOrder = useMutation(
    ({ id, data }: MutationUpdateCategory) =>
      updateProductTable(Number(id), data),
    {
      onSuccess: () => {
        successMessage({ description: "Chỉnh sửa thành công" });
        form.resetFields();
        refetch();
        onCancel();
      },
      onError: () => {
        errorMessage({
          description: "Đã có lỗi xảy ra, chỉnh sửa không thành công!!",
        });
      },
    }
  );

  useEffect(() => {
    if (orderData) {
      const initialComboDetails =
        orderData.combos?.map((combo) => ({
          comboId: combo.comboId,
          quantity: combo.quantity,
          price: combo.price,
        })) || [];

      const initialProductDetails =
        orderData.products?.map((product) => ({
          proId: product.productId,
          quantity: product.quantity,
          price: product.price,
        })) || [];

      setComboDetails(initialComboDetails);
      setProductDetails(initialProductDetails);

      form.setFieldsValue({
        totalMoney: orderData.totalMoney,
        comboDetails: initialComboDetails,
        productDetails: initialProductDetails,
      });
    }
  }, [orderData, form]);

  useEffect(() => {
    form.setFieldsValue({ totalMoney });
  }, [totalMoney, form]);

  useEffect(() => {
    if (orderData) {
      console.log("Original Order Data:", orderData);
      console.log(
        "Combo Quantities:",
        orderData.combos?.map((combo) => combo.quantity)
      );
      console.log(
        "Product Quantities:",
        orderData.products?.map((product) => product.quantity)
      );

      // ... rest of the existing code
    }
  }, [orderData]);

  const onSubmitForm = async () => {
    try {
      await form.validateFields();

      Modal.confirm({
        title: "Xác nhận cập nhật đơn hàng",
        icon: <ExclamationCircleOutlined />,
        content:
          "Bạn có chắc chắn muốn cập nhật đơn hàng này và chuyển đến bếp không?",
        okText: "Xác nhận",
        cancelText: "Hủy",
        onOk() {
          const formData: ProductTableRequest = {
            totalMoney,
            comboDetails: comboDetails,
            productDetails: productDetails,
          };

          handleUpdateOrder.mutate(
            {
              id: orderData?.tableId,
              data: formData,
            },
            {
              onSuccess: () => {
                socket.emit("orderUpdated", {
                  orderId: orderData?.tableId,
                  totalMoney,
                  comboDetails,
                  productDetails,
                  updatedAt: new Date().toISOString(),
                });
              },
            }
          );
        },
      });
    } catch (error) {
      errorMessage({
        description: "Vui lòng kiểm tra lại thông tin trước khi gửi!",
      });
    }
  };

  const handleComboQuantityChange = (index: number, newQuantity: number) => {
    const updatedComboDetails = [...comboDetails];
    updatedComboDetails[index] = {
      ...updatedComboDetails[index],
      quantity: Math.max(0, newQuantity),
    };
    setComboDetails(updatedComboDetails);
    form.setFieldsValue({ comboDetails: updatedComboDetails });
  };

  const handleComboDelete = (index: number) => {
    const updatedComboDetails = comboDetails.filter((_, i) => i !== index);
    setComboDetails(updatedComboDetails);
    form.setFieldsValue({ comboDetails: updatedComboDetails });
  };

  // Product quantity handlers
  const handleProductQuantityChange = (index: number, newQuantity: number) => {
    const updatedProductDetails = [...productDetails];
    updatedProductDetails[index] = {
      ...updatedProductDetails[index],
      quantity: Math.max(0, newQuantity),
    };
    setProductDetails(updatedProductDetails);
    form.setFieldsValue({ productDetails: updatedProductDetails });
  };

  const handleProductDelete = (index: number) => {
    const updatedProductDetails = productDetails.filter((_, i) => i !== index);
    setProductDetails(updatedProductDetails);
    form.setFieldsValue({ productDetails: updatedProductDetails });
  };

  // Combo Details Columns
  const comboColumns = [
    {
      title: "STT",
      dataIndex: "comboId",
      key: "comboId",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (value: number, record: ComboDetail, index: number) => (
        <Space>
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleComboQuantityChange(index, value - 1)}
          />
          <InputNumber
            value={value}
            min={0}
            onChange={(newValue) =>
              handleComboQuantityChange(index, newValue || 0)
            }
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleComboQuantityChange(index, value + 1)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleComboDelete(index)}
          />
        </Space>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => formatVND(price).toLocaleString(),
    },
    {
      title: "Thành Tiền",
      key: "total",
      render: (record: ComboDetail) =>
        formatVND(record.price * record.quantity).toLocaleString(),
    },
  ];

  // Product Details Columns
  const productColumns = [
    {
      title: "STT",
      dataIndex: "proId",
      key: "proId",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (value: number, record: ProductDetail, index: number) => (
        <Space>
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleProductQuantityChange(index, value - 1)}
          />
          <InputNumber
            value={value}
            min={0}
            onChange={(newValue) =>
              handleProductQuantityChange(index, newValue || 0)
            }
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleProductQuantityChange(index, value + 1)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleProductDelete(index)}
          />
        </Space>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => formatVND(price).toLocaleString(),
    },
    {
      title: "Thành Tiền",
      key: "total",
      render: (record: ProductDetail) =>
        formatVND(record.price * record.quantity).toLocaleString(),
    },
  ];

  return (
    <Form form={form} layout="vertical">
      {/* Combo Details Table */}
      <Form.Item name="comboDetails" label="Chi Tiết Combo">
        <Table
          columns={comboColumns}
          dataSource={comboDetails}
          pagination={false}
          rowKey="comboId"
          summary={(pageData) => {
            const total = pageData.reduce(
              (sum, record) => sum + record.price * record.quantity,
              0
            );
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  Tổng tiền Combo
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  {formatVND(total).toLocaleString()}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
      </Form.Item>

      {/* Product Details Table */}
      <Form.Item name="productDetails" label="Chi Tiết Sản Phẩm">
        <Table
          columns={productColumns}
          dataSource={productDetails}
          pagination={false}
          rowKey="proId"
          summary={(pageData) => {
            const total = pageData.reduce(
              (sum, record) => sum + record.price * record.quantity,
              0
            );
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  Tổng tiền
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  {formatVND(total).toLocaleString()}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
      </Form.Item>

      {/* Total Money */}
      <Form.Item name="totalMoney" label="Tổng Tiền">
        <InputNumber
          style={{ width: "100%" }}
          value={totalMoney}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "") as unknown as number
          }
          readOnly
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button
          type="primary"
          onClick={onSubmitForm}
          loading={handleUpdateOrder.isLoading}
        >
          Cập Nhật Đơn Hàng
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditOrder;
