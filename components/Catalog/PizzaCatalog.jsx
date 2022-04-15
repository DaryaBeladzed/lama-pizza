import PizzaCard from "./PizzaCard";
import classes from "./PizzaCatalog.module.scss";

const PizzaCatalog = ({products}) => {
  return (
    <section className={classes.catalog}>
      <h1>THE BEST PIZZA IN TOWN</h1>
      <p className={classes.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={classes.grid}>
        {products.map((pizza) => (
          <PizzaCard pizza={pizza} key={pizza._id}/>
        ))}
      </div>
    </section>
  );
};

export default PizzaCatalog;
