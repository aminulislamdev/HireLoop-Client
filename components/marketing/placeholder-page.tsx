type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:min-h-[calc(100svh-4.5rem)]">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
        {description}
      </p>
    </main>
  )
}
