import { createContext, useContext, useState, useEffect } from "react";
import {
  getListsRequest,
  getListRequest,
  createListRequest,
  updateListRequest,
  deleteListRequest,
} from "../api/list.js";

export const ListContext = createContext();

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useAuth debe ser usado con un AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentListId, setCurrentListId] = useState(null);

  const getLists = async () => {
    const res = await getListsRequest();
    setLists(res.data);
    setLoading(false);
  };

  const deleteList = async (id) => {
    try {
      const res = await deleteListRequest(id);
      if (res.status === 204) setLists(lists.filter((list) => list._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createList = async (list) => {
    try {
      const res = await createListRequest(list);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getList = async (id) => {
    try {
      const res = await getListRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateList = async (id, list) => {
    try {
      await updateListRequest(id, list);
    } catch (error) {
      console.error(error);
    }
  };

  const selectList = (list) => {
    setCurrentList(list);
  };

  const clearCurrentList = () => {
    setCurrentList(null);
  };

  const setListId = (listId) => {
    setCurrentListId(listId);
  };

  useEffect(() => {
    getLists();
  }, [lists]);

  return (
    <ListContext.Provider
      value={{
        lists,
        getLists,
        getList,
        createList,
        updateList,
        deleteList,
        loading,
        currentList,
        selectList,
        clearCurrentList,
        setListId,
        currentListId,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
