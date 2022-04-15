// https://developer.paypal.com/developer/accounts/

// https://paypal.github.io/react-paypal-js/?path=/story/example-paypalbuttons--default

import classes from "./Totals.module.scss";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { cartActions } from "../../redux/cartSlice";
import { useRouter } from "next/router";
import OrderDetails from "../Order/OrderDetails";

const Totals = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const router = useRouter();
  const [payByCash, setPayByCash] = useState(false);

  const orderCreationHandler = async (data) => {
    const cartProducts = products.map(({ title, size, extras }) => ({
      title,
      size,
      extras,
    }));
    console.log(cartProducts);
    dispatch(cartActions.clear());
    try {
      const res = await axios.post(`http://localhost:3000/api/orders`, {
        ...data,
        products: cartProducts,
      });
      console.log(res);
      router.push(`/order/${res.data._id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.totals}>
      <h2>Cart total</h2>
      <p>
        <b>Total: </b>${props.totalPrice}
      </p>
      {!isOpen && (
        <button
          type="button"
          className={`${props.active ? classes.active : classes.inactive}`}
          onClick={() => setIsOpen(true)}
        >
          {props.children}
        </button>
      )}
      {isOpen && (
        <div className={classes.payMethods}>
          {/* {isPending ? <div className="spinner" /> : null} */}
          <button type="button" onClick={() => setPayByCash(true)}>
            CASH ON DELIVERY
          </button>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: props.totalPrice,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                console.log(details);
                orderCreationHandler({
                  customer: details.purchase_units[0].shipping.name.full_name,
                  address:
                    details.purchase_units[0].shipping.address.address_line_1,
                  total: props.totalPrice,
                  method: 1,
                });
              });
            }}
          />
        </div>
      )}
      {payByCash && (
        <OrderDetails
          createOrder={orderCreationHandler}
          totalPrice={props.totalPrice}
          close={setPayByCash}
        />
      )}
    </div>
  );
};

export default Totals;
