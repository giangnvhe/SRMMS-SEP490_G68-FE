import {
  Button,
  Col,
  Divider,
  Input,
  Modal,
  QRCode,
  Row,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { formatVND } from "~/common/utils/formatPrice";
import { AccountCusData, getListCustomers } from "~/services/api_customer";
import { DiscountData, getDiscount } from "~/services/voucher";

interface IProps {
  totalAmount: number;
  onPayNow: () => void;
  isPaying: boolean;
}

const PaymentMethod = ({ totalAmount, onPayNow, isPaying }: IProps) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<DiscountData | null>(
    null
  );
  const [selectedAccount, setSelectedAccount] = useState<AccountCusData | null>(
    null
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [searchPhone, setSearchPhone] = useState("");

  const { data: voucherData, isLoading } = useQuery(
    "availableVouchers",
    () =>
      getDiscount({
        pageNumber,
        pageSize: 10,
        status: true,
        codeDetail: "",
        startDate: "",
        endDate: "",
        totalDiscountCode: 0,
      }),
    {
      enabled: showVoucherModal,
    }
  );

  const { data: accountData, isLoading: isAccountLoading } = useQuery(
    "accountList",
    () =>
      getListCustomers({
        pageNumber: 1,
        pageSize: 10,
        name: "",
        description: "",
        totalCustomers: 0,
      }),
    {
      enabled: showAccountModal,
    }
  );

  const dataTable = voucherData?.data?.discountCodes || [];
  const filteredDataTable = dataTable.filter(
    (voucher) => voucher.status === true
  );

  const dataAccount =
    accountData?.data.accounts?.filter((account) =>
      account.phone.includes(searchPhone)
    ) || [];

  const CONSTANT = {
    cash: "Tiền Mặt",
    card: "Chuyển Khoản",
    other: "Voucher",
    addPoint: "Tích điểm",
    payNow: "Thanh toán ngay",
    payment: "Thanh toán",
    paymentMethod: "Phương Thức Thanh Toán",
    remove: "Xóa",
  };

  const handleBankTransferClick = () => {
    setShowQRCode(true);
  };

  const cancel = () => {
    setShowQRCode(false);
  };

  //discount code
  const handleVoucherClick = () => {
    setShowVoucherModal(true);
  };

  const handleSelectVoucher = (voucher: DiscountData) => {
    setSelectedVoucher(voucher);
    setShowVoucherModal(false);
  };

  const handleRemoveVoucher = () => {
    setSelectedVoucher(null);
  };

  const calculateDiscountedTotal = () => {
    if (!selectedVoucher) return totalAmount;

    const { discountValue, discountType } = selectedVoucher;

    if (discountType === 0) {
      const discountAmount = totalAmount * (discountValue / 100);
      return Math.max(0, totalAmount - discountAmount);
    }

    if (discountType === 1) {
      return Math.max(0, totalAmount - discountValue);
    }

    return totalAmount;
  };

  // account point
  const handleSelectAccount = (account: AccountCusData) => {
    setSelectedAccount(account); // Store selected account
    setShowAccountModal(false); // Close the account modal
  };

  const handleAccountClick = () => {
    setShowAccountModal(true);
  };
  const handleRemoveAccount = () => {
    setSelectedAccount(null); // Clear the selected account
  };

  //column discount code
  const voucherColumns = [
    {
      title: "Mã Voucher",
      dataIndex: "codeDetail",
      key: "codeDetail",
    },
    {
      title: "Giá trị",
      dataIndex: "discountValue",
      width: 100,
      render: (_: any, record: DiscountData) => {
        const { discountValue, discountType } = record;
        const formattedValue =
          discountType === 1
            ? `${formatVND(discountValue)}`
            : `${discountValue}%`;
        return (
          <div className="truncate text-sm text-gray-700">{formattedValue}</div>
        );
      },
    },
    {
      title: "Hạn Sử Dụng",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (text: string, record: DiscountData) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleSelectVoucher(record)}
        >
          Chọn
        </Button>
      ),
    },
  ];

  const accountColumns = [
    {
      title: "Tên Tài Khoản",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Điểm",
      dataIndex: "totalPoints",
    },
    {
      title: "Hành Động",
      key: "action",
      render: (text: string, record: AccountCusData) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleSelectAccount(record)}
        >
          Chọn
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title style={{ margin: 0 }} level={4}>
        {CONSTANT.paymentMethod.toUpperCase()}
      </Typography.Title>
      <Divider />
      <Row gutter={[16, 16]} style={{ margin: "20px 0 0 0" }}>
        <Col xs={24} sm={8} md={8} lg={8}>
          <Button
            type="default"
            style={{ height: 50, width: "100%" }}
            onClick={cancel}
          >
            {CONSTANT.cash.toUpperCase()}
          </Button>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8}>
          <Button
            type="default"
            style={{ height: 50, width: "100%" }}
            onClick={handleBankTransferClick}
          >
            {CONSTANT.card.toUpperCase()}
          </Button>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8}>
          <Button
            type="default"
            style={{ height: 50, width: "100%" }}
            onClick={handleVoucherClick}
          >
            {CONSTANT.other.toUpperCase()}
          </Button>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8}>
          <Button
            type="default"
            style={{ height: 50, width: "100%" }}
            onClick={() => handleAccountClick()}
          >
            {CONSTANT.addPoint.toUpperCase()}
          </Button>
        </Col>
      </Row>

      {/* Voucher Selection Display */}
      {selectedVoucher && (
        <div
          style={{
            marginTop: "16px",
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Text strong>
                Voucher: {selectedVoucher.codeDetail}
              </Typography.Text>
              <Typography.Text type="secondary" style={{ marginLeft: "10px" }}>
                Giảm:{" "}
                {selectedVoucher.discountType === 0
                  ? `${selectedVoucher.discountValue}%`
                  : `${selectedVoucher.discountValue.toLocaleString()} VND`}
              </Typography.Text>
            </Col>
            <Col>
              <Button type="link" onClick={handleRemoveVoucher} danger>
                {CONSTANT.remove}
              </Button>
            </Col>
          </Row>
        </div>
      )}
      {selectedAccount && (
        <div
          style={{
            marginTop: "16px",
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Text strong>
                Số điện thoại: {selectedAccount.phone}
              </Typography.Text>
              <Typography.Text type="secondary" style={{ marginLeft: "10px" }}>
                Tên: {selectedAccount.fullName}
              </Typography.Text>
            </Col>
            <Col>
              <Button type="link" onClick={handleRemoveAccount} danger>
                {CONSTANT.remove}
              </Button>
            </Col>
          </Row>
        </div>
      )}

      {/* Voucher List Modal */}
      <Modal
        title="Danh Sách Voucher"
        open={showVoucherModal}
        onCancel={() => setShowVoucherModal(false)}
        footer={null}
      >
        <Table
          columns={voucherColumns}
          dataSource={filteredDataTable}
          loading={isLoading}
          rowKey="codeId"
          pagination={{
            total: voucherData?.data?.totalDiscountCode,
            pageSize: voucherData?.data?.pageSize,
            current: voucherData?.data?.pageNumber,
            onChange: (page) => setPageNumber(page),
          }}
        />
      </Modal>

      {/* QR Code Section */}
      {showQRCode && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            marginTop: "20px",
            textAlign: "center",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <QRCode
            value={`BANK_TRANSFER_AMOUNT_${calculateDiscountedTotal()}`}
          />
        </div>
      )}

      <Divider />

      {/* Total Amount Section with Discount */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Typography.Text strong style={{ fontSize: "16px" }}>
          Tổng Thanh Toán:
        </Typography.Text>
        <Typography.Text
          strong
          style={{
            fontSize: "20px",
            marginLeft: "10px",
            color: selectedVoucher ? "red" : "inherit",
          }}
        >
          {calculateDiscountedTotal().toLocaleString()} VND
          {selectedVoucher && (
            <span
              style={{
                textDecoration: "line-through",
                color: "gray",
                marginLeft: "10px",
                fontSize: "14px",
              }}
            >
              {totalAmount.toLocaleString()} VND
            </span>
          )}
        </Typography.Text>
      </div>

      {/* Pay Now Button */}
      <Button
        type="primary"
        block
        style={{ marginTop: "24px", height: 50 }}
        onClick={() =>
          onPayNow(selectedVoucher?.codeId, selectedAccount?.accountId)
        }
        loading={isPaying}
      >
        {CONSTANT.payment.toUpperCase()}
      </Button>

      <Modal
        title="Chọn Tài Khoản"
        open={showAccountModal}
        onCancel={() => setShowAccountModal(false)}
        footer={null}
        width={700}
      >
        <Input
          placeholder="Tìm kiếm theo số điện thoại"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Table
          columns={accountColumns}
          dataSource={dataAccount}
          loading={isLoading}
          rowKey="codeId"
          pagination={{
            total: accountData?.data?.totalCustomers,
            pageSize: accountData?.data?.pageSize,
            current: accountData?.data?.pageNumber,
          }}
        />
      </Modal>
    </div>
  );
};

export default PaymentMethod;
