import { Tooltip, Typography } from "antd";
import { TableData } from "~/services/table";
import { InfoCircleOutlined } from "@ant-design/icons";
import formatter from "~/common/utils/formatter";
import { CONSTANT_TABLE, TABLE_STATUS } from "../const";

interface IProps {
  selectedTable: TableData | null;
}

const FooterTable = ({ selectedTable }: IProps) => {
  return (
    <div
      style={{
        marginTop: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "16px" }}>
        <Tooltip title={formatter(TABLE_STATUS.UNDER_REPAIR)}>
          <InfoCircleOutlined style={{ color: "red", fontSize: "18px" }} />
        </Tooltip>
        <Tooltip title={formatter(TABLE_STATUS.IN_USE)}>
          <InfoCircleOutlined style={{ color: "purple", fontSize: "18px" }} />
        </Tooltip>
        <Tooltip title={formatter(TABLE_STATUS.AVAILABLE)}>
          <InfoCircleOutlined style={{ color: "green", fontSize: "18px" }} />
        </Tooltip>
        <Tooltip title={formatter(TABLE_STATUS.BOOKED)}>
          <InfoCircleOutlined style={{ color: "orange", fontSize: "18px" }} />
        </Tooltip>
      </div>
      <div style={{ gap: "16px", display: "flex", alignItems: "center" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {CONSTANT_TABLE.TABLE} {selectedTable?.tableName || "N/A"}
        </Typography.Title>
      </div>
    </div>
  );
};

export default FooterTable;
