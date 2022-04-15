import { useRouter } from "next/router";
import Image from "next/image";
import classes from "./CartItem.module.scss";

const CartItem = ({ item }) => {
  const router = useRouter();

  return (
    <div
      className={classes.item}
      onClick={() => router.push(`/product/${item._id}`)}
    >
      <div className={classes.left}>
        <Image src={item.image} layout="fill" objectFit="contain" />
      </div>
      <div className={classes.right}>
        <div className={classes.info}>
          <h4>{item.title}</h4>
          <p>{item.size}</p>
          <p>{item.extras}</p>
        </div>
        <div className={classes.price}>
          <b>$ {item.price}</b>
          <p>x {item.qty}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
