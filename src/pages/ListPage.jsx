import { useEffect } from "react";
import { useList } from "../context/ListContext";
import { ImFileEmpty } from "react-icons/im";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import dayjs from "dayjs";
import { ButtonLink } from "../components/ButtonLink";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function ListPage() {
  const { lists, getLists, deleteList, loading, selectList, setListId } = useList();

  useEffect(() => {
    getLists();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          {lists.length === 0 && (
            <div className="flex justify-center items-center p-10">
              <div>
                <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
                <h1 className="font-bold text-xl">No hay listas, agrega una</h1>
              </div>
            </div>
          )}

          <div>
            {lists.map((list) => (
              <div className="w-1/2 mx-auto my-auto mb-3" key={list._id}>
                <div className="navbar bg-base-300 hover:bg-zinc-200 cursor-pointer hover:text-slate-950 rounded-box">
                  <div className="flex-1 px-2 lg:flex-none grid grid-rows-2 gap-2 m-4">
                    <h2 className="text-lg font-bold">{list.title}</h2>
                    <p>{dayjs(list.created_at).format("DD-MM-YYYY")}</p>
                  </div>
                  <div className="flex justify-end flex-1 px-2">
                    <div className="flex items-stretch mr-2">
                      <ButtonLink
                        to={`/tasks`}
                        className="btn btn-success"
                        onClick={() => {setListId(list._id); selectList(list)}}
                      >
                        Tareas <FaTasks />
                      </ButtonLink>
                    </div>
                    <div className="flex items-stretch mr-2">
                      <ButtonLink
                        to={`/lists/${list._id}`}
                        className="btn btn-primary"
                      >
                        Editar <BiEdit />
                      </ButtonLink>
                    </div>
                    <div className="flex items-stretch mr-2">
                      <button
                        className={"btn btn-error bg-red-600 text-white"}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteList(list._id);
                        }}
                        type="button"
                      >
                        Eliminar <FiDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ButtonLink to={"/add-list"} className={"btn"}>
            <IoMdAddCircleOutline />
          </ButtonLink>
        </>
      )}
    </>
  );
}

export default ListPage;
