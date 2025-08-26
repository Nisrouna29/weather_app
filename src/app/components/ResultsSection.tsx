import type { WeatherLocation } from '../types/weather'

interface ResultsSectionProps {
  results: WeatherLocation[]
  onLocationSelect: (location: WeatherLocation) => void
  isLoading: boolean
  hasSearched: boolean
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, onLocationSelect, isLoading, hasSearched }) => {
  return (
    <div className="bg-glass-bg border border-glass-border rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-lg shadow-2xl">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <i className="fa-solid fa-list text-white/80 text-lg sm:text-xl"></i>
        <h2 className="text-lg sm:text-xl font-semibold text-white">Search Results</h2>
      </div>
      
      <div className="text-center py-6 sm:py-8 text-white/60">
        {!hasSearched && (
          <>
            <i className="fa-solid fa-search text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
            <p className="text-sm sm:text-base">Search for a city to see available locations</p>
          </>
        )}
        
        {hasSearched && isLoading && (
          <>
            <i className="fa-solid fa-spinner fa-spin text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
            <p className="text-sm sm:text-base">Searching for locations...</p>
          </>
        )}
        
        {hasSearched && !isLoading && results.length === 0 && (
          <>
            <i className="fa-solid fa-cloud-moon text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
            <p className="text-sm sm:text-base">No locations found for this search</p>
          </>
        )}
        
        {hasSearched && !isLoading && results.length > 0 && (
          <div className="space-y-2 sm:space-y-3">
            {results.map((location, index) => (
              <div 
                key={`${location.name}-${location.country}-${location.state}-${index}`}
                className="bg-black/20 rounded-lg p-3 sm:p-4 hover:bg-black/40 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-white">{location.name}</h3>
                    <p className="text-xs sm:text-sm text-white/70">
                      {location.country}
                      {location.state && `, ${location.state}`}
                    </p>
                  </div>
                  <button 
                    className="px-3 sm:px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold shadow-lg text-sm sm:text-base w-full sm:w-auto"
                    onClick={() => onLocationSelect(location)}
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
  )
}

export default ResultsSection
