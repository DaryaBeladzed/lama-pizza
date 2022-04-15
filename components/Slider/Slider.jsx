import Image from "next/image";
import { useState } from "react";
import classes from "./Slider.module.scss";

const slider = [
  "/images/slider1.png",
  "/images/slider2.webp",
  "/images/slider3.jpg",
];

const Slider = () => {
  const [currIndex, setCurrIndex] = useState(0);

  const sliderHandler = (direction) => {
    console.log(direction);
    if (direction === "RIGHT")
      setCurrIndex((prevState) => (prevState !== 2 ? prevState + 1 : 0));
    else setCurrIndex((prevState) => (prevState !== 0 ? prevState - 1 : 2));
    console.log(currIndex);
  };

  return (
    <section className={classes.slider}>
      <div
        className={classes.arrow}
        style={{ left: 0 }}
        onClick={() => sliderHandler("LEFT")}
      >
        <Image src="/images/arrowl.png" alt="prev" layout="fill" />
      </div>
      <div
        className={classes.content}
        style={{ transform: `translateX(${-100 * currIndex}vw)` }}
      >
        {slider.map((img, ind) => (
          <div key={ind}>
            <Image src={img} alt="" layout="fill" objectFit="cover"/>
          </div>
        ))}
      </div>
      <div
        className={classes.arrow}
        style={{ right: 0 }}
        onClick={() => sliderHandler("RIGHT")}
      >
        <Image src="/images/arrowr.png" alt="next" layout="fill" objectFit="contain"/>
      </div>
    </section>
  );
};

export default Slider;
