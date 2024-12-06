import React from "react";
import { CategoryData } from "~/services/category_product";

interface FilterDishProps {
  categories: CategoryData[];
  selectedCategory: number | undefined;
  selectedView: "products" | "combos";
  onTabChange: (key: string) => void;
}

const FilterDish: React.FC<FilterDishProps> = ({
  categories,
  selectedCategory,
  selectedView,
  onTabChange,
}) => {
  return (
    <div className="w-full py-2">
      {/* Container with horizontal scroll */}
      <div className="flex space-x-2 px-2 overflow-x-auto no-scrollbar">
        {/* All Items Button */}
        <button
          onClick={() => {
            onTabChange("all");
          }}
          className={`
            flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${
              selectedView === "products" && selectedCategory === undefined
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
          `}
        >
          Tất cả
        </button>
        {/* Category Buttons */}
        {categories.map((category) => (
          <button
            key={category.catId}
            onClick={() => {
              if (selectedCategory === category.catId) {
                // If clicking the same category again, reset to 'all'
                onTabChange("all");
              } else {
                onTabChange(category.catId.toString());
              }
            }}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${
                selectedView === "products" &&
                selectedCategory === category.catId
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            {category.catName}
          </button>
        ))}

        {/* Combo Button */}
        <button
          onClick={() => onTabChange("Combo")}
          className={`
            flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${
              selectedView === "combos"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
          `}
        >
          Combo
        </button>
      </div>

      {/* Mobile-specific adjustments */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default FilterDish;
