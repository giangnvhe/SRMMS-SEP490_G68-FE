import { PlusCircleOutlined } from "@ant-design/icons";
import { Form, Modal } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import useNotification from "~/hooks/useNotification";
import {
  deleteProduct,
  FormFields,
  getCategorySelect,
  getListProduct,
  ProductData,
} from "~/services/product";
import AddOrEditProduct from "./AddOrEditProduct";
import TableProduct from "./TableProduct";
import { Option } from "~/components/SelectComponent";

const ListProduct = () => {
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<ProductData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    ProductData | undefined
  >(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState<Option[] | []>([]);
  const { errorMessage, successMessage } = useNotification();

  const getListProducts = useQuery("getListProducts", () =>
    getListProduct(form.getFieldsValue(true))
  );

  const { isLoading, isError, error } = useQuery(
    "category",
    getCategorySelect,
    {
      onSuccess: (result) => {
        setCategory(
          result.data.map((value: any) => ({
            label: value.catName,
            value: `${value.catId}`,
          }))
        );
      },
    }
  );

  const deleProduct = useMutation(deleteProduct, {
    onSuccess: () => {
      successMessage({
        title: "Thành công",
        description: "Dừng hoạt động Product thành công",
      });
      getListProducts.refetch();
    },
    onError: (error: AxiosError) => {
      errorMessage({
        description: error.message || "Đã có lỗi xảy ra, xóa thất bại!!",
      });
    },
  });

  const onOk = async (key: string) => {
    deleProduct.mutate(key);
  };

  const onSelected = (id: ProductData | undefined) => {
    setSelectedProduct(id);
    setOpenModal(true);
  };

  const onCancel = () => {
    setSelectedProduct(undefined);
    setOpenModal(false);
  };

  useEffect(() => {
    if (getListProducts.isError) {
      errorMessage({
        description:
          (getListProducts.error as AxiosError)?.message ||
          "Đã có lỗi xảy ra!!!",
      });
    }
    if (getListProducts.data) {
      setDataTable(
        getListProducts.data.data?.products.map((d, i) => ({
          ...d,
          key: d.productId,
          index:
            (getListProducts.data.data.pageNumber - 1) *
              getListProducts.data.data.pageSize +
            i +
            1,
        }))
      );

      form.setFieldValue("pageNumber", getListProducts.data.data.pageNumber);
      form.setFieldValue("pageSize", getListProducts.data.data.pageSize);
      form.setFieldValue(
        "totalProducts",
        getListProducts.data.data.totalProducts
      );
    }
  }, [getListProducts.data, getListProducts.isError, getListProducts.error]);

  useEffect(() => {
    if (isError) {
      errorMessage({
        description: (error as AxiosError)?.message || "API Failed",
      });
    }
  }, [isError, error]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-gray-800">
          Quản lý Món Ăn
        </h1>
        <ButtonComponent
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenModal(true)}
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2"
        >
          Thêm Món Ăn
        </ButtonComponent>
      </div>
      <div className="mt-5 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TableProduct
            onSelected={onSelected}
            dataTable={dataTable}
            refetch={getListProducts.refetch}
            loading={getListProducts.isLoading || getListProducts.isFetching}
            form={form}
            onOk={onOk}
          />
        </div>
      </div>
      <Modal
        footer={null}
        width={900}
        onCancel={onCancel}
        title={
          <span
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#fff",
              background: "linear-gradient(90deg, #4A90E2, #50E3C2)",
              padding: "10px 20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              display: "inline-block",
            }}
          >
            {selectedProduct === undefined
              ? "✨ Thêm Món Ăn Mới"
              : "🛠️ Chỉnh Sửa"}
          </span>
        }
        open={openModal}
      >
        <AddOrEditProduct
          refetch={getListProducts.refetch}
          onCancel={onCancel}
          productData={selectedProduct}
          isLoading={isLoading}
          category={category}
        />
      </Modal>
    </div>
  );
};
export default ListProduct;
