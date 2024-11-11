import { Button, Card, Tabs, Typography } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { useQuery } from "react-query";
import { CategoryData, getListCategory } from "~/services/category_product";
import { getListProduct, ProductData } from "~/services/product";

const MenuInfor = () => {
  const [currentCategory, setCurrentCategory] = useState("0");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getListCategory({
        pagination: { pageNumber: 1, pageSize: 100 },
        pageNumber: 1,
        pageSize: 100,
      }),
  });

  const productsQuery = useQuery({
    queryKey: ["products", currentCategory],
    queryFn: () =>
      getListProduct({
        name: "",
        categoryId:
          currentCategory === "0" ? undefined : parseInt(currentCategory),
        pagination: { pageNumber: 1, pageSize: 100 },
        pageNumber: 1,
        pageSize: 100,
        totalProducts: 0,
      }),
    enabled: !!currentCategory,
  });

  const handleCategoryChange = (key: string) => {
    setCurrentCategory(key);
    localStorage.setItem("currentCategory", key);
  };

  const handleImageOpen = (imageUrl: string, name: string) => {
    console.log(`Opening image ${imageUrl} for ${name}`);
  };

  useEffect(() => {
    // Retrieve the selected category from localStorage
    const savedCategory = localStorage.getItem("currentCategory");
    if (savedCategory) {
      setCurrentCategory(savedCategory);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories</div>;

  return (
    <div className="flex-1 bg-gray-100 p-4 sm:p-6 overflow-auto">
      {/* Header with Tabs */}
      <div className="bg-white shadow-md px-4 py-4 rounded-xl">
        <Tabs
          defaultActiveKey={currentCategory}
          onChange={handleCategoryChange}
          className="flex justify-center"
          tabBarStyle={{
            borderBottom: "none",
            background: "linear-gradient(to right, #4b6cb7, #182848)",
            borderRadius: "10px",
            padding: "8px 16px",
          }}
          tabBarGutter={16}
        >
          <TabPane
            tab={
              <div className="flex items-center gap-2 text-white text-lg hover:scale-105 transition-all duration-300">
                <span>Tất cả</span>
              </div>
            }
            key="0"
          />
          {data?.data?.map((category: CategoryData) => (
            <TabPane
              tab={
                <div className="flex items-center gap-2 text-white text-lg hover:scale-105 transition-all duration-300">
                  <FaUtensils />
                  <span>{category.catName}</span>
                </div>
              }
              key={category.catId.toString()}
            />
          ))}
        </Tabs>
      </div>

      {/* Product Grid */}
      <div className="flex-1 bg-gray-100 p-4 sm:p-6">
        {productsQuery.isLoading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            <Typography.Text>Loading products...</Typography.Text>
          </div>
        ) : productsQuery.data?.data?.products?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {productsQuery.data.data.products.map((product: ProductData) => (
              <Card
                key={product.productId}
                hoverable
                cover={
                  <img
                    alt={product.productName}
                    src={product.image}
                    className="h-48 w-full object-cover transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() =>
                      handleImageOpen(product.image, product.productName)
                    }
                  />
                }
                className="rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-2 sm:p-4">
                  <Typography.Text className="block truncate text-base sm:text-lg font-semibold">
                    {product.productName}
                  </Typography.Text>
                  <Typography.Paragraph className="truncate text-gray-500 text-sm sm:text-base">
                    {product.description}
                  </Typography.Paragraph>
                  <div className="flex items-center justify-between">
                    <Typography.Title
                      level={5}
                      className="text-green-500 text-sm sm:text-base"
                    >
                      ${product.price.toFixed(2)}
                    </Typography.Title>
                    <Typography.Text
                      type="secondary"
                      className="text-xs sm:text-sm"
                    >
                      Calories: {product.calories}
                    </Typography.Text>
                  </div>
                  <Button
                    type="primary"
                    block
                    className="mt-2 sm:mt-4 transition-transform transform hover:scale-105"
                    onClick={() =>
                      console.log(`Viewing details for ${product.productName}`)
                    }
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-60 text-gray-500">
            <Typography.Text>No items found.</Typography.Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuInfor;
