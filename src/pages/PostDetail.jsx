import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { catalog, posts } from '../data'
import { useApp } from '../context/AppContext'
import { usePageTitle } from '../hooks/usePageTitle'
import Reveal from '../components/Reveal'
import { Container, FavouriteButton, ItemCard } from '../components/ui'
import NotFound from './NotFound'

export default function PostDetail() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  const { addRecent } = useApp()
  usePageTitle(post?.title)
  useEffect(() => { if (post) addRecent(`post:${post.slug}`) }, [post, addRecent])
  if (!post) return <NotFound what="article" />
  const more = catalog.filter((c) => c.type === 'post' && c.slug !== post.slug).slice(0, 3)
  const date = new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <>
      <article className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/blog" className="link-underline inline-flex items-center gap-2 font-semibold"><ArrowLeft size={16} /> Journal</Link>
            <FavouriteButton id={`post:${post.slug}`} />
          </div>
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{post.category}</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">{post.title}</h1>
            <p className="mt-4 flex items-center gap-3 text-sm text-muted"><span>{date}</span><span className="flex items-center gap-1"><Clock size={14} /> {post.readTime} min read</span></p>
          </Reveal>
          <img src={post.image} alt="" className="my-10 aspect-[16/9] w-full border-2 border-ink object-cover" />
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            <p className="font-display text-2xl text-ink">{post.summary}</p>
            {post.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="mt-10 flex flex-wrap gap-2">{post.tags.map((t) => <span key={t} className="border-2 border-ink px-3 py-1 text-sm">#{t}</span>)}</div>
        </Container>
      </article>
      <section className="border-t-2 border-ink bg-sand py-14 sm:py-20">
        <Container>
          <h2 className="mb-8 font-display text-3xl font-semibold">Keep reading</h2>
          <div className="grid gap-8 md:grid-cols-3">{more.map((m, i) => <ItemCard key={m.id} item={m} index={i} aspect="aspect-[16/9]" />)}</div>
        </Container>
      </section>
    </>
  )
}
