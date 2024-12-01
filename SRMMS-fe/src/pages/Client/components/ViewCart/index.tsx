import {
  CloseOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Drawer, List, Typography } from "antd";
import { formatVND } from "~/common/utils/formatPrice";
import { ProductData } from "~/services/product";
import { CartItem } from "../../MenuClient";
import { CombosData } from "~/services/combos";

interface IProps {
  cart: ProductData[];
  cartCombo: CombosData[];
  visible: boolean;
  onClose: () => void;
  onRemoveItem: (index: number, type: "product" | "combo") => void;
  onClearCart: () => void;
  onCheckout: () => void;
  onUpdateCart: (
    updatedCart: CartItem[],
    updatedComboCart: CombosData[]
  ) => void;
}

const ViewCart = ({
  cart,
  cartCombo,
  visible,
  onClose,
  onClearCart,
  onCheckout,
  onUpdateCart,
}: IProps) => {
  const combinedCart = [
    ...cart.map((item) => ({ ...item, isCombo: false })),
    ...cartCombo.map((combo) => ({ ...combo, isCombo: true })),
  ];

  const isComboItem = (item: ProductData | CombosData): item is CombosData => {
    return (item as CombosData).comboMoney !== undefined;
  };

  const total = combinedCart.reduce((sum, item) => {
    if (isComboItem(item)) {
      return sum + item.comboMoney * item.quantity;
    }
    return sum + item.price * item.quantity;
  }, 0);

  const handleQuantityChange = (
    index: number,
    newQuantity: number,
    isCombo: boolean
  ) => {
    if (isCombo) {
      const updatedCartCombo = [...cartCombo];
      if (newQuantity >= 0) {
        updatedCartCombo[index] = {
          ...updatedCartCombo[index],
          quantity: newQuantity,
        };
        onUpdateCart(
          cart,
          updatedCartCombo.filter((item) => item.quantity > 0)
        );
      }
    } else {
      const updatedCart = [...cart];
      if (newQuantity >= 0) {
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: newQuantity,
        };
        onUpdateCart(
          updatedCart.filter((item) => item.quantity > 0),
          cartCombo
        );
      }
    }
  };

  console.log("CartCombo Data: ", cartCombo);

  return (
    <Drawer
      title={
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShoppingCartOutlined className="text-xl" />
              <span className="text-lg font-semibold">Đơn hàng của bạn</span>
            </div>
            <span className="text-gray-500">
              ({combinedCart.reduce((total, item) => total + item.quantity, 0)}{" "}
              món)
            </span>
          </div>
          {combinedCart.length > 0 && (
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={onClearCart}
              className="flex items-center mt-2"
            >
              Xóa tất cả
            </Button>
          )}
        </div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      closeIcon={
        <CloseOutlined className="text-gray-500 hover:text-gray-700" />
      }
      footer={
        combinedCart.length > 0 ? (
          <div className="space-y-4 p-4 border-t">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="text-gray-500">Tổng thanh toán</div>
                <div className="text-xl font-bold text-blue-500">
                  {formatVND(total)}
                </div>
              </div>
              <Button
                type="primary"
                size="large"
                onClick={onCheckout}
                className="h-12 px-8 font-semibold text-base"
              >
                Gọi Món
              </Button>
            </div>
          </div>
        ) : null
      }
    >
      {combinedCart.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-500">
          <ShoppingCartOutlined className="text-6xl mb-4" />
          <Typography.Text className="text-lg">
            Giỏ hàng của bạn đang trống
          </Typography.Text>
        </div>
      ) : (
        <List
          className="cart-items bg-white shadow-md rounded-lg p-4"
          itemLayout="horizontal"
          dataSource={combinedCart}
          renderItem={(item, index) => {
            // Log the item for debugging
            console.log("Rendered Item: ", item);
            console.log(
              "Rendered Item: ",
              item.isCombo ? item.comboImg : item.image
            );

            return (
              <List.Item
                className="hover:bg-gray-50 transition-colors rounded-lg px-4 py-3"
                actions={[
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleQuantityChange(index, 0, item.isCombo)}
                    className="hover:text-red-600"
                  />,
                ]}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={item.isCombo ? item.comboImg : item.image}
                      alt={item.isCombo ? item.comboName : item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h4
                      className="font-medium text-xl line-clamp-2"
                      style={{ color: "#57E1E4" }}
                    >
                      {item.isCombo ? item.comboName : item.productName}
                    </h4>
                    <div className="flex items-center gap-2">
                      <h1 className="text-sm font-medium text-gray-600">
                        Số lượng:
                      </h1>
                      <div className="flex items-center gap-1">
                        <Button
                          shape="circle"
                          size="small"
                          icon={<MinusOutlined />}
                          onClick={() =>
                            handleQuantityChange(
                              index,
                              item.quantity - 1,
                              item.isCombo
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                        />
                        <span className="px-2 font-semibold text-sm text-gray-800">
                          {item.quantity}
                        </span>
                        <Button
                          shape="circle"
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            handleQuantityChange(
                              index,
                              item.quantity + 1,
                              item.isCombo
                            )
                          }
                          className="bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                        />
                      </div>
                    </div>
                    <div className="font-bold text-lg text-blue-600">
                      Giá:{" "}
                      {formatVND(item.isCombo ? item.comboMoney : item.price)}
                    </div>
                  </div>
                </div>
              </List.Item>
            );
          }}
        />
      )}
    </Drawer>
  );
};

export default ViewCart;
