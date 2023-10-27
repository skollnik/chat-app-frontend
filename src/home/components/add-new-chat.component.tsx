import { IoAddOutline } from "react-icons/io5";

type TProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddNewChat = ({ setOpenModal }: TProps) => {
  return (
    <div
      className="bg-gray-600 p-2 m-1 w-full text-center cursor-pointer"
      onClick={() => setOpenModal(true)}
    >
      <IoAddOutline
        cursor="pointer"
        size={25}
        color="white"
        className="w-full"
      />
    </div>
  );
};
