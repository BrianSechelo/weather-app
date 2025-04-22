import Image from 'next/image';
type ForecastDay = {
    date: string;
    temp: number;
    description: string;
    icon: string;
  };
  
  type Props = {
    forecast: ForecastDay[];
  };
  
  export default function ForecastDisplay({ forecast }: Props) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-md shadow-md rounded-lg p-4 text-center"
          >
            <h3 className="text-lg font-semibold mb-2">{day.date}</h3>
            <Image
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              width={50}
              height={50}
              className="mx-auto"
            />
            <p className="text-sm text-gray-700 mb-1">{day.description}</p>
            <p className="font-bold">{day.temp}°</p>
          </div>
        ))}
      </div>
    );
  }
  