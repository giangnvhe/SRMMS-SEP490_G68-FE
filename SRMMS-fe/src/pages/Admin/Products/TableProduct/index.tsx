import { useState } from "react";
import TableComponent from "~/components/TableComponent";
import UseColumn, { DataType } from "./column";
import { GetProp, TablePaginationConfig, TableProps } from "antd";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const TableProduct = () => {
  
  const columns = UseColumn();

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams((old) => ({
      ...old,
      ...filters,
      ...sorter,
      pagination: {
        ...old.pagination,
        ...pagination,
      },
    }));
  };

  const dataSource: DataType[] = [];
  for (let i = 0; i < 50; i++) {
    dataSource.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  
  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TableProduct;
