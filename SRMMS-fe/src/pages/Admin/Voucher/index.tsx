import { Form, Modal } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import useNotification from "~/hooks/useNotification";
import {
  changeVoucherStatus,
  DiscountData,
  getDiscount,
} from "~/services/voucher";
import TableVoucher from "./components/TableVoucher";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddOrEditVoucher from "./components/AddOrEdit";

export interface FormFields {
  codeDetail: string;
  startDate: string;
  endDate: string;
  pageNumber: number;
  pageSize: number;
  totalDiscountCode: number;
  status?: boolean;
}

const VoucherManager = () => {
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<DiscountData[]>([]);
  const { errorMessage, successMessage } = useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<
    DiscountData | undefined
  >(undefined);

  const getVouchers = useQuery("getVouchers", () =>
    getDiscount(form.getFieldsValue(true))
  );

  const handleChangeStatus = useMutation(changeVoucherStatus, {
    onSuccess: () => {
      successMessage({
        title: "Thành công",
        description: "Dừng hoạt động voucher thành công",
      });
      getVouchers.refetch();
    },
    onError: (error: AxiosError) => {
      errorMessage({
        title: "Thất bại",
        description: error.message || "Đã có lỗi xảy ra, xóa thất bại!!",
      });
    },
  });

  const onOk = async (key: number) => {
    handleChangeStatus.mutate(key);
  };

  const onSelected = (id: DiscountData | undefined) => {
    setSelectedVoucher(id);
    setOpenModal(true);
  };

  const onCancel = () => {
    setSelectedVoucher(undefined);
    setOpenModal(false);
  };

  useEffect(() => {
    if (getVouchers.isError) {
      errorMessage({
        description:
          (getVouchers.error as AxiosError)?.message || "Đã có lỗi xảy ra!!!",
      });
    }
    if (getVouchers.data) {
      setDataTable(
        getVouchers.data.data?.discountCodes.map((d, i) => ({
          ...d,
          key: d.codeId,
          index:
            (getVouchers.data.data?.pageNumber - 1) *
              getVouchers.data.data?.pageSize +
            (i + 1),
        }))
      );
      form.setFieldValue("pageNumber", getVouchers.data.data.pageNumber);
      form.setFieldValue("pageSize", getVouchers.data.data.pageSize);
      form.setFieldValue(
        "totalDiscountCode",
        getVouchers.data.data.totalDiscountCode
      );
    }
  }, [getVouchers.data, getVouchers.isError, getVouchers.error]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-gray-800">
          Quản Lý Voucher
        </h1>
        <ButtonComponent
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenModal(true)}
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2"
        >
          Thêm Voucher Mới
        </ButtonComponent>
      </div>
      <div className="mt-10 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TableVoucher
            onSelected={onSelected}
            dataTable={dataTable}
            refetch={getVouchers.refetch}
            loading={getVouchers.isLoading || getVouchers.isFetching}
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
            {selectedVoucher === undefined
              ? "✨ Thêm Voucher Mới"
              : "🛠️ Chỉnh Sửa Voucher"}
          </span>
        }
        open={openModal}
      >
        <AddOrEditVoucher
          refetch={getVouchers.refetch}
          onCancel={onCancel}
          voucherData={selectedVoucher}
        />
      </Modal>
    </div>
  );
};

export default VoucherManager;
