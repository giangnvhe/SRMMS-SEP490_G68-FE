import { DownloadOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Select, Space, Spin, Typography } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getRevenueOrder, ResponseRevenue } from "~/services/order";
import { downloadRevenueAsExcel, groupOrdersByDayOfWeek } from "../const";

const { Title, Text } = Typography;
const { Option } = Select;

const RevenueChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [week, setWeek] = useState(1);

  const { data, isLoading, isError, error } = useQuery<ResponseRevenue, Error>(
    ["revenueData", { year, month, week }],
    () => getRevenueOrder({ year, month, week }),
    {
      keepPreviousData: true,
      retry: 2,
    }
  );

  const transformedData = data?.orders
    ? groupOrdersByDayOfWeek(data.orders)
    : [];

  const handleDownloadClick = () => {
    if (data) {
      downloadRevenueAsExcel(transformedData, {
        totalRevenue: data.totalRevenue,
        orders: data.orders,
      });
    }
  };

  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <div>
            <Title level={5} className="mb-0">
              Tổng Doanh Thu
            </Title>
            <Text strong className="text-2xl text-green-500">
              ${data?.totalRevenue?.toLocaleString() || "0"}
            </Text>
          </div>
          <Button
            type="primary"
            shape="circle"
            icon={<DownloadOutlined />}
            className="bg-green-500 border-green-500 mx-2"
            onClick={handleDownloadClick}
            disabled={isLoading || !data}
          />
        </div>
      }
      extra={
        <Space>
          <Select
            value={year}
            style={{ width: 100 }}
            onChange={(value) => setYear(value)}
            disabled={isLoading}
          >
            {[2022, 2023, 2024].map((y) => (
              <Option key={y} value={y}>
                {y}
              </Option>
            ))}
          </Select>
          <Select
            value={month}
            style={{ width: 100 }}
            onChange={(value) => setMonth(value)}
            disabled={isLoading}
          >
            {[...Array(12)].map((_, i) => (
              <Option key={i + 1} value={i + 1}>
                {i + 1}
              </Option>
            ))}
          </Select>
          <Select
            value={week}
            style={{ width: 100 }}
            onChange={(value) => setWeek(value)}
            disabled={isLoading}
          >
            {[...Array(4)].map((_, i) => (
              <Option key={i + 1} value={i + 1}>{`Week ${i + 1}`}</Option>
            ))}
          </Select>
        </Space>
      }
      bordered
      className="my-4"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Spin size="large" />
        </div>
      ) : isError ? (
        <Alert
          message="Error"
          description={error?.message || "Failed to load revenue data"}
          type="error"
        />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#52c41a"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default RevenueChart;
