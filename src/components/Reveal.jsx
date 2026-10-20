import { motion as m } from 'framer-motion'
import { useApp } from '../context/AppContext'

// Scroll-reveal wrapper. Duration, distance and stagger come from the visitor's animation settings.
// `index` staggers siblings. Renders a plain element when animation is off or reduced.
export default function Reveal({ as = 'div', index = 0, className, children, ...rest }) {
  const { motion } = useApp()
  if (!motion.enabled) {
    const Tag = as
    return <Tag className={className} {...rest}>{children}</Tag>
  }
  const Comp = m[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: motion.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: motion.duration, delay: Math.min(index, 6) * motion.stagger, ease: motion.ease }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
