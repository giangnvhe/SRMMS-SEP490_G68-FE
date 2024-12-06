import React, { useState } from "react";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Card, List, Badge, Modal, Image } from "antd";
import { formatVND } from "~/common/utils/formatPrice";
import { ProductData } from "~/services/product";
import { CONTENT_HEIGHT } from "../const";

interface IProps {
  products: ProductData[];
  onAddToCart: (product: ProductData) => void;
}

const MenuContent: React.FC<IProps> = ({ products, onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );

  const handleProductClick = (product: ProductData) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div
        style={{ height: CONTENT_HEIGHT, overflowY: "auto", padding: "16px" }}
      >
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                className="overflow-hidden rounded-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                cover={
                  <div
                    className="relative h-48 overflow-hidden bg-gray-50 cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    <img
                      alt={item.productName}
                      src={item.image}
                      className="h-full w-full object-fill transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                }
                bodyStyle={{ padding: "16px" }}
                actions={[
                  <div className="px-4 pb-4">
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined className="text-lg" />}
                      onClick={() => onAddToCart(item)}
                      className="h-10 w-full rounded-lg font-medium transition-transform hover:-translate-y-0.5"
                    >
                      Thêm món ăn
                    </Button>
                  </div>,
                ]}
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3
                    className="text-base font-semibold text-gray-800 line-clamp-2 cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    {item.productName}
                  </h3>
                  <Badge
                    count={`${item.calories} cal`}
                    className="bg-transparent"
                    style={{
                      backgroundColor: "white",
                      color: "#666",
                      boxShadow: "0 0 0 1px #d9d9d9 inset",
                      padding: "0 8px",
                      height: "20px",
                      lineHeight: "20px",
                      borderRadius: "10px",
                      fontSize: "12px",
                      fontWeight: "normal",
                    }}
                  />
                </div>

                <div className="mt-2">
                  <span className="text-lg font-semibold text-blue-500">
                    {formatVND(item.price)}
                  </span>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>

      {/* Product Detail Modal */}
      <Modal
        open={!!selectedProduct}
        onCancel={handleCloseModal}
        footer={null}
        closeIcon={<CloseOutlined />}
        width={600}
        centered
      >
        {selectedProduct && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.productName}
                className="w-full h-auto object-cover rounded-lg"
                preview={false}
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedProduct.productName}
              </h2>
              <p className="text-gray-600">{selectedProduct.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-blue-500">
                  {formatVND(selectedProduct.price)}
                </span>
                <Badge
                  count={`${selectedProduct.calories} cal`}
                  className="bg-gray-100 px-2 py-1 rounded-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">Trạng thái:</span>
                <span
                  className={`font-semibold ${
                    selectedProduct.status ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {selectedProduct.status ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => onAddToCart(selectedProduct)}
                className="w-full mt-4"
              >
                Thêm món ăn
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default MenuContent;
