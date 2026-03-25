import { Link } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: 'Journalisation facile',
    description: 'Enregistrez vos repas en quelques secondes. Recherchez parmi des milliers d\'aliments ou créez vos propres recettes.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'Suivi des macros',
    description: 'Visualisez vos apports en calories, protéines, glucides et lipides avec des graphiques clairs et intuitifs.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Historique complet',
    description: 'Consultez votre historique nutritionnel sur 7, 30 ou 90 jours. Repérez vos tendances et ajustez vos habitudes.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Objectifs personnalisés',
    description: 'Définissez vos objectifs caloriques selon votre profil : poids, taille, activité et but (perte, maintien, prise de masse).',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Multi-appareils',
    description: 'Accédez à Kaloulou depuis votre téléphone, tablette ou ordinateur. Vos données sont synchronisées en temps réel.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Données sécurisées',
    description: 'Vos données sont chiffrées et stockées en sécurité. Nous ne vendons jamais vos informations personnelles.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Créez votre profil',
    description: 'Renseignez votre âge, poids, taille et objectif. Kaloulou calcule automatiquement vos besoins caloriques quotidiens.',
  },
  {
    number: '02',
    title: 'Journalisez vos repas',
    description: 'Ajoutez vos aliments au déjeuner, dîner ou en-cas. Notre base de données contient des milliers d\'aliments.',
  },
  {
    number: '03',
    title: 'Atteignez vos objectifs',
    description: 'Suivez vos progrès en temps réel. Recevez des insights personnalisés pour optimiser votre alimentation.',
  },
]

const testimonials = [
  {
    name: 'Sophie M.',
    role: 'Coach fitness',
    avatar: 'SM',
    quote: 'Kaloulou a transformé la façon dont je suis mon alimentation. L\'interface est tellement intuitive que je n\'ai plus d\'excuses pour rater un repas !',
    rating: 5,
  },
  {
    name: 'Thomas L.',
    role: 'Athlète amateur',
    avatar: 'TL',
    quote: 'En 3 mois, j\'ai atteint mes objectifs de prise de masse grâce au suivi précis des macros. Outil indispensable pour tout sportif sérieux.',
    rating: 5,
  },
  {
    name: 'Amélie R.',
    role: 'Nutritionniste',
    avatar: 'AR',
    quote: 'Je recommande Kaloulou à tous mes patients. La précision des données et la facilité d\'utilisation en font l\'outil de référence.',
    rating: 5,
  },
]

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: 'pour toujours',
    description: 'Idéal pour commencer votre parcours nutritionnel',
    features: [
      'Journalisation illimitée',
      'Suivi des calories',
      'Historique 30 jours',
      'Objectifs de base',
      'Accès mobile',
    ],
    cta: 'Commencer gratuitement',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '4,99€',
    period: 'par mois',
    description: 'Pour les utilisateurs qui veulent aller plus loin',
    features: [
      'Tout du plan gratuit',
      'Suivi des macros détaillé',
      'Historique illimité',
      'Graphiques avancés',
      'Export CSV/PDF',
      'Support prioritaire',
    ],
    cta: 'Essai gratuit 14 jours',
    highlighted: true,
  },
]

function StarIcon() {
  return (
    <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-primary-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* ── Navbar ── */}
      <header className="fixed top-4 left-4 right-4 z-50">
        <nav className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 10 10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">Kaloulou</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Fonctionnalités</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Comment ça marche</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Tarifs</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/auth"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            >
              Connexion
            </Link>
            <Link
              to="/auth?mode=register"
              className="text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer"
            >
              Démarrer
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" aria-hidden="true" />
              Plus de 10 000 utilisateurs actifs
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Maîtrisez votre
              <span className="text-primary-600"> nutrition</span>
              <br />sans prise de tête
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Kaloulou vous aide à suivre vos calories et macros en quelques clics. Atteignez vos objectifs de santé avec des données précises et des insights personnalisés.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/auth?mode=register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors duration-200 cursor-pointer shadow-lg shadow-primary-600/20"
              >
                Commencer gratuitement
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/auth"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg border border-gray-200 transition-colors duration-200 cursor-pointer"
              >
                Se connecter
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Gratuit pour toujours · Aucune carte bancaire requise
            </p>
          </div>

          {/* App preview */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-gray-900 rounded-3xl p-1 shadow-2xl shadow-gray-900/20">
              <div className="bg-gray-800 rounded-[20px] overflow-hidden">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-700">
                  <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
                  <div className="flex-1 mx-4 bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 text-center">app.kaloulou.fr</div>
                </div>
                {/* Dashboard mock */}
                <div className="p-6 bg-gray-50 min-h-[320px]">
                  <div className="max-w-sm mx-auto space-y-4">
                    {/* Calorie ring mock */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Calories du jour</p>
                          <p className="text-3xl font-bold text-gray-900">1 847</p>
                          <p className="text-sm text-gray-500">sur 2 200 kcal</p>
                        </div>
                        <div className="relative w-20 h-20">
                          <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90" aria-label="84% des calories atteints">
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" strokeWidth="3"
                              strokeDasharray="84 16" strokeLinecap="round" />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">84%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                        {[
                          { label: 'Protéines', value: '92g', color: 'bg-blue-100 text-blue-700' },
                          { label: 'Glucides', value: '210g', color: 'bg-amber-100 text-amber-700' },
                          { label: 'Lipides', value: '54g', color: 'bg-purple-100 text-purple-700' },
                        ].map(m => (
                          <div key={m.label} className={`${m.color} rounded-xl p-2 text-center`}>
                            <p className="text-xs font-medium opacity-80">{m.label}</p>
                            <p className="text-sm font-bold">{m.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Meals list mock */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Repas d'aujourd'hui</p>
                      <div className="space-y-2">
                        {[
                          { meal: 'Petit-déjeuner', items: 'Avoine, Fruits, Yaourt', kcal: '420 kcal' },
                          { meal: 'Déjeuner', items: 'Riz, Poulet, Légumes', kcal: '680 kcal' },
                          { meal: 'Dîner', items: 'Saumon, Quinoa, Salade', kcal: '580 kcal' },
                        ].map(r => (
                          <div key={r.meal} className="flex items-center justify-between py-1.5">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{r.meal}</p>
                              <p className="text-xs text-gray-500">{r.items}</p>
                            </div>
                            <span className="text-sm font-semibold text-primary-600">{r.kcal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Social proof strip ── */}
        <section className="py-12 bg-gray-50 border-y border-gray-100" aria-label="Partenaires et chiffres clés">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '10K+', label: 'Utilisateurs actifs' },
                { value: '2M+', label: 'Repas journalisés' },
                { value: '4.9/5', label: 'Note moyenne' },
                { value: '98%', label: 'Satisfaction client' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tout ce dont vous avez besoin
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Des outils simples et puissants pour reprendre le contrôle de votre alimentation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map(f => (
                <div
                  key={f.title}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-primary-200 hover:shadow-md hover:shadow-primary-50 transition-all duration-200 cursor-default"
                >
                  <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors duration-200">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="py-24 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                En 3 étapes simples
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Démarrez en moins de 2 minutes et commencez à suivre votre nutrition dès aujourd'hui.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={step.number} className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(100%_-_16px)] w-8 h-px bg-gray-300" aria-hidden="true" />
                  )}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="text-4xl font-black text-primary-100 mb-3" aria-hidden="true">{step.number}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ce qu'ils en pensent
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Des milliers d'utilisateurs ont déjà transformé leur relation avec la nourriture.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map(t => (
                <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex gap-1 mb-4" role="img" aria-label={`${t.rating} étoiles sur 5`}>
                    {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold text-sm flex items-center justify-center" aria-hidden="true">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Un prix honnête
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Commencez gratuitement, évoluez quand vous en avez besoin.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {plans.map(plan => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-8 border-2 ${
                    plan.highlighted
                      ? 'bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-600/25'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      Populaire
                    </div>
                  )}
                  <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-4xl font-black ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>
                      /{plan.period}
                    </span>
                  </div>
                  <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-8" role="list">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3">
                        {plan.highlighted ? (
                          <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <CheckIcon />
                        )}
                        <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/auth?mode=register"
                    className={`block w-full text-center font-semibold py-3 rounded-xl transition-colors duration-200 cursor-pointer ${
                      plan.highlighted
                        ? 'bg-white text-primary-600 hover:bg-primary-50'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-primary-600 rounded-3xl p-12 shadow-2xl shadow-primary-600/20">
              <h2 className="text-4xl font-bold text-white mb-4">
                Prêt à transformer votre nutrition ?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
                Rejoignez des milliers d'utilisateurs qui ont déjà pris le contrôle de leur alimentation avec Kaloulou.
              </p>
              <Link
                to="/auth?mode=register"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-primary-700 font-bold px-8 py-4 rounded-2xl text-lg transition-colors duration-200 cursor-pointer shadow-lg"
              >
                Créer mon compte gratuitement
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-white/60 text-sm mt-4">Aucune carte bancaire · Gratuit pour toujours</p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">Kaloulou</span>
            </div>
            <nav className="flex items-center gap-6" aria-label="Navigation pied de page">
              <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Fonctionnalités</a>
              <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Tarifs</a>
              <Link to="/auth" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Connexion</Link>
            </nav>
            <p className="text-sm text-gray-400">© 2026 Kaloulou. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
