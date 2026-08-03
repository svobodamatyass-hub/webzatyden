"use client";

import { FormEvent, useState } from "react";

const Arrow = () => <span aria-hidden="true">↗</span>;

const Check = () => <span className="check" aria-hidden="true">✓</span>;

const work = [
  {
    type: "SLUŽBY",
    title: "Studio Linie",
    subtitle: "Klidný prostor pro interiéry, které dávají smysl.",
    accent: "project-linie",
    tag: "Ukázkový koncept",
  },
  {
    type: "ŘEMESLO",
    title: "Truhlářství Dub",
    subtitle: "Nábytek na míru. Poctivě, od návrhu po montáž.",
    accent: "project-dub",
    tag: "Ukázkový koncept",
  },
  {
    type: "PORADENSTVÍ",
    title: "Moudré finance",
    subtitle: "Financím konečně rozumíte. A víte, co dál.",
    accent: "project-finance",
    tag: "Ukázkový koncept",
  },
];

const packages = [
  {
    name: "Start",
    price: "29 900 Kč",
    note: "Pro jednu jasnou nabídku",
    items: ["Jedna dlouhá stránka", "6–8 přehledných sekcí", "Úprava dodaných textů", "Kontaktní formulář"],
  },
  {
    name: "Web za týden",
    price: "49 900 Kč",
    note: "Pro většinu menších firem",
    featured: true,
    items: ["Až 5 samostatných stránek", "Návrh struktury a textů", "Individuální vizuální směr", "2 kola úprav", "Zaškolení a 30 dní podpory"],
  },
  {
    name: "Plus",
    price: "69 900 Kč",
    note: "Pro širší nabídku služeb",
    items: ["Až 8 samostatných stránek", "Vše z hlavního balíčku", "Jedna rozšířená funkce", "Prioritní následná péče"],
  },
];

const days = [
  ["01", "Poznáme vás", "Cíle, zákazníci a vše, co už máte."],
  ["02", "Poskládáme obsah", "Struktura webu a hlavní sdělení."],
  ["03", "Ukážeme směr", "První návrh a vaše soustředěná zpětná vazba."],
  ["04–05", "Postavíme web", "Všechny stránky, mobil i formuláře."],
  ["06", "Doladíme", "Společná kontrola a domluvené úpravy."],
  ["07", "Jdeme online", "Spuštění, kontrola a předání přístupů."],
];

const faqs = [
  ["Opravdu může být kvalitní web hotový za týden?", "Ano, pokud jde o jasně vymezený prezentační web a připomínky schvaluje jeden člověk. Rychlost stojí na připraveném procesu, ne na zkratkách. Pokud je projekt větší, řekneme to předem."],
  ["Kdy začne sedm dní běžet?", "Ve chvíli, kdy potvrdíme rozsah, obdržíme zálohu a máme potřebné podklady. Start i datum spuštění uvidíte v jednoduchém harmonogramu."],
  ["Co když nemám texty ani fotografie?", "Nevadí. Z vašich odpovědí připravíme strukturu, dodané texty upravíme a doporučíme vhodný obrazový směr. Kompletní copywriting nebo nové focení lze přidat podle rozsahu."],
  ["Kolik úprav je v ceně?", "Dvě soustředěná kola v domluvených bodech procesu. Drobnosti před spuštěním doladíme; změna už schváleného zadání se nacení zvlášť."],
  ["Budu web opravdu vlastnit?", "Ano. Po doplacení získáte web i všechny domluvené přístupy. Doména bude vedená na vás a žádný povinný měsíční paušál vás u nás nedrží."],
  ["Bude web vidět na Googlu?", "Připravíme technický základ, aby vyhledávače web správně přečetly. Konkrétní pozice ale závisí na konkurenci, obsahu a další práci — první místo poctivě slíbit nejde."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [goal, setGoal] = useState("poptávky");
  const [size, setSize] = useState("5");
  const [selectedPackage, setSelectedPackage] = useState("Web za týden");
  const [sent, setSent] = useState(false);

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Poptávka webu – ${data.get("project") || "nový projekt"}`);
    const body = encodeURIComponent(
      `Dobrý den,\n\nmám zájem o web za týden.\n\nPreferovaný balíček: ${selectedPackage}\nCíl webu: ${goal}\nRozsah: ${size === "1" ? "jedna stránka" : size === "5" ? "3–5 stránek" : "6–8 stránek"}\nJméno: ${data.get("name")}\nE-mail: ${data.get("email")}\nProjekt: ${data.get("project")}\n\nDěkuji.`
    );
    window.location.href = `mailto:poptavka@webzatyden.cz?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <main>
      <a className="skip-link" href="#obsah">Přeskočit na obsah</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="webzatyden – domů">
          <span className="brand-mark">7</span>
          <span>web<span>za</span>týden</span>
        </a>
        <nav id="main-navigation" className={menuOpen ? "nav open" : "nav"} aria-label="Hlavní navigace">
          <a href="#ukazky" onClick={() => setMenuOpen(false)}>Ukázky</a>
          <a href="#proces" onClick={() => setMenuOpen(false)}>Jak to funguje</a>
          <a href="#cenik" onClick={() => setMenuOpen(false)}>Ceník</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </nav>
        <a className="button button-small header-cta" href="#kontakt">Chci web <Arrow /></a>
        <button className="menu-button" aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
      </header>

      <section className="hero section" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> PROFESIONÁLNÍ WEB · DO 7 PRACOVNÍCH DNÍ</div>
          <h1>Váš nový web.<br /><em>Za týden online.</em></h1>
          <p className="lead">Navrhneme strukturu, upravíme texty, vytvoříme design a web spustíme. Vy nám řeknete pár věcí — o zbytek se postaráme.</p>
          <div className="hero-actions">
            <a className="button" href="#kontakt">Chci web za týden <Arrow /></a>
            <a className="text-link" href="#ukazky">Prohlédnout ukázky <span>↓</span></a>
          </div>
          <div className="trust-line"><span><Check /> Pevná cena</span><span><Check /> Bez skrytých poplatků</span><span><Check /> 30 dní podpory</span></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="browser-card">
            <div className="browser-top"><span /><span /><span /><small>vášnovýweb.cz</small></div>
            <div className="mini-site">
              <div className="mini-nav"><b>materia</b><i /><i /><i /></div>
              <div className="mini-label">NÁBYTEK, KTERÝ ZŮSTÁVÁ</div>
              <div className="mini-title">Domov začíná<br />dobrým <em>nápadem.</em></div>
              <div className="mini-button">Prohlédnout tvorbu</div>
              <div className="chair-shape"><span /><i /></div>
            </div>
          </div>
          <div className="week-card">
            <div><span>PROJEKT</span><b>Váš nový web</b></div>
            <div className="week-progress"><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="week-status"><span className="status-check">✓</span><p><b>Den 7 · Hotovo</b><small>Web je připravený ke spuštění</small></p></div>
          </div>
          <div className="floating-note">Žádné nekonečné<br />čekání na „někdy“.</div>
        </div>
      </section>

      <div id="obsah" />
      <section className="ticker" aria-label="Hlavní výhody"><div>JASNÝ TERMÍN <span>✦</span> PEVNÁ CENA <span>✦</span> ČESKY A LIDSKY <span>✦</span> WEB, KTERÝ JE VÁŠ <span>✦</span></div></section>

      <section className="section work-section" id="ukazky">
        <div className="section-heading split-heading">
          <div><span className="kicker">01 / UKÁZKY</span><h2>Nejdřív se podívejte,<br />jak může vypadat <em>vaše práce.</em></h2></div>
          <p>Tři vizuální směry pro různé obory. Zatím jsou to poctivě označené koncepty — skutečné realizace zde časem dostanou hlavní slovo.</p>
        </div>
        <div className="project-grid">
          {work.map((project, index) => (
            <article className={`project-card ${project.accent}`} key={project.title}>
              <div className="project-meta"><span>{project.type}</span><span>{project.tag}</span></div>
              <div className="project-screen">
                <div className="screen-nav"><b>{project.title.split(" ")[0].toLowerCase()}</b><span>menu</span></div>
                <h3>{project.title}</h3><p>{project.subtitle}</p>
                <div className="screen-art" aria-hidden="true"><i /><i /><i /></div>
              </div>
              <div className="project-bottom"><span>0{index + 1}</span><b>{project.title}</b><span>Design · Obsah · Web</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section value-section" id="sluzba">
        <div className="section-heading centered"><span className="kicker">02 / CO DOSTANETE</span><h2>Jeden týden. Jeden tým.<br /><em>Jeden hotový web.</em></h2><p>Vše podstatné je v jednom balíčku. Nemusíte shánět grafika, textaře a vývojáře zvlášť.</p></div>
        <div className="value-grid">
          <article><span className="value-number">01</span><div className="value-icon">Aa</div><h3>Slova, která dávají smysl</h3><p>Pomůžeme jednoduše říct, co nabízíte a proč si vybrat právě vás.</p></article>
          <article className="featured-value"><span className="value-number">02</span><div className="value-icon shapes"><i /><i /><i /></div><h3>Design, kterému se věří</h3><p>Vizuál přizpůsobíme vaší značce. Na telefonu bude stejně přehledný jako na počítači.</p></article>
          <article><span className="value-number">03</span><div className="value-icon">⚙</div><h3>Technika bez starostí</h3><p>Rychlost, formuláře, doménu, základ pro vyhledávače i spuštění vyřešíme za vás.</p></article>
        </div>
        <div className="included-bar">
          <b>V každém webu</b>
          <span><Check /> Mobilní verze</span><span><Check /> Základní SEO</span><span><Check /> Bezpečný provoz</span><span><Check /> Předání přístupů</span>
        </div>
      </section>

      <section className="section process-section" id="proces">
        <div className="process-intro"><span className="kicker">03 / JAK TO PROBÍHÁ</span><h2>Sedm dní.<br /><em>Žádný chaos.</em></h2><p>Přesně víte, co se děje a kdy vás potřebujeme. Klikněte na den a podívejte se dovnitř.</p></div>
        <div className="process-panel">
          <div className="day-tabs" aria-label="Průběh týdne">
            {days.map((day, index) => <button key={day[0]} aria-pressed={activeDay === index} onClick={() => setActiveDay(index)}><span>DEN</span><b>{day[0]}</b></button>)}
          </div>
          <div className="day-detail" aria-live="polite">
            <div className="giant-day">{days[activeDay][0]}</div>
            <div><span>DEN {days[activeDay][0]}</span><h3>{days[activeDay][1]}</h3><p>{days[activeDay][2]}</p></div>
            <div className="detail-note"><span>VÝSLEDEK DNE</span><p>{activeDay === 5 ? "Hotový web, který můžete hned sdílet." : activeDay === 0 ? "Společné zadání bez nejasností." : "Další jasně potvrzený krok."}</p></div>
          </div>
          <p className="process-terms"><b>Férově:</b> Sedm dní počítáme od dodání podkladů, potvrzení rozsahu a úhrady zálohy. Na vaše připomínky vždy předem rezervujeme konkrétní čas.</p>
        </div>
      </section>

      <section className="section pricing-section" id="cenik">
        <div className="section-heading split-heading pricing-heading"><div><span className="kicker">04 / CENÍK</span><h2>Víte, co dostanete.<br /><em>A kolik to stojí.</em></h2></div><p>Bez hodinových sazeb a překvapení na faktuře. 50 % při rezervaci termínu, 50 % po schválení webu.</p></div>
        <div className="pricing-grid">
          {packages.map((item) => <article className={item.featured ? "price-card featured-price" : "price-card"} key={item.name}>
            {item.featured && <span className="popular">NEJČASTĚJŠÍ VOLBA</span>}
            <div className="price-top"><h3>{item.name}</h3><p>{item.note}</p></div>
            <div className="price"><b>{item.price}</b><span>bez DPH · jednorázově</span></div>
            <ul>{item.items.map((line) => <li key={line}><Check /> {line}</li>)}</ul>
            <a href="#kontakt" onClick={() => setSelectedPackage(item.name)} className={item.featured ? "button light-button" : "button outline-button"}>Vybrat {item.name.toLowerCase()} <Arrow /></a>
          </article>)}
        </div>
        <p className="pricing-footnote">V ceně není doména a hosting, které zůstávají vedené na vás. Obvykle jde o nižší tisíce korun ročně. Rozsah i případné doplňky potvrdíme před startem.</p>
      </section>

      <section className="section promise-section">
        <div className="promise-title"><span className="kicker">05 / NAŠE DOHODA</span><h2>Rychle neznamená<br /><em>narychlo.</em></h2></div>
        <div className="promise-grid">
          <article><span>01</span><h3>Termín pod kontrolou</h3><p>Před startem dostanete jednoduchý harmonogram.</p></article>
          <article><span>02</span><h3>Cena bez překvapení</h3><p>Potvrzený rozsah už cenu nezmění.</p></article>
          <article><span>03</span><h3>Spouštíme až po schválení</h3><p>Bez vašeho souhlasu nic nepustíme ven.</p></article>
          <article><span>04</span><h3>30 dní podpory</h3><p>Technické chyby po spuštění opravíme zdarma.</p></article>
        </div>
      </section>

      <section className="section fit-section">
        <div className="fit-copy"><span className="kicker">06 / PRO KOHO TO JE</span><h2>Je týdenní web<br /><em>pro vás?</em></h2><p>Ne každému projektu rychlý režim sedne. Raději to řekneme narovinu hned na začátku.</p></div>
        <div className="fit-cards">
          <article className="fit-yes"><span className="fit-symbol">✓</span><h3>Ano, pokud…</h3><ul><li>chcete firemní nebo osobní web</li><li>potřebujete 1–8 stránek</li><li>chcete jasný termín a cenu</li><li>schvaluje jeden člověk</li></ul></article>
          <article><span className="fit-symbol">→</span><h3>Jiný plán, pokud…</h3><ul><li>stavíte velký e-shop nebo aplikaci</li><li>potřebujete složitá napojení</li><li>obsah schvaluje velký tým</li><li>zatím nevíte, co má web dělat</li></ul></article>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-intro"><span className="kicker">07 / ČASTÉ OTÁZKY</span><h2>Ptáte se.<br /><em>Odpovídáme rovnou.</em></h2><p>Nenašli jste odpověď? Přidejte otázku do nezávazné poptávky.</p><a href="#kontakt" className="text-link">Přejít k poptávce <span>↓</span></a></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="section contact-section" id="kontakt">
        <div className="contact-copy"><span className="kicker light-kicker">08 / POJĎME ZAČÍT</span><h2>Za týden můžete<br />mít <em>hotovo.</em></h2><p>Čtyři jednoduché odpovědi. Do jednoho pracovního dne vám potvrdíme, zda projekt sedí do týdenního režimu.</p><div className="contact-trust"><span><b>2 min</b> na vyplnění</span><span><b>0 Kč</b> za první posouzení</span><span><b>1 den</b> na naši odpověď</span></div></div>
        <form className="lead-form" onSubmit={submitLead}>
          <fieldset><legend><span>1</span> Co má web hlavně udělat?</legend><div className="choice-grid">{[["poptávky","Získávat poptávky"],["služby","Vysvětlit služby"],["rezervace","Umožnit rezervace"],["nový projekt","Představit projekt"]].map(([value,label]) => <label key={value}><input type="radio" name="goal" checked={goal === value} onChange={() => setGoal(value)} /><span>{label}</span></label>)}</div></fieldset>
          <fieldset><legend><span>2</span> Jak velký web potřebujete?</legend><div className="choice-grid choice-three">{[["1","Jedna stránka"],["5","3–5 stránek"],["8","6–8 stránek"]].map(([value,label]) => <label key={value}><input type="radio" name="size" checked={size === value} onChange={() => setSize(value)} /><span>{label}</span></label>)}</div></fieldset>
          <fieldset><legend><span>3</span> Kam se můžeme ozvat?</legend><p className="selected-package">Vybraný balíček: <strong>{selectedPackage}</strong></p><div className="field-grid"><label>Jméno<input name="name" autoComplete="name" required placeholder="Jan Novák" /></label><label>E-mail<input name="email" autoComplete="email" required type="email" placeholder="jan@firma.cz" /></label><label className="full-field">Firma nebo projekt<input name="project" autoComplete="organization" required placeholder="Název vašeho projektu" /></label></div></fieldset>
          <button className="button form-button" type="submit">Připravit e-mail s poptávkou <Arrow /></button>
          <p className="form-note" aria-live="polite">Nezávazně. Tlačítko otevře připravenou zprávu ve vašem e-mailu. {sent && <strong>Zpráva je připravená — stačí ji odeslat.</strong>}</p>
        </form>
      </section>

      <footer>
        <div className="footer-brand"><a className="brand brand-light" href="#top"><span className="brand-mark">7</span><span>web<span>za</span>týden</span></a><p>Profesionální web.<br />Za týden online.</p></div>
        <div className="footer-links"><div><b>PROZKOUMAT</b><a href="#ukazky">Ukázky</a><a href="#proces">Jak to funguje</a><a href="#cenik">Ceník</a><a href="#faq">FAQ</a></div><div><b>KONTAKT</b><a href="mailto:poptavka@webzatyden.cz">poptavka@webzatyden.cz</a><span>Česká republika</span></div></div>
        <div className="footer-bottom"><span>© 2026 webzatyden</span><span>Web je zatím produktový koncept · kontaktní údaje budou doplněny před ostrým spuštěním.</span><a href="#top">Nahoru ↑</a></div>
      </footer>
      <a className="mobile-cta" href="#kontakt">Chci web za týden <Arrow /></a>
    </main>
  );
}
