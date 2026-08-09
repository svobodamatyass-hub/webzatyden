"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

export type Lang = "cs" | "en";

const copy = {
  cs: {
    nav: ["Ukázky", "Proces", "Ceník", "FAQ"], cta: "Ověřit volný termín", theme: "Přepnout barevný režim", language: "Jazyk", skip:"Přeskočit na obsah", navLabel:"Hlavní navigace", openMenu:"Otevřít menu", closeMenu:"Zavřít menu", benefitsLabel:"Hlavní výhody", portfolioLabel:"Ukázkové designové směry",
    eyebrow: "PROFESIONÁLNÍ WEB · DO 7 PRACOVNÍCH DNÍ", heroA: "Váš nový web.", heroB: "Za týden online.",
    lead: "Připravíme strukturu, upravíme texty, navrhneme vlastní vzhled a web spustíme. Předem znáte rozsah, cenu i termín.",
    showWork: "Prohlédnout ukázkové směry", trust: ["Pevná cena", "Bez skrytých poplatků", "30 dní podpory"],
    ticker: ["JASNÝ TERMÍN", "PEVNÁ CENA", "ČESKY A LIDSKY", "WEB, KTERÝ JE VÁŠ"],
    facts:[{value:"7 dní",label:"jasný harmonogram"},{value:"2 kola",label:"úprav v hlavním balíčku"},{value:"30 dní",label:"technická podpora"},{value:"Předání",label:"domluvených přístupů"}],
    workKicker: "01 / UKÁZKOVÉ SMĚRY", workTitle: "Tři směry. Každý s jinou náladou.", workText: "Nejde o hotové klientské projekty. Jsou to naše designové koncepty, které ukazují, jak může web reagovat na různé obory, značky a zákazníky.", demo: "Designový koncept", pause: "Pozastavit", play: "Přehrát",
    projects: [
      { type: "INTERIÉRY", title: "Studio Linie", line: "Prostor pro život.", sub: "Klidný web pro studio, které staví na detailu a důvěře." },
      { type: "ŘEMESLO", title: "Truhlářství Dub", line: "Poctivě na míru.", sub: "Materiál, proces a výsledek v hlavní roli." },
      { type: "PORADENSTVÍ", title: "Moudré finance", line: "Jasno v každém kroku.", sub: "Srozumitelná služba bez zbytečného finančního slovníku." },
    ],
    valueKicker: "02 / CO DOSTANETE", valueTitle: "Jeden plán. Jeden týden. Jeden hotový web.",
    values: [
      { title:"Slova, která fungují", text:"Vaši nabídku vysvětlíme krátce, lidsky a bez prázdných frází.", detail:"Od první věty po poslední tlačítko bude jasné, co nabízíte a proč se ozvat právě vám.", tags:["Struktura", "Texty", "Výzvy k akci"] },
      { title:"Design s charakterem", text:"Vizuál navrhneme pro vaši značku — ne podle univerzální šablony.", detail:"Barvy, písmo a prvky spojíme do jednoho systému, který je příjemný a snadno zapamatovatelný.", tags:["Barvy", "Typografie", "UI systém"] },
      { title:"Technika bez starostí", text:"Mobil, rychlost, formuláře, SEO základ i spuštění vyřešíme za vás.", detail:"Web otestujeme, zabezpečíme a připravíme tak, aby spolehlivě fungoval od prvního dne.", tags:["Responzivita", "Rychlost", "SEO"] },
    ],
    processKicker: "03 / JAK TO PROBÍHÁ", processTitle: "Sedm dní. Žádný chaos.", processText: "Přesně víte, co se děje a kdy vás potřebujeme.", processFacts:["2 kola úprav", "30 dní technické podpory"],
    days: [["01","Poznáme vás","Cíle, zákazníci a podklady."],["02","Poskládáme obsah","Struktura a hlavní sdělení."],["03","Ukážeme směr","První návrh a vaše reakce."],["04–05","Postavíme web","Stránky, mobil a formuláře."],["06","Doladíme","Kontrola a domluvené úpravy."],["07","Jdeme online","Spuštění a předání přístupů."]],
    fair: "Sedm dní počítáme od potvrzení rozsahu, dodání podkladů a úhrady zálohy.",
    pricingKicker: "04 / CENÍK", pricingTitle: "Jasný rozsah. Jasná cena.", pricingText: "Bez hodinových sazeb a překvapení na faktuře.", popular: "NEJČASTĚJŠÍ VOLBA", choose: "Vybrat", vat: "jednorázově", scopeNote:"Přesný rozsah a konečnou cenu potvrdíme před zahájením. Jakoukoli práci navíc nejdříve společně odsouhlasíme.",
    packages: [
      { name:"Start", price:"3 000 Kč", note:"Pro jednu jasnou nabídku", items:["Jedna dlouhá stránka","6–8 sekcí","Úprava textů","Kontaktní formulář"] },
      { name:"Web za týden", price:"5 000 Kč", note:"Pro většinu menších firem", items:["Až 5 stránek","Struktura a texty","Individuální design","2 kola úprav","30 dní podpory"] },
    ],
    promiseKicker:"05 / NAŠE DOHODA", promiseTitle:"Rychle neznamená narychlo.", promises:[["Termín pod kontrolou","Dostanete přesný harmonogram."],["Cena bez překvapení","Potvrzený rozsah cenu nezmění."],["Spuštění po schválení","Bez souhlasu nic nepouštíme."],["30 dní podpory","Po spuštění opravíme technické chyby v rámci schváleného rozsahu zdarma."]],
    faqKicker:"06 / ČASTÉ OTÁZKY", faqTitle:"Ptáte se. Odpovídáme rovnou.", faqHelp:"Týdenní režim nejlépe funguje pro jasně vymezený prezentační web. Složitější funkce nejdříve posoudíme a navrhneme realistický postup.", faqs:[["Může být kvalitní web hotový za týden?","Ano, pokud jde o jasně vymezený prezentační web a připomínky schvaluje jeden člověk. Rychlost stojí na systému, ne na zkratkách."],["Co když nemám texty ani fotografie?","Z vašich odpovědí připravíme strukturu, texty upravíme a doporučíme vhodný obrazový směr."],["Kolik úprav je v ceně?","Dvě soustředěná kola v domluvených bodech procesu. Změna schváleného zadání se řeší zvlášť."],["Budu web opravdu vlastnit?","Po doplacení vám předáme web a všechny přístupy zahrnuté v dohodnutém rozsahu. Způsob správy domény a hostingu si potvrdíme před zahájením."]],
    contactKicker:"07 / POJĎME ZAČÍT", contactTitle:"Za týden můžete mít hotovo.", contactText:"Nevíte, který balíček vybrat? Nevadí. Popište stručně svůj projekt a vhodný rozsah doporučíme v odpovědi.", contactStats:[["2 min","stručný brief"],["1 den","odpověď"],["7 dní","cesta online"]],
    goalLegend:"Co má web hlavně udělat?", goals:[["poptávky","Získávat poptávky"],["služby","Vysvětlit služby"],["rezervace","Umožnit rezervace"],["projekt","Představit projekt"]], sizeLegend:"Jak velký web potřebujete?", sizes:[["1","Jedna stránka"],["5","3–5 stránek"],["8","6–8 stránek"]], contactLegend:"Kam se můžeme ozvat?", selected:"Vybraný balíček", name:"Jméno", email:"E-mail", project:"Firma nebo projekt", message:"Co by měl nový web vyřešit?", optional:"nepovinné", privacy:"Údaje použijeme pouze k vyřízení poptávky a nebudeme je předávat dál.", send:"Odeslat nezávaznou poptávku", sending:"Odesílám…", formNote:"Bez závazků. Odpovíme do jednoho pracovního dne.", sent:"Děkujeme. Poptávku jsme bezpečně přijali.", sendError:"Poptávku se nepodařilo odeslat. Zkuste to prosím znovu.", previousDay:"Předchozí den", nextDay:"Další den", dayOf:"Den",
    footer:"Profesionální web. Za týden online.", explore:"PROZKOUMAT", concept:"Vaše údaje používáme pouze k vyřízení poptávky.", top:"Nahoru",
    quotes:[
      { label:"DESIGN, KTERÝ PRACUJE", lead:"Nejen hezký web.", accent:"Web, který si lidé zapamatují." },
      { label:"RYCHLOST BEZ ZKRATEK", lead:"Každý den má svůj krok.", accent:"Vy máte pořád klid." },
      { label:"FÉROVĚ OD ZAČÁTKU", lead:"Jasná cena.", accent:"Žádné malé písmo pod čarou." },
    ],
  },
  en: {
    nav:["Work","Process","Pricing","FAQ"], cta:"Check availability", theme:"Switch colour mode", language:"Language", skip:"Skip to content", navLabel:"Main navigation", openMenu:"Open menu", closeMenu:"Close menu", benefitsLabel:"Key benefits", portfolioLabel:"Concept design directions", eyebrow:"PROFESSIONAL WEBSITE · IN 7 WORKING DAYS", heroA:"Your new website.", heroB:"Online in one week.", lead:"We shape the structure, refine the copy, create a custom visual direction and launch the site. You know the scope, price and deadline in advance.", showWork:"Explore concept directions", trust:["Fixed price","No hidden fees","30 days support"], ticker:["CLEAR DEADLINE","FIXED PRICE","PLAIN LANGUAGE","A WEBSITE YOU OWN"],
    facts:[{value:"7 days",label:"clear schedule"},{value:"2 rounds",label:"included revisions"},{value:"30 days",label:"technical support"},{value:"Handover",label:"of agreed access"}],
    workKicker:"01 / CONCEPT DIRECTIONS", workTitle:"Three directions. Each with a different character.", workText:"These are not completed client projects. They are original design concepts showing how a website can adapt to different industries, brands and audiences.", demo:"Design concept", pause:"Pause", play:"Play", projects:[{type:"INTERIORS",title:"Studio Linie",line:"Space for living.",sub:"A calm website for a studio built on detail and trust."},{type:"CRAFT",title:"Oak Workshop",line:"Made honestly. Made to fit.",sub:"Material, process and outcome in the leading role."},{type:"CONSULTING",title:"Clear Finance",line:"Clarity at every step.",sub:"An understandable service without financial jargon."}],
    valueKicker:"02 / WHAT YOU GET", valueTitle:"One clear plan. One week. One finished website.", values:[
      { title:"Words that work", text:"We explain your offer clearly, naturally and without empty phrases.", detail:"From the first sentence to the final button, people understand what you offer and why they should contact you.", tags:["Structure", "Copy", "Calls to action"] },
      { title:"Design with character", text:"A visual system made for your brand — not a universal template.", detail:"Colour, type and interface elements become one memorable system that feels natural to use.", tags:["Colour", "Typography", "UI system"] },
      { title:"Technology handled", text:"Mobile, speed, forms, SEO foundations and launch are on us.", detail:"We test, secure and prepare the website to work reliably from its very first day.", tags:["Responsive", "Speed", "SEO"] },
    ],
    processKicker:"03 / THE PROCESS", processTitle:"Seven days. No chaos.", processText:"You always know what is happening and when we need you.", processFacts:["2 revision rounds", "30 days technical support"], days:[["01","We meet you","Goals, customers and materials."],["02","We shape content","Structure and core message."],["03","We show direction","First concept and your reaction."],["04–05","We build","Pages, mobile and forms."],["06","We refine","Review and agreed changes."],["07","We go live","Launch and access handover."]], fair:"Seven days start after scope confirmation, materials delivery and the deposit.",
    pricingKicker:"04 / PRICING", pricingTitle:"Clear scope. Clear price.", pricingText:"No hourly rates and no invoice surprises.", popular:"MOST POPULAR", choose:"Choose", vat:"one-off", scopeNote:"We confirm the exact scope and final price before work begins. Anything outside the agreed scope is discussed and approved first.", packages:[{name:"Start",price:"3 000 Kč",note:"For one clear offer",items:["One long page","6–8 sections","Copy refinement","Contact form"]},{name:"Website in a week",price:"5 000 Kč",note:"For most small businesses",items:["Up to 5 pages","Structure and copy","Custom design","2 revision rounds","30 days support"]}],
    promiseKicker:"05 / OUR AGREEMENT", promiseTitle:"Fast never means rushed.", promises:[["Deadline in control","You get a precise schedule."],["No price surprises","Confirmed scope stays fixed."],["Launch after approval","Nothing goes live without you."],["30 days support","After launch, we fix technical issues within the approved scope at no extra cost."]],
    faqKicker:"06 / FREQUENT QUESTIONS", faqTitle:"You ask. We answer directly.", faqHelp:"The one-week process works best for a clearly scoped presentation website. We assess more complex functionality first and propose a realistic process.", faqs:[["Can a quality website be ready in a week?","Yes, when the presentation site has a clear scope and one person approves feedback. Speed comes from the system, not shortcuts."],["What if I have no copy or photos?","We shape the structure from your answers, refine the copy and recommend a suitable visual direction."],["How many revisions are included?","Two focused rounds at agreed milestones. Changes to an approved brief are handled separately."],["Will I actually own the website?","After final payment, we hand over the website and every access credential included in the agreed scope. Domain and hosting management are confirmed before work begins."]],
    contactKicker:"07 / LET'S BEGIN", contactTitle:"You could be live next week.", contactText:"Not sure which plan fits? Briefly describe your project and we will recommend the suitable scope in our reply.", contactStats:[["2 min","short brief"],["1 day","reply"],["7 days","path to launch"]], goalLegend:"What should the website achieve?", goals:[["leads","Generate leads"],["services","Explain services"],["booking","Enable bookings"],["project","Launch a project"]], sizeLegend:"How large is the website?", sizes:[["1","One page"],["5","3–5 pages"],["8","6–8 pages"]], contactLegend:"Where can we reach you?", selected:"Selected plan", name:"Name", email:"Email", project:"Company or project", message:"What should the new website solve?", optional:"optional", privacy:"We use your details only to handle this enquiry and never sell them.", send:"Send a no-obligation enquiry", sending:"Sending…", formNote:"No obligation. We reply within one working day.", sent:"Thank you. Your enquiry has been securely received.", sendError:"We could not send the enquiry. Please try again.", previousDay:"Previous day", nextDay:"Next day", dayOf:"Day", footer:"Professional website. Online in one week.", explore:"EXPLORE", concept:"We use your details only to handle your enquiry.", top:"Back to top",
    quotes:[
      { label:"DESIGN THAT DOES ITS JOB", lead:"More than a beautiful website.", accent:"A website people remember." },
      { label:"SPEED WITHOUT SHORTCUTS", lead:"Every day has a clear step.", accent:"You stay in control." },
      { label:"FAIR FROM THE START", lead:"A clear price.", accent:"No small print underneath." },
    ],
  },
} as const;

function Logo() {
  return <span className="logo"><span className="logo-mark" aria-hidden="true"><i className="brand-dot" /></span><span className="logo-word">web<span>za</span><strong>týden</strong></span></span>;
}

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;
const Check = () => <span className="check" aria-hidden="true">✓</span>;

function RichHeading({ text }: { text: string }) {
  const separator = text.indexOf(". ");
  if (separator === -1) return <>{text}</>;
  return <><span>{text.slice(0, separator + 1)}</span> <em>{text.slice(separator + 2)}</em></>;
}

function QuoteBand({ quote, index, tone = "dark", compact = false }: { quote: { label: string; lead: string; accent: string }; index: number; tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <aside className={`quote-band quote-${tone}${compact ? " quote-compact" : ""}`} aria-label={quote.label} data-reveal>
      <div className="quote-meta"><span>0{index}</span>{quote.label}</div>
      <blockquote><strong>{quote.lead}</strong><em>{quote.accent}</em></blockquote>
    </aside>
  );
}

export default function HomeClient({ lang }: { lang: Lang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeProject, setActiveProject] = useState(0);
  const [portfolioPlaying, setPortfolioPlaying] = useState(true);
  const [activeDay, setActiveDay] = useState(0);
  const [goal, setGoal] = useState("0");
  const [size, setSize] = useState("5");
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [contactVisible, setContactVisible] = useState(false);
  const heroVisual = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavRef = useRef<HTMLAnchorElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const formStartedAt = useRef(0);
  const idempotencyKey = useRef<string | null>(null);
  const t = copy[lang];
  const portfolioNavigation = {
    cs: ["Předchozí ukázka", "Další ukázka"],
    en: ["Previous project", "Next project"],
  }[lang];

  useEffect(() => {
    formStartedAt.current = Date.now();
    const hydratePreferences = window.setTimeout(() => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    }, 0);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return () => clearTimeout(hydratePreferences);
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: .12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => { clearTimeout(hydratePreferences); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!portfolioPlaying || matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(max-width: 760px)").matches) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setActiveProject((current) => (current + 1) % t.projects.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [portfolioPlaying, t.projects.length]);

  useEffect(() => {
    if (!menuOpen) return;
    firstNavRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const element = contactRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), { threshold: .12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.classList.add("theme-transition");
    document.documentElement.dataset.theme = next;
    localStorage.setItem("wzt-theme", next);
    setTheme(next);
    window.setTimeout(() => document.documentElement.classList.remove("theme-transition"), 300);
  }

  function moveHero(event: PointerEvent<HTMLDivElement>) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || innerWidth < 760) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 18;
    heroVisual.current?.style.setProperty("--hero-x", `${x}px`);
    heroVisual.current?.style.setProperty("--hero-y", `${y}px`);
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setFormStatus("submitting");
    idempotencyKey.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey: idempotencyKey.current,
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("project"),
          message: data.get("message"),
          website: data.get("website"),
          goal,
          size,
          package: String(selectedPackage),
          locale: lang,
          startedAt: formStartedAt.current,
        }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({})) as { field?: string };
        const fieldName = error.field ? ({ name:"name", email:"email", company:"project", message:"message", goal:"goal", size:"size" } as Record<string,string>)[error.field] : undefined;
        if (fieldName) form.querySelector<HTMLElement>(`[name="${fieldName}"]`)?.focus();
        throw new Error("Request failed");
      }
      form.reset();
      idempotencyKey.current = null;
      formStartedAt.current = Date.now();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  const active = t.projects[activeProject];

  return (
    <>
      <a className="skip-link" href="#content">{t.skip}</a>
      <header className="site-header" lang={lang}>
        <a className="brand" href="#top" aria-label="webzatyden"><Logo /></a>
        <nav id="main-navigation" className={menuOpen ? "nav open" : "nav"} aria-label={t.navLabel}>
          {["#work", "#process", "#pricing", "#faq"].map((href, index) => <a ref={index === 0 ? firstNavRef : undefined} href={href} key={href} onClick={() => setMenuOpen(false)}>{t.nav[index]}</a>)}
        </nav>
        <div className="header-tools">
          <div className="language-switch" role="group" aria-label={t.language}>{(["cs","en"] as Lang[]).map((item) => <a key={item} href={item === "cs" ? "/" : "/en"} hrefLang={item} lang={item} aria-current={lang === item ? "page" : undefined}>{item.toUpperCase()}</a>)}</div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={t.theme} aria-pressed={theme === "dark"}><span className="sun">☼</span><span className="moon">◐</span></button>
          <a className="button button-small header-cta" href="#contact">{t.cta} <Arrow /></a>
        </div>
        <button ref={menuButtonRef} className="menu-button" aria-label={menuOpen ? t.closeMenu : t.openMenu} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <main id="content" lang={lang} tabIndex={-1}>

      <section className="hero section" id="top">
        <div className="hero-copy" data-reveal>
          <div className="eyebrow"><span className="pulse" />{t.eyebrow}</div>
          <h1>{t.heroA}<br /><em>{t.heroB}</em></h1>
          <p className="lead">{t.lead}</p>
          <div className="hero-actions"><a className="button" href="#contact">{t.cta} <Arrow /></a><a className="text-link" href="#work">{t.showWork} <span>↓</span></a></div>
          <div className="trust-line">{t.trust.map((item) => <span key={item}><Check />{item}</span>)}</div>
        </div>
        <div className="hero-visual" ref={heroVisual} onPointerMove={moveHero} onPointerLeave={() => { heroVisual.current?.style.setProperty("--hero-x", "0px"); heroVisual.current?.style.setProperty("--hero-y", "0px"); }} aria-hidden="true" data-reveal>
          <div className="browser-card"><div className="browser-top"><span/><span/><span/><small>yournewwebsite.com</small></div><div className="mini-site"><div className="mini-nav"><b>materia</b><i/><i/><i/></div><div className="mini-label">DESIGN FOR EVERYDAY LIFE</div><div className="mini-title">A better home<br/>starts with <em>an idea.</em></div><div className="mini-button">Explore the work</div><div className="chair-shape"><span/><i/></div></div></div>
          <div className="week-card"><span>PROJECT / 07 DAYS</span><div className="week-progress">{[1,2,3,4,5,6,7].map(n => <i key={n}/>)}</div><b>Ready to launch <Check /></b></div>
        </div>
      </section>

      <section className="ticker" aria-label={t.benefitsLabel}><div className="ticker-track"><span>{t.ticker.map(item => <b key={item}>{item}<i>✦</i></b>)}</span><span aria-hidden="true">{t.ticker.map(item => <b key={item}>{item}<i>✦</i></b>)}</span></div></section>
      <section className="facts-strip" aria-label={t.benefitsLabel}>{t.facts.map((fact,index)=><div key={fact.value} data-reveal style={{"--reveal-delay":`${index*55}ms`} as React.CSSProperties}><span>0{index+1}</span><b>{fact.value}</b><small>{fact.label}</small></div>)}</section>

      <section className="section work-section" id="work">
        <div className="section-heading split-heading" data-reveal><div><span className="kicker">{t.workKicker}</span><h2><RichHeading text={t.workTitle} /></h2></div><p>{t.workText}</p></div>
        <div className="showcase" data-reveal>
          <div className="project-selector" role="group" aria-label="Portfolio">
            {t.projects.map((project, index) => <button key={project.title} aria-pressed={activeProject === index} onClick={() => { setActiveProject(index); setPortfolioPlaying(false); }}><span>0{index+1}</span><b>{project.title}</b><small>{project.type}</small></button>)}
            <button className="play-control" onClick={() => setPortfolioPlaying(!portfolioPlaying)} aria-pressed={!portfolioPlaying}><span aria-hidden="true">{portfolioPlaying ? "Ⅱ" : "▶"}</span><b>{portfolioPlaying ? t.pause : t.play}</b></button>
          </div>
          <article className={`showcase-stage stage-${activeProject}`} key={`${lang}-${activeProject}`} aria-label={t.portfolioLabel}>
            <div className="portfolio-arrows">
              <button type="button" aria-label={portfolioNavigation[0]} onClick={() => { setActiveProject((activeProject - 1 + t.projects.length) % t.projects.length); setPortfolioPlaying(false); }}><span aria-hidden="true">←</span></button>
              <button type="button" aria-label={portfolioNavigation[1]} onClick={() => { setActiveProject((activeProject + 1) % t.projects.length); setPortfolioPlaying(false); }}><span aria-hidden="true">→</span></button>
            </div>
            <div className="stage-browser"><div className="stage-top"><span/><span/><span/><small>{active.title.toLowerCase().replaceAll(" ", "")}.cz</small></div><div className="stage-page"><div className="stage-nav"><b>{active.title}</b><span>Studio&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span></div><p>{active.type}</p><h3>{active.line}</h3><span className="stage-sub">{active.sub}</span><div className="stage-button">Explore <Arrow /></div><div className="stage-art"><i/><i/><i/></div></div></div>
            <div className="stage-meta"><span>{t.demo}</span><div className="stage-progress" aria-hidden="true">{t.projects.map((project,index)=><i className={index===activeProject?"active":""} key={project.title}/>)}</div><b>0{activeProject+1} / 03</b></div>
          </article>
        </div>
      </section>

      <QuoteBand quote={t.quotes[0]} index={1} />

      <section className="section value-section">
        <div className="section-heading centered" data-reveal><span className="kicker">{t.valueKicker}</span><h2><RichHeading text={t.valueTitle} /></h2></div>
        <div className="value-grid">{t.values.map((item,index) => <article key={item.title} data-reveal style={{"--reveal-delay":`${index*70}ms`} as React.CSSProperties}><div className="value-card-top"><span className="value-number">0{index+1}</span><div className={`value-symbol symbol-${index}`} aria-hidden="true">{index===0?"“":index===1?"✦":"</>"}</div></div><div className="value-copy"><h3>{item.title}</h3><p>{item.text}</p><p className="value-detail">{item.detail}</p></div><div className="value-tags">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div>
      </section>

      <section className="section process-section" id="process">
        <div className="process-intro" data-reveal><span className="kicker">{t.processKicker}</span><h2><RichHeading text={t.processTitle} /></h2><p>{t.processText}</p><div className="process-facts">{t.processFacts.map(item=><span key={item}><Check/>{item}</span>)}</div></div>
        <div className="process-panel" data-reveal><div className="day-tabs">{t.days.map((day,index)=><button key={day[0]} aria-pressed={activeDay===index} onClick={()=>setActiveDay(index)}><span>DAY</span><b>{day[0]}</b></button>)}</div><div className="process-mobile-nav"><button type="button" aria-label={t.previousDay} disabled={activeDay===0} onClick={()=>setActiveDay(current=>Math.max(0,current-1))}>←</button><div><span>{t.dayOf} {activeDay+1} / {t.days.length}</span><i><b style={{width:`${((activeDay+1)/t.days.length)*100}%`}} /></i></div><button type="button" aria-label={t.nextDay} disabled={activeDay===t.days.length-1} onClick={()=>setActiveDay(current=>Math.min(t.days.length-1,current+1))}>→</button></div><div className="day-detail" key={`${lang}-${activeDay}`} aria-live="polite"><div className={`giant-day${t.days[activeDay][0].length > 2 ? " is-range" : ""}`}>{t.days[activeDay][0]}</div><div><span>DAY {t.days[activeDay][0]}</span><h3>{t.days[activeDay][1]}</h3><p>{t.days[activeDay][2]}</p></div></div><p className="process-terms">{t.fair}</p></div>
      </section>

      <QuoteBand quote={t.quotes[1]} index={2} tone="light" compact />

      <section className="section pricing-section" id="pricing">
        <div className="section-heading split-heading" data-reveal><div><span className="kicker">{t.pricingKicker}</span><h2><RichHeading text={t.pricingTitle} /></h2></div><p>{t.pricingText}</p></div>
        <div className="pricing-grid">{t.packages.map((item,index)=><article className={index===1?"price-card featured-price":"price-card"} key={item.name} data-reveal style={{"--reveal-delay":`${index*70}ms`} as React.CSSProperties}>{index===1&&<span className="popular">{t.popular}</span>}<div><h3>{item.name}</h3><p>{item.note}</p></div><div className="price"><b>{item.price}</b><span>{t.vat}</span></div><ul>{item.items.map(line=><li key={line}><Check/>{line}</li>)}</ul><a className="button price-button" href="#contact" onClick={()=>setSelectedPackage(index)}>{t.choose} <Arrow/></a></article>)}</div><p className="pricing-note"><Check/>{t.scopeNote}</p>
      </section>

      <QuoteBand quote={t.quotes[2]} index={3} compact />

      <section className="section promise-section"><div className="promise-title" data-reveal><span className="kicker">{t.promiseKicker}</span><h2><RichHeading text={t.promiseTitle} /></h2></div><div className="promise-grid">{t.promises.map((item,index)=><article key={item[0]} data-reveal><span>0{index+1}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div></section>

      <section className="section faq-section" id="faq"><div className="faq-intro" data-reveal><span className="kicker">{t.faqKicker}</span><h2><RichHeading text={t.faqTitle} /></h2><p className="faq-help">{t.faqHelp}</p><a className="text-link" href="#contact">{t.cta}<Arrow/></a></div><div className="faq-list" data-reveal>{t.faqs.map(([question,answer],index)=><details key={question} open={index===0}><summary><span>0{index+1}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div></section>

      <section ref={contactRef} className="section contact-section" id="contact"><div className="contact-copy" data-reveal><span className="kicker">{t.contactKicker}</span><h2><RichHeading text={t.contactTitle} /></h2><p>{t.contactText}</p><div className="contact-numbers">{t.contactStats.map(([value,label])=><span key={value}><b>{value}</b>{label}</span>)}</div></div><form className="lead-form" onSubmit={submitLead} aria-busy={formStatus==="submitting"} data-reveal><fieldset className="form-section"><legend className="form-label">{t.goalLegend}</legend><div className="choice-grid">{t.goals.map(([,label],index)=><label key={label}><input type="radio" name="goal" checked={goal===String(index)} onChange={()=>setGoal(String(index))}/><span>{label}</span></label>)}</div></fieldset><fieldset className="form-section"><legend className="form-label">{t.sizeLegend}</legend><div className="choice-grid choice-three">{t.sizes.map(([value,label])=><label key={value}><input type="radio" name="size" checked={size===value} onChange={()=>setSize(value)}/><span>{label}</span></label>)}</div></fieldset><fieldset className="form-section form-contact"><legend className="form-label">{t.contactLegend}</legend><p className="selected-package">{t.selected}: <strong>{t.packages[selectedPackage].name}</strong></p><div className="field-grid"><label>{t.name}<input name="name" autoComplete="name" minLength={2} maxLength={100} required/></label><label>{t.email}<input name="email" autoComplete="email" inputMode="email" type="email" maxLength={254} required/></label><label className="full-field">{t.project}<input name="project" autoComplete="organization" minLength={2} maxLength={120} required/></label><label className="full-field">{t.message} <small>{t.optional}</small><textarea name="message" maxLength={1500} rows={4}/></label></div></fieldset><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label><p className="privacy-note"><span aria-hidden="true">✓</span>{t.privacy}</p><button className="button form-button" type="submit" disabled={formStatus==="submitting"}>{formStatus==="submitting"?t.sending:t.send}<Arrow/></button><p className={`form-note ${formStatus}`} aria-live="polite">{formStatus==="success"?t.sent:formStatus==="error"?t.sendError:t.formNote}</p></form></section>

      </main>

      <footer lang={lang}><div className="footer-brand"><a className="brand" href="#top"><Logo/></a><p>{t.footer}</p></div><div className="footer-links"><div><b>{t.explore}</b><a href="#work">{t.nav[0]}</a><a href="#process">{t.nav[1]}</a><a href="#pricing">{t.nav[2]}</a><a href="#faq">FAQ</a></div><div><b>CONTACT</b><a href="mailto:poptavka@webzatyden.cz">poptavka@webzatyden.cz</a><span>Europe / Prague</span></div></div><div className="footer-bottom"><span>© 2026 webzatyden</span><span>{t.concept}</span><a href="#top">{t.top} ↑</a></div></footer>
      <a className={`mobile-cta${contactVisible ? " hidden" : ""}`} href="#contact">{t.cta}<Arrow/></a>
    </>
  );
}
