import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Layout, message, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { CategoryData, getListCategory } from "~/services/category_product";
import { getListProduct, ProductData } from "~/services/product";
import FilterDish from "../components/FilterDish";
import FilterPrice from "../components/FilterPrice";
import MenuContent from "../components/MenuContent";
import ViewCart from "../components/ViewCart";
import { useMutation } from "react-query";
import { AddToOrder } from "~/services/order";
import { useParams } from "react-router-dom";
import useNotification from "~/hooks/useNotification";
import { AxiosError, AxiosResponse } from "axios";
import InputComponent from "~/components/InputComponent";

export interface CartItem extends ProductData {
  quantity: number;
}

const MenuClient = () => {
  const { id } = useParams();
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
  const { successMessage, errorMessage } = useNotification();

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
          minPrice,
          maxPrice,
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

  const orderMutation = useMutation(AddToOrder, {
    onSuccess: (success: AxiosResponse<{ message: string }>) => {
      successMessage({
        description:
          success?.data?.message ||
          "Gọi món thành công. Món ăn đã được chuyển tới bếp",
      });
      setCart([]);
      setCartVisible(false);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorMessage({
        description:
          (error as AxiosError).message ||
          "Đã có lỗi xảy ra, Gọi món thất bại!!",
      });
    },
  });

  const addToCart = (product: ProductData) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      };
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }

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

  const handleUpdateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
  };

  const handleRemoveItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    message.success("Đã xóa món khỏi giỏ hàng!");
  };

  const handleCheckout = () => {
    const orderDetails = cart.map((item) => ({
      proId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalMoney = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    orderMutation.mutate({
      tableId: Number(id),
      orderDate: new Date().toISOString(),
      totalMoney,
      status: true,
      orderDetails: orderDetails,
    });
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const handleTabChange = (key: string) => {
    const categoryId = key === "all" ? undefined : parseInt(key, 10);
    setSelectedCategory(categoryId);
  };

  return (
    <Layout className="bg-gray-100" style={{ height: "100vh" }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-white text-xl sm:text-4xl md:text-3xl font-semibold">
            Thực đơn bàn: {id}
          </h1>
        </div>
        <div className="w-full max-w-md ml-auto">
          <InputComponent
            name="search"
            type="search"
            placeholder="Tìm kiếm món ăn..."
            className="w-full rounded-full px-4 py-2"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="p-5">
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
        onUpdateCart={handleUpdateCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />
    </Layout>
  );
};

export default MenuClient;
