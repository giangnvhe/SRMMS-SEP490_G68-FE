import { useState } from "react";
import { debounce } from "lodash";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = debounce(async () => {
    if (!input.trim()) return;

    // Cập nhật tin nhắn người dùng
    setMessages([...messages, { sender: "user", text: input }]);

    try {
      const response = await axios.post(
        "https://api.cohere.ai/generate",
        {
          model: "command-r-08-2024",
          prompt: input,
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer eXlrZ32tEG7azgHoXuEwYdz67oLeLP0YFXd6AQZR`,
          },
        }
      );

      const botMessage = response.data.text;
      setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Có lỗi xảy ra, vui lòng thử lại." },
      ]);
    }

    setInput(""); // Xóa input sau khi gửi
  }, 1000);

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
      <div className="h-96 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 flex ${
              msg.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "bot"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
