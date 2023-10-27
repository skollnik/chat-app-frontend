import { useApplicationStore } from "../../store/application.store";
import { Navigate } from "react-router-dom";

type TProps = {
  children: any;
};

export const AuthWrapper = ({ children }: TProps) => {
  const token = useApplicationStore((state) => state.token);

  if (!token) return <Navigate to={"/login"} />;
  return children;
};
