// Plain source paragraphs for the Reading C-test.
//
// Only the text is stored. Which words get truncated is derived at runtime by
// buildCTest(), so every text obeys the format by construction: first sentence
// intact, second half of every second word removed, ten truncated words.
export type CTestText = { title: string; text: string };

export const cTestTexts: CTestText[] = [
  {
    title: 'Prehistoric Dance',
    text: 'We know from drawings that have been preserved in caves for over 10,000 years that early humans performed dances as a group activity. We might think that prehistoric people concentrated only on basic survival. However, it is clear from the records that dance was important to them.',
  },
  {
    title: 'Climate Change',
    text: 'Climate change is one of the most pressing challenges facing humanity today. Rising temperatures are causing polar ice caps to melt, which leads to higher sea levels. Scientists warn that without immediate action, the consequences could be irreversible.',
  },
  {
    title: 'Education',
    text: 'Research has shown that children who read regularly from an early age develop stronger cognitive skills. Schools are therefore encouraged to implement reading programs and provide students with access to a wide variety of books.',
  },
  {
    title: 'Technology',
    text: 'The rise of artificial intelligence has transformed many industries. Machines can now perform complex tasks that once required human expertise. While this brings great efficiency, it also raises concerns about job displacement.',
  },
  {
    title: 'Urbanization',
    text: 'Millions of people migrate from rural areas to cities each year in search of better employment opportunities. However, rapid urbanization puts enormous pressure on housing and public services. Without careful planning, overcrowding can undermine the quality of life.',
  },
  {
    title: 'Health and Exercise',
    text: 'Regular physical exercise is widely recognized as one of the most effective ways to maintain good health. Even moderate activity, such as a daily walk, can significantly reduce the risk of chronic diseases.',
  },
  {
    title: 'Renewable Energy',
    text: 'Governments around the world are investing heavily in renewable energy sources such as solar and wind power. These alternatives produce far fewer carbon emissions than fossil fuels. Experts believe that a complete transition to clean energy is both possible and necessary.',
  },
  {
    title: 'Language Learning',
    text: 'Learning a second language at an early age has been linked to a range of cognitive benefits. Children who are exposed to multiple languages tend to be better at problem-solving and critical thinking.',
  },
  {
    title: 'Biodiversity',
    text: 'Biodiversity refers to the variety of life on Earth, including all species of plants, animals, and microorganisms. Human activities such as deforestation and pollution are causing species to become extinct at an alarming rate. Protecting ecosystems is essential for all living things.',
  },
  {
    title: 'Social Media',
    text: 'Social media platforms have transformed the way people communicate and share information. While they allow users to connect with friends across the world, excessive use has been linked to feelings of loneliness and reduced attention spans.',
  },
  {
    title: 'Space Exploration',
    text: 'Space exploration has expanded our understanding of the universe and led to many technological advances. Missions to the Moon and Mars have provided valuable data about the origins of our solar system.',
  },
  {
    title: 'Ocean Pollution',
    text: 'Every year, millions of tons of plastic enter the world\'s oceans. This waste poses a serious threat to marine life and disrupts fragile ecosystem systems. Scientists are urging governments to take immediate action to reduce plastic production.',
  },
  {
    title: 'Remote Work',
    text: 'The shift to remote work has changed the way many people manage their professional lives. Employees report reduced commute stress and greater flexibility, but also increased communication challenges. Companies must find new ways to encourage teamwork.',
  },
  {
    title: 'Food Security',
    text: 'Food security is a growing concern as the global population continues to rise. Droughts are reducing crop yields in many regions. Experts recommend investing in sustainable farming techniques to address this challenge.',
  },
  {
    title: 'Mental Health',
    text: 'Mental health is an essential component of overall well-being. Despite growing awareness, many people still struggle to access the support they need due to social stigma. Governments must make mental health care more accessible to everyone.',
  },
  {
    title: 'Cooking',
    text: 'Cooking at home has become more popular in recent years. Many people find that preparing their own meals is not only healthier but also more affordable. Fresh ingredients from local markets are often cheaper than restaurant food. Learning to cook is a valuable skill that everyone can benefit from.',
  },
  {
    title: 'Friendship',
    text: 'Good friends are an important part of a happy and healthy life. They provide emotional support and help us through difficult times. Research suggests that people with strong social connections tend to live longer. Maintaining friendships requires effort, but the rewards are well worth it.',
  },
  {
    title: 'Exercise',
    text: 'Regular physical exercise is one of the most effective ways to stay healthy. Even a short daily walk can significantly reduce the risk of heart disease. Experts recommend at least thirty minutes of moderate activity each day. People who exercise also report better sleep and lower stress levels.',
  },
  {
    title: 'Reading',
    text: 'Reading books on a regular basis is one of the best ways to build your vocabulary. It also helps develop critical thinking and improve concentration. Students who read widely tend to perform better in school. Public libraries offer free access to thousands of titles for readers of all ages.',
  },
  {
    title: 'Pollution',
    text: 'Air pollution is a growing concern in many large cities around the world. Factories and vehicles release harmful gases that damage both human health and the environment. Governments are introducing stricter regulations to limit emissions. Individuals can also contribute by using public transport or cycling to work.',
  },
  {
    title: 'Pets',
    text: 'Having a pet can bring great joy and companionship to a household. Dogs and cats are the most common choices, but some families prefer smaller animals. Taking care of a pet teaches children about responsibility and empathy. Studies show that pet owners often experience lower levels of stress.',
  },
  {
    title: 'Shopping',
    text: 'Online shopping has grown rapidly over the past decade. Millions of customers now prefer to browse and order products from the comfort of their homes. The convenience of home delivery has made traditional stores less popular. However, many people still enjoy the experience of visiting shops in person.',
  },
  {
    title: 'Recycling',
    text: 'Recycling is one of the simplest ways to help protect the environment. By separating waste into paper, plastic, and glass, we can reduce the amount sent to landfills. Many countries have introduced programmes to encourage recycling at home. Even small efforts can make a big difference over time.',
  },
  {
    title: 'Music',
    text: 'Listening to music is a universal activity enjoyed by people of all ages. It can improve your mood and help reduce feelings of stress. Many students find that calm background music helps them concentrate while studying. Musicians themselves often report that playing an instrument brings them deep satisfaction.',
  },
  {
    title: 'Sports',
    text: 'Playing sports is an excellent way for young people to develop important life skills. Team sports in particular teach discipline, cooperation, and communication. Regular physical activity also keeps the body healthy and the mind sharp. Schools around the world recommend that students participate in at least one sport.',
  },
  {
    title: 'Computers',
    text: 'Computers have become an essential part of modern life. They are used in almost every industry, from healthcare to education. Without computers, many of the tasks we perform daily would take much longer. However, spending too much time in front of a screen can have negative effects on health.',
  },
  {
    title: 'Farming',
    text: 'Farming is one of the oldest and most important occupations in human history. Modern agriculture uses advanced technology to increase crop yields and reduce waste. Despite these improvements, millions of farmers still face challenges such as drought and poor soil. Sustainable farming practices are becoming increasingly necessary to feed the growing population.',
  },
  {
    title: 'Photography',
    text: 'Photography has changed dramatically since the invention of the digital camera. Today, almost everyone carries a smartphone capable of taking high-quality pictures. Social media platforms have made sharing images easier than ever before. Professional photographers continue to push creative boundaries with new techniques and equipment.',
  },
  {
    title: 'Safety',
    text: 'Road safety is a shared responsibility among drivers, cyclists, and pedestrians. Every year, thousands of accidents could be prevented by simply following traffic rules. Wearing seatbelts and obeying speed limits are among the most effective measures. Governments also invest in better road design to protect all users.',
  },
  {
    title: 'Tourism',
    text: 'Tourism is a major source of income for many countries around the world. Visitors spend money on accommodation, food, and local attractions. Popular destinations benefit from tourism but also face challenges such as overcrowding and environmental damage. Sustainable tourism aims to balance economic growth with the protection of natural and cultural resources.',
  },
  {
    title: 'Newspapers',
    text: 'Newspapers have been an important source of information for hundreds of years. Although many readers have shifted to online platforms, print media still has a loyal audience. Journalists work hard to investigate stories and present accurate reports. A free press is widely considered essential for a healthy democracy.',
  },
  {
    title: 'Gardens',
    text: 'Gardening is a relaxing hobby that connects people with the natural world. Growing your own vegetables can save money and provide fresh produce for your family. Community gardens also bring neighbours together and improve the appearance of urban areas. Many schools now include gardening projects to teach children about plants and nutrition.',
  },
  {
    title: 'Breakfast',
    text: 'Eating a healthy breakfast gives your body the energy it needs to start the day. Studies have shown that people who eat breakfast regularly tend to perform better at work and school. A balanced morning meal should include protein, whole grains, and fruit. Skipping breakfast can lead to tiredness and difficulty concentrating later in the morning.',
  },
  {
    title: 'Hospitals',
    text: 'Hospitals are essential institutions that provide medical care to people in need. Doctors, nurses, and other health professionals work long hours to treat patients and save lives. Modern hospitals are equipped with advanced technology to diagnose and treat a wide range of conditions. Access to quality healthcare remains a challenge in many parts of the world.',
  },
  {
    title: 'Weather',
    text: 'Weather forecasts help millions of people plan their daily activities and prepare for changing conditions. Meteorologists use satellites and computers to predict temperature, rainfall, and wind patterns. Accurate weather information is especially important for farmers, pilots, and emergency services. Advances in technology have made forecasts significantly more reliable over the past few decades.',
  },
  {
    title: 'Inventions',
    text: 'Throughout history, great inventions have changed the way people live and work. The printing press made books accessible to ordinary people for the first time. The telephone allowed communication across vast distances. Today, the internet connects billions of people and continues to transform nearly every aspect of daily life.',
  },
  {
    title: 'Forests',
    text: 'Forests cover approximately one-third of the Earth\'s land surface. They provide oxygen, store carbon, and support an incredible variety of wildlife. Deforestation is destroying these vital ecosystems at an alarming rate. Protecting existing forests and planting new trees are essential steps in the fight against climate change.',
  },
  {
    title: 'Manners',
    text: 'Good manners are valued in every culture and society. Simple actions like saying please and thank you show respect for others. In professional settings, polite behaviour can make a strong first impression. Parents and teachers play a key role in teaching children the importance of courtesy and kindness.',
  },
  {
    title: 'Electricity',
    text: 'Electricity is one of the most important discoveries in human history. It powers our homes, schools, hospitals, and workplaces. Without it, most of the devices and machines we depend on every day would not function. Scientists continue to explore cleaner ways to generate electricity in order to reduce pollution.',
  },
  {
    title: 'Birds',
    text: 'Birds are among the most diverse groups of animals on the planet. They can be found on every continent including Antarctica. Birds play an important role in the ecosystem by spreading seeds and controlling insect populations. Sadly, many bird species are now threatened due to habitat loss and climate change.',
  },
  {
    title: 'Bridges',
    text: 'Bridges have been used for thousands of years to connect communities separated by rivers, valleys, and other obstacles. Modern engineers use advanced materials such as steel and concrete to build structures that are both strong and durable. The design of a bridge must carefully consider factors such as weight, wind, and traffic volume.',
  },
  {
    title: 'Clothing',
    text: 'The clothing people choose to wear often reflects their culture, personality, and the climate they live in. Fashion trends change frequently, influenced by designers, celebrities, and social media. However, comfort and practicality remain important factors for most people. The textile industry is one of the largest employers in the world.',
  },
  {
    title: 'Money',
    text: 'Learning to manage money wisely is an essential life skill. Setting a monthly budget can help individuals track their spending and save for the future. Financial experts recommend starting to save early, even in small amounts. Understanding basic concepts like interest and inflation can make a significant difference in long-term financial health.',
  },
  {
    title: 'Earthquakes',
    text: 'Earthquakes are natural events caused by the sudden movement of large sections of the Earth\'s crust. They can cause widespread destruction and are especially dangerous in densely populated areas. Scientists use special equipment to monitor seismic activity and warn communities of potential danger. Buildings in earthquake-prone regions are designed to withstand strong shaking.',
  },
  {
    title: 'Dentists',
    text: 'Visiting the dentist regularly is an important part of maintaining good oral health. Dentists not only treat problems such as cavities and gum disease, but also help prevent them through routine check-ups. Brushing twice a day and avoiding too much sugar are simple habits that can keep your teeth healthy. Many people feel anxious about dental visits, but modern techniques have made treatments much more comfortable.',
  },
  {
    title: 'Rivers',
    text: 'Rivers have played a central role in human civilisation for thousands of years. They provide fresh water for drinking, agriculture, and industry. Many of the world\'s greatest cities were built along riverbanks because of the easy access to water and transport. Today, protecting rivers from pollution is a major environmental priority.',
  },
  {
    title: 'Airports',
    text: 'Airports are complex facilities that handle millions of passengers every year. From check-in and security screening to boarding, every step is carefully organised to ensure safety and efficiency. Modern airports also offer a wide range of shops, restaurants, and lounges for travellers. Delays and cancellations can be frustrating, but airlines work hard to minimise disruptions.',
  },
  {
    title: 'Languages',
    text: 'There are more than 7,000 languages spoken around the world today. Some are used by hundreds of millions of people, while others have only a few remaining speakers. When a language disappears, a unique part of human culture is lost forever. Linguists work to document and preserve endangered languages before it is too late.',
  },
  {
    title: 'Bicycles',
    text: 'Bicycles are one of the most environmentally friendly forms of transportation available. They produce no emissions and require very little energy to operate. Many cities now have dedicated bike lanes to encourage people to cycle instead of drive. Cycling is also an excellent form of exercise that benefits both physical and mental health.',
  },
  {
    title: 'Firefighters',
    text: 'Firefighters are among the most respected members of any community. They risk their own lives to protect people and property from fire and other emergencies. In addition to fighting fires, they also educate the public about fire prevention and safety. Becoming a firefighter requires extensive training in both physical fitness and emergency response.',
  },
  {
    title: 'Calendars',
    text: 'Calendars have been used for thousands of years to organise time and plan important events. Ancient civilisations developed early calendars based on the movements of the sun and moon. Today, digital calendars make it easy to schedule meetings and set reminders. Despite technological advances, many people still prefer to use paper calendars for their daily planning.',
  },
  {
    title: 'Soil',
    text: 'Healthy soil is the foundation of all agriculture and food production. It contains nutrients, water, and millions of tiny organisms that support plant growth. Poor farming practices can lead to soil erosion and reduce the land\'s ability to produce crops. Scientists are developing new methods to restore damaged soil and maintain its fertility for future generations.',
  },
  {
    title: 'Journalism',
    text: 'Journalism plays a vital role in keeping the public informed about important events. Reporters investigate stories, gather evidence, and present facts to their audience. In a healthy democracy, citizens rely on accurate news to make informed decisions. The rise of social media has created new challenges for traditional journalism.',
  },
  {
    title: 'Painting',
    text: 'Painting is one of the oldest forms of creative expression in human history. From ancient cave drawings to modern abstract art, people have always used visual images to communicate ideas and emotions. Famous painters like Picasso and Monet changed the way we understand art. Today, painting remains a popular hobby and a respected profession.',
  },
  {
    title: 'Migration',
    text: 'Every year, millions of birds migrate thousands of kilometres between their breeding and feeding grounds. This remarkable journey is driven by changes in temperature and food availability. Scientists study migration patterns to understand how climate change is affecting wildlife. Protecting the habitats along these routes is essential for the survival of many species.',
  },
  {
    title: 'Trains',
    text: 'Trains were one of the first forms of mass transportation and played a key role in the industrial revolution. High-speed rail networks now connect major cities across Europe and Asia. Compared to cars and planes, trains are a more energy-efficient way to travel. Many governments are investing in expanding their rail systems to reduce road traffic.',
  },
  {
    title: 'Vitamins',
    text: 'Vitamins are essential nutrients that the body needs to function properly. They support the immune system, help build strong bones, and assist in healing wounds. Most vitamins come from the food we eat, especially fruits and vegetables. Doctors generally recommend getting vitamins from a balanced diet rather than relying on supplements.',
  },
  {
    title: 'Clocks',
    text: 'Clocks and other timekeeping devices have been used by humans for thousands of years. Ancient people tracked time using sundials and water clocks, while modern society relies on digital technology. Accurate timekeeping is essential for transportation, communication, and scientific research. The invention of the atomic clock has made time measurement incredibly precise.',
  },
  {
    title: 'Exams',
    text: 'Preparing for exams requires discipline, good time management, and effective study habits. Students who review their notes regularly tend to remember information better than those who study only the night before. Practice tests are a particularly useful way to prepare. Staying calm and well-rested before an exam can also significantly improve performance.',
  },
  {
    title: 'Oceans',
    text: 'Oceans cover more than seventy percent of the Earth\'s surface and play a crucial role in regulating the climate. They absorb large amounts of carbon dioxide and produce much of the oxygen we breathe. Marine ecosystems support an incredible variety of life, from tiny plankton to massive whales. Protecting the oceans from pollution is one of the most important environmental challenges we face.',
  },
  {
    title: 'Camping',
    text: 'Camping is a popular outdoor activity that allows people to disconnect from technology and enjoy nature. Families and friends often spend weekends at campsites near lakes, forests, or mountains. Setting up a tent, cooking over a fire, and sleeping under the stars are all part of the experience. Campers should always respect the environment and leave no trace behind.',
  },
  {
    title: 'Nutrition',
    text: 'A balanced diet is essential for maintaining good health throughout life. Eating a variety of fruits, vegetables, grains, and proteins provides the nutrients the body needs. Processed foods often contain too much sugar, salt, and unhealthy fats. Health experts encourage people to read food labels and make informed choices about what they eat.',
  },
  {
    title: 'Maps',
    text: 'Maps have been used for centuries to help people navigate and understand the world around them. Early maps were drawn by hand and were often inaccurate. Today, digital mapping tools use satellite technology to provide extremely detailed and up-to-date information. Maps are essential for travellers, urban planners, and emergency response services.',
  },
  {
    title: 'Mistakes',
    text: 'Making mistakes is a natural and important part of the learning process. Rather than feeling discouraged, students should view errors as opportunities to improve. Teachers who create a supportive classroom environment help students feel comfortable taking risks. The most successful learners are often those who are willing to try, fail, and try again.',
  },
  {
    title: 'Neighbours',
    text: 'Having good relationships with your neighbours can make daily life much more pleasant. Simple gestures like greeting each other or offering help during difficult times can strengthen community bonds. In many cultures, neighbours are considered almost as important as family. Building trust and showing respect are the foundations of a harmonious neighbourhood.',
  },
];
