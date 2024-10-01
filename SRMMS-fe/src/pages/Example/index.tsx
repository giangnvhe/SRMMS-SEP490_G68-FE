import { GetProp, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import TableComponent from "../../components/TableComponent";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

const index = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const dataSource: DataType[] = [];
  for (let i = 0; i < 50; i++) {
    dataSource.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

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

  const rowSelection = {};

  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default index;
