export type Testimonial = {
  quote: string;
  name: string;
  /** Optional short context, e.g. a city or how long they've worked with Manisha. */
  role?: string;
  /** Optional path to a photo in /public (e.g. "/testimonials/shreya.jpg"). Falls back to initials when absent. */
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Shreya",
    role: "In the field of psychology",
    avatar: "/testimonials/shreya.jpg",
    quote:
      "I am 24 and I work in the field of psychology. Over the past few years I tried many therapists but didn't get the results I was hoping for — until last year, when I started sessions with Manisha Aunty. I am beyond grateful for how far I have come in just this one year. She has helped me overcome so much, in both my personal and professional life, and to truly become the best version of myself — with more confidence and self-esteem. Situations that once felt overwhelming now feel manageable. I have gained so much clarity, and she has shifted my perspective on life and on dealing with people. Every session is an eye-opener, and I am thankful for all the effort she has put into my growth and journey so far.",
  },
  {
    name: "Arti Gadre",
    role: "Parent",
    quote:
      "I have been seeing Manisha for my daughter for the past year, for her anxiety disorder, and I am very happy with her progress under Manisha's guidance and support. Her timely advice and insights have helped my daughter overcome her anxiety. I would especially like to mention that our counsellor was always available for every emergency call my daughter or I made. I thank Manisha from the bottom of my heart for the consistent guidance, advice, and support she has provided — and hope for the same in the future.",
  },
  {
    name: "Sanika Gadre",
    role: "Student",
    quote:
      "I connected with Manisha Aunty in June 2025, when I was experiencing severe anxiety and depression around my exams and career. She was so patient and helpful while listening to all my problems, and always available — even during late nights when I was having severe panic attacks. Her belief in the universe and her reassuring words filled me with positivity and changed my perspective on life. What I liked most was how she helped me improve my self-talk. She helped me uncover deeper patterns in my behaviour and thinking, giving me a better understanding of myself. Each session feels tailored to my needs, and I always leave feeling more grounded and hopeful. Thanks to her guidance, I have improved my relationships and gained real clarity and confidence in my personal journey.",
  },
  {
    name: "Kashmira Patel",
    quote:
      "I was introduced to Manisha through my best friend, and ever since, she has been a guiding light through all the ups and downs in my life. Whenever I have needed her, she has been there — ready to extend a helping hand, sharing her light, wisdom, and guidance. Speaking with her always calms my mind, puts me at ease, and reassures me that everything will be alright. Her unwavering support and compassionate presence have been a constant source of strength and comfort. Thank you, Manisha, from the bottom of my heart, for always being there. I am truly grateful for your guidance, kindness, and the positive difference you have made in my life.",
  },
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
