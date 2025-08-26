import React, { useState, useEffect, useCallback } from 'react'
import { weatherService } from '../services/weather.service'
import type { WeatherLocation, WeatherData } from '../types/weather'

export default function WeatherPage() {
  const [apiToken, setApiToken] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<WeatherLocation[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isWeatherLoading, setIsWeatherLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (apiToken) {
      weatherService.setApiKey(apiToken)
    }
  }, [apiToken])



  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    setError('')
    setWeatherData(null)
    setHasSearched(true)
    
    try {
      const results = await weatherService.searchLocations(searchQuery)
      setSearchResults(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search locations')
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleLocationSelect = async (location: WeatherLocation) => {
    setIsWeatherLoading(true)
    setError('')
    
    try {
      const weather = await weatherService.getWeather(location)
      setWeatherData(weather)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get weather data')
    } finally {
      setIsWeatherLoading(false)
    }
  }

  const clearError = () => {
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-800 via-pink-700 to-rose-600 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <i className="fa-solid fa-cloud-sun text-4xl text-white"></i>
            <h1 className="text-4xl font-bold text-white">Weather Finder</h1>
          </div>
          <p className="text-xl text-orange-200">Get real-time temperature data for any location worldwide</p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* API Configuration Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-key text-white/80 text-xl"></i>
              <h2 className="text-xl font-semibold text-white">API Configuration</h2>
            </div>
            <div className="mb-3">
              <label className="block text-white/80 text-sm mb-2">OpenWeatherMap API Token</label>
              <input
                type="text"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
                placeholder="Enter your API token here..."
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-white/60"
              />
            </div>
            <p className="text-white/60 text-sm">
              Your key is required to fetch weather data. Get it free from{' '}
              <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">
                openweathermap.org
              </a>
            </p>
          </div>

          {/* Search Location Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-magnifying-glass text-white/80 text-xl"></i>
              <h2 className="text-xl font-semibold text-white">Search Location</h2>
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter city name and press Enter..."
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-white/60 pr-12"
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <i className="fa-solid fa-magnifying-glass text-white/40"></i>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-red-200 flex-1">{error}</p>
                <button 
                  onClick={clearError}
                  className="ml-3 text-red-200 hover:text-red-100 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Search Results Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-list text-white/80 text-xl"></i>
              <h2 className="text-xl font-semibold text-white">Search Results</h2>
            </div>
            
            <div className="text-center py-8 text-orange-200">
              {!hasSearched && (
                <div>
                  <i className="fa-solid fa-search text-4xl mb-4 text-white/40"></i>
                  <p className="text-sm">Search for a city to see available locations</p>
                </div>
              )}
              
              {hasSearched && isLoading && (
                <div>
                  <i className="fa-solid fa-spinner fa-spin text-4xl mb-4 text-white/40"></i>
                  <p className="text-sm">Searching for locations...</p>
                </div>
              )}
              
              {hasSearched && !isLoading && searchResults.length === 0 && (
                <div>
                  <i className="fa-solid fa-cloud-moon text-4xl mb-4 text-white/40"></i>
                  <p className="text-sm">No locations found for this search</p>
                </div>
              )}
              
              {hasSearched && !isLoading && searchResults.length > 0 && (
                <div className="space-y-3">
                  {searchResults.map((location, index) => (
                    <div 
                      key={`${location.name}-${location.country}-${location.state}-${index}`}
                      className="bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-medium text-white">{location.name}</h3>
                          <p className="text-sm text-orange-200">
                            {location.country}
                            {location.state && `, ${location.state}`}
                          </p>
                        </div>
                        <button 
                          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold w-full sm:w-auto focus:outline-none"
                          onClick={() => handleLocationSelect(location)}
                        >
                          Get Temperature
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Current Weather Card */}
          {weatherData && (
            <div className="bg-gradient-to-br from-orange-500/40 via-pink-500/40 to-rose-500/40 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <i className="fa-solid fa-thermometer-half text-white/80 text-xl"></i>
                <h2 className="text-xl font-semibold text-white">Current Weather</h2>
              </div>
              
              <div className="text-center">
                {isWeatherLoading ? (
                  <div className="py-12">
                    <i className="fa-solid fa-spinner fa-spin text-8xl text-white/80 mb-8"></i>
                    <p className="text-xl text-white/80">Loading weather data...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3 mb-6">
                      <i className="fa-solid fa-location-dot text-white/80 text-xl sm:text-2xl"></i>
                      <h3 className="text-lg sm:text-2xl font-semibold text-white text-center sm:text-left">
                        {weatherData.location.name}, {weatherData.location.country}
                        {weatherData.location.state && `, ${weatherData.location.state}`}
                      </h3>
                    </div>
                    
                    <div className="text-6xl sm:text-8xl font-bold text-white mb-4">
                      {weatherData.temperature}°C
                    </div>
                    <p className="text-lg sm:text-xl text-orange-200 mb-6 sm:mb-8">{weatherData.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center">
                      <div className="bg-white/10 rounded-lg p-4">
                        <i className="fa-solid fa-eye text-white/80 text-xl sm:text-2xl mb-2"></i>
                        <p className="text-white/80 text-xs sm:text-sm">Visibility</p>
                        <p className="text-white font-semibold text-base sm:text-lg">{weatherData.visibility} km</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <i className="fa-solid fa-droplet text-white/80 text-xl sm:text-2xl mb-2"></i>
                        <p className="text-white/80 text-xs sm:text-sm">Humidity</p>
                        <p className="text-white font-semibold text-base sm:text-lg">{weatherData.humidity}%</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <i className="fa-solid fa-wind text-white/80 text-xl sm:text-2xl mb-2"></i>
                        <p className="text-white/80 text-xs sm:text-sm">Wind</p>
                        <p className="text-white font-semibold text-base sm:text-lg">{weatherData.windSpeed} km/h</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-orange-200">
          <p>Powered by the OpenWeatherMap API</p>
          <p className="text-sm mt-1">© 2025 Weather Finder</p>
        </footer>
      </div>
    </div>
  )
}
