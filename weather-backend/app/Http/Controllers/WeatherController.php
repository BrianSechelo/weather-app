<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Carbon;

class WeatherController extends Controller
{
    public function index(Request $request)
    {
        $city = $request->query('city', 'Nairobi');
        $geoResponse = Http::get('http://api.openweathermap.org/geo/1.0/direct', [
            'q' => $city,
            'limit' => 1,
            'appid' => config('services.openweather.key'),
        ]);

        if ($geoResponse->failed() || empty($geoResponse[0])) {
            return response()->json(['message' => 'City not found'], 404);
        }

        $lat = $geoResponse[0]['lat'];
        $lon = $geoResponse[0]['lon'];

        $unit = $request->query('unit', 'metric');  

        $weatherResponse = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => config('services.openweather.key'),
            'units' => $unit, // or 'imperial'
        ]);
        if ($weatherResponse->failed()) {
            return response()->json(['message' => 'Unable to fetch weather'], 500);
        }

        $forecastResponse = Http::get('https://api.openweathermap.org/data/2.5/forecast', [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => config('services.openweather.key'),
            'units' => $unit,
        ]);

        if ($forecastResponse->failed()) {
            return response()->json(['message' => 'Unable to fetch forecast'], 500);
        }

        $forecastList = $forecastResponse->json()['list'];
        $grouped = [];

        foreach ($forecastList as $entry) {
            $date = Carbon::parse($entry['dt_txt'])->format('Y-m-d');
            $hour = Carbon::parse($entry['dt_txt'])->format('H');

            // Pick midday (12:00) forecast to represent the day
            if ($hour === '12') {
                $grouped[$date] = [
                    'date' => Carbon::parse($entry['dt_txt'])->format('l, M j'),
                    'temp' => $entry['main']['temp'],
                    'description' => $entry['weather'][0]['description'],
                    'icon' => $entry['weather'][0]['icon'],
                ];
            }
        }

        // Return only next 3 days
        $forecast = array_values(array_slice($grouped, 0, 3));

        return response()->json([
            'location' => $city,
            'temperature' => $weatherResponse['main']['temp'],
            'description' => $weatherResponse['weather'][0]['description'],
            'humidity' => $weatherResponse['main']['humidity'],
            'wind_speed' => $weatherResponse['wind']['speed'],
            'icon' => $weatherResponse['weather'][0]['icon'],
            'unit' => $request->query('unit', 'metric'),
            'forecast' => $forecast
        ]);
    }
}
