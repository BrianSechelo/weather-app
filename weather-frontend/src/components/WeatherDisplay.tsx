type WeatherData = {
    location: string;
    temperature: number;
    humidity: number;
    wind_speed: number;
    description: string;
  };
  
  type Props = {
    data: WeatherData;
  };
  
  export default function WeatherDisplay({ data }: Props) {
    return (
      <div className="card bg-base-100 shadow-lg w-full max-w-md mx-auto p-4 mt-4">
        <h2 className="text-xl font-bold mb-2">{data.location}</h2>
        <p><strong>Temperature:</strong> {data.temperature}°C</p>
        <p><strong>Humidity:</strong> {data.humidity}%</p>
        <p><strong>Wind Speed:</strong> {data.wind_speed} m/s</p>
        <p><strong>Description:</strong> {data.description}</p>
      </div>
    );
  }
  