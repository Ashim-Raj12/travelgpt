export const mockItineraryData = {
  id: "1",
  title: "Swiss Alps Winter Escape",
  destination: "Zermatt, Switzerland",
  startDate: "2026-12-12",
  endDate: "2026-12-18",
  duration: "7 Days, 6 Nights",
  travelers: "2 People (Couples Trip)",
  budgetLevel: "Luxury",
  heroImage: "/images/dest_swiss_1784370021031.png",
  
  timeline: [
    {
      day: 1,
      date: "Dec 12, 2026",
      title: "Arrival & Alpine Welcome",
      activities: [
        {
          time: "14:00",
          type: "transport",
          title: "Glacier Express Arrival",
          description: "Arrive at Zermatt train station via the scenic Glacier Express.",
          location: "Bahnhofplatz, 3920 Zermatt",
        },
        {
          time: "15:00",
          type: "hotel",
          title: "Check-in: The Omnia",
          description: "Settle into your luxury suite with Matterhorn views.",
          location: "Auf dem Fels, 3920 Zermatt",
        },
        {
          time: "19:00",
          type: "food",
          title: "Dinner at Restaurant Julen",
          description: "Traditional Swiss fondue and raclette in a cozy alpine setting.",
          location: "Riedstrasse 2, 3920 Zermatt",
        }
      ]
    },
    {
      day: 2,
      date: "Dec 13, 2026",
      title: "Matterhorn Glacier Paradise",
      activities: [
        {
          time: "09:00",
          type: "activity",
          title: "Cable Car to Glacier Paradise",
          description: "Ascend to Europe's highest mountain station (3,883m).",
          location: "Schluhmattstrasse 121, Zermatt",
        },
        {
          time: "12:30",
          type: "food",
          title: "Lunch at Ice Buffet Bar",
          description: "Quick lunch with panoramic views of 38 alpine peaks.",
          location: "Glacier Paradise Station",
        },
        {
          time: "14:00",
          type: "activity",
          title: "Glacier Palace Exploration",
          description: "Walk through tunnels of ice 15 meters below the glacier surface.",
          location: "Glacier Paradise",
        }
      ]
    },
    {
      day: 3,
      date: "Dec 14, 2026",
      title: "Skiing the Sunnegga",
      activities: [
        {
          time: "08:30",
          type: "activity",
          title: "Morning Ski Session",
          description: "Hit the pristine slopes of the Sunnegga-Rothorn area.",
          location: "Sunnegga Funicular",
        },
        {
          time: "13:00",
          type: "food",
          title: "Lunch at Chez Vrony",
          description: "World-famous mountain restaurant. Try the Vrony burger.",
          location: "Findeln, 3920 Zermatt",
        }
      ]
    }
  ],

  hotels: [
    {
      name: "The Omnia",
      rating: 4.9,
      description: "Contemporary lodge perched on a rock high above the center of Zermatt.",
      image: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=800",
      pricePerNight: "$850",
      type: "Luxury Resort"
    }
  ],

  restaurants: [
    {
      name: "Chez Vrony",
      rating: 4.8,
      cuisine: "Swiss / Modern",
      description: "Organic mountain dining with direct Matterhorn views.",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
      price: "$$$$"
    },
    {
      name: "Restaurant Julen",
      rating: 4.7,
      cuisine: "Traditional Swiss",
      description: "Famous for their local lamb specialties and cheese fondue.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
      price: "$$$"
    }
  ],

  budget: {
    total: 6500,
    currency: "USD",
    breakdown: [
      { category: "Flights", amount: 1200 },
      { category: "Accommodation", amount: 3500 },
      { category: "Food & Dining", amount: 900 },
      { category: "Activities", amount: 600 },
      { category: "Transport", amount: 300 }
    ]
  },

  packingList: [
    { category: "Clothing", items: ["Thermal underwear", "Ski jacket", "Waterproof pants", "Wool socks"] },
    { category: "Gear", items: ["Ski goggles", "Gloves", "Daypack", "Adapter (Type J)"] },
    { category: "Documents", items: ["Passport", "Travel Insurance", "Swiss Travel Pass"] }
  ],

  emergency: {
    police: "117",
    ambulance: "144",
    hospital: "Spitalzentrum Oberwallis (Visp)",
    hospitalPhone: "+41 27 604 33 33"
  }
}
