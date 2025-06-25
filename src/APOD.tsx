import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import backArrow from "./assets/square-left-arrow.svg";
import { format } from "date-fns";

type APODProps = {
  isActive: boolean;
  onZoom: () => void;
  onZoomOut: () => void;
};

type APOD = {
  date: string;
  title: string;
  explanation: string;
  hdurl: string;
  url: string;
};

export const APOD: React.FC<APODProps> = ({ isActive, onZoom, onZoomOut }) => {
  const todaysDate = new Date();
  const [apod, setApod] = useState<APOD>();

  useEffect(() => {
    async function getAPOD() {
      const url = `https://api.nasa.gov/planetary/apod?`;
      const params = new URLSearchParams({
        api_key: import.meta.env.VITE_NASA_API_KEY,
        date: `${format(todaysDate, "yyyy-MM-dd")}`,
      });
      const response = await fetch(url + params);
      const result: APOD = await response.json();
      setApod(result);
      try {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error(error.message);
      }
    }
    getAPOD();
  }, []);

  return (
    //Make zoom out component here
    <section className="flex flex-col items-center justify-evenly gap-3">
      {apod ? (
        <>
          {!isActive && (
            <>
              <button className="bg-transparent cursor-pointer overflow-hidden w-2/10 max-sm:w-3/10 md:w-2/10 lg:w-2/10" onClick={onZoom}>
                <img
                  src={apod.url}
                  alt="Astronomy Picture of the Day"
                  className="w-full h-full border rounded-full aspect-square border-white object-cover"
                />
              </button>
            </>
          )}
          {isActive && (
            <>
              <button className="w-15 h-15 self-start m-5 cursor-pointer" onClick={onZoomOut}>
                <img src={backArrow} />
              </button>
              <img src={apod.hdurl} alt="Astronomy Picture of the Day" className="w-4/5 border rounded-lg border-white max-sm:w-9/10 h-full" />
              <h1 className="text-4xl text-center">{apod.title}</h1>
              <p className="text-left w-4/5"> {apod.explanation}</p>
            </>
          )}
        </>
      ) : (
        <ClipLoader color={"#4487C9"} size={150} aria-label="Loading..." data-testid="loader" />
      )}
    </section>
  );
};
