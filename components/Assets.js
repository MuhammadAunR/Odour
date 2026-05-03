const navOptions = [
    { option: 'Home', src: '/' },
    { option: 'Shop', src: '/shop' },
    { option: 'About', src: '/about' },
    { option: 'Contact', src: '/contact' },
]

export { navOptions }

const heroSectionSlideData = [
    {
        imgSrc: '/heroSection-1.webp',
        alt: 'Hero Section Image 1',
        title: 'Blanc Musk',
        desc: 'A delicate blend of clean skin accords and warm white musk that settles softly into the senses. Minimal yet deeply intimate, Blanc Musk feels effortless, airy, and timeless — the kind of scent that lingers quietly in memory long after you leave the room.',
    },
    {
        imgSrc: '/heroSection-2.webp',
        alt: 'Hero Section Image 2',
        title: 'Gris Santal',
        desc: 'Smooth sandalwood layered with smoky grey vetiver creates a scent that feels grounded, calm, and quietly powerful. Gris Santal carries an understated elegance, balancing warmth and depth with a refined earthy character made for moments of still confidence.',
    },
    {
        imgSrc: '/heroSection-3.webp',
        alt: 'Hero Section Image 3',
        title: 'Peau Douce',
        desc: 'Soft cashmere notes wrapped in velvety musk create a fragrance that feels like a second skin. Peau Douce is comforting, warm, and deeply personal — subtle enough for everyday wear yet memorable enough to leave a lasting emotional impression.',
    },
    {
        imgSrc: '/heroSection-4.webp',
        alt: 'Hero Section Image 4',
        title: 'Lumière Noire',
        desc: 'Bright bergamot opens into the mysterious richness of oud, creating a contrast between light and shadow that feels hypnotic and cinematic. Lumière Noire transforms throughout the day, revealing smoky, resinous layers that evoke late evenings and quiet luxury.',
    },
    {
        imgSrc: '/heroSection-5.webp',
        alt: 'Hero Section Image 5',
        title: 'Eau Sauvage',
        desc: 'Fresh citrus bursts over rugged woods and aromatic herbs, capturing the feeling of cool wind moving through untouched landscapes. Eau Sauvage is vibrant, adventurous, and energizing — a scent inspired by freedom, open skies, and raw natural beauty.',
    },
]

export { heroSectionSlideData }

const products = [
    { id: 1,  imgSrc: '/perfume-001.webp', alt: 'Sauvage by Dior',                name: 'Sauvage',           brand: 'Dior',               category: 'Men',    size: '100ml', price: 15000, discountedPrice: 12500, isOnSale: true  },
    { id: 2,  imgSrc: '/perfume-002.webp', alt: 'Bleu de Chanel',                 name: 'Bleu de Chanel',    brand: 'Chanel',             category: 'Men',    size: '100ml', price: 18000, discountedPrice: null,  isOnSale: false },
    { id: 3,  imgSrc: '/perfume-003.webp', alt: 'Black Opium by YSL',             name: 'Black Opium',       brand: 'Yves Saint Laurent', category: 'Women',  size: '90ml',  price: 14000, discountedPrice: 9500,  isOnSale: true  },
    { id: 4,  imgSrc: '/perfume-004.webp', alt: 'La Vie Est Belle by Lancôme',    name: 'La Vie Est Belle',  brand: 'Lancôme',            category: 'Women',  size: '75ml',  price: 13500, discountedPrice: 11000, isOnSale: true  },
    { id: 5,  imgSrc: '/perfume-005.webp', alt: 'Acqua di Gio by Giorgio Armani', name: 'Acqua di Giò',      brand: 'Giorgio Armani',     category: 'Men',    size: '100ml', price: 13000, discountedPrice: null,  isOnSale: false },
    { id: 6,  imgSrc: '/perfume-006.webp', alt: 'Chance Eau Tendre by Chanel',    name: 'Chance Eau Tendre', brand: 'Chanel',             category: 'Women',  size: '50ml',  price: 16000, discountedPrice: 8500,  isOnSale: true  },
    { id: 7,  imgSrc: '/perfume-007.webp', alt: 'Oud Wood by Tom Ford',           name: 'Oud Wood',          brand: 'Tom Ford',           category: 'Unisex', size: '50ml',  price: 32000, discountedPrice: null,  isOnSale: false },
    { id: 8,  imgSrc: '/perfume-008.webp', alt: 'Flowerbomb by Viktor & Rolf',    name: 'Flowerbomb',        brand: 'Viktor & Rolf',      category: 'Women',  size: '50ml',  price: 12000, discountedPrice: 7800,  isOnSale: true  },
    { id: 9,  imgSrc: '/perfume-009.webp', alt: 'Aventus by Creed',               name: 'Aventus',           brand: 'Creed',              category: 'Men',    size: '100ml', price: 45000, discountedPrice: null,  isOnSale: false },
    { id: 10, imgSrc: '/perfume-010.webp', alt: 'Libre by YSL',                   name: 'Libre',             brand: 'Yves Saint Laurent', category: 'Women',  size: '90ml',  price: 14500, discountedPrice: 10500, isOnSale: true  },
    { id: 11, imgSrc: '/perfume-011.webp', alt: 'Invictus by Paco Rabanne',       name: 'Invictus',          brand: 'Paco Rabanne',       category: 'Men',    size: '100ml', price: 12000, discountedPrice: 9500,  isOnSale: true  },
    { id: 12, imgSrc: '/perfume-012.webp', alt: 'Good Girl by Carolina Herrera',  name: 'Good Girl',         brand: 'Carolina Herrera',   category: 'Women',  size: '80ml',  price: 15000, discountedPrice: 12000, isOnSale: true  },
    { id: 13, imgSrc: '/perfume-013.webp', alt: '1 Million by Paco Rabanne',      name: '1 Million',         brand: 'Paco Rabanne',       category: 'Men',    size: '100ml', price: 14000, discountedPrice: null,  isOnSale: false },
    { id: 14, imgSrc: '/perfume-014.webp', alt: 'Daisy by Marc Jacobs',           name: 'Daisy',             brand: 'Marc Jacobs',        category: 'Women',  size: '75ml',  price: 11000, discountedPrice: 8500,  isOnSale: true  },
    { id: 15, imgSrc: '/perfume-015.webp', alt: "Terre d'Hermès",                 name: "Terre d'Hermès",    brand: 'Hermès',             category: 'Men',    size: '100ml', price: 17000, discountedPrice: null,  isOnSale: false },
    { id: 16, imgSrc: '/perfume-016.webp', alt: "J'adore by Dior",                name: "J'adore",           brand: 'Dior',               category: 'Women',  size: '90ml',  price: 15500, discountedPrice: 12500, isOnSale: true  },
    { id: 17, imgSrc: '/perfume-017.webp', alt: 'Eros by Versace',                name: 'Eros',              brand: 'Versace',            category: 'Men',    size: '100ml', price: 13000, discountedPrice: 10000, isOnSale: true  },
    { id: 18, imgSrc: '/perfume-018.webp', alt: 'Bright Crystal by Versace',      name: 'Bright Crystal',    brand: 'Versace',            category: 'Women',  size: '90ml',  price: 12000, discountedPrice: 9000,  isOnSale: true  },
    { id: 19, imgSrc: '/perfume-019.webp', alt: 'Spicebomb by Viktor & Rolf',     name: 'Spicebomb',         brand: 'Viktor & Rolf',      category: 'Men',    size: '90ml',  price: 15000, discountedPrice: null,  isOnSale: false },
    { id: 20, imgSrc: '/perfume-020.webp', alt: 'Alien by Mugler',                name: 'Alien',             brand: 'Mugler',             category: 'Women',  size: '60ml',  price: 14000, discountedPrice: 11000, isOnSale: true  },
    { id: 21, imgSrc: '/perfume-021.webp', alt: 'Hugo Boss Bottled',              name: 'Boss Bottled',      brand: 'Hugo Boss',          category: 'Men',    size: '100ml', price: 12000, discountedPrice: 9000,  isOnSale: true  },
    { id: 22, imgSrc: '/perfume-022.webp', alt: 'Miss Dior',                      name: 'Miss Dior',         brand: 'Dior',               category: 'Women',  size: '80ml',  price: 15000, discountedPrice: 12000, isOnSale: true  },
    { id: 23, imgSrc: '/perfume-023.webp', alt: 'Nautica Voyage',                 name: 'Voyage',            brand: 'Nautica',            category: 'Men',    size: '100ml', price: 7000,  discountedPrice: 5500,  isOnSale: true  },
    { id: 24, imgSrc: '/perfume-024.webp', alt: 'Si by Armani',                   name: 'Si',                brand: 'Giorgio Armani',     category: 'Women',  size: '100ml', price: 16000, discountedPrice: 13000, isOnSale: true  },
    { id: 25, imgSrc: '/perfume-025.webp', alt: 'Legend by Montblanc',            name: 'Legend',            brand: 'Montblanc',          category: 'Men',    size: '100ml', price: 11000, discountedPrice: null,  isOnSale: false },
    { id: 26, imgSrc: '/perfume-026.webp', alt: "Bombshell by Victoria's Secret", name: 'Bombshell',         brand: "Victoria's Secret",  category: 'Women',  size: '100ml', price: 10000, discountedPrice: 8000,  isOnSale: true  },
    { id: 27, imgSrc: '/perfume-027.webp', alt: 'Black XS by Paco Rabanne',       name: 'Black XS',          brand: 'Paco Rabanne',       category: 'Men',    size: '100ml', price: 12500, discountedPrice: null,  isOnSale: false },
    { id: 28, imgSrc: '/perfume-028.webp', alt: 'Coco Mademoiselle',              name: 'Coco Mademoiselle', brand: 'Chanel',             category: 'Women',  size: '100ml', price: 18000, discountedPrice: 15000, isOnSale: true  },
    { id: 29, imgSrc: '/perfume-029.webp', alt: 'Ultra Male by JPG',              name: 'Ultra Male',        brand: 'Jean Paul Gaultier', category: 'Men',    size: '75ml',  price: 14000, discountedPrice: 11000, isOnSale: true  },
    { id: 30, imgSrc: '/perfume-030.webp', alt: 'Scandal by JPG',                 name: 'Scandal',           brand: 'Jean Paul Gaultier', category: 'Women',  size: '80ml',  price: 14500, discountedPrice: 11500, isOnSale: true  },
    { id: 31, imgSrc: '/perfume-031.webp', alt: '212 VIP by Carolina Herrera',    name: '212 VIP',           brand: 'Carolina Herrera',   category: 'Unisex', size: '100ml', price: 16000, discountedPrice: 13500, isOnSale: true  },
];

export { products };