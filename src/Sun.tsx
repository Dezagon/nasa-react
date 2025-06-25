import sun from "./assets/sun.png";

type SunProps = {
  isActive: boolean;
};
export const Sun: React.FC<SunProps> = ({ isActive }) => {
  return (
    <main className="w-3/10 overflow-hidden max-sm:w-6/10 md:w-3/10 lg:w-2/10">
      {isActive && <img src={sun} alt="Sun" className="w-screen rounded-full aspect-square object-cover" />}
    </main>
  );
};
