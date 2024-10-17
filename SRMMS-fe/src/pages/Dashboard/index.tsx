import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Dashboard = () => {
  return (
    <div className="bg-slate-100 h-[700px] w-full overflow-auto">
      <div className="p-8">
        <p className="font-bold text-3xl">Dashboard</p>
        <div className="mt-5">
          <Card style={{ width: 300 }}>
            <div className="flex justify-between">
              <div>
                <div>Total User</div>
                <div>40,689</div>
              </div>
              <div>
                <UserOutlined style={{ fontSize: 50 }} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
