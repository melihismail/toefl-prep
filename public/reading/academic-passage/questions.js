// ── Format ────────────────────────────────────────────────────────────────────
// Each passage has:
//   title     — passage heading
//   topic     — subject area label (e.g. "Biology", "History")
//   passage   — ~200 word academic text (HTML allowed: use <span class="highlight">word</span>
//               to bold a word being tested in a vocabulary question)
//   questions — exactly 5 questions, each with:
//       type    — "Main Idea" | "Detail" | "Vocabulary" | "Inference" | "Negative Fact" | "Author's Purpose"
//       stem    — the question text
//       options — 4 answer strings
//       answer  — index 0–3 of correct option

const academicPassages = [

  // ── 1 ────────────────────────────────────────────────────────────────────────
  {
    title: "The Mirror Test and Animal Self-Awareness",
    topic: "Biology",
    passage: `Very young children cannot recognize themselves in a mirror; they usually achieve this milestone around 18 months of age. The ability to recognize oneself in a mirror is considered a key indicator of self-awareness and consciousness. But what about animals?

For many years, scientists assumed that only humans possessed this ability. However, experiments revealed that members of the great ape family — including chimpanzees, gorillas, and orangutans — could also recognize their own reflections. Researchers tested this by placing a colored mark on an ape's body in a location invisible without a mirror. If the ape touched the mark on its own body while looking in the mirror, scientists concluded that it was recognizing itself rather than a stranger.

More recently, dolphins, elephants, and even certain birds such as magpies have also passed versions of this test. These findings have led scientists to reconsider earlier assumptions about the boundaries of animal consciousness. Some researchers caution, however, that passing the mirror test does not necessarily mean an animal is self-aware in the same way humans are. The test measures a specific visual recognition ability, and self-awareness may involve many additional cognitive dimensions that the test cannot capture.`,
    questions: [
      {
        type: "Main Idea",
        stem: "What is the main idea of this passage?",
        options: [
          "Young children are more self-aware than most animals.",
          "The mirror test proves that several animal species are fully conscious.",
          "Research on mirror recognition has expanded understanding of animal self-awareness.",
          "Chimpanzees are the only animals capable of recognizing themselves in mirrors."
        ],
        answer: 2
      },
      {
        type: "Detail",
        stem: "According to the passage, how did researchers test self-recognition in apes?",
        options: [
          "They placed mirrors in the apes' natural habitat and observed their behavior.",
          "They placed a colored mark on the ape's body where it could not see without a mirror.",
          "They compared brain scans of apes and humans while both looked in mirrors.",
          "They showed apes videos of other apes and recorded their responses."
        ],
        answer: 1
      },
      {
        type: "Vocabulary",
        stem: "The word 'caution' in the final paragraph is closest in meaning to which of the following?",
        options: [
          "Confirm",
          "Warn",
          "Argue",
          "Deny"
        ],
        answer: 1
      },
      {
        type: "Inference",
        stem: "What can be inferred about the mirror test from the final paragraph?",
        options: [
          "It is considered the most reliable measure of animal intelligence.",
          "It has been proven to measure all aspects of self-awareness.",
          "It may not fully capture the complexity of self-awareness.",
          "It is only valid when used with primates."
        ],
        answer: 2
      },
      {
        type: "Negative Fact",
        stem: "Which of the following is NOT mentioned as an animal that has passed the mirror test?",
        options: [
          "Dolphins",
          "Magpies",
          "Elephants",
          "Dogs"
        ],
        answer: 3
      }
    ]
  },

  // ── 2 ────────────────────────────────────────────────────────────────────────
  {
    title: "Seaweed Bioplastics: A Sustainable Alternative",
    topic: "Environmental Science",
    passage: `Bioplastics made from seaweed and other aquatic plants are emerging as a promising alternative to conventional petroleum-based packaging materials. Unlike traditional plastics, which can persist in the environment for hundreds of years, seaweed-based materials decompose rapidly in composting systems, significantly reducing long-term environmental impact.

Most seaweed bioplastics are developed using brown and red algae species, which can be cultivated in marine environments without consuming freshwater resources or requiring chemical fertilizers. Because algae grows in the ocean rather than on land, its production does not compete with food crops for valuable farmland, an advantage that other plant-based bioplastics cannot always claim.

Beyond environmental benefits, seaweed cultivation offers potential economic opportunities for coastal communities, many of which have historically depended on fishing industries that are now under pressure from overfishing and climate change. Establishing seaweed farms could provide alternative livelihoods for these populations.

Despite its potential, seaweed bioplastic technology still faces significant challenges. Production costs remain high compared to conventional plastics, and the material's performance characteristics — such as moisture <span class="highlight">resistance</span> and durability — do not yet match those of traditional plastics in all applications. Continued research and investment are needed before seaweed bioplastics can be adopted at a commercial scale.`,
    questions: [
      {
        type: "Main Idea",
        stem: "What is the passage mainly about?",
        options: [
          "The negative environmental effects of conventional plastic packaging",
          "The potential and limitations of seaweed-based bioplastics",
          "Why coastal communities should invest in seaweed farming",
          "How algae is cultivated in marine environments"
        ],
        answer: 1
      },
      {
        type: "Detail",
        stem: "According to the passage, what advantage do seaweed bioplastics have over other plant-based bioplastics?",
        options: [
          "They are cheaper to produce than other bioplastics.",
          "They perform better in wet conditions.",
          "They do not compete with food crops for farmland.",
          "They decompose faster than other bioplastics."
        ],
        answer: 2
      },
      {
        type: "Vocabulary",
        stem: "The word 'resistance' as used in the passage is closest in meaning to which of the following?",
        options: [
          "Opposition",
          "Ability to withstand",
          "Flexibility",
          "Transparency"
        ],
        answer: 1
      },
      {
        type: "Negative Fact",
        stem: "Which of the following is NOT mentioned as a benefit of seaweed bioplastics?",
        options: [
          "They decompose rapidly in composting systems.",
          "They do not require freshwater to cultivate.",
          "They are currently cheaper than conventional plastics.",
          "They can provide economic opportunities for coastal communities."
        ],
        answer: 2
      },
      {
        type: "Inference",
        stem: "What can be inferred about conventional plastics from the passage?",
        options: [
          "They are made from seaweed-based materials.",
          "They remain in the environment for a very long time.",
          "They are already being replaced by bioplastics worldwide.",
          "They require large amounts of freshwater to produce."
        ],
        answer: 1
      }
    ]
  },

  // ── 3 ────────────────────────────────────────────────────────────────────────
  {
    title: "Urban Heat Islands",
    topic: "Environmental Science",
    passage: `As urban areas expand, the proliferation of dark, impermeable surfaces such as asphalt roads and conventional rooftops has contributed to a phenomenon known as the urban heat island effect. Cities affected by this effect experience significantly higher temperatures than the surrounding rural areas, sometimes by as much as 5 degrees Celsius.

The primary cause is the replacement of vegetation and soil — which naturally absorb and release heat slowly — with materials that absorb solar energy rapidly and radiate it back as heat. The absence of trees further compounds the problem, as trees provide shade and cool the air through a process called evapotranspiration, in which water evaporates from leaves and reduces ambient temperature.

Green roofs — rooftops covered with soil and vegetation — have been proposed as one solution. Research indicates that green roofs can lower building temperatures, provide habitats for birds and insects, and reduce flooding risks by absorbing rainfall and slowing its flow into drainage systems. However, they do not eliminate the need for urban sewer infrastructure; they simply delay and reduce the peak volume of water entering the system.

City planners increasingly view green roofs alongside tree-planting programs and the use of reflective building materials as essential components of strategies to make urban environments more climate-resilient and livable.`,
    questions: [
      {
        type: "Main Idea",
        stem: "What is the main topic of this passage?",
        options: [
          "The economic costs of building green roofs in cities",
          "Why cities are warmer than rural areas and how green infrastructure can help",
          "The impact of deforestation on global climate change",
          "How evapotranspiration works in urban environments"
        ],
        answer: 1
      },
      {
        type: "Detail",
        stem: "According to the passage, what is the primary cause of the urban heat island effect?",
        options: [
          "Increased vehicle emissions in urban centers",
          "The removal of underground water sources",
          "The replacement of natural surfaces with heat-absorbing materials",
          "Rising global temperatures caused by climate change"
        ],
        answer: 2
      },
      {
        type: "Author's Purpose",
        stem: "Why does the author mention evapotranspiration in the second paragraph?",
        options: [
          "To explain how green roofs reduce flooding",
          "To describe how trees help cool urban environments",
          "To argue that trees should be removed from cities",
          "To compare urban and rural rainfall patterns"
        ],
        answer: 1
      },
      {
        type: "Negative Fact",
        stem: "According to the passage, which of the following is NOT a benefit of green roofs?",
        options: [
          "Lowering building temperatures",
          "Providing wildlife habitats",
          "Eliminating the need for urban sewer systems",
          "Reducing flooding by absorbing rainfall"
        ],
        answer: 2
      },
      {
        type: "Inference",
        stem: "What can be inferred about city planners' attitudes toward green infrastructure?",
        options: [
          "They believe green roofs are too expensive to implement widely.",
          "They view green infrastructure as a useful tool for improving cities.",
          "They think green roofs should replace all conventional rooftops.",
          "They are skeptical about the effectiveness of tree-planting programs."
        ],
        answer: 1
      }
    ]
  },

  // ── 4 ────────────────────────────────────────────────────────────────────────
  {
    title: "The Golden Age of Hollywood",
    topic: "History",
    passage: `During the so-called Golden Age of Hollywood, roughly spanning the late 1920s to the late 1940s, the American film industry was dominated by a small number of powerful studios known as the "Big Five": Warner Bros., Paramount, RKO, Metro-Goldwyn-Mayer, and Twentieth Century Fox. These studios operated under a business model known as vertical integration, meaning they controlled every stage of a film's production, distribution, and exhibition.

At the production level, the studio system functioned much like an industrial assembly line. Studios employed thousands of workers on long-term contracts — including actors, directors, writers, and technical crew — ensuring a reliable and consistent output of films. Stars were treated as studio assets, with their public personas carefully managed and their professional choices tightly controlled.

This model gave studios enormous economic and creative power but also generated significant discontent among creative professionals, who often felt trapped by their contracts. The system began to collapse after a 1948 Supreme Court ruling — United States v. Paramount Pictures — which found that studio ownership of theater chains violated antitrust law and forced the studios to divest their exhibition businesses.

The breakup of vertical integration marked the beginning of the end for the classic studio system and opened the door for independent filmmakers, transforming the landscape of American cinema in the decades that followed.`,
    questions: [
      {
        type: "Main Idea",
        stem: "What is the passage mainly about?",
        options: [
          "The artistic achievements of Hollywood films in the 1930s and 1940s",
          "The rise and decline of the vertical integration model in Hollywood",
          "How the Supreme Court changed American entertainment law",
          "Why actors were dissatisfied with working in Hollywood studios"
        ],
        answer: 1
      },
      {
        type: "Detail",
        stem: "According to the passage, what did vertical integration allow studios to control?",
        options: [
          "Government film censorship laws",
          "Every stage of a film's production, distribution, and exhibition",
          "The personal lives of actors outside of work",
          "International distribution of American films"
        ],
        answer: 1
      },
      {
        type: "Vocabulary",
        stem: "The word 'divest' in the third paragraph is closest in meaning to which of the following?",
        options: [
          "Expand",
          "Promote",
          "Give up or sell off",
          "Investigate"
        ],
        answer: 2
      },
      {
        type: "Inference",
        stem: "What can be inferred about the actors and directors who worked under the studio system?",
        options: [
          "They were free to choose their own projects and roles.",
          "They had limited control over their professional careers.",
          "They were paid more than workers in other industries.",
          "They openly supported the vertical integration model."
        ],
        answer: 1
      },
      {
        type: "Author's Purpose",
        stem: "Why does the author mention the 1948 Supreme Court ruling?",
        options: [
          "To explain why Hollywood films declined in quality after the 1940s",
          "To describe the legal reason the classic studio system began to collapse",
          "To argue that antitrust law harmed the American film industry",
          "To show that independent filmmakers were more successful than studios"
        ],
        answer: 1
      }
    ]
  },

  // ── 5 ────────────────────────────────────────────────────────────────────────
  {
    title: "Hydrothermal Vents and Deep-Sea Life",
    topic: "Marine Biology",
    passage: `Before 1977, scientists believed that all life on Earth ultimately depended on the sun. The discovery of hydrothermal vents along the Galápagos Rift that year fundamentally challenged this assumption and transformed the field of oceanography.

Hydrothermal vents are underwater fissures in the ocean floor through which geothermally heated water flows. They form along mid-ocean ridges, where tectonic plates diverge. Cold seawater seeps into cracks in the ocean floor, is heated by underlying magma to temperatures exceeding 400 degrees Celsius, and then rises back toward the surface, carrying dissolved minerals from the surrounding rock.

The extreme conditions around these vents — near-total darkness, enormous pressure, and scalding temperatures — were long assumed to be incompatible with life. Yet scientists discovered thriving ecosystems clustered around the vents. Rather than relying on photosynthesis, these communities depend on a process called chemosynthesis, in which bacteria convert the chemical energy released by the venting minerals into organic matter, forming the base of the food chain.

The discovery of vent ecosystems has profound implications beyond oceanography. It has expanded scientific understanding of where life might exist in the universe, particularly on moons such as Europa and Enceladus, which are believed to have subsurface oceans warmed by geological activity similar to that which drives Earth's hydrothermal vents.`,
    questions: [
      {
        type: "Main Idea",
        stem: "What is the main point of this passage?",
        options: [
          "Hydrothermal vents are the most extreme environments on Earth.",
          "The discovery of hydrothermal vents changed scientific understanding of life on Earth and beyond.",
          "Chemosynthesis is a more efficient process than photosynthesis.",
          "Life on other moons in our solar system is very likely to exist."
        ],
        answer: 1
      },
      {
        type: "Detail",
        stem: "According to the passage, how are hydrothermal vents formed?",
        options: [
          "Volcanoes on the ocean floor erupt and create openings in the seabed.",
          "Cold seawater seeps into cracks, is heated by magma, and rises back up.",
          "Tectonic plates collide and force water upward through the ocean floor.",
          "Underwater earthquakes create fissures that release stored geothermal energy."
        ],
        answer: 1
      },
      {
        type: "Vocabulary",
        stem: "The word 'thriving' in the third paragraph is closest in meaning to which of the following?",
        options: [
          "Struggling",
          "Isolated",
          "Flourishing",
          "Disappearing"
        ],
        answer: 2
      },
      {
        type: "Inference",
        stem: "What can be inferred about Europa and Enceladus from the final paragraph?",
        options: [
          "Scientists have already discovered life on both moons.",
          "They are considered possible locations for life due to their subsurface oceans.",
          "They have hydrothermal vents identical to those found on Earth.",
          "They are the only moons in the solar system with geological activity."
        ],
        answer: 1
      },
      {
        type: "Author's Purpose",
        stem: "Why does the author mention the year 1977 in the first paragraph?",
        options: [
          "To explain when the field of oceanography was first established",
          "To mark the moment a major scientific assumption was overturned",
          "To argue that scientists had ignored deep-sea research before 1977",
          "To introduce the history of tectonic plate research"
        ],
        answer: 1
      }
    ]
  },

  // ── 6 ────────────────────────────────────────────────────────────────────────
  {
    title: "The Evolution of the Bicycle",
    topic: "History of Technology",
    passage: `The modern bicycle is so familiar that it is easy to overlook its complex evolutionary history. The earliest ancestors of the bicycle, introduced in the early 19th century, were known as velocipedes or hobby horses. These devices consisted of two wheels connected by a wooden frame but lacked pedals entirely. Riders propelled themselves by pushing their feet against the ground, much like a modern scooter. While velocipedes enjoyed brief popularity among European elites, they were heavy, uncomfortable, and poorly suited to the unpaved roads of the era.

The addition of pedals in the 1860s produced the boneshaker — named for the jarring ride it delivered on cobblestone streets. A significant redesign in the 1870s produced the penny-farthing, characterized by an enormous front wheel and a tiny rear wheel. The large front wheel allowed greater speed for each pedal rotation but made the bicycle dangerously unstable and difficult to mount.

The safety bicycle, introduced in the 1880s, resolved these problems by placing two equal-sized wheels and moving the pedals to a central position connected to the rear wheel by a chain drive. This design proved far more stable and accessible, triggering a cycling boom across Europe and North America. The safety bicycle's basic architecture remains the foundation of virtually all modern bicycles, a testament to how well the 19th-century design solved the fundamental challenges of human-powered transport.`,
    questions: [
      {
        type: "Main Idea",
        stem: "What is the passage mainly about?",
        options: [
          "Why the penny-farthing was considered dangerous",
          "How the bicycle evolved from early prototypes to the modern design",
          "The cultural impact of cycling in 19th-century Europe",
          "The role of chain drive technology in transportation history"
        ],
        answer: 1
      },
      {
        type: "Detail",
        stem: "According to the passage, what was the main problem with the penny-farthing?",
        options: [
          "It lacked pedals and required riders to push with their feet.",
          "It was too heavy for most roads of the era.",
          "Its large front wheel made it unstable and hard to mount.",
          "Its chain drive mechanism frequently broke down."
        ],
        answer: 2
      },
      {
        type: "Vocabulary",
        stem: "The word 'testament' in the final sentence is closest in meaning to which of the following?",
        options: [
          "Replacement",
          "Contradiction",
          "Proof or evidence",
          "Improvement"
        ],
        answer: 2
      },
      {
        type: "Inference",
        stem: "What can be inferred about the safety bicycle from the passage?",
        options: [
          "It was less popular than the penny-farthing in the 1880s.",
          "It was the first bicycle design to use wheels.",
          "Its design was so effective that it is still used today.",
          "It was originally developed for professional racers."
        ],
        answer: 2
      },
      {
        type: "Negative Fact",
        stem: "Which of the following is NOT mentioned as a characteristic of early velocipedes?",
        options: [
          "They lacked pedals.",
          "They were made with a wooden frame.",
          "They were powered by a chain drive.",
          "They were propelled by pushing feet against the ground."
        ],
        answer: 2
      }
    ]
  },

  // ── 7 ────────────────────────────────────────────────────────────────────────
  {
    title: "The Cognitive Benefits of Bilingualism",
    topic: "Cognitive Science",
    passage: `For much of the 20th century, researchers believed that growing up with two languages confused children and slowed their cognitive development. More recent research has overturned this view, revealing that bilingualism offers a range of significant cognitive advantages that persist throughout life.

Studies consistently show that bilingual individuals demonstrate superior performance on tasks requiring executive function — the set of mental processes that govern attention, cognitive flexibility, and the ability to switch between tasks. Scientists attribute these advantages to the constant mental effort bilingual speakers exert in managing two language systems simultaneously, even when using only one language. This ongoing mental exercise appears to strengthen the neural pathways associated with attention control.

One of the most discussed findings is that bilingualism may delay the onset of dementia. Research suggests that bilingual individuals develop symptoms of Alzheimer's disease an average of four to five years later than monolingual individuals with otherwise similar profiles. Researchers hypothesize that managing two languages builds a form of cognitive reserve — extra neural resources that allow the brain to compensate for the damage caused by neurological disease.

Not all researchers agree on the strength of these effects, and some studies have failed to replicate the bilingual advantage in specific tasks. Nevertheless, the broad consensus in cognitive science supports the view that lifelong bilingualism produces measurable benefits for the brain's executive functions and long-term resilience.`,
    questions: [
      {
        type: "Main Idea",
        stem: "What is the main argument of this passage?",
        options: [
          "Bilingual children perform worse than monolingual children in school.",
          "Recent research shows that bilingualism provides significant cognitive benefits.",
          "The effects of bilingualism on dementia have been proven beyond doubt.",
          "Learning a second language as an adult produces the same benefits as childhood bilingualism."
        ],
        answer: 1
      },
      {
        type: "Detail",
        stem: "According to the passage, why do bilingual speakers show stronger executive function?",
        options: [
          "They spend more time reading and studying than monolingual speakers.",
          "They constantly manage two language systems, which strengthens attention control.",
          "They have larger brains than monolingual speakers.",
          "They are exposed to more complex grammar structures from an early age."
        ],
        answer: 1
      },
      {
        type: "Vocabulary",
        stem: "The word 'replicate' in the final paragraph is closest in meaning to which of the following?",
        options: [
          "Reproduce or repeat",
          "Disprove",
          "Publish",
          "Improve"
        ],
        answer: 0
      },
      {
        type: "Inference",
        stem: "What can be inferred about the early 20th-century view of bilingualism?",
        options: [
          "It was based on extensive and reliable scientific research.",
          "It discouraged many parents from raising children bilingually.",
          "It has been fully confirmed by modern neuroscience.",
          "It was only held by scientists in English-speaking countries."
        ],
        answer: 1
      },
      {
        type: "Author's Purpose",
        stem: "Why does the author mention in the final paragraph that some studies failed to replicate the bilingual advantage?",
        options: [
          "To argue that bilingualism has no real cognitive benefits",
          "To suggest the research on bilingualism is completely unreliable",
          "To show a balanced view while still supporting the overall consensus",
          "To explain why scientists stopped researching bilingualism"
        ],
        answer: 2
      }
    ]
  },

  // ── 8 ────────────────────────────────────────────────────────────────────────
  {
    title: "Bees and Urban Ecosystems",
    topic: "Ecology",
    passage: `Bees are essential pollinators, responsible for facilitating the reproduction of approximately one-third of the world's food crops. While public concern about declining bee populations has historically focused on rural agricultural settings, researchers have increasingly turned their attention to urban environments, with surprising results.

Studies conducted in cities across Europe and North America suggest that urban areas can support unexpectedly high levels of bee diversity and abundance. Unlike monoculture farmland — where a single crop dominates vast areas and pesticide use is intensive — cities offer a patchwork of flowering gardens, parks, street trees, and green rooftops that provide bees with a diverse and relatively stable supply of food throughout the growing season.

Urban bees also face fewer exposures to the agricultural pesticides that have been widely implicated in population declines. However, city-dwelling bees are not without their own challenges: habitat fragmentation, artificial lighting that disrupts foraging behavior, and the urban heat island effect all pose significant threats.

Researchers argue that cities could play a meaningful role in supporting pollinator conservation. Practical measures such as planting native flowering species, reducing mowing frequency in parks, and installing green roofs could collectively create a more hospitable urban environment for bees. Some cities have already begun implementing such policies, viewing pollinator-friendly urban design not only as an ecological benefit but also as a contribution to local food security and public wellbeing.`,
    questions: [
      {
        type: "Main Idea",
        stem: "What is the main idea of this passage?",
        options: [
          "Urban pesticide use is the leading cause of global bee decline.",
          "Bees are more important than other pollinators for food production.",
          "Cities can support bee populations and may contribute to pollinator conservation.",
          "Monoculture farming is the best environment for bee biodiversity."
        ],
        answer: 2
      },
      {
        type: "Detail",
        stem: "According to the passage, why might cities support greater bee diversity than monoculture farmland?",
        options: [
          "Cities have higher average temperatures that bees prefer.",
          "Cities provide a variety of flowering plants and lower pesticide exposure.",
          "Bees are naturally attracted to artificial lighting in urban areas.",
          "Urban bees have evolved to survive without pollen from flowers."
        ],
        answer: 1
      },
      {
        type: "Negative Fact",
        stem: "Which of the following is NOT mentioned as a threat to urban bees?",
        options: [
          "Habitat fragmentation",
          "Artificial lighting",
          "The urban heat island effect",
          "Lack of water sources"
        ],
        answer: 3
      },
      {
        type: "Vocabulary",
        stem: "The word 'hospitable' in the fourth paragraph is closest in meaning to which of the following?",
        options: [
          "Dangerous",
          "Welcoming and supportive",
          "Isolated",
          "Temporary"
        ],
        answer: 1
      },
      {
        type: "Inference",
        stem: "What can be inferred about cities that have already begun implementing pollinator-friendly policies?",
        options: [
          "They have completely solved the problem of bee population decline.",
          "They view urban ecology as connected to human wellbeing.",
          "They are only located in Europe.",
          "They have banned all pesticide use within city limits."
        ],
        answer: 1
      }
    ]
  }

];
