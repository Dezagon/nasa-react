import { useState } from "react";
//import { ClipLoader } from "react-spinners";
import { APOD } from "./APOD";
import { Sun } from "./Sun";
// import { gsap } from "gsap";

export const SolarSystem: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <main>
      <Sun isActive={activeIndex === 0} />
      <APOD isActive={activeIndex === 1} onZoom={() => setActiveIndex(1)} onZoomOut={() => setActiveIndex(0)} />
    </main>
  );
};
