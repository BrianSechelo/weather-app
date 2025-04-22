<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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

        $weatherResponse = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => config('services.openweather.key'),
            'units' => 'metric', // or 'imperial'
        ]);
        if ($weatherResponse->failed()) {
            return response()->json(['message' => 'Unable to fetch weather'], 500);
        }

        return response()->json([
            'location' => $city,
            'temperature' => $weatherResponse['main']['temp'],
            'description' => $weatherResponse['weather'][0]['description'],
            'humidity' => $weatherResponse['main']['humidity'],
            'wind_speed' => $weatherResponse['wind']['speed'],
        ]);
    }
}
