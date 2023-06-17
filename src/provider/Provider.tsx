import axios from "axios";
import { ReactNode, createContext, useState } from "react";

type ContextType = {
  exampleValue: string;
  categories: Categories[];

  fetchCategories: () => void;

  saveCategory: (data: SaveCategory) => void;
  updateCategory: (data: UpdateCategory) => void;
  deleteCategory: (id: string) => void;
} | null;

type ProviderProps = {
  children: ReactNode;
};

type Categories = {
  id: string;
  name: string;
  is_active: string;
};

type SaveCategory = {
  name: string;
  status: string;
};

type UpdateCategory = {
  id: string;
  name: string;
  status: string;
};

export const AppContext = createContext<ContextType>(null);

export const Provider = ({ children }: ProviderProps) => {
  const exampleValue = "this is example from context";
  const [categories, setCategories] = useState<Categories[]>([]);
  const token = window.localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const token = window.localStorage.getItem("token"); // Retrieve token when making the API request

      if (!token) {
        return; // Return early if token is not available
      }

      const { data } = await axios.get(
        "https://mock-api.arikmpt.com/api/category",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveCategory = async (data: SaveCategory) => {
    const response = await axios.post(
      "https://mock-api.arikmpt.com/api/category/create",
      {
        name: data.name,
        is_active: data.status === "Active" ? true : false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCategories([...categories, response.data.data]);
  };
  const updateCategory = async (data: UpdateCategory) => {
    try {
      await axios.put(
        `https://mock-api.arikmpt.com/api/category/update`,
        {
          id: data.id,
          name: data.name,
          is_active: data.status === "Active" ? true : false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id: string) => {
    await axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchCategories();
  };

  return (
    <AppContext.Provider
      value={{
        exampleValue,
        categories,
        fetchCategories,
        saveCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
