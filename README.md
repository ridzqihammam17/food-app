# 🍜 SPIN FOOD - Food Randomizer App

A mobile-first web application that helps you decide what to eat! Built with React, Vite, and Tailwind CSS.

## ✨ Features

- **Splash Screen**: Animated welcome screen with brand logo
- **Onboarding**: 3-screen introduction flow with smooth transitions
- **Card Carousel Animation**: Randomize food choices with a fun card carousel effect (NOT a spinning wheel)
- **Result Popup**: Beautiful popup showing your selected food
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Wave Separator**: Smooth organic curve between sections
- **Smooth Animations**: Scale, fade, bounce, and carousel animations
- **Brand Consistency**: Unified pink color (#EC2578) throughout

## 🍱 Food Options

1. Nasi Goreng
2. Rendang
3. Bakso
4. Gado-gado
5. Soto Ayam
6. Mie Ayam
7. Nasi Padang
8. Nasi Ayam Bakar

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Docker

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser

### Docker Development

Run with hot reload:
```bash
docker-compose --profile dev up food-app-dev
```

Access at http://localhost:3001

### Docker Production

Build and run production version:
```bash
docker-compose up food-app
```

Access at http://localhost:3000

## 🎨 Design

- **Primary Color**: Pink (#EC2578)
- **Hover Color**: Darker Pink (#D91E6A)
- **Style**: Clean, playful, modern
- **Responsive**: Mobile-first, scales to desktop
- **Font**: Inter
- **Wave Separator**: Smooth organic curve between sections

## 📱 Screens Flow

1. **Splash Screen** → Auto-transitions after 1 second
2. **Onboarding (3 screens)** → Navigate through introduction
3. **Main Roulette Screen** → Tap SPIN to randomize with carousel animation
4. **Result Popup** → Shows selected food, tap OK to return

## 📐 Responsive Design

### Mobile (< 768px)
- Compact layout
- Touch-optimized buttons
- Smaller cards and text

### Desktop (1024px+)
- Larger cards and imagery
- Generous spacing
- Hover effects
- Full-width layout (no rigid boxes)

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- Docker & Docker Compose
- Nginx (for production)

## 📝 Notes

- Currently all food items use `food_1.png` as placeholder
- You can add individual images for each food (see `CARA_GANTI_GAMBAR.md`)
- No backend or database required
- All randomization happens client-side

## 🖼️ Mengganti Gambar

Lihat panduan lengkap di **[CARA_GANTI_GAMBAR.md](./CARA_GANTI_GAMBAR.md)**

**Quick Guide:**
1. Tambahkan gambar ke folder `src/assets/foods/` (food_1.png, food_2.png, dst)
2. Update import di `src/components/RouletteScreen.jsx`
3. Rebuild Docker jika menggunakan production mode

**Struktur Assets:**
```
src/assets/
├── logo.png              # Logo splash screen
├── onboarding/           # Gambar onboarding (3 files)
└── foods/                # Gambar makanan (8 files)
```

## 📚 Documentation

- **[RESPONSIVE_DESIGN.md](./RESPONSIVE_DESIGN.md)** - Detailed responsive specifications
- **[CARA_GANTI_GAMBAR.md](./CARA_GANTI_GAMBAR.md)** - How to replace images
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference guide
- **[CHANGELOG.md](./CHANGELOG.md)** - Update history

## 🎯 Future Enhancements

- Add more food images
- Add food categories/filters
- Save favorite foods
- Share results on social media
- Add sound effects
- Haptic feedback for mobile

