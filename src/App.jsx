import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import OnboardingScreen from './components/OnboardingScreen'
import RouletteScreen from './components/RouletteScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash')

  const handleSplashComplete = () => {
    setCurrentScreen('onboarding')
  }

  const handleOnboardingComplete = () => {
    setCurrentScreen('roulette')
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {currentScreen === 'splash' && <SplashScreen onComplete={handleSplashComplete} />}
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === 'roulette' && <RouletteScreen />}
    </div>
  )
}

export default App

