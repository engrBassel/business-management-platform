import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";
import BackIconLink from "../components/UI/Links/BackIconLink";
import Message from "../components/UI/Message";

function OneProductPage() {
  const { id } = useParams();
  const products = useSelector((state) => state.products.array);
  const currProduct = products.find((product) => product.id === id);

  useDocTitle("Product");

  const productDetails = [
    { name: "Product ID", value: currProduct.id },
    { name: "Title", value: currProduct.title },
    { name: "Price", value: currProduct.price },
    { name: "Description", value: currProduct.description },
    { name: "Category", value: currProduct.category },
  ];

  return (
    <>
      <div className="pb-4">
        <BackIconLink />
      </div>
      {!currProduct ? (
        <Message type="error" message="No such product!" />
      ) : (
        <div className="md:max-w-md mx-auto grid gap-4 p-4 bg-blue-100 rounded-md">
          <div className="max-w-28 mx-auto p-2 bg-white rounded-lg">
            <img
              src={currProduct.image}
              alt={currProduct.title}
              className="max-w-full block"
            />
          </div>
          {productDetails.map((object, indx) => (
            <p key={indx} className="bg-white p-2 rounded-md">
              <span className="font-semibold">{object.name}: </span>
              {object.value}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
export default OneProductPage;
