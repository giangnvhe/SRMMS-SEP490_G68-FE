import { PlusCircleOutlined } from "@ant-design/icons";
import { Form, Modal } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ButtonComponent from "~/components/ButtonComponent";
import { Option } from "~/components/SelectComponent";
import useNotification from "~/hooks/useNotification";
import { AccountData, deleteAccount, getListAccount } from "~/services/account";
import { getRoles } from "~/services/role";
import AddOrEditAccount from "./AddOrEditAccount";
import TableEmployee, { FormFields } from "./TableAccount";

const ListEmployee = () => {
  const [form] = Form.useForm<FormFields>();
  const [dataTable, setDataTable] = useState<AccountData[]>([]);
  const { errorMessage, successMessage } = useNotification();
  const [roles, setRoles] = useState<Option[] | []>([]);
  const [selectedAccount, setSelectedAccount] = useState<
    AccountData | undefined
  >(undefined);
  const [openModal, setOpenModal] = useState(false);

  const getAllAccount = useQuery("getAllEmployees", () =>
    getListAccount(form.getFieldsValue(true))
  );

  const { isLoading, isError, error } = useQuery("role-admin", getRoles, {
    onSuccess: (result) => {
      setRoles(
        result.data.filter((value: any) => value.roleId !== 1 && value.roleId !== 5).map((value: any) => ({
          label: value.roleName,
          value: value.roleId,
        }))
      );
    },
  });

  const deleAccount = useMutation(deleteAccount, {
    onSuccess: () => {
      successMessage({ description: "Xóa thành công" });
      getAllAccount.refetch();
    },
    onError: (error: AxiosError) => {
      errorMessage({
        description: error.message || "Đã có lỗi xảy ra, xóa thất bại!!",
      });
    },
  });

  const onOk = async (key: string) => {
    deleAccount.mutate(key);
  };

  const onSelected = (id: AccountData | undefined) => {
    setSelectedAccount(id);
    setOpenModal(true);
  };

  const onCancel = () => {
    setSelectedAccount(undefined);
    setOpenModal(false);
  };

  useEffect(() => {
    if (getAllAccount.isError) {
      errorMessage({
        description:
          (getAllAccount.error as AxiosError)?.message || "Đã có lỗi xảy ra!!!",
      });
    }
    if (getAllAccount.data) {
      setDataTable(
        getAllAccount.data.data?.accounts.map((d, i) => ({
          ...d,
          key: d.accountId,
          index:
            (getAllAccount.data.data.pageNumber - 1) *
              getAllAccount.data.data.pageSize +
            (i + 1),
        }))
      );
      form.setFieldValue("pageNumber", getAllAccount.data.data.pageNumber);
      form.setFieldValue("pageSize", getAllAccount.data.data.pageSize);
      form.setFieldValue(
        "totalEmployees",
        getAllAccount.data.data.totalEmployees
      );
    }
  }, [getAllAccount.data, getAllAccount.isError, getAllAccount.error]);

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
          Quản Lý Nhân Viên
        </h1>
        <ButtonComponent
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenModal(true)}
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2"
        >
          Thêm Nhân Viên Mới
        </ButtonComponent>
      </div>
      <div className="mt-10 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TableEmployee
            onSelected={onSelected}
            dataTable={dataTable}
            refetch={getAllAccount.refetch}
            loading={getAllAccount.isLoading || getAllAccount.isFetching}
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
            {selectedAccount === undefined
              ? "✨ Thêm Nhân Viên Mới"
              : "🛠️ Chỉnh Sửa Nhân Viên"}
          </span>
        }
        open={openModal}
      >
        <AddOrEditAccount
          refetch={getAllAccount.refetch}
          onCancel={onCancel}
          accountData={selectedAccount}
          isLoading={isLoading}
          role={roles}
        />
      </Modal>
    </div>
  );
};

export default ListEmployee;
