import { Spin } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useNotification from "~/hooks/useNotification";
import { getListCategory } from "~/services/category_product";
import { getListProduct } from "~/services/product";
import CategoryTabs from "../components/CategoryTabs";
import ListProduct from "../components/ListProduct";

const MenuInfor = () => {
  const [currentCategory, setCurrentCategory] = useState("0");
  const { errorMessage } = useNotification();
  const [priceRange, setPriceRange] = useState<[number, number] | null>([
    0, 1000000,
  ]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getListCategory({
        pagination: { pageNumber: 1, pageSize: 100 },
        pageNumber: 1,
        pageSize: 100,
      }),
  });

  const productsQuery = useQuery({
    queryKey: ["products", currentCategory, priceRange],
    queryFn: () =>
      getListProduct({
        name: "",
        categoryId:
          currentCategory === "0" ? undefined : parseInt(currentCategory),
        pageNumber: 1,
        pageSize: 100,
        totalProducts: 0,
        minPrice: priceRange ? priceRange[0] : 0,
        maxPrice: priceRange ? priceRange[1] : 1000000,
      }),
    enabled: !!currentCategory,
  });

  const handleCategoryChange = (key: string) => {
    setCurrentCategory(key);
    localStorage.setItem("currentCategory", key);
  };

  useEffect(() => {
    const savedCategory = localStorage.getItem("currentCategory");
    if (savedCategory) {
      setCurrentCategory(savedCategory);
    }
  }, []);

  const handlePriceChange = (value: number[]) => {
    if (value.length === 2) {
      setPriceRange(value.length === 2 ? [value[0], value[1]] : null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (isError && error) {
    const axiosError = error as AxiosError;
    errorMessage({
      description: axiosError.message || "Đã có lỗi xảy ra!!!",
    });
  }
  return (
    <div className="flex-1 bg-gray-100 p-4 sm:p-6 overflow-auto">
      <div className="bg-white shadow-md px-4 rounded-xl">
        <CategoryTabs
          categories={data?.data || []}
          currentCategory={currentCategory}
          onChange={handleCategoryChange}
          handlePriceChange={handlePriceChange}
        />
      </div>

      <div className="flex-1 bg-gray-100 p-4 sm:p-6">
        <ListProduct
          products={productsQuery.data?.data?.products || []}
          isLoading={productsQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default MenuInfor;
