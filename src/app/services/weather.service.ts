import { apiService } from './api/api.service'
import type { WeatherLocation, WeatherData, GeocodingResponse, WeatherApiResponse } from '../types/weather'

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
      const response = await apiService.get<GeocodingResponse[]>(`/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKey}`)
      return response.map((item: GeocodingResponse) => ({
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon
      }))
    } catch {
      throw new Error('Failed to search locations')
    }
  }

  async getWeather(location: WeatherLocation): Promise<WeatherData> {
    if (!this.apiKey) {
      throw new Error('API key is required')
    }

    try {
      const response = await apiService.get<WeatherApiResponse>(`/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${this.apiKey}`)
      
      // Validate response structure
      if (!response || !response.main || !response.weather || !response.weather[0]) {
        throw new Error('Invalid weather data received from API')
      }
      
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
      // Provide more specific error messages based on the error type
      if (error instanceof Error) {
        if (error.message.includes('HTTP error! status: 401')) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.')
        } else if (error.message.includes('HTTP error! status: 404')) {
          throw new Error('Weather data not found for this location.')
        } else if (error.message.includes('HTTP error! status: 429')) {
          throw new Error('API rate limit exceeded. Please try again later.')
        } else if (error.message.includes('HTTP error! status: 500')) {
          throw new Error('Weather service is temporarily unavailable. Please try again later.')
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('Network error. Please check your internet connection and try again.')
        } else if (error.message.includes('Invalid weather data')) {
          throw new Error('Received invalid weather data from the API.')
        } else {
          throw new Error(`Failed to get weather data: ${error.message}`)
        }
      } else {
        throw new Error('An unexpected error occurred while fetching weather data.')
      }
    }
  }
}

export const weatherService = new WeatherService()
