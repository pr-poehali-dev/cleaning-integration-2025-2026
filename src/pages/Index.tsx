import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const MAX_LINK = "https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc";
const HERO_IMG = "https://cdn.poehali.dev/projects/13d4fa88-ae99-47e6-9241-87cd724e7836/files/ecd0652d-8f06-4eca-812a-20c7800ff8fe.jpg";
const BEFORE_AFTER_IMG = "https://cdn.poehali.dev/projects/13d4fa88-ae99-47e6-9241-87cd724e7836/files/1417e938-c071-4421-8c59-c71aa623e08a.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/13d4fa88-ae99-47e6-9241-87cd724e7836/files/4a8372a5-3473-4430-955f-eddd3d00bdb6.jpg";

const services = [
  { icon: "Sofa", title: "Диваны", desc: "Угловые, прямые, модульные. Удалим любые пятна и запахи", price: "от 1 500 ₽", color: "from-emerald-500 to-teal-500" },
  { icon: "Armchair", title: "Кресла", desc: "Тканевые и кожаные. Бережная чистка без деформации", price: "от 800 ₽", color: "from-teal-500 to-emerald-400" },
  { icon: "BedDouble", title: "Матрасы", desc: "Глубокая чистка, удаление клещей и аллергенов", price: "от 1 200 ₽", color: "from-green-600 to-emerald-500" },
  { icon: "Layers", title: "Ковры", desc: "Все виды ковровых покрытий, любой размер", price: "от 200 ₽/м²", color: "from-emerald-600 to-teal-400" },
  { icon: "Car", title: "Автомобили", desc: "Химчистка салона, сидений, потолка и ковриков", price: "от 2 500 ₽", color: "from-teal-600 to-emerald-500" },
  { icon: "Baby", title: "Детская мебель", desc: "Гипоаллергенные средства, безопасно для детей", price: "от 700 ₽", color: "from-green-400 to-emerald-400" },
];

const advantages = [
  { icon: "Clock", title: "Сушка 2–4 часа", desc: "Быстрая сушка — мебель готова к использованию уже сегодня" },
  { icon: "ShieldCheck", title: "Безопасные средства", desc: "Только сертифицированная химия, безопасная для детей и животных" },
  { icon: "Home", title: "Выезд на дом", desc: "Работаем на вашей территории — никуда везти не нужно" },
  { icon: "Star", title: "Гарантия результата", desc: "Не удовлетворены результатом — повторная чистка бесплатно" },
  { icon: "Zap", title: "Выезд в день заявки", desc: "Принимаем заявки с 8:00 до 20:00, выезжаем в тот же день" },
  { icon: "Award", title: "Опыт 5+ лет", desc: "Более 3000 выполненных заказов по всему Краснодару" },
];

const reviews = [
  { name: "Анна К.", rating: 5, text: "Почистили угловой диван — как новый! Быстро, аккуратно, без запаха химии. Обязательно обращусь ещё раз.", date: "15 мая 2025" },
  { name: "Михаил Д.", rating: 5, text: "Заказал чистку матраса и двух кресел. Мастер приехал вовремя, всё объяснил. Результат превзошёл ожидания!", date: "3 июня 2025" },
  { name: "Елена С.", rating: 5, text: "Ребёнок разлил сок на диван, думала уже всё. Ребята сделали чудо — пятна нет! Спасибо огромное!", date: "22 мая 2025" },
  { name: "Дмитрий В.", rating: 5, text: "Заказывал химчистку салона авто — просто отлично. Все пятна вывели, запах исчез. Цена адекватная.", date: "10 июня 2025" },
];

const faq = [
  { q: "Сколько времени занимает чистка?", a: "Обычно 1–3 часа на объект, зависит от размера и загрязнения. Сушка занимает ещё 2–4 часа." },
  { q: "Нужно ли вывозить мебель?", a: "Нет! Мы приезжаем к вам домой со всем необходимым оборудованием. Мебель остаётся на месте." },
  { q: "Безопасно ли для детей и животных?", a: "Да, мы используем только сертифицированную профессиональную химию без токсичных компонентов." },
  { q: "Работаете ли с кожаной мебелью?", a: "Да, работаем с натуральной и искусственной кожей. Используем специальные средства для кожи." },
  { q: "Есть ли гарантия результата?", a: "Да! Если результат не удовлетворяет — повторная чистка проблемного участка бесплатно." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(() => localStorage.getItem("cookie_accepted") === "1");
  const [pdConsent, setPdConsent] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const acceptCookies = () => {
    localStorage.setItem("cookie_accepted", "1");
    setCookieAccepted(true);
  };

  const goMax = () => window.open(MAX_LINK, "_blank");

  return (
    <div className="min-h-screen bg-white font-golos overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Icon name="Sparkles" size={16} className="text-white" />
            </div>
            <span className="font-oswald text-lg font-semibold tracking-wide text-gray-900">АРЕНДА ЧИСТОТЫ</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <button onClick={() => scrollTo("services")} className="hover:text-emerald-600 transition-colors">Услуги</button>
            <button onClick={() => scrollTo("advantages")} className="hover:text-emerald-600 transition-colors">Преимущества</button>
            <button onClick={() => scrollTo("reviews")} className="hover:text-emerald-600 transition-colors">Отзывы</button>
            <button onClick={() => scrollTo("faq")} className="hover:text-emerald-600 transition-colors">FAQ</button>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+78612000000" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-colors">
              <Icon name="Phone" size={15} />
              +7 (861) 200-00-00
            </a>
            <a
              href={MAX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow gradient-brand text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-emerald-200 hover:shadow-lg transition-all"
            >
              Заказать
            </a>
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-emerald-100 px-4 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
            <button onClick={() => scrollTo("services")}>Услуги</button>
            <button onClick={() => scrollTo("advantages")}>Преимущества</button>
            <button onClick={() => scrollTo("reviews")}>Отзывы</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
            <a href="tel:+78612000000" className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <Icon name="Phone" size={15} /> +7 (861) 200-00-00
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#0a1f0f]">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Химчистка мебели" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f0f] via-[#0a1f0f]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f0f] via-transparent to-transparent" />
        </div>
        {/* Animated blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 animate-fade-in">
              <Icon name="MapPin" size={12} />
              Краснодар — выезд на дом
            </div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-4 animate-slide-up animate-delay-100 opacity-0-init" style={{ animationFillMode: "forwards" }}>
              ХИМЧИСТКА<br />
              <span className="text-gradient">МЕБЕЛИ</span><br />
              НА ДОМУ
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 animate-fade-in animate-delay-300 opacity-0-init" style={{ animationFillMode: "forwards" }}>
              Профессиональная чистка диванов, кресел, матрасов, ковров и автомобилей.<br />
              Безопасная химия. Сушка за 2–4 часа.
            </p>
            <div className="flex flex-wrap gap-3 mb-8 animate-fade-in animate-delay-400 opacity-0-init" style={{ animationFillMode: "forwards" }}>
              {["✓ Выезд в день заявки", "✓ Гарантия результата", "✓ Безопасно для детей"].map(t => (
                <span key={t} className="text-sm text-emerald-200 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-500 opacity-0-init" style={{ animationFillMode: "forwards" }}>
              <a
                href={MAX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow gradient-brand text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-emerald-500/30 hover:shadow-xl transition-all hover:-translate-y-1 animate-pulse-glow"
              >
                Написать в MAX
              </a>
              <a
                href="tel:+78612000000"
                className="flex items-center justify-center gap-2 border-2 border-emerald-400/40 text-emerald-300 font-semibold text-base px-8 py-4 rounded-2xl hover:bg-emerald-500/10 transition-all"
              >
                <Icon name="Phone" size={18} />
                Позвонить
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 animate-scale-in animate-delay-600 opacity-0-init" style={{ animationFillMode: "forwards" }}>
            {[
              { num: "3 000+", label: "заказов выполнено" },
              { num: "5 лет", label: "на рынке Краснодара" },
              { num: "4.9★", label: "средняя оценка" },
              { num: "2–4 ч", label: "время сушки" },
            ].map(({ num, label }) => (
              <div key={label} className="glass-card rounded-2xl p-5 text-center bg-white/5 border border-emerald-400/20">
                <div className="font-oswald text-3xl font-bold text-emerald-400 mb-1">{num}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-float">
          <span className="text-xs">Листайте вниз</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <Section>
            <div className="text-center mb-14">
              <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">Что мы чистим</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-gray-900 mt-2">НАШИ УСЛУГИ</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">Работаем со всеми видами мягкой мебели, коврами и автомобилями</p>
            </div>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Section key={s.title}>
                <div className="card-hover border border-gray-100 rounded-2xl p-6 shadow-sm hover:border-emerald-200 bg-white group cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name={s.icon} size={22} className="text-white" fallback="Sparkles" />
                  </div>
                  <h3 className="font-oswald text-xl font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-600 text-lg">{s.price}</span>
                    <a
                      href={MAX_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 transition-colors"
                    >
                      Заказать <Icon name="ArrowRight" size={14} />
                    </a>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER BANNER */}
      <section className="py-20 bg-[#0a1f0f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={BEFORE_AFTER_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f0f] via-[#0a1f0f]/70 to-[#0a1f0f]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Section>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              ВИДИТЕ РАЗНИЦУ?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Удаляем даже самые стойкие пятна — от вина, кофе, чернил, жира и многого другого. Результат виден сразу.
            </p>
            <a
              href={MAX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow gradient-brand text-white font-bold text-base px-10 py-4 rounded-2xl shadow-lg hover:shadow-emerald-500/40 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Хочу так же — написать в MAX
            </a>
          </Section>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Section>
            <div className="text-center mb-14">
              <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">Почему мы</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-gray-900 mt-2">НАШИ ПРЕИМУЩЕСТВА</h2>
            </div>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a) => (
              <Section key={a.title}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <Icon name={a.icon} size={20} className="text-emerald-600" fallback="Check" />
                  </div>
                  <h3 className="font-oswald text-lg font-semibold text-gray-900 mb-2">{a.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <Section>
            <div className="text-center mb-14">
              <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">Как это работает</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-gray-900 mt-2">КАК МЫ РАБОТАЕМ</h2>
            </div>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "PhoneCall", title: "Заявка", desc: "Оставьте заявку или позвоните — обсудим объём и назначим время" },
              { step: "02", icon: "Truck", title: "Выезд", desc: "Мастер приезжает со всем оборудованием в удобное для вас время" },
              { step: "03", icon: "Sparkles", title: "Чистка", desc: "Профессиональная чистка с применением безопасной химии" },
              { step: "04", icon: "ThumbsUp", title: "Результат", desc: "Мебель высыхает за 2–4 часа и готова к использованию" },
            ].map((s) => (
              <Section key={s.step}>
                <div className="relative text-center">
                  <div className="font-oswald text-6xl font-bold text-emerald-50 leading-none select-none absolute -top-4 left-1/2 -translate-x-1/2">{s.step}</div>
                  <div className="relative pt-4">
                    <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-md shadow-emerald-200">
                      <Icon name={s.icon} size={24} className="text-white" fallback="Check" />
                    </div>
                    <h3 className="font-oswald text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Section>
            <div className="text-center mb-14">
              <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">Отзывы клиентов</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-gray-900 mt-2">ЧТО ГОВОРЯТ КЛИЕНТЫ</h2>
            </div>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <Section key={r.name}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Icon key={i} name="Star" size={15} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">«{r.text}»</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold">
                        {r.name[0]}
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">{r.name}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{r.date}</span>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <Section>
            <div className="text-center mb-14">
              <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">Вопросы и ответы</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-gray-900 mt-2">ЧАСТЫЕ ВОПРОСЫ</h2>
            </div>
          </Section>
          <div className="flex flex-col gap-3">
            {faq.map((item, i) => (
              <Section key={i}>
                <div
                  className="border border-gray-200 rounded-2xl overflow-hidden hover:border-emerald-300 transition-colors cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between px-6 py-4">
                    <span className="font-semibold text-gray-900 text-sm">{item.q}</span>
                    <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-emerald-500 flex-shrink-0 ml-3" />
                  </div>
                  {openFaq === i && (
                    <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="contact" className="py-24 bg-[#0a1f0f] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-green-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <Section>
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Связаться с нами</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mt-2 mb-4">ГОТОВЫ К ЧИСТОТЕ?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
              Напишите нам в MAX — ответим быстро, рассчитаем стоимость и назначим удобное время
            </p>
            {/* Согласие с ПД */}
            <label className="inline-flex items-start gap-3 cursor-pointer mb-6 text-left max-w-md mx-auto">
              <div
                onClick={() => setPdConsent(!pdConsent)}
                className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors cursor-pointer ${pdConsent ? "gradient-brand border-transparent" : "border-gray-600 bg-transparent"}`}
              >
                {pdConsent && <Icon name="Check" size={12} className="text-white" />}
              </div>
              <span className="text-gray-400 text-sm leading-snug">
                Я согласен(а) с{" "}
                <a href="#" className="text-emerald-400 hover:underline">обработкой персональных данных</a>{" "}
                в соответствии с Федеральным законом №152-ФЗ
              </span>
            </label>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={pdConsent ? MAX_LINK : undefined}
                target="_blank"
                rel="noopener noreferrer"
                onClick={!pdConsent ? (e) => { e.preventDefault(); setPdConsent(false); } : undefined}
                className={`btn-glow text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 ${pdConsent ? "gradient-brand hover:shadow-emerald-500/40 hover:shadow-xl hover:-translate-y-1" : "bg-gray-700 cursor-not-allowed opacity-60"}`}
                title={!pdConsent ? "Подтвердите согласие с обработкой персональных данных" : ""}
              >
                <Icon name="MessageCircle" size={22} />
                Написать в MAX
              </a>
              <a
                href="tel:+78612000000"
                className="flex items-center justify-center gap-3 border-2 border-emerald-400/40 text-emerald-300 font-bold text-lg px-10 py-5 rounded-2xl hover:bg-emerald-500/10 transition-all"
              >
                <Icon name="Phone" size={20} />
                Позвонить
              </a>
            </div>
            {!pdConsent && (
              <p className="text-amber-400/70 text-xs mt-3">Поставьте галочку выше, чтобы написать нам</p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Icon name="Mail" size={14} className="text-emerald-500" /> arenda-chistoty.ru@yandex.ru</span>
              <span className="flex items-center gap-1.5"><Icon name="Clock" size={14} className="text-emerald-500" /> Пн–Вс: 8:00–20:00</span>
            </div>
          </Section>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#061409] text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
              <Icon name="Sparkles" size={14} className="text-white" />
            </div>
            <span className="font-oswald text-base font-semibold text-white tracking-wide">АРЕНДА ЧИСТОТЫ</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-sm">
            <span>Краснодар, выезд по всему городу</span>
            <a href="tel:+78612000000" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
              +7 (861) 200-00-00
            </a>
            <a href="mailto:arenda-chistoty.ru@yandex.ru" className="text-emerald-400/70 hover:text-emerald-300 transition-colors text-xs">
              arenda-chistoty.ru@yandex.ru
            </a>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs">
            <span>Пн–Вс: 8:00–20:00</span>
            <a
              href={MAX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <Icon name="MessageCircle" size={13} /> Написать в MAX
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-600 mt-6">© 2025 Аренда Чистоты. Все права защищены.</div>
      </footer>

      {/* Sticky CTA */}
      <a
        href={MAX_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 gradient-brand rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center hover:scale-110 transition-transform animate-pulse-glow"
        title="Написать в MAX"
      >
        <Icon name="MessageCircle" size={22} className="text-white" />
      </a>

      {/* Cookie Banner */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-0 md:bottom-6 md:left-6 md:right-auto md:max-w-sm">
          <div className="bg-[#0a1f0f] border border-emerald-500/20 rounded-2xl p-5 shadow-2xl shadow-black/40 backdrop-blur-md">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Cookie" size={16} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">Мы используем cookie</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Сайт использует cookie-файлы для улучшения работы и анализа посещаемости. Продолжая использование сайта, вы соглашаетесь с{" "}
                  <a href="#" className="text-emerald-400 hover:underline">политикой конфиденциальности</a>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={acceptCookies}
                className="flex-1 gradient-brand text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Принять
              </button>
              <button
                onClick={acceptCookies}
                className="flex-1 border border-gray-600 text-gray-400 text-sm py-2.5 rounded-xl hover:border-gray-500 hover:text-gray-300 transition-colors"
              >
                Отклонить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}