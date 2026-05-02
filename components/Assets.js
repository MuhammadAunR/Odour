import { tr } from "motion/react-client"

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
    { id: 1, imgSrc: '/perfume-001.webp', alt: 'Sauvage by Dior', name: 'Sauvage', brand: 'Dior', category: 'Men', size: '100ml', originalPrice: 15000, price: 12500, isOnSale: true, discountPercent: 17, discountAmount: 2500, finalPrice: 12500 },

    { id: 2, imgSrc: '/perfume-002.webp', alt: 'Bleu de Chanel', name: 'Bleu de Chanel', brand: 'Chanel', category: 'Men', size: '100ml', originalPrice: 18000, price: 18000, isOnSale: false, discountPercent: 0, discountAmount: 0, finalPrice: 18000 },

    { id: 3, imgSrc: '/perfume-003.webp', alt: 'Black Opium by YSL', name: 'Black Opium', brand: 'Yves Saint Laurent', category: 'Women', size: '90ml', originalPrice: 14000, price: 9500, isOnSale: true, discountPercent: 32, discountAmount: 4500, finalPrice: 9500 },

    { id: 4, imgSrc: '/perfume-004.webp', alt: 'La Vie Est Belle by Lancôme', name: 'La Vie Est Belle', brand: 'Lancôme', category: 'Women', size: '75ml', originalPrice: 13500, price: 11000, isOnSale: true, discountPercent: 19, discountAmount: 2500, finalPrice: 11000 },

    { id: 5, imgSrc: '/perfume-005.webp', alt: 'Acqua di Gio by Giorgio Armani', name: 'Acqua di Giò', brand: 'Giorgio Armani', category: 'Men', size: '100ml', originalPrice: 13000, price: 13000, isOnSale: false, discountPercent: 0, discountAmount: 0, finalPrice: 13000 },

    { id: 6, imgSrc: '/perfume-006.webp', alt: 'Chance Eau Tendre by Chanel', name: 'Chance Eau Tendre', brand: 'Chanel', category: 'Women', size: '50ml', originalPrice: 16000, price: 8500, isOnSale: true, discountPercent: 47, discountAmount: 7500, finalPrice: 8500 },

    { id: 7, imgSrc: '/perfume-007.webp', alt: 'Oud Wood by Tom Ford', name: 'Oud Wood', brand: 'Tom Ford', category: 'Unisex', size: '50ml', originalPrice: 32000, price: 32000, isOnSale: false, discountPercent: 0, discountAmount: 0, finalPrice: 32000 },

    { id: 8, imgSrc: '/perfume-008.webp', alt: 'Flowerbomb by Viktor & Rolf', name: 'Flowerbomb', brand: 'Viktor & Rolf', category: 'Women', size: '50ml', originalPrice: 12000, price: 7800, isOnSale: true, discountPercent: 35, discountAmount: 4200, finalPrice: 7800 },

    { id: 9, imgSrc: '/perfume-009.webp', alt: 'Aventus by Creed', name: 'Aventus', brand: 'Creed', category: 'Men', size: '100ml', originalPrice: 45000, price: 45000, isOnSale: false, discountPercent: 0, discountAmount: 0, finalPrice: 45000 },

    { id: 10, imgSrc: '/perfume-010.webp', alt: 'Libre by YSL', name: 'Libre', brand: 'Yves Saint Laurent', category: 'Women', size: '90ml', originalPrice: 14500, price: 10500, isOnSale: true, discountPercent: 28, discountAmount: 4000, finalPrice: 10500 },

    { id: 11, imgSrc: '/perfume-011.webp', alt: 'Invictus by Paco Rabanne', name: 'Invictus', brand: 'Paco Rabanne', category: 'Men', size: '100ml', originalPrice: 12000, price: 9500, isOnSale: true, discountPercent: 21, discountAmount: 2500, finalPrice: 9500 },

    { id: 12, imgSrc: '/perfume-012.webp', alt: 'Good Girl by Carolina Herrera', name: 'Good Girl', brand: 'Carolina Herrera', category: 'Women', size: '80ml', originalPrice: 15000, price: 12000, isOnSale: true, discountPercent: 20, discountAmount: 3000, finalPrice: 12000 },

    { id: 13, imgSrc: '/perfume-013.webp', alt: '1 Million by Paco Rabanne', name: '1 Million', brand: 'Paco Rabanne', category: 'Men', size: '100ml', originalPrice: 14000, price: 14000, isOnSale: false, discountPercent: 0, discountAmount: 0, finalPrice: 14000 },

    { id: 14, imgSrc: '/perfume-014.webp', alt: 'Daisy by Marc Jacobs', name: 'Daisy', brand: 'Marc Jacobs', category: 'Women', size: '75ml', originalPrice: 11000, price: 8500, isOnSale: true, discountPercent: 23, discountAmount: 2500, finalPrice: 8500 },

    { id: 15, imgSrc: '/perfume-015.webp', alt: 'Terre d’Hermès', name: 'Terre d’Hermès', brand: 'Hermès', category: 'Men', size: '100ml', originalPrice: 17000, price: 17000, isOnSale: false, discountPercent: 0, discountAmount: 0, finalPrice: 17000 },

    { id: 16, imgSrc: '/perfume-016.webp', alt: 'J’adore by Dior', name: 'J’adore', brand: 'Dior', category: 'Women', size: '90ml', originalPrice: 15500, price: 12500, isOnSale: true, discountPercent: 19, discountAmount: 3000, finalPrice: 12500 },

    { id: 17, imgSrc: '/perfume-017.webp', alt: 'Eros by Versace', name: 'Eros', brand: 'Versace', category: 'Men', size: '100ml', originalPrice: 13000, price: 10000, isOnSale: true, discountPercent: 23, discountAmount: 3000, finalPrice: 10000 },

    { id: 18, imgSrc: '/perfume-018.webp', alt: 'Bright Crystal by Versace', name: 'Bright Crystal', brand: 'Versace', category: 'Women', size: '90ml', originalPrice: 12000, price: 9000, isOnSale: true, discountPercent: 25, discountAmount: 3000, finalPrice: 9000 },

    { id: 19, imgSrc: '/perfume-019.webp', alt: 'Spicebomb by Viktor & Rolf', name: 'Spicebomb', brand: 'Viktor & Rolf', category: 'Men', size: '90ml', originalPrice: 15000, price: 15000, isOnSale: false, discountPercent: 0, discountAmount: 0, finalPrice: 15000 },

    { id: 20, imgSrc: '/perfume-020.webp', alt: 'Alien by Mugler', name: 'Alien', brand: 'Mugler', category: 'Women', size: '60ml', originalPrice: 14000, price: 11000, isOnSale: true, discountPercent: 21, discountAmount: 3000, finalPrice: 11000 },

    { id: 21, imgSrc: '/perfume-021.webp', alt: 'Hugo Boss Bottled', name: 'Boss Bottled', brand: 'Hugo Boss', category: 'Men', size: '100ml', originalPrice: 12000, price: 9000, isOnSale: true, discountPercent: 25, discountAmount: 3000, finalPrice: 9000 },

    { id: 22, imgSrc: '/perfume-022.webp', alt: 'Miss Dior', name: 'Miss Dior', brand: 'Dior', category: 'Women', size: '80ml', originalPrice: 15000, price: 12000, isOnSale: true, discountPercent: 20, discountAmount: 3000, finalPrice: 12000 },

    { id: 23, imgSrc: '/perfume-023.webp', alt: 'Nautica Voyage', name: 'Voyage', brand: 'Nautica', category: 'Men', size: '100ml', originalPrice: 7000, price: 5500, isOnSale: true, discountPercent: 21, discountAmount: 1500, finalPrice: 5500 },

    { id: 24, imgSrc: '/perfume-024.webp', alt: 'Si by Armani', name: 'Si', brand: 'Giorgio Armani', category: 'Women', size: '100ml', originalPrice: 16000, price: 13000, isOnSale: true, discountPercent: 19, discountAmount: 3000, finalPrice: 13000 },

    { id: 25, imgSrc: '/perfume-025.webp', alt: 'Legend by Montblanc', name: 'Legend', brand: 'Montblanc', category: 'Men', size: '100ml', originalPrice: 11000, price: 11000, isOnSale: false, discountPercent: 0, discountAmount: 0, finalPrice: 11000 },

    { id: 26, imgSrc: '/perfume-026.webp', alt: 'Bombshell by Victoria’s Secret', name: 'Bombshell', brand: 'Victoria’s Secret', category: 'Women', size: '100ml', originalPrice: 10000, price: 8000, isOnSale: true, discountPercent: 20, discountAmount: 2000, finalPrice: 8000 },

    { id: 27, imgSrc: '/perfume-027.webp', alt: 'Black XS by Paco Rabanne', name: 'Black XS', brand: 'Paco Rabanne', category: 'Men', size: '100ml', originalPrice: 12500, price: 12500, isOnSale: false, discountPercent: 0, discountAmount: 0, finalPrice: 12500 },

    { id: 28, imgSrc: '/perfume-028.webp', alt: 'Coco Mademoiselle', name: 'Coco Mademoiselle', brand: 'Chanel', category: 'Women', size: '100ml', originalPrice: 18000, price: 15000, isOnSale: true, discountPercent: 17, discountAmount: 3000, finalPrice: 15000 },

    { id: 29, imgSrc: '/perfume-029.webp', alt: 'Ultra Male by Jean Paul Gaultier', name: 'Ultra Male', brand: 'Jean Paul Gaultier', category: 'Men', size: '75ml', originalPrice: 14000, price: 11000, isOnSale: true, discountPercent: 21, discountAmount: 3000, finalPrice: 11000 },

    { id: 30, imgSrc: '/perfume-030.webp', alt: 'Scandal by Jean Paul Gaultier', name: 'Scandal', brand: 'Jean Paul Gaultier', category: 'Women', size: '80ml', originalPrice: 14500, price: 11500, isOnSale: true, discountPercent: 21, discountAmount: 3000, finalPrice: 11500 },

    { id: 31, imgSrc: '/perfume-031.webp', alt: '212 VIP by Carolina Herrera', name: '212 VIP', brand: 'Carolina Herrera', category: 'Unisex', size: '100ml', originalPrice: 16000, price: 13500, isOnSale: true, discountPercent: 16, discountAmount: 2500, finalPrice: 13500 },
];

export { products };