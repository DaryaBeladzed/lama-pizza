import axios from "axios";

import Product from "../../components/Product/Product";

const ProductPage = ({product}) => {
  return <Product product={product} />;
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.product_id}`
  );
  return {
    props: {
      product: res.data,
    },
  };
};

export default ProductPage;
