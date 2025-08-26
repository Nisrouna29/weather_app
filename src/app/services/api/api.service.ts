export class ApiService {
  private baseUrl = 'https://api.openweathermap.org'

  async get<T = unknown>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }
}

export const apiService = new ApiService()
