import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cartSlice";
import classes from "./Product.module.scss";

const PIZZA_SIZES = [
  { id: 0, text: "Small" },
  { id: 1, text: "Medium" },
  { id: 2, text: "Large" },
];

const Product = ({ product }) => {
  const [sizeInd, setSizeInd] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [price, setPrice] = useState(product.prices[0]);
  const qtyRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const newPrice =
      product.prices[sizeInd] +
      selectedExtras.reduce((prev, next) => prev + next.price, 0);

    setPrice(newPrice);
  }, [sizeInd, selectedExtras, product.prices]);

  const extraHandler = (e, extra) => {
    if (e.target.checked) {
      setSelectedExtras((prevState) => [...prevState, extra]);
    } else {
      setSelectedExtras((prevState) =>
        prevState.filter((item) => item.text !== extra.text)
      );
    }
  };

  const cartHandler = () => {
    const extras = selectedExtras
      .map((item) => item.text)
      .sort()
      .join(", ");

    dispatch(
      cartActions.addProduct({
        ...product,
        extras,
        size: PIZZA_SIZES.find((size) => size.id === sizeInd).text,
        price,
        qty: +qtyRef.current.value,
      })
    );
  };

  return (
    <section className={classes.product}>
      <div className={classes.left}>
        <div className={classes.img}>
          <Image src={product.image} layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.info}>
          <h2>{product.title}</h2>
          <span>$ {price}</span>
          <p>{product.desc}</p>
        </div>
        <div className={classes.sizes}>
          <h4>Choose the size</h4>
          <div>
            {PIZZA_SIZES.map(({ id, text }) => (
              <div
                className={classes[text.toLowerCase()]}
                onClick={() => setSizeInd(id)}
                key={id}
              >
                <Image
                  src="/images/size.png"
                  layout="fill"
                  objectFit="contain"
                />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.ingridients}>
          <h4>Choose additional ingredients</h4>
          <div>
            {product.extras.map((elem, ind) => (
              <div className={classes.option} key={ind}>
                <input
                  type="checkbox"
                  id={elem.text}
                  name={elem.text}
                  className={classes.checkbox}
                  onChange={(e) => extraHandler(e, elem)}
                />
                <label htmlFor={elem.text}>{elem.text}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.cart}>
          <input
            type="number"
            max="30"
            min="1"
            step="1"
            defaultValue={1}
            ref={qtyRef}
          />
          <button type="button" onClick={cartHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
