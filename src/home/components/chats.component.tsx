import { useEffect, useState } from "react";
import { useAxios } from "../../api/useAxios";
import { Chat } from "../model/chat.model";
import { MessagePage } from "../../message/pages/message.page";
import { useNavigate, useParams } from "react-router-dom";
import { AddNewChat } from "./add-new-chat.component";
import { Modal } from "./modal.component";
import { useSocket } from "../../api/sockets/socket-provider";

export const GetAllChats = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { client } = useSocket();
  const [chats, setChats] = useState<Chat[]>([]);
  const params = useParams();
  const [selectedChatId, setSelectedChatId] = useState<number | undefined>(
    +(params.chatId ?? -1)
  );
  const { axios } = useAxios();
  const getAllChats = async () => {
    const resp = await axios.get("/chat");
    setChats(resp.data);
  };

  useEffect(() => {
    client?.on("chatCreated", () => {
      getAllChats();
    });
  }, [client]);

  useEffect(() => {
    getAllChats();
  }, []);

  const handleChatClick = (chatId: number) => {
    setSelectedChatId(chatId);
    navigate(`/messages/${chatId}`);
  };

  return (
    <div className="flex h-4/5">
      <div className="flex justify-start w-1/6 max-h-[850px] flex-col overflow-y-auto overflow-x-hidden box-border">
        <AddNewChat setOpenModal={setOpenModal} />
        {chats.map((chat) => (
          <div
            onClick={() => handleChatClick(chat.id)}
            key={chat.id}
            className={`p-2 m-1 w-full text-center cursor-pointer ${
              chat.id === selectedChatId ? "bg-gray-500" : "bg-gray-600"
            }`}
          >
            <p className="text-white">{chat.name}</p>
          </div>
        ))}
      </div>
      <MessagePage />
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </div>
  );
};
