import { Badge, Button, Card, List } from "antd";
import { CombosData } from "~/services/combos";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { formatVND } from "~/common/utils/formatPrice";
import { CONTENT_HEIGHT } from "../const";

interface IProps {
  comboData: CombosData[];
  onAddToComboCart: (combo: CombosData) => void;
}

const ComboContent = ({ comboData, onAddToComboCart }: IProps) => {
  return (
    <div style={{ height: CONTENT_HEIGHT, overflowY: "auto", padding: "16px" }}>
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
        dataSource={comboData}
        renderItem={(item: CombosData) => (
          <List.Item>
            <Card
              hoverable
              className="overflow-hidden rounded-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              cover={
                <div className="relative h-48 overflow-hidden bg-gray-50">
                  <img
                    alt={item.comboName}
                    src={item.comboImg}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              }
              bodyStyle={{ padding: "16px" }}
              actions={[
                <div className="px-4 pb-4">
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined className="text-lg" />}
                    onClick={() => onAddToComboCart(item)}
                    className="h-10 w-full rounded-lg font-medium transition-transform hover:-translate-y-0.5"
                  >
                    Thêm món ăn
                  </Button>
                </div>,
              ]}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                  {item.comboName}
                </h3>
                <Badge
                  count={`${item.ProductNames?.length || 0} món`}
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
                  {formatVND(item.comboMoney)}
                </span>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ComboContent;
