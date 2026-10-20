import { CONFIG } from '../config'
import { Container } from './ui'

// Small placeholder strip at the bottom of every page. No ad network is connected.
export default function AdStrip() {
  if (!CONFIG.showAdStrip) return null
  return (
    <section aria-label="Advertisement" className="border-t border-line bg-sand">
      <Container className="py-4">
        <div className="flex h-16 items-center justify-center border border-dashed border-muted text-xs uppercase tracking-[0.2em] text-muted sm:h-20">
          Advertisement · placeholder space (728 × 90)
        </div>
      </Container>
    </section>
  )
}
