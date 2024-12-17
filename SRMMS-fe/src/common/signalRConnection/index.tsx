// import * as signalR from "@microsoft/signalr";

// const signalRConnection = new signalR.HubConnectionBuilder()
//   .withUrl("https://localhost:8081/bookingHub") // Replace with your backend SignalR hub URL
//   .configureLogging(signalR.LogLevel.Information)
//   .build();

// export const startSignalRConnection = async () => {
//   try {
//     await signalRConnection.start();
//     console.log("SignalR Connected!");
//   } catch (error) {
//     console.error("SignalR Connection Error: ", error);
//     setTimeout(startSignalRConnection, 5000); // Retry connection
//   }
// };

// export default signalRConnection;
