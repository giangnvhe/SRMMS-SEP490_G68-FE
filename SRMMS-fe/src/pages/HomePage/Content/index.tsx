import classNames from "classnames";
import Grap1 from "./grap1";
import Grap2 from "./Grap2";
import Grap3 from "./Grap3";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fakeFeedbacks } from "../components/dataFeedback";

const cx = classNames.bind(styles);

interface Feedback {
  feedback: string;
  rateStar: number; // Giá trị từ 1 đến 5
  acc_id: string; // ID của tài khoản khách hàng
  create_at: Date;
  update_at: Date;
}

const Content = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(fakeFeedbacks);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState(fakeFeedbacks);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;

  const [formData, setFormData] = useState({
    feedback: "",
    rateStar: 5,
    acc_id: "guest",
  });

  const filterFeedbackByRating = (rating: number) => {
    const filtered = fakeFeedbacks.filter(
      (feedback) => feedback.rateStar >= rating
    );
    setFilteredFeedbacks(filtered);
    setCurrentPage(1);
  };

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: Feedback = {
      feedback: formData.feedback,
      rateStar: formData.rateStar,
      acc_id: formData.acc_id,
      create_at: new Date(),
      update_at: new Date(),
    };
    setFeedbacks([...feedbacks, newFeedback]); // Thêm feedback mới
    setFormData({ feedback: "", rateStar: 5, acc_id: "guest" }); // Reset form
  };

  return (
    <div className={cx(styles["content-container"])}>
      <div className={cx("content-line")}>
        <div className={cx("content-line-text")}>
          <h1>Chào mừng đến với Tinh Hoa Ẩm Thực</h1>
          <a onClick={() => navigate("/dat-ban")} className="cursor-pointer">
            Đặt Bàn
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Grap1 />
      </div>
      <div className="container mx-auto px-4 py-8">
        <Grap2 />
      </div>
      <div className="container mx-auto px-4 py-8">
        <Grap3 />
      </div>
      {/* Phần hiển thị Feedback */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Phản Hồi Từ Khách Hàng</h2>
        {/* Chọn lọc đánh giá sao */}
        <div className="mb-4">
          <button
            onClick={() => filterFeedbackByRating(5)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            5 ⭐
          </button>
          <button
            onClick={() => filterFeedbackByRating(4)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 ml-2"
          >
            4 ⭐
          </button>
          <button
            onClick={() => filterFeedbackByRating(3)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 ml-2"
          >
            3 ⭐
          </button>
        </div>

        {/* Hiển thị feedback đã lọc */}
        <div className="space-y-4">
          {currentFeedbacks.map((fb, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="font-semibold">ID: {fb.acc_id}</h3>
              <p className="text-gray-700">{fb.feedback}</p>
              <p className="text-orange-500 font-semibold">
                Đánh giá: {fb.rateStar} ⭐
              </p>
              <p className="text-sm text-gray-500">
                Ngày tạo: {fb.create_at.toLocaleDateString()} | Cập nhật:{" "}
                {fb.update_at.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2"
          >
            Previous
          </button>
          <span className="flex items-center">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 ml-2"
          >
            Next
          </button>
        </div>

        {/* Gửi feedback */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Gửi Phản Hồi Của Bạn</h2>
          <form
            onSubmit={handleFeedbackSubmit}
            className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phản hồi
              </label>
              <textarea
                value={formData.feedback}
                onChange={(e) =>
                  setFormData({ ...formData, feedback: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Đánh giá (1-5 sao)
              </label>
              <select
                value={formData.rateStar}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rateStar: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mã tài khoản (tuỳ chọn)
              </label>
              <input
                type="text"
                value={formData.acc_id}
                onChange={(e) =>
                  setFormData({ ...formData, acc_id: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Gửi Phản Hồi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Content;
