'use client';

import { useState } from 'react';
import ForecastDisplay from '../components/ForecastDisplay';
import WeatherForm from '../components/WeatherForm';
import WeatherDisplay from '../components/WeatherDisplay';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async (city: string, unit: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/weather?city=${city}&unit=${unit}`);
      if (!res.ok) throw new Error('Failed to fetch weather');
      const data = await res.json();
      setWeatherData(data);
      setForecast(data.forecast);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300">
      <h1 className="text-3xl font-bold mb-6">Weather App</h1>
      <WeatherForm onWeatherFetched={fetchWeather} />
      {weatherData && <WeatherDisplay data={weatherData} />}
      {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
    </main>
  );
}
