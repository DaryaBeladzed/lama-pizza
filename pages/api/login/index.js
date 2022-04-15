import jwt from "jsonwebtoken";
import cookie from "cookie";
import dbConnect from "../../../util/mongo";

const handler = async ({ method, headers, body }, res) => {
  await dbConnect();

  if (method === "POST") {
    const { username, password } = body;
    if (
      username === process.env.ADMIN_NAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { username, isAdmin: true },
        process.env.SECRET_KEY
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json("Successful!");
    } else res.status(400).json("Wrong Credentials!");
  }

  // if (method === "GET") {
  //   const token = headers.authorization.split(" ")[1];
  //   const payload = jwt.decode(token);
  //   console.log(payload.isAdmin);
  //   res.status(200).json(payload.isAdmin);
  // }
};

export default handler;
