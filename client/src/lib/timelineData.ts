export interface TimelineYear {
  year: number;
  headline: string;
  facts: string[];
  category: 'gaming' | 'tech' | 'science' | 'personal' | 'mixed';
  isPersonalMilestone: boolean;
  personalNote?: string;
  icon: string;
  image?: string;
  imageCaption?: string;
  /** Small scattered illustration images for the newspaper page */
  scatteredImages?: { url: string; caption: string; position: 'left' | 'right' }[];
}

export const timelineData: TimelineYear[] = [
  {
    year: 1996,
    headline: "The World's Longest Midlife Crisis Begins",
    facts: [
      "Pokémon Red & Green released in Japan — a franchise that would consume your entire personality.",
      "Nintendo 64 launched, bringing us Super Mario 64 and true 3D gaming.",
      "Dolly the Sheep became the first mammal cloned from an adult cell.",
      "The Macarena was inescapable. Absolutely everywhere.",
      "Google was just a research project at Stanford called 'BackRub.'"
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "Somewhere in 1996, someone finally decided to leave after 2 days of overstaying and not paying. No wonder you're always late to things. But congrats, welcome to the world Robert (Babybert).",
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
    icon: "🧙",
    scatteredImages: [
      { url: "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/nL3jwK9Bnm8FSFwcKDJd2Q_1771727696975_na1fn_ZG9sbHktc2hlZXA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L25MM2p3SzlCbm04RlNGd2NLREpkMlFfMTc3MTcyNzY5Njk3NV9uYTFmbl9aRzlzYkhrdGMyaGxaWEEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IXnooYeaeR0iqPTtAqN938JVRAXmyTl3Vp38x60YDKOQucMe2CqUdZCIQhzfFCROk5~m0XCtq8oowsZOk7jdu~vyxtNie5ghImhjcNadaGsVKZDTIjwBd8Majt5j40057h1N9S-rZ7xp~qTDAc942eWFoppkHFHe1KUiJpr84-byqpDdOO3sZZ2n1jgjMlWBA2X8cttatpAH-rv5ujGjzD1fPU8tVjjuW7TndjvWWXltoA26Dgvb1WGV9ohjr~MD0rLl6OrzKwZCW43L13r8KgpL0mIeX0llSJT824gaL3JDYtwAxmAtl5CmPkS-bcvYfNDJYVfkoqUgXgXKRF-C3A__", caption: "Dolly the Sheep", position: "right" }
    ]
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
    icon: "🎮",
    scatteredImages: [
      { url: "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/nL3jwK9Bnm8FSFwcKDJd2Q_1771727696976_na1fn_Z2FtZWJveS1wb2tlbW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L25MM2p3SzlCbm04RlNGd2NLREpkMlFfMTc3MTcyNzY5Njk3Nl9uYTFmbl9aMkZ0WldKdmVTMXdiMnRsYlc5dS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=DzW6RFjNyZr3gIHHn3fOOc5eOxwj79JKxoYUQd0Iqqyj6Nng6FAsIZ8u75IX-uVOTQ2i-VcPPn8DQGWVA3sSQhwaQgpouU~dDjaenqwQZcoUeTGLCNO0pc9gkv~wkUjNQUPrlNy~mwDNKI6~er7VDfL3VzP1EGRJABEmJKerkDI~2JdyLj8HulBajdvvRbEO2~-xUNitTfinHyfh~4tX~hz-v6~5k5QSy2jRqkpbzaUnu8Rid23gbSlWlxpzInCV4vJdl~GEd~ub4vLDexyHVRE-uKqkgT0qgxZECjXaydYFYXNpr-iXm7L1GM4uyS~jVdnEAbcY~SA5RgaRQi9SYw__", caption: "Game Boy + Pokémon", position: "left" },
      { url: "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/nL3jwK9Bnm8FSFwcKDJd2Q_1771727696976_na1fn_aW1hYy1nMw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L25MM2p3SzlCbm04RlNGd2NLREpkMlFfMTc3MTcyNzY5Njk3Nl9uYTFmbl9hVzFoWXkxbk13LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Mcd1qiokTW5xjX6mfGo6gsCzfaEKPwBvKSj6tee0-YXS6jM8ohyZ7UBwCyq7~-5tZtzCfit73v~S6O4O-y3aIm5JqAzqjUrZCjvJAnyJRAzUINhrG-1ZlwG1bkQyEtpQ1N--elSySfjwyOcK8z639D5MPUUpWF7H5hYlfC7MwhLnOsnvSOaGFqzUvGh8xIcSywk0~Hu1gmOv4FkdW~kvIy4BL2-Q9SXDlzk1Vpr5ra9GPd4~ka0jWBeOpsOJIcHZ62VhgW2bfLRhwwLsZ3WcMNQex7sgI36sKqo53EVQo9kPc5rFKraeS3teVb5prMgCLOCoslOJ~nw5YUNmxVogjQ__", caption: "iMac G3", position: "right" }
    ]
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
    icon: "🎯",
    scatteredImages: [
      { url: "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/nL3jwK9Bnm8FSFwcKDJd2Q_1771727696977_na1fn_eGJveC1jb25zb2xl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L25MM2p3SzlCbm04RlNGd2NLREpkMlFfMTc3MTcyNzY5Njk3N19uYTFmbl9lR0p2ZUMxamIyNXpiMnhsLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hAlda7WUl~QOvuaOZYC98jFXIfSv7yQFC2bPI6I5RrsCVsgzDsNoiYPpKYxpQkKvPzIqB89zD1Lz6a70Vb3MIOR-3eANptmNqmIR3q3czZfUgmE33WihFQYe6gOKUnnEzAr4xGODbY-8uL0ICEqvQGOSS0~Sz0SI-AaZIyLzDdAl0DljgGjtvHHev2tYOjoKWNgbpYbT4sc7rfLXKF3i7RrdzvW9I8gPvNO06IgeU13SkrzTXG4vEqnDfu9hu6ZyEcgI1GY1LbePfmrw5qmxqelMoVfXi76sd20RvO0XnLY2slVX8D0Tnxq1NUkqzqcq54CgQh29AwznaIRB3gXh0g__", caption: "Xbox", position: "left" },
      { url: "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/nL3jwK9Bnm8FSFwcKDJd2Q_1771727696976_na1fn_aXBvZC1jbGFzc2lj.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L25MM2p3SzlCbm04RlNGd2NLREpkMlFfMTc3MTcyNzY5Njk3Nl9uYTFmbl9hWEJ2WkMxamJHRnpjMmxqLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=DD4WIIS373UjsthcpZoX4i4OLtxfDBzOlFJQG8q1~g8giHtSTo1yEkp-ENFIl4Ajw~IRjqHwXWxjcxz9qYxGKFmEAt-KddXVoY8rPq40f3nKUSwHkF6jj2oQiTB~YdDjkzSATqPVhBUBXFLpGRzdj~DqMITtXHdnPixgR5Am5c8ORAr54gKJWysnjmlLYhDsn3Bqa8lbSasGgZTKCIxqixAVfliNbBi5GmZ-iu9E-e7wdYcI~Gj1Uw~YJ6ykmqzLbcHi2I88czLxznyokB6K6byvb5zzQuuUdEJp742-RGajeiv5zsELpHS6etqw9Yp1mo5KcsQfcdU2N2aCqm6SLg__", caption: "iPod", position: "right" }
    ]
  },
  {
    year: 2002,
    headline: "The Better Sibling Finally Shows Up",
    facts: [
      "Xbox Live launches — online console gaming goes mainstream.",
      "Spider-Man becomes the first film to earn $100M in its opening weekend.",
      "Pokémon Ruby & Sapphire released in Japan — Gen III begins.",
      "Mars Odyssey begins mapping the Red Planet from orbit."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "The REAL main character enters the story. I was born. You had six years of being an only child and honestly, you peaked there. You're welcome for making your life less boring.",
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
    icon: "📱",
    scatteredImages: [
      { url: "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/zs0MnoAmvwBEUbR8bH4JI2_1771727772396_na1fn_aXBob25lLW9yaWdpbmFs.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L3pzME1ub0FtdndCRVViUjhiSDRKSTJfMTc3MTcyNzc3MjM5Nl9uYTFmbl9hWEJvYjI1bExXOXlhV2RwYm1Gcy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=UgNeUnEOaHW1oprp7tL7bdLOtaFyWuyFXMOc0fI2Oa5YlrX4B-Zab2OnvxrOu~Jc-V0Ej~iUaLE3h7ASsztdJE3BIcGsidsGRI9CB5fmbyqvJ5v6p~9F8AQYfkJon-xZOODbXsObCp57ncCuRM12jBIicUM0-YTin02-FD-5DYEUECJAPorIW6Jr4D4KhIUgYtKmkbjwdnydFKe9f3JRAwZ~XsW20M24~uEysOkMzgt21-rKdfKTiBrk61~t1ieQUx3ZmjsYm-w7RBHw2mr9KNr43Q-Ni6EodR1O3taCxNv-S4OYjVwR4Ofljvb8w14hjZRBbf1drMG9Sey4KY~WKQ__", caption: "The Original iPhone", position: "right" }
    ]
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
      "League of Legends released by Riot Games — THE game that would consume thousands of your hours and give you nothing in return.",
      "Minecraft development begins — a blocky revolution.",
      "Bitcoin network launches — digital gold or digital tulips?",
      "Avatar becomes the highest-grossing film ever.",
      "NASA discovers water on the Moon!"
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "⚔️",
    scatteredImages: [
      { url: "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/zs0MnoAmvwBEUbR8bH4JI2_1771727772399_na1fn_bGVhZ3VlLW9mLWxlZ2VuZHM.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L3pzME1ub0FtdndCRVViUjhiSDRKSTJfMTc3MTcyNzc3MjM5OV9uYTFmbl9iR1ZoWjNWbExXOW1MV3hsWjJWdVpITS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pvFgjSyn6dtHOKr5JSOMKNinK6U--~8tqF2trY~syPFs8j7oMuO8F~O9tmViN1d4VSCx7GRyGcybZFobnGI3ydnwMn6I23b3nImXhoLGdoAlL~TkngYpxX0Yp6SZk3GegrFqLCYIgvE1y1yWg~hpD6pWYMPmaIWFVYWvJvZtCM0i--5WSJw0CSDuVjpJrXbXb4b4EBP-cZqIe7acojyOsTQZlNk1mvqrpq69Akc59wTwigmNujDoRvxmodhE-deQ0RWAbch2UzwHb1K3IvRlaErZJKQVNxdfKGmv1Cpjhyjly6T3ETfFWHgX2KT9P8lFVzS0k75N-GtSLF~7X5lFxg__", caption: "League of Legends", position: "left" },
      { url: "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/zs0MnoAmvwBEUbR8bH4JI2_1771727772397_na1fn_bWluZWNyYWZ0LWNyZWVwZXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L3pzME1ub0FtdndCRVViUjhiSDRKSTJfMTc3MTcyNzc3MjM5N19uYTFmbl9iV2x1WldOeVlXWjBMV055WldWd1pYSS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CpYs1gIdg2J905dLOjtNC2xqlYBOtgNMQinCecM-sTB7c4I1beAMlnwEcwSc6EssSqCZtcbsDWO50TNl562yuwUng2AEVps8psIzhhMrTX8Z~WzTvNlIPlaCJJjJSQNORPn7c5ZkcDrideBGvAIWDK8P1hTive7MkNfHmTJXnpBD2d3lVAPGA4D2o39RxieskC1P3W1qh9XPg36f9BsFlh6enahH1PFAIlpzm4hKtGh3cVsENHZzjsnK~sOXgnNRFiC88D0UxjJ3rwYXw8Uu3igN7-b5edTSEMorSfcFQf3gwY~8zoSch5WOlFAb3trmjfCShAWt9ugT0LmOInqBxQ__", caption: "Minecraft Creeper", position: "right" }
    ]
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
    headline: "Nerd Alert: TJHSST Accepts Robert",
    facts: [
      "Minecraft officially releases — the world builds together.",
      "The Elder Scrolls V: Skyrim released — 'I used to be an adventurer like you...'",
      "Steve Jobs passes away — the world mourns a visionary.",
      "Pokémon Black & White released worldwide.",
      "CRISPR gene editing technology developed — science fiction becomes reality."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "Probably the most important decision of your life tbh. I never hear you NOT talk about it. And let's not forget the iconic yearbook photo of you sleeping in the hallways. I show it to all my friends to see if they can locate the hallway.",
    icon: "🏫"
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
    icon: "🔬",
    scatteredImages: [
      { url: "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/zs0MnoAmvwBEUbR8bH4JI2_1771727772397_na1fn_bWFycy1yb3Zlcg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L3pzME1ub0FtdndCRVViUjhiSDRKSTJfMTc3MTcyNzc3MjM5N19uYTFmbl9iV0Z5Y3kxeWIzWmxjZy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=WcxModgxTRzWdHO8iMgK0aG-V4sR~xXK5vMilsXRrRQEcEb6suO1ltdS8pG7zBHwHzyJfaQJV-x6A9hH9I494WGETC9FJvgfTIO3efriuDLJGEs~Cl21FMeuhhVmlQu740Ne6a-gWUmeQerYkJGcQI3aYSKqn~60CoBQs9xSDZ3yM~AklBPji0bmg35CFIr4hVjttRKhFV2Fep~1XT2ruDlezzVww2h9cEI3kc5LBtK6Q4IRrP3jfz8kFZfoAg0UdVWkrJlTOAWflXUzLdkD~9R4bTByG2NhsPpdWE83FXybNvw03i3mVCQxVBnBnGCg2kcdu5coJIT0wMbuU-Zbjw__", caption: "Mars Curiosity Rover", position: "right" }
    ]
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
    headline: "Robert Goes Big Red (Cornell, Baby)",
    facts: [
      "Amazon acquires Twitch for $970 million — gaming streaming explodes.",
      "Rosetta spacecraft lands a probe on a comet — first time ever!",
      "Pokémon Omega Ruby & Alpha Sapphire released.",
      "Amazon Echo / Alexa launched — AI enters your living room.",
      "The ALS Ice Bucket Challenge goes mega-viral."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "Nerd alert, nerd alert. Robert steps foot on Cornell's campus. TA for the hardest computer systems course... but didn't even take CS 2112. Classic overachiever energy with selective effort.",
    icon: "🎓"
  },
  {
    year: 2015,
    headline: "The Great ID Disaster of Sophomore Year",
    facts: [
      "New Horizons reaches Pluto — we finally see the (dwarf) planet up close.",
      "Fallout 4 released — another 200 hours gone.",
      "The CRISPR revolution takes off in labs worldwide.",
      "Pokémon GO development announced — the hype begins."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "Move-in day, sophomore year. This genius forgot his ID so he couldn't even move in properly. Although I did like Saigon Kitchen. I still think about it sometimes.",
    icon: "🪪"
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
    icon: "🚀",
    scatteredImages: [
      { url: "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/zs0MnoAmvwBEUbR8bH4JI2_1771727772398_na1fn_dGVzbGEtbW9kZWwtcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L3pzME1ub0FtdndCRVViUjhiSDRKSTJfMTc3MTcyNzc3MjM5OF9uYTFmbl9kR1Z6YkdFdGJXOWtaV3d0Y3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=orvhgE27mcYGPQzK6IQEonOgALzZDxz~emt5x9CpitLyUZgPajS0qIQiFQEFtTSSL3GY3yMLDGbA4FI15jo2pglLZZ7FXuCmh~Y78Ej~MTZfIgYURTix0rwJF-DcNz6WCeKaAMhM~qmMvSW5jEvIJvO88hgrNt4lE96ArPAAugHJJyFZm-GFd-Wta8aQ1hPdKseyY7siZPjuww5ad--BnxyxWHtPI8xf-~rRpr~jZH31SFIpSfjoexWBSoxvExKWqEBGrvx~tF5u5diNpjaKNo8cYggVrbV3nL2gsFhS3HU2l4UU4VnPvsegXF4mOkSbmLfqQf1WzdcLo0i5-w34VQ__", caption: "Tesla in Space", position: "left" }
    ]
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
    icon: "🕳️",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663336994935/knRpMORfdJeXkHRy.png",
    imageCaption: "NYC's electric mobility boom — a familiar sight for @robertonthezoom"
  },
  {
    year: 2020,
    headline: "Pandemic, Valorant & Among Us",
    facts: [
      "COVID-19 pandemic changes life as we know it.",
      "VALORANT released by Riot Games — tactical shooter meets abilities. Another game to be hardstuck in.",
      "PS5 and Xbox Series X launch — next-gen arrives (if you can find one).",
      "SpaceX Crew Dragon sends astronauts to ISS — first commercial crew mission.",
      "Among Us becomes a global phenomenon — trust no one."
    ],
    category: 'gaming',
    isPersonalMilestone: false,
    icon: "😷",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663336994935/MHZbxiXNkYLvPWgo.png",
    imageCaption: "Artist's depiction of @robertonthezoom navigating midtown traffic"
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
    headline: "Jasmine The Diva Enters The Chat",
    facts: [
      "James Webb Space Telescope sends first images — the universe in stunning detail.",
      "Pokémon Legends: Arceus released — open-world Pokémon, finally!",
      "ChatGPT launches — AI goes mainstream overnight.",
      "Pokémon Scarlet & Violet released.",
      "Artemis I launches — humanity heads back to the Moon."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "Eugenia got Jasmine the Bichon Frise, but Robert basically watched her grow up. His first kid, really. She's a total diva but very cute. The princess of the household before Julia came along.",
    icon: "🐶",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663336994935/OxNBLpmzjQRfiCBN.jpg",
    imageCaption: "Jasmine the Bichon — local diva, demands treats"
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
    headline: "Someone Actually Agreed To Marry Him",
    facts: [
      "AI breakthroughs continue to reshape every industry.",
      "Summer Olympics held in Paris — the City of Light shines.",
      "SpaceX Starship achieves major orbital flight milestones.",
      "Pokémon Legends: Z-A announced — the hype is real."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "Against all odds and everyone's expectations, he married the incredible, fantastic, amazing, and warm Eugenia. She could've done better, but here we are. Genuinely though — she's the best thing that ever happened to him and it's not even close.",
    icon: "💍"
  },
  {
    year: 2025,
    headline: "Baby Julia Arrives (RIP Sleep)",
    facts: [
      "Pokémon Legends: Z-A released — another adventure begins.",
      "AI continues to reshape the world in ways we're still figuring out.",
      "The world keeps spinning, technology keeps advancing..."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "Baby Julia was born and he became a dad. The man who used to rage-quit League at 2 AM is now on diaper duty at 2 AM. He'll probably try to project-manage her sleep schedule. Karma is beautiful. But seriously — Julia is lucky to have him. Even if she doesn't know it yet.",
    icon: "👶"
  },
  {
    year: 2026,
    headline: "Happy 30th, Dadbert.",
    facts: [
      "30 years of Pokémon, gaming, science, love, and questionable life choices.",
      "A husband. A father. A gamer. A 'product manager.' Allegedly an adult.",
      "And somehow, after all these years, still not Challenger rank."
    ],
    category: 'personal',
    isPersonalMilestone: true,
    personalNote: "HAPPY 30TH BIRTHDAY, DADBERT. Three whole decades on this planet and what do you have to show for it? A beautiful wife, an adorable daughter, a Deloitte stint you won't shut up about, a tech PM title you definitely oversell, and thousands of hours in League of Legends. Three out of five ain't bad. Here's to 30 more years of me making fun of you. Love you, old man.",
    icon: "🎂"
  }
];
