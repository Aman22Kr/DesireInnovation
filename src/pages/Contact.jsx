import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Mail, MapPin } from 'lucide-react'
import { CONFIG } from '../config'
import { useApp } from '../context/AppContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { Button, Container, PageHero } from '../components/ui'

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default function Contact() {
  usePageTitle('Contact')
  const { contactDraft, setContactDraft, addSubmission } = useApp()
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const update = (k) => (e) => { setSaved(false); setContactDraft((d) => ({ ...d, [k]: e.target.value })) }
  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (contactDraft.name.trim().length < 2) errs.name = 'Please enter your name.'
    if (!emailOk(contactDraft.email)) errs.email = 'Please enter a valid email address.'
    if (contactDraft.message.trim().length < 10) errs.message = 'Please write at least 10 characters.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    addSubmission(contactDraft)
    setContactDraft({ name: '', email: '', message: '' })
    setSaved(true)
  }
  const field = 'w-full border-2 border-ink bg-paper px-4 py-3 outline-none focus:border-accent'
  const err = (k) => errors[k] && <p role="alert" className="mt-1 text-sm text-accent">{errors[k]}</p>

  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you are building.">This form is a demo. Your message is stored in this browser only and is not sent to anyone.</PageHero>
      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <form onSubmit={submit} noValidate className="space-y-6 lg:col-span-7">
            {saved && (
              <div role="status" className="flex gap-3 border-2 border-moss bg-sand p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-moss" />
                <p>Saved on this device. <strong>Nothing was sent</strong>, because this demo has no server. You can review saved entries in <Link to="/settings" className="underline">Settings</Link>.</p>
              </div>
            )}
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-semibold">Name</label>
              <input id="name" value={contactDraft.name} onChange={update('name')} className={field} autoComplete="name" />
              {err('name')}
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold">Email</label>
              <input id="email" type="email" value={contactDraft.email} onChange={update('email')} className={field} autoComplete="email" />
              {err('email')}
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-semibold">Project details</label>
              <textarea id="message" rows={6} value={contactDraft.message} onChange={update('message')} className={field} />
              {err('message')}
            </div>
            <p className="text-sm text-muted">Your draft is saved in this browser as you type, so it survives a refresh. Please do not enter anything sensitive.</p>
            <Button type="submit">Save demo message</Button>
          </form>
          <aside className="space-y-6 lg:col-span-5">
            <div className="border-2 border-ink p-6">
              <h2 className="font-display text-2xl font-semibold">Studio details</h2>
              <p className="mt-4 flex items-center gap-3 text-muted"><Mail size={18} className="text-accent" /> {CONFIG.email}</p>
              <p className="mt-2 flex items-center gap-3 text-muted"><MapPin size={18} className="text-accent" /> {CONFIG.location}</p>
              <p className="mt-4 text-xs text-muted">Placeholder contact details for the demo.</p>
            </div>
            <div className="aspect-[4/3] border-2 border-ink bg-sand" role="img" aria-label="Map placeholder" />
          </aside>
        </Container>
      </section>
    </>
  )
}
