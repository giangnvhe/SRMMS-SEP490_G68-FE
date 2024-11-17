import { Button, Card, Col, Row, Spin, Typography, Divider } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProductById } from "~/services/product";
import { ProductData } from "~/services/product";
import { FaDollarSign, FaFireAlt } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<ProductData, Error>(["product", id], () =>
    getProductById(Number(id)).then((response) => response.data)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        <Typography.Text>Product not found.</Typography.Text>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Row gutter={[24, 24]}>
        {/* Product Image */}
        <Col span={24} md={12}>
          <Card
            cover={
              <img
                alt={product?.productName}
                src={product?.image}
                className="h-96 w-full object-cover rounded-lg shadow-md"
              />
            }
            bordered={false}
            className="shadow-lg"
          />
        </Col>

        {/* Product Info */}
        <Col span={24} md={12}>
          <Card className="shadow-lg p-8">
            <Typography.Title level={2} className="text-gray-800 mb-4">
              {product?.productName}
            </Typography.Title>

            <Typography.Paragraph className="text-gray-600 mb-6">
              {product?.description || "No description available."}
            </Typography.Paragraph>

            <Divider />

            {/* Price and Calories */}
            <div className="flex items-center mb-6">
              <FaDollarSign className="text-lg text-gray-500 mr-3" />
              <Typography.Text className="text-xl font-semibold">
                {product?.price} VND
              </Typography.Text>
            </div>

            <div className="flex items-center mb-6">
              <FaFireAlt className="text-lg text-gray-500 mr-3" />
              <Typography.Text className="text-sm text-gray-600">
                {product?.calories} Calories
              </Typography.Text>
            </div>

            {/* Back Button */}
            <Button
              type="primary"
              size="large"
              className="w-full mt-6"
              onClick={() => navigate("/thuc-don")}
            >
              Back to List
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
