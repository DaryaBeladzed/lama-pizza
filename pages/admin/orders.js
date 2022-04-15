import axios from "axios";
import jwt from "jsonwebtoken";
import AdminOrders from "../../components/Order/AdminOrders";

const AdminOrdersPage = (props) => {
  return <AdminOrders orders={props.orders} />;
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  // isAdmin = false
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0OTY4MjYyM30.x6iE3lDQM9vZXxXUVpuhaiDR64nvFk5MbOCdwfwiVKA
  if (!myCookie.token || !jwt.decode(myCookie.token).isAdmin)
    return {
      redirect: {
        destination: "/admin/login?referer=orders",
        permanent: false,
      },
    };

  const res = await axios.get(`${process.env.NODE_ENV === "development" ? "http" : "https"}://${ctx.req.headers.host}/api/orders`);

  return {
    props: {
      orders: res.data,
    },
  };
};

export default AdminOrdersPage;
