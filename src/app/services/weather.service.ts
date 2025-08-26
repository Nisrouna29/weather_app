import { apiService } from './api/api.service'
import type { WeatherLocation, WeatherData } from '../types/weather'

export class WeatherService {
  private apiKey: string = ''

  setApiKey(key: string) {
    this.apiKey = key
  }

  async searchLocations(query: string): Promise<WeatherLocation[]> {
    if (!this.apiKey) {
      throw new Error('API key is required')
    }

    try {
      const response = await apiService.get(`/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKey}`)
      return response.map((item: any) => ({
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon
      }))
    } catch (error) {
      throw new Error('Failed to search locations')
    }
  }

  async getWeather(location: WeatherLocation): Promise<WeatherData> {
    if (!this.apiKey) {
      throw new Error('API key is required')
    }

    try {
      const response = await apiService.get(`/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${this.apiKey}`)
      
      return {
        location: {
          name: location.name,
          country: location.country,
          state: location.state,
          lat: location.lat,
          lon: location.lon
        },
        temperature: Math.round(response.main.temp),
        description: response.weather[0].description,
        humidity: response.main.humidity,
        windSpeed: Math.round(response.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round(response.visibility / 1000), // Convert m to km
        icon: response.weather[0].icon
      }
    } catch (error) {
      throw new Error('Failed to get weather data')
    }
  }
}

export const weatherService = new WeatherService()
