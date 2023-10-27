import { RouteObject } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../auth/pages/login.page";
import { RegisterPage } from "../auth/pages/register.page";
import { AuthWrapper } from "../auth/components/auth-wrapper.component";
import { HomePage } from "../home/pages/home.page";
import { MessagePage } from "../message/pages/message.page";

export const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "/messages/:chatId",
        element: (
          <AuthWrapper>
            <HomePage />
          </AuthWrapper>
        ),
      },
      {
        path: "/messages/",
        element: (
          <AuthWrapper>
            <HomePage />
          </AuthWrapper>
        ),
      },
    ],
  },
];
