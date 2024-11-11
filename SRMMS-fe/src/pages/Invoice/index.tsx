import { Modal, Typography, Divider, Button, Row, Col, Table } from "antd";
import { useReactToPrint } from "react-to-print";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useRef } from "react";

const InvoiceDialog = () => {
  const CONSTANT = {
    INVOICE_DETAILS: "Invoice Details",
    DATE: "Date",
    TABLE: "Table",
    ORDER: "Order",
    ITEM_DESCRIPTION: "Item Descriptions",
    UNIT_PRICE: "Unit Price",
    QUANTITY: "Quantity",
    AMOUNT: "Amount",
    CLOSE: "Close",
    PAY: "Pay",
    INVOICE: "Invoice",
    PAYMENT_METHOD: "Payment Method",
    CASH: "Cash",
    SUBTOTAL: "Subtotal",
    TIP: "Tip",
    SERVICE_CHARGE: "Service Charge: 10%",
    GRAND_TOTAL: "Grand Total",
    PHONE: "+111-2222-3333-444",
    MAIL_1: "sale@yourwebsite.com",
    MAIL_2: "support@yourwebsite.com",
    ADDRESS: "10 P. Lý Quốc Sư, Hàng Trống, Hoàn Kiếm, Hà Nội",
    CITY: "Hanoi, Vietnam-100000",
    BRAND: "Phở 10 Lý Quốc Sư",
    LOCATION: "Hoàn Kiếm, Hà Nội",
  };

  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({contentRef});

  const mockInvoiceData = {
    date: "12/12/2021",
    table: 1,
    order: 1312312,
    items: [
      { key: 1, description: "Noodle Soup", unitPrice: "50,000Đ", quantity: 2, amount: "100,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      { key: 2, description: "Spring Rolls", unitPrice: "20,000Đ", quantity: 3, amount: "60,000Đ" },
      // Add more items as needed
    ],
    subtotal: "160,000Đ",
    tip: "10,000Đ",
    serviceCharge: "10,000Đ",
    grandTotal: "180,000Đ",
  };

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
      onCancel={() => {}}
      footer={[
        <Button key="print" onClick={reactToPrintFn}>Print</Button>,
        <Button key="close">{CONSTANT.CLOSE}</Button>,
        <Button key="pay">{CONSTANT.PAY}</Button>,
      ]}
    >
      <div ref={contentRef}>
        <Row justify="space-between" align="middle">
          <Col>
            <img
              src="src/assets/logo.png"
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
              {CONSTANT.DATE}: {mockInvoiceData.date}
            </Typography.Text>
            <br />
            <Typography.Text style={{ fontSize: "10px" }}>
              {CONSTANT.TABLE}: {mockInvoiceData.table}
            </Typography.Text>
            <br />
            <Typography.Text style={{ fontSize: "10px" }}>
              {CONSTANT.ORDER}: {mockInvoiceData.order}
            </Typography.Text>
          </Col>
        </Row>

        <Divider />

        <Table
          dataSource={mockInvoiceData.items}
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
            <Typography.Text>{CONSTANT.SUBTOTAL}: {mockInvoiceData.subtotal}</Typography.Text>
            <br />
            <Typography.Text>{CONSTANT.TIP}: {mockInvoiceData.tip}</Typography.Text>
            <br />
            <Typography.Text>{CONSTANT.SERVICE_CHARGE}: {mockInvoiceData.serviceCharge}</Typography.Text>
            <Divider style={{ margin: "8px 0" }} />
            <Typography.Text strong>{CONSTANT.GRAND_TOTAL}: {mockInvoiceData.grandTotal}</Typography.Text>
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