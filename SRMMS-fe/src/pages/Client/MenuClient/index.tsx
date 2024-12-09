import { ClockCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Layout, message, Modal, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { CategoryData, getListCategory } from "~/services/category_product";
import { ComboData, getListProduct, ProductData } from "~/services/product";
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
import { CombosData, getLisComboProduct } from "~/services/combos";
import ComboContent from "../components/comboContent";
import HistoryOrder from "../components/HistoryOrder";
import socket from "~/common/const/mockSocket";

export interface CartItem extends ProductData {
  quantity: number;
}

const MenuClient = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [combos, setCombos] = useState<CombosData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<ProductData[]>([]);
  const [cartCombo, setCartCombo] = useState<ComboData[]>([]);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [cartVisible, setCartVisible] = useState(false);
  const [selectedView, setSelectedView] = useState<"products" | "combos">(
    "products"
  );
  const { successMessage, errorMessage } = useNotification();
  const [tableId, setTableId] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleShowHistory = () => {
    if (id) {
      setTableId(Number(id));
      setShowHistory(true);
    } else {
      message.error("Không tìm thấy mã bàn!");
    }
  };

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

  //fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getListProduct({
          name: searchTerm, // Pass search term to backend
          categoryId: selectedCategory,
          pageNumber: 1,
          pageSize: 10,
          totalProducts: 0,
          minPrice,
          maxPrice,
        });

        // Additional client-side filtering if needed
        const filteredProducts = response.data.products.filter(
          (product) =>
            product.status === true &&
            product.price >= minPrice &&
            product.price <= maxPrice &&
            (searchTerm === "" ||
              product.productName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        );

        setProducts(filteredProducts);
      } catch (error) {
        message.error("Failed to load products!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, minPrice, maxPrice, searchTerm]);

  useEffect(() => {
    const fetchCombos = async () => {
      setLoading(true);
      try {
        const response = await getLisComboProduct({
          cbName: "",
          pageNumber: 1,
          pageSize: 10,
          totalCount: 0,
          minPrice: 0,
          maxPrice: 1000000,
        });
        const validatedCombos = response?.data?.combos
          .filter((combo) => combo.comboStatus === true)
          .map((combo) => ({
            ...combo,
            ProductNames: combo?.ProductNames || [],
          }));
        setCombos(validatedCombos);
      } catch (error) {
        message.error("Failed to load combos!");
      } finally {
        setLoading(false);
      }
    };

    fetchCombos();
  }, []);

  const orderMutation = useMutation(AddToOrder, {
    onSuccess: (success: AxiosResponse<{ message: string }>) => {
      successMessage({
        description:
          success?.data?.message ||
          "Gọi món thành công. Món ăn đã được chuyển tới bếp",
      });
      setCart([]);
      setCartCombo([]);
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

    message.success(`${product.productName} đã thêm vào đơn hàng của bạn!`);
  };

  const addToComboCart = (combo: CombosData) => {
    setCartCombo((prevCartCombo) => {
      const existingComboIndex = prevCartCombo.findIndex(
        (item) => item.comboId === combo.comboId
      );
      if (existingComboIndex > -1) {
        const updatedCartCombo = [...prevCartCombo];
        updatedCartCombo[existingComboIndex].quantity += 1;
        return updatedCartCombo;
      } else {
        return [...prevCartCombo, { ...combo, quantity: 1 }];
      }
    });
    message.success(`${combo.comboName} has been added to your order!`);
  };

  const handleClearCart = () => {
    Modal.confirm({
      title: "Xác nhận xóa giỏ hàng",
      content: "Bạn có chắc chắn muốn xóa tất cả món khỏi giỏ hàng?",
      onOk: () => {
        setCart([]);
        setCartCombo([]);
        message.success("Đã xóa toàn bộ giỏ hàng!");
      },
    });
  };

  const handleUpdateCart = (
    updatedCart: CartItem[],
    updatedComboCart: CombosData[]
  ) => {
    setCart(updatedCart);
    setCartCombo(updatedComboCart);
  };

  const handleRemoveItem = (index: number, type: "product" | "combo") => {
    if (type === "product") {
      setCart((prevCart) => prevCart.filter((_, i) => i !== index));
      message.success("Đã xóa món khỏi giỏ hàng!");
    } else if (type === "combo") {
      setCartCombo((prevCartCombo) =>
        prevCartCombo.filter((_, i) => i !== index)
      );
      message.success("Đã xóa combo khỏi giỏ hàng!");
    }
  };

  const handleCheckout = () => {
    const productDetails = cart.map((item) => ({
      proId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const comboDetails = cartCombo.map((item) => ({
      comboId: item.comboId,
      quantity: item.quantity,
      price: item.comboMoney,
    }));

    const totalMoney =
      cart.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      cartCombo.reduce(
        (sum, item) => sum + item.comboMoney * (item.quantity || 0),
        0
      );

      const orderData = {
        tableId: Number(id),
        orderDate: new Date().toISOString(),
        totalMoney,
        status: 1,
        productDetails: productDetails,
        comboDetails: comboDetails,
      };
    
      orderMutation.mutate(orderData, {
        onSuccess: () => {
          socket.emit("newOrder", {
            tableId: Number(id),
            totalMoney,
            message: `Bàn ${id} đã gọi món`,
          });
        }
      });
    
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const handleTabChange = (key: string) => {
    if (key === "Combo") {
      setSelectedView("combos");
      setSelectedCategory(undefined);
    } else if (key === "all") {
      setSelectedView("products");
      setSelectedCategory(undefined);
    } else {
      setSelectedView("products");
      setSelectedCategory(parseInt(key, 10));
    }
  };

  return (
    <Layout className="bg-gray-100" style={{ height: "100vh" }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-white text-xl sm:text-4xl md:text-3xl font-semibold">
            Thực đơn nhà hàng
          </h1>
        </div>
        <div className="w-full max-w-md ml-auto mt-2">
          <InputComponent
            name="name"
            type="search"
            placeholder="Tìm kiếm món ăn..."
            className="w-full rounded-full px-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="p-5">
        <FilterDish
          categories={categories}
          selectedCategory={selectedCategory}
          selectedView={selectedView}
          onTabChange={handleTabChange}
        />
        <FilterPrice
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
        />

        {selectedView === "products" ? (
          <MenuContent products={products} onAddToCart={addToCart} />
        ) : (
          <ComboContent comboData={combos} onAddToComboCart={addToComboCart} />
        )}
      </div>
      <div className="fixed bottom-4 right-4 flex flex-col items-center space-y-3">
        {/* Nút Lịch sử */}
        <Tooltip title="Xem lịch gọi món">
          <Button
            type="default"
            shape="circle"
            icon={<ClockCircleOutlined />}
            className="border-gray-400 shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300"
            onClick={handleShowHistory}
          />
        </Tooltip>

        <Button
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          className="bg-gray-700 border-none rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl font-semibold transition-all duration-300"
          onClick={toggleCart}
        >
          Đơn (
          {cart.reduce((total, item) => total + item.quantity, 0) +
            cartCombo.reduce((total, item) => total + (item.quantity || 0), 0)}
          )
        </Button>
      </div>

      {/* Cart Button */}
      <ViewCart
        cart={cart}
        cartCombo={cartCombo}
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
        onRemoveItem={handleRemoveItem}
        onUpdateCart={handleUpdateCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />
      <HistoryOrder
        visible={showHistory}
        tableId={tableId}
        onClose={() => setShowHistory(false)}
      />
    </Layout>
  );
};

export default MenuClient;
