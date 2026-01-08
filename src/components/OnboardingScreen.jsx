import { useState, useRef, useEffect } from 'react'
import emojiScreen1 from '../assets/onboarding/emoji_screen_1.png'
import emojiScreen2 from '../assets/onboarding/emoji_screen_2.png'
import emojiScreen3 from '../assets/onboarding/emoji_screen_3.png'

const onboardingData = [
  {
    image: emojiScreen1,
    title: 'Bingung mau makan apa?',
    subtitle: 'Terlalu banyak pilihan, tapi ujung-ujungnya eh itu-itu lagi',
  },
  {
    image: emojiScreen2,
    title: 'Biar web ini yang tentuin!',
    subtitle: 'Tinggal sekali tap dan kami akan pilihkan makanan kamu',
  },
  {
    image: emojiScreen3,
    title: 'Udah siap?',
    subtitle: 'Jangan kebanyakan mikir ah, langsung aja yuk mulai spinnya!',
  },
]

const OnboardingScreen = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const containerRef = useRef(null)
  const slideWidth = useRef(0)

  useEffect(() => {
    // Get slide width on mount and resize
    const updateWidth = () => {
      if (containerRef.current) {
        slideWidth.current = containerRef.current.offsetWidth
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    // Update translateX when currentIndex changes
    setTranslateX(-currentIndex * slideWidth.current)
  }, [currentIndex])

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onComplete()
    }
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  // Touch/Mouse event handlers untuk swipe
  const handleDragStart = (e) => {
    setIsDragging(true)
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    setStartX(clientX)
    setCurrentX(clientX)
  }

  const handleDragMove = (e) => {
    if (!isDragging) return
    e.preventDefault()

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    setCurrentX(clientX)

    const diff = clientX - startX
    const newTranslate = -currentIndex * slideWidth.current + diff

    // Limit dragging at boundaries
    const maxTranslate = 0
    const minTranslate = -(onboardingData.length - 1) * slideWidth.current

    if (newTranslate > maxTranslate) {
      // At first slide, add resistance
      setTranslateX(maxTranslate + diff * 0.3)
    } else if (newTranslate < minTranslate) {
      // At last slide, add resistance
      setTranslateX(minTranslate + (diff * 0.3))
    } else {
      setTranslateX(newTranslate)
    }
  }

  const handleDragEnd = () => {
    if (!isDragging) return

    setIsDragging(false)
    const diff = currentX - startX
    const threshold = slideWidth.current * 0.3 // 30% of slide width

    if (diff < -threshold && currentIndex < onboardingData.length - 1) {
      // Swipe left - next slide
      setCurrentIndex(currentIndex + 1)
    } else if (diff > threshold && currentIndex > 0) {
      // Swipe right - previous slide
      setCurrentIndex(currentIndex - 1)
    } else {
      // Snap back to current slide
      setTranslateX(-currentIndex * slideWidth.current)
    }
  }

  const isLastSlide = currentIndex === onboardingData.length - 1

  // Calculate dot indicator position (0 to 1 range for smooth animation)
  const dotProgress = slideWidth.current > 0
    ? Math.abs(translateX) / slideWidth.current
    : currentIndex

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-between p-6 md:p-12 lg:p-16 overflow-hidden">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="flex-1 w-full overflow-hidden relative"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Slides Wrapper */}
        <div
          className="flex h-full cursor-grab active:cursor-grabbing select-none"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {onboardingData.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full flex flex-col items-center justify-center text-center px-6"
              style={{ width: slideWidth.current || '100%' }}
            >
              {/* Illustration */}
              <div className="mb-8 md:mb-12 pointer-events-none">
                <img
                  src={slide.image}
                  alt={`Onboarding ${index + 1}`}
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 px-4 pointer-events-none">
                {slide.title}
              </h2>

              {/* Subtitle */}
              <p className="text-sm md:text-base lg:text-lg text-gray-500 px-6 md:px-12 leading-relaxed pointer-events-none max-w-2xl">
                {slide.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots - Animated */}
      <div className="flex gap-2 md:gap-3 mb-6 md:mb-8 mt-4 md:mt-6 relative">
        {onboardingData.map((_, index) => {
          // Calculate opacity and width based on scroll position
          const distance = Math.abs(dotProgress - index)
          const isActive = distance < 0.5
          const opacity = isActive ? 1 : 0.3

          return (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="h-2 md:h-3 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: isActive ? '32px' : '8px',
                backgroundColor: isActive ? '#EC2578' : '#D1D5DB',
                opacity: opacity,
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        })}
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

