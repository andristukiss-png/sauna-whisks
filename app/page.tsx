import { Header } from "@/components/Header";
import Link from "next/link";
import { LeafMark } from "@/components/LeafMark";
import { SiteFooter } from "@/components/SiteFooter";
import { saunaWhisks } from "@/lib/products";

const products = saunaWhisks;

const rituals = [
  ["01", "Soak", "Wake the leaves slowly in cool-to-warm water. A good whisk should become supple, not limp."],
  ["02", "Warm", "Bring the whisk into the sauna and let heat release its natural forest aroma."],
  ["03", "Use", "Move warm air over the body, brush the skin, then work with light rhythmic strokes."],
  ["04", "Rest", "Cool down, hydrate and allow the ritual to finish gradually."],
];

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">FROM LATVIA · ROOTED IN BALTIC SAUNA CULTURE</p>
          <h1>The forest<br />belongs in<br /><em>the sauna.</em></h1>
          <p className="hero-deck">
            Traditional sauna whisks and the knowledge behind them — birch, oak, eucalyptus and herbs, selected for a serious sauna ritual.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="button button-dark">Explore the collection</Link>
            <Link href="/traditions" className="text-link">Discover the tradition →</Link>
          </div>
          <div className="trust-row">
            <span>LATVIAN ROOTS</span><i />
            <span>BOTANICAL ORIGIN</span><i />
            <span>TRADE SUPPLY</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract botanical sauna whisk illustration">
          <div className="steam steam-one" />
          <div className="steam steam-two" />
          <div className="bundle">
            {[0,1,2,3,4,5,6,7,8].map((n) => <LeafMark key={n} className={"leaf leaf-" + n} />)}
            <div className="tie" />
          </div>
          <p className="art-note">THE BALTIC RITUAL<br /><span>BIRCH · OAK · HERBS</span></p>
        </div>
      </section>

      <section className="manifesto" id="tradition">
        <p className="section-kicker">A LIVING TRADITION</p>
        <div>
          <h2>Not an accessory.<br /><em>A sauna instrument.</em></h2>
          <p>Across Latvia and the wider Baltic and banya traditions, leafy bundles are used to move heat, release aroma and work with the body. The names change — whisk, venik, vihta, vasta — but the idea is older than modern wellness.</p>
          <p>SaunaWhisks.com exists to preserve that depth while making the ritual understandable, dependable and accessible to sauna owners around the world.</p>
        </div>
      </section>

      <section className="products" id="whisks">
        <div className="section-heading">
          <div><p className="section-kicker">THE FIRST COLLECTION</p><h2>Choose your forest.</h2></div>
          <p>Our launch collection is intentionally small: recognizable species, clear origins and different ritual characteristics.</p>
        </div>
        <div className="product-grid">
          {products.map((p, i) => (
            <article className="product-card" key={p.name}>
              <div className={"product-art product-art-" + i}>
                <LeafMark />
                <LeafMark />
                <LeafMark />
              </div>
              <p className="product-latin">{p.latin.toUpperCase()} · {p.status.toUpperCase()}</p>
              <div className="product-title-row"><h3>{p.name}</h3><strong>{p.plannedPrice}</strong></div>
              <p>{p.character}</p>
              <Link className="product-link" href={"/shop/" + p.slug}>View whisk <span>→</span></Link>
            </article>
          ))}
        </div>
        <Link href="/shop/discovery-trio" className="bundle-callout bundle-link">
          <div><span>01 / DISCOVERY</span><h3>Three forests.<br />One ritual.</h3></div>
          <p>Birch + oak + eucalyptus. Designed as the natural first order for anyone learning the differences between sauna whisks.</p>
          <strong>US$69 <small>planned launch price · view bundle →</small></strong>
        </Link>
      </section>

      <section className="guide" id="guide">
        <div className="guide-intro">
          <p className="section-kicker light">THE RITUAL GUIDE</p>
          <h2>How to use<br />a sauna whisk.</h2>
          <p>Technique matters. Good preparation helps the leaves stay on the branch, opens the aroma and makes the whisk comfortable to use.</p>
        </div>
        <div className="steps">
          {rituals.map(([n,title,copy]) => (
            <div className="step" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></div>
          ))}
        </div>
      </section>

      <section className="knowledge">
        <p className="section-kicker">THE SAUNA LIBRARY</p>
        <div className="knowledge-grid">
          <div>
            <h2>Learn the language<br />of the sauna.</h2>
            <p>A serious collection deserves serious information. Our journal will document materials, preparation, regional traditions and harvesting.</p>
          </div>
          <div className="article-list">
            <Link href="/journal/what-is-a-sauna-whisk"><span>01</span><b>What is a sauna whisk?</b><em>6 min</em></Link>
            <Link href="/journal/venik-vihta-vasta"><span>02</span><b>Venik, vihta or vasta?</b><em>7 min</em></Link>
            <Link href="/journal/birch-vs-oak-sauna-whisk"><span>03</span><b>Birch vs oak: how they feel</b><em>5 min</em></Link>
            <Link href="/journal/how-to-prepare-dried-sauna-whisk"><span>04</span><b>How to prepare a dried whisk</b><em>6 min</em></Link>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-art"><LeafMark /><span>57° N</span></div>
        <div className="about-copy">
          <p className="section-kicker">FROM LATVIA</p>
          <h2>Built close to<br />the source.</h2>
          <p>SaunaWhisks.com is being built in Latvia, where sauna culture is not a trend imported from somewhere else. Our aim is to work with experienced Baltic producers and present their materials with better documentation, consistency and international service.</p>
          <p className="fineprint">We will publish producer, harvest and botanical details only when verified. No invented heritage stories; no anonymous commodity bundles.</p>
          <Link href="/standards" className="text-link">Our sourcing standard →</Link>
        </div>
      </section>

      <section className="wholesale" id="wholesale">
        <p className="section-kicker light">TRADE / WHOLESALE</p>
        <h2>For saunas that use<br />whisks every week.</h2>
        <p>Trade packs and recurring supply for public saunas, bathhouses, hotels, wellness clubs, retailers and sauna builders.</p>
        <Link href="/wholesale" className="button button-light">Discuss trade supply</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
