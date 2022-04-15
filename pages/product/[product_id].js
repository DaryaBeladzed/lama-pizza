import axios from "axios";

import Product from "../../components/Product/Product";

const ProductPage = ({product}) => {
  return <Product product={product} />;
};

export const getServerSideProps = async ({ params, req }) => {
  const res = await axios.get(
    `${process.env.NODE_ENV === "development" ? "http" : "https"}://${req.headers.host}/api/products/${params.product_id}`
  );
  return {
    props: {
      product: res.data,
    },
  };
};

export default ProductPage;
