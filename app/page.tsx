"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

type Lang = "cs" | "en" | "de";

const copy = {
  cs: {
    nav: ["Ukázky", "Proces", "Ceník", "FAQ"], cta: "Chci web", theme: "Přepnout barevný režim", language: "Jazyk",
    eyebrow: "PROFESIONÁLNÍ WEB · DO 7 PRACOVNÍCH DNÍ", heroA: "Váš nový web.", heroB: "Za týden online.",
    lead: "Navrhneme strukturu, upravíme texty, vytvoříme design a web spustíme. Vy nám řeknete pár věcí — o zbytek se postaráme.",
    showWork: "Prohlédnout ukázky", trust: ["Pevná cena", "Bez skrytých poplatků", "30 dní podpory"],
    ticker: ["JASNÝ TERMÍN", "PEVNÁ CENA", "ČESKY A LIDSKY", "WEB, KTERÝ JE VÁŠ"],
    workKicker: "01 / VYBRANÉ SMĚRY", workTitle: "Weby, které se neztratí.", workText: "Každý obor potřebuje jiný rytmus a hlas. Prohlédněte si tři živé směry — ukázka se automaticky mění.", demo: "Ukázkový koncept", pause: "Pozastavit", play: "Přehrát",
    projects: [
      { type: "INTERIÉRY", title: "Studio Linie", line: "Prostor pro život.", sub: "Klidný web pro studio, které staví na detailu a důvěře." },
      { type: "ŘEMESLO", title: "Truhlářství Dub", line: "Poctivě na míru.", sub: "Materiál, proces a výsledek v hlavní roli." },
      { type: "PORADENSTVÍ", title: "Moudré finance", line: "Jasno v každém kroku.", sub: "Srozumitelná služba bez zbytečného finančního slovníku." },
    ],
    valueKicker: "02 / CO DOSTANETE", valueTitle: "Jeden tým. Jeden týden. Jeden hotový web.",
    values: [["Slova, která fungují", "Vaši nabídku vysvětlíme krátce, lidsky a bez prázdných frází."],["Design s charakterem", "Vizuál navrhneme pro vaši značku — ne podle univerzální šablony."],["Technika bez starostí", "Mobil, rychlost, formuláře, SEO základ i spuštění vyřešíme za vás."]],
    processKicker: "03 / JAK TO PROBÍHÁ", processTitle: "Sedm dní. Žádný chaos.", processText: "Přesně víte, co se děje a kdy vás potřebujeme.",
    days: [["01","Poznáme vás","Cíle, zákazníci a podklady."],["02","Poskládáme obsah","Struktura a hlavní sdělení."],["03","Ukážeme směr","První návrh a vaše reakce."],["04–05","Postavíme web","Stránky, mobil a formuláře."],["06","Doladíme","Kontrola a domluvené úpravy."],["07","Jdeme online","Spuštění a předání přístupů."]],
    fair: "Sedm dní počítáme od potvrzení rozsahu, dodání podkladů a úhrady zálohy.",
    pricingKicker: "04 / CENÍK", pricingTitle: "Jasný rozsah. Jasná cena.", pricingText: "Bez hodinových sazeb a překvapení na faktuře.", popular: "NEJČASTĚJŠÍ VOLBA", choose: "Vybrat", vat: "bez DPH · jednorázově",
    packages: [
      { name:"Start", price:"29 900 Kč", note:"Pro jednu jasnou nabídku", items:["Jedna dlouhá stránka","6–8 sekcí","Úprava textů","Kontaktní formulář"] },
      { name:"Web za týden", price:"49 900 Kč", note:"Pro většinu menších firem", items:["Až 5 stránek","Struktura a texty","Individuální design","2 kola úprav","30 dní podpory"] },
      { name:"Plus", price:"69 900 Kč", note:"Pro širší nabídku služeb", items:["Až 8 stránek","Vše z hlavního balíčku","Jedna rozšířená funkce","Prioritní péče"] },
    ],
    promiseKicker:"05 / NAŠE DOHODA", promiseTitle:"Rychle neznamená narychlo.", promises:[["Termín pod kontrolou","Dostanete přesný harmonogram."],["Cena bez překvapení","Potvrzený rozsah cenu nezmění."],["Spuštění po schválení","Bez souhlasu nic nepouštíme."],["30 dní podpory","Technické chyby opravíme zdarma."]],
    faqKicker:"06 / ČASTÉ OTÁZKY", faqTitle:"Ptáte se. Odpovídáme rovnou.", faqs:[["Může být kvalitní web hotový za týden?","Ano, pokud jde o jasně vymezený prezentační web a připomínky schvaluje jeden člověk. Rychlost stojí na systému, ne na zkratkách."],["Co když nemám texty ani fotografie?","Z vašich odpovědí připravíme strukturu, texty upravíme a doporučíme vhodný obrazový směr."],["Kolik úprav je v ceně?","Dvě soustředěná kola v domluvených bodech procesu. Změna schváleného zadání se řeší zvlášť."],["Budu web opravdu vlastnit?","Ano. Po doplacení získáte web, doménu i všechny domluvené přístupy."]],
    contactKicker:"07 / POJĎME ZAČÍT", contactTitle:"Za týden můžete mít hotovo.", contactText:"Napište nám tři základní informace. Do jednoho pracovního dne potvrdíme, zda váš projekt sedí do týdenního režimu.",
    goalLegend:"Co má web hlavně udělat?", goals:[["poptávky","Získávat poptávky"],["služby","Vysvětlit služby"],["rezervace","Umožnit rezervace"],["projekt","Představit projekt"]], sizeLegend:"Jak velký web potřebujete?", sizes:[["1","Jedna stránka"],["5","3–5 stránek"],["8","6–8 stránek"]], contactLegend:"Kam se můžeme ozvat?", selected:"Vybraný balíček", name:"Jméno", email:"E-mail", project:"Firma nebo projekt", send:"Připravit e-mail s poptávkou", formNote:"Nezávazně. Tlačítko otevře připravenou zprávu ve vašem e-mailu.", sent:"Zpráva je připravená — stačí ji odeslat.",
    footer:"Profesionální web. Za týden online.", explore:"PROZKOUMAT", concept:"Produktový koncept · údaje budou doplněny před ostrým spuštěním.", top:"Nahoru",
  },
  en: {
    nav:["Work","Process","Pricing","FAQ"], cta:"Start a website", theme:"Switch colour mode", language:"Language", eyebrow:"PROFESSIONAL WEBSITE · IN 7 WORKING DAYS", heroA:"Your new website.", heroB:"Online in one week.", lead:"We shape the structure, refine the copy, create the design and launch the site. You tell us a few things — we handle the rest.", showWork:"View our work", trust:["Fixed price","No hidden fees","30 days support"], ticker:["CLEAR DEADLINE","FIXED PRICE","PLAIN LANGUAGE","A WEBSITE YOU OWN"],
    workKicker:"01 / SELECTED DIRECTIONS", workTitle:"Websites made to be remembered.", workText:"Every business needs its own rhythm and voice. Explore three live directions — the showcase changes automatically.", demo:"Concept project", pause:"Pause", play:"Play", projects:[{type:"INTERIORS",title:"Studio Linie",line:"Space for living.",sub:"A calm website for a studio built on detail and trust."},{type:"CRAFT",title:"Oak Workshop",line:"Made honestly. Made to fit.",sub:"Material, process and outcome in the leading role."},{type:"CONSULTING",title:"Clear Finance",line:"Clarity at every step.",sub:"An understandable service without financial jargon."}],
    valueKicker:"02 / WHAT YOU GET", valueTitle:"One team. One week. One finished website.", values:[["Words that work","We explain your offer clearly, naturally and without empty phrases."],["Design with character","A visual system made for your brand — not a universal template."],["Technology handled","Mobile, speed, forms, SEO foundations and launch are on us."]],
    processKicker:"03 / THE PROCESS", processTitle:"Seven days. No chaos.", processText:"You always know what is happening and when we need you.", days:[["01","We meet you","Goals, customers and materials."],["02","We shape content","Structure and core message."],["03","We show direction","First concept and your reaction."],["04–05","We build","Pages, mobile and forms."],["06","We refine","Review and agreed changes."],["07","We go live","Launch and access handover."]], fair:"Seven days start after scope confirmation, materials delivery and the deposit.",
    pricingKicker:"04 / PRICING", pricingTitle:"Clear scope. Clear price.", pricingText:"No hourly rates and no invoice surprises.", popular:"MOST POPULAR", choose:"Choose", vat:"excl. VAT · one-off", packages:[{name:"Start",price:"29 900 Kč",note:"For one clear offer",items:["One long page","6–8 sections","Copy refinement","Contact form"]},{name:"Website in a week",price:"49 900 Kč",note:"For most small businesses",items:["Up to 5 pages","Structure and copy","Custom design","2 revision rounds","30 days support"]},{name:"Plus",price:"69 900 Kč",note:"For a broader offer",items:["Up to 8 pages","Everything in the core plan","One advanced feature","Priority care"]}],
    promiseKicker:"05 / OUR AGREEMENT", promiseTitle:"Fast never means rushed.", promises:[["Deadline in control","You get a precise schedule."],["No price surprises","Confirmed scope stays fixed."],["Launch after approval","Nothing goes live without you."],["30 days support","Technical issues are fixed free."]],
    faqKicker:"06 / FREQUENT QUESTIONS", faqTitle:"You ask. We answer directly.", faqs:[["Can a quality website be ready in a week?","Yes, when the presentation site has a clear scope and one person approves feedback. Speed comes from the system, not shortcuts."],["What if I have no copy or photos?","We shape the structure from your answers, refine the copy and recommend a suitable visual direction."],["How many revisions are included?","Two focused rounds at agreed milestones. Changes to an approved brief are handled separately."],["Will I actually own the website?","Yes. After final payment, you receive the website, domain and all agreed access."]],
    contactKicker:"07 / LET'S BEGIN", contactTitle:"You could be live next week.", contactText:"Share three essentials. Within one working day we confirm whether your project fits the one-week process.", goalLegend:"What should the website achieve?", goals:[["leads","Generate leads"],["services","Explain services"],["booking","Enable bookings"],["project","Launch a project"]], sizeLegend:"How large is the website?", sizes:[["1","One page"],["5","3–5 pages"],["8","6–8 pages"]], contactLegend:"Where can we reach you?", selected:"Selected plan", name:"Name", email:"Email", project:"Company or project", send:"Prepare enquiry email", formNote:"No obligation. The button opens a prepared message in your email app.", sent:"Your message is ready — just send it.", footer:"Professional website. Online in one week.", explore:"EXPLORE", concept:"Product concept · details will be added before public launch.", top:"Back to top",
  },
  de: {
    nav:["Projekte","Ablauf","Preise","FAQ"], cta:"Website starten", theme:"Farbmodus wechseln", language:"Sprache", eyebrow:"PROFESSIONELLE WEBSITE · IN 7 ARBEITSTAGEN", heroA:"Ihre neue Website.", heroB:"In einer Woche online.", lead:"Wir entwickeln Struktur, Texte und Design und bringen Ihre Website online. Sie beantworten ein paar Fragen — wir kümmern uns um den Rest.", showWork:"Projekte ansehen", trust:["Fester Preis","Keine versteckten Kosten","30 Tage Support"], ticker:["KLARER TERMIN","FESTER PREIS","EINFACHE SPRACHE","IHRE EIGENE WEBSITE"],
    workKicker:"01 / AUSGEWÄHLTE RICHTUNGEN", workTitle:"Websites, die in Erinnerung bleiben.", workText:"Jede Branche braucht ihren eigenen Rhythmus. Entdecken Sie drei lebendige Richtungen — die Vorschau wechselt automatisch.", demo:"Konzeptprojekt", pause:"Pausieren", play:"Abspielen", projects:[{type:"INTERIEUR",title:"Studio Linie",line:"Raum zum Leben.",sub:"Eine ruhige Website für ein Studio, das auf Detail und Vertrauen baut."},{type:"HANDWERK",title:"Werkstatt Eiche",line:"Ehrlich nach Maß.",sub:"Material, Prozess und Ergebnis stehen im Mittelpunkt."},{type:"BERATUNG",title:"Klare Finanzen",line:"Klarheit bei jedem Schritt.",sub:"Verständliche Beratung ohne unnötige Fachsprache."}],
    valueKicker:"02 / WAS SIE BEKOMMEN", valueTitle:"Ein Team. Eine Woche. Eine fertige Website.", values:[["Texte, die wirken","Wir erklären Ihr Angebot klar, menschlich und ohne leere Phrasen."],["Design mit Charakter","Ein visueller Auftritt für Ihre Marke — keine Standardschablone."],["Technik ohne Sorgen","Mobil, Geschwindigkeit, Formulare, SEO-Basis und Start übernehmen wir."]],
    processKicker:"03 / DER ABLAUF", processTitle:"Sieben Tage. Kein Chaos.", processText:"Sie wissen immer, was passiert und wann wir Sie brauchen.", days:[["01","Wir lernen Sie kennen","Ziele, Kunden und Unterlagen."],["02","Wir ordnen Inhalte","Struktur und Kernbotschaft."],["03","Wir zeigen die Richtung","Erster Entwurf und Feedback."],["04–05","Wir bauen","Seiten, Mobil und Formulare."],["06","Wir verfeinern","Kontrolle und Änderungen."],["07","Wir gehen online","Start und Übergabe."]], fair:"Die sieben Tage beginnen nach Bestätigung, Unterlagen und Anzahlung.",
    pricingKicker:"04 / PREISE", pricingTitle:"Klarer Umfang. Klarer Preis.", pricingText:"Keine Stundensätze und keine Überraschungen.", popular:"BELIEBTESTE WAHL", choose:"Wählen", vat:"zzgl. MwSt. · einmalig", packages:[{name:"Start",price:"29 900 Kč",note:"Für ein klares Angebot",items:["Eine lange Seite","6–8 Abschnitte","Textoptimierung","Kontaktformular"]},{name:"Website in einer Woche",price:"49 900 Kč",note:"Für die meisten kleinen Firmen",items:["Bis zu 5 Seiten","Struktur und Texte","Individuelles Design","2 Korrekturrunden","30 Tage Support"]},{name:"Plus",price:"69 900 Kč",note:"Für ein breiteres Angebot",items:["Bis zu 8 Seiten","Alles aus dem Hauptpaket","Eine erweiterte Funktion","Priorisierte Betreuung"]}],
    promiseKicker:"05 / UNSERE VEREINBARUNG", promiseTitle:"Schnell heißt nie hastig.", promises:[["Termin unter Kontrolle","Sie erhalten einen genauen Plan."],["Preis ohne Überraschungen","Der Umfang bleibt fest."],["Start nach Freigabe","Nichts geht ohne Sie online."],["30 Tage Support","Technische Fehler beheben wir gratis."]],
    faqKicker:"06 / HÄUFIGE FRAGEN", faqTitle:"Sie fragen. Wir antworten direkt.", faqs:[["Kann eine gute Website in einer Woche fertig sein?","Ja, wenn die Präsentationswebsite klar abgegrenzt ist und eine Person Feedback freigibt. Das Tempo kommt vom System, nicht von Abkürzungen."],["Was, wenn ich keine Texte oder Fotos habe?","Aus Ihren Antworten entwickeln wir Struktur, überarbeiten Texte und empfehlen eine passende Bildsprache."],["Wie viele Änderungen sind enthalten?","Zwei konzentrierte Runden an vereinbarten Punkten. Änderungen am freigegebenen Briefing werden separat behandelt."],["Gehört die Website wirklich mir?","Ja. Nach Abschluss erhalten Sie Website, Domain und alle vereinbarten Zugänge."]],
    contactKicker:"07 / STARTEN WIR", contactTitle:"Nächste Woche könnten Sie online sein.", contactText:"Nennen Sie uns drei Grundlagen. Innerhalb eines Arbeitstages bestätigen wir, ob Ihr Projekt passt.", goalLegend:"Was soll die Website erreichen?", goals:[["anfragen","Anfragen gewinnen"],["leistungen","Leistungen erklären"],["buchung","Buchungen ermöglichen"],["projekt","Projekt vorstellen"]], sizeLegend:"Wie groß soll die Website sein?", sizes:[["1","Eine Seite"],["5","3–5 Seiten"],["8","6–8 Seiten"]], contactLegend:"Wie erreichen wir Sie?", selected:"Gewähltes Paket", name:"Name", email:"E-Mail", project:"Firma oder Projekt", send:"Anfrage-E-Mail vorbereiten", formNote:"Unverbindlich. Der Button öffnet eine vorbereitete Nachricht in Ihrer E-Mail-App.", sent:"Die Nachricht ist vorbereitet — einfach absenden.", footer:"Professionelle Website. In einer Woche online.", explore:"ENTDECKEN", concept:"Produktkonzept · Angaben folgen vor dem öffentlichen Start.", top:"Nach oben",
  },
} as const;

function Logo() {
  return <span className="logo"><span className="logo-mark" aria-hidden="true"><i className="brand-dot" /></span><span className="logo-word">web<span>za</span><strong>týden</strong></span></span>;
}

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;
const Check = () => <span className="check" aria-hidden="true">✓</span>;

export default function Home() {
  const [lang, setLang] = useState<Lang>("cs");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeProject, setActiveProject] = useState(0);
  const [portfolioPlaying, setPortfolioPlaying] = useState(true);
  const [activeDay, setActiveDay] = useState(0);
  const [goal, setGoal] = useState("0");
  const [size, setSize] = useState("5");
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [sent, setSent] = useState(false);
  const heroVisual = useRef<HTMLDivElement>(null);
  const t = copy[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem("wzt-lang") as Lang | null;
    const hydratePreferences = window.setTimeout(() => {
      if (savedLang && savedLang in copy) setLang(savedLang);
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
    localStorage.setItem("wzt-lang", lang);
  }, [lang]);

  useEffect(() => {
    if (!portfolioPlaying || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setActiveProject((current) => (current + 1) % t.projects.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [portfolioPlaying, t.projects.length]);

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

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Web enquiry – ${data.get("project") || "new project"}`);
    const body = encodeURIComponent(`${t.selected}: ${t.packages[selectedPackage].name}\n${t.goalLegend}: ${t.goals[Number(goal)][1]}\n${t.sizeLegend}: ${size}\n${t.name}: ${data.get("name")}\n${t.email}: ${data.get("email")}\n${t.project}: ${data.get("project")}`);
    window.location.href = `mailto:poptavka@webzatyden.cz?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const active = t.projects[activeProject];

  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="webzatyden"><Logo /></a>
        <nav id="main-navigation" className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          {["#work", "#process", "#pricing", "#faq"].map((href, index) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{t.nav[index]}</a>)}
        </nav>
        <div className="header-tools">
          <div className="language-switch" aria-label={t.language}>{(["cs","en","de"] as Lang[]).map((item) => <button key={item} aria-pressed={lang === item} onClick={() => setLang(item)}>{item.toUpperCase()}</button>)}</div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={t.theme} aria-pressed={theme === "dark"}><span className="sun">☼</span><span className="moon">◐</span></button>
          <a className="button button-small header-cta" href="#contact">{t.cta} <Arrow /></a>
        </div>
        <button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

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

      <div id="content" />
      <section className="ticker" aria-label="Benefits"><div className="ticker-track"><span>{t.ticker.map(item => <b key={item}>{item}<i>✦</i></b>)}</span><span aria-hidden="true">{t.ticker.map(item => <b key={item}>{item}<i>✦</i></b>)}</span></div></section>

      <section className="section work-section" id="work">
        <div className="section-heading split-heading" data-reveal><div><span className="kicker">{t.workKicker}</span><h2>{t.workTitle}</h2></div><p>{t.workText}</p></div>
        <div className="showcase" data-reveal>
          <div className="project-selector" role="tablist" aria-label="Portfolio">
            {t.projects.map((project, index) => <button key={project.title} role="tab" aria-selected={activeProject === index} onClick={() => { setActiveProject(index); setPortfolioPlaying(false); }}><span>0{index+1}</span><b>{project.title}</b><small>{project.type}</small></button>)}
            <button className="play-control" onClick={() => setPortfolioPlaying(!portfolioPlaying)} aria-pressed={!portfolioPlaying}>{portfolioPlaying ? "Ⅱ" : "▶"} {portfolioPlaying ? t.pause : t.play}</button>
          </div>
          <article className={`showcase-stage stage-${activeProject}`} key={`${lang}-${activeProject}`}>
            <div className="stage-browser"><div className="stage-top"><span/><span/><span/><small>{active.title.toLowerCase().replaceAll(" ", "")}.cz</small></div><div className="stage-page"><div className="stage-nav"><b>{active.title}</b><span>Studio&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span></div><p>{active.type}</p><h3>{active.line}</h3><span className="stage-sub">{active.sub}</span><div className="stage-button">Explore <Arrow /></div><div className="stage-art"><i/><i/><i/></div></div></div>
            <div className="stage-meta"><span>{t.demo}</span><b>0{activeProject+1} / 03</b></div>
          </article>
        </div>
      </section>

      <section className="section value-section">
        <div className="section-heading centered" data-reveal><span className="kicker">{t.valueKicker}</span><h2>{t.valueTitle}</h2></div>
        <div className="value-grid">{t.values.map((item,index) => <article key={item[0]} data-reveal style={{"--reveal-delay":`${index*70}ms`} as React.CSSProperties}><span>0{index+1}</span><div className="value-symbol">{index===0?"Aa":index===1?"◒":"↗"}</div><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div>
      </section>

      <section className="section process-section" id="process">
        <div className="process-intro" data-reveal><span className="kicker">{t.processKicker}</span><h2>{t.processTitle}</h2><p>{t.processText}</p></div>
        <div className="process-panel" data-reveal><div className="day-tabs">{t.days.map((day,index)=><button key={day[0]} aria-pressed={activeDay===index} onClick={()=>setActiveDay(index)}><span>DAY</span><b>{day[0]}</b></button>)}</div><div className="day-detail" key={`${lang}-${activeDay}`} aria-live="polite"><div className="giant-day">{t.days[activeDay][0]}</div><div><span>DAY {t.days[activeDay][0]}</span><h3>{t.days[activeDay][1]}</h3><p>{t.days[activeDay][2]}</p></div></div><p className="process-terms">{t.fair}</p></div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="section-heading split-heading" data-reveal><div><span className="kicker">{t.pricingKicker}</span><h2>{t.pricingTitle}</h2></div><p>{t.pricingText}</p></div>
        <div className="pricing-grid">{t.packages.map((item,index)=><article className={index===1?"price-card featured-price":"price-card"} key={item.name} data-reveal style={{"--reveal-delay":`${index*70}ms`} as React.CSSProperties}>{index===1&&<span className="popular">{t.popular}</span>}<div><h3>{item.name}</h3><p>{item.note}</p></div><div className="price"><b>{item.price}</b><span>{t.vat}</span></div><ul>{item.items.map(line=><li key={line}><Check/>{line}</li>)}</ul><a className="button price-button" href="#contact" onClick={()=>setSelectedPackage(index)}>{t.choose} <Arrow/></a></article>)}</div>
      </section>

      <section className="section promise-section"><div className="promise-title" data-reveal><span className="kicker">{t.promiseKicker}</span><h2>{t.promiseTitle}</h2></div><div className="promise-grid">{t.promises.map((item,index)=><article key={item[0]} data-reveal><span>0{index+1}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div></section>

      <section className="section faq-section" id="faq"><div className="faq-intro" data-reveal><span className="kicker">{t.faqKicker}</span><h2>{t.faqTitle}</h2></div><div className="faq-list" data-reveal>{t.faqs.map(([question,answer],index)=><details key={question} open={index===0}><summary><span>0{index+1}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></section>

      <section className="section contact-section" id="contact"><div className="contact-copy" data-reveal><span className="kicker">{t.contactKicker}</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="contact-numbers"><span><b>2 min</b>brief</span><span><b>1 day</b>reply</span><span><b>7 days</b>online</span></div></div><form className="lead-form" onSubmit={submitLead} data-reveal><fieldset><legend><span>1</span>{t.goalLegend}</legend><div className="choice-grid">{t.goals.map(([,label],index)=><label key={label}><input type="radio" name="goal" checked={goal===String(index)} onChange={()=>setGoal(String(index))}/><span>{label}</span></label>)}</div></fieldset><fieldset><legend><span>2</span>{t.sizeLegend}</legend><div className="choice-grid choice-three">{t.sizes.map(([value,label])=><label key={value}><input type="radio" name="size" checked={size===value} onChange={()=>setSize(value)}/><span>{label}</span></label>)}</div></fieldset><fieldset><legend><span>3</span>{t.contactLegend}</legend><p className="selected-package">{t.selected}: <strong>{t.packages[selectedPackage].name}</strong></p><div className="field-grid"><label>{t.name}<input name="name" autoComplete="name" required/></label><label>{t.email}<input name="email" autoComplete="email" type="email" required/></label><label className="full-field">{t.project}<input name="project" autoComplete="organization" required/></label></div></fieldset><button className="button form-button" type="submit">{t.send}<Arrow/></button><p className="form-note" aria-live="polite">{t.formNote}{sent&&<strong>{t.sent}</strong>}</p></form></section>

      <footer><div className="footer-brand"><a className="brand" href="#top"><Logo/></a><p>{t.footer}</p></div><div className="footer-links"><div><b>{t.explore}</b><a href="#work">{t.nav[0]}</a><a href="#process">{t.nav[1]}</a><a href="#pricing">{t.nav[2]}</a><a href="#faq">FAQ</a></div><div><b>CONTACT</b><a href="mailto:poptavka@webzatyden.cz">poptavka@webzatyden.cz</a><span>Europe / Prague</span></div></div><div className="footer-bottom"><span>© 2026 webzatyden</span><span>{t.concept}</span><a href="#top">{t.top} ↑</a></div></footer>
      <a className="mobile-cta" href="#contact">{t.cta}<Arrow/></a>
    </main>
  );
}
