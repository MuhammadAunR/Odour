const navOptions = [
    { option: 'Home', src: '/' },
    { option: 'Shop', src: '/shop' },
    { option: 'About', src: '/about' },
    { option: 'Contact', src: '/contact' },
]
export { navOptions }

const testimonials = [
    {
        id: 1,
        name: 'Sarah Al-Rashid',
        review: 'ODOUR has completely transformed how I think about fragrance. The Sauvage I ordered arrived beautifully packaged and the scent is absolutely divine. Will never shop anywhere else.',
        initials: 'SA'
    },
    {
        id: 2,
        name: 'Muhammad Bilal',
        review: 'Exceptional quality and lightning fast delivery. I was skeptical ordering perfume online but the descriptions are so accurate. My wife loves her gift. Highly recommend.',
        initials: 'MB'
    },
    {
        id: 3,
        name: 'Fatima Zahra',
        review: 'The curated collection here is unlike anything I have found locally. Rare fragrances at honest prices. The Black Opium is my signature scent now thanks to ODOUR.',
        initials: 'FZ'
    },
    {
        id: 4,
        name: 'James Thornton',
        review: 'As a fragrance enthusiast I am very particular. ODOUR exceeded every expectation — authentic products, elegant presentation and a team that clearly understands their craft.',
        initials: 'JT'
    },
    {
        id: 5,
        name: 'Ayesha Malik',
        review: 'I have been a loyal customer for months now. Every order feels like a luxury experience from start to finish. The seasonal collections keep me coming back every time.',
        initials: 'AM'
    },
]
export { testimonials }
const avatarColors = ['bg-stone-700', 'bg-green-800', 'bg-blue-800', 'bg-red-700', 'bg-amber-900']
export { avatarColors }

const stats = [
    { end: 500, suffix: '+', label: 'Fragrances' },
    { end: 50, suffix: '+', label: 'Brands' },
    { end: 1000, suffix: '+', label: 'Happy Clients' },
    { end: 100, suffix: '%', label: 'Authentic' },
]
export { stats }

const WhyChooseUsData = [
    {
        icon: '✦',
        title: '100% Authentic',
        description: 'Every fragrance is sourced directly from authorized distributors. No imitations, no compromises — only the genuine article.'
    },
    {
        icon: '◈',
        title: 'Luxury Packaging',
        description: 'Each order is wrapped with care and elegance. Unboxing an ODOUR delivery is an experience in itself.'
    },
    {
        icon: '◎',
        title: 'Expert Curation',
        description: 'Our collection is handpicked by fragrance connoisseurs. Only the finest, most distinguished scents make it to our shelves.'
    },
    {
        icon: '⬡',
        title: 'Fast Delivery',
        description: 'Swift and secure delivery across Pakistan. Your fragrance arrives safely and on time, every time.'
    },
    {
        icon: '◇',
        title: 'Easy Returns',
        description: 'Not satisfied? We offer a hassle-free return policy because your confidence in us matters more than the sale.'
    },
    {
        icon: '❋',
        title: 'Exclusive Collections',
        description: 'Discover rare and limited edition fragrances unavailable anywhere else in Pakistan. Curated for the discerning few.'
    },
]
export { WhyChooseUsData }

const stripeItems = ['100% Authentic', 'Luxury Packaging', 'Expert Curation', 'Fast Delivery', 'Easy Returns', 'Exclusive Collections']
export { stripeItems }

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export { containerVariants, itemVariants }

const processingSteps = [
    {
        step: "01",
        title: "Inspiration",
        description: "Every scent begins with a feeling — a memory, a place, an emotion we want to bottle forever."
    },
    {
        step: "02",
        title: "Formulation",
        description: "Our perfumer hand-selects raw ingredients, layering top, heart, and base notes into a cohesive story."
    },
    {
        step: "03",
        title: "Testing",
        description: "Each formula is worn, lived in, and refined over weeks until it feels like a second skin."
    },
    {
        step: "04",
        title: "Bottling",
        description: "The final scent is sealed in our signature bottle — minimal, elegant, made to last."
    }
]
export { processingSteps }

const fragranceFamilies = [
    { name: "Luxury Spice", image: "/luxury-extracted.webp" },
    { name: "Citrus Burst", image: "/citrus-extracted.webp" },
    { name: "Floral Essence", image: "/flower-extracted.webp" },
    { name: "Wooden Bark", image: "/wooden-extracted.webp" },
    { name: "Fresh Mint", image: "/mint-extracted.webp" },
];
export { fragranceFamilies }

const seasonConfig = {
    Summer: { label: 'Summer', color: 'text-amber-500', bg: 'bg-amber-400/10', icon: '☀' },
    Spring: { label: 'Spring', color: 'text-green-500', bg: 'bg-green-400/10', icon: '✿' },
    Fall: { label: 'Fall', color: 'text-orange-600', bg: 'bg-orange-500/10', icon: '🍂' },
    Winter: { label: 'Winter', color: 'text-blue-400', bg: 'bg-blue-300/10', icon: '❄' },
}
export { seasonConfig }

const sortOptions = [
    {
        value: "newest",
        label: "Newest",
        sortBy: "createdAt",
        sortOrder: "desc",
    },
    {
        value: "oldest",
        label: "Oldest",
        sortBy: "createdAt",
        sortOrder: "asc",
    },
    {
        value: "price-low",
        label: "Price: Low to High",
        sortBy: "price",
        sortOrder: "asc",
    },
    {
        value: "price-high",
        label: "Price: High to Low",
        sortBy: "price",
        sortOrder: "desc",
    },
    {
        value: "name-az",
        label: "Name: A to Z",
        sortBy: "name",
        sortOrder: "asc",
    },
    {
        value: "name-za",
        label: "Name: Z to A",
        sortBy: "name",
        sortOrder: "desc",
    },
];

export { sortOptions }