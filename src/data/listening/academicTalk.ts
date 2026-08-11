// Migrated verbatim from public/listening/academic-talk/questions.js — content unchanged, typing added.
import type { ListeningPassage } from './types.ts';

export const academicTalkPassages: ListeningPassage[] = [
  {
    id: 1,
    title: "The Urban Heat Island Effect",
    subject: "Environmental Science",
    audioFile: null,
    duration: "3:00",
    transcript: `Today I want to discuss a phenomenon that affects millions of people worldwide: the urban heat island effect. Cities are significantly warmer than their surrounding rural areas, sometimes by as much as five degrees Celsius. But why does this happen?

The main reason is that urban surfaces — roads, buildings, and parking lots — are typically made of dark, heat-absorbing materials like asphalt and concrete. Unlike soil and vegetation, which reflect sunlight and release water through evaporation, these surfaces absorb solar energy and release it slowly as heat throughout the day and night.

The absence of trees makes the problem considerably worse. Trees provide shade and cool the surrounding air through a process called evapotranspiration. When cities replace green spaces with buildings, they lose this natural cooling mechanism.

There are several solutions being explored. Green roofs — rooftops covered with soil and plants — can reduce building temperatures and improve air quality. Reflective "cool roofs" painted white or light grey can bounce sunlight rather than absorbing it. And urban tree-planting programmes can gradually restore some of the natural cooling that cities have lost over decades.

These approaches won't eliminate the heat island effect entirely, but research shows they can reduce urban temperatures meaningfully and make cities significantly more liveable, particularly during heatwaves.`,
    questions: [
      { stem:"What is the main topic of this lecture?", options:["Why cities attract more storms than rural areas","The urban heat island effect and its causes and solutions","How concrete is manufactured in modern cities","The benefits of green architecture"], answer:1, type:"Main Idea" },
      { stem:"According to the lecturer, what is the primary reason cities are hotter than rural areas?", options:["Cities have more people producing body heat","Urban buildings block wind circulation","Dark urban surfaces absorb and retain solar energy","Cities have higher levels of air pollution"], answer:2, type:"Detail" },
      { stem:"What is evapotranspiration, according to the lecture?", options:["A method of constructing cool roofs","A process by which trees cool the air through releasing water","The way asphalt absorbs heat","A type of urban planning strategy"], answer:1, type:"Vocabulary" },
      { stem:"Which of the following is NOT mentioned as a solution to the heat island effect?", options:["Green roofs","Cool reflective roofs","Underground cooling systems","Urban tree-planting programmes"], answer:2, type:"Negative Fact" },
      { stem:"What does the lecturer imply about the proposed solutions?", options:["They are too expensive to be practical","They will completely solve the urban heat problem within a decade","They can reduce temperatures but not eliminate the effect entirely","They are only effective in small cities"], answer:2, type:"Inference" }
    ]
  },
  {
    id: 2,
    title: "The Science of Memory Consolidation",
    subject: "Cognitive Science",
    audioFile: null,
    duration: "2:45",
    transcript: `Have you ever wondered why you remember some things for decades and forget others within minutes? The answer lies in a process called memory consolidation — the way our brains stabilise and strengthen new information over time.

When you experience something new, your brain initially stores it in a region called the hippocampus. Think of this as a temporary holding area. The information is fragile at this stage — easily disrupted by stress, distraction, or fatigue.

For a memory to become long-term, it must be transferred to the cerebral cortex, the brain's large outer layer. This transfer happens primarily during sleep. Research has shown that during deep sleep, the brain replays recent experiences, essentially rehearsing them. Each time a memory is replayed, the neural connections associated with it grow stronger.

This has practical implications for learning. Cramming information the night before an exam, then staying up late, is one of the least effective study strategies, because it deprives the brain of the sleep it needs to consolidate what you've just learned.

Spacing your study sessions over several days and getting adequate sleep between them is far more effective. Each sleep period gives the brain another opportunity to consolidate and strengthen the material. So in a very real sense, going to sleep after studying is not a break from learning — it's part of the learning process itself.`,
    questions: [
      { stem:"What is the main subject of this lecture?", options:["How stress affects academic performance","The role of the hippocampus in emotion","How the brain consolidates and strengthens memories","Differences between short-term and working memory"], answer:2, type:"Main Idea" },
      { stem:"What does the lecturer compare the hippocampus to?", options:["A permanent filing cabinet","A temporary holding area","The brain's main processing unit","A replay device during sleep"], answer:1, type:"Detail" },
      { stem:"According to the lecture, when does the most important memory consolidation occur?", options:["Immediately after learning","During exercise","During deep sleep","While reviewing notes"], answer:2, type:"Detail" },
      { stem:"Why does the lecturer say cramming is ineffective?", options:["It introduces too much information too quickly","It relies on the wrong type of memory","It typically prevents the sleep needed to consolidate information","It only strengthens short-term memory pathways"], answer:2, type:"Inference" },
      { stem:"What study strategy does the lecturer recommend?", options:["Studying only in the morning when the brain is most alert","Using visual aids and diagrams","Spacing study sessions over several days with adequate sleep","Reviewing material immediately before sleeping"], answer:2, type:"Detail" }
    ]
  },
  {
    id: 3,
    title: "The Columbian Exchange",
    subject: "World History",
    audioFile: null,
    duration: "2:50",
    transcript: `Few events in history have reshaped the world as profoundly as the Columbian Exchange. This term refers to the massive transfer of plants, animals, diseases, and ideas between the Americas and the rest of the world that followed Christopher Columbus's voyages beginning in 1492.

Before 1492, the Americas and Eurasia had been biologically separated for approximately 12,000 years. They had developed entirely distinct ecosystems. When contact was established, the exchange of species was dramatic and often devastating.

Europe and Asia received potatoes, tomatoes, maize, cacao, and tobacco from the Americas. These new crops transformed European agriculture and diet. The potato in particular allowed populations in cold climates where wheat struggled to grow. Historians estimate that the potato contributed to significant population increases in places like Ireland and northern Europe.

In the other direction, Europeans brought horses, cattle, pigs, and wheat to the Americas, along with — far more destructively — diseases such as smallpox, measles, and influenza. Indigenous American populations had no prior exposure to these illnesses and therefore no immunity. The resulting epidemics were catastrophic, killing an estimated 50 to 90 percent of some native populations within a century of contact.

The Columbian Exchange, then, is not simply a story of trade and discovery. It is also a story of ecological upheaval, demographic collapse, and the unequal consequences of global connection.`,
    questions: [
      { stem:"What is the Columbian Exchange, according to the lecture?", options:["A trading agreement between Spain and Portugal in the 1500s","The transfer of plants, animals, diseases and ideas between the Americas and the rest of the world","Columbus's personal diary of his four voyages","A system of currency used in the colonial period"], answer:1, type:"Main Idea" },
      { stem:"For approximately how long had the Americas and Eurasia been biologically separated before 1492?", options:["2,000 years","5,000 years","12,000 years","50,000 years"], answer:2, type:"Detail" },
      { stem:"According to the lecturer, what role did the potato play in European history?", options:["It replaced wheat as the main crop throughout Europe","It contributed to population growth in cold climates","It caused food shortages in Ireland","It was primarily exported back to the Americas"], answer:1, type:"Detail" },
      { stem:"What does the lecturer say about the impact of European diseases on indigenous Americans?", options:["Most populations recovered within a generation","European doctors helped limit the spread of illness","Estimated death rates reached 50 to 90 percent in some populations","Indigenous peoples had some partial immunity from prior contact"], answer:2, type:"Detail" },
      { stem:"What is the lecturer's overall conclusion about the Columbian Exchange?", options:["It was primarily a positive development for global trade","It demonstrates the importance of biological diversity","It had deeply unequal and often devastating consequences alongside its benefits","It has been exaggerated by modern historians"], answer:2, type:"Inference" }
    ]
  }
,
  {
    id: 4,
    title: "Mycorrhizal Networks",
    subject: "Biology",
    audioFile: "/listening/academic-talk/audio/at-04.mp3",
    duration: "1:39",
    transcript: `When you walk through a forest, you see individual trees standing apart from one another. What you cannot see is that beneath your feet, most of those trees are physically connected.

The connection is made by fungi. Nearly ninety percent of land plants form a partnership with fungi called a mycorrhiza, which simply means "fungus root". The fungus wraps around, and often grows into, the plant's roots. From there its threads spread through the soil, reaching far beyond where the roots themselves can go.

This is a trade. The fungus cannot photosynthesise, so it takes sugars from the plant. In return, its threads are far finer than any root and can pull phosphorus, nitrogen and water out of soil that the plant could never reach alone. Neither partner is doing the other a favour — both are better off.

What makes this genuinely surprising is that a single fungal network can link many separate trees. Researchers have traced carbon moving from one tree through the fungus and into another, sometimes of a different species. Older, larger trees appear to pass resources to shaded seedlings growing beneath them.

This has led to the popular phrase "the wood wide web". I would ask you to treat that phrase with some caution. The transfers are real and repeatedly measured, but how much a tree depends on them, and whether the fungus is cooperating or simply pursuing its own interests, is still argued over. The connections are not in doubt. Their meaning is.`,
    questions: [
      { stem:"What is the main point of this lecture?", options:["Fungi are the most abundant organisms in forest soil","Trees compete with one another for limited soil nutrients","Fungi connect trees underground in a partnership whose significance is still debated","Forests recover faster than scientists once believed"], answer:2, type:"Main Idea" },
      { stem:"According to the lecturer, what does the plant give the fungus?", options:["Water drawn up from deep soil","Sugars produced by photosynthesis","Phosphorus and nitrogen","Physical protection from soil insects"], answer:1, type:"Detail" },
      { stem:"What does the term \"mycorrhiza\" mean, according to the lecture?", options:["Soil thread","Fungus root","Shared network","Root partner"], answer:1, type:"Vocabulary" },
      { stem:"Which of the following is NOT mentioned as something the fungus provides?", options:["Phosphorus","Nitrogen","Water","Sunlight"], answer:3, type:"Negative Fact" },
      { stem:"Why does the lecturer advise caution about the phrase \"the wood wide web\"?", options:["The connections have never been directly observed","The transfers are measured, but their importance and motive remain disputed","The phrase was invented by journalists rather than scientists","Only a small number of tree species form these networks"], answer:1, type:"Inference" }
    ]
  },
  {
    id: 5,
    title: "How We Find Planets Around Other Stars",
    subject: "Astronomy",
    audioFile: "/listening/academic-talk/audio/at-05.mp3",
    duration: "1:44",
    transcript: `In 1990 we knew of no planets outside our own solar system. Today the confirmed count is over five thousand. What changed was not our telescopes becoming powerful enough to see these planets — we still cannot see most of them. What changed was our willingness to look for them indirectly.

The difficulty is one of contrast. A star is roughly a billion times brighter than any planet orbiting it. Photographing the planet is like trying to photograph a moth beside a searchlight. So instead of looking at the planet, we watch the star for signs that something is there.

The first successful method was the radial velocity technique. A planet does not simply orbit its star; the two orbit a shared centre of mass, so the star wobbles slightly. That wobble shifts the colour of the star's light, very slightly redder as it moves away, bluer as it comes towards us. Measure the shift and you can infer the planet's mass.

The second method, and now the more productive one, is the transit method. If a planet's orbit happens to lie edge-on from our viewpoint, the planet crosses in front of its star once per orbit and the star dims — typically by less than one percent. The Kepler space telescope found thousands of planets this way.

Note the limitation in that word "happens". The transit method only works for the small fraction of systems aligned correctly. The planets we have found are not a fair sample of the planets that exist.`,
    questions: [
      { stem:"What is the lecture mainly about?", options:["The history of the Kepler space telescope","Indirect methods of detecting planets around other stars","Why planets outside our solar system are rare","How astronomers measure the distance to nearby stars"], answer:1, type:"Main Idea" },
      { stem:"Why does the lecturer say planets are difficult to photograph directly?", options:["They are too small to resolve at any distance","They move too quickly across the sky","Their star is roughly a billion times brighter","They emit no light of their own at all"], answer:2, type:"Detail" },
      { stem:"What causes the wobble used in the radial velocity method?", options:["The star and planet orbit a shared centre of mass","The planet's gravity heats the star's surface","The star rotates faster when a planet is close","Light bends as it passes the planet"], answer:0, type:"Detail" },
      { stem:"Which of the following is NOT mentioned in the lecture?", options:["The transit method","The radial velocity method","Direct imaging being difficult","Measuring a planet's atmosphere"], answer:3, type:"Negative Fact" },
      { stem:"What does the lecturer imply in the final paragraph?", options:["The transit method will soon be replaced","Our catalogue of known planets is biased by how we detect them","Most stars probably have no planets at all","The Kepler telescope produced unreliable results"], answer:1, type:"Inference" }
    ]
  },
  {
    id: 6,
    title: "The Invention of Linear Perspective",
    subject: "Art History",
    audioFile: "/listening/academic-talk/audio/at-06.mp3",
    duration: "1:42",
    transcript: `Look at a European painting made before about 1400 and something will seem wrong, though it may take you a moment to say what. Figures at the back are the same size as figures at the front. Buildings sit at impossible angles. The painting shows you objects, but it does not show you a space.

That changed in Florence, around 1420, with an architect named Filippo Brunelleschi. He worked out, and demonstrated publicly, that lines running away from the viewer appear to converge on a single point on the horizon — the vanishing point. Organise a picture around that point and flat paint suddenly reads as depth.

Brunelleschi never wrote his method down. It was Leon Battista Alberti who published it in 1435, turning a demonstration into a set of rules any trained painter could follow. That is what made it spread.

The effect on painting was immediate. Masaccio's fresco of the Holy Trinity gives the viewer a chapel that does not exist, receding convincingly into a flat wall. Contemporaries described it as a hole in the church.

I want to leave you with a caution, though. It is tempting to describe perspective as the discovery of how vision really works, as though earlier painters had simply failed. Perspective is a convention. It assumes a single unmoving eye, and it reproduces one particular way of organising space — a way that suited a culture increasingly interested in measurement, geometry and the individual observer. It is a choice that proved extraordinarily useful, not an inevitable truth.`,
    questions: [
      { stem:"What is the main purpose of this lecture?", options:["To explain how linear perspective developed and what it represents","To compare Italian and northern European painting","To argue that medieval painters lacked technical skill","To describe the construction of Florence's cathedral"], answer:0, type:"Main Idea" },
      { stem:"What is a vanishing point, according to the lecture?", options:["The brightest area of a composition","The point on the horizon where receding lines appear to converge","The centre of a circular painting","The place where a fresco meets the wall"], answer:1, type:"Vocabulary" },
      { stem:"Why does the lecturer emphasise Alberti's role?", options:["He painted the first work using perspective","He was Brunelleschi's teacher","He published the method as rules others could follow","He corrected errors in Brunelleschi's geometry"], answer:2, type:"Detail" },
      { stem:"How did contemporaries describe Masaccio's Holy Trinity?", options:["As a window onto heaven","As a hole in the church","As a mathematical puzzle","As unfinished"], answer:1, type:"Detail" },
      { stem:"What does the lecturer suggest about perspective in the final paragraph?", options:["It should be taught before any other painting technique","It is a cultural convention rather than a discovery about vision","It was rejected by later generations of painters","It works only for architectural subjects"], answer:1, type:"Inference" }
    ]
  },
  {
    id: 7,
    title: "The Tragedy of the Commons",
    subject: "Economics",
    audioFile: "/listening/academic-talk/audio/at-07.mp3",
    duration: "1:42",
    transcript: `In 1968 the ecologist Garrett Hardin published a short essay that has shaped environmental policy ever since. He asked you to picture a pasture open to all. Each herder grazing there faces a simple calculation: adding one more animal brings them the full benefit of that animal, while the cost — slightly poorer grazing — is shared across everyone. So each herder adds animals. And the pasture collapses.

Hardin called this the tragedy of the commons, and the word tragedy was deliberate. Nobody in the story behaves irrationally or maliciously. Each person does the sensible thing, and the sensible thing produces ruin. You can see the same structure in overfishing, in groundwater depletion, and in carbon emissions.

Hardin concluded that only two solutions existed: privatise the resource, or place it under state control. For decades that framing was treated as settled.

It was overturned largely by the political scientist Elinor Ostrom. Rather than reasoning from a hypothetical pasture, she went and looked at real ones — Swiss alpine meadows, Japanese village forests, Spanish irrigation systems, some managed successfully for centuries. Communities had invented their own rules: who may take how much, how boundaries are marked, how cheating is detected, how disputes are settled.

Her point was not that commons never collapse. Many do. Her point was that Hardin had quietly assumed the herders could not talk to one another. Once you allow people to communicate and enforce agreements, a third path opens between the market and the state. Ostrom received the Nobel Prize in Economics in 2009.`,
    questions: [
      { stem:"What is the main topic of this lecture?", options:["The environmental cost of modern agriculture","Hardin's tragedy of the commons and Ostrom's challenge to it","Why fisheries are harder to regulate than forests","The history of the Nobel Prize in Economics"], answer:1, type:"Main Idea" },
      { stem:"Why does the lecturer stress that the word \"tragedy\" was deliberate?", options:["Because the essay was written in response to a disaster","Because ruin follows even though no one behaves irrationally","Because Hardin borrowed the term from Greek drama","Because the pasture cannot be restored once damaged"], answer:1, type:"Detail" },
      { stem:"What two solutions did Hardin propose?", options:["Taxation and subsidy","Privatisation and state control","Education and voluntary restraint","Rationing and monitoring"], answer:1, type:"Detail" },
      { stem:"Which of the following is NOT mentioned as an example Ostrom studied?", options:["Swiss alpine meadows","Japanese village forests","Spanish irrigation systems","Canadian cod fisheries"], answer:3, type:"Negative Fact" },
      { stem:"What assumption in Hardin's argument does the lecturer identify as the weak point?", options:["That the pasture has a fixed capacity","That herders act in their own interest","That the herders cannot communicate with one another","That the resource is genuinely open to all"], answer:2, type:"Inference" }
    ]
  },
  {
    id: 8,
    title: "The Critical Period for Language",
    subject: "Linguistics",
    audioFile: "/listening/academic-talk/audio/at-08.mp3",
    duration: "1:42",
    transcript: `Every healthy child raised among speakers acquires their first language, fully and without instruction, by roughly age five. No one teaches a three-year-old the rules of grammar, and yet three-year-olds follow them. Adults learning a second language, by contrast, study for years and rarely reach the same fluency. Why the difference?

One answer is the critical period hypothesis, proposed by Eric Lenneberg in 1967. The claim is that the brain has a window, closing somewhere around puberty, during which language is acquired almost automatically. After it closes, language must be learned the hard way, using general-purpose reasoning rather than a dedicated capacity.

The strongest evidence is also the most distressing: the rare cases of children deprived of language until adolescence. Such children can go on to build large vocabularies, but they typically never acquire reliable grammar. Words come. Structure does not.

Second-language research points the same way, though less sharply. Accent is the clearest case — learners who begin after about twelve almost never sound native, whatever their fluency.

But here I would resist a tidy conclusion. The evidence does not really show a window slamming shut. It shows a gradual decline, with no obvious cliff edge, and the deprivation cases are confounded by the fact that those children suffered severe neglect of every other kind too. There is also the question of what changes: the brain's capacity, or simply an adult's circumstances, motivation and willingness to sound foolish. The pattern is not disputed. Its cause very much is.`,
    questions: [
      { stem:"What is the lecture mainly concerned with?", options:["Methods for teaching second languages to adults","Whether there is a limited window for acquiring language","How children learn vocabulary before grammar","Differences between spoken and written language"], answer:1, type:"Main Idea" },
      { stem:"According to the lecturer, when does the proposed critical period close?", options:["Around age five","Around puberty","At the start of formal schooling","It varies with the language being learned"], answer:1, type:"Detail" },
      { stem:"What do language-deprived children typically fail to acquire?", options:["Vocabulary","Reliable grammar","The ability to read","Pronunciation"], answer:1, type:"Detail" },
      { stem:"Which of the following is NOT given as evidence in the lecture?", options:["Cases of children deprived of early language","Accent in second-language learners","Brain scans showing when the window closes","The speed of first-language acquisition"], answer:2, type:"Negative Fact" },
      { stem:"What is the lecturer's own position on the hypothesis?", options:["It has been conclusively proven by deprivation cases","The pattern is real but its explanation remains uncertain","It applies to grammar but not to vocabulary or accent","It has been abandoned by most linguists"], answer:1, type:"Inference" }
    ]
  },
  {
    id: 9,
    title: "Why Roman Concrete Outlasted Ours",
    subject: "Materials Science",
    audioFile: "/listening/academic-talk/audio/at-09.mp3",
    duration: "1:42",
    transcript: `The Pantheon in Rome has stood for nineteen centuries, and its dome is still the largest unreinforced concrete dome on Earth. Roman harbour walls have sat in seawater for two thousand years. Meanwhile, a modern motorway bridge is designed to last perhaps a hundred years, and often does worse. This ought to bother us.

Part of the answer is the mix. Roman builders combined lime with volcanic ash from the region around Naples — a material called pozzolana. Seawater reacting with that ash slowly grows interlocking mineral crystals inside the concrete. The material does not merely resist the sea; it uses the sea to keep hardening.

The rest of the answer was, until recently, mistaken for sloppy work. Roman concrete is full of small white lumps of lime, and for a long time these were read as evidence of careless mixing. Work published in 2023 argued the opposite. When a crack forms and water reaches one of those lumps, the lime dissolves and recrystallises, sealing the crack. The flaw is a repair kit.

Now, the obvious question is why we do not simply return to the Roman recipe. The answer is that we ask more of concrete than they did. Modern structures are reinforced with steel, which needs the alkaline environment that Portland cement provides. Roman concrete is also weaker in compression and far slower to cure — no contractor will wait months. The lesson is not that the Romans were better engineers. It is that durability was worth more to them than speed, and we have made the opposite trade.`,
    questions: [
      { stem:"What is the main purpose of this lecture?", options:["To explain why Roman concrete lasts and why we do not copy it","To describe the construction of the Pantheon","To argue that modern engineering has declined","To compare Roman and Greek building materials"], answer:0, type:"Main Idea" },
      { stem:"What is pozzolana, according to the lecture?", options:["A type of Roman lime kiln","Volcanic ash from the region around Naples","A crystal that forms in seawater","The Roman name for concrete"], answer:1, type:"Vocabulary" },
      { stem:"What did the 2023 work conclude about the white lumps of lime?", options:["They were added as decoration","They indicate careless mixing","They allow the concrete to seal its own cracks","They weaken the concrete over time"], answer:2, type:"Detail" },
      { stem:"Which of the following is NOT given as a reason for using modern cement instead?", options:["Steel reinforcement needs an alkaline environment","Roman concrete is weaker in compression","Roman concrete cures slowly","Volcanic ash is no longer available"], answer:3, type:"Negative Fact" },
      { stem:"What does the lecturer conclude about the comparison?", options:["Roman engineers were more skilled than modern ones","The two traditions made different trade-offs between durability and speed","Modern concrete will eventually match Roman durability","The Pantheon has survived largely by chance"], answer:1, type:"Inference" }
    ]
  }
];

