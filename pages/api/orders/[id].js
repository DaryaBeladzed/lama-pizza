import Order from "../../../models/Order";
import dbConnect from "../../../util/mongo";

const handler = async ({ method, query, body }, res) => {
  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(query.id);
      res.status(200).json(order);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  if (method === "PUT") {
    console.log(body);
    try {
      const order = await Order.findByIdAndUpdate(query.id, body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

export default handler;
