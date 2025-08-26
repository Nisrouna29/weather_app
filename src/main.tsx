import { createRoot } from 'react-dom/client'
import WeatherPage from './app/components/weather-page.component'

createRoot(document.getElementById('root')!).render(
  <WeatherPage />
)
