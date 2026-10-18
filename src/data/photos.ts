/**
 * Demo photo catalogue.
 *
 * Replace this array with your own photos (or load them from a CMS / database
 * in src/lib/photos.ts). Image URLs use picsum.photos seeds so the demo works
 * out of the box — swap `src` for your own CDN URLs and add the host to
 * `images.remotePatterns` in next.config.mjs.
 *
 * Writing your own `description` (200–300 words) for every photo is the best
 * thing you can do for SEO. When `description` is omitted, a long caption is
 * composed from the other fields (see buildDescription in src/lib/photos.ts).
 */

export type CategorySlug = "nature" | "travel" | "architecture" | "animals" | "food" | "abstract";

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
}

export const categories: Category[] = [
  { slug: "nature", name: "Nature", blurb: "Mountains, forests, oceans and skies in stunning high resolution." },
  { slug: "travel", name: "Travel", blurb: "Streets, landmarks and hidden corners from around the world." },
  { slug: "architecture", name: "Architecture", blurb: "Bold lines, iconic buildings and urban geometry." },
  { slug: "animals", name: "Animals", blurb: "Wildlife and pets captured up close." },
  { slug: "food", name: "Food", blurb: "Mouth-watering dishes, drinks and kitchen moments." },
  { slug: "abstract", name: "Abstract", blurb: "Textures, colours and patterns that spark the imagination." },
];

export interface RawPhoto {
  /** URL slug — becomes /photo/[id]. Keep it short, lowercase and descriptive. */
  id: string;
  title: string;
  /** One-sentence caption used on cards and as the meta description. */
  caption: string;
  category: CategorySlug;
  tags: string[];
  location: string;
  photographer: string;
  camera: string;
  settings: string;
  /** One or two sentences that are unique to this photo. */
  story: string;
  /** Optional full 200–300 word description (overrides the generated one). */
  description?: string;
  /** Used for the "Trending" widget — wire it to real analytics in production. */
  views: number;
  publishedAt: string;
  /** Full-resolution image URL. */
  src?: string;
  width?: number;
  height?: number;
}

export const rawPhotos: RawPhoto[] = [
  // ---------------------------------------------------------------- Nature
  { id: "misty-mountain-sunrise", title: "Misty Mountain Sunrise", caption: "First light spills over layered peaks wrapped in morning fog.", category: "nature", tags: ["mountains", "sunrise", "fog", "landscape"], location: "Dolomites, Italy", photographer: "Elena Ruiz", camera: "Sony A7R IV", settings: "24mm · f/8 · 1/125s · ISO 100", story: "The photographer hiked for two hours in the dark to reach the ridge before dawn, waiting as the valley fog slowly lifted between the summits.", views: 18450, publishedAt: "2026-09-02" },
  { id: "emerald-forest-path", title: "Emerald Forest Path", caption: "A quiet trail winds through moss-covered trees after the rain.", category: "nature", tags: ["forest", "trail", "green", "moss"], location: "Olympic National Park, USA", photographer: "Marcus Lee", camera: "Fujifilm X-T5", settings: "16mm · f/5.6 · 1/60s · ISO 400", story: "Fresh rainfall made every leaf glisten, and the soft overcast light kept the greens rich without harsh shadows.", views: 9120, publishedAt: "2026-08-28" },
  { id: "turquoise-lagoon-aerial", title: "Turquoise Lagoon From Above", caption: "Crystal-clear water meets white sand in a drone's-eye view.", category: "nature", tags: ["ocean", "aerial", "beach", "drone"], location: "Palawan, Philippines", photographer: "Aiko Tanaka", camera: "DJI Mavic 3 Pro", settings: "24mm · f/2.8 · 1/500s · ISO 100", story: "Shot at midday when the sun sat directly overhead, which removed reflections and revealed the coral shelves beneath the surface.", views: 22310, publishedAt: "2026-09-10" },
  { id: "aurora-over-frozen-lake", title: "Aurora Over a Frozen Lake", caption: "Green northern lights ripple above a silent, icy shoreline.", category: "nature", tags: ["aurora", "night", "winter", "stars"], location: "Abisko, Sweden", photographer: "Lars Eriksson", camera: "Nikon Z7 II", settings: "14mm · f/2.8 · 8s · ISO 1600", story: "Temperatures dropped to minus twenty-eight degrees, and the camera batteries had to be kept warm inside a jacket between exposures.", views: 31200, publishedAt: "2026-07-19" },
  { id: "golden-wheat-field", title: "Golden Wheat Field at Dusk", caption: "Ripe wheat sways under a warm late-summer sky.", category: "nature", tags: ["field", "golden hour", "countryside", "summer"], location: "Tuscany, Italy", photographer: "Elena Ruiz", camera: "Canon EOS R5", settings: "50mm · f/2 · 1/1000s · ISO 100", story: "A gentle breeze moved the stalks in waves, so a fast shutter speed was used to freeze each golden ear of grain.", views: 7640, publishedAt: "2026-08-04" },
  { id: "waterfall-long-exposure", title: "Silky Waterfall Long Exposure", caption: "Cascading water turns to silk over dark volcanic rock.", category: "nature", tags: ["waterfall", "long exposure", "river", "rocks"], location: "Skógafoss, Iceland", photographer: "Lars Eriksson", camera: "Nikon Z7 II", settings: "24mm · f/11 · 2s · ISO 64", story: "A ten-stop ND filter allowed a two-second exposure in daylight, smoothing the falling water while keeping the rocks tack sharp.", views: 12980, publishedAt: "2026-06-30" },

  // ---------------------------------------------------------------- Travel
  { id: "santorini-blue-domes", title: "Santorini Blue Domes", caption: "Iconic blue-domed churches overlook the shimmering Aegean Sea.", category: "travel", tags: ["greece", "island", "church", "sea"], location: "Oia, Santorini, Greece", photographer: "Sofia Papadakis", camera: "Sony A7 IV", settings: "35mm · f/8 · 1/320s · ISO 100", story: "Arriving before sunrise meant the famous viewpoint was empty, leaving only the whitewashed walls and the calm sea below.", views: 27450, publishedAt: "2026-09-14" },
  { id: "kyoto-lantern-alley", title: "Kyoto Lantern Alley", caption: "Paper lanterns glow along a narrow street in the old town.", category: "travel", tags: ["japan", "night", "lanterns", "street"], location: "Gion, Kyoto, Japan", photographer: "Aiko Tanaka", camera: "Fujifilm X100V", settings: "23mm · f/2 · 1/60s · ISO 1250", story: "Light rain had just fallen, so the cobblestones reflected the warm lantern light and doubled the glow of the alley.", views: 19870, publishedAt: "2026-08-21" },
  { id: "desert-camel-caravan", title: "Desert Camel Caravan", caption: "A line of camels crosses rolling dunes at golden hour.", category: "travel", tags: ["desert", "camels", "dunes", "sahara"], location: "Merzouga, Morocco", photographer: "Youssef Amrani", camera: "Canon EOS R6", settings: "70mm · f/5.6 · 1/800s · ISO 200", story: "The caravan guide paused on the crest of a dune so the long shadows of the camels could stretch across the sand.", views: 15340, publishedAt: "2026-07-08" },
  { id: "venice-canal-morning", title: "Venice Canal Morning", caption: "Gondolas rest on a calm canal as the city wakes up.", category: "travel", tags: ["italy", "canal", "gondola", "city"], location: "Venice, Italy", photographer: "Sofia Papadakis", camera: "Leica Q2", settings: "28mm · f/4 · 1/250s · ISO 100", story: "Early morning is the only time Venice's canals are this still, before the water taxis and delivery boats begin their rounds.", views: 11230, publishedAt: "2026-06-17" },
  { id: "himalayan-prayer-flags", title: "Himalayan Prayer Flags", caption: "Colourful prayer flags flutter against snow-capped peaks.", category: "travel", tags: ["nepal", "himalaya", "flags", "trek"], location: "Annapurna Circuit, Nepal", photographer: "Marcus Lee", camera: "Sony A7R IV", settings: "35mm · f/9 · 1/400s · ISO 100", story: "Taken at Thorong La Pass, more than five thousand metres above sea level, where the wind never stops moving the flags.", views: 8990, publishedAt: "2026-05-29" },
  { id: "marrakech-spice-market", title: "Marrakech Spice Market", caption: "Pyramids of vibrant spices fill a bustling souk stall.", category: "travel", tags: ["morocco", "market", "spices", "colour"], location: "Marrakech, Morocco", photographer: "Youssef Amrani", camera: "Fujifilm X-T5", settings: "33mm · f/2.8 · 1/200s · ISO 400", story: "The stall owner shaped the paprika and turmeric cones by hand every morning and was proud to have them photographed.", views: 13770, publishedAt: "2026-09-05" },

  // ---------------------------------------------------------------- Architecture
  { id: "spiral-staircase-top-down", title: "Spiral Staircase From Above", caption: "A perfect spiral of steps descends into soft shadow.", category: "architecture", tags: ["stairs", "spiral", "symmetry", "interior"], location: "Lisbon, Portugal", photographer: "Daniel Costa", camera: "Sony A7 IV", settings: "16mm · f/5.6 · 1/30s · ISO 800", story: "The camera was held level over the railing of the top floor, and a bubble level helped keep the spiral perfectly centred.", views: 16540, publishedAt: "2026-08-12" },
  { id: "glass-skyscraper-reflections", title: "Glass Skyscraper Reflections", caption: "Neighbouring towers mirror each other in a wall of blue glass.", category: "architecture", tags: ["skyscraper", "glass", "city", "reflection"], location: "Chicago, USA", photographer: "Hannah Brooks", camera: "Canon EOS R5", settings: "85mm · f/8 · 1/640s · ISO 100", story: "A telephoto view compressed the facade into an abstract grid, with the clouds becoming part of the building itself.", views: 10450, publishedAt: "2026-07-25" },
  { id: "gothic-cathedral-nave", title: "Gothic Cathedral Nave", caption: "Soaring stone arches lead the eye toward stained-glass light.", category: "architecture", tags: ["cathedral", "gothic", "arches", "history"], location: "Cologne, Germany", photographer: "Daniel Costa", camera: "Nikon Z6 II", settings: "14mm · f/4 · 1/15s · ISO 1600", story: "Late afternoon sun streamed through the western windows, scattering coloured patches of light across the ancient columns.", views: 8730, publishedAt: "2026-06-09" },
  { id: "colorful-row-houses", title: "Colourful Row Houses", caption: "Pastel townhouses line a cheerful waterfront street.", category: "architecture", tags: ["houses", "pastel", "street", "colour"], location: "Copenhagen, Denmark", photographer: "Hannah Brooks", camera: "Fujifilm X100V", settings: "23mm · f/5.6 · 1/500s · ISO 160", story: "The facades were repainted just the summer before, and the bright overcast day kept every colour soft and even.", views: 14890, publishedAt: "2026-09-18" },
  { id: "brutalist-concrete-tower", title: "Brutalist Concrete Tower", caption: "Raw concrete forms create bold shadows against a clear sky.", category: "architecture", tags: ["brutalism", "concrete", "modern", "shadows"], location: "London, UK", photographer: "Oliver Grant", camera: "Leica Q2", settings: "28mm · f/8 · 1/800s · ISO 100", story: "Shooting straight up from the base exaggerated the stacked balconies until they looked like a giant geometric sculpture.", views: 6420, publishedAt: "2026-05-14" },
  { id: "bridge-at-blue-hour", title: "Suspension Bridge at Blue Hour", caption: "City lights twinkle as a bridge glows in the twilight.", category: "architecture", tags: ["bridge", "blue hour", "night", "city lights"], location: "San Francisco, USA", photographer: "Oliver Grant", camera: "Sony A7R IV", settings: "24mm · f/11 · 15s · ISO 100", story: "A fifteen-second exposure turned the evening traffic into ribbons of light flowing across the deck of the bridge.", views: 20110, publishedAt: "2026-08-30" },

  // ---------------------------------------------------------------- Animals
  { id: "red-fox-in-snow", title: "Red Fox in the Snow", caption: "A curious red fox pauses mid-step in fresh powder.", category: "animals", tags: ["fox", "wildlife", "snow", "winter"], location: "Yellowstone, USA", photographer: "Marcus Lee", camera: "Canon EOS R5", settings: "500mm · f/5.6 · 1/1600s · ISO 800", story: "The fox had been hunting mice beneath the snow and glanced toward the lens for just a moment before leaping away.", views: 25670, publishedAt: "2026-09-08" },
  { id: "sleepy-tabby-kitten", title: "Sleepy Tabby Kitten", caption: "A tiny tabby kitten naps in a patch of warm sunlight.", category: "animals", tags: ["cat", "kitten", "pets", "cute"], location: "Bristol, UK", photographer: "Hannah Brooks", camera: "Sony A7 IV", settings: "85mm · f/1.8 · 1/250s · ISO 200", story: "Window light from the side gave the kitten's fur a soft glow, and a wide aperture blurred the busy room behind it.", views: 33890, publishedAt: "2026-09-16" },
  { id: "elephant-family-savanna", title: "Elephant Family on the Savanna", caption: "A herd of elephants walks together beneath acacia trees.", category: "animals", tags: ["elephant", "safari", "africa", "herd"], location: "Amboseli, Kenya", photographer: "Youssef Amrani", camera: "Nikon Z9", settings: "200mm · f/6.3 · 1/1000s · ISO 400", story: "The youngest calf stayed tucked between its mother's legs while the herd moved slowly toward a waterhole.", views: 17820, publishedAt: "2026-07-02" },
  { id: "hummingbird-mid-flight", title: "Hummingbird Mid-Flight", caption: "Wings frozen in motion as a hummingbird feeds on a flower.", category: "animals", tags: ["bird", "hummingbird", "macro", "flowers"], location: "Monteverde, Costa Rica", photographer: "Aiko Tanaka", camera: "Sony A1", settings: "400mm · f/4 · 1/8000s · ISO 3200", story: "An ultra-fast shutter speed was the only way to freeze wings that beat more than fifty times every second.", views: 12340, publishedAt: "2026-06-21" },
  { id: "golden-retriever-beach", title: "Golden Retriever on the Beach", caption: "A happy retriever sprints along the shoreline at sunset.", category: "animals", tags: ["dog", "beach", "pets", "sunset"], location: "Cornwall, UK", photographer: "Oliver Grant", camera: "Canon EOS R6", settings: "135mm · f/2.8 · 1/2000s · ISO 200", story: "Continuous autofocus tracked the dog as it raced back and forth chasing waves, spraying droplets that caught the light.", views: 21560, publishedAt: "2026-08-17" },
  { id: "sea-turtle-reef", title: "Sea Turtle Over the Reef", caption: "A green sea turtle glides gracefully above coral.", category: "animals", tags: ["turtle", "underwater", "reef", "ocean"], location: "Great Barrier Reef, Australia", photographer: "Elena Ruiz", camera: "Olympus TG-6", settings: "4.5mm · f/2 · 1/250s · ISO 200", story: "Snorkelling in shallow water meant natural sunlight could light the turtle without any flash or artificial strobes.", views: 14230, publishedAt: "2026-05-20" },

  // ---------------------------------------------------------------- Food
  { id: "rustic-sourdough-loaf", title: "Rustic Sourdough Loaf", caption: "A crusty sourdough loaf fresh from a wood-fired oven.", category: "food", tags: ["bread", "baking", "sourdough", "rustic"], location: "San Sebastián, Spain", photographer: "Daniel Costa", camera: "Fujifilm X-T5", settings: "56mm · f/2.8 · 1/125s · ISO 400", story: "The baker scored the dough with a single curved cut, which opened into the dramatic 'ear' visible along the crust.", views: 9870, publishedAt: "2026-08-09" },
  { id: "latte-art-heart", title: "Latte Art Heart", caption: "Velvety microfoam forms a perfect heart in a ceramic cup.", category: "food", tags: ["coffee", "latte", "cafe", "morning"], location: "Melbourne, Australia", photographer: "Sofia Papadakis", camera: "Sony A7 IV", settings: "90mm macro · f/4 · 1/160s · ISO 400", story: "The barista poured more than a dozen cups until the heart was perfectly symmetrical for the photograph.", views: 15460, publishedAt: "2026-09-12" },
  { id: "fresh-sushi-platter", title: "Fresh Sushi Platter", caption: "Colourful nigiri and rolls arranged on a slate board.", category: "food", tags: ["sushi", "japanese", "seafood", "platter"], location: "Tokyo, Japan", photographer: "Aiko Tanaka", camera: "Canon EOS R5", settings: "50mm · f/5.6 · 1/100s · ISO 320", story: "Shot straight down from above, the dark slate made the salmon, tuna and tamago stand out like jewels.", views: 11890, publishedAt: "2026-07-14" },
  { id: "berry-pancake-stack", title: "Berry Pancake Stack", caption: "Fluffy pancakes topped with berries and dripping maple syrup.", category: "food", tags: ["pancakes", "breakfast", "berries", "sweet"], location: "Vermont, USA", photographer: "Hannah Brooks", camera: "Nikon Z6 II", settings: "85mm · f/2.8 · 1/200s · ISO 250", story: "The syrup was poured just as the shutter fired, capturing the glossy drip running down the side of the stack.", views: 18320, publishedAt: "2026-08-25" },
  { id: "street-tacos-al-pastor", title: "Street Tacos al Pastor", caption: "Sizzling al pastor tacos with pineapple, onion and cilantro.", category: "food", tags: ["tacos", "mexican", "street food", "spicy"], location: "Mexico City, Mexico", photographer: "Youssef Amrani", camera: "Fujifilm X100V", settings: "23mm · f/2.8 · 1/250s · ISO 500", story: "These tacos came from a late-night stand where the spit of marinated pork had been turning since early evening.", views: 10670, publishedAt: "2026-06-05" },
  { id: "summer-fruit-bowl", title: "Summer Fruit Bowl", caption: "A vibrant bowl of watermelon, mango and kiwi slices.", category: "food", tags: ["fruit", "healthy", "summer", "colourful"], location: "Bali, Indonesia", photographer: "Elena Ruiz", camera: "Sony A7R IV", settings: "35mm · f/4 · 1/320s · ISO 100", story: "Everything was picked at a local market that morning and sliced only minutes before the photo to keep it glistening.", views: 7980, publishedAt: "2026-05-31" },

  // ---------------------------------------------------------------- Abstract
  { id: "liquid-color-swirl", title: "Liquid Colour Swirl", caption: "Inks of magenta and teal twist together in water.", category: "abstract", tags: ["ink", "swirl", "colour", "macro"], location: "Studio, Berlin", photographer: "Oliver Grant", camera: "Nikon Z7 II", settings: "105mm macro · f/8 · 1/200s · ISO 100", story: "Drops of acrylic ink were released into a glass tank and lit from behind with two flashes to freeze the motion.", views: 13450, publishedAt: "2026-09-03" },
  { id: "neon-light-trails", title: "Neon Light Trails", caption: "Streaks of neon light dance across a dark frame.", category: "abstract", tags: ["neon", "light painting", "night", "motion"], location: "Seoul, South Korea", photographer: "Aiko Tanaka", camera: "Sony A7 IV", settings: "35mm · f/8 · 6s · ISO 100", story: "The camera itself was moved during a six-second exposure, painting the city's neon signs into flowing ribbons.", views: 16780, publishedAt: "2026-08-14" },
  { id: "sand-dune-patterns", title: "Sand Dune Patterns", caption: "Wind-carved ripples form endless waves of light and shadow.", category: "abstract", tags: ["sand", "patterns", "texture", "minimal"], location: "Namib Desert, Namibia", photographer: "Lars Eriksson", camera: "Canon EOS R5", settings: "200mm · f/11 · 1/500s · ISO 100", story: "Low morning sun raked across the dunes, carving every tiny ripple into sharp relief for just twenty minutes.", views: 8240, publishedAt: "2026-07-11" },
  { id: "frosted-glass-bokeh", title: "Frosted Glass Bokeh", caption: "Soft circles of light glow behind a frosted window pane.", category: "abstract", tags: ["bokeh", "lights", "winter", "dreamy"], location: "Prague, Czech Republic", photographer: "Daniel Costa", camera: "Fujifilm X-T5", settings: "56mm · f/1.2 · 1/125s · ISO 800", story: "Christmas market lights were thrown deliberately out of focus through a frosted café window to create the glowing orbs.", views: 11120, publishedAt: "2026-06-26" },
  { id: "marble-texture-gold", title: "Gold-Veined Marble Texture", caption: "Rich gold veins run through polished white marble.", category: "abstract", tags: ["marble", "texture", "gold", "luxury"], location: "Carrara, Italy", photographer: "Sofia Papadakis", camera: "Sony A7R IV", settings: "90mm macro · f/11 · 1/60s · ISO 200", story: "The slab came from a quarry worked since Roman times and was photographed under diffused light to avoid glare.", views: 9560, publishedAt: "2026-05-24" },
  { id: "rainbow-prism-light", title: "Rainbow Prism Light", caption: "Sunlight splits into a rainbow through a crystal prism.", category: "abstract", tags: ["prism", "rainbow", "light", "spectrum"], location: "Studio, Lisbon", photographer: "Daniel Costa", camera: "Canon EOS R6", settings: "100mm macro · f/5.6 · 1/250s · ISO 100", story: "A glass prism on a windowsill caught a narrow beam of afternoon sun and threw the full spectrum across white paper.", views: 12760, publishedAt: "2026-09-20" },
];
