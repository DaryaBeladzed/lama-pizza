import axios from "axios";
import Order from "../../components/Order/Order";

const OrderPage = ({ order }) => {
  return <Order order={order} />;
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/orders/${params.order_id}`
  );
  return {
    props: {
      order: res.data,
    },
  };
};

export default OrderPage;
