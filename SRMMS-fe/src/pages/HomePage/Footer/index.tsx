import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "~/assets/images/logo-home.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <img src={logo} alt="Logo" className="w-24 mb-4" />
            <p className="text-sm">
              Tinh Hoa Ẩm Thực - Nơi hội tụ tinh hoa ẩm thực Việt Nam
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <p className="mb-2">123 Đường ABC, Quận XYZ</p>
            <p className="mb-2">Thành phố Hà Nội, Việt Nam</p>
            <p className="mb-2">Điện thoại: (123) 456-7890</p>
            <p>Email: srmms@tinhhoaamthuc.com</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Trang chủ
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Về chúng tôi
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Thực đơn
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Đặt bàn
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-gray-300">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-gray-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-gray-300">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; 2024 Tinh Hoa Ẩm Thực. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
