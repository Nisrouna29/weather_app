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
