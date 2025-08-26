export interface WeatherLocation {
  name: string
  country: string
  state: string
  lat: number
  lon: number
}

export interface WeatherData {
  location: WeatherLocation
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  visibility: number
  icon: string
}

// OpenWeatherMap API response types
export interface GeocodingResponse {
  name: string
  country: string
  state: string
  lat: number
  lon: number
}

export interface WeatherApiResponse {
  main: {
    temp: number
    humidity: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  visibility: number
}
