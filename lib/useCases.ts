export type UseCase = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  priorities: string[];
  recommendation: string;
  related: Array<{label:string;href:string}>;
};

export const useCases: UseCase[] = [
  {
    slug:"home-sauna",
    name:"Home sauna",
    headline:"A simple whisk setup for regular home use.",
    summary:"Home users benefit most from easy storage, clear preparation and a small assortment rather than a large specialist catalog.",
    priorities:["Dried format for year-round storage","Birch as the first benchmark","One contrast material such as oak","Clear preparation and cleanup"],
    recommendation:"Start with birch or the Discovery Trio if you want to compare materials immediately.",
    related:[{label:"Beginners",href:"/beginners"},{label:"Discovery Trio",href:"/shop/discovery-trio"}]
  },
  {
    slug:"public-sauna",
    name:"Public sauna",
    headline:"Operational consistency matters more than novelty.",
    summary:"Public venues need predictable preparation, recurring supply and staff-friendly instructions.",
    priorities:["Recurring case quantities","Consistent product condition","Preparation instructions for staff","Simple waste and storage routines"],
    recommendation:"Run a small mixed trial first, then reorder the material that staff and guests actually prefer.",
    related:[{label:"Trade trial",href:"/trade/trial"},{label:"Public sauna trade plan",href:"/trade/public-saunas"}]
  },
  {
    slug:"hotel-spa",
    name:"Hotel or spa",
    headline:"Make the ritual understandable to guests and staff.",
    summary:"Hospitality settings need a whisk program that feels authentic but can still be explained and prepared consistently.",
    priorities:["Guest-friendly product story","Staff preparation card","Clean presentation","Reliable replenishment"],
    recommendation:"Use a small core assortment and standardize one preparation method per product.",
    related:[{label:"Hotels & spas trade",href:"/trade/hotels-spas"},{label:"How to use a whisk",href:"/journal/how-to-use-a-sauna-whisk"}]
  },
  {
    slug:"retail-store",
    name:"Retail store",
    headline:"Merchandise the difference, not just the bundle.",
    summary:"Retailers need customers to understand why birch, oak and eucalyptus differ before price becomes the only comparison.",
    priorities:["Consumer-ready packaging","Material comparison","Preparation card","Clear origin/condition fields"],
    recommendation:"Lead with birch, add one contrast material, and use the Discovery Trio as the educational bundle.",
    related:[{label:"Retail trade",href:"/trade/retailers"},{label:"Compare materials",href:"/compare"}]
  },
  {
    slug:"sauna-builder",
    name:"Sauna builder",
    headline:"Add ritual at the moment the sauna is handed over.",
    summary:"Builders can introduce whisking when customers are most motivated to learn how their new sauna can be used.",
    priorities:["Gift-ready starter bundle","Short beginner guide","Minimal storage complexity","Easy reorder path"],
    recommendation:"Pair a starter whisk or trio with a one-page beginner/preparation guide.",
    related:[{label:"Sauna builders trade",href:"/trade/sauna-builders"},{label:"Beginners",href:"/beginners"}]
  },
  {
    slug:"wellness-club",
    name:"Wellness or recovery club",
    headline:"Use whisking as a guided ritual, not a decorative prop.",
    summary:"Modern recovery spaces need staff confidence, operational cleanliness and clear guest expectations.",
    priorities:["Staff training","Preparation workflow","Guest explanation","Reliable replenishment"],
    recommendation:"Start with one soft material plus a staff trial before introducing a wider assortment.",
    related:[{label:"Wellness clubs trade",href:"/trade/wellness-clubs"},{label:"Trade trial",href:"/trade/trial"}]
  },
  {
    slug:"gift",
    name:"Sauna gift",
    headline:"A gift works better when the recipient knows what to do with it.",
    summary:"An unexplained bundle of branches can be confusing; a comparison set plus preparation guidance makes the gift usable.",
    priorities:["Simple explanation","Preparation instructions","Attractive bundle logic","Material variety"],
    recommendation:"The Discovery Trio is the clearest planned gift format because it combines learning with variety.",
    related:[{label:"Gift buying guide",href:"/guides/sauna-gift"},{label:"Discovery Trio",href:"/shop/discovery-trio"}]
  },
  {
    slug:"first-whisk",
    name:"First sauna whisk",
    headline:"Start with a reference point.",
    summary:"The first purchase should help you understand the category rather than overwhelm you with species and tradition terminology.",
    priorities:["Birch benchmark","Simple preparation","Soft feel","Clear next step"],
    recommendation:"Choose birch first unless you specifically want to compare materials, in which case use the Discovery Trio.",
    related:[{label:"First whisk guide",href:"/guides/first-sauna-whisk"},{label:"Baltic Birch",href:"/shop/baltic-birch"}]
  }
];

export function getUseCase(slug:string){
  return useCases.find((item)=>item.slug===slug);
}
