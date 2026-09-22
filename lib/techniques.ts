export type Technique = {
  slug:string;
  name:string;
  summary:string;
  steps:string[];
  caution:string;
  related:Array<{label:string;href:string}>;
};

export const techniques:Technique[]=[
  {
    slug:"fanning",
    name:"Fanning warm air",
    summary:"A gentle starting technique that uses the whisk to move warm, humid air toward the body without direct striking.",
    steps:["Warm the prepared whisk in the sauna environment.","Hold it above or beside the body.","Use controlled sweeping movements to move hot air downward.","Adjust distance and speed for comfort."],
    caution:"The goal is controlled heat movement, not maximum intensity.",
    related:[{label:"How to use a sauna whisk",href:"/journal/how-to-use-a-sauna-whisk"}]
  },
  {
    slug:"brushing",
    name:"Light brushing",
    summary:"Broad, gentle leaf contact can introduce the feel of the whisk before stronger rhythmic techniques.",
    steps:["Prepare and warm the whisk first.","Use the leafy surface rather than exposed branch ends.","Brush with long, light movements.","Stop if the contact becomes uncomfortable."],
    caution:"Natural whisks vary; inspect the handle and branch ends before use.",
    related:[{label:"Inspect before use",href:"/journal/inspect-sauna-whisk-before-use"}]
  },
  {
    slug:"pressing",
    name:"Warm pressing",
    summary:"A warmed whisk can be placed briefly against the body to transfer warmth and aroma.",
    steps:["Warm the prepared whisk without putting it on heater stones.","Lay the leafy surface against the body.","Press gently for a short moment.","Lift and repeat only while comfortable."],
    caution:"Do not use extreme heat or direct heater contact to warm the whisk.",
    related:[{label:"Can a whisk go on hot stones?",href:"/journal/can-sauna-whisk-go-on-hot-stones"}]
  },
  {
    slug:"rhythmic-whisking",
    name:"Rhythmic whisking",
    summary:"Repeated light contact can create a more active ritual after fanning and brushing are comfortable.",
    steps:["Begin with air movement.","Use controlled wrist movement rather than force.","Keep leaf contact broad and rhythmic.","Reduce intensity immediately if comfort drops."],
    caution:"Force is not a quality measure; rhythm and control matter more.",
    related:[{label:"How to use a sauna whisk",href:"/journal/how-to-use-a-sauna-whisk"}]
  },
  {
    slug:"partner-session",
    name:"Partner whisking",
    summary:"When one person uses the whisk on another, communication and heat awareness become part of the technique.",
    steps:["Agree on temperature and comfort before starting.","Begin with fanning and light contact.","Check in regularly rather than assuming intensity.","End before fatigue or discomfort."],
    caution:"The person receiving the session should control the acceptable intensity.",
    related:[{label:"Beginners",href:"/beginners"}]
  },
  {
    slug:"cleanup",
    name:"After-session cleanup",
    summary:"A natural whisk leaves plant material behind, so a simple cleanup and drying routine improves the overall experience.",
    steps:["Remove loose leaves from benches and floor.","Rinse the usable whisk if appropriate for its condition.","Allow used natural material to cool and dry before storage/disposal.","Clean the sauna according to the venue or manufacturer routine."],
    caution:"Reuse depends on actual condition; do not store a wet, compressed whisk in a closed package.",
    related:[{label:"Storage guide",href:"/journal/how-to-store-sauna-whisks"}]
  }
];

export function getTechnique(slug:string){
  return techniques.find((item)=>item.slug===slug);
}
