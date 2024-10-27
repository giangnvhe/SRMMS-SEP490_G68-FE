import drink from "~/assets/images/drink.png";
import dishd from "~/assets/images/dishd.png";
import organic from "~/assets/images/organic-food.jfif";
import seaFood from "~/assets/images/sea-food.jfif";
import vegeta from "~/assets/images/vegeta.jfif";
import sideDish from "~/assets/images/side-dish.jfif";

const Grap1 = () => {
  return (
    <div>
      <h1
        id="about"
        className="text-3xl font-bold mb-6 text-center relative pb-3"
      >
        Về chúng tôi
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-orange-400"></span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex gap-3 bg-white p-4 rounded shadow">
          <div className="flex justify-center items-center">
            <img
              src={drink}
              alt=""
              className="w-28 h-16  object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-orange-400">Đồ Uống</h2>
            <p className="text-sm">
              Thưởng thức các loại đồ uống tinh tế – từ cà phê đậm đà, trà thơm
              dịu đến sinh tố mát lạnh, tất cả đều mang đến trải nghiệm sảng
              khoái và tràn đầy năng lượng.
            </p>
          </div>
        </div>
        <div className="flex gap-3 bg-white p-4 rounded shadow">
          <div className="flex justify-center items-center">
            <img
              src={dishd}
              alt=""
              className="w-28 h-16 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-orange-400">Món Ăn</h2>
            <p className="text-sm">
              Khám phá hương vị đặc trưng của ẩm thực Việt Nam qua các món ăn đa
              dạng và tinh tế.
            </p>
          </div>
        </div>
        <div className="flex gap-3 bg-white p-4 rounded shadow">
          <div className="flex justify-center items-center overflow-hidden">
            <img
              src={seaFood}
              alt=""
              className="w-28 h-16  object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-orange-400">Hải Sản</h2>
            <p className="text-sm">
              Thưởng thức hải sản tươi ngon, được chế biến theo phong cách độc
              đáo của nhà hàng.
            </p>
          </div>
        </div>
        <div className="flex gap-3 bg-white p-4 rounded shadow">
          <div className="flex justify-center items-center">
            <img
              src={organic}
              alt=""
              className="w-28 h-16  object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-orange-400">
              Thực Phẩm Hữu Cơ
            </h2>
            <p className="text-sm">
              Sử dụng nguyên liệu hữu cơ, đảm bảo sức khỏe và hương vị tự nhiên
              cho mỗi món ăn.
            </p>
          </div>
        </div>
        <div className="flex gap-3 bg-white p-4 rounded shadow">
          <div className="flex justify-center items-center">
            <img
              src={sideDish}
              alt=""
              className="w-28 h-16  object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-orange-400">Điểm Tâm</h2>
            <p className="text-sm">
              Bắt đầu ngày mới với các món điểm tâm đa dạng, từ truyền thống đến
              hiện đại.
            </p>
          </div>
        </div>
        <div className="flex gap-3 bg-white p-4 rounded shadow">
          <div className="flex justify-center items-center">
            <img
              src={vegeta}
              alt=""
              className="w-28 h-16  object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-orange-400">Rau Xanh</h2>
            <p className="text-sm">
              Đa dạng các loại rau xanh tươi ngon, đảm bảo dinh dưỡng cho bữa ăn
              của bạn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grap1;
