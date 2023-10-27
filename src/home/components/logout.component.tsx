import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useApplicationStore } from "../../store/application.store";

export const Logout = () => {
  const navigate = useNavigate();
  const logout = useApplicationStore((state) => state.logout);
  const onLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="w-full flex justify-end px-10 py-5">
      <FiLogOut onClick={onLogout} cursor="pointer" size={25} color="white" />
    </div>
  );
};
