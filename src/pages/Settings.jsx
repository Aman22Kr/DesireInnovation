import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { INTENSITY_OPTIONS, SPEED_OPTIONS } from '../utils/motion'
import { usePageTitle } from '../hooks/usePageTitle'
import { Button, Container, PageHero } from '../components/ui'

function Segmented({ label, value, options, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" onClick={() => onChange(o)} aria-pressed={value === o} className={`border-2 border-ink px-4 py-2 text-sm font-semibold capitalize ${value === o ? 'bg-ink text-paper' : 'hover:bg-sand'}`}>{o.toLowerCase()}</button>
        ))}
      </div>
    </fieldset>
  )
}

export default function Settings() {
  usePageTitle('Settings')
  const { theme, setTheme, motionSettings, setMotionSettings, motion, submissions, resetAll } = useApp()
  const [confirm, setConfirm] = useState(false)

  return (
    <>
      <PageHero eyebrow="Settings" title="Preferences and your data." />
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl space-y-12">
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-semibold">Appearance</h2>
            <Segmented label="Theme" value={theme} options={['light', 'dark']} onChange={setTheme} />
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-3xl font-semibold">Animation</h2>
            <Segmented label="Speed" value={motionSettings.speed} options={SPEED_OPTIONS} onChange={(speed) => setMotionSettings((m) => ({ ...m, speed }))} />
            <Segmented label="Intensity" value={motionSettings.intensity} options={INTENSITY_OPTIONS} onChange={(intensity) => setMotionSettings((m) => ({ ...m, intensity }))} />
            {!motion.enabled && motionSettings.speed !== 'OFF' && <p className="text-sm text-muted">Your device asks for reduced motion, so animations are off regardless of these settings.</p>}
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-3xl font-semibold">About your saved data</h2>
            <p className="text-muted">Favourites, basket, theme, animation choices, recent searches, recently viewed items and form drafts are stored in <strong className="text-ink">localStorage</strong> in this browser. They stay on this device, do not sync across devices, and are not an account. Nothing sensitive is stored.</p>
            {!confirm ? <Button variant="outline" onClick={() => setConfirm(true)}>Clear saved data</Button> : (
              <div className="flex flex-wrap items-center gap-3 border-2 border-accent p-4">
                <p className="flex-1">Remove all saved items, history, drafts and preferences?</p>
                <Button onClick={() => { resetAll(); setConfirm(false) }}>Yes, clear</Button>
                <Button variant="outline" onClick={() => setConfirm(false)}>Cancel</Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-3xl font-semibold">Demo messages saved here</h2>
            {submissions.length === 0 ? <p className="text-muted">No demo messages yet. Entries from the contact form and basket appear here. They are never sent anywhere.</p> : (
              <ul className="space-y-3">
                {submissions.map((s) => (
                  <li key={s.savedAt} className="border-2 border-ink p-4">
                    <p className="text-xs text-muted">{new Date(s.savedAt).toLocaleString()}</p>
                    <p className="font-semibold">{s.name}{s.email && ` · ${s.email}`}</p>
                    <p className="text-muted">{s.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
