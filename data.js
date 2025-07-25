// data.js

const heroSlides = [
    {
        id: 'hero1',
        imageUrl: 'https://m.media-amazon.com/images/I/51Yi2aZ218L._AC_SL1000_.jpg',
        title: 'Unleash Your Potential',
        description: 'Discover the latest laptops for work, creativity, and gaming.',
        link: 'https://amzn.to/3TZ6tN9', // Will be handled by JS to show specific category or product
        linkText: 'Shop Laptops'
    },
    {
        id: 'hero2',
        imageUrl: 'https://m.media-amazon.com/images/I/71GHkbNQdDL._AC_SL1500_.jpg',
        title: 'Capture Every Moment',
        description: 'Explore our range of powerful smartphones with cutting-edge cameras.',
        link: 'https://amzn.to/4fbAByC',
        linkText: 'Shop Smart Phones'
    },
    {
        id: 'hero3',
        imageUrl: 'https://m.media-amazon.com/images/I/71o3sNsP+oL._AC_SL1500_.jpg',
        title: 'Game On, Anywhere',
        description: 'Elevate your gaming experience with our top-tier gaming accessories.',
        link: 'https://amzn.to/45ja134',
        linkText: 'Explore Gaming'
    }
];

const products = [
    {
        id: 'prod101',
        name: 'Dell XPS 15 Laptop',
        description: 'Experience stunning visuals and powerful performance with the Dell XPS 15. Featuring an Intel Core i7 processor, 16GB RAM, and a 512GB SSD. Ideal for professionals and creatives.',
        price: '₹1,20,000',
        originalPrice: '₹1,35,000',
        imageUrl: 'images/product-laptop-1.jpg',
        category: 'laptops',
        availability: 'Global', // Global for laptops, smartphones etc.
        specifications: {
            Processor: 'Intel Core i7-12700H',
            RAM: '16GB DDR4',
            Storage: '512GB NVMe SSD',
            Display: '15.6" FHD+ (1920x1200) InfinityEdge',
            GPU: 'NVIDIA GeForce RTX 3050',
            OS: 'Windows 11 Home',
            Battery: '86WHr'
        },
        relatedProducts: ['prod102', 'prod103', 'prod201']
    },
    {
        id: 'prod102',
        name: 'HP Spectre x360 14',
        description: 'A versatile 2-in-1 laptop with a premium design and stunning OLED display. Perfect for productivity and entertainment. Intel Core i7, 16GB RAM, 1TB SSD.',
        price: '₹1,10,000',
        originalPrice: '₹1,25,000',
        imageUrl: 'images/product-laptop-2.jpg',
        category: 'laptops',
        availability: 'Global',
        specifications: {
            Processor: 'Intel Core i7-1165G7',
            RAM: '16GB LPDDR4x',
            Storage: '1TB PCIe NVMe SSD',
            Display: '13.5" OLED (3K2K)',
            GPU: 'Intel Iris Xe Graphics',
            OS: 'Windows 11 Home',
            Battery: '66WHr'
        },
        relatedProducts: ['prod101', 'prod103', 'prod202']
    },
    {
        id: 'prod103',
        name: 'Apple MacBook Air M2',
        description: 'The redesigned MacBook Air with the M2 chip delivers incredible performance and all-day battery life. Super thin and light, perfect for on-the-go productivity.',
        price: '₹95,000',
        originalPrice: '₹1,05,000',
        imageUrl: 'images/product-laptop-3.jpg',
        category: 'laptops',
        availability: 'Global',
        specifications: {
            Processor: 'Apple M2 chip',
            RAM: '8GB Unified Memory',
            Storage: '256GB SSD',
            Display: '13.6" Liquid Retina',
            GPU: '8-core GPU',
            OS: 'macOS',
            Battery: '18 hours'
        },
        relatedProducts: ['prod203', 'prod301', 'prod302']
    },
    {
        id: 'prod201',
        name: 'iPhone 15 Pro Max',
        description: 'The latest flagship iPhone with the A17 Bionic chip, pro camera system, and a stunning Super Retina XDR display. Experience next-level mobile photography and gaming.',
        price: '₹1,40,000',
        originalPrice: '₹1,50,000',
        imageUrl: 'images/product-smartphone-1.jpg',
        category: 'smartphones',
        availability: 'Global',
        specifications: {
            Processor: 'A17 Bionic chip',
            Display: '6.7-inch Super Retina XDR with ProMotion',
            Camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
            Storage: '256GB',
            Battery: 'Up to 29 hours video playback',
            OS: 'iOS'
        },
        relatedProducts: ['prod202', 'prod203', 'prod303']
    },
    {
        id: 'prod202',
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Unleash epic with Galaxy AI. The S24 Ultra features a powerful Snapdragon processor, stunning display, and advanced camera capabilities.',
        price: '₹1,30,000',
        originalPrice: '₹1,45,000',
        imageUrl: 'images/product-smartphone-2.jpg',
        category: 'smartphones',
        availability: 'Global',
        specifications: {
            Processor: 'Snapdragon 8 Gen 3 for Galaxy',
            Display: '6.8-inch Dynamic AMOLED 2X',
            Camera: '200MP Wide, 12MP Ultra-wide, 10MP Telephoto',
            Storage: '256GB',
            Battery: '5000 mAh',
            OS: 'Android'
        },
        relatedProducts: ['prod201', 'prod203', 'prod304']
    },
    {
        id: 'prod203',
        name: 'Google Pixel 8 Pro',
        description: 'The Pixel 8 Pro with Google Tensor G3 is built for AI, bringing you smarter features for photos, videos, and daily tasks. Stunning display and incredible camera.',
        price: '₹90,000',
        originalPrice: '₹1,00,000',
        imageUrl: 'images/product-smartphone-3.jpg',
        category: 'smartphones',
        availability: 'Global',
        specifications: {
            Processor: 'Google Tensor G3',
            Display: '6.7-inch Super Actua display',
            Camera: '50MP Wide, 48MP Ultrawide, 48MP Telephoto',
            Storage: '128GB',
            Battery: '5050 mAh',
            OS: 'Android'
        },
        relatedProducts: ['prod201', 'prod202', 'prod305']
    },
    {
        id: 'prod301',
        name: 'Logitech MX Master 3S Mouse',
        description: 'The ultimate performance mouse. Work with precision and speed across multiple devices. Silent clicks and an 8000 DPI sensor.',
        price: '₹8,500',
        originalPrice: '₹9,500',
        imageUrl: 'images/product-accessory-1.jpg',
        category: 'accessories',
        availability: 'Global',
        specifications: {
            Connectivity: 'Bluetooth, Logi Bolt USB Receiver',
            Sensor: '8000 DPI Darkfield',
            Buttons: '7 programmable buttons',
            Battery: '70 days on full charge',
            Compatibility: 'Windows, macOS, Linux, Chrome OS, iPadOS'
        },
        relatedProducts: ['prod101', 'prod102', 'prod302']
    },
    {
        id: 'prod302',
        name: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise canceling headphones with crystal-clear call quality. Experience immersive sound and supreme comfort.',
        price: '₹26,000',
        originalPrice: '₹30,000',
        imageUrl: 'images/product-audio-1.jpg',
        category: 'audio',
        availability: 'Global',
        specifications: {
            NoiseCancellation: 'Yes (Dual Noise Sensor Technology)',
            BatteryLife: 'Up to 30 hours',
            Connectivity: 'Bluetooth 5.2',
            Weight: '250g',
            Features: 'Speak-to-Chat, DSEE Extreme'
        },
        relatedProducts: ['prod201', 'prod202', 'prod301']
    },
    {
        id: 'prod303',
        name: 'Razer BlackWidow V4 Pro',
        description: 'A full-featured gaming keyboard with Razer Chroma RGB, customizable macro keys, and responsive mechanical switches. Dominate your opponents.',
        price: '₹18,000',
        originalPrice: '₹20,000',
        imageUrl: 'images/product-gaming-1.jpg',
        category: 'gaming',
        availability: 'Global',
        specifications: {
            Switches: 'Razer Green Mechanical (Clicky)',
            Lighting: 'Razer Chroma RGB',
            Keycaps: 'Doubleshot ABS',
            Connectivity: 'Wired (USB-C)',
            Features: 'Media Keys, Macro Keys, Wrist Rest'
        },
        relatedProducts: ['prod401', 'prod402', 'prod304']
    },
    {
        id: 'prod304',
        name: 'Samsung T7 Shield Portable SSD 1TB',
        description: 'Rugged and super-fast portable SSD. With IP65 rating for dust and water resistance, it’s built for the outdoors. Transfer large files in seconds.',
        price: '₹10,000',
        originalPrice: '₹12,000',
        imageUrl: 'images/product-accessory-2.jpg',
        category: 'accessories',
        availability: 'Global',
        specifications: {
            Capacity: '1TB',
            Interface: 'USB 3.2 Gen 2 (10Gbps)',
            ReadSpeed: 'Up to 1,050 MB/s',
            WriteSpeed: 'Up to 1,000 MB/s',
            Durability: 'IP65 Water/Dust Resistant, 3-meter drop resistant',
            Compatibility: 'PC, Mac, Android, Gaming Consoles'
        },
        relatedProducts: ['prod101', 'prod102', 'prod201']
    },
    {
        id: 'prod305',
        name: 'JBL Flip 6 Portable Speaker',
        description: 'Bold sound for every adventure. The JBL Flip 6 delivers powerful JBL Original Pro Sound with exceptional clarity. IP67 waterproof and dustproof.',
        price: '₹9,000',
        originalPrice: '₹10,000',
        imageUrl: 'images/product-audio-2.jpg',
        category: 'audio',
        availability: 'Global',
        specifications: {
            Connectivity: 'Bluetooth 5.1',
            BatteryLife: 'Up to 12 hours',
            WaterResistance: 'IP67',
            PowerOutput: '30W RMS',
            Features: 'PartyBoost, USB-C Charging'
        },
        relatedProducts: ['prod202', 'prod203', 'prod302']
    },
    {
        id: 'prod401',
        name: 'Logitech G PRO X SUPERLIGHT Mouse',
        description: 'Our lightest PRO mouse ever. Engineered with the pros, it weighs less than 63 grams for ultra-fast, responsive gaming.',
        price: '₹12,500',
        originalPrice: '₹14,000',
        imageUrl: 'images/product-gaming-2.jpg',
        category: 'gaming',
        availability: 'Global',
        specifications: {
            Weight: 'Less than 63g',
            Sensor: 'HERO 25K',
            Connectivity: 'LIGHTSPEED Wireless',
            BatteryLife: 'Up to 70 hours',
            Buttons: '5 programmable'
        },
        relatedProducts: ['prod303', 'prod402', 'prod103']
    },
    {
        id: 'prod402',
        name: 'HyperX QuadCast S Microphone',
        description: 'A superb USB condenser microphone with stunning RGB lighting and four polar patterns. Perfect for streaming, gaming, and podcasting.',
        price: '₹14,000',
        originalPrice: '₹16,000',
        imageUrl: 'images/product-gaming-3.jpg',
        category: 'gaming',
        availability: 'Global',
        specifications: {
            PolarPatterns: 'Stereo, Omnidirectional, Cardioid, Bidirectional',
            Lighting: 'Dynamic RGB',
            Features: 'Anti-Vibration Shock Mount, Pop Filter, Gain Control',
            Connectivity: 'USB-C'
        },
        relatedProducts: ['prod303', 'prod401', 'prod305']
    },
    {
        id: 'prod501',
        name: 'Bose QuietComfort Earbuds II',
        description: 'Breakthrough noise cancellation and custom-tuned sound. These earbuds intelligently personalizes the sound and silence to your ears.',
        price: '₹24,000',
        originalPrice: '₹26,000',
        imageUrl: 'images/product-audio-3.jpg',
        category: 'audio',
        availability: 'Global',
        specifications: {
            NoiseCancellation: 'World-class (CustomTune technology)',
            BatteryLife: 'Up to 6 hours (earbuds) + 24 hours (case)',
            Connectivity: 'Bluetooth 5.3',
            Features: 'Aware Mode, CustomFit',
            WaterResistance: 'IPX4'
        },
        relatedProducts: ['prod302', 'prod305', 'prod203']
    }
    // Add more products for different categories (accessories, etc.)
];
