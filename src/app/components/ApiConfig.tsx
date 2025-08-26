interface ApiConfigProps {
  apiToken: string
  onApiTokenChange: (token: string) => void
}

const ApiConfig: React.FC<ApiConfigProps> = ({ apiToken, onApiTokenChange }) => {
  return (
    <div className="bg-glass-bg border border-glass-border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-lg shadow-2xl">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <i className="fa-solid fa-key text-white/80 text-lg sm:text-xl"></i>
        <h2 className="text-lg sm:text-xl font-semibold text-white">API Configuration</h2>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-white/90 mb-2">
            OpenWeatherMap API Token
          </label>
          <input
            type="password"
            value={apiToken}
            onChange={(e) => onApiTokenChange(e.target.value)}
            placeholder="Enter your API token here..."
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-white/50 text-sm sm:text-base"
          />
          <p className="text-xs text-white/60 mt-2">
            Your key is required to fetch weather data. Get it free from openweathermap.org
          </p>
        </div>
      </div>
    </div>
  )
}

export default ApiConfig
