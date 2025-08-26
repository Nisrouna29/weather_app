import { useState } from 'react'
import type { KeyboardEvent } from 'react'

interface SearchSectionProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  return (
    <div className="bg-glass-bg border border-glass-border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-lg shadow-2xl">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <i className="fa-solid fa-magnifying-glass text-white/80 text-lg sm:text-xl"></i>
        <h2 className="text-lg sm:text-xl font-semibold text-white">Search Location</h2>
      </div>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name and press Enter..."
          className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-white/50 text-base sm:text-lg"
          disabled={isLoading}
        />
        <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin text-white/50"></i>
          ) : (
            <i className="fa-solid fa-search text-white/50"></i>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchSection
