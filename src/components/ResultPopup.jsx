import React from 'react'
import partySticker from '../assets/party.png'

const ResultPopup = ({ food, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in px-4">
      <div
        className="rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 lg:p-16 mx-6 max-w-sm md:max-w-md lg:max-w-lg w-full shadow-2xl animate-bounce-in relative"
        style={{ backgroundColor: '#EC2578' }}
      >
        {/* Food Image */}
        <div className="flex justify-center mb-6 md:mb-8 relative">
          <img
            src={food.image}
            alt={food.name}
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover rounded-2xl md:rounded-3xl"
          />
          {/* Party Cat Sticker - Bottom Left Corner */}
          <img
            src={partySticker}
            alt="Party Cat"
            className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain animate-bounce-in z-10"
            style={{
              animationDelay: '0.2s',
              transform: 'rotate(-12deg)',
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
            }}
          />
        </div>

        {/* Title */}
        <p className="text-center text-white text-sm md:text-base lg:text-lg mb-2 md:mb-3">
          🍽️ Pilihan makanmu hari ini
        </p>

        {/* Food Name */}
        <h2 className="text-center text-3xl md:text-2xl lg:text-3xl font-bold text-white mb-8 md:mb-10 lg:mb-12">
          {food.name}
        </h2>

        {/* OK Button - White background with pink text */}
        <button
          onClick={onClose}
          className="w-full bg-white font-semibold text-base md:text-lg lg:text-xl py-4 md:py-5 lg:py-6 rounded-full shadow-lg transition-all duration-300 active:scale-95"
          style={{ color: '#EC2578' }}
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default ResultPopup

