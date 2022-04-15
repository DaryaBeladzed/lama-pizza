import axios from "axios";
import Order from "../../components/Order/Order";

const OrderPage = ({ order }) => {
  return <Order order={order} />;
};

export const getServerSideProps = async ({ params, req }) => {
  const res = await axios.get(
    `${process.env.NODE_ENV === "development" ? "http" : "https"}://${req.headers.host}/api/orders/${params.order_id}`
  );
  return {
    props: {
      order: res.data,
    },
  };
};

export default OrderPage;
