import {
  ArrowLeftOutlined,
  CalendarOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Spin,
  Tag,
  Typography,
} from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { permissionObject } from "~/common/const/permission";
import { useAuth } from "~/context/authProvider";
import { AccountData, getEmployeeById } from "~/services/account";

const { Title } = Typography;
const ProfilePage = () => {
  const { user } = useAuth();
  const [employeeData, setEmployeeData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleGoBack = () => {
    startTransition(() => {
      navigate(-1);
    });
  };

  if (!user) {
    return <p>Vui lòng đăng nhập để xem thông tin.</p>;
  }

  const { id } = user;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const result: AxiosResponse<AccountData> = await getEmployeeById(id);
        setEmployeeData(result.data); // Lưu dữ liệu trả về từ API
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployeeData(); // Gọi API với ID của người dùng
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!employeeData) {
    return <p>Không tìm thấy thông tin nhân viên.</p>;
  }

  const {
    fullName,
    phone,
    roleName,
    status,
    email,
    startDate,
    endDate,
    totalPoints,
  } = employeeData;

  return (
    <Card
      style={{
        maxWidth: 800,
        margin: "0 auto",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Avatar
          size={120}
          icon={<UserOutlined />}
          style={{
            backgroundColor: "#08979C",
            marginRight: 24,
          }}
        />
        <div>
          <Title level={2} style={{ margin: 0 }}>
            {fullName}
          </Title>
          <Tag color={status ? "success" : "error"} style={{ marginTop: 8 }}>
            {status ? "Đang làm việc" : "Nghỉ việc"}
          </Tag>
        </div>
      </div>

      <Divider>Thông Tin Chi Tiết</Divider>

      <Descriptions column={1} bordered layout="horizontal">
        <Descriptions.Item
          label={
            <>
              <MailOutlined style={{ marginRight: 8 }} /> Email
            </>
          }
        >
          {email}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <PhoneOutlined style={{ marginRight: 8 }} /> Số Điện Thoại
            </>
          }
        >
          {phone}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <UserOutlined style={{ marginRight: 8 }} /> Chức Vụ
            </>
          }
        >
          {roleName}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <CalendarOutlined style={{ marginRight: 8 }} /> Ngày Bắt Đầu
            </>
          }
        >
          {moment(startDate).format("YYYY-MM-DD") || "Chưa xác định"}
        </Descriptions.Item>

        {endDate && (
          <Descriptions.Item
            label={
              <>
                <CalendarOutlined style={{ marginRight: 8 }} /> Ngày Kết Thúc
              </>
            }
          >
            {endDate}
          </Descriptions.Item>
        )}
        {roleName === permissionObject.CUSTOMER && (
          <Descriptions.Item
            label={
              <>
                <Tag style={{ marginRight: 8 }}>Điểm tích được</Tag>
              </>
            }
          >
            {totalPoints ?? "Hiện bạn chưa có điểm"}
          </Descriptions.Item>
        )}
      </Descriptions>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 24,
          gap: "10px",
        }}
      >
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
        >
          Quay lại
        </Button>
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{
            backgroundColor: "#08979C",
            borderColor: "#08979C",
          }}
        >
          Chỉnh Sửa Thông Tin
        </Button>
      </div>
      {isPending && <div>Loading...</div>}
    </Card>
  );
};

export default ProfilePage;
