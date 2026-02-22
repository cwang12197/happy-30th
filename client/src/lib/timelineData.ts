export interface TimelineYear {
  year: number;
  headline: string;
  facts: string[];
  category: 'gaming' | 'tech' | 'science' | 'personal' | 'mixed';
  isPersonalMilestone: boolean;
  personalNote?: string;
  icon: string;
}

export const timelineData: TimelineYear[] = [
  {
    year: 1996,
    headline: "A Legend Is Born",
    facts: [
      "Pokémon Red & Green released in Japan — a franchise that would conquer the world.",
      "Nintendo 64 launched, bringing us Super Mario 64 and true 3D gaming.",
      "Dolly the Sheep became the first mammal cloned from an adult cell.",
      "The Macarena was inescapable. Absolutely everywhere.",
      "Google was just a research project at Stanford called 'BackRub.'"
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "And somewhere in this beautiful chaos, YOU were born. The world wasn't ready.",
    icon: "🎂"
  },
  {
    year: 1997,
    headline: "Wizards, Ships & Chess Machines",
    facts: [
      "Harry Potter and the Philosopher's Stone published — a cultural earthquake begins.",
      "Titanic became the highest-grossing film of all time.",
      "IBM's Deep Blue defeated chess champion Garry Kasparov — machines fight back.",
      "GoldenEye 007 released on N64 — the birth of console FPS multiplayer."
    ],
    category: 'mixed',
    isPersonalMilestone: false,
    icon: "🧙"
  },
  {
    year: 1998,
    headline: "Google, Zelda & The Space Station",
    facts: [
      "Google officially founded by Larry Page and Sergey Brin.",
      "The Legend of Zelda: Ocarina of Time released — still one of the greatest games ever made.",
      "Pokémon Red & Blue hit North America. Gotta catch 'em all!",
      "International Space Station construction begins in orbit.",
      "Game Boy Color launched — gaming in COLOR, what a time."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "🎮"
  },
  {
    year: 1999,
    headline: "Y2K Panic & The Matrix",
    facts: [
      "Y2K panic grips the world — will computers destroy civilization at midnight?",
      "The Matrix released — 'What if I told you' becomes a lifestyle.",
      "Super Smash Bros. released on N64 — friendships tested forever.",
      "Napster launches — the music industry will never be the same.",
      "SpongeBob SquarePants premieres. He's ready."
    ],
    category: 'mixed',
    isPersonalMilestone: false,
    icon: "💊"
  },
  {
    year: 2000,
    headline: "The Y2K Bug Was... Nothing",
    facts: [
      "Y2K arrives. Computers don't explode. Everyone feels silly.",
      "PlayStation 2 launched — becomes the best-selling console of all time.",
      "The Human Genome Project releases its first working draft.",
      "Pokémon Gold & Silver released — 100 new Pokémon to obsess over."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "🕹️"
  },
  {
    year: 2001,
    headline: "Xbox Arrives & The World Changes",
    facts: [
      "Microsoft launches Xbox — a gaming empire is born.",
      "Halo: Combat Evolved launches with it. Master Chief enters the chat.",
      "Apple releases the iPod — 1,000 songs in your pocket.",
      "Wikipedia goes live — free knowledge for everyone.",
      "September 11 attacks change the world forever."
    ],
    category: 'tech',
    isPersonalMilestone: false,
    icon: "🎯"
  },
  {
    year: 2002,
    headline: "The Coolest Sibling Arrives",
    facts: [
      "Xbox Live launches — online console gaming goes mainstream.",
      "Spider-Man becomes the first film to earn $100M in its opening weekend.",
      "Pokémon Ruby & Sapphire released in Japan — Gen III begins.",
      "Mars Odyssey begins mapping the Red Planet from orbit."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "But the REAL headline? Your incredible sibling was born this year. Best year ever. You're welcome for making your life more interesting.",
    icon: "⭐"
  },
  {
    year: 2003,
    headline: "Genomes, Steam & Finding Nemo",
    facts: [
      "The Human Genome Project completed — we mapped human DNA!",
      "Steam launched by Valve — your wallet has never recovered.",
      "Skype launched — free video calls seemed like magic.",
      "MySpace goes live — the first social media era begins.",
      "Finding Nemo released — just keep swimming."
    ],
    category: 'tech',
    isPersonalMilestone: false,
    icon: "🧬"
  },
  {
    year: 2004,
    headline: "Facebook, WoW & Mars Rovers",
    facts: [
      "Facebook launches from a Harvard dorm room. 'TheFacebook' changes everything.",
      "World of Warcraft released — millions of social lives vanish overnight.",
      "Nintendo DS released — dual screens! Touch screens! The future!",
      "Mars rovers Spirit and Opportunity land on Mars.",
      "Gmail launches with 1GB of storage — mind-blowing at the time."
    ],
    category: 'tech',
    isPersonalMilestone: false,
    icon: "👤"
  },
  {
    year: 2005,
    headline: "YouTube, Xbox 360 & Reddit",
    facts: [
      "YouTube goes live — 'Me at the zoo' is the first video ever uploaded.",
      "Xbox 360 launches — next-gen gaming begins.",
      "Pokémon Emerald released — the definitive Gen III experience.",
      "Reddit founded — the front page of the internet is born.",
      "Hurricane Katrina devastates New Orleans."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "📺"
  },
  {
    year: 2006,
    headline: "Wii Would Like To Play",
    facts: [
      "Nintendo Wii launches — your grandma is now a gamer.",
      "Twitter launches — 140 characters to change the world.",
      "Pokémon Diamond & Pearl released in Japan.",
      "Pluto demoted from planet status. RIP planet Pluto.",
      "PlayStation 3 launches — the console wars rage on."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "🎳"
  },
  {
    year: 2007,
    headline: "The iPhone Changes Everything",
    facts: [
      "Apple releases the iPhone — smartphones will never be the same.",
      "Portal released — 'The cake is a lie' enters the lexicon.",
      "Halo 3 launches — biggest entertainment launch in history at the time.",
      "Amazon Kindle released — books go digital.",
      "The Big Bang Theory premieres. Bazinga."
    ],
    category: 'tech',
    isPersonalMilestone: false,
    icon: "📱"
  },
  {
    year: 2008,
    headline: "Iron Man, CERN & SpaceX",
    facts: [
      "Iron Man launches the Marvel Cinematic Universe. I am Iron Man.",
      "The Large Hadron Collider activated at CERN — smashing atoms!",
      "SpaceX launches first privately funded liquid-fueled rocket to orbit.",
      "The Dark Knight redefines superhero movies forever.",
      "Pokémon Platinum released in Japan."
    ],
    category: 'science',
    isPersonalMilestone: false,
    icon: "⚛️"
  },
  {
    year: 2009,
    headline: "League of Legends Is Born",
    facts: [
      "League of Legends released by Riot Games — THE game that would consume thousands of hours.",
      "Minecraft development begins — a blocky revolution.",
      "Bitcoin network launches — digital gold or digital tulips?",
      "Avatar becomes the highest-grossing film ever.",
      "NASA discovers water on the Moon!"
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "⚔️"
  },
  {
    year: 2010,
    headline: "iPads, Instagram & SpaceX",
    facts: [
      "Apple releases the iPad — tablets become a thing.",
      "Instagram launches — the world gets filtered.",
      "Minecraft enters beta — the addiction spreads.",
      "Pokémon Black & White released in Japan.",
      "SpaceX Dragon becomes first commercial spacecraft to orbit and return."
    ],
    category: 'tech',
    isPersonalMilestone: false,
    icon: "📸"
  },
  {
    year: 2011,
    headline: "Minecraft, Skyrim & Farewell Steve",
    facts: [
      "Minecraft officially releases — the world builds together.",
      "The Elder Scrolls V: Skyrim released — 'I used to be an adventurer like you...'",
      "Steve Jobs passes away — the world mourns a visionary.",
      "Pokémon Black & White released worldwide.",
      "CRISPR gene editing technology developed — science fiction becomes reality."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "⛏️"
  },
  {
    year: 2012,
    headline: "Higgs Boson & Mars Curiosity",
    facts: [
      "Higgs Boson particle discovered at CERN — the 'God Particle' is real!",
      "Curiosity rover lands on Mars — seven minutes of terror.",
      "The Avengers assembles in theaters — $1.5 billion worldwide.",
      "Raspberry Pi released — DIY computing for everyone.",
      "Pokémon Black 2 & White 2 released."
    ],
    category: 'science',
    isPersonalMilestone: false,
    icon: "🔬"
  },
  {
    year: 2013,
    headline: "Next Gen Consoles & 3D Pokémon",
    facts: [
      "PlayStation 4 and Xbox One launch — the next generation begins.",
      "Pokémon X & Y released — first 3D main series Pokémon games!",
      "CRISPR used to edit human cells for the first time.",
      "GTA V released — still making money a decade later.",
      "Edward Snowden reveals NSA mass surveillance."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "🎮"
  },
  {
    year: 2014,
    headline: "Twitch, Comets & Ice Buckets",
    facts: [
      "Amazon acquires Twitch for $970 million — gaming streaming explodes.",
      "Rosetta spacecraft lands a probe on a comet — first time ever!",
      "Pokémon Omega Ruby & Alpha Sapphire released.",
      "Amazon Echo / Alexa launched — AI enters your living room.",
      "The ALS Ice Bucket Challenge goes mega-viral."
    ],
    category: 'tech',
    isPersonalMilestone: false,
    icon: "🧊"
  },
  {
    year: 2015,
    headline: "Gravitational Waves & Pluto Close-Up",
    facts: [
      "LIGO detects gravitational waves for the first time — Einstein was right!",
      "New Horizons reaches Pluto — we finally see the (dwarf) planet up close.",
      "Fallout 4 released — another 200 hours gone.",
      "The CRISPR revolution takes off in labs worldwide.",
      "Pokémon GO development announced — the hype begins."
    ],
    category: 'science',
    isPersonalMilestone: false,
    icon: "🌊"
  },
  {
    year: 2016,
    headline: "Pokémon GO Takes Over The World",
    facts: [
      "Pokémon GO released — the entire planet goes outside to catch Pokémon.",
      "AlphaGo (DeepMind AI) defeats world Go champion Lee Sedol.",
      "SpaceX lands its first orbital rocket booster — reusable rockets!",
      "Overwatch released — 'It's high noon' everywhere.",
      "Nintendo announces the Switch."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "📍"
  },
  {
    year: 2017,
    headline: "The Switch & Fortnite",
    facts: [
      "Nintendo Switch launches — console gaming goes truly portable.",
      "Fortnite Battle Royale launches — a cultural phenomenon begins.",
      "SpaceX reuses an orbital rocket for the first time in history.",
      "Pokémon Ultra Sun & Ultra Moon released.",
      "CRISPR used to edit genes in human embryos."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "🔄"
  },
  {
    year: 2018,
    headline: "Fortnite Mania & Starman In Space",
    facts: [
      "Fortnite becomes a global cultural phenomenon — everyone is doing the floss.",
      "SpaceX launches Falcon Heavy — Starman in a Tesla orbits the sun.",
      "Mars InSight lander touches down on Mars.",
      "Super Smash Bros. Ultimate released — EVERYONE is here!",
      "Pokémon Let's Go Pikachu & Eevee released."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "🚀"
  },
  {
    year: 2019,
    headline: "Black Holes & Sword & Shield",
    facts: [
      "First-ever image of a black hole captured — M87*, 55 million light-years away.",
      "Pokémon Sword & Shield released — the Wild Area changes everything.",
      "Teamfight Tactics (LoL auto-battler) released — another Riot hit.",
      "Disney+ launches — the streaming wars intensify.",
      "COVID-19 first cases emerge in late December..."
    ],
    category: 'science',
    isPersonalMilestone: false,
    icon: "🕳️"
  },
  {
    year: 2020,
    headline: "Pandemic, Valorant & Among Us",
    facts: [
      "COVID-19 pandemic changes life as we know it.",
      "VALORANT released by Riot Games — tactical shooter meets abilities. A new obsession.",
      "PS5 and Xbox Series X launch — next-gen arrives (if you can find one).",
      "SpaceX Crew Dragon sends astronauts to ISS — first commercial crew mission.",
      "Among Us becomes a global phenomenon — trust no one."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "😷"
  },
  {
    year: 2021,
    headline: "Webb Telescope & Arcane",
    facts: [
      "James Webb Space Telescope launches — humanity's greatest eye on the universe.",
      "Arcane (League of Legends) premieres on Netflix — absolutely incredible.",
      "Mars Ingenuity helicopter makes first powered flight on another planet!",
      "Pokémon Brilliant Diamond & Shining Pearl released.",
      "Valorant Champions Tour kicks off — esports glory."
    ],
    category: 'mixed',
    isPersonalMilestone: false,
    icon: "🔭"
  },
  {
    year: 2022,
    headline: "Webb's First Light & AI Dawn",
    facts: [
      "James Webb Space Telescope sends first images — the universe in stunning detail.",
      "Pokémon Legends: Arceus released — open-world Pokémon, finally!",
      "ChatGPT launches — AI goes mainstream overnight.",
      "Pokémon Scarlet & Violet released.",
      "Artemis I launches — humanity heads back to the Moon."
    ],
    category: 'tech',
    isPersonalMilestone: false,
    icon: "🤖"
  },
  {
    year: 2023,
    headline: "AI Revolution & Baldur's Gate",
    facts: [
      "The AI revolution accelerates — ChatGPT, GPT-4, and beyond.",
      "Baldur's Gate 3 wins Game of the Year — RPGs are BACK.",
      "Chandrayaan-3 lands on the Moon's south pole — India makes history.",
      "Valorant continues to dominate the esports scene.",
      "Starfield launches — Bethesda goes to space."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "🧠"
  },
  {
    year: 2024,
    headline: "He Married The Love Of His Life",
    facts: [
      "AI breakthroughs continue to reshape every industry.",
      "Summer Olympics held in Paris — the City of Light shines.",
      "SpaceX Starship achieves major orbital flight milestones.",
      "Pokémon Legends: Z-A announced — the hype is real."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "But the BIGGEST headline of 2024: He married the incredible, fantastic, amazing, and warm Eugenia. What a match. What a love story. What a year.",
    icon: "💍"
  },
  {
    year: 2025,
    headline: "Baby Julia Changes Everything",
    facts: [
      "Pokémon Legends: Z-A released — another adventure begins.",
      "AI continues to reshape the world in ways we're still figuring out.",
      "The world keeps spinning, technology keeps advancing..."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "But the ONLY headline that matters: Baby Julia was born! He's a DAD now. From gaming marathons to diaper marathons. What a crazy last couple of years.",
    icon: "👶"
  },
  {
    year: 2026,
    headline: "The Big 3-0",
    facts: [
      "30 years of Pokémon, gaming, science, love, and life.",
      "A husband. A father. A gamer. A legend.",
      "And somehow, still not Challenger rank."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "HAPPY 30TH BIRTHDAY! What a triple decade it's been. From catching Pokémon to catching feelings, from Xbox LAN parties to baby bottle prep at 3 AM. Here's to the next 30 years of adventures — we're so excited for every single one of them.",
    icon: "🎂"
  }
];
