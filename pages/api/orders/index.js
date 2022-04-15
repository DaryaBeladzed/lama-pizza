import Order from "../../../models/Order";
import dbConnect from "../../../util/mongo";

const handler = async ({ method, body }, res) => {
  await dbConnect();

  if (method === "POST") {
    try {
      const newOrder = await Order.create(body);
      res.status(201).json(newOrder);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

export default handler;
