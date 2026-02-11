import { Trash2, Thermometer, Wind, Cloud } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Cities(){
  type City = {
    id: string;
    name: string;
    temp: number;
    windSpeed: number;
    condition: string;
    savedTime: number;
  }

  const [cities, setCities] = useState<City[]>([])

  
  useEffect(() => {
    const localCities = localStorage.getItem('cities');
    if (localCities) {
      try {
        const parsedCities: City[] = JSON.parse(localCities);
        if(Array.isArray(parsedCities)) setCities(parsedCities)
      } catch {
        console.error('LocalStorage is corrupted')
      }
    }
  }, []);

  const savedCities:Array<City> = cities;


  const handleDelete = (cityId:string) => {
    setCities(prev => {
      const updated = prev.filter(city => city.id !== cityId)
      localStorage.setItem('cities', JSON.stringify(updated))
      return updated
    })
  };

    return(
        <div className="w-full">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Your Saved Cities
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {savedCities.length} {savedCities.length === 1 ? 'city' : 'cities'} saved
          </p>
        </div>

        {savedCities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedCities.map((city:City) => (
              <div
                key={city.id}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-5 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {city.name}
                </h2>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-3 flex flex-col items-center justify-center">
                    <Thermometer className="w-5 h-5 text-gray-600 dark:text-gray-300 mb-1" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {city.temp}
                    </span>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-3 flex flex-col items-center justify-center">
                    <Wind className="w-5 h-5 text-gray-600 dark:text-gray-300 mb-1" />
                    <span className="text-xs font-medium text-gray-900 dark:text-gray-100 text-center">
                      {city.windSpeed}
                    </span>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-3 flex flex-col items-center justify-center">
                    <Cloud className="w-5 h-5 text-gray-600 dark:text-gray-300 mb-1" />
                    <span className="text-xs font-medium text-gray-900 dark:text-gray-100 text-center">
                      {city.condition}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(city.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-8 max-w-md mx-auto">
              <Cloud className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                No cities saved yet
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Search for a city and save it to see weather updates here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    )
}