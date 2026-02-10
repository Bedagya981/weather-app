#  Weather App

A modern and responsive weather application that allows users to search for any city and view real-time weather conditions including temperature, weather status, and wind speed.

Built with **React**, **TypeScript**, and **Tailwind CSS**, using the **OpenWeather API**.

---

##  Features

-  Search weather by city name  
-  Displays temperature, weather condition, and wind speed  
-  Dark / Light mode toggle with persistence  
-  Fully responsive layout  
-  Fast API fetching with clean UI updates  

---

##  Tech Stack

- React  
- TypeScript  
- Tailwind CSS  
- Axios  
- OpenWeather API  
- Lucide Icons  

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Bedagya981/weather-app.git
cd weather-app

2. Install dependencies
npm install

3. Set up environment variables
Create a .env file in the root directory:

VITE_API_KEY=your_openweather_api_key
You can get an API key from
https://openweathermap.org

4. Run the app
npm run dev
The app will be available at:
http://localhost:5173

 Project Structure
src/
├── components/
│   ├── Home.tsx
│   ├── Sidebar.tsx
├── API.ts
├── Layout.tsx
├── App.tsx
└── main.tsx
```

## Future Improvements
Loading and error states

Weather data caching to reduce API calls

Additional weather details (humidity, feels-like, etc.)

Saved cities or search history (optional)


## License
This project is built for learning and personal use.