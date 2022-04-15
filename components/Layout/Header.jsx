import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Header.module.scss";

const Header = () => {
  const [isCounterChnage, setIsCounterChange] = useState(false);
  const totalQty = useSelector((state) => state.cart.totalQty);
  const cartClass = `${classes.counter} ${
    isCounterChnage ? classes.animateCounter : ""
  }`;

  useEffect(() => {
    if (totalQty !== 0) {
      setIsCounterChange(true);
    }

    setTimeout(() => setIsCounterChange(false), 300);
  }, [totalQty]);

  return (
    <header className={classes.header}>
      <div className={classes.item}>
        <div className={classes.telephone}>
          <Image
            src="/images/telephone.png"
            alt="telephone"
            width={32}
            height={32}
          />
        </div>
        <div className={classes.info}>
          <p>Order Now!</p>
          <span>125 125 232</span>
        </div>
      </div>
      <div className={classes.item}>
        <ul className={classes.navbar}>
          <Link href="/">
            <li>Homepage</li>
          </Link>
          <li>Products</li>
          <li>Menu</li>
          <Link href="/">
            <li>
              <Image
                src="/images/logo.png"
                alt="logo"
                width={160}
                height={69}
              />
            </li>
          </Link>
          <li>Events</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>
      <Link href="/cart">
        <div className={classes.item}>
          <Image src="/images/cart.png" alt="cart" width={30} height={30} />
          <div className={cartClass}>{totalQty}</div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
