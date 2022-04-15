import { useState } from "react";
import axios from "axios";
import classes from "./AdminProducts.module.scss";
import Image from "next/image";
import NewProduct from "./NewProduct";

const AdminProducts = (props) => {
  const [products, setProducts] = useState(props.products);
  const [addNew, setAddNew] = useState({ new: false, show: false });
  const [changeProduct, setChangeProduct] = useState(null);

  const deleteProductHandler = async (id) => {
    try {
      const res = axios.delete(`${window.location.protocol}//${window.location.host}/api/products/${id}`);
      setProducts((prevState) => prevState.filter((item) => item._id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const refreshProducts = async (data, isNew) => {
    if (isNew) setProducts((prev) => [...prev, data]);
    else {
      const ind = products.findIndex((pr) => pr._id === data._id);

      setProducts((prev) => {
        let a = prev.filter((item) => item._id !== data._id);
        a.splice(ind, 0, data);
        return a;
      });
    }
  };

  return (
    <section className={classes.products}>
      <div className={classes.title}>
        <h2>Products</h2>
        <button
          type="button"
          onClick={() => setAddNew({ show: true, new: true })}
        >
          Add new
        </button>
      </div>
      <div className={classes.productItems}>
        {products.map((product) => (
          <div className={classes.product} key={product._id}>
            <div>
              <b>Image: </b>
              <Image src={product.image} width={50} height={50} />
            </div>
            <div>
              <b>Id: </b>
              <p>{product._id}</p>
            </div>
            <div>
              <b>Title: </b>
              <p>{product.title}</p>
            </div>
            <div>
              <b>Price: </b>
              <p>${product.prices.join(", $")}</p>
            </div>
            <div>
              <b>Actions: </b>
              <button
                type="button"
                onClick={() => {
                  setAddNew({ new: false, show: true });
                  setChangeProduct(product);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => deleteProductHandler(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {addNew.show && (
        <NewProduct
          onClose={() => setAddNew({ new: true, show: false })}
          refresh={refreshProducts}
          isNew={addNew.new}
          product={changeProduct}
        />
      )}
    </section>
  );
};

export default AdminProducts;
