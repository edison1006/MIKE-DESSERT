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
    name: 'Earl Grey Cloud Cake',
    description:
      'Whipped bergamot chantilly layered with chiffon and lemon confit pearls.',
    price: 'NT$980 · 6"',
    tags: ['signature', 'light cream', 'contains gluten'],
    accent: '#d7c6b6',
    category: 'Cakes',
  },
  {
    name: 'Matcha Velvet Bar',
    description:
      'Ceremonial Uji matcha mousse, almond biscuit base, yuzu gelée core.',
    price: 'NT$180 / slice',
    tags: ['best seller', 'gluten free', 'citrus'],
    accent: '#cfd8c0',
    category: 'Individual',
  },
  {
    name: 'Valrhona Noir Tart',
    description:
      '70% Guanaja ganache with smoked salt caramel and cacao nib crunch.',
    price: 'NT$220 / slice',
    tags: ['rich', 'dark chocolate'],
    accent: '#bda79b',
    category: 'Tarts',
  },
  {
    name: 'Rose Lychee Entremet',
    description:
      'Lychee compote, raspberry crémeux, rose diplomat cream in glossy glaze.',
    price: 'NT$1,180 · 6"',
    tags: ['limited', 'floral', 'fruit forward'],
    accent: '#f1d6d0',
    category: 'Cakes',
  },
  {
    name: 'Kinako Honey Financier',
    description:
      'Brown butter almond cakes brushed with mountain honey and kinako sugar.',
    price: 'NT$360 · box of 6',
    tags: ['pastry box', 'nutty', 'snacking'],
    accent: '#e6cfae',
    category: 'Pastries',
  },
  {
    name: 'Coconut Mango Verrine',
    description:
      'Layers of coconut diplomat, mango passion fruit curd, crispy sable.',
    price: 'NT$200 / cup',
    tags: ['tropical', 'chilled'],
    accent: '#f3dda9',
    category: 'Individual',
  },
  {
    name: 'Toasted Sesame Paris-Brest',
    description:
      'Sesame praline mousseline, cassis gelée, caramelized pâte à choux crown.',
    price: 'NT$320',
    tags: ['seasonal', 'textural'],
    accent: '#d9c2a9',
    category: 'Individual',
  },
  {
    name: 'Black Sugar Basque',
    description:
      'Silky cheesecake caramelized with Okinawan black sugar crust.',
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
