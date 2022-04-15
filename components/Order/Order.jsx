import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import Totals from "../Cart/Totals";
import classes from "./Order.module.scss";
import OrderStatus from "./OrderStatus";
import { useState } from "react";
import axios from "axios";

const order_status = [
  {
    text: "Payment",
    img: "/images/paid.png",
  },
  {
    text: "Preparing",
    img: "/images/bake.png",
  },
  {
    text: "On the way",
    img: "/images/bike.png",
  },
  {
    text: "Delivered",
    img: "/images/delivered.png",
  },
];

const Order = (props) => {
  const [order, setOrder] = useState(props.order);
  const refreshHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/orders/${props.order._id}`
      );
      setOrder(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className={classes.order}>
      <div className={classes.details}>
        <div className={classes.info}>
          <div>
            <p>
              <b>Order ID: </b>
              {order._id}
            </p>
            <p>
              <b>Customer: </b>
              {order.customer}
            </p>
            <p>
              <b>Address: </b>
              {order.address}
            </p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faArrowsRotate}
              style={{ fontSize: 25, color: "#d3411f" }}
              onClick={refreshHandler}
            />
          </div>
        </div>
        <div className={classes.progress}>
          {order_status.map((status, ind) => (
            <OrderStatus
              text={status.text}
              img={status.img}
              key={ind}
              status={order.status}
              id={ind}
            />
          ))}
        </div>
      </div>
      <Totals active={false} totalPrice={order.total}>
        Paid
      </Totals>
    </section>
  );
};

export default Order;
