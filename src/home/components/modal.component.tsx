import { useState } from "react";
import { useAxios } from "../../api/useAxios";
import "../styles/modal.style.css";

type TProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal = ({ setOpenModal }: TProps) => {
  const [chatName, setChatName] = useState<string>("");
  const { axios } = useAxios();

  const handleChatNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChatName = event.target.value;
    setChatName(newChatName);
  };

  const onCreateChat = async () => {
    if (chatName.trim() === "") return;
    try {
      await axios.post("/chat", { name: chatName });
      setOpenModal(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="close-modal-button">
          <button onClick={() => setOpenModal(false)}>X</button>
        </div>
        <div className="title text-2xl">Create new chat</div>
        <div className="body">
          <input
            type="text"
            placeholder="Chat name"
            onChange={handleChatNameChange}
          />
        </div>
        <div className="footer">
          <button className="bg-gray-700" onClick={onCreateChat}>
            Create
          </button>
          <button onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
