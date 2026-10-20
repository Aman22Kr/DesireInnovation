import { usePageTitle } from '../hooks/usePageTitle'
import { Button, Container } from '../components/ui'

export default function NotFound({ what = 'page' }) {
  usePageTitle('Not found')
  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="font-display text-8xl font-bold text-accent sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-5xl">We could not find that {what}.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">The link may be old or mistyped. Try search, or head back to a main section.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/">Home</Button>
          <Button to="/search" variant="outline">Search the site</Button>
        </div>
      </Container>
    </section>
  )
}
