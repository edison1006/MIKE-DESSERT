export const shopDetails = {
  name: 'Mika Dessert',
  tagline: 'Small-batch cakes & confections crafted in Taipei',
  hours: 'Tue – Sun · 10:00 – 20:00',
  pickup: 'Same-day pickup · 2-hour notice for whole cakes',
  address: 'No. 88, Section 3, Minsheng E. Rd, Taipei',
  phone: '+886 2 3456 7788',
  email: 'hello@mikadessert.com',
};

export const products = [
  {
    name: 'Strawberry Matcha Mont Blanc',
    description:
      'Layers of Strawberry, Mascarpone Cream, Vanilla Sponge, Matcha Gelato & Matcha and Chestnut Mont Blanc Topping.',
    price: 'NT$320',
    tags: ['signature', 'seasonal', 'best seller'],
    accent: '#4caf50',
    category: 'Individual',
  },
  {
    name: 'Earl Grey Cloud Cake',
    description:
      'Whipped Bergamot Chantilly, Vanilla Chiffon Layers, Lemon Confit Pearls, and Earl Grey Infused Cream.',
    price: 'NT$980 · 6"',
    tags: ['signature', 'light cream', 'contains gluten'],
    accent: '#d7c6b6',
    category: 'Cakes',
  },
  {
    name: 'Matcha Velvet Bar',
    description:
      'Ceremonial Uji Matcha Mousse, Almond Biscuit Base, Yuzu Gelée Core, and Matcha Powder Dusting.',
    price: 'NT$180 / slice',
    tags: ['best seller', 'gluten free', 'citrus'],
    accent: '#cfd8c0',
    category: 'Individual',
  },
  {
    name: 'Valrhona Noir Tart',
    description:
      '70% Guanaja Dark Chocolate Ganache, Smoked Salt Caramel, Cacao Nib Crunch, and Chocolate Tart Shell.',
    price: 'NT$220 / slice',
    tags: ['rich', 'dark chocolate'],
    accent: '#bda79b',
    category: 'Tarts',
  },
  {
    name: 'Rose Lychee Entremet',
    description:
      'Lychee Compote, Raspberry Crémeux, Rose Diplomat Cream, Glossy Mirror Glaze, and Vanilla Sponge Base.',
    price: 'NT$1,180 · 6"',
    tags: ['limited', 'floral', 'fruit forward'],
    accent: '#f1d6d0',
    category: 'Cakes',
  },
  {
    name: 'Kinako Honey Financier',
    description:
      'Brown Butter Almond Cakes, Mountain Honey Glaze, Kinako Sugar Coating, and Toasted Sesame Seeds.',
    price: 'NT$360 · box of 6',
    tags: ['pastry box', 'nutty', 'snacking'],
    accent: '#e6cfae',
    category: 'Pastries',
  },
  {
    name: 'Coconut Mango Verrine',
    description:
      'Layers of Coconut Diplomat, Mango Passion Fruit Curd, Crispy Sable Crumbs, and Fresh Mango Cubes.',
    price: 'NT$200 / cup',
    tags: ['tropical', 'chilled'],
    accent: '#f3dda9',
    category: 'Individual',
  },
  {
    name: 'Toasted Sesame Paris-Brest',
    description:
      'Sesame Praline Mousseline, Cassis Gelée, Caramelized Pâte à Choux Crown, and Toasted Sesame Seeds.',
    price: 'NT$320',
    tags: ['seasonal', 'textural'],
    accent: '#d9c2a9',
    category: 'Individual',
  },
  {
    name: 'Black Sugar Basque',
    description:
      'Silky Cheesecake, Okinawan Black Sugar Caramelization, Vanilla Bean Infusion, and Graham Cracker Crust.',
    price: 'NT$1,080 · 6"',
    tags: ['comfort', 'caramelized'],
    accent: '#c7a693',
    category: 'Cakes',
  },
];

export const experiences = [
  {
    quote:
      '“Every cake is composed like a poem: three textures, two temperatures, one lingering note.”',
    author: 'Chef Mika · Creative Director',
  },
  {
    quote:
      'We fold Taiwanese terroir into French technique, sourcing single-origin dairy, heritage eggs, and thoughtfully milled flours.',
    author: 'Chia-Wei · Sourcing Lead',
  },
  {
    quote:
      'Private tastings available for celebrations of 20 guests or fewer. Bespoke menus require a 7-day lead time.',
    author: 'Anya · Guest Concierge',
  },
];

export const highlights = [
  { title: 'Hours & Pickup', lines: [shopDetails.hours, shopDetails.pickup] },
  { title: 'Visit Us', lines: [shopDetails.address] },
  { title: 'Concierge', lines: [shopDetails.phone, shopDetails.email] },
];
