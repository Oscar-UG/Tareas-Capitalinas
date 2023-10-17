import { Link } from "react-router-dom";

export function ButtonLink({ className, to, children, onClick }) {
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
