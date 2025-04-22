'use client';
import { useState } from 'react';

type Props = {
  onWeatherFetched: (city: string,  unit: string) => void;
};

export default function WeatherForm({ onWeatherFetched }: Props) {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onWeatherFetched(city.trim(), unit);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center justify-center my-6">
      <input
        type="text"
        className="input input-bordered w-64"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <select
        className="select select-bordered"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="metric">°C</option>
        <option value="imperial">°F</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Get Weather
      </button>
    </form>
  );
}