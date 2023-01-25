import { Carousel as FBCarousel } from "flowbite-react";
import picture1 from "./picture1.jpg";
import picture2 from "./picture2.jpg";
import picture3 from "./picture3.jpg";

export default function Carousel() {
  return (
    <div className="w-full h-56 sm:h-64 xl:h-80 2xl:h-96">
      <FBCarousel>
        <img src={picture1} alt="A picture of the front of Putrid Grove." />
        <img src={picture2} alt="A picture from the inside of the house." />
        <img src={picture3} alt="A picture of the kitchen." />
      </FBCarousel>
    </div>
  );
}
