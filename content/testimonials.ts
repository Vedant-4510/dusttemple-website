export type Testimonial = {
  quote: string;
  name: string;
  /** Optional short context, e.g. a city or how long they've worked with Manisha. */
  role?: string;
  /** Optional path to a photo in /public (e.g. "/testimonials/varsha.jpg"). Falls back to initials when absent. */
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Manisha, one person amongst a lot of healers I have known in my own journey. A soul so simple and warm, willing to work with you to make a change in your life. Someone you can connect with at all times, like a strong pillar.",
    name: "Vikramjit Singh Chugh",
  },
  {
    quote:
      "Manisha taught me how to look at things from a different perspective. After many conversations and sessions, I have started to view life in a more positive way, and learnt about the beauty of forgiveness and gratitude.",
    name: "Varsha Koppikar",
  },
  {
    quote:
      "I have known Manisha for a few years now. She is patient, kind, sensitive, and has clarity of thought. Her ability to connect the dots and see what lies ahead has been spot on. I highly recommend her to anyone seeking peace and harmony.",
    name: "Vikaas Sachdev",
  },
];
