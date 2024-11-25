import { PlusCircleOutlined } from "@ant-design/icons";
import { Form, Modal } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import useNotification from "~/hooks/useNotification";
import {
  ComboData,
  deleteComboProduct,
  FormFields,
  getLisComboProduct,
} from "~/services/combos";
import ComboTable from "./components/ComboTable";
import AddOrEditCombos from "./components/AddOrEditCombo";

const CombosManager = () => {
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<ComboData[]>([]);
  const { errorMessage, successMessage } = useNotification();
  const [selectedCombo, setSelectedCombo] = useState<ComboData | undefined>(
    undefined
  );
  const [openModal, setOpenModal] = useState(false);

  const getListCombos = useQuery("getListCategories", () =>
    getLisComboProduct(form.getFieldsValue(true))
  );

  const deleCombo = useMutation(deleteComboProduct, {
    onSuccess: () => {
      successMessage({ description: "Xóa thành công" });
      getListCombos.refetch();
    },
    onError: (error: AxiosError) => {
      errorMessage({
        description: error.message || "Đã có lỗi xảy ra, xóa thất bại!!",
      });
    },
  });

  const onOk = async (key: string) => {
    deleCombo.mutate(key);
  };

  const onSelected = (id: ComboData | undefined) => {
    setSelectedCombo(id);
    setOpenModal(true);
  };

  const onCancel = () => {
    setSelectedCombo(undefined);
    setOpenModal(false);
  };

  useEffect(() => {
    if (getListCombos.isError) {
      errorMessage({
        description:
          (getListCombos.error as AxiosError)?.message || "Đã có lỗi xảy ra!!!",
      });
    }
    if (getListCombos.data) {
      const combos = getListCombos.data.data?.combos;

      // Check if combos is an array before calling map
      if (getListCombos.data) {
        setDataTable(
          getListCombos.data.data?.combos.map((d, i) => ({
            ...d,
            key: d.comboId,
            index:
              (getListCombos.data.data.pageNumber - 1) *
                getListCombos.data.data.pageSize +
              i +
              1,
          }))
        );
      }

      form.setFieldValue("pageNumber", getListCombos.data.data.pageNumber);
      form.setFieldValue("pageSize", getListCombos.data.data.pageSize);
      form.setFieldValue("totalCount", getListCombos.data.data.totalCount);
    }
  }, [getListCombos.data, getListCombos.isError, getListCombos.error]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-gray-800">
          Danh Sách Combos
        </h1>
        <ButtonComponent
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenModal(true)}
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2"
        >
          Thêm Combo Mới
        </ButtonComponent>
      </div>
      <div className="mt-5 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ComboTable
            onSelected={onSelected}
            dataTable={dataTable}
            refetch={getListCombos.refetch}
            loading={getListCombos.isLoading || getListCombos.isFetching}
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
            {selectedCombo === undefined ? "✨ Thêm Loại Mới" : "🛠️ Chỉnh Sửa"}
          </span>
        }
        open={openModal}
      >
        <AddOrEditCombos
          refetch={getListCombos.refetch}
          onCancel={onCancel}
          comboData={selectedCombo}
        />
      </Modal>
    </div>
  );
};

export default CombosManager;
