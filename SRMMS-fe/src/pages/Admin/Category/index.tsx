import ButtonComponent from "~/components/ButtonComponent";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TableCategory from "./TableCategory";
import {
  CategoryData,
  deleteCategory,
  FormFields,
  getListCategory,
} from "~/services/category_product";
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import useNotification from "~/hooks/useNotification";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import AddOrEditCategory from "./AddOrEditCategory";

const CategoryAdmin = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryData | undefined
  >(undefined);
  const [openModal, setOpenModal] = useState(false);
  const { errorMessage, successMessage } = useNotification();

  const getListCategories = useQuery("getListCategories", () =>
    getListCategory(form.getFieldsValue(true))
  );
  

  const deleteCategorys = useMutation(deleteCategory, {
    onSuccess: () => {
      successMessage({ description: "Xóa thành công" });
      getListCategories.refetch();
    },
    onError: (error: AxiosError) => {
      errorMessage({ description: error.message || "Đã có lỗi xảy ra, xóa thất bại!!" });
    },
  });

  const onOk = async (key: string) => {
    deleteCategorys.mutate(key);
  };



  const onSelected = (id: CategoryData | undefined) => {
    setSelectedCategory(id);
    setOpenModal(true);
  };

  const onCancel = () => {
    setSelectedCategory(undefined);
    setOpenModal(false);
  };

  useEffect(() => {
    if (getListCategories.isError) {
      errorMessage({
        description:
          (getListCategories.error as AxiosError)?.message ||
          "Đã có lỗi xảy ra!!!",
      });
    }
    if (getListCategories.data) {
      setDataTable(
        getListCategories.data.data?.map((d) => ({ ...d, key: d.catId }))
      );
    }
  }, [
    getListCategories.data,
    getListCategories.isError,
    getListCategories.error,
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-gray-800">
          Management Category
        </h1>
        <ButtonComponent
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenModal(true)}
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2"
        >
          Create Category
        </ButtonComponent>
      </div>
      <div className="mt-5 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TableCategory
            onSelected={onSelected}
            dataTable={dataTable}
            refetch={getListCategories.refetch}
            loading={
              getListCategories.isLoading || getListCategories.isFetching
            }
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
          selectedCategory == undefined
            ? "Add New Category"
            : "Edit Category"
        }
        open={openModal}
      >
        <AddOrEditCategory
          refetch={getListCategories.refetch}
          onCancel={onCancel}
          categoryData={selectedCategory}
        />
      </Modal>
    </div>
  );
};

export default CategoryAdmin;
