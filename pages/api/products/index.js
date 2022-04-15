// /api/products
import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

const handler = async ({ method, body }, res) => {
  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  if (method === "POST") {
    try {
      const product = await Product.create(body);
      res.status(201).json(product);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

export default handler;
