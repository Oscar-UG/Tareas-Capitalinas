import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useTask } from "../context/TaskContext";
import { ImFileEmpty } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../components/Loader";
import { ButtonLink } from "../components/ButtonLink";
import ButtonBack from "../components/ButtonBack";
import dayjs from "dayjs";
import { useList } from "../context/ListContext";

function TaskPage() {
  const { tasks, getTasks, loading } = useTask();
  const { clearCurrentList, currentListId } = useList();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <ButtonBack to={"/lists"} onClick={() => clearCurrentList()} />
          {tasks.length === 0 && (
            <div className="flex justify-center items-center p-10">
              <div>
                <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
                <h1 className="font-bold text-xl">No hay tareas, agrega una</h1>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {tasks.map((task) => 
              task.list === currentListId ? ( 
                <div
                  className="card w-96 bg-base-100 shadow-xl"
                  key={task._id}
                >
                  <div className="card-body">
                    <h2 className="card-title">{task.title}</h2>
                    <p>{task.description}</p>
                    <p className="text-slate-400">
                      {dayjs(task.created_at).format("DD-MM-YYYY")}
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Buy Now</button>
                    </div> 
                  </div>
                </div>
              ) : null
            )}
          </div>
          <ButtonLink to={"/add-task"} className={"btn mt-12"}>
            <IoMdAddCircleOutline className="text-3xl" />
          </ButtonLink>
        </>
      )}
    </>
  );
}


export default TaskPage;
