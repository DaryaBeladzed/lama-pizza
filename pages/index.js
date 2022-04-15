import axios from "axios";

import Head from "next/head";
import PizzaCatalog from "../components/Catalog/PizzaCatalog";
import Slider from "../components/Slider/Slider";

const HomePage = ({ products }) => {
  return (
    <>
      <Head>
        <title>Lama pizza</title>
        <meta name="description" content="The best pizza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      <PizzaCatalog products={products} />
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      products: res.data,
    },
  };
};

export default HomePage;
