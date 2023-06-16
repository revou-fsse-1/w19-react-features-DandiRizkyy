import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect } from "react";
import { AppContext } from "../../provider/Provider";
import { useNavigate } from "react-router-dom";

export const NewCategory = () => {
  interface FormProps {
    name: string;
    status: string;
  }

  const schema = yup
    .object({
      name: yup.string().required("Name is required"),
      status: yup.string().required(),
    })
    .required();

  const context = useContext(AppContext);
  useEffect(() => {
    context?.fetchCategories();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = (data: FormProps) => {
    context?.saveCategory({ name: data.name, status: data.status });
    navigate("/category");
  };

  return (
    <div className="flex border border-black flex-col px-5 py-5 items-center justify-center">
      <div className="block mt-16 justify-center items-center text-center max-w-sm rounded-lg bg-white px-24 py-24 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <label
          htmlFor="helper-text"
          className="block mb-2  font-extrabold text-lg text-gray-900 dark:text-white"
        >
          Add New Category
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div>
              <input
                // {...field}
                value={field.value}
                onChange={field.onChange}
                type="text"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="input here..."
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="status"
          control={control}
          defaultValue="Active"
          render={({ field }) => (
            <>
              <select
                {...field}
                id="status"
                // onChange={field.onChange}
                // value={field.value}
                className="mt-5 bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors?.status && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.status.message}
                </p>
              )}
            </>
          )}
        />
        <button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          className="text-white text-lg mt-5  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-9 py-2.5 text-center mr-2 mb-2"
        >
          Submit
        </button>
      </div>
      <p className="mt-24"></p>
    </div>
  );
};
