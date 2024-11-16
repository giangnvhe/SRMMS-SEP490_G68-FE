import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Layout, message, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { CategoryData, getListCategory } from "~/services/category_product";
import { getListProduct, ProductData } from "~/services/product";
import FilterDish from "../components/FilterDish";
import FilterPrice from "../components/FilterPrice";
import MenuContent from "../components/MenuContent";
import ViewCart from "../components/ViewCart";

// Function to format the price in VND
export const formatVND = (value?: number) => {
  if (value === undefined) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const MenuClient = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [cart, setCart] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getListCategory({
          pageNumber: 1,
          pageSize: 100,
          pagination: { pageNumber: 1, pageSize: 100 },
        });
        setCategories(response.data);
      } catch (error) {
        message.error("Failed to load categories!");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getListProduct({
          name: "",
          categoryId: selectedCategory,
          pagination: { pageNumber: 1, pageSize: 10 },
          pageNumber: 1,
          pageSize: 10,
          totalProducts: 0,
        });
        const filteredProducts = response.data.products.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
        setProducts(filteredProducts);
      } catch (error) {
        message.error("Failed to load products!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, minPrice, maxPrice]);

  const addToCart = (product: ProductData) => {
    setCart((prevCart) => [...prevCart, product]);
    message.success(`${product.productName} added to cart!`);
  };

  const handleClearCart = () => {
    Modal.confirm({
      title: "Xác nhận xóa giỏ hàng",
      content: "Bạn có chắc chắn muốn xóa tất cả món khỏi giỏ hàng?",
      onOk: () => {
        setCart([]);
        message.success("Đã xóa toàn bộ giỏ hàng!");
      },
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    message.success("Đã xóa món khỏi giỏ hàng!");
  };

  const handleCheckout = () => {
    // Xử lý logic thanh toán ở đây
    message.success("Chức năng thanh toán đang được phát triển!");
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const handleTabChange = (key: string) => {
    const categoryId = key === "all" ? undefined : parseInt(key, 10);
    setSelectedCategory(categoryId);
  };

  return (
    <Layout
      className="bg-gray-100"
      style={{ padding: "24px", height: "100vh" }}
    >
      {/* Header */}
      <div className="text-xl font-semibold text-white py-3 px-6 bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg text-center sm:text-4xl md:text-5xl">
        Thực đơn nhà hàng
      </div>

      {/* Tabs */}
      <div className="mt-2">
        <FilterDish
          categories={categories}
          selectedCategory={selectedCategory}
          onTabChange={handleTabChange}
        />
        <FilterPrice
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
        />

        {/* Product List */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spin size="large" />
          </div>
        ) : (
          <MenuContent products={products} onAddToCart={addToCart} />
        )}
      </div>
      <div className="fixed bottom-4 right-4">
        <Button
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          className="bg-gray-700 border-none rounded-full shadow-lg hover:bg-gray-800 font-semibold"
          onClick={toggleCart}
        >
          Giỏ hàng ({cart.length})
        </Button>
      </div>

      {/* Cart Button */}
      <ViewCart
        cart={cart}
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />
    </Layout>
  );
};

export default MenuClient;
