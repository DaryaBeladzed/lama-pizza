import axios from "axios";
import jwt from "jsonwebtoken";
import AdminProducts from "../../components/Product/AdminProducts";

const AdminProductsPage = (props) => {
  return <AdminProducts products={props.products} />;
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  // isAdmin = false
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0OTY4MjYyM30.x6iE3lDQM9vZXxXUVpuhaiDR64nvFk5MbOCdwfwiVKA
  if (!myCookie.token || !jwt.decode(myCookie.token).isAdmin)
    return {
      redirect: {
        destination: "/admin/login?referer=products",
        permanent: false,
      },
    };

  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      products: res.data,
    },
  };
};

export default AdminProductsPage;
