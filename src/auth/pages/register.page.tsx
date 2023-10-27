import { useNavigate } from "react-router-dom";
import { useApplicationStore } from "../../store/application.store";
import { useForm } from "react-hook-form";
import {
  REGISTER_FORM_DEFAULT_VALUES,
  REGISTRATION_VALIDATION_SCHEMA,
} from "../auth.constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../../api/useAxios";

type TFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const signIn = useApplicationStore((state) => state.login);

  const {
    handleSubmit,
    setError,
    formState: { errors, isValid },
    register,
  } = useForm<TFormValues>({
    defaultValues: REGISTER_FORM_DEFAULT_VALUES,
    resolver: yupResolver(REGISTRATION_VALIDATION_SCHEMA),
    mode: "onChange",
  });

  const login = async ({
    firstName,
    lastName,
    email,
    password,
  }: TFormValues) => {
    try {
      const resp = await axiosInstance.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      const { user } = await signIn({ email, password });
      if (user) {
        navigate("/messages/");
        return;
      }
    } catch (error: any) {
      setError("root.serverError", { message: error.response.data.message });
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-700 w-full h-screen max-h-full">
      <div className="w-full max-w-xs">
        <h1 className="w-full flex justify-center items-center mb-3 text-3xl font-extralight">
          Chat App
        </h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="first-name"
            >
              First name
            </label>
            <input
              {...register("firstName")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first-name"
              type="text"
              placeholder="First name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs italic">
                {errors.firstName.message}
              </p>
            )}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="last-name"
            >
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="last-name"
              type="text"
              placeholder="Last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs italic">
                {errors.lastName.message}
              </p>
            )}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="**********"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit(login)}
              disabled={!isValid}
              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              type="button"
            >
              Register
            </button>
          </div>
          {errors.root?.serverError && (
            <p className="text-red-500 text-xs italic">
              {errors.root.serverError.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
