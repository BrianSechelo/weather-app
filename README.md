# 🌦️ Weather App

A full-stack weather application built with **Next.js (TypeScript)** for the frontend and **Laravel** for the backend. The app fetches real-time weather data using the **OpenWeatherMap API** and provides current conditions as well as a 3-day forecast.

---
## 🔧 Technologies Used

### Frontend:
- [Next.js](https://nextjs.org/)
- TypeScript
- TailwindCSS
- RippleUI (UI enhancement)
- OpenWeatherMap API
- DaisyUI / Custom CSS

### Backend:
- [Laravel](https://laravel.com/)
- Laravel HTTP Client
- CORS support
- `.env` configuration for API keys

---

## 🚀 Features

✅ Search box with city name input  
✅ Uses **Geocoding API** to convert city to coordinates  
✅ Weather icon based on current conditions  
✅ Toggle between Celsius (°C) and Fahrenheit (°F)  
✅ Displays:
- Current temperature
- Weather description
- Humidity
- Wind speed
- Current date and location  
✅ Shows **3-day forecast** with icons  
✅ Error handling for invalid cities  

---

## 🔑 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/BrianSechelo/weather-app.git
cd weather-app
2. Setup the Backend
cd weather-backend
composer install
cp .env.example .env
php artisan key:generate
Update .env with your OpenWeatherMap API key:
OPENWEATHER_KEY=your_api_key_here
Run the Laravel server:
php artisan serve
3. Setup the Frontend
cd ../weather-frontend
npm install
npm run dev
Access the app at: http://localhost:3000

🌍 API Reference

Uses:

    OpenWeatherMap Geocoding API

    OpenWeatherMap Current Weather & Forecast API
🧪 Testing

Try searching:

    A valid city (e.g., Nairobi)

    An invalid name (Xyzville) to test error handling

    Toggle °C ↔ °F and observe temperature updates
Author

Built with 💻 by Brian Sechelo

📜 License

This project is licensed under the MIT License.