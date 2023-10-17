import { MdLogout } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { logout } = useAuth();

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to={"/lists"} className="normal-case font-bold text-xl">
            Tareas Capitalinas
          </Link>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Logout</p>
          <label className="btn btn-ghost btn-circle m-1">
            <Link to={"/login"} onClick={() => logout()}>
              {<MdLogout className="font-bold text-2xl" />}
            </Link>
          </label>
        </div>
      </div>
      <hr className="mb-8" />
    </>
  );
}

export default Navbar;
