export type Service = { name: string; blurb: string; offerings: string[] };
export type ServiceGroup = { group: string; caption: string; services: Service[] };

export const serviceGroups: ServiceGroup[] = [
  {
    group: "Cosmic",
    caption: "The map you were born with.",
    services: [
      {
        name: "Numerology",
        blurb: "The numbers that shape your personality, timing, and path.",
        offerings: ["Life path analysis", "Predictive insights", "Compatibility insights", "Readings tailored to you"],
      },
      {
        name: "Astrology",
        blurb: "Your birth chart, read for who you are and what is unfolding.",
        offerings: ["Birth chart analysis", "Relationship astrology", "Predictive astrology", "Timing for big decisions"],
      },
    ],
  },
  {
    group: "Connection",
    caption: "For comfort, closure, and what lies beyond the seen.",
    services: [
      {
        name: "Mediumship",
        blurb: "Tender sessions to connect with loved ones who have passed.",
        offerings: ["Personalized sessions", "Guidance and healing", "Emotional support", "A safe, compassionate space"],
      },
      {
        name: "Akashic record reading",
        blurb: "Insight into your soul's journey and life purpose.",
        offerings: ["Soul path discovery", "Life guidance", "Energetic healing", "Connection to higher wisdom"],
      },
      {
        name: "Angel card reading",
        blurb: "Gentle messages drawn for your current questions.",
        offerings: ["Personalized readings", "Clarity and support", "Comfort and reassurance", "Guidance for growth"],
      },
      {
        name: "Aura reading",
        blurb: "A look at your energy field and where it seeks balance.",
        offerings: ["Energy field analysis", "Identifying imbalances", "Healing and harmony", "Deeper self-awareness"],
      },
    ],
  },
  {
    group: "Practice",
    caption: "Everyday tools for a calmer life.",
    services: [
      {
        name: "Mindfulness & happiness coaching",
        blurb: "Practical guidance toward a more grounded, joyful day-to-day.",
        offerings: ["Personalized coaching", "Stress-reduction techniques", "Emotional resilience", "A positive, self-aware mindset"],
      },
    ],
  },
];
