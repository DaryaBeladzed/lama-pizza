import Image from "next/image";
import classes from "./OrderStatus.module.scss";

const OrderStatus = (props) => {
  const classHandler = (ind) => {
    if (ind - props.status === 0) return classes.inProgress;
    if (ind - props.status < 0) return classes.done;
    if (ind - props.status > 0) return classes.undone;
  };

  return (
    <div className={`${classes.status} ${classHandler(props.id)}`}>
      <div>
        <Image src={props.img} layout="fill" objectFit="contain" />
      </div>
      <p>{props.text}</p>
      <div>
        <Image src="/images/checked.png" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default OrderStatus;
