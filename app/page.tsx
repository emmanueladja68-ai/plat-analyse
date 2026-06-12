import Link from 'next/link'
import { Upload, BarChart2, Lightbulb, ArrowRight, Sparkles } from 'lucide-react'

const FEATURES = [
  {
    icon: Upload,
    title: 'Import CSV',
    text: "Déposez vos relevés bancaires, le parser détecte automatiquement vos colonnes pour un traitement sans erreur.",
  },
  {
    icon: BarChart2,
    title: 'Graphiques automatiques',
    text: "Donut, barres, courbes — vos dépenses visualisées instantanément pour une compréhension immédiate de vos flux.",
  },
  {
    icon: Lightbulb,
    title: 'Conclusions intelligentes',
    text: "3 insights générés automatiquement pour piloter votre budget et identifier les leviers d'optimisation.",
  },
]

const HERO_GRADIENT = {
  background:
    'radial-gradient(circle at top right, rgba(0,74,198,0.05), transparent), radial-gradient(circle at bottom left, rgba(148,55,0,0.03), transparent)',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 w-full border-b border-outline-variant"
           style={{ background: 'rgba(250,248,255,0.80)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1440px] mx-auto h-16 flex justify-between items-center px-lg">
          <span className="text-headline-sm font-bold text-on-surface">plat-analyse</span>
          <div className="flex items-center gap-md">
            <Link
              href="/login"
              className="text-label-md text-secondary hover:text-primary transition-colors"
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="bg-primary-container text-white px-md py-sm rounded-lg text-label-md hover:opacity-90 transition-opacity flex items-center gap-xs"
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </nav>

      <main style={HERO_GRADIENT}>

        {/* ── Hero ── */}
        <section className="max-w-[1440px] mx-auto px-lg pt-24 pb-32 text-center">
          <div className="flex flex-col items-center">

            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-md py-1 rounded-full border mb-lg"
                 style={{ borderColor: 'rgba(0,74,198,0.2)', background: 'rgba(0,74,198,0.05)', color: '#004ac6', animation: 'pulse 2.5s ease-in-out infinite' }}>
              <Sparkles size={14} strokeWidth={1.5} />
              <span className="text-label-sm uppercase tracking-wider">Analyse financière intelligente</span>
            </div>

            {/* Headline */}
            <h1 className="text-on-background font-semibold max-w-3xl mb-md"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: '1.15', letterSpacing: '-0.02em', animation: 'fadeInUp 0.6s ease-out both' }}>
              Analysez vos dépenses avec précision.
            </h1>

            {/* Subtitle */}
            <p className="text-body-lg text-secondary max-w-2xl mb-xl" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
              Importez vos relevés CSV, visualisez vos postes de dépenses et obtenez des conclusions
              automatiques en quelques secondes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-md" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
              <Link
                href="/register"
                className="bg-primary text-white px-xl py-md rounded-xl text-label-md flex items-center gap-sm hover:-translate-y-0.5 transition-all"
                style={{ boxShadow: '0 8px 24px rgba(0,74,198,0.2)' }}
              >
                Commencer gratuitement
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <Link
                href="/login"
                className="text-label-md text-secondary px-xl py-md hover:text-on-surface transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </div>

          {/* Hero mockup */}
          <div className="mt-24 relative max-w-5xl mx-auto" style={{ animation: 'fadeInUp 0.8s ease-out 0.3s both' }}>
            <div className="absolute -inset-4 rounded-[32px] blur-3xl opacity-50 -z-10"
                 style={{ background: 'linear-gradient(135deg, rgba(0,74,198,0.10), rgba(148,55,0,0.10))' }} />
            <div className="rounded-2xl border border-outline-variant bg-white p-2"
                 style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.12)' }}>
              <DashboardMockup />
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="max-w-[1440px] mx-auto px-lg py-32 border-t border-outline-variant"
                 style={{ background: 'rgba(255,255,255,0.50)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="group p-xl rounded-2xl border border-outline-variant hover:border-primary transition-colors"
                style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(8px)', animation: `fadeInUp 0.6s ease-out ${0.1 * (i + 1)}s both` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-lg transition-all
                                bg-[rgba(0,74,198,0.05)] text-primary
                                group-hover:bg-primary group-hover:text-white">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-headline-sm text-on-surface mb-sm">{title}</h3>
                <p className="text-body-md text-secondary">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trust ── */}
        <section className="max-w-[1440px] mx-auto px-lg py-16 flex flex-col items-center border-t border-outline-variant">
          <p className="text-label-sm text-outline mb-lg uppercase tracking-widest">
            Utilisé par des professionnels de la finance
          </p>
          <div className="flex flex-wrap justify-center gap-xl opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {['FINANCE.CO', 'ASSET_MIND', 'DATA_FLOW', 'MONEY_GRID'].map((name) => (
              <span key={name} className="text-headline-sm font-bold text-on-surface">{name}</span>
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-xl border-t border-outline-variant bg-surface">
        <div className="max-w-[1440px] mx-auto px-lg flex flex-col items-center gap-md">
          <p className="text-body-sm text-secondary text-center">
            © 2024 plat-analyse · Conçu et développé par Emmanuel Adja
          </p>
          <div className="flex gap-md">
            <a href="#" className="text-label-sm text-secondary hover:text-primary transition-colors">
              Mentions Légales
            </a>
            <a href="#" className="text-label-sm text-secondary hover:text-primary transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}

/* ── Mini dashboard mockup (replaces external AI image) ── */
function DashboardMockup() {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-surface-container-low"
         style={{ aspectRatio: '16/9', minHeight: 260 }}>
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-outline-variant">
        <span className="text-label-md font-semibold text-on-surface">Tableau de bord</span>
        <div className="flex gap-2">
          {['Ce mois', '3 mois', '6 mois'].map((l) => (
            <span key={l} className="px-3 py-1 rounded-lg text-label-sm"
                  style={{ background: l === 'Ce mois' ? '#2563eb' : '#ededf9', color: l === 'Ce mois' ? '#fff' : '#434655' }}>
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4 p-4">
        {/* KPI cards */}
        <div className="flex flex-col gap-3 w-2/3">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'TOTAL', value: '124 500 €' },
              { label: 'POSTES', value: '42' },
              { label: 'DOMINANT', value: 'Logistique' },
              { label: 'ÉVOLUTION', value: '-12.5%' },
            ].map((k) => (
              <div key={k.label} className="bg-white border border-outline-variant rounded-lg p-3">
                <p className="text-[9px] font-medium text-secondary uppercase tracking-wider mb-1">{k.label}</p>
                <p className="text-[13px] font-semibold text-on-surface leading-none">{k.value}</p>
              </div>
            ))}
          </div>
          {/* Area chart */}
          <div className="bg-white border border-outline-variant rounded-lg p-3 flex-1">
            <p className="text-[10px] font-medium text-secondary mb-2">Évolution mensuelle</p>
            <svg viewBox="0 0 300 80" className="w-full" style={{ height: 64 }}>
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#004ac6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#004ac6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,70 L30,60 L60,65 L90,50 L120,55 L150,38 L180,42 L210,28 L240,35 L270,22 L300,18 V80 H0Z"
                    fill="url(#lg)" />
              <path d="M0,70 L30,60 L60,65 L90,50 L120,55 L150,38 L180,42 L210,28 L240,35 L270,22 L300,18"
                    fill="none" stroke="#004ac6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Donut */}
        <div className="bg-white border border-outline-variant rounded-lg p-3 flex-1 flex flex-col items-center justify-center gap-2">
          <p className="text-[10px] font-medium text-secondary self-start">Répartition</p>
          <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
            <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="4" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="#004ac6" strokeWidth="4"
                    strokeDasharray="28 100" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="#2563eb" strokeWidth="4"
                    strokeDasharray="22 100" strokeDashoffset="-28" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="#d3e4fe" strokeWidth="4"
                    strokeDasharray="18 100" strokeDashoffset="-50" />
          </svg>
          <div className="space-y-1 w-full">
            {[['#004ac6', 'Logistique', '32%'], ['#2563eb', 'Infra.', '22%'], ['#d3e4fe', 'Autres', '46%']].map(
              ([color, label, pct]) => (
                <div key={label} className="flex items-center justify-between text-[9px]">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-[2px] inline-block" style={{ background: color }} />
                    <span className="text-secondary">{label}</span>
                  </div>
                  <span className="font-semibold text-on-surface">{pct}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
