import Image from "next/image";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.image}>
        <Image src="/images/bg.png" layout="fill" objectFit="cover" />
      </div>
      <div className={classes.info}>
        <div className={classes.item}>
          <h2>OH YES, WE DID.THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.</h2>
        </div>
        <div className={classes.item}>
          <h4>FIND OUR RESTAURANTS</h4>
          <p>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p>
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1011
          </p>
          <p>
            1614 E. Erwin St #104.
            <br /> NewYork, 85022
            <br /> (602) 867-1012
          </p>
          <p>
            1614 W. Caroll St #125.
            <br /> NewYork, 85022
            <br /> (602) 867-1013
          </p>
        </div>
        <div className={classes.item}>
          <h4>WORKING HOURS</h4>
          <p>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
