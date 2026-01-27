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
  { id: 8, name: 'Mie Goreng', imageFile: 'food_8.png' },
  { id: 9, name: 'Soto Daging', imageFile: 'food_9.png' },
  { id: 10, name: 'Ayam Geprek', imageFile: 'food_10.png' },
  { id: 11, name: 'Nasi Pecel', imageFile: 'food_11.png' },
  { id: 12, name: 'Nasi Uduk', imageFile: 'food_12.png' },
  { id: 13, name: 'Nasi Tutug Oncom', imageFile: 'food_13.png' },
  { id: 14, name: 'Korean Fried Chicken', imageFile: 'food_14.png' },
  { id: 15, name: 'Kwetiau Goreng', imageFile: 'food_15.png' },  
]

export const foodList = foodData.map(food => ({
  ...food,
  image: getFoodImage(food.imageFile)
}))

export { foodData }

