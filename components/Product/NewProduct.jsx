import { useRef, useState } from "react";
import reactDom from "react-dom";
import axios from "axios";
import classes from "./NewProduct.module.scss";

const sizes = ["Small", "Medium", "Large"];

const NewProduct = ({ onClose, refresh, isNew, product }) => {
  const [extras, setExtras] = useState(isNew ? [] : product.extras);
  const [title, setTitle] = useState(isNew ? "" : product.title);
  const [desc, setDesc] = useState(isNew ? "" : product.desc);
  const [prices, setPrices] = useState(isNew ? ["", "", ""] : product.prices);
  const extraText = useRef(null);
  const extraPrice = useRef(null);
  const productImage = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let url = isNew ? null : product.image;
      if (productImage.current.files[0]) {
        const data = new FormData();
        data.append("file", productImage.current.files[0]);
        data.append("upload_preset", "lama_pizza");

        const cloudRes = await axios.post(
          process.env.NEXT_PUBLIC_CLOUDINARY_URL,
          data
        );

        url = cloudRes.data.url;
      }

      const newProduct = {
        image: url,
        title: title,
        desc: desc,
        extras,
        prices: prices,
      };

      const res = isNew
        ? await axios.post("http://localhost:3000/api/products", newProduct)
        : await axios.put(
            `http://localhost:3000/api/products/${product._id}`,
            newProduct
          );

      refresh(res.data, isNew);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  const setExtrasHandler = () => {
    console.log(extraText.current.value);
    if (extraText.current.value !== "" && extraPrice.current.value !== "")
      setExtras((prevState) => [
        ...prevState,
        { text: extraText.current.value, price: extraPrice.current.value },
      ]);
  };

  const deleteExtraHandler = (text) => {
    setExtras((prevState) => prevState.filter((extra) => extra.text !== text));
  };

  const newProduct = (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{isNew ? "Create a new product" : "Change product"}</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="image">Choose an image:</label>
          <input
            type="file"
            name="image"
            maxLength={80}
            className={classes.fileInp}
            ref={productImage}
          />
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title">Description: </label>
          <textarea
            name="desc"
            rows={4}
            maxLength={200}
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label htmlFor="prices">Prices: </label>
          <div name="prices" className={classes.prices}>
            {sizes.map((size, ind) => (
              <input
                key={ind}
                type="number"
                placeholder={size}
                min={0}
                step={0.5}
                value={prices[ind]}
                onChange={(e) =>
                  setPrices((prevState) => {
                    let newPrices = [...prevState];
                    newPrices[ind] = e.target.value;
                    return newPrices;
                  })
                }
              />
            ))}
            {/* $
            <input
              type="number"
              placeholder="Small"
              min={0}
              step={0.5}
              value={prices[0]}
              onChange={(e) =>
                setPrices((prevState) => {
                  console.log(prevState);
                  let a = [...prevState];
                  a.splice(0, 1, e.target.value);
                  console.log(a);
                  return a;
                })
              }
            />
            $
            <input
              type="number"
              placeholder="Medium"
              min={0}
              step={0.5}
              value={prices[1]}
              onChange={(e) =>
                setPrices((prevState) => {
                  let a = [...prevState].splice(1, 1, e.target.value);
                  return a;
                })
              }
            />
            $
            <input
              type="number"
              placeholder="Large"
              min={0}
              step={0.5}
              value={prices[2]}
              onChange={(e) =>
                setPrices((prevState) => {
                  let a = [...prevState].splice(2, 1, e.target.value);
                  return a;
                })
              }
            /> */}
          </div>
          <label htmlFor="extras">Additional ingredients: </label>
          <div name="extras" className={classes.extras}>
            <input type="text" placeholder="Extra" ref={extraText} />
            $
            <input
              type="number"
              placeholder="Price"
              ref={extraPrice}
              min={0}
              step={0.5}
            />
            <button type="button" onClick={setExtrasHandler}>
              Add
            </button>
          </div>
          <div className={classes.extraItems}>
            {extras.map((extra) => (
              <div
                className={classes.extra}
                key={extra.text}
                onClick={() => deleteExtraHandler(extra.text)}
              >
                {extra.text}
              </div>
            ))}
          </div>
          <button type="submit" className={classes.submitBtn}>
            {isNew ? "Create" : "Change"}
          </button>
        </form>
      </div>
    </div>
  );
  return reactDom.createPortal(newProduct, document.getElementById("add-new"));
};

export default NewProduct;
