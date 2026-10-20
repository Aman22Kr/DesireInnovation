// Maps the visitor's animation settings to concrete numbers.
const SPEEDS = {
  SLOW: { duration: 0.9, stagger: 0.12, css: '0.6s' },
  NORMAL: { duration: 0.6, stagger: 0.08, css: '0.3s' },
  FAST: { duration: 0.3, stagger: 0.04, css: '0.15s' },
}
const DISTANCES = { SUBTLE: 12, MEDIUM: 28, STRONG: 56 }

export const SPEED_OPTIONS = ['SLOW', 'NORMAL', 'FAST', 'OFF']
export const INTENSITY_OPTIONS = ['SUBTLE', 'MEDIUM', 'STRONG']

export function getMotion(settings, reducedMotion = false) {
  const speed = SPEEDS[settings?.speed]
  if (!speed || reducedMotion) return { enabled: false, duration: 0, stagger: 0, distance: 0, css: '0s', ease: 'linear' }
  return {
    enabled: true,
    duration: speed.duration,
    stagger: speed.stagger,
    distance: DISTANCES[settings.intensity] ?? DISTANCES.MEDIUM,
    css: speed.css,
    ease: [0.22, 1, 0.36, 1],
  }
}

export const isValidMotion = (v) =>
  v && SPEED_OPTIONS.includes(v.speed) && INTENSITY_OPTIONS.includes(v.intensity)
