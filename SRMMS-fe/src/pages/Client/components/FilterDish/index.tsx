import { Tabs } from "antd";
import { CategoryData } from "~/services/category_product";

interface IProps {
  categories: CategoryData[];
  selectedCategory: number | undefined;
  onTabChange: (key: string) => void;
}

const { TabPane } = Tabs;

const FilterDish = ({ categories, selectedCategory, onTabChange }: IProps) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <Tabs
          activeKey={selectedCategory?.toString() || "all"}
          onChange={onTabChange}
          className="bg-white rounded-lg shadow-md w-full p-2"
        >
          <TabPane
            tab={
              <span className="text-gray-600 font-medium hover:text-gray-800 text-sm sm:text-base">
                Tất cả
              </span>
            }
            key="all"
          />
          <TabPane
            tab={
              <span className="text-gray-600 font-medium hover:text-gray-800 text-sm sm:text-base">
                Combo
              </span>
            }
            key="Combo"
          />
          {categories.map((category) => (
            <TabPane
              tab={
                <span className="text-gray-600 font-medium hover:text-gray-800 text-sm sm:text-base">
                  {category.catName}
                </span>
              }
              key={category.catId.toString()}
            />
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FilterDish;
