import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

const handler = async ({ method, query, body }, res) => {
  await dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(query.id);
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  if (method === "DELETE") {
    try {
      const product = await Product.findByIdAndDelete(query.id);
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  if (method === "PUT") {
    try {
      const product = await Product.findByIdAndUpdate(query.id, body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

export default handler;
