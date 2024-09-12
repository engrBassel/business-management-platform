import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

function BackIconLink() {
  return (
    <Link
      to={-1}
      className="flex justify-start items-center w-fit py-2 px-4 rounded-full transition-colors bg-slate-800 text-white hover:text-blue-400"
    >
      <ChevronLeftIcon className="size-10" />
      <span className="w-full text-xl">Back</span>
    </Link>
  );
}
export default BackIconLink;
