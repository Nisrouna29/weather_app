# Weather Finder App

A modern React weather application built with TypeScript that allows users to search for cities and get real-time weather information using the OpenWeatherMap API.

## Features

- **API Configuration**: Secure input field for OpenWeatherMap API token
- **City Search**: Search for cities by name with Enter key support
- **Location Results**: Display search results with city name, country, and state
- **Weather Data**: Show current temperature in Celsius with additional weather information
- **Responsive Design**: Beautiful glass-morphism UI with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Architecture

The app follows a modular architecture inspired by Angular patterns:

```
src/
├── app/
│   ├── core/                # Core services, interceptors, guards
│   │   └── services/
│   │       └── api.service.ts        # Base HTTP service
│   │
│   ├── features/            # Feature modules
│   │   └── weather/
│   │       ├── components/
│   │       │   └── weather-card.component.ts
│   │       ├── pages/
│   │       │   └── weather-page.component.ts
│   │       └── services/
│   │           └── weather.service.ts
│   │
│   ├── shared/              # Reusable components, pipes
│   │   ├── components/
│   │   │   └── spinner.component.ts
│   │   └── pipes/
│   │       └── capitalize.pipe.ts
│   │
│   ├── components/          # App-level components
│   │   ├── ApiConfig.tsx
│   │   ├── SearchSection.tsx
│   │   └── ResultsSection.tsx
│   │
│   └── types/               # TypeScript interfaces
│       └── weather.ts
│
├── App.tsx                  # Main app component
└── main.tsx                 # App entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### API Key Setup

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Enter your API key in the "API Configuration" section
3. Start searching for cities!

## Usage

1. **Enter API Token**: Input your OpenWeatherMap API token in the configuration section
2. **Search Cities**: Type a city name and press Enter to search
3. **Select Location**: Choose from the list of matching locations
4. **View Weather**: See current temperature, humidity, wind speed, and visibility

## Technologies Used

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Font Awesome** for icons
- **Vite** for build tooling
- **OpenWeatherMap API** for weather data

## API Endpoints Used

- **Geocoding API**: `/geo/1.0/direct` - Search for city locations
- **Current Weather API**: `/data/2.5/weather` - Get current weather data

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint configuration for React and TypeScript
- Consistent component naming with `.component.tsx` suffix
- Service classes for business logic
- Shared components for reusability

## Contributing

1. Follow the established architecture patterns
2. Use TypeScript for all new code
3. Maintain component separation and reusability
4. Add proper error handling and loading states

## License

This project is licensed under the MIT License.
