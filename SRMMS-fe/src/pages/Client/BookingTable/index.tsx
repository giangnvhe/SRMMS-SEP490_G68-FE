import BookingForm from "./BookingForm";
import background from "~/assets/images/background.jpg";

const BookingTable = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-orange-400 text-white py-6 text-center">
        <h1 className="text-4xl font-bold">SRMMS Restaurant</h1>
        <p className="mt-2 text-lg">Trải Nghiệm Ẩm Thực Đẳng Cấp</p>
      </div>

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto w-full px-4 py-8 gap-8">
        <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Thông Tin Đặt Bàn
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              SRMMS tại Việt Nam giúp bạn dễ dàng đặt chỗ trước. Chúng tôi mang
              đến trải nghiệm ẩm thực tuyệt vời cùng nguyên liệu tươi ngon.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Khung Giờ Phục Vụ</h3>
              <div className="space-y-2">
                <p>• Ca 1: 10:00 - 15:00</p>
                <p>• Ca 2: 16:30 - 22:30</p>
              </div>
            </div>
            <div className="relative bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Hình Ảnh Nhà Hàng</h3>
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={background}
                  alt="Hình Ảnh Nhà Hàng"
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
