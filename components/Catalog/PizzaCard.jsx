import Image from "next/image";
import Link from "next/link";
import classes from "./PizzaCard.module.scss";

const PizzaCard = ({ pizza }) => {
  return (
    <div className={classes.pizzaCard}>
      <Link href={`/product/${pizza._id}`}>
        <div>
          <Image src={pizza.image} layout="fill" alt={pizza.title} />
        </div>
      </Link>
      <h3>{pizza.title}</h3>
      <span>$ {pizza.prices[0]}</span>
      <p>{pizza.desc}</p>
    </div>
  );
};

export default PizzaCard;
