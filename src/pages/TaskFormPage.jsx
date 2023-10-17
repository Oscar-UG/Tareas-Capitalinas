import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useTask } from "../context/TaskContext";
import { Button } from "../components/Button";
import Navbar from "../components/Navbar";
import ButtonBack from "../components/ButtonBack";
import { useList } from "../context/ListContext";

function TaskFormPage() {
  const { createTask, updateTask } = useTask();
  const { register, handleSubmit, formState: errors } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const { currentListId } = useList();

  const onSubmit = handleSubmit((data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          listId: currentListId,
          date: dayjs(data.date).format(),
        });
      }

      navigate("/lists");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Navbar />
      <ButtonBack to={"/tasks"} />
      <div className="hero max-h-screen">
        <div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={onSubmit} className="card-body m-5">
              <h2 className="mb-4 text-2xl font-bold">Tarea</h2>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Nombre de la tarea"
                  className="input input-bordered w-full max-w-xs"
                  autoFocus
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500">Nombre de tarea requerido</p>
                )}
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Descripción"
                  className="input input-bordered w-full max-w-xs"
                  autoFocus
                  {...register("description")}
                />
                {errors.title && (
                  <p className="text-red-500">Nombre de tarea requerido</p>
                )}
              </div>
              <div className="form-control mt-6">
                <Button className={"btn btn-primary"}>Guardar datos</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      u
    </>
  );
}

export default TaskFormPage;
