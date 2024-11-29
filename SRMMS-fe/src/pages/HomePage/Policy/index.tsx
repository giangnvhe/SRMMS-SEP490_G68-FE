import React from "react";
import { FaRegFileAlt } from "react-icons/fa";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <header className="text-center space-y-6">
        <FaRegFileAlt className="text-6xl text-orange-500 mx-auto" />
        <h1 className="text-5xl font-extrabold text-gray-800">
          Điều Khoản và Điều Kiện
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Cảm ơn bạn đã chọn SRMMS Restaurant làm điểm đến trải nghiệm ẩm thực
          của mình. Chúng tôi tự hào mang đến cho bạn không gian sang trọng,
          dịch vụ chuyên nghiệp, và những món ăn tinh tế. Để đảm bảo chất lượng
          dịch vụ và quyền lợi của cả hai bên, trang này cung cấp các điều khoản
          và điều kiện áp dụng khi bạn sử dụng dịch vụ của chúng tôi. Vui lòng
          dành thời gian đọc kỹ để hiểu rõ các quy định trước khi sử dụng.
        </p>
      </header>

      {/* Nội dung chính */}
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-semibold text-orange-500 mb-4">
            1. Giới thiệu
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Tại SRMMS Restaurant, chúng tôi cam kết mang lại những trải nghiệm
            ẩm thực tuyệt vời nhất với tiêu chí luôn đặt khách hàng làm trung
            tâm. Nhà hàng của chúng tôi không chỉ là nơi để thưởng thức món ăn
            ngon, mà còn là nơi bạn có thể tận hưởng không gian ấm cúng, thân
            thiện nhưng vẫn mang nét tinh tế, hiện đại.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Chúng tôi hiểu rằng mỗi khách hàng đều có nhu cầu và kỳ vọng riêng.
            Chính vì thế, đội ngũ nhân viên của chúng tôi luôn sẵn sàng đáp ứng
            các yêu cầu đặc biệt, từ việc điều chỉnh thực đơn phù hợp với khẩu
            vị đến cung cấp các dịch vụ bổ sung trong các dịp đặc biệt như sinh
            nhật, họp mặt gia đình, hay hội nghị doanh nghiệp.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Để duy trì chất lượng và uy tín của SRMMS Restaurant, chúng tôi đã
            xây dựng các chính sách rõ ràng trong việc đặt bàn, hủy đặt bàn, và
            giải quyết các vấn đề liên quan đến quyền lợi của khách hàng. Việc
            đồng ý với các điều khoản và điều kiện này không chỉ bảo vệ quyền
            lợi của bạn mà còn giúp chúng tôi cung cấp dịch vụ một cách tốt
            nhất.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Chúng tôi mong rằng, thông qua sự hợp tác này, bạn sẽ có những trải
            nghiệm trọn vẹn và đáng nhớ nhất tại SRMMS Restaurant. Hãy cùng
            chúng tôi tạo nên những khoảnh khắc ý nghĩa qua từng bữa ăn!
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl font-semibold text-orange-500 mb-4">
            2. Quyền và Trách Nhiệm
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Cung cấp thông tin chính xác khi sử dụng dịch vụ.</li>
            <li>
              Bảo vệ thông tin cá nhân của khách hàng và không sử dụng cho mục
              đích thương mại nếu không được đồng ý.
            </li>
            <li>Vi phạm điều khoản có thể dẫn đến từ chối cung cấp dịch vụ.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl font-semibold text-orange-500 mb-4">
            3. Chính Sách Hủy và Hoàn Tiền
          </h2>
          <p className="text-gray-600">
            Bạn có thể hủy đặt bàn hoặc yêu cầu hoàn tiền theo các điều kiện
            sau:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Hủy trước 24 giờ: Không mất phí.</li>
            <li>Hủy trong vòng 24 giờ: Có thể áp dụng phí đặt cọc.</li>
            <li>Hoàn tiền trong vòng 7 ngày làm việc.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl font-semibold text-orange-500 mb-4">
            4. Quyền Sở Hữu Trí Tuệ
          </h2>
          <p className="text-gray-600">
            Tất cả nội dung trên website, bao gồm văn bản, hình ảnh, mã nguồn,
            thuộc quyền sở hữu trí tuệ của chúng tôi. Việc sao chép hoặc sử dụng
            mà không có sự đồng ý sẽ bị xử lý theo pháp luật.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-3xl font-semibold text-orange-500 mb-4">
            5. Thay Đổi Điều Khoản
          </h2>
          <p className="text-gray-600">
            SRMMS Restaurant có quyền thay đổi các điều khoản mà không cần thông
            báo trước. Bạn cần kiểm tra trang này để cập nhật điều khoản mới
            nhất.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-3xl font-semibold text-orange-500 mb-4">
            6. Liên Hệ
          </h2>
          <p className="text-gray-600">
            Nếu bạn có thắc mắc, vui lòng liên hệ qua các thông tin dưới đây:
          </p>
          <ul className="list-none space-y-2">
            <li>
              <span className="font-bold text-gray-800">Email:</span>{" "}
              support@srmmsrestaurant.com
            </li>
            <li>
              <span className="font-bold text-gray-800">Điện thoại:</span> +84
              123 456 789
            </li>
            <li>
              <span className="font-bold text-gray-800">Địa chỉ:</span> 123
              Đường ABC, Thành phố XYZ, Việt Nam
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
