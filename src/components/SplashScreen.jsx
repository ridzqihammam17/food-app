import React, { useState, useEffect } from 'react'
import logoImage from '../assets/logo.png'

const SplashScreen = ({ onComplete }) => {
  const [loadingText, setLoadingText] = useState('Loading the assets')

  const loadingSteps = [
    'Loading the assets',
    'Loading food images',
    'Loading food data',
    'Loading system spin',
    'Loading build',
    'Finishing'
  ]

  useEffect(() => {
    let currentStep = 0
    const stepDuration = 600 // 600ms per step

    const interval = setInterval(() => {
      currentStep++
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep])
      } else {
        clearInterval(interval)
        setTimeout(() => {
          if (onComplete) {
            onComplete()
          }
        }, 800)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="text-center animate-scale-in px-6">
        {/* Logo */}
        <div className="mb-6 md:mb-8 flex justify-center">
          <img
            src={logoImage}
            alt="SPIN FOOD Logo"
            className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide mb-8 md:mb-12" style={{ color: '#EC2578' }}>
          SPIN FOOD
        </h1>

        {/* Loading Section */}
        <div className="flex flex-col items-center gap-4 mt-8">
          {/* Loading Spinner */}
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <div className="absolute inset-0 border-4 border-pink-200 rounded-full"></div>
            <div
              className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
              style={{
                borderTopColor: '#EC2578',
                borderRightColor: '#EC2578'
              }}
            ></div>
          </div>

          {/* Loading Text */}
          <p
            key={loadingText}
            className="text-sm md:text-base lg:text-lg text-gray-600 font-medium animate-fade-in-fast"
          >
            {loadingText}...
          </p>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen

