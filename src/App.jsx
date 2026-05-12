import { useEffect, useRef, useState } from 'react'

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Nav() {
  return (
    <nav className="nav">
      <a className="nav__brand" href="#top">Couple</a>
      <ul className="nav__links">
        <li><a href="#story">Story</a></li>
        <li><a href="#features">The Cup</a></li>
        <li><a href="#buy">Shop</a></li>
        <li><a href="#footer">Contact</a></li>
      </ul>
      <a href="#buy" className="nav__cta">Bag · 0</a>
    </nav>
  )
}

function HeartBokeh() {
  return (
    <div className="bokeh" aria-hidden="true">
      {Array.from({ length: 22 }).map((_, i) => {
        const top = (i * 53) % 95
        const left = (i * 71) % 95
        const size = 30 + ((i * 17) % 90)
        return (
          <span
            key={i}
            className="bokeh__heart"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${-i * 1.3}s`,
              animationDuration: `${15 + ((i * 3) % 18)}s`,
              opacity: 0.3 + ((i * 7) % 50) / 100,
            }}
          />
        )
      })}
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <HeartBokeh />

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">No. 01 — Limited Edition</p>
          <h1 className="hero__title">
            <span>Two&nbsp;Hearts.</span>
            <span>One&nbsp;Cup.</span>
          </h1>
          <p className="hero__tag"><em>Drink together, share forever.</em></p>
          <p className="hero__lede">
            Couple is the shareable tumbler made for the people you love most.
            One vessel, two chambers, two straws — a quiet ritual you'll want to
            keep coming back to.
          </p>
          <div className="hero__actions">
            <a href="#buy" className="btn btn--primary">Shop · $34</a>
            <a href="#story" className="btn btn--ghost">Read the story →</a>
          </div>
        </div>

        <figure className="hero__poster">
          <div className="hero__poster-glow" aria-hidden="true" />
          <img
            src="/img.png"
            alt="The Couple cup, a partitioned tumbler with two straws set on a wooden table beside two candles."
          />
          <figcaption>
            <span>@SSSUPER_JUNIOR</span>
            <span>SS·26 Collection</span>
          </figcaption>
        </figure>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              <em>Drink together,</em> share forever&nbsp;·&nbsp;
              <em>Two hearts,</em> one cup&nbsp;·&nbsp;
              <em>Made for the ones</em> you love&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Story() {
  const [ref, visible] = useReveal()
  return (
    <section
      id="story"
      ref={ref}
      className={`story reveal ${visible ? 'is-in' : ''}`}
    >
      <div className="story__grid">
        <div className="story__label">
          <span>Chapter 01</span>
          <span>The Idea</span>
        </div>
        <h2 className="story__quote">
          <em>“Two Hearts.<br />Two Drinks.<br />One Unforgettable Connection.”</em>
        </h2>
        <div className="story__body">
          <p>
            We started Couple after a long evening sharing a single iced coffee
            from two paper straws. The cup was clumsy. The moment was not.
          </p>
          <p>
            So we redesigned the vessel — a single tumbler split down the middle,
            two straws served separately, two drinks kept perfectly distinct.
            One cup, two worlds, brought together.
          </p>
          <p className="story__sign">— S. &amp; J., founders</p>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const items = [
    {
      n: '01',
      title: 'Dual chamber',
      body: 'A central partition keeps two drinks completely separate — your matcha, their espresso, no mingling.',
    },
    {
      n: '02',
      title: 'Two straws',
      body: 'Reusable stainless steel, one bronze, one champagne — so you’ll always know which is yours.',
    },
    {
      n: '03',
      title: 'Made for two',
      body: 'Sixteen ounces total, eight a side. The right pour for a long, slow conversation.',
    },
    {
      n: '04',
      title: 'Gift-ready',
      body: 'Arrives wrapped in linen with a hand-tied wax seal. Add a handwritten note at checkout.',
    },
  ]
  const [ref, visible] = useReveal()
  return (
    <section
      id="features"
      ref={ref}
      className={`features reveal ${visible ? 'is-in' : ''}`}
    >
      <header className="features__head">
        <span className="features__eyebrow">The Cup</span>
        <h2>Designed for the way you drink with someone.</h2>
      </header>
      <ul className="features__grid">
        {items.map((it) => (
          <li key={it.n} className="feature">
            <span className="feature__num">{it.n}</span>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Buy() {
  const [ref, visible] = useReveal()
  const [option, setOption] = useState('single')
  return (
    <section id="buy" ref={ref} className={`buy reveal ${visible ? 'is-in' : ''}`}>
      <div className="buy__card">
        <div className="buy__head">
          <span>Limited release</span>
          <h2>The Couple Cup</h2>
          <p><em>Drink together, share forever.</em></p>
        </div>

        <div className="buy__pricing">
          <label className={`buy__opt ${option === 'single' ? 'is-active' : ''}`}>
            <input
              type="radio"
              name="qty"
              checked={option === 'single'}
              onChange={() => setOption('single')}
            />
            <div>
              <span className="buy__opt-title">A single Couple</span>
              <span className="buy__opt-meta">One cup · two straws · linen pouch</span>
            </div>
            <span className="buy__price">$34</span>
          </label>
          <label className={`buy__opt ${option === 'pair' ? 'is-active' : ''}`}>
            <input
              type="radio"
              name="qty"
              checked={option === 'pair'}
              onChange={() => setOption('pair')}
            />
            <div>
              <span className="buy__opt-title">
                The Pair <span className="tag">Most loved</span>
              </span>
              <span className="buy__opt-meta">Two cups · four straws · gift-wrapped</span>
            </div>
            <span className="buy__price">$60</span>
          </label>
        </div>

        <button className="btn btn--primary btn--full">
          Add to bag — ${option === 'single' ? '34' : '60'}
        </button>
        <p className="buy__meta">Ships free in 48 hours · 30-day returns</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <h3>Couple</h3>
          <p><em>Drink together, share forever.</em></p>
        </div>
        <form className="footer__news" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="news">Slow letters from us — once a month, never more.</label>
          <div>
            <input
              id="news"
              type="email"
              placeholder="you@somewhere.lovely"
              autoComplete="email"
            />
            <button type="submit">Subscribe →</button>
          </div>
        </form>
      </div>
      <div className="footer__bottom">
        <span>@SSSUPER_JUNIOR</span>
        <span>© Couple Studio · Made with care, in two halves.</span>
        <span><a href="#top">Back to top ↑</a></span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Features />
        <Buy />
      </main>
      <Footer />
    </>
  )
}
