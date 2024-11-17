import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Tooltip, Typography } from "antd";
import formatter from "~/common/utils/formatter";
import { TABLE_STATUS } from "~/pages/Admin/Tables/components/const";
import { TableData } from "~/services/table";
import { CheckCircleOutlined } from "@ant-design/icons";

interface IProps {
  selectedTable: TableData | null;
  onCheckout: (tableId: number) => void;
}

const FooterTableOrder = ({ selectedTable, onCheckout }: IProps) => {
  return (
    <div
      style={{
        marginTop: "20px",
        width: "100%",
        padding: "16px",
        borderRadius: "12px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        gap: "16px",
      }}
    >
      {/* Tooltip Section */}
      <Space size="middle">
        <Tooltip title={formatter(TABLE_STATUS.UNDER_REPAIR)}>
          <InfoCircleOutlined style={{ color: "#ff4d4f", fontSize: "22px" }} />
        </Tooltip>
        <Tooltip title={formatter(TABLE_STATUS.IN_USE)}>
          <InfoCircleOutlined style={{ color: "#722ed1", fontSize: "22px" }} />
        </Tooltip>
        <Tooltip title={formatter(TABLE_STATUS.AVAILABLE)}>
          <InfoCircleOutlined style={{ color: "#52c41a", fontSize: "22px" }} />
        </Tooltip>
        <Tooltip title={formatter(TABLE_STATUS.BOOKED)}>
          <InfoCircleOutlined style={{ color: "#fa8c16", fontSize: "22px" }} />
        </Tooltip>
      </Space>

      {/* Divider */}
      <Divider
        type="vertical"
        style={{
          height: "40px",
          backgroundColor: "#d9d9d9",
          margin: "0 16px",
        }}
      />

      {/* Selected Table Info & Checkout Button */}
      <div style={{ textAlign: "right", flex: "1" }}>
        <Typography.Text type="secondary" style={{ fontSize: "14px" }}>
          Selected Table
        </Typography.Text>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            color: "#333",
            fontWeight: 500,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {selectedTable?.tableName || "N/A"}
        </Typography.Title>
      </div>

      {/* Checkout Button */}
      <Button
        type="primary"
        disabled={!selectedTable}
        onClick={() => selectedTable && onCheckout(selectedTable.tableId)}
        style={{
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          borderRadius: "8px",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center", 
          fontSize: "16px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out", 
        }}
        className="hover:bg-blue-500 active:bg-blue-600" // Hover and active state for better interactivity
      >
        {/* Add Icon */}
        <Space>
          <CheckCircleOutlined style={{ fontSize: "18px", color: "#fff" }} />
          <span>Thanh toán bàn</span>
        </Space>
      </Button>
    </div>
  );
};

export default FooterTableOrder;
