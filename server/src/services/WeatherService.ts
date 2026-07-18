import axios from 'axios';
import { AppError } from '../utils/AppError';

export class WeatherService {
  /**
   * Map WMO Weather codes from Open-Meteo to OpenWeather format
   */
  private static mapWmoToOpenWeather(code: number, isDay: boolean = true) {
    const d = isDay ? 'd' : 'n';
    switch (code) {
      case 0: return { id: 800, main: "Clear", description: "clear sky", icon: `01${d}` };
      case 1: return { id: 801, main: "Clouds", description: "few clouds", icon: `02${d}` };
      case 2: return { id: 802, main: "Clouds", description: "scattered clouds", icon: `03${d}` };
      case 3: return { id: 804, main: "Clouds", description: "overcast clouds", icon: `04${d}` };
      case 45: 
      case 48: return { id: 741, main: "Fog", description: "fog", icon: `50${d}` };
      case 51: case 53: case 55: 
      case 56: case 57: return { id: 300, main: "Drizzle", description: "drizzle", icon: `09${d}` };
      case 61: case 63: case 65: return { id: 500, main: "Rain", description: "rain", icon: `10${d}` };
      case 66: case 67: return { id: 511, main: "Rain", description: "freezing rain", icon: `13${d}` };
      case 71: case 73: case 75: 
      case 77: return { id: 600, main: "Snow", description: "snow", icon: `13${d}` };
      case 80: case 81: case 82: return { id: 520, main: "Rain", description: "shower rain", icon: `09${d}` };
      case 85: case 86: return { id: 620, main: "Snow", description: "snow showers", icon: `13${d}` };
      case 95: return { id: 200, main: "Thunderstorm", description: "thunderstorm", icon: `11${d}` };
      case 96: case 99: return { id: 211, main: "Thunderstorm", description: "thunderstorm with hail", icon: `11${d}` };
      default: return { id: 800, main: "Clear", description: "clear sky", icon: `01${d}` };
    }
  }

  /**
   * Fetches comprehensive weather data using Open-Meteo (Free, No API Key needed)
   */
  static async getWeatherData(lat: number, lon: number) {
    try {
      // 1. Fetch main weather data
      const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
        params: {
          latitude: lat,
          longitude: lon,
          current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day',
          hourly: 'temperature_2m,weather_code,is_day',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max',
          timezone: 'auto'
        },
      });

      // 2. Fetch Air Quality Index (European AQI)
      const aqiResponse = await axios.get(`https://air-quality-api.open-meteo.com/v1/air-quality`, {
        params: {
          latitude: lat,
          longitude: lon,
          current: 'european_aqi',
          timezone: 'auto'
        },
      });

      const wData = weatherResponse.data;
      const aqiData = aqiResponse.data;

      // Map European AQI (0-100+) to 1-5 scale
      const rawAqi = aqiData.current?.european_aqi || 20;
      let aqiValue = 1;
      let aqiDescription = 'Good';
      
      if (rawAqi > 80) { aqiValue = 5; aqiDescription = 'Very Poor'; }
      else if (rawAqi > 60) { aqiValue = 4; aqiDescription = 'Poor'; }
      else if (rawAqi > 40) { aqiValue = 3; aqiDescription = 'Moderate'; }
      else if (rawAqi > 20) { aqiValue = 2; aqiDescription = 'Fair'; }

      // Map hourly data (next 24 hours)
      let currentHourIdx = wData.hourly.time.findIndex((t: string) => new Date(t).getTime() >= Date.now());
      if (currentHourIdx === -1) currentHourIdx = 0;
      
      const hourly = [];
      for (let i = currentHourIdx; i < currentHourIdx + 24; i++) {
        if (i >= wData.hourly.time.length) break;
        hourly.push({
          dt: Math.floor(new Date(wData.hourly.time[i]).getTime() / 1000),
          temp: wData.hourly.temperature_2m[i],
          weather: this.mapWmoToOpenWeather(wData.hourly.weather_code[i], wData.hourly.is_day[i] === 1)
        });
      }

      // Map daily data (next 7 days)
      const daily = [];
      for (let i = 0; i < 7; i++) {
        if (!wData.daily.time[i]) break;
        daily.push({
          dt: Math.floor(new Date(wData.daily.time[i]).getTime() / 1000),
          temp: {
            day: (wData.daily.temperature_2m_max[i] + wData.daily.temperature_2m_min[i]) / 2, // Avg
            min: wData.daily.temperature_2m_min[i],
            max: wData.daily.temperature_2m_max[i],
          },
          weather: this.mapWmoToOpenWeather(wData.daily.weather_code[i], true),
          pop: (wData.daily.precipitation_probability_max[i] || 0) / 100, // convert 0-100 to 0-1
        });
      }

      return {
        current: {
          temp: wData.current.temperature_2m,
          feels_like: wData.current.apparent_temperature,
          humidity: wData.current.relative_humidity_2m,
          wind_speed: wData.current.wind_speed_10m,
          uvi: wData.daily.uv_index_max[0] || 0,
          weather: this.mapWmoToOpenWeather(wData.current.weather_code, wData.current.is_day === 1),
          aqi: {
            value: aqiValue,
            description: aqiDescription,
          }
        },
        hourly,
        daily
      };
    } catch (error: any) {
      console.error('Weather API Error:', error?.response?.data || error.message);
      throw new AppError('Failed to fetch weather data', 500);
    }
  }
}
