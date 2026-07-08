# Testimonial photos

Drop client photos here to have them appear as the testimonial avatar.

- **Shreya** → save her photo as `shreya.jpg` in this folder. It's already wired
  in `content/testimonials.ts` (`avatar: "/testimonials/shreya.jpg"`).

Notes:
- No code changes needed — just add the file. Until the file exists, the design
  gracefully falls back to an initials medallion.
- Any size/format works; `next/image` optimizes and crops it to a small circle
  automatically. A roughly square, face-centered image looks best.
- To add another person, save their photo here and set `avatar: "/testimonials/<file>"`
  on their entry in `content/testimonials.ts`.
