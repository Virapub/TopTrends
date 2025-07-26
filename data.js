// data.js

const productsData = [
    {
        id: 1,
        name: 'FlexiScreen Pro',
        category: 'new-arrivals highly-rated',
        shortDescription: 'Self-healing screen protector for any device.',
        longDescription: 'The revolutionary self-healing screen protector that adapts to any device screen. Say goodbye to scratches and cracks with this durable, clear shield. Easy to apply and virtually invisible. Provides edge-to-edge protection and maintains touch sensitivity.',
        priceUSD: 29.99,
        images: [
            'https://via.placeholder.com/600x400/27AE60/FFFFFF?text=FlexiPhone+Screen+1',
            'https://via.placeholder.com/600x400/27AE60/FFFFFF?text=FlexiPhone+Screen+2',
            'https://via.placeholder.com/600x400/27AE60/FFFFFF?text=FlexiPhone+Screen+3'
        ],
        // Replace with your actual affiliate link
        affiliateLink: 'https://flexiscreenpro.example.com/buy'
    },
    {
        id: 2,
        name: 'Aura Mood Lamp',
        category: 'trending',
        shortDescription: 'AI-powered lamp adapts to your mood.',
        longDescription: 'An AI-powered smart lamp that senses your mood and adjusts its lighting to create the perfect ambiance. Syncs with music and smart home devices. Offers over 16 million colors and customizable light patterns for every occasion.',
        priceUSD: 79.99,
        images: [
            'https://via.placeholder.com/600x400/E74C3C/FFFFFF?text=Aura+Mood+Lamp+1',
            'https://via.placeholder.com/600x400/E74C3C/FFFFFF?text=Aura+Mood+Lamp+2',
            'https://via.placeholder.com/600x400/E74C3C/FFFFFF?text=Aura+Mood+Lamp+3'
        ],
        // Replace with your actual affiliate link
        affiliateLink: 'https://auramoodlamp.example.com/buy'
    },
    {
        id: 3,
        name: 'EcoFlow Smart Bottle',
        category: 'new-arrivals',
        shortDescription: 'Tracks hydration, purifies water.',
        longDescription: 'Stay hydrated and healthy with the EcoFlow Smart Bottle. It tracks your water intake, reminds you to drink, and even purifies water on the go using UV-C light. Made from durable, eco-friendly materials.',
        priceUSD: 49.99,
        images: [
            'https://via.placeholder.com/600x400/9B59B6/FFFFFF?text=EcoFlow+Water+Bottle+1',
            'https://via.placeholder.com/600x400/9B59B6/FFFFFF?text=EcoFlow+Water+Bottle+2',
            'https://via.placeholder.com/600x400/9B59B6/FFFFFF?text=EcoFlow+Water+Bottle+3'
        ],
        // Replace with your actual affiliate link
        affiliateLink: 'https://ecoflow.example.com/buy'
    },
    {
        id: 4,
        name: 'PetPal Companion',
        category: 'highly-rated trending',
        shortDescription: 'Interactive robot for pet entertainment.',
        longDescription: 'A robotic companion designed to keep your pets entertained and active while you\'re away. Features include a remote-controlled treat dispenser, a laser pointer, and two-way audio to interact with your furry friends.',
        priceUSD: 199.99,
        images: [
            'https://via.placeholder.com/600x400/F1C40F/333333?text=PetPal+Robot+1',
            'https://via.placeholder.com/600x400/F1C40F/333333?text=PetPal+Robot+2',
            'https://via.placeholder.com/600x400/F1C40F/333333?text=PetPal+Robot+3'
        ],
        // Replace with your actual affiliate link
        affiliateLink: 'https://petpal.example.com/buy'
    },
    {
        id: 5,
        name: 'SolarCharge Backpack',
        category: 'new-arrivals',
        shortDescription: 'Charge devices on the go with solar power.',
        longDescription: 'Never run out of battery again! This stylish backpack features an integrated high-efficiency solar panel that charges your devices as you move. It\'s durable, water-resistant, and spacious enough for all your daily essentials.',
        priceUSD: 89.99,
        images: [
            'https://via.placeholder.com/600x400/1ABC9C/FFFFFF?text=SolarCharge+Backpack+1',
            'https://via.placeholder.com/600x400/1ABC9C/FFFFFF?text=SolarCharge+Backpack+2',
            'https://via.placeholder.com/600x400/1ABC9C/FFFFFF?text=SolarCharge+Backpack+3'
        ],
        // Replace with your actual affiliate link
        affiliateLink: 'https://solarcharge.example.com/buy'
    },
    {
        id: 6,
        name: 'Smart AeroGarden',
        category: 'trending',
        shortDescription: 'Grow fresh herbs indoors, effortlessly.',
        longDescription: 'Grow fresh herbs, vegetables, and flowers indoors year-round with the Smart AeroGarden. This hydroponic system features automated LED grow lights and a watering system, making indoor gardening effortless and fun for everyone.',
        priceUSD: 149.99,
        images: [
            'https://via.placeholder.com/600x400/E67E22/FFFFFF?text=Smart+AeroGarden+1',
            'https://via.placeholder.com/600x400/E67E22/FFFFFF?text=Smart+AeroGarden+2',
            'https://via.placeholder.com/600x400/E67E22/FFFFFF?text=Smart+AeroGarden+3'
        ],
        // Replace with your actual affiliate link
        affiliateLink: 'https://aerogarden.example.com/buy'
    },
    {
        id: 7,
        name: 'Quantum Leap Earbuds',
        category: 'new-arrivals highly-rated',
        shortDescription: 'Immersive sound, futuristic design.',
        longDescription: 'Experience audio like never before with the Quantum Leap Earbuds. Featuring advanced active noise cancellation, crystal-clear call quality, and a sleek ergonomic design. Enjoy up to 24-hour battery life with the charging case.',
        priceUSD: 129.99,
        images: [
            'https://via.placeholder.com/600x400/3498DB/FFFFFF?text=Quantum+Leap+Earbuds+1',
            'https://via.placeholder.com/600x400/3498DB/FFFFFF?text=Quantum+Leap+Earbuds+2',
            'https://via.placeholder.com/600x400/3498DB/FFFFFF?text=Quantum+Leap+Earbuds+3'
        ],
        // Replace with your actual affiliate link
        affiliateLink: 'https://quantumleapearbuds.example.com/buy'
    }
];

// Exchange rate (as of July 26, 2025) - Please update this rate regularly!
const USD_TO_INR_RATE = 83.50;
