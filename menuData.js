import riceBowlImg from '../assets/Rice bowl.png'
import tacosImg from '../assets/tacos.png'
import saladImg from '../assets/salad.png'
import nachosImg from '../assets/Nachos.png'
import freshDrinksImg from '../assets/Fresh drinks.png'
import nuggetsImg from '../assets/Nuggets.png'
import chickpeaCrunchiesImg from '../assets/Chickpea Crunchies.png'
import crispyCrunchBallsImg from '../assets/Crispy Crunch Balls.png'
import avoGreekDelightImg from '../assets/Avo-Greek Delight.png'
import veggieSaladBitesImg from '../assets/Veggie Salad Bite.png'
import zingyFriesImg from '../assets/Zingy Fries.png'
import lemonGarlicShrimpImg from '../assets/Lemon Garlic Shrimps.png'
import grilledVegRiceBowlImg from '../assets/Grilled Veg Rice Bowl.png'
import herbRoastedChickenImg from '../assets/Herb Roasted Chicken.png'
import hellenicGreenWrapImg from '../assets/Hellenic Green Wrap.png'
import valenciaSeafoodBowlImg from '../assets/Valencia Seafood Bowl.png'
import blazeBiteTacoImg from '../assets/Blaze Bite Taco.png'
import sunKissedPastaImg from '../assets/Sun-Kissed Pasta.png'
import yogurtRushImg from '../assets/Yogurt Rush.png'
import greenTeaInfusionImg from '../assets/Green Tea Infusion.png'
import pomegranateSplashImg from '../assets/Pomegranate Splash.png'
import tropicalDelightImg from '../assets/Tropical Delight.png'
import classicCappuccinoImg from '../assets/Classic Cappuccino.png'
import pinkLimeSodaImg from '../assets/Pink Lime Soda.png'

export const menuCategories = [
  {
    id: 'starters',
    title: 'Starters',
    titleGold: 'Star',
    titleDark: 'ters',
    items: [
      {
        id: 1,
        name: 'Chickpea Crunchies',
        description: 'Crunchy, spiced chickpeas perfect for snacking',
        price: 150,
        serving: '(10 pcs)',
        image: chickpeaCrunchiesImg,
        veg: true,
        topSeller: true,
      },
      {
        id: 2,
        name: 'Crispy Crunch Balls',
        description: 'Crispy chickpea fritters served with tahini sauce',
        price: 200,
        serving: '(10 pcs)',
        image: crispyCrunchBallsImg,
        veg: true,
        topSeller: false,
      },
      {
        id: 3,
        name: 'Avo-Greek Delight',
        description: 'Creamy tzatziki with avocado served in mini cups',
        price: 169,
        image: avoGreekDelightImg,
        veg: true,
        topSeller: true,
      },
      {
        id: 4,
        name: 'Veggie Salad Bites',
        description: 'Mini skewers of feta, olive, tomato, and cucumber',
        price: 145,
        image: veggieSaladBitesImg,
        veg: true,
        topSeller: false,
      },
      {
        id: 5,
        name: 'Zingy Fries',
        description: 'Crispy fries tossed in Middle Eastern spices',
        price: 89,
        image: zingyFriesImg,
        veg: true,
        topSeller: true,
      },
      {
        id: 6,
        name: 'Lemon Garlic Shrimp',
        description: 'Juicy shrimp sauted with olive oil, garlic, and lemon',
        price: 399,
        image: lemonGarlicShrimpImg,
        veg: false,
        topSeller: false,
      },
    ],
  },
  {
    id: 'main-course',
    title: 'Main Course',
    titleGold: 'Main',
    titleDark: 'Course',
    items: [
      {
        id: 7,
        name: 'Grilled Veg Rice Bowl',
        description: 'A mix of roasted bell peppers, zucchini, and eggplant topped with feta and olive oil',
        price: 449,
        image: grilledVegRiceBowlImg,
        veg: true,
        topSeller: true,
      },
      {
        id: 8,
        name: 'Herb Roasted Chicken',
        description: 'Oven-roasted chicken marinated with herbs, served with mashed potatoes.',
        price: 329,
        image: herbRoastedChickenImg,
        veg: false,
        topSeller: true,
      },
      {
        id: 9,
        name: 'Hellenic Green Wrap',
        description: 'Soft flatbread rolled with sautéed spinach, feta, and creamy garlic sauce.',
        price: 149,
        image: hellenicGreenWrapImg,
        veg: true,
        topSeller: false,
      },
      {
        id: 10,
        name: 'Valencia Seafood Bowl',
        description: 'A rich, flavorful rice dish with shrimp, mussels, and herbs.',
        price: 449,
        image: valenciaSeafoodBowlImg,
        veg: false,
        topSeller: false,
      },
      {
        id: 11,
        name: 'Blaze Bite Taco',
        description: 'Smoky BBQ chicken with crispy lettuce and creamy ranch drizzle',
        price: 139,
        image: blazeBiteTacoImg,
        veg: false,
        topSeller: true,
      },
      {
        id: 12,
        name: 'Sun-Kissed Pasta',
        description: 'Sun-dried tomatoes, olives, feta, and basil in a light olive oil sauce',
        price: 139,
        image: sunKissedPastaImg,
        veg: true,
        topSeller: false,
      },
    ],
  },
  {
    id: 'beverages',
    title: 'Beverages',
    titleGold: 'Beverages',
    items: [
      {
        id: 13,
        name: 'Yogurt Rush',
        description: 'Thick, creamy yogurt blended with honey and seasonal fruits.',
        price: 99,
        image: yogurtRushImg,
        veg: true,
        topSeller: false,
      },
      {
        id: 14,
        name: 'Green Tea Infusion',
        description: 'Light and healthy with calming herbal notes',
        price: 46,
        image: greenTeaInfusionImg,
        veg: true,
        topSeller: true,
      },
      {
        id: 15,
        name: 'Pomegranate Splash',
        description: 'Sweet and tangy pomegranate juice served chilled with mint leaves',
        price: 178,
        image: pomegranateSplashImg,
        veg: true,
        topSeller: false,
      },
      {
        id: 16,
        name: 'Tropicool Delight',
        description: 'Pineapple, mango, and coconut fusion that feels like a beach.',
        price: 99,
        image: tropicalDelightImg,
        veg: true,
        topSeller: true,
      },
      {
        id: 17,
        name: 'Classic Cappuccino',
        description: 'Rich espresso topped with frothed milk and a dusting of cocoa',
        price: 129,
        image: classicCappuccinoImg,
        veg: true,
        topSeller: false,
      },
      {
        id: 18,
        name: 'Pink Lime Soda',
        description: 'Rose syrup mixed with lime and soda for a floral refreshment',
        price: 129,
        image: pinkLimeSodaImg,
        veg: true,
        topSeller: false,
      },
    ],
  },
]

export const serveCategories = [
  { name: 'Rice bowl', image: riceBowlImg },
  { name: 'Tacos', image: tacosImg },
  { name: 'Salad', image: saladImg },
  { name: 'Nachos', image: nachosImg },
  { name: 'Fresh drinks', image: freshDrinksImg },
  { name: 'Nuggets', image: nuggetsImg },
]

export const testimonials = [
  {
    id: 1,
    name: 'Steffy Sunny',
    text: 'Foodtruck never disappoints! The flavours are incredible and every dish feels freshly made. Their mobile kitchen brings restaurant-quality meals right to our doorstep. Highly recommended for anyone who loves great food on the go.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    id: 2,
    name: 'Rahul Menon',
    text: 'From ordering to delivery, everything was seamless. The Herb Roasted Chicken is my absolute favourite. Foodtruck has become our go-to for family gatherings and office lunches alike.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    text: 'Love the variety and freshness! The veggie options are amazing and the staff is always friendly. A true gem in Coimbatore for food lovers who want quality without compromise.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
]
