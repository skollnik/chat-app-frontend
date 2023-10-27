import { useParams } from "react-router-dom";
import { useAxios } from "../../api/useAxios";
import { useEffect, useRef, useState } from "react";
import { User } from "../../auth/model/user.model";
import { useApplicationStore } from "../../store/application.store";
import { NewMessage } from "../components/new-message-input.component";
import { useSocket } from "../../api/sockets/socket-provider";

export type Message = {
  text: string;
  timestamp: Date;
  chatId: number;
  user: User;
};

export const MessagePage = () => {
  const user = useApplicationStore((state) => state.user);
  const { axios } = useAxios();
  const { client } = useSocket();
  const { chatId } = useParams();
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const getAllMessages = async () => {
    if (chatId === undefined) return;
    const resp = await axios.get(`/messages/${chatId}`);
    setMessages(resp.data);
  };

  useEffect(() => {
    client?.on("newMessage", (msg: Message) => {
      console.log(chatId, msg.chatId);
      if (chatId && msg.chatId === parseInt(chatId)) {
        console.log("adding message");
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      client?.off("newMessage");
    };
  }, [client, chatId]);

  useEffect(() => {
    getAllMessages();
  }, [chatId]);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="ml-12 mr-32 flex flex-col flex-grow bg-gray-600 rounded-md">
      <div className="h-[90%] overflow-y-auto" ref={messageContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className="flex flex-grow m-2 items-end">
            <div className="flex flex-col w-full">
              <p
                className={`text-sm text-gray-900 ${
                  user?.id === message.user?.id ? "text-right" : ""
                }`}
              >
                {message.user?.firstName} {message.user?.lastName}
              </p>
              <div
                className={`bg-gray-500 p-2 w-max max-w-40% rounded-2xl text-gray-100 ${
                  user?.id === message.user?.id ? "self-end" : ""
                }`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>
      <NewMessage setMessages={setMessages} />
    </div>
  );
};
