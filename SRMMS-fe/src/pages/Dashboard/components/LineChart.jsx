import { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Select, Divider } from "antd";
import dayjs from "dayjs";
import { mockLineData } from "../../../mocks/mockLineData";

const { Option } = Select;

const LineChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 Days");

  // Generate real month options dynamically (last 12 months)
  const generateMonthOptions = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = dayjs().subtract(i, "month").format("M/YYYY");
      months.push(month);
    }
    return months.map((month) => (
      <Option key={month} value={month}>
        {month}
      </Option>
    ));
  };

  // Get filtered data based on the selected period
  const getFilteredData = () => {
    if (selectedPeriod === "Last 7 Days") {
      return (
        mockLineData.find((dataset) => dataset.id === "Last 7 Days")?.data || []
      );
    } else if (selectedPeriod === "Last 30 Days") {
      return (
        mockLineData.find((dataset) => dataset.id === "Last 30 Days")?.data ||
        []
      );
    } else if (selectedPeriod === "YTD") {
      return mockLineData.find((dataset) => dataset.id === "YTD")?.data || [];
    } else {
      // Find data for the selected month (e.g., "9/2024")
      return (
        mockLineData.find((dataset) => dataset.id === selectedPeriod)?.data ||
        []
      );
    }
  };

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  // Dynamic tick values based on the selected period
  const getXAxisTicks = () => {
    switch (selectedPeriod) {
      case "Last 7 Days":
        return 1; // Show a tick for every day
      case "Last 30 Days":
        return 3; // Show a tick for every three days
      default:
        return "every month"; // Monthly ticks for other ranges
    }
  };

  // Dynamic tick format based on the selected period
  const getXFormatTicks = () => {
    switch (selectedPeriod) {
      case "Last 7 Days":
      case "Last 30 Days":
        return (value) => dayjs(value).format("DD/MM");
      default:
        return (value) => value;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header with Revenue and Period Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        {/* Period Selector */}
        <Select
          style={{ width: 200 }}
          value={selectedPeriod}
          onChange={handlePeriodChange}
          placeholder="Select Period"
        >
          <Option value="Last 7 Days">Last 7 Days</Option>
          <Option value="Last 30 Days">Last 30 Days</Option>
          <Option value="YTD">Year to Date (YTD)</Option>
          {generateMonthOptions()}
        </Select>
      </div>

      <Divider />

      {/* Line Chart */}
      <div style={{ height: "300px" }}>
        <ResponsiveLine
          data={[{ id: selectedPeriod, data: getFilteredData() }]}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: "#777777",
                },
              },
              ticks: {
                line: {
                  stroke: "#777777",
                  strokeWidth: 1,
                },
                text: {
                  fill: "#333333",
                },
              },
            },
            tooltip: {
              container: {
                background: "#ffffff",
                color: "#333333",
              },
            },
          }}
          colors={{ scheme: "nivo" }}
          margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: "Date",
            legendOffset: 50,
            legendPosition: "middle",
            format: getXFormatTicks(),
            tickValues: getXAxisTicks(),
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Revenue ($)",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </div>
    </div>
  );
};

export default LineChart;
