import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import formatter from "~/common/utils/formatter";
import ButtonComponent from "~/components/ButtonComponent";
import { TableData } from "~/services/table";
import { TABLE_STATUS } from "../const";
import { useAuth } from "~/context/authProvider";

interface IProps {
  selectedTable: TableData | undefined;
  refetch: () => void;
  onSelected: (id: TableData | undefined) => void;
}

const FooterTable = ({ selectedTable, onSelected }: IProps) => {
  const { user } = useAuth();
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
          Đang chọn : {selectedTable?.tableName || "N/A"}
        </Typography.Title>
        {user && (user.roleName === "Admin" || user.roleName === "Quản lý") && (
          <ButtonComponent
            className="rounded-lg"
            disabled={!selectedTable}
            onClick={() => onSelected(selectedTable)}
          >
            Cập nhật
          </ButtonComponent>
        )}
      </div>
    </div>
  );
};

export default FooterTable;
