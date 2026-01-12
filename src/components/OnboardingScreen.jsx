import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import emojiScreen1 from '../assets/onboarding/emoji_screen_1.png'
import emojiScreen2 from '../assets/onboarding/emoji_screen_2.png'
import emojiScreen3 from '../assets/onboarding/emoji_screen_3.png'

// Constants
const SWIPE_THRESHOLD = 0.3 // 30% of slide width
const BOUNDARY_RESISTANCE = 0.3 // Resistance when dragging beyond boundaries
const TRANSITION_DURATION = '0.4s'
const TRANSITION_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

const DOT_CONFIG = {
  maxWidth: 32,
  minWidth: 8,
  maxOpacity: 1,
  minOpacity: 0.3,
  activeColor: { r: 236, g: 37, b: 120 }, // #EC2578
  inactiveColor: { r: 209, g: 213, b: 219 }, // #D1D5DB
}

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

// Helper function: Interpolate between two values
const lerp = (start, end, progress) => start + (end - start) * progress

// Helper function: Interpolate RGB colors
const interpolateColor = (color1, color2, progress) => {
  const r = Math.round(lerp(color1.r, color2.r, progress))
  const g = Math.round(lerp(color1.g, color2.g, progress))
  const b = Math.round(lerp(color1.b, color2.b, progress))
  return `rgb(${r}, ${g}, ${b})`
}

// Helper function: Get client X position from mouse or touch event
const getClientX = (e) => {
  return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
}

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

  // Navigate to next slide or complete onboarding
  const handleNext = useCallback(() => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onComplete()
    }
  }, [currentIndex, onComplete])

  // Navigate to specific slide
  const handleDotClick = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  // Navigate to previous slide
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrevious])

  // Touch/Mouse event handlers for swipe
  const handleDragStart = useCallback((e) => {
    setIsDragging(true)
    const clientX = getClientX(e)
    setStartX(clientX)
    setCurrentX(clientX)
  }, [])

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return
    e.preventDefault()

    const clientX = getClientX(e)
    setCurrentX(clientX)

    const diff = clientX - startX
    const newTranslate = -currentIndex * slideWidth.current + diff

    // Limit dragging at boundaries with resistance
    const maxTranslate = 0
    const minTranslate = -(onboardingData.length - 1) * slideWidth.current

    if (newTranslate > maxTranslate) {
      setTranslateX(maxTranslate + diff * BOUNDARY_RESISTANCE)
    } else if (newTranslate < minTranslate) {
      setTranslateX(minTranslate + (diff * BOUNDARY_RESISTANCE))
    } else {
      setTranslateX(newTranslate)
    }
  }, [isDragging, startX, currentIndex])

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)
    const diff = currentX - startX
    const threshold = slideWidth.current * SWIPE_THRESHOLD

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
  }, [isDragging, currentX, startX, currentIndex])

  const isLastSlide = currentIndex === onboardingData.length - 1

  // Calculate dot indicator position for smooth animation
  const dotProgress = useMemo(() => {
    return slideWidth.current > 0
      ? Math.abs(translateX) / slideWidth.current
      : currentIndex
  }, [translateX, currentIndex])

  // Calculate dot styles based on progress
  const calculateDotStyles = useCallback((index) => {
    const distance = Math.abs(dotProgress - index)

    // Progressive width calculation
    const width = distance <= 1
      ? lerp(DOT_CONFIG.maxWidth, DOT_CONFIG.minWidth, distance)
      : DOT_CONFIG.minWidth

    // Progressive opacity calculation
    const opacity = distance <= 1
      ? lerp(DOT_CONFIG.maxOpacity, DOT_CONFIG.minOpacity, distance)
      : DOT_CONFIG.minOpacity

    // Progressive color calculation
    const backgroundColor = distance <= 1
      ? interpolateColor(DOT_CONFIG.activeColor, DOT_CONFIG.inactiveColor, distance)
      : `rgb(${DOT_CONFIG.inactiveColor.r}, ${DOT_CONFIG.inactiveColor.g}, ${DOT_CONFIG.inactiveColor.b})`

    return { width, opacity, backgroundColor }
  }, [dotProgress])

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
            transition: isDragging ? 'none' : `transform ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
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
                  alt={slide.title}
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

      {/* Pagination Dots - Animated with Progressive Sliding */}
      <div className="flex gap-2 md:gap-3 mb-6 md:mb-8 mt-4 md:mt-6 relative" role="tablist">
        {onboardingData.map((_, index) => {
          const { width, opacity, backgroundColor } = calculateDotStyles(index)

          return (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="h-2 md:h-3 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              style={{
                width: `${width}px`,
                backgroundColor,
                opacity,
                transition: isDragging ? 'none' : `all ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
              }}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full max-w-md text-white font-semibold text-base md:text-lg lg:text-xl py-4 md:py-5 lg:py-6 rounded-full shadow-lg transition-all duration-300 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300"
        style={{ backgroundColor: '#EC2578' }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#D91E6A'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#EC2578'}
        aria-label={isLastSlide ? "Start using the app" : "Go to next slide"}
      >
        {isLastSlide ? "Let's Start" : 'Next'}
      </button>
    </div>
  )
}

export default OnboardingScreen

