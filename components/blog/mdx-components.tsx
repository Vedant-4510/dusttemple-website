export const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-12 font-display text-2xl text-ink md:text-3xl" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-8 font-display text-xl text-ink md:text-2xl" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-6 font-body text-lg leading-relaxed text-ink/90" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-6 list-disc space-y-2 pl-6 font-body text-lg leading-relaxed text-ink/90" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li {...props} />,
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-8 border-l-2 border-brass/50 pl-5 font-display text-xl text-teal-deep"
      {...props}
    />
  ),
  em: (props: React.ComponentProps<"em">) => <em className="text-teal-deep not-italic" {...props} />,
  strong: (props: React.ComponentProps<"strong">) => <strong className="font-semibold text-ink" {...props} />,
};
