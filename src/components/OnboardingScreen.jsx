import { useState } from 'react'
import emojiScreen1 from '../assets/onboarding/emoji_screen_1.png'
import emojiScreen2 from '../assets/onboarding/emoji_screen_2.png'
import emojiScreen3 from '../assets/onboarding/emoji_screen_3.png'

const onboardingData = [
  {
    image: emojiScreen1,
    title: 'Bingung mau makan apa?',
    subtitle: 'Terlalu banyak pilihan, tapi ujung-ujungnya itu-itu lagi',
  },
  {
    image: emojiScreen2,
    title: 'Biar web ini yang tentuin!',
    subtitle: 'Tinggal sekali tap dan kami acak pilihan makanannya buat kamu',
  },
  {
    image: emojiScreen3,
    title: 'Siap tentukan makanmu hari ini?',
    subtitle: 'Jangan kebanyakan mikir, langsung aja yuk kita pilih!',
  },
]

const OnboardingScreen = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onComplete()
    }
  }

  const currentSlide = onboardingData[currentIndex]
  const isLastSlide = currentIndex === onboardingData.length - 1

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-between p-6 md:p-12 lg:p-16">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl">
        {/* Illustration */}
        <div className="mb-8 md:mb-12 animate-bounce-in" key={currentIndex}>
          <img
            src={currentSlide.image}
            alt={`Onboarding ${currentIndex + 1}`}
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 px-4">
          {currentSlide.title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base lg:text-lg text-gray-500 px-6 md:px-12 leading-relaxed">
          {currentSlide.subtitle}
        </p>
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 md:gap-3 mb-8 md:mb-12">
        {onboardingData.map((_, index) => (
          <div
            key={index}
            className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 md:w-12'
                : 'w-2 md:w-3 bg-gray-300'
            }`}
            style={index === currentIndex ? { backgroundColor: '#EC2578' } : {}}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full max-w-md text-white font-semibold text-base md:text-lg lg:text-xl py-4 md:py-5 lg:py-6 rounded-full shadow-lg transition-all duration-300 active:scale-95"
        style={{ backgroundColor: '#EC2578' }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#D91E6A'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#EC2578'}
      >
        {isLastSlide ? "Let's Start" : 'Next'}
      </button>
    </div>
  )
}

export default OnboardingScreen

