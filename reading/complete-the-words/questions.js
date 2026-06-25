// splitWord rule:
// ≤3 letters → show 0 (fully blank)
// 4–5 letters → show first 2
// 6–7 letters → show first 3
// 8+ letters  → show first half (floor)
//
// The visible prefix is written directly into the paragraph text.
// __BLANK__ is replaced by inputs for the hidden suffix only.

const missingQuestions = [
  {
    title: "Topic: Prehistoric Dance",
    paragraph: "We know from drawings that have been preserved in caves for over 10,000 years that early humans performed dances as a group activity. We mi__BLANK__ think that pre__BLANK__ people concentrated only on ba__BLANK__ survival. However, it is cl__BLANK__ from the records that dance was important to them.",
    blanks: [{ answer: "ght" }, { answer: "historic" }, { answer: "sic" }, { answer: "ear" }]
  },
  {
    title: "Topic: Climate Change",
    paragraph: "Climate change is one of the most pre__BLANK__ challenges facing humanity today. Rising temperatures are causing po__BLANK__ ice caps to melt, which leads to higher sea le__BLANK__. Scientists warn that without immediate action, the consequences could be irr__BLANK__.",
    blanks: [{ answer: "ssing" }, { answer: "lar" }, { answer: "vels" }, { answer: "eversible" }]
  },
  {
    title: "Topic: Education",
    paragraph: "Research has shown that children who read reg__BLANK__ from an early age develop stronger cog__BLANK__ skills. Schools are therefore encouraged to imp__BLANK__ reading programs and provide students with access to a wide var__BLANK__ of books.",
    blanks: [{ answer: "ularly" }, { answer: "nitive" }, { answer: "lement" }, { answer: "iety" }]
  },
  {
    title: "Topic: Technology",
    paragraph: "The rise of art__BLANK__ intelligence has tra__BLANK__ many industries. Machines can now per__BLANK__ complex tasks that once required human exp__BLANK__. While this brings great eff__BLANK__, it also raises concerns about job dis__BLANK__.",
    blanks: [{ answer: "ificial" }, { answer: "nsformed" }, { answer: "form" }, { answer: "ertise" }, { answer: "iciency" }, { answer: "placement" }]
  },
  {
    title: "Topic: Urbanization",
    paragraph: "Millions of people mi__BLANK__ from rural areas to cities each year in search of better emp__BLANK__ opportunities. However, rapid urbanization puts enormous pre__BLANK__ on housing and public services. Without careful pl__BLANK__, overcrowding can und__BLANK__ the quality of life.",
    blanks: [{ answer: "grate" }, { answer: "loyment" }, { answer: "ssure" }, { answer: "anning" }, { answer: "ermine" }]
  },
  {
    title: "Topic: Health and Exercise",
    paragraph: "Regular ph__BLANK__ exercise is widely rec__BLANK__ as one of the most effective ways to maintain good health. Even moderate ac__BLANK__, such as a daily walk, can sig__BLANK__ reduce the risk of chr__BLANK__ diseases.",
    blanks: [{ answer: "ysical" }, { answer: "ognized" }, { answer: "tivity" }, { answer: "nificantly" }, { answer: "onic" }]
  },
  {
    title: "Topic: Renewable Energy",
    paragraph: "Governments around the world are investing heavily in ren__BLANK__ energy sources such as solar and wind power. These alternatives produce far fewer car__BLANK__ emissions than fossil fuels. Experts believe that a complete tra__BLANK__ to clean energy is both pos__BLANK__ and nec__BLANK__.",
    blanks: [{ answer: "ewable" }, { answer: "bon" }, { answer: "nsition" }, { answer: "sible" }, { answer: "essary" }]
  },
  {
    title: "Topic: Language Learning",
    paragraph: "Learning a second lan__BLANK__ at an early age has been linked to a range of cog__BLANK__ benefits. Children who are exp__BLANK__ to multiple languages tend to be better at pro__BLANK__ and cri__BLANK__ thinking.",
    blanks: [{ answer: "guage" }, { answer: "nitive" }, { answer: "osed" }, { answer: "blem-solving" }, { answer: "tical" }]
  },
  {
    title: "Topic: Biodiversity",
    paragraph: "Bio__BLANK__ refers to the var__BLANK__ of life on Earth, including all species of plants, animals, and mic__BLANK__. Human activities such as def__BLANK__ and pollution are causing species to become ex__BLANK__ at an alarming rate. Protecting eco__BLANK__ is essential for all living things.",
    blanks: [{ answer: "diversity" }, { answer: "iety" }, { answer: "roorganisms" }, { answer: "orestation" }, { answer: "tinct" }, { answer: "systems" }]
  },
  {
    title: "Topic: Social Media",
    paragraph: "Social media platforms have tra__BLANK__ the way people com__BLANK__ and share information. While they allow users to con__BLANK__ with friends across the world, excessive use has been linked to fee__BLANK__ of lon__BLANK__ and reduced attention spans.",
    blanks: [{ answer: "nsformed" }, { answer: "municate" }, { answer: "nect" }, { answer: "lings" }, { answer: "eliness" }]
  },
  {
    title: "Topic: Space Exploration",
    paragraph: "Space exp__BLANK__ has expanded our und__BLANK__ of the universe and led to many tec__BLANK__ advances. Missions to the Moon and Mars have provided val__BLANK__ data about the origins of our sol__BLANK__ system.",
    blanks: [{ answer: "loration" }, { answer: "erstanding" }, { answer: "hnological" }, { answer: "uable" }, { answer: "ar" }]
  },
  {
    title: "Topic: Ocean Pollution",
    paragraph: "Every year, millions of tons of plastic ent__BLANK__ the world's oceans. This waste poses a serious threat to mar__BLANK__ life and disrupts fragile eco__BLANK__ systems. Scientists are urging governments to take imm__BLANK__ action to reduce plastic pro__BLANK__.",
    blanks: [{ answer: "er" }, { answer: "ine" }, { answer: "system" }, { answer: "ediate" }, { answer: "duction" }]
  },
  {
    title: "Topic: Remote Work",
    paragraph: "The shift to remote work has changed the way many people man__BLANK__ their professional lives. Employees report red__BLANK__ commute stress and greater fle__BLANK__, but also inc__BLANK__ communication challenges. Companies must find new ways to enc__BLANK__ teamwork.",
    blanks: [{ answer: "age" }, { answer: "uced" }, { answer: "xibility" }, { answer: "reased" }, { answer: "ourage" }]
  },
  {
    title: "Topic: Food Security",
    paragraph: "Food sec__BLANK__ is a growing concern as the global pop__BLANK__ continues to rise. Droughts are red__BLANK__ crop yields in many regions. Experts rec__BLANK__ investing in sus__BLANK__ farming techniques to address this challenge.",
    blanks: [{ answer: "urity" }, { answer: "ulation" }, { answer: "ucing" }, { answer: "ommend" }, { answer: "tainable" }]
  },
  {
    title: "Topic: Mental Health",
    paragraph: "Mental health is an essential com__BLANK__ of overall well-being. Despite growing awa__BLANK__, many people still str__BLANK__ to access the support they need due to social sti__BLANK__. Governments must make mental health care more acc__BLANK__ to everyone.",
    blanks: [{ answer: "ponent" }, { answer: "reness" }, { answer: "uggle" }, { answer: "gma" }, { answer: "essible" }]
  }
];