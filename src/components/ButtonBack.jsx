import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function ButtonBack({ to, onClick }) {
  return (
    <Link to={to} onClick={onClick}>
      <RiArrowGoBackFill className="font-bold text-3xl" />
    </Link>
  );
}

export default ButtonBack;
