// Enhanced data.js with more products and categories

const productsData = [
    // Electronics Category
    {
        id: 1,
        name: 'FlexiScreen Pro',
        category: 'electronics new-arrivals highly-rated',
        shortDescription: 'Self-healing screen protector for any device.',
        longDescription: 'The revolutionary self-healing screen protector that adapts to any device screen. Say goodbye to scratches and cracks with this durable, clear shield. Easy to apply and virtually invisible. Provides edge-to-edge protection and maintains touch sensitivity. Made with advanced nano-technology that repairs minor scratches automatically.',
        priceUSD: 115.99,
        images: [
            'https://m.media-amazon.com/images/I/715NWo6HDkL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/61afnkujeqL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/61Z15n4eP7L._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/4fhuo4k'
    },
    {
        id: 2,
        name: 'Quantum Leap Earbuds',
        category: 'electronics audio new-arrivals highly-rated',
        shortDescription: 'Premium wireless earbuds with noise cancellation.',
        longDescription: 'Experience audio like never before with the Quantum Leap Earbuds. Featuring advanced active noise cancellation, crystal-clear call quality, and a sleek ergonomic design. Enjoy up to 24-hour battery life with the charging case. Perfect for music lovers, professionals, and fitness enthusiasts.',
        priceUSD: 164.95,
        images: [
            'https://m.media-amazon.com/images/I/717VEJ7qTZL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/81n9TujDe3L._AC_SL1500_.jpg',
            'https://m.media-amazon.com/images/I/61k7YkwzhUL._AC_SL1500_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3Utu2Oi'
    },
    {
        id: 3,
        name: 'Smart Watch Pro Max',
        category: 'electronics wearable trending',
        shortDescription: 'Advanced fitness tracking with health monitoring.',
        longDescription: 'The ultimate smartwatch with comprehensive health monitoring, GPS tracking, and 7-day battery life. Features include heart rate monitoring, sleep tracking, blood oxygen measurement, and over 100 workout modes. Water-resistant up to 50 meters.',
        priceUSD: 125.99,
        images: [
            'https://m.media-amazon.com/images/I/711L1d8E28L._AC_SX679_.jpg',
            'https://m.media-amazon.com/images/I/71kowwg4DOL._AC_SL1500_.jpg',
            'https://m.media-amazon.com/images/I/71e2FDBEDuL._AC_SX679_.jpg'
        ],
        affiliateLink: 'https://amzn.to/4mcIIgu'
    },
    {
        id: 4,
        name: 'Wireless Charging Station',
        category: 'electronics accessories trending',
        shortDescription: '3-in-1 wireless charger for all devices.',
        longDescription: 'Charge your phone, earbuds, and smartwatch simultaneously with this sleek 3-in-1 wireless charging station. Features fast charging technology, LED indicators, and a compact design that fits perfectly on any desk or nightstand.',
        priceUSD: 79.99,
        images: [
            'https://m.media-amazon.com/images/I/61nqvRpRnnL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
            'https://m.media-amazon.com/images/I/61DjKwluHlL._AC_SL1500_.jpg',
            'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://amzn.to/4mfe1Yi'
    },

    // Home & Living Category
    {
        id: 5,
        name: 'Aura Mood Lamp',
        category: 'home-living smart-home trending',
        shortDescription: 'AI-powered lamp adapts to your mood.',
        longDescription: 'An AI-powered smart lamp that senses your mood and adjusts its lighting to create the perfect ambiance. Syncs with music and smart home devices. Offers over 16 million colors and customizable light patterns for every occasion. Voice control compatible.',
        priceUSD: 79.99,
        images: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://auramoodlamp.example.com/buy'
    },
    {
        id: 6,
        name: 'Smart AeroGarden',
        category: 'home-living gardening trending highly-rated',
        shortDescription: 'Grow fresh herbs indoors, effortlessly.',
        longDescription: 'Grow fresh herbs, vegetables, and flowers indoors year-round with the Smart AeroGarden. This hydroponic system features automated LED grow lights and a watering system, making indoor gardening effortless and fun for everyone. Includes seed pods and nutrients.',
        priceUSD: 149.99,
        images: [
            'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://aerogarden.example.com/buy'
    },
    {
        id: 7,
        name: 'Air Purifier Pro',
        category: 'home-living health new-arrivals',
        shortDescription: 'HEPA filtration with smart air quality monitoring.',
        longDescription: 'Advanced air purifier with True HEPA filter that removes 99.97% of airborne particles. Features real-time air quality monitoring, auto-adjustment, and smartphone app control. Perfect for allergies and creating a healthier home environment.',
        priceUSD: 199.99,
        images: [
            'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://airpurifierpro.example.com/buy'
    },

    // Health & Fitness Category
    {
        id: 8,
        name: 'EcoFlow Smart Bottle',
        category: 'health-fitness hydration new-arrivals',
        shortDescription: 'Tracks hydration, purifies water.',
        longDescription: 'Stay hydrated and healthy with the EcoFlow Smart Bottle. It tracks your water intake, reminds you to drink, and even purifies water on the go using UV-C light. Made from durable, eco-friendly materials with temperature control.',
        priceUSD: 49.99,
        images: [
            'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://ecoflow.example.com/buy'
    },
    {
        id: 9,
        name: 'Yoga Mat Smart',
        category: 'health-fitness yoga trending',
        shortDescription: 'Interactive yoga mat with pose guidance.',
        longDescription: 'Revolutionary yoga mat with built-in sensors that provide real-time feedback on your poses. Connects to a mobile app for guided sessions, progress tracking, and personalized recommendations. Made from eco-friendly, non-slip materials.',
        priceUSD: 159.99,
        images: [
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1506629905607-d405b3d2d5b4?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://yogamatsmart.example.com/buy'
    },

    // Travel & Outdoor Category
    {
        id: 10,
        name: 'SolarCharge Backpack',
        category: 'travel-outdoor solar new-arrivals',
        shortDescription: 'Charge devices on the go with solar power.',
        longDescription: 'Never run out of battery again! This stylish backpack features an integrated high-efficiency solar panel that charges your devices as you move. It\'s durable, water-resistant, and spacious enough for all your daily essentials. Perfect for hiking and travel.',
        priceUSD: 89.99,
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://solarcharge.example.com/buy'
    },
    {
        id: 11,
        name: 'Portable Espresso Maker',
        category: 'travel-outdoor coffee trending',
        shortDescription: 'Barista-quality coffee anywhere, anytime.',
        longDescription: 'Enjoy perfect espresso wherever you go with this compact, battery-powered espresso maker. Features 15-bar pressure pump, temperature control, and works with ground coffee or pods. Includes travel case and rechargeable battery.',
        priceUSD: 199.99,
        images: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://portableespresso.example.com/buy'
    },

    // Pet Care Category
    {
        id: 12,
        name: 'PetPal Companion',
        category: 'pet-care interactive highly-rated trending',
        shortDescription: 'Interactive robot for pet entertainment.',
        longDescription: 'A robotic companion designed to keep your pets entertained and active while you\'re away. Features include a remote-controlled treat dispenser, a laser pointer, two-way audio to interact with your furry friends, and automatic play modes.',
        priceUSD: 199.99,
        images: [
            'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://petpal.example.com/buy'
    },
    {
        id: 13,
        name: 'Smart Pet Feeder',
        category: 'pet-care smart-home new-arrivals',
        shortDescription: 'Automated feeding with portion control.',
        longDescription: 'Keep your pets well-fed with scheduled, portion-controlled meals. Features smartphone app control, voice recording for meal calls, and fresh food preservation. Perfect for busy pet owners who want to maintain their pet\'s feeding routine.',
        priceUSD: 129.99,
        images: [
            'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://smartpetfeeder.example.com/buy'
    },

    // Gaming & Entertainment Category
    {
        id: 14,
        name: 'VR Headset Lite',
        category: 'gaming-entertainment vr new-arrivals',
        shortDescription: 'Affordable VR experience for everyone.',
        longDescription: 'Enter the world of virtual reality with this affordable, lightweight VR headset. Compatible with smartphones and includes a wireless controller. Perfect for gaming, virtual travel, and educational experiences. Comfortable fit for extended use.',
        priceUSD: 149.99,
        images: [
            'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://vrheadsetlite.example.com/buy'
    },
    {
        id: 15,
        name: 'Retro Gaming Console',
        category: 'gaming-entertainment retro trending highly-rated',
        shortDescription: 'Classic games in a modern package.',
        longDescription: 'Relive your childhood with this retro gaming console featuring 500+ classic games. Includes two wireless controllers, HDMI output, and save state functionality. Perfect for family game nights and nostalgic gaming sessions.',
        priceUSD: 89.99,
        images: [
            'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop'
        ],
        affiliateLink: 'https://retrogaming.example.com/buy'
    }
];

// Product categories for filtering
const productCategories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'home-living', name: 'Home & Living', icon: '🏠' },
    { id: 'health-fitness', name: 'Health & Fitness', icon: '💪' },
    { id: 'travel-outdoor', name: 'Travel & Outdoor', icon: '🎒' },
    { id: 'pet-care', name: 'Pet Care', icon: '🐕' },
    { id: 'gaming-entertainment', name: 'Gaming & Entertainment', icon: '🎮' },
    { id: 'new-arrivals', name: 'New Arrivals', icon: '✨' },
    { id: 'trending', name: 'Trending', icon: '🔥' },
    { id: 'highly-rated', name: 'Highly Rated', icon: '⭐' }
];

// Exchange rate (as of July 26, 2025) - Please update this rate regularly!
const USD_TO_INR_RATE = 83.50;

