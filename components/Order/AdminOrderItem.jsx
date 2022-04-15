import { useState } from "react";
import classes from "./AdminOrderItem.module.scss";

const order_status = ["Payment", "Preparing", "On the way", "Delivered"];

const AdminOrderItem = ({ order, nextStage }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className={classes.order}>
      <div className={classes.mainInfo}>
        <p>
          <b>Order ID: </b>
          <br />
          {order._id}
        </p>
        <p>
          <b>Customer: </b>
          <br />
          {order.customer}
        </p>
        <p>
          <b>Address: </b>
          <br />
          {order.address}
        </p>
        <p>
          <b>Total: </b>
          <br />${order.total}
        </p>
        <p>
          <b>Payment: </b>
          <br />
          {order.method ? "paid" : "cash"}
        </p>
        <p>
          <b>Status: </b>
          <br /> {order_status[order.status]}
        </p>
        <button
          type="button"
          onClick={() => nextStage(order)}
          disabled={order.status === 3}
        >
          Next Stage
        </button>
      </div>
      <div className={`${isCartOpen ? classes.active : ""} ${classes.cart}`}>
        <b onClick={() => setIsCartOpen((state) => !state)}>
          Cart: <span></span>
        </b>
        <ul
          style={{
            height: `${isCartOpen ? order.products.length * 30 : 0}px`,
          }}
        >
          {order.products.map((product, ind) => (
            <li key={ind}>
              <p>{product.title}</p>
              <p>{product.extras || "without extras"}</p>
              <p>{product.size}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminOrderItem;
