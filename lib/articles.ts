export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  readTime: string;
  sections: ArticleSection[];
  sources: { label: string; url: string }[];
};

export const articles: Article[] = [
  {
    slug: "what-is-a-sauna-whisk",
    title: "What is a sauna whisk?",
    eyebrow: "FOUNDATIONS",
    description:
      "A clear introduction to the leafy bundle used in sauna traditions: what it is, what it does, and why birch is the classic starting point.",
    readTime: "6 min",
    sections: [
      {
        heading: "A bundle with a purpose",
        paragraphs: [
          "A sauna whisk is a tied bundle of leafy branches used during sauna bathing. Depending on place and language, related traditions may call it a whisk, vihta, vasta, venik or use local terms connected to the wider bathhouse ritual.",
          "The whisk is not simply decoration. It moves warm air, releases plant aroma, brushes the skin and gives the sauna ritual a physical rhythm."
        ]
      },
      {
        heading: "Why birch appears so often",
        paragraphs: [
          "Birch is one of the best-known traditional materials in Northern European sauna culture. The Finnish Sauna Society's quality guidance specifies silver birch for a traditional whisk and describes a fan-like shape, a clean handle and careful branch selection.",
          "Birch is also an approachable material for new users because the leaves are relatively soft and highly aromatic when properly prepared."
        ]
      },
      {
        heading: "Fresh, dried and preserved",
        paragraphs: [
          "Fresh whisks are seasonal and closely tied to harvest timing. For year-round use, whisks may be dried or frozen; commercial producers also use other preservation methods.",
          "Preparation depends on condition. The Finnish Sauna Society recommends warm-water soaking for dried whisks and warns against placing a whisk on hot stones or leaving it on a hot sauna bench."
        ]
      },
      {
        heading: "One object, several traditions",
        paragraphs: [
          "The product may look simple, but its meaning changes across Latvian pirts, Finnish sauna and banya traditions. SaunaWhisks.com treats those traditions as related but distinct rather than pretending they are interchangeable."
        ]
      }
    ],
    sources: [
      { label: "Finnish Sauna Society — Quality guidelines for sauna whisks", url: "https://sauna.fi/en/sauna-knowledge/quality-guidelines-for-sauna-whisks/" },
      { label: "Latvia.eu — Pirts, the Latvian sauna", url: "https://www.latvia.eu/sauna/" }
    ]
  },
  {
    slug: "venik-vihta-vasta",
    title: "Venik, vihta or vasta?",
    eyebrow: "LANGUAGE & TRADITION",
    description:
      "The names around sauna whisking can be confusing. Here is a practical guide to the terms without flattening their regional differences.",
    readTime: "7 min",
    sections: [
      {
        heading: "Vihta and vasta",
        paragraphs: [
          "In Finland, the birch sauna whisk is known as vihta or vasta. Which word a Finnish speaker uses depends largely on regional language and dialect.",
          "The object itself is closely associated with traditional birch sauna use, and Finnish guidance often describes silver birch as the classic material."
        ]
      },
      {
        heading: "Venik",
        paragraphs: [
          "Venik is the widely recognized term in banya culture. Birch and oak are among the most familiar materials, and techniques may be more vigorous than the gentle air-moving style many new sauna users imagine."
        ]
      },
      {
        heading: "Latvian pirts",
        paragraphs: [
          "Latvian pirts has its own wider ritual context. Official Latvian sources describe pirts as both a place and a practice involving heat, steam, water, touch, plants and sometimes song.",
          "Whisking belongs inside that larger plant-centered ritual rather than standing alone as a novelty accessory."
        ]
      },
      {
        heading: "Why we use 'sauna whisk'",
        paragraphs: [
          "For an international English-language store, 'sauna whisk' is the clearest umbrella term. On this site we also use venik, vihta and vasta where the cultural context matters."
        ]
      }
    ],
    sources: [
      { label: "This is Finland — Sauna whisk", url: "https://finland.fi/emoji/sauna-whisk/" },
      { label: "Latvia.eu — Pirts, the Latvian sauna", url: "https://www.latvia.eu/sauna/" }
    ]
  },
  {
    slug: "birch-vs-oak-sauna-whisk",
    title: "Birch vs oak sauna whisks",
    eyebrow: "MATERIAL GUIDE",
    description:
      "Birch is softer and classic; oak is broader and firmer. Learn how the two materials differ in feel and ritual character.",
    readTime: "5 min",
    sections: [
      {
        heading: "Birch: the classic reference point",
        paragraphs: [
          "Birch is the material most people encounter first. A good birch whisk feels leafy rather than twiggy, releases a recognizable forest aroma and can be used for brushing, warming and rhythmic whisking.",
          "Finnish quality guidance describes a fresh silver-birch whisk at roughly 50 cm long and emphasizes clean branches, a leaf-free handle and a fan-like form."
        ]
      },
      {
        heading: "Oak: broader and firmer",
        paragraphs: [
          "Oak leaves are broader and the finished whisk generally feels denser and firmer in the hand. Many experienced bathers choose oak when they want a stronger, more substantial ritual.",
          "Because commercial oak whisks vary greatly by species, harvest and drying method, we plan to publish precise origin and botanical details on each product rather than treating all oak as identical."
        ]
      },
      {
        heading: "Which should you buy first?",
        paragraphs: [
          "For a first whisk, birch is the easiest benchmark. If you already know you prefer a firmer tool or want to compare materials, an oak-and-birch pair makes more sense than buying two identical whisks."
        ]
      }
    ],
    sources: [
      { label: "Finnish Sauna Society — Quality guidelines for sauna whisks", url: "https://sauna.fi/en/sauna-knowledge/quality-guidelines-for-sauna-whisks/" }
    ]
  },
  {
    slug: "how-to-prepare-dried-sauna-whisk",
    title: "How to prepare a dried sauna whisk",
    eyebrow: "PRACTICAL GUIDE",
    description:
      "A conservative preparation method for rehydrating a dried sauna whisk without unnecessarily damaging the leaves.",
    readTime: "6 min",
    sections: [
      {
        heading: "Do not shock the leaves",
        paragraphs: [
          "A dried whisk needs time to become flexible again. The safest general principle is gradual rehydration rather than throwing a brittle whisk straight into very hot water.",
          "Preparation instructions can vary by producer, so the product-specific instructions should always take priority."
        ]
      },
      {
        heading: "A practical sequence",
        paragraphs: [
          "Rinse off loose dust or fragments. Immerse the whisk in warm water and allow enough time for the branches and leaves to soften. The Finnish Sauna Society describes approximately 1.5 to 2 hours for a dried traditional whisk.",
          "Once flexible, take the whisk into the sauna and warm it gradually. Do not place it directly on heater stones and do not leave it cooking on a hot bench."
        ]
      },
      {
        heading: "Leaf loss",
        paragraphs: [
          "Some shedding is normal with a natural dried product. Excessive leaf loss can be affected by harvest quality, drying, storage, shipping and overly aggressive preparation.",
          "This is one reason SaunaWhisks.com intends to test leaf retention and publish clear preparation instructions by product."
        ]
      }
    ],
    sources: [
      { label: "Finnish Sauna Society — Quality guidelines for sauna whisks", url: "https://sauna.fi/en/sauna-knowledge/quality-guidelines-for-sauna-whisks/" }
    ]
  },
  {
    slug: "latvian-pirts-tradition",
    title: "Latvian pirts: more than a hot room",
    eyebrow: "FROM LATVIA",
    description:
      "An introduction to Latvian pirts culture and why plants, touch and ritual make it different from a simple heat session.",
    readTime: "8 min",
    sections: [
      {
        heading: "A place and a practice",
        paragraphs: [
          "Official Latvian cultural material describes pirts as both a place and a practice. The experience can combine heat, steam, water, touch, plants and song, and it has long held a meaningful place in Latvian family and folk culture.",
          "Modern pirts experiences range from private family bathing to long guided rituals led by a trained pirtnieks."
        ]
      },
      {
        heading: "Plants are central",
        paragraphs: [
          "Local trees and herbs are a defining part of Latvian pirts. Plants can appear in whisks, scrubs, infusions and on the sauna bench itself.",
          "For SaunaWhisks.com, that plant knowledge is the most important Latvian foundation for the brand: the whisk belongs to a wider botanical practice."
        ]
      },
      {
        heading: "Tradition without costume",
        paragraphs: [
          "We do not want to turn pirts into decorative folklore for export. The goal is to explain the tradition clearly, work with people who understand the materials, and separate verified practice from marketing mythology."
        ]
      }
    ],
    sources: [
      { label: "Latvia.eu — Pirts, the Latvian sauna", url: "https://www.latvia.eu/sauna/" },
      { label: "Latvia Travel — Bathing traditions in Latvia", url: "https://www.latvia.travel/en/bathing-traditions-latvia" }
    ]
  },
  {
    slug: "sauna-whisk-vs-sauna-broom",
    title: "Sauna whisk vs sauna broom",
    eyebrow: "TERMINOLOGY",
    description:
      "Two English labels for closely related products. Here is why both terms appear online and why SaunaWhisks.com uses 'whisk' as the primary category.",
    readTime: "4 min",
    sections: [
      {
        heading: "Why both terms exist",
        paragraphs: [
          "English-language marketplaces and specialist retailers use both 'sauna whisk' and 'sauna broom' for leafy branch bundles used in sauna and banya bathing.",
          "The product is the same broad category, but the word choice often reflects translation, regional tradition or how a seller has chosen to explain venik, vihta or vasta to English-speaking customers."
        ]
      },
      {
        heading: "Why we prefer 'whisk'",
        paragraphs: [
          "For our brand, 'whisk' better communicates an active sauna tool rather than a cleaning broom. It also sits naturally beside the verb 'whisking', which describes moving heat and working with the body.",
          "We still use 'sauna broom' in educational content because people genuinely search and shop using that term."
        ]
      },
      {
        heading: "Search term, not cultural replacement",
        paragraphs: [
          "Neither English phrase replaces the original cultural vocabulary. When we discuss Finnish sauna we use vihta and vasta where relevant; when we discuss banya we use venik; and when we discuss Latvian pirts we describe the local ritual in its own context."
        ]
      }
    ],
    sources: [
      { label: "Etsy — Sauna brooms marketplace", url: "https://www.etsy.com/market/sauna_brooms" },
      { label: "Holy Banya — Sauna whisks collection", url: "https://holybanya.com/collections/sauna-whisks" }
    ]
  },
  {
    slug: "how-to-use-a-sauna-whisk",
    title: "How to use a sauna whisk",
    eyebrow: "PRACTICAL GUIDE",
    description:
      "A simple introduction to warming, air movement, brushing and rhythmic whisking without turning the ritual into a performance.",
    readTime: "7 min",
    sections: [
      {
        heading: "Prepare before you use it",
        paragraphs: [
          "A whisk should be flexible before it touches the body. Fresh whisks need less preparation; dried whisks need gradual rehydration according to their condition and the producer's instructions.",
          "Warm the prepared whisk in the sauna so the leaves become supple and aromatic rather than using it cold and brittle."
        ]
      },
      {
        heading: "Start by moving heat",
        paragraphs: [
          "Whisking is not only about striking the skin. One of the gentlest techniques is to move hot air toward the body with controlled fanning movements.",
          "This lets a beginner understand the whisk as a heat-management tool before moving into brushing or rhythmic contact."
        ]
      },
      {
        heading: "Brush and press",
        paragraphs: [
          "Use light brushing movements over the body and allow the leaves to make broad contact. You can also briefly press a warm whisk onto the body to transfer heat and aroma.",
          "The goal is rhythm and comfort, not force."
        ]
      },
      {
        heading: "Respect the person and the material",
        paragraphs: [
          "A sauna ritual should be adjusted to heat tolerance, comfort and experience. Stop if anything feels unpleasant, and do not use a whisk on irritated or injured skin.",
          "Natural whisks also vary. Leaf retention, flexibility and scent depend on species, harvest, drying and preparation."
        ]
      }
    ],
    sources: [
      { label: "Finnish Sauna Society — Quality guidelines for sauna whisks", url: "https://sauna.fi/en/sauna-knowledge/quality-guidelines-for-sauna-whisks/" },
      { label: "Latvia.eu — Pirts, the Latvian sauna", url: "https://www.latvia.eu/sauna/" }
    ]
  },
  {
    slug: "fresh-vs-dried-sauna-whisks",
    title: "Fresh vs dried sauna whisks",
    eyebrow: "CONDITION GUIDE",
    description:
      "Fresh and dried whisks can both work well, but they differ in seasonality, storage, preparation and logistics.",
    readTime: "6 min",
    sections: [
      {
        heading: "Fresh is the traditional reference",
        paragraphs: [
          "The Finnish Sauna Society's quality guidance describes traditional fresh whisks as no more than two days old and recommends storing them in a cool, dry and airy place.",
          "Freshness gives the leaves flexibility and aroma without the rehydration step required by a dried whisk."
        ]
      },
      {
        heading: "Dried is practical year-round",
        paragraphs: [
          "Drying makes seasonal plant material easier to store and distribute outside the harvest period. The same Finnish guidance describes hanging whisks in a cool, dark, well-ventilated place for drying.",
          "A dried whisk needs preparation before use. The guidance describes warm-water immersion for approximately 1.5 to 2 hours."
        ]
      },
      {
        heading: "Neither format is automatically better",
        paragraphs: [
          "Fresh makes sense close to the source and in season. Dried makes more sense for year-round international ecommerce.",
          "Quality still depends on branch selection, tying, drying, storage and how the whisk is prepared before use."
        ]
      }
    ],
    sources: [
      { label: "Finnish Sauna Society — Quality guidelines for sauna whisks", url: "https://sauna.fi/en/sauna-knowledge/quality-guidelines-for-sauna-whisks/" }
    ]
  },
  {
    slug: "how-to-store-sauna-whisks",
    title: "How to store sauna whisks",
    eyebrow: "CARE & STORAGE",
    description:
      "Storage matters for leaf condition, flexibility and aroma. Here is the conservative approach for fresh, dried and frozen whisks.",
    readTime: "5 min",
    sections: [
      {
        heading: "Fresh whisks",
        paragraphs: [
          "Traditional fresh whisks should be kept cool, dry and airy rather than sealed in a hot or damp place. The Finnish Sauna Society specifically warns against conditions that allow the whisk to heat or 'burn' in storage.",
          "Fresh whisks are short-lived by nature, so storage is about protecting them briefly rather than turning them into a long-shelf-life product."
        ]
      },
      {
        heading: "Dried whisks",
        paragraphs: [
          "For drying, the Finnish guidance recommends a cool, dark location with good ventilation. Once dried, the same priorities remain useful: protect the whisk from moisture, excess heat and crushing.",
          "Do not store a rehydrated whisk while it is still wet and compressed in a closed package."
        ]
      },
      {
        heading: "Frozen whisks",
        paragraphs: [
          "The Finnish Sauna Society also describes freezing as a preservation method: the fresh whisk is bagged, excess air is removed, and the package is frozen.",
          "Their guidance suggests thawing at room temperature for approximately 1.5 to 2 hours before use."
        ]
      }
    ],
    sources: [
      { label: "Finnish Sauna Society — Quality guidelines for sauna whisks", url: "https://sauna.fi/en/sauna-knowledge/quality-guidelines-for-sauna-whisks/" }
    ]
  },
  {
    slug: "how-long-does-a-sauna-whisk-last",
    title: "How long does a sauna whisk last?",
    eyebrow: "CARE & REUSE",
    description:
      "There is no honest universal number. Lifespan depends on whether the whisk is fresh or dried, how it is prepared, and how intensely it is used.",
    readTime: "5 min",
    sections: [
      {
        heading: "Avoid fixed promises",
        paragraphs: [
          "A natural whisk does not behave like a manufactured brush with a predictable service life. Leaf retention varies with species, branch quality, harvest timing, preservation and preparation.",
          "For that reason, SaunaWhisks.com will not promise a fixed number of sessions for every product."
        ]
      },
      {
        heading: "Preparation changes lifespan",
        paragraphs: [
          "A brittle dried whisk that is rushed into use is more likely to shed or break. Gradual rehydration and warming help restore flexibility before contact with the body.",
          "The Finnish Sauna Society also warns against hot stones and hot benches, both of which can damage the whisk."
        ]
      },
      {
        heading: "Judge the actual condition",
        paragraphs: [
          "A whisk is nearing the end of useful life when leaves are heavily depleted, branches become brittle, tying loosens or the tool no longer feels comfortable to use.",
          "Commercial product pages should eventually include product-specific reuse guidance based on real testing rather than generic claims."
        ]
      }
    ],
    sources: [
      { label: "Finnish Sauna Society — Quality guidelines for sauna whisks", url: "https://sauna.fi/en/sauna-knowledge/quality-guidelines-for-sauna-whisks/" }
    ]
  },
  {
    slug: "why-sauna-whisk-leaves-fall-off",
    title: "Why do sauna whisk leaves fall off?",
    eyebrow: "TROUBLESHOOTING",
    description:
      "Some shedding is natural. Heavy leaf loss can point to preservation, storage, preparation or handling problems.",
    readTime: "6 min",
    sections: [
      {
        heading: "A natural product will shed",
        paragraphs: [
          "Leaves are not permanently bonded to the branches, so some loss during soaking and use is normal. The useful question is whether shedding is moderate or excessive.",
          "Natural variation means two apparently similar whisks can behave differently."
        ]
      },
      {
        heading: "Drying and storage matter",
        paragraphs: [
          "Whisks dried or stored in poor conditions can become fragile. The Finnish Sauna Society recommends cool, dark, well-ventilated conditions for drying and cool, dry, airy storage for fresh whisks.",
          "Excess heat, moisture and compression can all work against leaf condition."
        ]
      },
      {
        heading: "Preparation can protect the leaves",
        paragraphs: [
          "Dried whisks need time to rehydrate. The Finnish guidance describes warm-water immersion for approximately 1.5 to 2 hours before use.",
          "It also warns against placing a whisk on hot stones or leaving it on a hot sauna bench."
        ]
      },
      {
        heading: "This should become a quality metric",
        paragraphs: [
          "Leaf retention is one of the product characteristics SaunaWhisks.com intends to test across suppliers. A premium whisk should be evaluated not only by appearance when dry but also by how it performs after correct preparation."
        ]
      }
    ],
    sources: [
      { label: "Finnish Sauna Society — Quality guidelines for sauna whisks", url: "https://sauna.fi/en/sauna-knowledge/quality-guidelines-for-sauna-whisks/" }
    ]
  }
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
