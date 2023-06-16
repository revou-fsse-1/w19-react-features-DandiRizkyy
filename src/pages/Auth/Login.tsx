import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../provider/Provider";
import axios from "axios";

interface FormProps {
  email: string;
  password: string;
}

export const Login = () => {
  //   const context = useContext(AppContext);
  // useEffect(() => {
  //   context?.registerUser();
  // }, []);

  const schema = yup
    .object({
      email: yup.string().email().required("Email is required"),
      password: yup.string().min(5).required("Password is required"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: FormProps) => {
    // context?.saveCategory({ name: data.name });
    // context?.registerUser({
    //   name: data.name,
    //   email: data.email,
    //   password: data.password,
    // });
    const response = await axios.post(
      "https://mock-api.arikmpt.com/api/user/login",
      {
        email: data.email,
        password: data.password,
      }
    );
    console.log(response);
    window.localStorage.setItem("token", response.data.data.token);
    navigate("/");
  };

  return (
    <div className="flex border border-black flex-col px-5 py-5 items-center justify-center">
      <div className="block mt-16 justify-center items-center text-center max-w-sm rounded-lg bg-white px-24 py-24 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <h2 className="text-3xl font-bold mb-3">Login Page</h2>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <input
                // {...field}
                value={field.value}
                onChange={field.onChange}
                type="email"
                id="helper-email"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="input email here..."
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div>
              <input
                // {...field}
                value={field.value}
                onChange={field.onChange}
                type="password"
                id="helper-password"
                aria-describedby="helper-text-explanation"
                className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="input password here..."
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}
        />

        <button
          onClick={handleSubmit(onSubmit)}
          type="button"
          className="text-white text-lg mt-5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Login
        </button>
      </div>
      <p className="mt-16"></p>
    </div>
  );
};
