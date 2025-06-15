import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { APOD } from "./APOD";
// import { gsap } from "gsap";

export const SolarSystem: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return <APOD isActive={activeIndex === 0} onZoom={() => setActiveIndex(0)} />;
};
