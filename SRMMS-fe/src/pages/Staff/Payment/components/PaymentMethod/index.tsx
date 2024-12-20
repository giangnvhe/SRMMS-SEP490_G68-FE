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
import { useMutation, useQuery } from "react-query";
import { formatVND } from "~/common/utils/formatPrice";
import { AccountCusData, getListCustomers } from "~/services/api_customer";
import { DiscountData, getDiscount } from "~/services/voucher";
import VietQR from "../VietQR";
import useNotification from "~/hooks/useNotification";
import { PostVietQR, requestVietQr } from "~/services/vietqr";
import { AxiosError, AxiosResponse } from "axios";
import { DataPoint, getPoint } from "~/services/point";
import InvoiceDialog from "~/pages/Invoice";

interface IProps {
  totalAmount: number;
  onPayNow: (discountId?: number, accId?: number, usedPoints?: number) => void;
  isPaying: boolean;
  showInvoice: boolean;
  handleCloseInvoice: () => void;
  orderData: any;
}

const PaymentMethod = ({
  totalAmount,
  onPayNow,
  isPaying,
  showInvoice,
  handleCloseInvoice,
  orderData,
}: IProps) => {
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
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const { errorMessage } = useNotification();
  const [qrUrl, setQrUrl] = useState("");
  const [usedPoints, setUsedPoints] = useState<number>(0);

  const { data: pointData } = useQuery<{ data: DataPoint[] }>(
    "pointConversion",
    getPoint,
    {
      enabled: !!selectedAccount,
    }
  );

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

  const handleCashClick = () => {
    setPaymentMethod("cash"); // Chọn Tiền mặt
    setShowQRCode(false);
  };

  const handleVoucherClick = () => {
    setPaymentMethod("voucher"); // Voucher
    setShowVoucherModal(true);
    setShowQRCode(false);
  };

  const handleAccountClick = () => {
    setPaymentMethod("addPoint"); // Tích điểm
    setShowAccountModal(true);
    setShowQRCode(false);
  };

  const handleVietQr = useMutation(
    ({ data }: { data: requestVietQr }) => PostVietQR(data),
    {
      onError: (error: AxiosError<{ message: string }>) => {
        errorMessage({
          description:
            error.response?.data.message ||
            "Đã có lỗi xảy ra, tạo mới không thành công!!",
        });
      },
    }
  );

  const handleBankTransferClick = () => {
    setPaymentMethod("bank");
    setShowQRCode(true);

    const qrUrl = `https://api.vietqr.io/image/970407-5302122002-st5LSme.jpg?accountName=NGUYEN%20VAN%20GIANG&amount=${calculateDiscountedTotal()}&addInfo=Cam%20on%20quy%20khach`;
    setQrUrl(qrUrl);

    const requestData: requestVietQr = {
      accountNo: selectedAccount?.accountId || "",
      accountName: selectedAccount?.fullName || "",
      acqId: "SomeAcqId",
      addInfo: "Additional information",
      amount: calculateDiscountedTotal().toString(),
      template: "SomeTemplate",
    };

    handleVietQr.mutate({ data: requestData });
  };
  const handleSelectVoucher = (voucher: DiscountData) => {
    setSelectedVoucher(voucher);
    setShowVoucherModal(false);
  };

  const handleRemoveVoucher = () => {
    setSelectedVoucher(null);
  };

  const calculatePointValue = () => {
    if (!pointData?.data || !usedPoints) return 0;

    const { pointToMoneyRate } = pointData.data;
    return usedPoints * pointToMoneyRate;
  };

  const calculateDiscountedTotal = () => {
    let finalTotal = totalAmount;

    if (selectedVoucher) {
      const { discountValue, discountType } = selectedVoucher;
      finalTotal =
        discountType === 0
          ? finalTotal * (1 - discountValue / 100)
          : finalTotal - discountValue;
    }

    finalTotal = Math.max(0, finalTotal - calculatePointValue());

    return finalTotal;
  };

  // account point
  const handleSelectAccount = (account: AccountCusData) => {
    setSelectedAccount(account);
    setUsedPoints(0);
    setShowAccountModal(false);
  };

  const handleRemoveAccount = () => {
    setSelectedAccount(null);
    setUsedPoints(0);
  };

  const handlePayNow = () => {
    onPayNow(
      selectedVoucher?.codeId,
      selectedAccount?.accountId,
      usedPoints || undefined
    );
  };

  const renderAccountSelection = () => {
    if (!selectedAccount) return null;

    return (
      <>
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
              <Typography.Text style={{ marginLeft: "10px", color: "#1890ff" }}>
                Điểm hiện tại: {selectedAccount.totalPoints}
              </Typography.Text>
            </Col>
            <Col>
              <Button type="link" onClick={handleRemoveAccount} danger>
                {CONSTANT.remove}
              </Button>
            </Col>
          </Row>

          {/* Point Input Section */}
          <Row style={{ marginTop: "10px" }}>
            <Col span={24}>
              <Typography.Text>Nhập số điểm sử dụng:</Typography.Text>
              <Input
                type="number"
                value={usedPoints}
                max={selectedAccount.totalPoints}
                onChange={(e) => {
                  const inputPoints = Math.min(
                    Number(e.target.value),
                    selectedAccount.totalPoints
                  );
                  setUsedPoints(inputPoints);
                }}
                placeholder="Nhập số điểm muốn sử dụng"
                style={{ width: "100%", marginTop: "5px" }}
              />
              {pointData?.data[0] && (
                <Typography.Text type="secondary">
                  {usedPoints} điểm = {formatVND(calculatePointValue())} VND
                </Typography.Text>
              )}
            </Col>
          </Row>
        </div>
      </>
    );
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
            onClick={handleCashClick}
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
            onClick={handleAccountClick}
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
      {selectedAccount && renderAccountSelection()}
      {/* QR Code Section */}
      {showQRCode && (
        <Modal
          title="Quét mã QR để thanh toán"
          open={showQRCode}
          onCancel={() => setShowQRCode(false)} // Đóng modal khi người dùng nhấn "X"
          footer={null}
          centered
        >
          <VietQR qrUrl={qrUrl} />
        </Modal>
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
            color: selectedVoucher || usedPoints ? "red" : "inherit",
          }}
        >
          {formatVND(calculateDiscountedTotal())}
          {(selectedVoucher || usedPoints) && (
            <span
              style={{
                textDecoration: "line-through",
                color: "gray",
                marginLeft: "10px",
                fontSize: "14px",
              }}
            >
              {formatVND(totalAmount)}
            </span>
          )}
        </Typography.Text>
      </div>

      {/* Pay Now Button */}
      {paymentMethod === "cash" && (
        <Button
          type="primary"
          block
          style={{ marginTop: "24px", height: 50 }}
          onClick={handlePayNow}
          loading={isPaying}
        >
          {CONSTANT.payment.toUpperCase()}
        </Button>
      )}

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

      {showInvoice && (
        <InvoiceDialog
          onClose={handleCloseInvoice}
          orderData={orderData}
          totalBill={calculateDiscountedTotal()}
          
        />
      )}
    </div>
  );
};

export default PaymentMethod;
