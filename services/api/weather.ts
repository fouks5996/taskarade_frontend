import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher } from "../config";

const weatherAPI: {weather: string} = {
   weather: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/lille/next7days?unitGroup=metric&elements=datetime%2Cdescription%2Cprecip%2Cprecipprob%2Cprecipcover%2Ctempmax%2Ctempmin%2Ctemp%2Cpreciptype%2Csnow%2Cwindspeed%2Ccloudcover%2Csunset%2Csunelevation&include=current&elements=description&key=${process.env.NEXT_PUBLIC_WEATHER_TOKEN}&contentType=json`
}

export function useCurrentWeather() {

   let options = {	
      method: "GET",
      mode: 'no-cors',
      headers: {
         "content-type": "application/json",
         "Access-Control-Allow-Headers": "Accept",
         "Access-Control-Allow-Origin":"*",
         Vary: "Origin"
      },
    }   
  const { data, error } = useSWR([weatherAPI.weather, options], currentFetcher);

  return {
    weather: data,
    isWeatherLoading: !error && !data,
    isError: error,
  };
}

