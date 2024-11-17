import { Slider, Tabs, Typography } from "antd";
import { FaUtensils } from "react-icons/fa";
import { CategoryData } from "~/services/category_product";

interface IProps {
  categories: CategoryData[];
  currentCategory: string;
  onChange: (key: string) => void;
  handlePriceChange: (value: number[]) => void;
}

const CategoryTabs = ({
  categories,
  currentCategory,
  onChange,
  handlePriceChange,
}: IProps) => {
  const items = [
    { label: <span>Tất cả</span>, key: "0" },
    ...categories.map(({ catId, catName }) => ({
      label: (
        <div className="flex items-center gap-2 text-lg hover:scale-105 transition-all duration-300">
          <FaUtensils />
          <span>{catName}</span>
        </div>
      ),
      key: catId.toString(),
    })),
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey={currentCategory}
        onChange={onChange}
        tabBarGutter={16}
        items={items} 
      />
      <div className="pb-2">
        <Typography.Title level={5}>Chọn giá tiền</Typography.Title>
        <Slider
          range
          min={0}
          max={1000000}
          step={10000}
          defaultValue={[0, 1000000]}
          onAfterChange={handlePriceChange}
          tooltip={{ formatter: (value) => `${value} VNĐ` }} 
        />
      </div>
    </div>
  );
};

export default CategoryTabs;
