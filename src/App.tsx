import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import "./App.css";
import { WebSocketProvider } from "./api/sockets/socket-provider";

function App() {
  return (
    <WebSocketProvider>
      <Outlet />
    </WebSocketProvider>
  );
}

export default App;
