import { toast } from "react-toastify";
import { Logout } from "../components/logout.component";
import { GetAllChats } from "../components/chats.component";
import { AddNewChat } from "../components/add-new-chat.component";
import { useState } from "react";
import { Modal } from "../components/modal.component";

export const HomePage = () => {
  return (
    <>
      <div className="bg-gray-700 w-full h-screen max-h-full flex flex-col">
        <Logout />
        <GetAllChats />
      </div>
    </>
  );
};
