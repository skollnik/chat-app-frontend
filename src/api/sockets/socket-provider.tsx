import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvent } from "./types";
import { useApplicationStore } from "../../store/application.store";
const WebSocketContext = createContext<Socket<
  ServerToClientEvent,
  ClientToServerEvents
> | null>(null);
interface WebSocketProviderProps {
  children: React.ReactElement;
}
export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const token = useApplicationStore((state) => state.token);
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvent,
    ClientToServerEvents
  > | null>(null);
  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
    newSocket.on("connect", () => {
      console.log("connected");
    });
    setSocket(newSocket);
    return () => {
      console.log("socket disconnected");
      newSocket.disconnect();
    };
  }, []);
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
}
export const useSocket = () => {
  const context = useContext(WebSocketContext);
  //   if (!context) {
  //     throw new Error("Use socket should be inside of Context provider");
  //   }

  return { client: context };
};
