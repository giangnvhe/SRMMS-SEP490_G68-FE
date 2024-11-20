import { useEffect, useState } from "react";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Card,
  Input,
  Select,
  Button,
  Typography,
  Space,
  Modal,
  Form,
  InputNumber,
  List,
  Col,
  Row,
} from "antd";
import { Spin } from "antd";
import { v4 as uuidv4 } from "uuid";

const { Title } = Typography;
const { Option } = Select;

// Mock data
const initialCombos = [
  {
    id: 1,
    name: "Burger Meal",
    category: "Lunch",
    items: [
      { id: 1, name: "Burger", price: 5.99 },
      { id: 2, name: "Fries", price: 2.99 },
      { id: 3, name: "Drink", price: 1.99 },
    ],
    imageUrl:
      "https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-CHICKEN-1.jpg?v=4Y57j4",
  },
  {
    id: 2,
    name: "Breakfast Special",
    category: "Breakfast",
    items: [
      { id: 4, name: "Eggs", price: 3.99 },
      { id: 5, name: "Toast", price: 1.99 },
      { id: 6, name: "Coffee", price: 1.99 },
    ],
    imageUrl:
      "https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-CHICKEN-1.jpg?v=4Y57j4",
  },
  {
    id: 3,
    name: "Dinner for Two",
    category: "Dinner",
    items: [
      { id: 7, name: "Steak", price: 15.99 },
      { id: 8, name: "Salad", price: 4.99 },
      { id: 9, name: "Dessert", price: 5.99 },
    ],
    imageUrl:
      "https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-CHICKEN-1.jpg?v=4Y57j4",
  },
  {
    id: 4,
    name: "Kids' Meal",
    category: "Lunch",
    items: [
      { id: 10, name: "Chicken Nuggets", price: 4.99 },
      { id: 11, name: "Juice Box", price: 1.49 },
    ],
    imageUrl:
      "https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-CHICKEN-1.jpg?v=4Y57j4",
  },
  {
    id: 5,
    name: "Pasta Combo",
    category: "Dinner",
    items: [
      { id: 12, name: "Spaghetti", price: 8.99 },
      { id: 13, name: "Garlic Bread", price: 2.49 },
    ],
    imageUrl:
      "https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-CHICKEN-1.jpg?v=4Y57j4",
  },
  {
    id: 6,
    name: "Healthy Breakfast",
    category: "Breakfast",
    items: [
      { id: 14, name: "Oatmeal", price: 3.49 },
      { id: 15, name: "Smoothie", price: 4.99 },
    ],
    imageUrl:
      "https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-CHICKEN-1.jpg?v=4Y57j4",
  },
  {
    id: 7,
    name: "Tex-Mex Fiesta",
    category: "Lunch",
    items: [
      { id: 16, name: "Taco", price: 3.99 },
      { id: 17, name: "Chips & Salsa", price: 2.49 },
    ],
    imageUrl:
      "https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-CHICKEN-1.jpg?v=4Y57j4",
  },
  {
    id: 8,
    name: "Pizza Party",
    category: "Dinner",
    items: [
      { id: 18, name: "Pizza", price: 12.99 },
      { id: 19, name: "Soft Drink", price: 1.99 },
    ],
  },
  {
    id: 9,
    name: "Vegan Delight",
    category: "Lunch",
    items: [
      { id: 20, name: "Veggie Wrap", price: 6.99 },
      { id: 21, name: "Fruit Cup", price: 3.49 },
    ],
  },
  {
    id: 10,
    name: "Seafood Combo",
    category: "Dinner",
    items: [
      { id: 22, name: "Grilled Salmon", price: 14.99 },
      { id: 23, name: "Rice Pilaf", price: 3.49 },
    ],
  },
  {
    id: 11,
    name: "Morning Boost",
    category: "Breakfast",
    items: [
      { id: 24, name: "Croissant", price: 2.49 },
      { id: 25, name: "Latte", price: 3.99 },
    ],
  },
  {
    id: 12,
    name: "Snack Attack",
    category: "Lunch",
    items: [
      { id: 26, name: "Cheese Sticks", price: 5.49 },
      { id: 27, name: "Lemonade", price: 2.49 },
    ],
  },
  {
    id: 13,
    name: "BBQ Feast",
    category: "Dinner",
    items: [
      { id: 28, name: "Ribs", price: 16.99 },
      { id: 29, name: "Cornbread", price: 2.99 },
    ],
  },
  {
    id: 14,
    name: "Classic Brunch",
    category: "Breakfast",
    items: [
      { id: 30, name: "Pancakes", price: 4.99 },
      { id: 31, name: "Bacon", price: 3.49 },
    ],
  },
  {
    id: 15,
    name: "Asian Fusion",
    category: "Lunch",
    items: [
      { id: 32, name: "Sushi Roll", price: 7.99 },
      { id: 33, name: "Miso Soup", price: 2.99 },
    ],
  },
  {
    id: 16,
    name: "Steakhouse Combo",
    category: "Dinner",
    items: [
      { id: 34, name: "Sirloin Steak", price: 18.99 },
      { id: 35, name: "Mashed Potatoes", price: 3.99 },
    ],
  },
  {
    id: 17,
    name: "Tropical Breakfast",
    category: "Breakfast",
    items: [
      { id: 36, name: "Tropical Fruit Bowl", price: 5.99 },
      { id: 37, name: "Iced Coffee", price: 2.99 },
    ],
  },
  {
    id: 18,
    name: "Italian Lunch",
    category: "Lunch",
    items: [
      { id: 38, name: "Lasagna", price: 9.99 },
      { id: 39, name: "Caesar Salad", price: 4.49 },
    ],
  },
  {
    id: 19,
    name: "Dessert Special",
    category: "Dinner",
    items: [
      { id: 40, name: "Cheesecake", price: 5.99 },
      { id: 41, name: "Coffee", price: 1.99 },
    ],
  },
  {
    id: 20,
    name: "Protein Pack",
    category: "Breakfast",
    items: [
      { id: 42, name: "Protein Shake", price: 4.99 },
      { id: 43, name: "Boiled Eggs", price: 2.49 },
    ],
  },
];

const APP_BAR_HEIGHT = "64px";
const CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - 150px)`;
const CARD_HEIGHT = 420;
const ITEM_LIST_HEIGHT = 300;

const ComboManagement = () => {
  const [combos, setCombos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingComboId, setEditingComboId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setCombos(initialCombos);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Spin size="large" />
      </Row>
    );
  }

  const filteredCombos = combos.filter(
    (combo) =>
      combo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || combo.category === categoryFilter)
  );

  const handleEditCombo = (combo) => {
    console.log("combo", combo);
    setEditingComboId(combo.id);
    form.setFieldsValue({
      name: combo.name,
      category: combo.category,
      items: combo.items,
    });
    setIsModalVisible(true);
  };

  const handleDeleteCombo = (id) => {
    setCombos(combos.filter((combo) => combo.id !== id));
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingComboId) {
        setCombos(
          combos.map((combo) =>
            combo.id === editingComboId ? { ...combo, ...values } : combo
          )
        );
      } else {
        const newCombo = {
          id: combos.length + 1,
          name: values.name,
          category: values.category,
          items: values.items || [],
        };
        setCombos([...combos, newCombo]);
      }
      setIsModalVisible(false);
    });
  };

  const addItemHandler = (newCombo, comboId) => {
    const newItem = { id: uuidv4(), name: "New Item", price: 0 };
    const currentItems = form.getFieldValue("items") || [];

    const updatedItems = [...currentItems, newItem];
    const updatedCombo = { ...newCombo, items: updatedItems };

    setCombos((prevCombos) =>
      prevCombos.map((combo) => (combo.id === comboId ? updatedCombo : combo))
    );

    form.setFieldsValue({ items: updatedItems });

    return;
  };

  const handleAddItem = (comboId) => {
    if (comboId) {
      const combo = combos?.find((combo) => combo.id === comboId);
      addItemHandler(combo, comboId);
    } else {
      const newCombo = { id: uuidv4(), name: "New Combo", items: [] };
      addItemHandler(newCombo, newCombo.id);
    }
  };

  const handleAddCombo = () => {
    setEditingComboId(null);
    form.resetFields();
    setIsModalVisible(true);
  };
  return (
    <div style={{ height: "100%", padding: '16px' }}>
      <Title style={{ height: APP_BAR_HEIGHT }} level={4}>
        Combo Management
      </Title>
      <Space className="mb-4" size="middle">
        <Input
          placeholder="Search combos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
        <Select
          value={categoryFilter}
          onChange={setCategoryFilter}
          style={{ width: 150 }}
          placeholder="Filter by category"
        >
          <Option value="">All Categories</Option>
          <Option value="Breakfast">Breakfast</Option>
          <Option value="Lunch">Lunch</Option>
          <Option value="Dinner">Dinner</Option>
        </Select>
        <Button type="primary" onClick={handleAddCombo}>
          <PlusOutlined /> Add Combo
        </Button>
      </Space>
      <div
        style={{
          height: CONTENT_HEIGHT,
          overflowY: "auto",
          padding: "16px",
        }}
      >
        <Row gutter={[16, 16]}>
          {filteredCombos.map((combo) => (
            <Col xl={6} md={8} sm={12} xs={24} key={combo.id}>
              <Card
                style={{
                  height: CARD_HEIGHT,
                  position: "relative",
                }}
                hoverable
                title={combo.name}
                cover={<img alt={combo.name} src={combo.imageUrl} />}
                extra={
                  <Space>
                    <Button type="link" onClick={() => handleEditCombo(combo)}>
                      Edit
                    </Button>
                    <Button
                      type="link"
                      danger
                      onClick={() => handleDeleteCombo(combo.id)}
                    >
                      Delete
                    </Button>
                  </Space>
                }
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    padding: "4px",
                    borderRadius: "4px",
                  }}
                >
                  <Typography.Text>Category: {combo.category}</Typography.Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title={editingComboId ? "Edit Combo" : "Add New Combo"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Save
          </Button>,
          <Button key="add-item" onClick={() => handleAddItem(editingComboId)}>
            <PlusOutlined /> Add Item
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Combo Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Breakfast">Breakfast</Option>
              <Option value="Lunch">Lunch</Option>
              <Option value="Dinner">Dinner</Option>
            </Select>
          </Form.Item>
          <Form.List name="items">
            {(fields, { remove }) => (
              <List
                style={{
                  height: ITEM_LIST_HEIGHT,
                  overflowY: "auto",
                  border: "1px solid #f0f0f0",
                  padding: "8px",
                  borderRadius: "4px",
                }}
                itemLayout="horizontal"
                dataSource={fields}
                renderItem={(field) => (
                  <List.Item style={{ alignItems: "center" }}>
                    <Form.Item
                      style={{ alignItems: "center", marginBottom: 0 }}
                      {...field}
                      name={[field.name, "name"]}
                      key={`${field.name}-name`}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Item Name" />
                    </Form.Item>
                    <Form.Item
                      style={{ alignItems: "center", marginBottom: 0 }}
                      {...field}
                      name={[field.name, "price"]}
                      key={`${field.name}-price`}
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        placeholder="Price"
                        style={{ width: 100 }}
                        min={0}
                        step={0.01}
                      />
                    </Form.Item>
                    <Button
                      type="link"
                      danger
                      onClick={() => remove(field.name)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </List.Item>
                )}
              />
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default ComboManagement;
