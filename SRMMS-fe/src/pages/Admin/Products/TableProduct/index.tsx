import { Col, Form, FormInstance, Row, TableProps } from "antd";
import TableComponent from "~/components/TableComponent";
import { getCategorySelect, ProductData } from "~/services/product";
import UseColumn from "./column";
import { PAGE_NUMBER, PAGE_SIZE } from "~/common/const/pagingation";
import InputComponent from "~/components/InputComponent";
import ButtonComponent from "~/components/ButtonComponent";
import styles from "./index.module.scss";
import classNames from "classnames";
import SelectComponent, { Option } from "~/components/SelectComponent";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import useNotification from "~/hooks/useNotification";
const cx = classNames.bind(styles);
interface IProps {
  dataTable: ProductData[] | [];
  refetch: () => void;
  loading: boolean;
  form: FormInstance;
  onSelected: (id: ProductData | undefined) => void;
  onOk: (key: string) => void;
}

const initialValue = {
  name: null,
  categoryId: null,
  pageNumber: PAGE_NUMBER,
  pageSize: PAGE_SIZE,
};

const TableProduct = ({
  dataTable,
  refetch,
  loading,
  onSelected,
  form,
  onOk,
}: IProps) => {
  const columns = UseColumn({ onSelected, onOk });
  const [category, setCategory] = useState<Option[] | []>([]);
  const { errorMessage } = useNotification();

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

  return (
    <div>
      <Form form={form} onFinish={onSubmitTable} initialValues={initialValue}>
        <Row gutter={8} className={cx("product-search-table")}>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <InputComponent
              name="name"
              form={form}
              placeholder="Tìm kiếm theo tên"
            />
          </Col>
          <Col md={{ span: 6 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <SelectComponent
              name="categoryId"
              options={category || []}
              loading={isLoading}
              placeholder="Tìm kiếm theo danh mục"
            />
          </Col>
          <Col sm={{ span: 4 }} xs={{ span: 24 }}>
            <ButtonComponent onClick={() => form.submit()}>
              Tìm Kiếm
            </ButtonComponent>
          </Col>
        </Row>
      </Form>
      <TableComponent
        columns={columns}
        dataSource={dataTable}
        onChange={handleTableChange}
        loading={loading}
        pagination={{
          current: form.getFieldValue("pageNumber"),
          pageSize: form.getFieldValue("pageSize"),
          total: form.getFieldValue("totalProducts"),
        }}
        scroll={{ x: 1700 }}
      />
    </div>
  );
};

export default TableProduct;
