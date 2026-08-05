const academicTalkPassages = [
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
];
