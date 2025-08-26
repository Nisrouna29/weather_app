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
         <>
         <header id="header" className="bg-transparent px-4 sm:px-6 py-4 sm:py-6">
           <div className="max-w-4xl mx-auto text-center">
             <div className="flex items-center justify-center gap-2 sm:gap-3">
                 <i className="fa-solid fa-cloud-sun text-2xl sm:text-3xl md:text-4xl text-white"></i>
                 <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Weather Finder</h1>
             </div>
             <p className="text-sm sm:text-base md:text-lg text-white/80 mt-2">Get real-time temperature data for any location worldwide</p>
           </div>
         </header>

        <main id="main" className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex-grow w-full">
          <div id="api-config" className="bg-glass-bg border border-glass-border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-lg shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <i className="fa-solid fa-key text-white/80 text-lg sm:text-xl"></i>
              <h2 className="text-lg sm:text-xl font-semibold text-white">API Configuration</h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white/90 mb-2">OpenWeatherMap API Token</label>
                <input
                  type="password"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                  placeholder="Enter your API token here..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-white/50 text-sm sm:text-base"
                />
                <p className="text-xs text-white/60 mt-2">Your key is required to fetch weather data. Get it free from openweathermap.org</p>
              </div>
            </div>
          </div>

          <div id="search-section" className="bg-glass-bg border border-glass-border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-lg shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <i className="fa-solid fa-magnifying-glass text-white/80 text-lg sm:text-xl"></i>
              <h2 className="text-lg sm:text-xl font-semibold text-white">Search Location</h2>
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter city name and press Enter..."
                className="w-full px-3 sm:px-5 py-3 sm:py-4 pr-10 sm:pr-12 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-white/50 text-sm sm:text-base md:text-lg"
                disabled={isLoading}
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                <i className="fa-solid fa-search text-white/50 text-sm sm:text-base"></i>
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

          <div id="results-section" className="bg-glass-bg border border-glass-border rounded-2xl p-6 mb-8 backdrop-blur-lg shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-list text-white/80 text-xl"></i>
              <h2 className="text-xl font-semibold text-white">Search Results</h2>
            </div>
            
            <div id="results-list" className="space-y-3">
              {!hasSearched && (
                <div className="text-center py-8 text-white/60">
                  <i className="fa-solid fa-search text-4xl mb-4"></i>
                  <p>Search for a city to see available locations</p>
                </div>
              )}
              
              {hasSearched && isLoading && (
                <div className="text-center py-8 text-white/60">
                  <i className="fa-solid fa-spinner fa-spin text-4xl mb-4"></i>
                  <p>Searching for locations...</p>
                </div>
              )}
              
              {hasSearched && !isLoading && searchResults.length === 0 && (
                <div className="text-center py-8 text-white/60">
                  <i className="fa-solid fa-cloud-moon text-4xl mb-4"></i>
                  <p>No locations found for this search</p>
                </div>
              )}
              
              {hasSearched && !isLoading && searchResults.length > 0 && (
                <>
                  {searchResults.map((location, index) => (
                    <div 
                      key={`${location.name}-${location.country}-${location.state}-${index}`}
                      className="bg-black/20 rounded-lg p-4 hover:bg-black/40 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
                    >
                                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <h3 className="text-base sm:text-lg font-medium text-white">{location.name}</h3>
                            <p className="text-xs sm:text-sm text-white/70">
                              {location.country}
                              {location.state && `, ${location.state}`}
                            </p>
                          </div>
                          <button 
                            className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold shadow-lg w-full sm:w-auto"
                            onClick={() => handleLocationSelect(location)}
                          >
                            Get Temperature
                          </button>
                        </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Current Weather Card - Only show when weatherData exists or is loading */}
          {(weatherData || isWeatherLoading) && (
            <div id="temperature-display" className="bg-gradient-to-br from-blue-500/30 to-teal-400/30 border border-glass-border rounded-2xl p-6 backdrop-blur-lg shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <i className="fa-solid fa-thermometer-half text-white/80 text-xl"></i>
                <h2 className="text-xl font-semibold text-white">Current Weather</h2>
              </div>
              
              <div id="temperature-data" className="text-center">
                {isWeatherLoading ? (
                  <div className="py-12">
                    <i className="fa-solid fa-spinner fa-spin text-8xl text-white/80 mb-8"></i>
                    <p className="text-xl text-white/80">Loading weather data...</p>
                  </div>
                ) : weatherData ? (
                  <>
                                         <div className="flex items-center justify-center gap-3 mb-4">
                       <h3 className="text-3xl font-semibold text-white">
                         {weatherData.location.name}, {weatherData.location.country}
                         {weatherData.location.state && `, ${weatherData.location.state}`}
                       </h3>
                     </div>
                    
                                         <div className="text-8xl font-bold text-white mb-2 relative inline-block">
                       {weatherData.temperature}<span className="absolute top-0 -right-8 text-3xl font-medium opacity-80">°C</span>
                     </div>
                    <p className="text-white/80 text-lg">{weatherData.description}</p>
                    
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <i className="fa-solid fa-eye text-white/70 text-2xl mb-2"></i>
                          <p className="text-white/70">Visibility</p>
                          <p className="text-white font-semibold text-lg">{weatherData.visibility} km</p>
                        </div>
                        <div className="text-center">
                          <i className="fa-solid fa-droplet text-white/70 text-2xl mb-2"></i>
                          <p className="text-white/70">Humidity</p>
                          <p className="text-white font-semibold text-lg">{weatherData.humidity}%</p>
                        </div>
                        <div className="text-center">
                          <i className="fa-solid fa-wind text-white/70 text-2xl mb-2"></i>
                          <p className="text-white/70">Wind</p>
                          <p className="text-white font-semibold text-lg">{weatherData.windSpeed} km/h</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </main>

        <footer id="footer" className="bg-transparent px-6 py-8 mt-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-white/70">Powered by the OpenWeatherMap API</p>
            <p className="text-xs text-white/50 mt-1">© 2025 Weather Finder</p>
          </div>
        </footer>
    </>
  )
}
