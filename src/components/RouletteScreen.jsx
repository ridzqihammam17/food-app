import { useState } from 'react'
import ResultPopup from './ResultPopup'
import food1 from '../assets/foods/food_1.png'
import food2 from '../assets/foods/food_2.png'
import food3 from '../assets/foods/food_3.png'
import food4 from '../assets/foods/food_4.png'
import food5 from '../assets/foods/food_5.png'
import food6 from '../assets/foods/food_6.png'

const foodList = [
  { id: 1, name: 'Nasi Goreng', image: food1 },
  { id: 2, name: 'Bakso', image: food2 },
  { id: 3, name: 'Gado-gado', image: food3 },
  { id: 4, name: 'Soto Ayam', image: food4 },
  { id: 5, name: 'Mie Ayam', image: food5 },
  { id: 6, name: 'Ayam Goreng', image: food6 },
]

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
    <div className="fixed inset-0 flex flex-col bg-white overflow-y-auto">
      {/* Main Section - White Background */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 md:py-12 lg:py-16 min-h-screen">
        {/* Tagline */}
        <p className="text-gray-800 text-lg md:text-2xl lg:text-3xl italic font-light mb-8 md:mb-12 lg:mb-16 mt-0 md:mt-8 lg:mt-12 text-center max-w-2xl">
          A random choice, a happy meal
        </p>

        {/* Center Card Only - No Side Cards */}
        <div className="relative w-full max-w-6xl flex items-center justify-center mb-8 md:mb-12 lg:mb-16 px-4">
          {/* Center Card (Current) - Main Focus */}
          <div
            key={currentIndex}
            className={`relative w-56 h-72 md:w-80 md:h-96 lg:w-96 lg:h-[500px] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-200 ${
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

