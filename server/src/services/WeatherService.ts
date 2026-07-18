import axios from 'axios';
import { AppError } from '../utils/AppError';

export class WeatherService {
  private static readonly API_KEY = process.env.OPENWEATHER_API_KEY;
  private static readonly BASE_URL = 'https://api.openweathermap.org/data/3.0';
  private static readonly AQI_URL = 'http://api.openweathermap.org/data/2.5';

  /**
   * Fetches comprehensive weather data including current, hourly, and 7-day forecast.
   * Note: This requires the One Call API 3.0 subscription on OpenWeather.
   */
  static async getWeatherData(lat: number, lon: number) {
    if (!this.API_KEY) {
      throw new AppError('OPENWEATHER_API_KEY is not configured in the server environment.', 500);
    }

    try {
      // 1. Fetch main weather data (One Call 3.0)
      const oneCallResponse = await axios.get(`${this.BASE_URL}/onecall`, {
        params: {
          lat,
          lon,
          units: 'metric',
          exclude: 'minutely',
          appid: this.API_KEY,
        },
      });

      // 2. Fetch Air Quality Index (AQI)
      const aqiResponse = await axios.get(`${this.AQI_URL}/air_pollution`, {
        params: {
          lat,
          lon,
          appid: this.API_KEY,
        },
      });

      const weatherData = oneCallResponse.data;
      const aqiData = aqiResponse.data;

      // Map OpenWeather AQI (1-5) to a standard descriptive format
      const aqiValue = aqiData.list[0]?.main?.aqi || 1;
      let aqiDescription = 'Good';
      if (aqiValue === 2) aqiDescription = 'Fair';
      else if (aqiValue === 3) aqiDescription = 'Moderate';
      else if (aqiValue === 4) aqiDescription = 'Poor';
      else if (aqiValue === 5) aqiDescription = 'Very Poor';

      return {
        current: {
          temp: weatherData.current.temp,
          feels_like: weatherData.current.feels_like,
          humidity: weatherData.current.humidity,
          wind_speed: weatherData.current.wind_speed,
          uvi: weatherData.current.uvi,
          weather: weatherData.current.weather[0], // { id, main, description, icon }
          aqi: {
            value: aqiValue,
            description: aqiDescription,
            components: aqiData.list[0]?.components
          }
        },
        hourly: weatherData.hourly.slice(0, 24).map((hour: any) => ({
          dt: hour.dt,
          temp: hour.temp,
          pop: hour.pop, // Probability of precipitation
          weather: hour.weather[0],
        })),
        daily: weatherData.daily.map((day: any) => ({
          dt: day.dt,
          temp: {
            min: day.temp.min,
            max: day.temp.max,
          },
          weather: day.weather[0],
          pop: day.pop,
        })),
        alerts: weatherData.alerts || [],
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
         throw new AppError('Invalid OpenWeather API Key or One Call 3.0 subscription not activated.', 401);
      }
      console.error("Weather API Error:", error.response?.data || error.message);
      throw new AppError('Failed to fetch weather data from OpenWeather API.', 500);
    }
  }
}
