export function PageHeader({
  kicker,
  title,
  description,
}: {
  kicker?: string
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker && (
        <p className="mb-3 text-sm tracking-[0.3em] text-gold/80">{kicker}</p>
      )}
      <h1 className="font-heading text-4xl text-gold text-glow-gold md:text-5xl text-balance">
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base text-pretty">
          {description}
        </p>
      )}
    </div>
  )
}
