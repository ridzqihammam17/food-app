import { useState } from 'react'
import ResultPopup from './ResultPopup'
import { foodList } from '../data/foodData'

const RouletteScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [selectedFood, setSelectedFood] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setShowResult(false)

    let shuffleCount = 0
    const maxShuffles = 40 // Increased for longer, smoother animation
    let currentInterval = 50 // Start faster

    const shuffle = () => {
      if (shuffleCount >= maxShuffles) {
        // Animation complete - select final food
        const finalIndex = Math.floor(Math.random() * foodList.length)
        setCurrentIndex(finalIndex)
        setSelectedFood(foodList[finalIndex])

        setTimeout(() => {
          setIsSpinning(false)
          setShowResult(true)
        }, 500)
        return
      }

      // Fade out effect
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentIndex(prev => {
          let randomIndex
          do {
            randomIndex = Math.floor(Math.random() * foodList.length)
          } while (randomIndex === prev && foodList.length > 1)
          return randomIndex
        })
        setIsTransitioning(false)
      }, 50)

      shuffleCount++
      if (shuffleCount > maxShuffles - 5) {
        currentInterval += 80
      } else if (shuffleCount > maxShuffles - 10) {
        currentInterval += 50
      } else if (shuffleCount > maxShuffles - 18) {
        currentInterval += 25
      } else if (shuffleCount > maxShuffles - 25) {
        currentInterval += 10
      }

      setTimeout(shuffle, currentInterval)
    }

    shuffle()
  }

  const handleCloseResult = () => {
    setShowResult(false)
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-white overflow-y-auto overflow-x-hidden">
      {/* Main Section - White Background */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-8 md:py-12 lg:py-16 min-h-screen">
        {/* Tagline */}
        <p className="text-gray-800 text-lg md:text-2xl lg:text-3xl italic font-light mb-8 md:mb-12 lg:mb-16 mt-0 md:mt-8 lg:mt-12 text-center max-w-2xl">
          A random choice, a happy meal
        </p>

        {/* Center Card Only - No Side Cards */}
        <div className="relative w-full flex items-center justify-center mb-8 md:mb-12 lg:mb-16">
          {/* Center Card (Current) - Main Focus */}
          <div
            key={currentIndex}
            className={`relative w-52 h-64 md:w-72 md:h-80 lg:w-80 lg:h-96 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-200 ${
              isSpinning ? (isTransitioning ? 'opacity-70 scale-95' : 'opacity-100 scale-100') : 'animate-bounce-in'
            }`}
          >
            <img
              src={foodList[currentIndex].image}
              alt={foodList[currentIndex].name}
              className="w-full h-full object-cover transition-opacity duration-150"
            />
          </div>
        </div>

        {/* Spin Button - No Hover Effect */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`font-bold text-lg md:text-xl lg:text-2xl py-4 md:py-5 lg:py-6 px-16 md:px-20 lg:px-28 rounded-full shadow-xl transition-all duration-300 text-white mb-8 ${
            isSpinning
              ? 'opacity-50 cursor-not-allowed'
              : 'active:scale-95'
          }`}
          style={{ backgroundColor: '#EC2578' }}
        >
          {isSpinning ? 'SPINNING...' : 'SPIN'}
        </button>
      </div>

      {/* Result Popup */}
      {showResult && selectedFood && (
        <ResultPopup food={selectedFood} onClose={handleCloseResult} />
      )}
    </div>
  )
}

export default RouletteScreen

