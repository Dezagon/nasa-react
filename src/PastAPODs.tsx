import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import backArrow from "./assets/square-left-arrow.svg";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PastAPODProps = {
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

export const PastAPODs: React.FC<PastAPODProps> = ({ isActive, onZoom, onZoomOut }) => {
  const todaysDate = new Date();
  const yesterdaysDate = new Date(todaysDate).setDate(todaysDate.getDate() - 1);
  const thirtyDaysAgo = new Date(todaysDate).setDate(todaysDate.getDate() - 30);
  const thirtyOneDaysAgo = new Date(todaysDate).setDate(todaysDate.getDate() - 31);

  const apodStartDate = new Date(1995, 5, 16);

  const [pastAPODs, setPastAPODS] = useState<APOD[]>();

  useEffect(() => {
    async function getPastAPODs() {
      const url = `https://api.nasa.gov/planetary/apod?`;
      const params = new URLSearchParams({
        api_key: import.meta.env.VITE_NASA_API_KEY,
        start_date: `${format(thirtyDaysAgo, "yyyy-MM-dd")}`,
        end_date: `${format(yesterdaysDate, "yyyy-MM-dd")}`,
      });
      const response = await fetch(url + params);
      const result: APOD[] = await response.json();
      setPastAPODS(result.reverse());
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
    getPastAPODs();
  }, []);
  //DATE PICKER APOD FUNCTION GOES HERE

  //USE STATE FOR ACTIVATING LIGHTBOX
  const [lightboxActive, setLightboxActive] = useState<boolean>(false);

  //USE STATE FOR LIGHTBOX ITSELF
  const [lightboxObject, setLightboxObject] = useState<APOD>();

  // USE STATE FOR DATE PICKER
  const [selectedDate, setDate] = useState<Date>();

  // FUNCTION TO GET DATE SELECTED APOD
  async function getSelectedDateAPOD(date: Date) {
    const url = `https://api.nasa.gov/planetary/apod?`;
    const params = new URLSearchParams({
      api_key: import.meta.env.VITE_NASA_API_KEY,
      date: `${format(date, "yyyy-MM-dd")}`,
    });
    const response = await fetch(url + params);
    const result: APOD = await response.json();
    setLightboxObject(result);
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

  return (
    //Make zoom out component here
    <section className="flex flex-col items-center justify-evenly">
      {pastAPODs ? (
        <>
          {!isActive && (
            <button className="bg-transparent cursor-pointer w-2/10 max-sm:w-4/10 md:w-3/10 lg:w-2/10" onClick={onZoom}>
              <img
                //pastAPODs goes from 30 days ago to yesterday's date
                src={pastAPODs[0].url}
                alt="Yesterday's Astronomy Picture of the Day"
                className="w-full h-full border rounded-full aspect-square border-white object-cover"
              />
            </button>
          )}

          {isActive && (
            <main className="flex flex-col flex-nowrap items-center gap-4">
              {/* BACK BUTTON  */}
              <button
                className="w-15 h-15 self-start m-5 cursor-pointer"
                onClick={() => {
                  onZoomOut();
                  setLightboxActive(false);
                }}
              >
                <img src={backArrow} />
              </button>

              {/* START OF CUSTOM LIGHTBOX */}
              <div className="relative w-9/10 flex-row flex-wrap justify-self-center">
                {pastAPODs.map((apod: APOD, index: number) => (
                  <>
                    <button
                      key={index}
                      onClick={() => {
                        setLightboxActive(true);
                        setLightboxObject({ date: apod.date, hdurl: apod.hdurl, title: apod.title, explanation: apod.explanation, url: apod.url });
                      }}
                      className="group relative overflow-hidden rounded-md cursor-pointer w-1/10 max-sm:w-5/10 md:w-4/10 lg:w-1/10"
                    >
                      <p className="text-lg max-sm:text-3xl">{apod.date}</p>
                      <img
                        src={apod.url}
                        alt={apod.title}
                        className="w-full h-full border aspect-square border-white object-cover transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-0 flex justify-center items-center text-#4487C9">
                        <p>{apod.title}</p>
                      </div>
                    </button>
                  </>
                ))}
              </div>

              {/* DATE SELECTION */}
              <section>
                <h1 className="text-2xl text-center max-sm:text-3xl">Or select a date</h1>
                <DatePicker
                  selected={selectedDate}
                  minDate={apodStartDate}
                  maxDate={new Date(thirtyOneDaysAgo)}
                  onChange={(date) => {
                    if (date) {
                      setDate(new Date(date));
                      setLightboxActive(true);
                      getSelectedDateAPOD(new Date(date));
                    }
                  }}
                  className="border border-#4487C9"
                />
              </section>
              {/* END OF DATE SELECTION */}

              <section className="w-screen">
                {lightboxActive && lightboxObject && (
                  <section className=" flex flex-col items-center justify-evenly">
                    <img
                      src={lightboxObject.hdurl}
                      alt={`Astronomy Picture of ${lightboxObject.date}`}
                      className="w-4/5 border rounded-lg border-white"
                    />
                    <h1 className="text-4xl">{lightboxObject.date}</h1>
                    <h1 className="text-4xl text-center">{lightboxObject.title}</h1>
                    <p className="text-left text-2xl w-4/5"> {lightboxObject.explanation}</p>
                  </section>
                )}
              </section>
              {/* END OF LIGHTBOX */}
            </main>
          )}
        </>
      ) : (
        <ClipLoader color={"#4487C9"} size={150} aria-label="Loading..." data-testid="loader" />
      )}
    </section>
  );
};
