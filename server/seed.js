const mongoose = require('mongoose');

// Replace with your MongoDB URI
const MONGO_URI = 'mongodb+srv://aakashadmin:admin@cluster0.bnbhawf.mongodb.net/paradiseHotel?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', async () => {
  console.log('MongoDB connected, seeding data...');

  const collections = {
    deluxerooms: [
      {
        title: "Ocean View Deluxe Room",
        description: "Spacious deluxe room with balcony and ocean view.",
        pricePerNight: 7999,
        available: true,
        images: ["/images/rooms/deluxe-ocean-1.jpg"],
        amenities: ["Wi-Fi", "AC", "Mini Bar", "Smart TV", "Jacuzzi"]
      },
      {
        title: "Garden View Deluxe Room",
        description: "Relax in comfort with a lush garden view.",
        pricePerNight: 7499,
        available: false,
        images: ["/images/rooms/deluxe-garden.jpg"],
        amenities: ["Wi-Fi", "AC", "Balcony", "Tea/Coffee Maker"]
      }
    ],
    familyrooms: [
      {
        title: "Executive Family Suite",
        description: "Large two-bedroom suite with living space.",
        pricePerNight: 11999,
        available: true,
        images: ["/images/rooms/family-suite.jpg"],
        amenities: ["Wi-Fi", "Kitchenette", "2 Bathrooms", "Kids Play Area"]
      }
    ],
    restaurants: [
      {
        name: "Skyline Restaurant",
        type: "Fine Dining",
        cuisine: "Continental & Indian",
        image: "/images/restaurants/skyline.jpg",
        timings: "7 AM - 11 PM",
        available: true
      },
      {
        name: "The Paradise Bar",
        type: "Bar",
        cuisine: "Snacks & Cocktails",
        image: "/images/restaurants/bar.jpg",
        timings: "5 PM - 1 AM",
        available: true
      }
    ],
    spa: [
      {
        service: "Aroma Therapy",
        price: 2500,
        duration: "60 minutes",
        available: true,
        image: "/images/spa/aroma.jpg"
      }
    ],
    fitnesscenter: [
      {
        equipment: "Treadmill, Weights, Elliptical",
        image: "/images/fitness/gym.jpg",
        timings: "5 AM - 11 PM",
        trainerAvailable: true,
        available: true
      }
    ],
    roomfeatures: [
      { feature: "Private Balcony", icon: "balcony.png" },
      { feature: "Rain Shower", icon: "shower.png" }
    ],
    breakfast: [
      {
        name: "Continental Buffet",
        description: "Croissants, cereal, fruits, pancakes, coffee",
        image: "/images/breakfast/continental.jpg",
        price: 699,
        available: true,
        timing: "6:30 AM - 10:30 AM"
      }
    ],
    roomservice: [
      {
        service: "In-Room Dining",
        description: "Food delivered to your room",
        image: "/images/services/dining.jpg",
        available: true
      }
    ],
    menus: [
      {
        restaurant: "Skyline Restaurant",
        items: [
          { item: "Grilled Salmon", price: 950, image: "/images/menus/salmon.jpg" },
          { item: "Butter Chicken", price: 750, image: "/images/menus/butter-chicken.jpg" }
        ]
      }
    ],
    specialevents: [
      {
        eventName: "New Year Gala Night",
        date: "2025-12-31",
        description: "Live music, buffet, fireworks",
        location: "Grand Ballroom",
        image: "/images/events/newyear.jpg",
        price: 2999,
        available: true
      }
    ],
    swimmingpool: [
      {
        name: "Infinity Pool",
        image: "/images/pool/infinity.jpg",
        timings: "6 AM - 9 PM",
        features: ["Heated", "Kids Pool", "Towel Service"],
        available: true
      }
    ],
    meetingrooms: [
      {
        name: "Orchid Conference Hall",
        capacity: 150,
        features: ["Projector", "Wi-Fi", "Mic", "Stage"],
        pricePerHour: 2500,
        image: "/images/meeting/orchid.jpg",
        available: true
      }
    ],
    conciergeservices: [
      {
        service: "Airport Pickup",
        description: "Luxury cab service for airport transit",
        image: "/images/concierge/airport.jpg",
        available: true
      }
    ]
  };

  try {
    for (const [name, docs] of Object.entries(collections)) {
      const model = mongoose.model(name, new mongoose.Schema({}, { strict: false }), name);
      await model.deleteMany({});
      await model.insertMany(docs);
      console.log(`✔️  Seeded: ${name}`);
    }

    console.log('🎉 All data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
  } finally {
    db.close();
  }
});
