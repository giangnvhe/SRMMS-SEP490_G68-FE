import CardDashboard from "./CardDashboard";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "node_modules/chart.js/dist/types/utils";
import { Bar, Doughnut } from "react-chartjs-2";
import styles from "./index.module.scss";
import classNames from "classnames";

const cx = classNames.bind(styles);

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = () => {
  // Bar Chart Data
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "New Users",
        data: [50, 100, 200, 400, 350, 600],
        backgroundColor: "#4a90e2",
      },
    ],
  };

  const barOptions: _DeepPartialObject<ChartOptions<"bar">> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Monthly New Users" },
    },
  };

  const doughnutData = {
    labels: ["Active", "Inactive", "New"],
    datasets: [
      {
        label: "User Types",
        data: [300, 100, 50],
        backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
      },
    ],
  };

  const doughnutOptions: _DeepPartialObject<ChartOptions<"doughnut">> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "right" },
      title: { display: true },
    },
  };

  return (
    <div className="bg-slate-100 h-[700px] w-full overflow-auto">
      <div className="p-8">
        <p className="font-bold text-3xl">Dashboard</p>
        <div className="mt-5">
          <CardDashboard />
        </div>
        <div className={cx(styles["chart-container"])}>
          <div className={cx("bar-chart")}>
            <p className="font-bold text-xl mb-4">User Growth (Bar Chart)</p>
            <Bar data={barData} options={barOptions} />
          </div>

          <div className={cx("doughnut-chart")}>
            <p className="font-bold text-xl mb-4">
              User Types (Doughnut Chart)
            </p>
            <div className="w-[500px] h-[300px] mx-auto">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
