import ButtonComponent from "~/components/ButtonComponent";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ListProduct = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-gray-800">Management Product</h1>
        <ButtonComponent
          icon={<PlusCircleOutlined />}
          onClick={() => navigate("/admin/add-product")}
          className="text-white font-medium rounded-md px-4 py-2 flex items-center gap-2"
        >
          Create Product
        </ButtonComponent>
      </div>
      <div className="mt-5 px-10">
        <div className="bg-white p-6 rounded-lg shadow-lg"></div>
      </div>
    </div>
  );
};
export default ListProduct;
