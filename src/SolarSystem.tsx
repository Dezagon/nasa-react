import { useState } from "react";
//import { ClipLoader } from "react-spinners";
import { Sun } from "./Sun";
import { APOD } from "./APOD";
import { PastAPODs } from "./PastAPODs";
// import { MarsRoverPhotos } from "./MarsRoverPhotos";
// import { gsap } from "gsap";

export const SolarSystem: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <main className="flex flex-col items-center gap-4 w-screen">
      <Sun isActive={activeIndex === 0} />
      <APOD isActive={activeIndex === 1} onZoom={() => setActiveIndex(1)} onZoomOut={() => setActiveIndex(0)} />
      <PastAPODs isActive={activeIndex === 2} onZoom={() => setActiveIndex(2)} onZoomOut={() => setActiveIndex(0)} />
      {/* <MarsRoverPhotos isActive={activeIndex === 3} onZoom={() => setActiveIndex(3)} onZoomOut={() => setActiveIndex(0)} /> */}
    </main>
  );
};
