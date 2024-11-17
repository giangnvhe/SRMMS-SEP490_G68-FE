import { CloseOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Drawer, List, Typography } from 'antd';
import { formatVND } from "~/common/utils/formatPrice";
import { ProductData } from "~/services/product";

interface IProps {
  cart: ProductData[];
  visible: boolean;
  onClose: () => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

const ViewCart = ({
  cart,
  visible,
  onClose,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: IProps) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCartOutlined className="text-xl" />
            <span className="text-lg font-semibold">Giỏ hàng của bạn</span>
            <span className="text-gray-500">({cart.length} món)</span>
          </div>
          {cart.length > 0 && (
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={onClearCart}
              className="flex items-center"
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
        cart.length > 0 ? (
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
                Thanh toán
              </Button>
            </div>
          </div>
        ) : null
      }
    >
      {cart.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-500">
          <ShoppingCartOutlined className="text-6xl mb-4" />
          <Typography.Text className="text-lg">
            Giỏ hàng của bạn đang trống
          </Typography.Text>
        </div>
      ) : (
        <List
          className="cart-items"
          itemLayout="horizontal"
          dataSource={cart}
          renderItem={(item, index) => (
            <List.Item
              className="hover:bg-gray-50 transition-colors rounded-lg px-2"
              actions={[
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => onRemoveItem(index)}
                />,
              ]}
            >
              <div className="flex gap-4 py-2 flex-1">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-base mb-1 line-clamp-2">
                    {item.productName}
                  </h4>
                  <div className="text-sm text-gray-500 mb-1">
                    {item.calories} calories
                  </div>
                  <div className="font-semibold text-blue-500">
                    {formatVND(item.price)}
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};

export default ViewCart;
