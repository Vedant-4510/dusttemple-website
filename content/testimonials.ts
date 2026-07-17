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
    name: "Nikit",
    role: "Based in Ireland",
    avatar: "/testimonials/nikit.jpg",
    quote:
      "I'm 29 and currently based in Ireland. I've been having regular online sessions with Manisha Aunty, and they have made a real difference in my life. Even though we're in different countries, our video sessions have always felt personal, comfortable, and easy to connect through. With her guidance, I've been able to work on many important areas of my life — building my self-confidence, understanding my personality better, navigating family relationships in healthier ways, and gaining more clarity and confidence in my career. Most importantly, she's helped me become more self-aware and grow into a better version of myself. What I appreciate most about Manisha Aunty is that she listens with genuine care and never judges. She asks the right questions, helps me see things from a different perspective, and gives me practical ways to work through challenges. I always come away from our sessions feeling lighter, more confident, and with a clearer understanding of myself. I'm truly grateful to have her guidance and support.",
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
    name: "Pooja Charanlal",
    quote:
      "Connecting with Mmanisha S. for an auric reading was a truly transformative experience. I booked a session once we got back from a trip, purely out of curiosity — I'd been feeling different and couldn't understand why. From the moment our session began, I felt an incredible sense of clarity and understanding. She revealed insights about my life that were astonishingly accurate, touching on challenges I was currently facing in ways that felt both profound and deeply relevant. What left the deepest impression on me was how she gently uncovered aspects of my childhood — truths I had never spoken to anyone about. Her ability to perceive and articulate these experiences with compassion and precision was nothing short of remarkable. The session didn't just provide answers — it offered a new perspective, a deeper awareness of myself, and a sense of guidance I hadn't anticipated. I would wholeheartedly encourage anyone who seeks truth, understanding, or insight into the unseen aspects of their life to reach out to her. This is an experience that stays with you, opening doors to awareness and transformation in ways you could never expect.",
  },
  {
    name: "Priyanka",
    quote:
      "I didn't know Manisha Aunty is such a profound energy healer and medium. She did some wonderful energy readings for me and, remarkably, sensed things she had no way of knowing — through my energy, she could tell that Pankaj's leg pain had been pulling down his energy for quite some time. She also guided me on so many things about my own path and energy, scanning me to reveal things I hadn't expected. Get a session with her — she is really amazing!",
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
    name: "Vikaas M Sachdeva",
  },
];
