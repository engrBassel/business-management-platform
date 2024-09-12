import { useSelector } from "react-redux";
import Loader from "../components/UI/Loader";
import { useState } from "react";
import useDocTitle from "../hooks/useDocTitle";
import { capitalize } from "../utils/capitalize";
import Button from "../components/UI/buttons/Button";
import EditIconButton from "../components/UI/buttons/edit/EditIconButton";
import DeleteIconButton from "../components/UI/buttons/delete/DeleteIconButton";
import ViewIconLink from "../components/UI/Links/ViewIconLink";
import Table from "../components/UI/Table";
import Message from "../components/UI/Message";
import CreateProductModal from "../components/Products/CreateProductModal";
import EditProductModal from "../components/Products/EditProductModal";
import DeleteProductModal from "../components/Products/DeleteProductModal";

function ProductsPage() {
  const products = useSelector((state) => state.products.array);
  const productsNum = useSelector((state) => state.products.number);
  const productsLoading = useSelector((state) => state.products.isLoading);
  const productsError = useSelector((state) => state.products.error);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productForModal, setProductForModal] = useState({});

  useDocTitle("Products");

  function handleEdit(productToEdit) {
    setIsEditModalOpen(() => {
      setProductForModal(productToEdit);
      return true;
    });
  }

  function handleDelete(productToDeleteId, productToDeleteTitle) {
    setIsDeleteModalOpen(() => {
      setProductForModal({
        id: productToDeleteId,
        title: productToDeleteTitle,
      });
      return true;
    });
  }

  if (productsLoading) return <Loader />;

  if (productsError) return <Message type="error" message={productsError} />;

  const tableCols = ["Product ID", "Title", "Price", "Category", "Actions"];

  return (
    <div>
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={productForModal}
      />
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        product={productForModal}
      />

      <div className="flex justify-between items-center gap-2 mb-4">
        <h2 className="text-3xl font-semibold w-fit bg-blue-100 p-4 rounded-lg shadow-md">
          My Products
        </h2>
        <Button
          className="bg-slate-800 text-white hover:text-blue-400"
          text="New Product"
          onButtonClick={() => setIsCreateModalOpen(true)}
        />
      </div>

      {productsNum === 0 ? (
        <Message type="hint" message={"No Products Yet!"} />
      ) : (
        <Table tableCols={tableCols}>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="py-2 px-4">{product.id}</td>
              <td className="py-2 px-4">{product.title}</td>
              <td className="py-2 px-4">{product.price}</td>
              <td className="py-2 px-4">{capitalize(product.category)}</td>

              <td className="py-2 px-4 space-x-2">
                <span className="flex justify-center items-center py-2 px-4 gap-2">
                  <ViewIconLink to={`${product.id}`} />
                  {!product.fromApi && (
                    <>
                      <EditIconButton onEdit={() => handleEdit(product)} />
                      <DeleteIconButton
                        onDelete={() => handleDelete(product.id, product.title)}
                      />
                    </>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
export default ProductsPage;
