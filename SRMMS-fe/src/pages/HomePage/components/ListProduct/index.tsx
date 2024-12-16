import { Button, Card, Spin, Typography } from "antd";
import { ProductData } from "~/services/product";
import { CONTENT_HEIGHT } from "~/pages/Client/components/const";
import { formatVND } from "~/common/utils/formatPrice";
import { useNavigate } from "react-router-dom";

interface IProps {
  products: ProductData[];
  isLoading: boolean;
}

const ListProduct = ({ products, isLoading }: IProps) => {
  const navigate = useNavigate();

  const activeProducts = products.filter((product) => product.status === true);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        <Spin size="large" />
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        <Typography.Text>No items found.</Typography.Text>
      </div>
    );
  }

  return (
    <div style={{ height: CONTENT_HEIGHT, overflowY: "auto", padding: "16px" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {activeProducts.map((product) => (
          <Card
            key={product.productId}
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            cover={
              <div className="relative">
                <img
                  alt={product.productName}
                  src={product.image}
                  className="h-48 w-full object-cover transition-transform transform hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs shadow">
                  {formatVND(Number(product.price.toFixed(2)))}
                </div>
              </div>
            }
          >
            <div className="p-4">
              {/* Product Name */}
              <Typography.Text className="block text-base sm:text-lg font-semibold text-gray-800 truncate">
                {product.productName}
              </Typography.Text>

              {/* Description */}
              <Typography.Paragraph
                className="text-gray-600 text-sm sm:text-base mt-2 truncate"
                ellipsis={{ rows: 2 }}
              >
                {product.description || "No description available."}
              </Typography.Paragraph>

              {/* Calories */}
              <div className="text-gray-500 text-xs sm:text-sm">
                Calories:{" "}
                <span className="font-medium">{product.calories}</span>
              </div>

              {/* Action Button */}
              <Button
                type="primary"
                block
                className="mt-4 transition-transform transform hover:scale-105"
                onClick={() => navigate(`/product/${product.productId}`)}
              >
                Xem chi tiết
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
