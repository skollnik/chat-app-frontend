import { RiSendPlaneFill } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { useAxios } from "../../api/useAxios";
import { useApplicationStore } from "../../store/application.store";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

type TProps = {
  setMessages: (m: any) => void;
};

export const NewMessage = ({ setMessages }: TProps) => {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const { axios } = useAxios();
  const user = useApplicationStore((state) => state.user);
  const [text, setText] = useState<string>("");

  const handleNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = event.target.value;
    setText(newMessage);
  };

  const setEmoji = (e: any) => {
    if (inputRef.current) {
      inputRef.current.value += e.emoji;
      setText(inputRef.current.value);
    }
  };

  const sendMessage = async () => {
    if (text === "") return;
    try {
      await axios.post("/messages", {
        text,
        chatId: Number(params.chatId),
        userId: user?.id,
      });

      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setText("");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="flex relative text-center self-center w-[90%] rounded-md items-center bg-gray-100 h-10">
      <BsEmojiSmile
        className="ml-2 text-gray-500"
        size={25}
        onClick={() => setShowEmoji((prevValue) => !prevValue)}
        cursor="pointer"
      />
      {showEmoji ? (
        <div className="absolute bottom-10">
          <EmojiPicker
            width={400}
            height={400}
            onEmojiClick={(e) => {
              setEmoji(e);
            }}
          />
        </div>
      ) : null}
      <input
        ref={inputRef}
        className="w-[97%] h-full focus:outline-none mx-1 bg-gray-100"
        type="text"
        onChange={handleNewMessage}
        onKeyDown={(event) => {
          event.key === "Enter" && sendMessage();
        }}
      />
      <RiSendPlaneFill
        size={25}
        className="text-gray-500 mr-2"
        cursor="pointer"
        onClick={sendMessage}
      />
    </div>
  );
};
