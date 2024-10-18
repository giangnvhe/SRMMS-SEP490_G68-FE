import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import classNames from "classnames";
import { HTMLAttributes, TdHTMLAttributes } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnsType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowSelection?: TableRowSelection<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRow?: (
    record: any,
    index?: string | number
  ) => HTMLAttributes<any> | TdHTMLAttributes<any>;
  onChange?: TableProps["onChange"];
  loading?: boolean;
  pagination?: false | TablePaginationConfig;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClassName?: (record: any) => string | string;
  virtual?: boolean;
  scroll?: {
    x?: string | number | true | undefined;
    y?: string | number | undefined;
  };
  rowHoverable?: boolean;
  cellPaddingInline?: number;
  cellPaddingBlock?: number;
  headerBorderRadius?: number;
}

const TableComponent = ({
  className = "",
  columns,
  dataSource = [],
  loading,
  pagination,
  onChange,
  rowClassName,
  virtual = false,
  scroll = { x: 1366, y: 400 },
  rowSelection,
  onRow = () => {
    return {};
  },
  cellPaddingInline = 8,
  cellPaddingBlock = 8,
  headerBorderRadius = 8,
}: Props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            cellPaddingInline: cellPaddingInline,
            cellPaddingBlock: cellPaddingBlock,
            headerBorderRadius: headerBorderRadius,
          },
        },
      }}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        className={cx(styles["table-component"], { [className]: !!className })}
        loading={{
          indicator: <LoadingOutlined spin />,
          size: "large",
          spinning: loading,
        }}
        pagination={
          pagination == false
            ? false
            : {
                showQuickJumper: true,
                showSizeChanger: true,
                ...pagination,
              }
        }
        onChange={onChange}
        rowKey={(data) => data.key}
        virtual={virtual}
        scroll={scroll}
        rowClassName={rowClassName}
        onRow={(record, index) => {
          return onRow?.(record, index);
        }}
        rowSelection={rowSelection}
      />
    </ConfigProvider>
  );
};

export default TableComponent;
