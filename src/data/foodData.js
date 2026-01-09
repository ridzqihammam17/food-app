const foodImages = import.meta.glob('../assets/foods/*.{png,jpg,jpeg,webp}', { eager: true })

const getFoodImage = (filename) => {
  const path = `../assets/foods/${filename}`
  return foodImages[path]?.default || foodImages[path]
}

const foodData = [
  { id: 1, name: 'Nasi Goreng', imageFile: 'food_1.png' },
  { id: 2, name: 'Bakso', imageFile: 'food_2.png' },
  { id: 3, name: 'Gado-gado', imageFile: 'food_3.png' },
  { id: 4, name: 'Soto Ayam', imageFile: 'food_4.png' },
  { id: 5, name: 'Mie Ayam', imageFile: 'food_5.png' },
  { id: 6, name: 'Ayam Goreng', imageFile: 'food_6.png' },
  { id: 7, name: 'Iga Bakar', imageFile: 'food_7.png' },
]

export const foodList = foodData.map(food => ({
  ...food,
  image: getFoodImage(food.imageFile)
}))

export { foodData }

