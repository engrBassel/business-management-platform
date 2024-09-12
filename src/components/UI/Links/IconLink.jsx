import { Link } from "react-router-dom";

function IconLink({ to, Icon, className }) {
  return (
    <Link to={to} className="inline-block">
      <Icon className={`size-10 p-2 rounded-full ${className}`} />
    </Link>
  );
}
export default IconLink;
