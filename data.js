
const productsData = [
    {
        id: 11,
        name: 'FoldMate Cutting Board',
        category: 'home-living kitchen-tools trending new-arrivals',
        shortDescription: 'Foldable chopping board with built-in strainer.',
        longDescription: 'This multi-functional foldable cutting board doubles as a colander. Easily chop, wash, and drain vegetables in one go. Folds flat for easy storage, making it ideal for small kitchens and travel.',
        priceUSD: 10.99,
        images: [
            'https://m.media-amazon.com/images/I/71kgVuVZX2L._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/71TfWk8p2yL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/71T3A+9iJZL._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3HFDf5u'
    },
    {
        id: 12,
        name: 'FlexiDrain Colander',
        category: 'home-living kitchen-tools highly-rated',
        shortDescription: 'Collapsible silicone colander with handles.',
        longDescription: 'Space-saving silicone colander perfect for rinsing fruits, veggies, and pasta. Collapses flat to fit drawers or hang easily. Heat-resistant and BPA-free — a must-have for modern kitchens.',
        priceUSD: 8.49,
        images: [
            'https://m.media-amazon.com/images/I/61QeIoCZxHL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/61wl7Z4wRxL._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3XEtMDF'
    },
    {
        id: 13,
        name: 'SnapFold Kettle',
        category: 'electronics travel-outdoor smart-kitchen new-arrivals',
        shortDescription: 'Foldable electric kettle for travel and compact kitchens.',
        longDescription: 'Portable and foldable electric kettle with dual voltage. Ideal for travel, hostels, and small apartments. Boils water quickly and folds down to save storage space. Silicone body, food-grade, and easy to clean.',
        priceUSD: 24.99,
        images: [
            'https://m.media-amazon.com/images/I/61OPxhN54WL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/71-rTtIjYhL._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3R7tiZ9'
    },
    {
        id: 14,
        name: 'SpaceDry Dish Rack',
        category: 'home-living organizers highly-rated',
        shortDescription: 'Foldable dish drying rack with drip tray.',
        longDescription: 'This foldable drying rack is perfect for drying utensils and plates without taking up counter space. Made of durable steel and silicone with removable drip tray. Folds flat when not in use.',
        priceUSD: 17.89,
        images: [
            'https://m.media-amazon.com/images/I/61VjAdCD8bL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/71NldFcGeBL._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/4fJ5dHr'
    },
    {
        id: 15,
        name: 'PopCup Measuring Set',
        category: 'home-living kitchen-tools budget-picks trending',
        shortDescription: 'Collapsible silicone measuring cups set.',
        longDescription: 'Colorful measuring cups that collapse flat for drawer storage. Includes multiple sizes and BPA-free silicone. Great for baking, portion control, and travel cooking kits.',
        priceUSD: 6.75,
        images: [
            'https://m.media-amazon.com/images/I/71R4gCJiVEL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/71rTC5Cy4jL._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3R3vEZF'
    },
    {
        id: 16,
        name: 'FoldBin Trash Can',
        category: 'home-living smart-kitchen kitchen-hacks trending',
        shortDescription: 'Foldable wall-mount trash bin for cabinets.',
        longDescription: 'Mount this foldable trash bin on your kitchen cabinet door and keep your counter clean while chopping. Closes when not in use, ideal for small kitchens and RVs.',
        priceUSD: 9.95,
        images: [
            'https://m.media-amazon.com/images/I/71Upv6Ah3DL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/71x60Wl6hWL._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3WOl9hH'
    },
    {
        id: 17,
        name: 'MultiStack Organizer Basket',
        category: 'home-living organizers kitchen-tools highly-rated',
        shortDescription: 'Foldable 2-layer kitchen basket for veggies or snacks.',
        longDescription: 'A stylish foldable basket for storing onions, fruits, or snacks. Detachable, portable, and collapsible. Adds both function and style to your pantry or kitchen counter.',
        priceUSD: 13.59,
        images: [
            'https://m.media-amazon.com/images/I/71cX4iZUSXL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/71g3AO-PW8L._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3HKHHta'
    },
    {
        id: 18,
        name: 'FlatFold Sink Rack Tray',
        category: 'home-living smart-kitchen kitchen-tools new-arrivals',
        shortDescription: '3-in-1 foldable sink rack for drying or prepping.',
        longDescription: 'Use it as a prep tray, over-the-sink drying rack, or as a mat. Folds flat and rolls away for storage. Durable silicone-coated steel design, heat-resistant and non-slip.',
        priceUSD: 12.25,
        images: [
            'https://m.media-amazon.com/images/I/71gdN7IY6KL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/71LGH3TYK1L._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3XEUjEq'
    },
    {
        id: 19,
        name: 'SnapFunnel Silicone Set',
        category: 'home-living kitchen-tools budget-picks kitchen-hacks',
        shortDescription: 'Foldable silicone funnel set for liquids and powders.',
        longDescription: 'Flexible silicone funnels that fold flat into a disk. Easy to use, clean, and store. Ideal for pouring oil, spices, or soap into bottles without spilling.',
        priceUSD: 4.99,
        images: [
            'https://m.media-amazon.com/images/I/71MkPgl7snL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/61FzUglOaQL._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3VQl1PH'
    },
    {
        id: 20,
        name: 'FoldBox Bento Lunch Set',
        category: 'home-living travel-outdoor smart-kitchen lunchbox trending',
        shortDescription: 'Collapsible silicone lunch box with compartments.',
        longDescription: 'This foldable lunch box is perfect for meal preps and school/work tiffins. Collapses to half its size, microwave & dishwasher safe. Comes with reusable cutlery.',
        priceUSD: 14.49,
        images: [
            'https://m.media-amazon.com/images/I/71pDsRRSisL._AC_SY355_.jpg',
            'https://m.media-amazon.com/images/I/61PZxnY32pL._AC_SY355_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3XP1znF'
    },
    {
        id: 21,
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
        id: 22,
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
        id: 23,
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
        id: 24,
        name: 'Wireless Charging Station',
        category: 'electronics accessories trending',
        shortDescription: '3-in-1 wireless charger for all devices.',
        longDescription: 'Charge your phone, earbuds, and smartwatch simultaneously with this sleek 3-in-1 wireless charging station. Features fast charging technology, LED indicators, and a compact design that fits perfectly on any desk or nightstand.',
        priceUSD: 79.99,
        images: [
            'https://m.media-amazon.com/images/I/61nqvRpRnnL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
            'https://m.media-amazon.com/images/I/61DjKwluHlL._AC_SL1500_.jpg',
            'https://m.media-amazon.com/images/I/71G2YhxK6zL._AC_SL1500_.jpg'
        ],
        affiliateLink: 'https://amzn.to/4mfe1Yi'
    },

    // Home & Living Category
    {
        id: 25,
        name: '100W Portable Corded Soldering Iron Kit',
        category: '100W Portable Corded Soldering Iron Kit',
        shortDescription: 'AI-powered lamp adapts to your mood.',
        longDescription: '3S Fast Heating, 212-842℉, Pre-set 3 Groups Temperature, 6 F245 Soldering Tips, Smart Soldering Iron Pen for Electronics Repair.',        
        priceUSD: 119.99,
        images: [
            'https://m.media-amazon.com/images/I/71L1GEcgZJL._AC_SL1500_.jpg',
            'https://m.media-amazon.com/images/I/71RmqP1PFdL._AC_SX679_.jpg',
            'https://m.media-amazon.com/images/I/71x0QTEfmBL._AC_SL1500_.jpg'
        ],
        affiliateLink: 'https://amzn.to/3TWXsnV'
    },
    {
        id: 26,
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
        id: 27,
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
        id: 28,
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
        id: 29,
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
        id: 30,
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
        id: 31,
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
        id: 32,
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
        id: 33,
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
        id: 34,
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
        id: 35,
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


