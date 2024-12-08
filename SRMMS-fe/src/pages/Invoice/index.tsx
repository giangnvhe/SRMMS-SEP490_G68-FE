import { Modal, Typography, Divider, Button, Row, Col, Table } from "antd";
import { useReactToPrint } from "react-to-print";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { formatVND } from "~/common/utils/formatPrice";

interface InvoiceDialogProps {
  onClose: () => void;
  orderData?: any[];
  totalBill: number;
}

const InvoiceDialog = ({
  onClose,
  orderData,
  totalBill,
}: InvoiceDialogProps) => {
  const CONSTANT = {
    INVOICE_DETAILS: "Chi Tiết Hóa Đơn",
    DATE: "Ngày",
    TABLE: "Bàn",
    ORDER: "Số Order",
    ITEM_DESCRIPTION: "Mô Tả Sản Phẩm",
    UNIT_PRICE: "Đơn Giá",
    QUANTITY: "Số Lượng",
    AMOUNT: "Thành Tiền",
    CLOSE: "Đóng",
    PAY: "Thanh Toán",
    INVOICE: "Hóa Đơn",
    PAYMENT_METHOD: "Phương Thức Thanh Toán",
    CASH: "Tiền Mặt",
    SUBTOTAL: "Tổng Cộng",
    SERVICE_CHARGE: "Phí Dịch Vụ",
    GRAND_TOTAL: "Tổng Thanh Toán",
    PHONE: "+84 123 456 789",
    MAIL_1: "sale@restaurant.com",
    MAIL_2: "support@restaurant.com",
    ADDRESS: "10 Đường Lý Quốc Sư, Hàng Trống, Hoàn Kiếm",
    CITY: "Hà Nội, Việt Nam",
    BRAND: "SRMMS",
    LOCATION: "Cầu Giấy, Hà Nội",
  };

  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);


  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({
    content: () => contentRef.current,
  });

  // Transform order data into invoice items
  useEffect(() => {
    if (orderData) {
      const updatedInvoiceItems = orderData.flatMap((order: any) => [
        ...(order.products || []).map((product: any) => ({
          description: product.proName,
          unitPrice: formatVND(product.price),
          quantity: product.quantity,
          amount: formatVND(product.price * product.quantity),
        })),
        ...(order.combos || []).map((combo: any) => ({
          description: combo.comboName,
          unitPrice: formatVND(combo.price),
          quantity: combo.quantity,
          amount: formatVND(combo.price * combo.quantity),
        })),
      ]);
      setInvoiceItems(updatedInvoiceItems);
    }
  }, [orderData]); 

  const columns = [
    {
      title: CONSTANT.ITEM_DESCRIPTION,
      dataIndex: "description",
      key: "description",
    },
    {
      title: CONSTANT.UNIT_PRICE,
      dataIndex: "unitPrice",
      key: "unitPrice",
      align: "right",
    },
    {
      title: CONSTANT.QUANTITY,
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
    },
    {
      title: CONSTANT.AMOUNT,
      dataIndex: "amount",
      key: "amount",
      align: "right",
    },
  ];

  return (
    <Modal
      closeIcon={null}
      open={true}
      onCancel={onClose}
      footer={[
        <Button key="print" onClick={reactToPrintFn}>
          In Hóa Đơn
        </Button>,
        <Button key="close" onClick={onClose}>
          {CONSTANT.CLOSE}
        </Button>,
      ]}
    >
      <div ref={contentRef}>
        <Row justify="space-between" align="middle">
          <Col>
            <img
              src="/path/to/your/logo.png"
              alt="Company Logo"
              style={{ width: "70px" }}
            />
          </Col>
          <Col>
            <Typography.Title level={1} style={{ fontWeight: "bold" }}>
              {CONSTANT.INVOICE}
            </Typography.Title>
          </Col>
        </Row>
        <Divider />
        <Row justify="space-between" align="middle">
          <Col xs={14} md={12}>
            <Typography.Text style={{ fontSize: "10px" }}>
              {CONSTANT.BRAND}
              <br />
              {CONSTANT.ADDRESS}
              <br />
              {CONSTANT.CITY}
              <br />
            </Typography.Text>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Typography.Title level={5} style={{ fontWeight: 600 }}>
              {CONSTANT.INVOICE_DETAILS}
            </Typography.Title>
            <Typography.Text style={{ fontSize: "10px" }}>
              {CONSTANT.DATE}: {new Date().toLocaleDateString()}
            </Typography.Text>
            <br />
            <Typography.Text style={{ fontSize: "10px" }}>
              {CONSTANT.TABLE}: {orderData?.[0]?.tableId || "N/A"}
            </Typography.Text>
            <br />
            <Typography.Text style={{ fontSize: "10px" }}>
              {CONSTANT.ORDER}: {orderData?.[0]?.orderId || "N/A"}
            </Typography.Text>
          </Col>
        </Row>

        <Divider />

        <Table
          dataSource={invoiceItems}
          columns={columns}
          pagination={false}
          size="small"
        />

        <Divider />

        <Row justify="space-between">
          <Col>
            <Typography.Text strong>{CONSTANT.PAYMENT_METHOD}</Typography.Text>
            <br />
            <Typography.Text>{CONSTANT.CASH}</Typography.Text>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Typography.Text>
              {CONSTANT.SUBTOTAL}: {formatVND(totalBill)}
            </Typography.Text>
            <Divider style={{ margin: "8px 0" }} />
            <Typography.Text strong>
              {CONSTANT.GRAND_TOTAL}: {formatVND(totalBill)}
            </Typography.Text>
          </Col>
        </Row>

        <Divider />

        <Row justify="space-around">
          <Col span={6} style={{ textAlign: "center" }}>
            <PhoneOutlined style={{ fontSize: "10px" }} />
            <div>
              <Typography.Text style={{ fontSize: "8px" }}>
                {CONSTANT.PHONE}
              </Typography.Text>
            </div>
          </Col>
          <Col span={6} style={{ textAlign: "center" }}>
            <MailOutlined style={{ fontSize: "10px" }} />
            <div>
              <Typography.Text style={{ fontSize: "8px" }}>
                {CONSTANT.MAIL_1}
              </Typography.Text>
              <br />
              <Typography.Text style={{ fontSize: "8px" }}>
                {CONSTANT.MAIL_2}
              </Typography.Text>
            </div>
          </Col>
          <Col span={6} style={{ textAlign: "center" }}>
            <EnvironmentOutlined style={{ fontSize: "10px" }} />
            <div>
              <Typography.Text style={{ fontSize: "8px" }}>
                {CONSTANT.LOCATION}
              </Typography.Text>
              <br />
              <Typography.Text style={{ fontSize: "8px" }}>
                {CONSTANT.CITY}
              </Typography.Text>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default InvoiceDialog;
