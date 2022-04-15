import { useRef } from "react";
import reactDom from "react-dom";
import classes from "./OrderDetails.module.scss";

const OrderDetails = (props) => {
  const usernameRef = useRef();
  const addressRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const newOrder = {
      customer: usernameRef.current.value,
      address: addressRef.current.value,
      total: props.totalPrice,
      method: 0,
    };

    props.createOrder(newOrder);
  };

  const customerInfo = (
    <>
      <div className={classes.overlay} onClick={() => props.close(false)}>
        <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
          <p>You will pay ${props.totalPrice} after delivery</p>
          <form onSubmit={submitHandler}>
            <label htmlFor="username">Name Surname:</label>
            <input
              type="text"
              placeholder="John Doe"
              name="username"
              ref={usernameRef}
              required
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              placeholder="..."
              name="address"
              ref={addressRef}
              required
            />
            <button type="submit">Order</button>
          </form>
        </div>
      </div>
    </>
  );
  return reactDom.createPortal(
    customerInfo,
    document.getElementById("order-details")
  );
};

export default OrderDetails;
