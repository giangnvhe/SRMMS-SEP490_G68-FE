import { Col, Form, FormInstance, Row, TableProps } from "antd";
import classNames from "classnames";
import { PAGE_NUMBER, PAGE_SIZE } from "~/common/const/pagingation";
import ButtonComponent from "~/components/ButtonComponent";
import InputComponent from "~/components/InputComponent";
import TableComponent from "~/components/TableComponent";
import UseColumn from "./colums";
import styles from "./index.module.scss";
import { AccountData } from "~/services/account";
import { useEffect, useMemo, useState } from "react";
import SelectComponent, { Option } from "~/components/SelectComponent";
import { useQuery } from "react-query";
import { getRoles } from "~/services/role";
import useNotification from "~/hooks/useNotification";
import { AxiosError } from "axios";
const cx = classNames.bind(styles);

interface IProps {
  dataTable: AccountData[] | [];
  refetch: () => void;
  loading: boolean;
  form: FormInstance;
  onSelected: (id: AccountData | undefined) => void;
  onOk: (key: string) => void;
}

export interface FormFields {
  name: string;
  description: string;
  pagination: { pageNumber: number; pageSize: number };
  pageNumber: number;
  pageSize: number;
  totalEmployees: number;
  totalCustomers: number;
}

const initialValue = {
  name: null,
  description: null,
  pageNumber: PAGE_NUMBER,
  pageSize: PAGE_SIZE,
};

const TableEmployee = ({
  dataTable,
  refetch,
  loading,
  form,
  onSelected,
  onOk,
}: IProps) => {
  const columns = UseColumn({ onSelected, onOk });
  const [role, setRole] = useState<Option[] | []>([]);
  const { errorMessage } = useNotification();

  const { isLoading, isError, error } = useQuery("role", getRoles, {
    onSuccess: (result) => {
      setRole(
        result.data
          .filter((value: any) => value.roleId !== 1 && value.roleId !== 5)
          .map((value: any) => ({
            label: value.roleName,
            value: `${value.roleId}`,
          }))
      );
    },
  });

  useEffect(() => {
    if (isError) {
      errorMessage({
        description: (error as AxiosError)?.message || "API Failed",
      });
    }
  }, [isError, error]);

  const handleTableChange: TableProps["onChange"] = (pagination) => {
    form.setFieldValue("pageSize", pagination.pageSize);
    form.setFieldValue("pageNumber", pagination.current);
    refetch();
  };

  const onSubmitTable = () => {
    form.setFieldValue("pageNumber", PAGE_NUMBER);
    form.setFieldValue("pageSize", PAGE_SIZE);
    refetch();
  };

  const filteredDataTable = useMemo(() => {
    return dataTable.filter(
      (account) =>
        account.roleName !== "Admin" && account.roleName !== "Khách hàng"
    );
  }, [dataTable]);

  return (
    <div className="">
      <Form form={form} onFinish={onSubmitTable} initialValues={initialValue}>
        <Row gutter={8} className={cx("category-search-table")}>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <InputComponent
              name="accountName"
              form={form}
              placeholder="Tìm kiếm theo tên"
            />
          </Col>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <InputComponent
              name="phone"
              form={form}
              placeholder="Tìm kiếm theo số điện thoại"
            />
          </Col>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <SelectComponent
              name="roleId"
              options={role || []}
              loading={isLoading}
              placeholder="Tìm kiếm theo vị trí"
            />
          </Col>
          <Col sm={{ span: 4 }} xs={{ span: 24 }}>
            <ButtonComponent onClick={() => form.submit()}>
              TÌm Kiếm
            </ButtonComponent>
          </Col>
        </Row>
      </Form>
      <TableComponent
        columns={columns}
        onChange={handleTableChange}
        dataSource={filteredDataTable}
        loading={loading}
        pagination={{
          current: form.getFieldValue("pageNumber"),
          pageSize: form.getFieldValue("pageSize"),
          total: form.getFieldValue("totalEmployees"),
        }}
        scroll={{ x: 1700 }}
      />
    </div>
  );
};

export default TableEmployee;
