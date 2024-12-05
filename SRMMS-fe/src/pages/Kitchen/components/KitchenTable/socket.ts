import io from "socket.io-client";

export const socket = io("http://localhost:3000/", {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
});

socket.on("connect", () => {
  console.log("Socket connected successfully");
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});
