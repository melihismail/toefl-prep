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
  },

  // ── Easier paragraphs (ETS-level) ──

  {
    title: "Topic: Cooking",
    paragraph: "Coo__BLANK__ at home has become more pop__BLANK__ in recent years. Many people find that prepa__BLANK__ their own meals is not only hea__BLANK__ but also more affordable. Fresh ingr__BLANK__ from local markets are often che__BLANK__ than restaurant food. Learning to cook is a valu__BLANK__ skill that everyone can ben__BLANK__ from.",
    blanks: [{ answer: "king" }, { answer: "ular" }, { answer: "ring" }, { answer: "lthier" }, { answer: "edients" }, { answer: "aper" }, { answer: "able" }, { answer: "efit" }]
  },
  {
    title: "Topic: Friendship",
    paragraph: "Good fri__BLANK__ are an important part of a happy and hea__BLANK__ life. They provide emo__BLANK__ support and help us through dif__BLANK__ times. Research sugg__BLANK__ that people with strong social conn__BLANK__ tend to live longer. Maintaining friend__BLANK__ requires effort, but the rew__BLANK__ are well worth it.",
    blanks: [{ answer: "ends" }, { answer: "lthy" }, { answer: "tional" }, { answer: "ficult" }, { answer: "ests" }, { answer: "ections" }, { answer: "ships" }, { answer: "ards" }]
  },
  {
    title: "Topic: Exercise",
    paragraph: "Reg__BLANK__ physical exercise is one of the most eff__BLANK__ ways to stay healthy. Even a short daily wa__BLANK__ can significantly reduce the ri__BLANK__ of heart disease. Experts rec__BLANK__ at least thirty minutes of mod__BLANK__ activity each day. People who exercise also rep__BLANK__ better sleep and lower stress levels.",
    blanks: [{ answer: "ular" }, { answer: "ective" }, { answer: "lk" }, { answer: "sk" }, { answer: "ommend" }, { answer: "erate" }, { answer: "ort" }]
  },
  {
    title: "Topic: Reading",
    paragraph: "Rea__BLANK__ books on a regular basis is one of the be__BLANK__ ways to build your vocabulary. It also helps dev__BLANK__ critical thinking and impr__BLANK__ concentration. Students who read wid__BLANK__ tend to perform better in school. Public libr__BLANK__ offer free access to thousands of titles for readers of all ag__BLANK__.",
    blanks: [{ answer: "ding" }, { answer: "st" }, { answer: "elop" }, { answer: "ove" }, { answer: "ely" }, { answer: "aries" }, { answer: "es" }]
  },
  {
    title: "Topic: Pollution",
    paragraph: "Air pol__BLANK__ is a growing concern in many la__BLANK__ cities around the world. Factories and veh__BLANK__ release harmful gases that dam__BLANK__ both human health and the environment. Gover__BLANK__ are introducing stricter regulations to lim__BLANK__ emissions. Individuals can also contr__BLANK__ by using public transport or cycling to wo__BLANK__.",
    blanks: [{ answer: "lution" }, { answer: "rge" }, { answer: "icles" }, { answer: "age" }, { answer: "nments" }, { answer: "it" }, { answer: "ibute" }, { answer: "rk" }]
  },
  {
    title: "Topic: Pets",
    paragraph: "Hav__BLANK__ a pet can bring great joy and comp__BLANK__ to a household. Dogs and ca__BLANK__ are the most common choices, but some fam__BLANK__ prefer smaller animals. Taking care of a pet teaches chi__BLANK__ about responsibility and emp__BLANK__. Studies show that pet owners often exper__BLANK__ lower levels of stress.",
    blanks: [{ answer: "ing" }, { answer: "anionship" }, { answer: "ts" }, { answer: "ilies" }, { answer: "ldren" }, { answer: "athy" }, { answer: "ience" }]
  },
  {
    title: "Topic: Shopping",
    paragraph: "Online shop__BLANK__ has grown rapidly over the past dec__BLANK__. Millions of cust__BLANK__ now prefer to browse and ord__BLANK__ products from the comfort of their homes. The conv__BLANK__ of home delivery has made traditional stores less pop__BLANK__. However, many people still enj__BLANK__ the experience of visiting shops in per__BLANK__.",
    blanks: [{ answer: "ping" }, { answer: "ade" }, { answer: "omers" }, { answer: "er" }, { answer: "enience" }, { answer: "ular" }, { answer: "oy" }, { answer: "son" }]
  },
  {
    title: "Topic: Recycling",
    paragraph: "Recy__BLANK__ is one of the simplest ways to help prot__BLANK__ the environment. By separ__BLANK__ waste into paper, plastic, and glass, we can red__BLANK__ the amount sent to landfills. Many coun__BLANK__ have introduced programmes to enc__BLANK__ recycling at home. Even small eff__BLANK__ can make a big diff__BLANK__ over time.",
    blanks: [{ answer: "cling" }, { answer: "ect" }, { answer: "ating" }, { answer: "uce" }, { answer: "tries" }, { answer: "ourage" }, { answer: "orts" }, { answer: "erence" }]
  },
  {
    title: "Topic: Music",
    paragraph: "Lis__BLANK__ to music is a universal act__BLANK__ enjoyed by people of all ages. It can improve your mo__BLANK__ and help reduce feelings of str__BLANK__. Many students find that calm backgr__BLANK__ music helps them conc__BLANK__ while studying. Musicians themselves often rep__BLANK__ that playing an instrument brings them deep satis__BLANK__.",
    blanks: [{ answer: "tening" }, { answer: "ivity" }, { answer: "od" }, { answer: "ess" }, { answer: "ound" }, { answer: "entrate" }, { answer: "ort" }, { answer: "faction" }]
  },
  {
    title: "Topic: Sports",
    paragraph: "Play__BLANK__ sports is an excellent way for young peo__BLANK__ to develop important life skills. Team sports in partic__BLANK__ teach discipline, cooper__BLANK__, and communication. Regular physical act__BLANK__ also keeps the body hea__BLANK__ and the mind sharp. Schools around the world rec__BLANK__ that students participate in at least one sport.",
    blanks: [{ answer: "ing" }, { answer: "ple" }, { answer: "ular" }, { answer: "ation" }, { answer: "ivity" }, { answer: "lthy" }, { answer: "ommend" }]
  },
  {
    title: "Topic: Computers",
    paragraph: "Comp__BLANK__ have become an essential part of mod__BLANK__ life. They are used in almost every ind__BLANK__, from healthcare to education. Without comp__BLANK__, many of the tasks we perform daily would take much lon__BLANK__. However, spending too much ti__BLANK__ in front of a screen can have neg__BLANK__ effects on health.",
    blanks: [{ answer: "uters" }, { answer: "ern" }, { answer: "ustry" }, { answer: "uters" }, { answer: "ger" }, { answer: "me" }, { answer: "ative" }]
  },
  {
    title: "Topic: Farming",
    paragraph: "Far__BLANK__ is one of the oldest and most important occ__BLANK__ in human history. Modern agri__BLANK__ uses advanced technology to inc__BLANK__ crop yields and reduce waste. Despite these improve__BLANK__, millions of farmers still face chall__BLANK__ such as drought and poor soil. Sustainable farming prac__BLANK__ are becoming increasingly nec__BLANK__ to feed the growing population.",
    blanks: [{ answer: "ming" }, { answer: "upations" }, { answer: "culture" }, { answer: "rease" }, { answer: "ments" }, { answer: "enges" }, { answer: "tices" }, { answer: "essary" }]
  },
  {
    title: "Topic: Photography",
    paragraph: "Phot__BLANK__ has changed dramatically since the inve__BLANK__ of the digital camera. Today, almost every__BLANK__ carries a smartphone capable of taking high-qua__BLANK__ pictures. Social media plat__BLANK__ have made sharing images easier than ever bef__BLANK__. Professional photog__BLANK__ continue to push creative bound__BLANK__ with new techniques and equipment.",
    blanks: [{ answer: "ography" }, { answer: "ntion" }, { answer: "one" }, { answer: "lity" }, { answer: "forms" }, { answer: "ore" }, { answer: "raphers" }, { answer: "aries" }]
  },
  {
    title: "Topic: Safety",
    paragraph: "Road saf__BLANK__ is a shared respon__BLANK__ among drivers, cyclists, and pedestr__BLANK__. Every year, thousands of acc__BLANK__ could be prevented by simply following traf__BLANK__ rules. Wearing seatbelts and obeying speed lim__BLANK__ are among the most effective measures. Governments also inv__BLANK__ in better road design to prot__BLANK__ all users.",
    blanks: [{ answer: "ety" }, { answer: "sibility" }, { answer: "ians" }, { answer: "idents" }, { answer: "fic" }, { answer: "its" }, { answer: "est" }, { answer: "ect" }]
  },
  {
    title: "Topic: Tourism",
    paragraph: "Tour__BLANK__ is a major source of inc__BLANK__ for many countries around the world. Visitors spend mo__BLANK__ on accommodation, food, and local attra__BLANK__. Popular destinations bene__BLANK__ from tourism but also face challenges such as overcr__BLANK__ and environmental damage. Sustainable tour__BLANK__ aims to balance economic growth with the prot__BLANK__ of natural and cultural resources.",
    blanks: [{ answer: "ism" }, { answer: "ome" }, { answer: "ney" }, { answer: "ctions" }, { answer: "fit" }, { answer: "owding" }, { answer: "ism" }, { answer: "ection" }]
  },
  {
    title: "Topic: Newspapers",
    paragraph: "News__BLANK__ have been an important source of info__BLANK__ for hundreds of years. Although many read__BLANK__ have shifted to online platforms, print media still has a loyal aud__BLANK__. Journalists work hard to inv__BLANK__ stories and present accur__BLANK__ reports. A free press is widely considered ess__BLANK__ for a healthy democracy.",
    blanks: [{ answer: "papers" }, { answer: "rmation" }, { answer: "ers" }, { answer: "ience" }, { answer: "estigate" }, { answer: "ate" }, { answer: "ential" }]
  },
  {
    title: "Topic: Gardens",
    paragraph: "Gard__BLANK__ is a relaxing hobby that conn__BLANK__ people with the natural world. Growing your own veg__BLANK__ can save money and provide fre__BLANK__ produce for your family. Community gar__BLANK__ also bring neighbours together and impr__BLANK__ the appearance of urban areas. Many schools now include gard__BLANK__ projects to teach children about plants and nut__BLANK__.",
    blanks: [{ answer: "ening" }, { answer: "ects" }, { answer: "etables" }, { answer: "sh" }, { answer: "dens" }, { answer: "ove" }, { answer: "ening" }, { answer: "rition" }]
  },
  {
    title: "Topic: Breakfast",
    paragraph: "Eating a hea__BLANK__ breakfast gives your body the ene__BLANK__ it needs to start the day. Studies have sh__BLANK__ that people who eat breakfast regularly tend to perf__BLANK__ better at work and school. A bal__BLANK__ morning meal should include protein, whole grains, and fru__BLANK__. Skipping breakfast can lead to tir__BLANK__ and difficulty concentrating later in the morning.",
    blanks: [{ answer: "lthy" }, { answer: "rgy" }, { answer: "own" }, { answer: "orm" }, { answer: "anced" }, { answer: "it" }, { answer: "edness" }]
  },
  {
    title: "Topic: Hospitals",
    paragraph: "Hosp__BLANK__ are essential institutions that provide med__BLANK__ care to people in need. Doctors, nurses, and other health prof__BLANK__ work long hours to treat patients and save li__BLANK__. Modern hospitals are equ__BLANK__ with advanced technology to diagnose and treat a wide range of cond__BLANK__. Access to quality healthcare rem__BLANK__ a challenge in many parts of the world.",
    blanks: [{ answer: "itals" }, { answer: "ical" }, { answer: "essionals" }, { answer: "ves" }, { answer: "ipped" }, { answer: "itions" }, { answer: "ains" }]
  },
  {
    title: "Topic: Weather",
    paragraph: "Wea__BLANK__ forecasts help millions of people plan their daily act__BLANK__ and prepare for changing conditions. Meteor__BLANK__ use satellites and computers to pred__BLANK__ temperature, rainfall, and wind patterns. Accurate wea__BLANK__ information is especially important for farmers, pilots, and emergency serv__BLANK__. Adv__BLANK__ in technology have made forecasts significantly more reli__BLANK__ over the past few decades.",
    blanks: [{ answer: "ther" }, { answer: "ivities" }, { answer: "ologists" }, { answer: "ict" }, { answer: "ther" }, { answer: "ices" }, { answer: "ances" }, { answer: "able" }]
  },
  {
    title: "Topic: Inventions",
    paragraph: "Through__BLANK__ history, great inventions have changed the way people li__BLANK__ and work. The printing press made books acce__BLANK__ to ordinary people for the first time. The tel__BLANK__ allowed communication across vast distances. Today, the int__BLANK__ connects billions of people and continues to trans__BLANK__ nearly every aspect of daily life.",
    blanks: [{ answer: "out" }, { answer: "ve" }, { answer: "ssible" }, { answer: "ephone" }, { answer: "ernet" }, { answer: "form" }]
  },
  {
    title: "Topic: Forests",
    paragraph: "For__BLANK__ cover approximately one-third of the Earth's land sur__BLANK__. They provide oxygen, store car__BLANK__, and support an incredible variety of wild__BLANK__. Deforestation is dest__BLANK__ these vital ecosystems at an alarming rate. Protecting existing for__BLANK__ and planting new trees are ess__BLANK__ steps in the fight against climate change.",
    blanks: [{ answer: "ests" }, { answer: "face" }, { answer: "bon" }, { answer: "life" }, { answer: "roying" }, { answer: "ests" }, { answer: "ential" }]
  },
  {
    title: "Topic: Manners",
    paragraph: "Good man__BLANK__ are valued in every culture and soci__BLANK__. Simple actions like saying please and thank you show res__BLANK__ for others. In professional settings, pol__BLANK__ behaviour can make a strong first impr__BLANK__. Parents and teachers play a key ro__BLANK__ in teaching children the importance of cour__BLANK__ and kindness.",
    blanks: [{ answer: "ners" }, { answer: "ety" }, { answer: "pect" }, { answer: "ite" }, { answer: "ession" }, { answer: "le" }, { answer: "tesy" }]
  },
  {
    title: "Topic: Electricity",
    paragraph: "Elec__BLANK__ is one of the most important discoveries in human hist__BLANK__. It powers our homes, schools, hospi__BLANK__, and workplaces. Without it, most of the dev__BLANK__ and machines we depend on every day would not func__BLANK__. Scientists continue to expl__BLANK__ cleaner ways to generate electricity in order to reduce poll__BLANK__.",
    blanks: [{ answer: "tricity" }, { answer: "ory" }, { answer: "tals" }, { answer: "ices" }, { answer: "tion" }, { answer: "ore" }, { answer: "ution" }]
  },
  {
    title: "Topic: Birds",
    paragraph: "Bi__BLANK__ are among the most diverse groups of animals on the pla__BLANK__. They can be found on every cont__BLANK__ including Antarctica. Birds play an important ro__BLANK__ in the ecosystem by spreading seeds and contr__BLANK__ insect populations. Sadly, many bird spe__BLANK__ are now threatened due to habitat lo__BLANK__ and climate change.",
    blanks: [{ answer: "rds" }, { answer: "net" }, { answer: "inent" }, { answer: "le" }, { answer: "olling" }, { answer: "cies" }, { answer: "ss" }]
  },
  {
    title: "Topic: Bridges",
    paragraph: "Bri__BLANK__ have been used for thousands of years to connect commun__BLANK__ separated by rivers, valleys, and other obst__BLANK__. Modern engin__BLANK__ use advanced materials such as steel and concrete to build structures that are both strong and dur__BLANK__. The design of a bridge must care__BLANK__ consider factors such as weight, wind, and traffic vol__BLANK__.",
    blanks: [{ answer: "dges" }, { answer: "ities" }, { answer: "acles" }, { answer: "eers" }, { answer: "able" }, { answer: "fully" }, { answer: "ume" }]
  },
  {
    title: "Topic: Clothing",
    paragraph: "The cloth__BLANK__ people choose to wear often reflects their cul__BLANK__, personality, and the climate they live in. Fashion tre__BLANK__ change frequently, influenced by designers, celebrities, and social me__BLANK__. However, comfort and pract__BLANK__ remain important factors for most people. The textile ind__BLANK__ is one of the largest employers in the world.",
    blanks: [{ answer: "ing" }, { answer: "ture" }, { answer: "nds" }, { answer: "dia" }, { answer: "icality" }, { answer: "ustry" }]
  },
  {
    title: "Topic: Money",
    paragraph: "Lear__BLANK__ to manage money wisely is an essential li__BLANK__ skill. Setting a monthly bud__BLANK__ can help individuals track their spending and save for the fut__BLANK__. Financial experts rec__BLANK__ starting to save early, even in small amounts. Understanding basic conc__BLANK__ like interest and inflation can make a significant diff__BLANK__ in long-term financial health.",
    blanks: [{ answer: "ning" }, { answer: "fe" }, { answer: "get" }, { answer: "ure" }, { answer: "ommend" }, { answer: "epts" }, { answer: "erence" }]
  },
  {
    title: "Topic: Earthquakes",
    paragraph: "Earth__BLANK__ are natural events caused by the sudden move__BLANK__ of large sections of the Earth's crust. They can cause widespread dest__BLANK__ and are especially dangerous in densely popu__BLANK__ areas. Scientists use special equi__BLANK__ to monitor seismic activity and warn commun__BLANK__ of potential danger. Buildings in earthquake-prone reg__BLANK__ are designed to withstand strong sha__BLANK__.",
    blanks: [{ answer: "quakes" }, { answer: "ment" }, { answer: "ruction" }, { answer: "lated" }, { answer: "pment" }, { answer: "ities" }, { answer: "ions" }, { answer: "king" }]
  },
  {
    title: "Topic: Dentists",
    paragraph: "Vis__BLANK__ the dentist regularly is an important part of maintaining good or__BLANK__ health. Dentists not only treat problems such as cav__BLANK__ and gum disease, but also help prev__BLANK__ them through routine check-ups. Bru__BLANK__ twice a day and avoiding too much sugar are simple hab__BLANK__ that can keep your teeth healthy. Many people feel anx__BLANK__ about dental visits, but modern techniques have made treatments much more comfor__BLANK__.",
    blanks: [{ answer: "iting" }, { answer: "al" }, { answer: "ities" }, { answer: "ent" }, { answer: "shing" }, { answer: "its" }, { answer: "ious" }, { answer: "table" }]
  },
  {
    title: "Topic: Rivers",
    paragraph: "Riv__BLANK__ have played a central role in human civil__BLANK__ for thousands of years. They provide fresh wat__BLANK__ for drinking, agriculture, and indu__BLANK__. Many of the world's greatest cit__BLANK__ were built along riverbanks because of the easy access to water and trans__BLANK__. Today, protecting rivers from poll__BLANK__ is a major environmental pri__BLANK__.",
    blanks: [{ answer: "ers" }, { answer: "isation" }, { answer: "er" }, { answer: "stry" }, { answer: "ies" }, { answer: "port" }, { answer: "ution" }, { answer: "ority" }]
  },
  {
    title: "Topic: Airports",
    paragraph: "Air__BLANK__ are complex facilities that handle millions of pass__BLANK__ every year. From check-in and sec__BLANK__ screening to boarding, every step is carefully organ__BLANK__ to ensure safety and efficiency. Modern airports also offer a wide ra__BLANK__ of shops, restaurants, and lounges for trav__BLANK__. Delays and cancellations can be frus__BLANK__, but airlines work hard to minimise disru__BLANK__.",
    blanks: [{ answer: "ports" }, { answer: "engers" }, { answer: "urity" }, { answer: "ised" }, { answer: "nge" }, { answer: "ellers" }, { answer: "trating" }, { answer: "ptions" }]
  },
  {
    title: "Topic: Languages",
    paragraph: "There are more than 7,000 lang__BLANK__ spoken around the world today. Some are used by hun__BLANK__ of millions of people, while others have only a few remaining spe__BLANK__. When a language disa__BLANK__, a unique part of human culture is lost for__BLANK__. Linguists work to docu__BLANK__ and preserve endangered languages before it is too la__BLANK__.",
    blanks: [{ answer: "uages" }, { answer: "dreds" }, { answer: "akers" }, { answer: "ppears" }, { answer: "ever" }, { answer: "ment" }, { answer: "te" }]
  },
  {
    title: "Topic: Bicycles",
    paragraph: "Bicy__BLANK__ are one of the most environmentally fri__BLANK__ forms of transportation available. They produce no emi__BLANK__ and require very little energy to oper__BLANK__. Many cities now have dedic__BLANK__ bike lanes to encourage people to cy__BLANK__ instead of drive. Cycling is also an exc__BLANK__ form of exercise that benefits both physical and mental hea__BLANK__.",
    blanks: [{ answer: "cles" }, { answer: "endly" }, { answer: "ssions" }, { answer: "ate" }, { answer: "ated" }, { answer: "cle" }, { answer: "ellent" }, { answer: "lth" }]
  },
  {
    title: "Topic: Firefighters",
    paragraph: "Fire__BLANK__ are among the most respected members of any commu__BLANK__. They risk their own li__BLANK__ to protect people and property from fire and other emer__BLANK__. In addition to fighting fires, they also edu__BLANK__ the public about fire prev__BLANK__ and safety. Becoming a fire__BLANK__ requires extensive training in both physical fitness and emergency resp__BLANK__.",
    blanks: [{ answer: "fighters" }, { answer: "nity" }, { answer: "ves" }, { answer: "gencies" }, { answer: "cate" }, { answer: "ention" }, { answer: "fighter" }, { answer: "onse" }]
  },
  {
    title: "Topic: Calendars",
    paragraph: "Cal__BLANK__ have been used for thousands of years to org__BLANK__ time and plan important events. Ancient civili__BLANK__ developed early calendars based on the move__BLANK__ of the sun and moon. Today, digital cal__BLANK__ make it easy to schedule meetings and set remi__BLANK__. Despite technological advances, many people still pre__BLANK__ to use paper calendars for their daily plan__BLANK__.",
    blanks: [{ answer: "endars" }, { answer: "anise" }, { answer: "sations" }, { answer: "ments" }, { answer: "endars" }, { answer: "nders" }, { answer: "fer" }, { answer: "ning" }]
  },
  {
    title: "Topic: Soil",
    paragraph: "Hea__BLANK__ soil is the foundation of all agric__BLANK__ and food production. It contains nut__BLANK__, water, and millions of tiny organisms that support plant gro__BLANK__. Poor farming practices can lead to soil ero__BLANK__ and reduce the land's ability to produce cr__BLANK__. Scientists are developing new methods to rest__BLANK__ damaged soil and maintain its fert__BLANK__ for future generations.",
    blanks: [{ answer: "lthy" }, { answer: "ulture" }, { answer: "rients" }, { answer: "wth" }, { answer: "sion" }, { answer: "ops" }, { answer: "ore" }, { answer: "ility" }]
  },
  {
    title: "Topic: Journalism",
    paragraph: "Journ__BLANK__ plays a vital role in keeping the public info__BLANK__ about important events. Reporters invest__BLANK__ stories, gather evidence, and present fac__BLANK__ to their audience. In a healthy demo__BLANK__, citizens rely on accurate news to make informed deci__BLANK__. The rise of social media has created new chall__BLANK__ for traditional journalism.",
    blanks: [{ answer: "alism" }, { answer: "rmed" }, { answer: "igate" }, { answer: "ts" }, { answer: "cracy" }, { answer: "sions" }, { answer: "enges" }]
  },
  {
    title: "Topic: Painting",
    paragraph: "Pain__BLANK__ is one of the oldest forms of creative expr__BLANK__ in human history. From ancient cave draw__BLANK__ to modern abstract art, people have always used vis__BLANK__ images to communicate ideas and emo__BLANK__. Famous painters like Picasso and Monet changed the way we under__BLANK__ art. Today, painting remains a popu__BLANK__ hobby and a respected profession.",
    blanks: [{ answer: "ting" }, { answer: "ession" }, { answer: "ings" }, { answer: "ual" }, { answer: "tions" }, { answer: "stand" }, { answer: "lar" }]
  },
  {
    title: "Topic: Migration",
    paragraph: "Every year, millions of bi__BLANK__ migrate thousands of kilometres between their breed__BLANK__ and feeding grounds. This remarkable jour__BLANK__ is driven by changes in temperature and food avail__BLANK__. Scientists stu__BLANK__ migration patterns to understand how climate cha__BLANK__ is affecting wildlife. Protecting the habitats along these rou__BLANK__ is essential for the survival of many spe__BLANK__.",
    blanks: [{ answer: "rds" }, { answer: "ing" }, { answer: "ney" }, { answer: "ability" }, { answer: "dy" }, { answer: "nge" }, { answer: "tes" }, { answer: "cies" }]
  },
  {
    title: "Topic: Trains",
    paragraph: "Tra__BLANK__ were one of the first forms of mass transpor__BLANK__ and played a key role in the industrial revol__BLANK__. High-speed rail net__BLANK__ now connect major cities across Europe and Asia. Compared to cars and planes, trains are a more energy-eff__BLANK__ way to travel. Many governments are inv__BLANK__ in expanding their rail systems to reduce road traf__BLANK__.",
    blanks: [{ answer: "ins" }, { answer: "tation" }, { answer: "ution" }, { answer: "works" }, { answer: "icient" }, { answer: "esting" }, { answer: "fic" }]
  },
  {
    title: "Topic: Vitamins",
    paragraph: "Vita__BLANK__ are essential nutrients that the body needs to func__BLANK__ properly. They support the immune sys__BLANK__, help build strong bones, and assist in healing wou__BLANK__. Most vitamins come from the fo__BLANK__ we eat, especially fruits and vegetables. Doctors generally rec__BLANK__ getting vitamins from a balanced diet rather than relying on suppl__BLANK__.",
    blanks: [{ answer: "mins" }, { answer: "tion" }, { answer: "tem" }, { answer: "nds" }, { answer: "od" }, { answer: "ommend" }, { answer: "ements" }]
  },
  {
    title: "Topic: Clocks",
    paragraph: "Cl__BLANK__ and other timekeeping devices have been used by humans for thou__BLANK__ of years. Ancient people tracked time using sundials and water clo__BLANK__, while modern society relies on digital tech__BLANK__. Accurate timekeeping is ess__BLANK__ for transportation, communication, and scientific rese__BLANK__. The invention of the atomic clock has made time meas__BLANK__ incredibly precise.",
    blanks: [{ answer: "ocks" }, { answer: "sands" }, { answer: "cks" }, { answer: "nology" }, { answer: "ential" }, { answer: "arch" }, { answer: "urement" }]
  },
  {
    title: "Topic: Exams",
    paragraph: "Prep__BLANK__ for exams requires discipline, good time mana__BLANK__, and effective study habits. Students who rev__BLANK__ their notes regularly tend to remember inform__BLANK__ better than those who study only the night before. Practice tests are a part__BLANK__ useful way to prepare. Staying calm and well-re__BLANK__ before an exam can also significantly improve perf__BLANK__.",
    blanks: [{ answer: "aring" }, { answer: "gement" }, { answer: "iew" }, { answer: "ation" }, { answer: "icularly" }, { answer: "sted" }, { answer: "ormance" }]
  },
  {
    title: "Topic: Oceans",
    paragraph: "Oce__BLANK__ cover more than seventy percent of the Earth's sur__BLANK__ and play a crucial role in regulating the cli__BLANK__. They absorb large amounts of carbon dio__BLANK__ and produce much of the oxygen we bre__BLANK__. Marine ecosystems support an incr__BLANK__ variety of life, from tiny plankton to massive wha__BLANK__. Protecting the oceans from pollution is one of the most important envir__BLANK__ challenges we face.",
    blanks: [{ answer: "ans" }, { answer: "face" }, { answer: "mate" }, { answer: "xide" }, { answer: "athe" }, { answer: "edible" }, { answer: "les" }, { answer: "onmental" }]
  },
  {
    title: "Topic: Camping",
    paragraph: "Cam__BLANK__ is a popular outdoor activity that allows people to disconn__BLANK__ from technology and enjoy nat__BLANK__. Families and friends often spend weekends at camp__BLANK__ near lakes, forests, or mountains. Setting up a te__BLANK__, cooking over a fire, and sleeping under the st__BLANK__ are all part of the experience. Campers should always resp__BLANK__ the environment and leave no tr__BLANK__ behind.",
    blanks: [{ answer: "ping" }, { answer: "ect" }, { answer: "ure" }, { answer: "sites" }, { answer: "nt" }, { answer: "ars" }, { answer: "ect" }, { answer: "ace" }]
  },
  {
    title: "Topic: Nutrition",
    paragraph: "A bal__BLANK__ diet is essential for maintaining good hea__BLANK__ throughout life. Eating a variety of fru__BLANK__, vegetables, grains, and proteins provides the nut__BLANK__ the body needs. Processed foods often contain too much su__BLANK__, salt, and unhealthy fats. Health experts enc__BLANK__ people to read food labels and make info__BLANK__ choices about what they eat.",
    blanks: [{ answer: "anced" }, { answer: "lth" }, { answer: "its" }, { answer: "rients" }, { answer: "gar" }, { answer: "ourage" }, { answer: "rmed" }]
  },
  {
    title: "Topic: Maps",
    paragraph: "Ma__BLANK__ have been used for centuries to help people navi__BLANK__ and understand the world around them. Early maps were drawn by ha__BLANK__ and were often inaccurate. Today, digital mapping tools use satel__BLANK__ technology to provide extremely deta__BLANK__ and up-to-date information. Maps are ess__BLANK__ for travellers, urban planners, and emergency resp__BLANK__ services.",
    blanks: [{ answer: "ps" }, { answer: "gate" }, { answer: "nd" }, { answer: "lite" }, { answer: "iled" }, { answer: "ential" }, { answer: "onse" }]
  },
  {
    title: "Topic: Mistakes",
    paragraph: "Mak__BLANK__ mistakes is a natural and important part of the lear__BLANK__ process. Rather than feeling discou__BLANK__, students should view errors as opportunities to imp__BLANK__. Teachers who create a supportive class__BLANK__ environment help students feel comfortable taking ri__BLANK__. The most success__BLANK__ learners are often those who are willing to try, fa__BLANK__, and try again.",
    blanks: [{ answer: "ing" }, { answer: "ning" }, { answer: "raged" }, { answer: "rove" }, { answer: "room" }, { answer: "sks" }, { answer: "ful" }, { answer: "il" }]
  },
  {
    title: "Topic: Neighbours",
    paragraph: "Having good relat__BLANK__ with your neighbours can make daily life much more plea__BLANK__. Simple gestures like gree__BLANK__ each other or offering help during difficult times can str__BLANK__ community bonds. In many cultures, neigh__BLANK__ are considered almost as important as fam__BLANK__. Building trust and showing res__BLANK__ are the foundations of a harmonious neighbourhood.",
    blanks: [{ answer: "ionships" }, { answer: "sant" }, { answer: "ting" }, { answer: "engthen" }, { answer: "bours" }, { answer: "ily" }, { answer: "pect" }]
  }
];