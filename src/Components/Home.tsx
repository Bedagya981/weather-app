import { Search, MapPin, Wind, Thermometer, Cloud, Save } from 'lucide-react';
import { useState } from 'react';
import fetchData from './API';
import React from 'react';
import type { ApiResponse } from './API';
import { toast } from 'react-toastify';
import {v4 as uuid} from 'uuid'

export default function Home(){
    const [city, setCity] = useState('');
    const [data, setData] = useState<ApiResponse | null>(null)
    const [refCity, setRefCity] = useState('')
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => { // change this
    e.preventDefault();
    if(!city.trim()){
      toast.error('Enter city name first')
      return}
    try{
      const resp = await fetchData(city)
      setRefCity(city)
      setCity('')
      setData(resp)
      
    }catch(error){
      toast.error('Error in fetching api response check console')
      console.log(error)
    }
  };

  type City = {
    id: string;
    name: string;
    temp: number;
    windSpeed: number;
    condition: string;
    savedTime: number;
  }

  const handleSave = () => {
    try {
      if(refCity !== ''){
      const raw = localStorage.getItem('cities')
      const parsedCities = raw ? JSON.parse(raw) : []
      if (
        !data ||
        !data.name ||
        !data.main?.temp ||
        !data.wind?.speed ||
        !data.weather?.[0]?.main
      ) {
        toast.error("Incomplete weather data");
        return;
      }
      const saveData:City = {
        id: uuid(),
        name: data?.name,
        temp: data?.main.temp,
        windSpeed: data?.wind.speed,
        condition: data?.weather[0].main,
        savedTime: Date.now()
      }
      const toCheck: City[] = parsedCities 
      const resp = toCheck.filter((city) => city.name !== saveData.name)
      const toSet:City[] = [...resp, saveData]
      localStorage.setItem('cities', JSON.stringify(toSet))
      toast.success('Saved the city')
      setRefCity('')
    }else{
      toast.info('Search for a city first')
    }
  }
     catch (error) {
      toast.error('Error in saving city')
      console.log(error)
    }
  }

  const cards = data?[
    {
      icon: Thermometer,
      label: data.main.temp
    },
    {
      icon: Cloud,
      label: data.weather[0].main
    },
    {
      icon: Wind,
      label: data.wind.speed
    }
  ] : []
    return(
      <div className="w-full">
      <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Weather
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Search for any city to get current weather conditions
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto mb-10 sm:mb-16">
          <form onSubmit={handleSearch}>
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
              <div className="flex items-center px-4 py-3 sm:px-5 sm:py-4">
                <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 text-base sm:text-lg placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="ml-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-md font-medium transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="ml-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-md font-medium transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center gap-2 shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Save city</span>
                </button>
              </div>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Sydney', 'Texas'].map((suggestedCity) => (
              <button
                key={suggestedCity}
                onClick={() => setCity(suggestedCity)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
              >
                {suggestedCity}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-3">
          {
            cards.map((feature) => (
            <div
              key={feature.label}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 sm:p-5 hover:bg-gray-500 dark:hover:bg-gray-750 transition-colors"
            >
              <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 mb-2 text-gray-700 dark:text-gray-300" />
              <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
                {feature.label}
              </h3>
            </div>
              
            ))
          }
        </div>
      </div>
    </div>
    )
}