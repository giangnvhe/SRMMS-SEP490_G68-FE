import { Modal, Spin } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { FeedbackData, getListFeedbacks } from "~/services/feedback";
import FeedbackForm from "../components/FormFeedback";
import Grap1 from "./grap1";
import Grap2 from "./Grap2";
import Grap3 from "./Grap3";
import styles from "./index.module.scss";
import Chatbot from "~/pages/ChatAi";
import { MessageOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const Content = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery(
    ["feedbacks"],
    getListFeedbacks
  );

  const feedbacks: FeedbackData[] = data?.feedbacks || [];
  const [filteredFeedbacks, setFilteredFeedbacks] = useState(feedbacks);

  useEffect(() => {
    const sortedFeedbacks = [...feedbacks].sort(
      (a, b) => b.rateStar - a.rateStar
    );
    setFilteredFeedbacks(sortedFeedbacks);
  }, [feedbacks]);

  const filterFeedbackByRating = (rating: number) => {
    const filtered = feedbacks.filter(
      (feedback) => feedback.rateStar === rating
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) return <div>Error loading feedbacks</div>;

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
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Phản Hồi Từ Khách Hàng</h2>
        {/* Filter by Star Rating */}
        <div className="mb-4">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => filterFeedbackByRating(rating)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 ml-2"
            >
              {rating} ⭐
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {currentFeedbacks.length === 0 ? (
            <p className="text-center text-gray-500 font-semibold text-lg bg-gray-100 py-4 px-6 rounded-lg shadow-lg">
              Chưa có phản hồi nào
            </p>
          ) : (
            currentFeedbacks.map((fb) => (
              <div
                key={fb.feedbackId}
                className="p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <h3 className="font-semibold">
                  Tên khách hàng: {fb.accountFullName}
                </h3>
                <p className="text-gray-700">Phản hồi: {fb.feedback1}</p>
                <div className="text-orange-500 font-semibold">
                  Đánh giá :
                  {Array.from({ length: fb.rateStar }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Ngày tạo: {new Date(fb.createdAt).toLocaleDateString()} | Cập
                  nhật: {new Date(fb.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
        {/* Pagination */}
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
      </div>

      {/* Gửi feedback */}
      <div className="p-4">
        <FeedbackForm refetch={refetch} />
      </div>
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
      >
        <MessageOutlined style={{ fontSize: "24px" }} />
      </button>

      {/* Modal Chat */}
      <Modal
        title="Chat AI"
        open={isChatOpen}
        onCancel={() => setIsChatOpen(false)}
        footer={null}
        mask={false}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          margin: 0,
          padding: 0,
        }}
        width={500}
      >
        <Chatbot />
      </Modal>
    </div>
  );
};

export default Content;
