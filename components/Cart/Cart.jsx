import { useSelector } from "react-redux";

import classes from "./Cart.module.scss";
import CartItem from "./CartItem";
import Totals from "./Totals";

const Cart = () => {
  const { products, totalPrice } = useSelector((state) => state.cart);

  const isProductsEmpty = products.length === 0;

  return (
    <section className={classes.cart}>
      {!isProductsEmpty && (
        <div className={classes.items}>
          {products.map((item, ind) => (
            <CartItem item={item} key={ind} />
          ))}
          {/* {isProductsEmpty && <h2>Your cart is empty now!</h2>} */}
        </div>
      )}
      <Totals active={isProductsEmpty ? false : true} totalPrice={totalPrice}>
        Checkout now!
      </Totals>
    </section>
  );
};

export default Cart;
