import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useApplicationStore } from "../store/application.store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });

export const useAxios = () => {
  const token = useApplicationStore((state) => state.token);
  const logout = useApplicationStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.setAuthorization(`Bearer ${token}`);
        }
        return config;
      }
    );

    const unauthorizedInterceptor = axiosInstance.interceptors.response.use(
      function (response: AxiosResponse) {
        return response;
      },
      function (error) {
        console.log(error);
        if (error.response.status === 401) {
          logout();
          navigate("login");
          // toast.error("Your session has expired!", {
          //   position: "bottom-right",
          // });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(tokenInterceptor);
      axios.interceptors.response.eject(unauthorizedInterceptor);
    };
  }, [logout, navigate, token]);
  return { axios: axiosInstance };
};
