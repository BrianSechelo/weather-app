import Image from 'next/image';
type WeatherData = {
    location: string;
    temperature: number;
    humidity: number;
    wind_speed: number;
    description: string;
    icon: string;
  };
  
  type Props = {
    data: WeatherData;
  };
  
  export default function WeatherDisplay({ data }: Props) {
    
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    return (
      <div className="card bg-base-100 shadow-lg w-full max-w-md mx-auto p-4 mt-4 text-center">
        <h2 className="text-xl font-bold mb-1">{data.location}</h2>
        <p className="text-gray-500 mb-3">{today}</p>
  
        {/* Weather icon */}
        <Image
  src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
  alt="Weather icon"
  width={100}
  height={100}
  className="mx-auto mb-4"
/>
  
        <p><strong>Temperature:</strong> {data.temperature}°C</p>
        <p><strong>Humidity:</strong> {data.humidity}%</p>
        <p><strong>Wind Speed:</strong> {data.wind_speed} m/s</p>
        <p><strong>Description:</strong> {data.description}</p>
      </div>
    );
  }