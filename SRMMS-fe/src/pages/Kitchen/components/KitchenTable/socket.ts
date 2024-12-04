import io from "socket.io-client";

// Replace with your actual backend WebSocket/Socket.IO endpoint
export const socket = io("https://localhost:8081", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Optional: Add connection error handling
socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});
