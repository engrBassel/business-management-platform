import { EyeIcon } from "@heroicons/react/16/solid";
import IconLink from "./IconLink";

function ViewIconLink({ to }) {
  return (
    <IconLink
      to={to}
      Icon={EyeIcon}
      className="bg-slate-800 text-white hover:text-blue-400"
    />
  );
}
export default ViewIconLink;
