import { useSelector } from "react-redux";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  Square3Stack3DIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import Message from "../UI/Message";

const Metrics = () => {
  const ordersNum = useSelector((state) => state.orders.number);
  const totalSales = useSelector((state) => state.orders.totalSales);
  const productsNum = useSelector((state) => state.products.number);
  const usersNum = useSelector((state) => state.users.number);

  const metrics = [
    {
      Icon: PresentationChartBarIcon,
      value: `${totalSales} EGP`,
      name: "Sales",
    },
    {
      Icon: ShoppingBagIcon,
      value: ordersNum,
      name: "Orders",
    },
    {
      Icon: Square3Stack3DIcon,
      value: productsNum,
      name: "Products",
    },
    {
      Icon: UserGroupIcon,
      value: usersNum,
      name: "Admins/Users",
    },
  ];

  if (metrics.length === 0) {
    return <Message type="hint" message="No Metrics Yet!" />;
  }

  return (
    <div className="min-h-[400px] grid md:grid-cols-[250px_250px] place-content-center gap-4 md:gap-12">
      {metrics.map(({ Icon, value, name }, indx) => (
        <div
          key={indx}
          className="flex gap-2 items-center p-4 bg-blue-100 rounded shadow-md min-h-[120px]"
        >
          <Icon className="size-10 bg-slate-800 text-white p-2 rounded" />
          <div className="flex flex-col items-center flex-1">
            <p className="font-bold">{value}</p>
            <p className="text-gray-500">Total {name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Metrics;
