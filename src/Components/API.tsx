import axios from "axios";

const apiKey: string = String(import.meta.env.VITE_API_KEY);
if (!apiKey) throw new Error("VITE_API_KEY missing");

interface WeatherCondition {
  main: string;
}
interface Temperature {
  temp: number;
}

interface WindInfo {
  speed: number;
}

export interface ApiResponse {
  weather: WeatherCondition[];
  main: Temperature;
  wind: WindInfo;
  name: string;
}

export default async function fetchData(city: string) {
  try {
    const resp =  await axios.get<ApiResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );
    console.log(resp.data)
    return resp.data
  } catch (error) {
    if (axios.isAxiosError(error))
      console.error("Axios error: ", error.message);
    throw error;
  }
}
