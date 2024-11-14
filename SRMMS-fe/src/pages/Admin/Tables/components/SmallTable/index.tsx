import { Typography } from "antd";
import { TableData } from "~/services/table";

interface IProps {
  table: TableData;
}

const SmallTable = ({ table }: IProps) => {
  return (
    <div
      style={{
        position: "relative",
        width: 128, // Equivalent to Tailwind's w-32
        height: 100, // Equivalent to Tailwind's h-32
      }}
    >
      {/* Table Surface */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#e0e0e0", // grey.200 equivalent
          borderRadius: 8, // rounded-lg
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography.Title level={4} style={{ fontWeight: "bold" }}>
          {table.tableName}
        </Typography.Title>
      </div>

      {/* Chairs */}
      {/* Left Center Chair */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translate(-150%, -50%)",
          width: 8, // Equivalent to w-2
          height: 70, // Equivalent to h-8
          backgroundColor: "#d0d0d0", // grey.300 equivalent
          borderRadius: 4,
        }}
      />

      {/* Right Center Chair */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translate(150%, -50%)",
          width: 8,
          height: 70,
          backgroundColor: "#d0d0d0",
          borderRadius: 4,
        }}
      />
    </div>
  );
};

export default SmallTable;
