import sun from "./assets/sun.png";
//import sun from "./assets/sun.gif";

type SunProps = {
  isActive: boolean;
};
export const Sun: React.FC<SunProps> = ({ isActive }) => {
  return <>{isActive && <img src={sun} alt="Astronomy Picture of the Day" className="w-3/10 h-3/10 rounded-full aspect-square object-cover" />};</>;
};
