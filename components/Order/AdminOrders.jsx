import { useState } from "react";
import axios from "axios";
import classes from "./AdminOrders.module.scss";
import AdminOrderItem from "./AdminOrderItem";

const AdminOrders = (props) => {
  const [orders, setOrders] = useState(props.orders);

  const nextStageHandler = async (order) => {
    try {
      const res = await axios.put(
        `${window.location.protocol}//${window.location.host}/api/orders/${order._id}`,
        { status: ++order.status }
      );
      const ind = orders.findIndex((item) => item._id === order._id);
      setOrders((prevState) => {
        const newA = [...prevState];
        newA[ind] = res.data;
        return newA;
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className={classes.orders}>
      <h2>Orders</h2>
      <div>
        {orders.map((order) => (
          <AdminOrderItem
            key={order._id}
            nextStage={nextStageHandler}
            order={order}
          />
        ))}
      </div>
    </section>
  );
};

export default AdminOrders;
