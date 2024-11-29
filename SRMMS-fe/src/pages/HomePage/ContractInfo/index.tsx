import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import khong_gian from "~/assets/images/khong-gian.jpg";

const ContactAndAbout: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thông tin đã được gửi!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Giới thiệu nhà hàng */}
      <section className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-800">
          Chào mừng đến với SRMMS Restaurant
        </h2>
        <p className="text-lg text-gray-600">
          SRMMS Restaurant là một nhà hàng hiện đại với sự kết hợp hoàn hảo giữa
          <span className="font-bold"> **ẩm thực truyền thống** </span> và{" "}
          <span className="font-bold"> **hương vị quốc tế**</span>. Chúng tôi tự
          hào mang đến trải nghiệm tuyệt vời với không gian ấm cúng và dịch vụ
          tận tâm.
        </p>
        <img
          src={khong_gian}
          alt="Không gian nhà hàng"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </section>

      {/* Thông tin liên hệ và biểu mẫu */}
      <section className="flex flex-col lg:flex-row gap-16">
        {/* Thông tin liên hệ */}
        <div className="flex-1 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">Liên Hệ</h3>
          <p className="text-lg text-gray-600">
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn. Đừng ngần ngại
            liên hệ với chúng tôi để biết thêm thông tin!
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-2xl text-orange-500" />
              <p className="text-lg text-gray-600">+84 123 456 789</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-2xl text-orange-500" />
              <p className="text-lg text-gray-600">
                support@srmmsrestaurant.com
              </p>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-2xl text-orange-500" />
              <p className="text-lg text-gray-600">
                123 Đường ABC, Thành phố XYZ, Việt Nam
              </p>
            </div>
          </div>
        </div>

        {/* Biểu mẫu liên hệ */}
        <form
          className="flex-1 bg-white shadow-md rounded-lg p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Gửi lời nhắn
          </h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Họ tên"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Lời nhắn"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Gửi
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactAndAbout;
