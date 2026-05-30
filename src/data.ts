import { Property, Agent, BlogArticle, Testimonial } from './types';

export const AGENTS: Agent[] = [
  {
    id: 'marcus',
    name: 'Marcus Sterling',
    role: 'Prime Waterfront Specialist',
    image: '/src/assets/images/regenerated_image_1779460409727.png',
    phone: '+971 50 123 4567',
    email: 'marcus@amx.ae'
  },
  {
    id: 'sarah',
    name: 'Sarah Al-Mansouri',
    role: 'Emirates Hills Portfolio',
    image: '/src/assets/images/regenerated_image_1779460413162.png',
    phone: '+971 50 234 5678',
    email: 'sarah@amx.ae'
  },
  {
    id: 'julian',
    name: 'Julian Vane',
    role: 'Off-Plan Investment Strategist',
    image: '/src/assets/images/regenerated_image_1779460418715.png',
    phone: '+971 50 345 6789',
    email: 'julian@amx.ae'
  },
  {
    id: 'elena',
    name: 'Elena Petrova',
    role: 'Downtown & DIFC Rentals',
    image: '/src/assets/images/regenerated_image_1779460421519.jpg',
    phone: '+971 50 456 7890',
    email: 'elena@amx.ae'
  }
];

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Contemporary Waterfront Villa',
    price: 14500000,
    location: 'Palm Jumeirah',
    address: 'Frond K, Private Estate, Palm Jumeirah, Dubai',
    type: 'Villa',
    beds: 5,
    baths: 6,
    sqft: 6200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxHGYXL_YbpoOQMp9s4Bg8HJB_nw6KS91Xspi0j97hGngL25XwQI16u9yPrdga2oeWdowo_nOtjhRWsJoxh_fSaJBnFNXruGA4DuFRoG1lQyPz1e5jnjzKpekj9z4LfnLdpaU3GvqEWyqcPA96--k5EeEd8PBVxS1wmXBnOGXaNJJ9AeeLQVpP85etPCSlTAqZXezANEQ73HBsLim7wWbYz5Y5S4z9iJjnk5qIw0oFEYh5VAcGchf3zwxt7hPOHW2ZX-iwp07nZSg_',
    badge: 'PREMIUM',
    agentId: 'marcus',
    amenities: ['Swimming Pool', 'Sea View', 'Gymnasium'],
    featured: true
  },
  {
    id: '2',
    title: 'The Address Sky Views Penthouse',
    price: 8250000,
    location: 'Downtown Dubai',
    address: 'The Address Sky Views, Boulevard Area, Downtown Dubai',
    type: 'Penthouse',
    beds: 3,
    baths: 4,
    sqft: 3450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-5QQY7ri7PGbcNOyfGxxRBoRHf1w5X5UUs6Whk5KrT3TE22hFJ3Y-8PSI1MxjXp_Lp9h1-IAvGuqpS7fQL9aLjBiwaenZQIoBxHKQ1qFrVlxKODUEa8Kxqg_Fbo3PO6lmt9dHcXSB9sIoq7J871G9n4uCA3UGMjRZb4LGhKtICwS-lD650lfAQuLNrcxVK-zEhEXTtr8Ld3b0EyWev52r_qebiuz-hYjyLcHtz0XfbKRH4BlPtgP24LAaqBR4o-648UY7uM1psNsK',
    badge: 'EXCLUSIVE',
    agentId: 'sarah',
    amenities: ['Swimming Pool', 'Gymnasium'],
    featured: true
  },
  {
    id: '3',
    title: 'Fairway Vistas Mansion',
    price: 22000000,
    location: 'Dubai Hills Estate',
    address: 'Sector E, Luxury Row, Dubai Hills Estate, Dubai',
    type: 'Villa',
    beds: 7,
    baths: 8,
    sqft: 11500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-M4WrCI8s4kVPyWY7yG_3_-BZdBZhd4bZhons96YI77kbfI3QHryfGWtw6cdqlDC54LdxmDeHascaJt_BklZytoQV0cGS5ehlGViOkts-LW0jzIkS42lWYmd_uucGYtCcYPwi8X8fj3xH_CiB1ScmvqH9Wk3uumhfTwjkSD35JSgdKB7HlZ-Gjz0070UGHRgtr8kkoRu4cKSh7pM5ntCtojPsfcR-03xOl67ljyDrTFOv7V9ISz2kshPai567waYGHQhRw0YZD_el',
    badge: 'EXQUISITE',
    agentId: 'julian',
    amenities: ['Swimming Pool', 'Gymnasium'],
    featured: true
  },
  {
    id: '4',
    title: 'Luxury Modern Townhouse',
    price: 3100000,
    location: 'Jumeirah Village Circle',
    address: 'District 12, Autumn Boulevard, JVC, Dubai',
    type: 'Townhouse',
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFn0gu2LKWMerEnPrDgxjvRTQXskonYay7RZ8OeYJYXWcH97HB420kaDUjOc0ErKkMvXQe0GSQqJ7Vf44ueBSYz1QjxQIzLKX-ZYXZq5YqYMj9LRQDEacM2CxqUPp9N0iwNJ2V_sjOCbYKXFMTsIxSKvKJTZCxQVvIW3BHrWyBtDUf0SsR5O9Vu8u2QA6WgQuBxzGfKvlGtvKeS2qaB5fWDeOcn0YK4yB8_fk-9buh8n1LbfBAIf8cIwAwdTuPl6Md5IW73jJaVo7o',
    badge: 'NEW',
    agentId: 'marcus',
    amenities: ['Swimming Pool', 'Gymnasium'],
    featured: true
  },
  {
    id: '5',
    title: 'Luxury Marina Vista Apt',
    price: 2450000,
    location: 'Dubai Marina',
    address: '23 Waterfront Drive, Marina Gate, Dubai Marina, Dubai',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    sqft: 1250,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6G_4lYTuaBUS46rVdBkF9TtIvxxNfO0Mzc9I2bNz9BrBMOugiZU0zLPj7CCuMaKY2E8d6f5Zxixv4rQpqwjbpNXiuCKXgKXVGW-x92Y3y2l-zooZThaxiMhiK112nzVAVXWMd-Bl7vHoYaWbIhGKG9AbIUxizoay_iZgo9nk4KQbclukMFxpnQWBTESTTArp4TPpAOcAUwsIhkUE2uf4zzyxNqVHRIAW-lPUeuDzwfuBPG5nDvD379zzDRbICIV02B6UDwqNR5jtC',
    badge: 'POPULAR',
    agentId: 'sarah',
    amenities: ['Swimming Pool', 'Sea View', 'Gymnasium'],
    featured: true
  },
  {
    id: '6',
    title: 'Desert Oasis Retreat',
    price: 5900000,
    location: 'Arabian Ranches III',
    address: 'Sun Ridge, Sector A, Arabian Ranches III, Dubai',
    type: 'Villa',
    beds: 4,
    baths: 5,
    sqft: 4100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfxNAXctdXlVsEgOhR_cb0grkczOnXbsUzphCsdJIql0ja1GdUA30OW2Hr57jfPAVrba3tXfCFvNYNzTYKQRQUyXI0JS6SXYyBWrfTNmst4ekb74mm1qZ6GbnVsTa-OF7sT8VWmFB5nbKnQisCmpPV6NmVeOJLuLf11WxUgNp7c_rsbNNiWrgcgshcY0TRWKYQyG08-qnfeLLv2Ukp6kubpQVesGcLGu6ROuhqfzLUV7vnjtclIUaow7nlTo4TGLl3HDuAcaVwUXBa',
    badge: 'SOLD',
    agentId: 'julian',
    amenities: ['Swimming Pool', 'Gymnasium'],
    featured: true
  },
  {
    id: '7',
    title: 'Garden Villa, Emirates Hills',
    price: 45000000,
    location: 'Emirates Hills',
    address: 'Sector E, Luxury Row, Emirates Hills, Dubai',
    type: 'Villa',
    beds: 6,
    baths: 7,
    sqft: 8100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2uoy_c_1xcTySG4Xbuqnv51E9__p-oSfNOn1EbXwfG-PRI6s3cTv6aAvMUDQnZ6_UNMmHLOpcpQ1f1tkl_Wr-0u16LPlaqc5veF0pd2jS2hOBbmzSAhloYGKLEXC18Wq10r5oIZp4286rl6b9k62318vSVb0_TZ2t608oIJt_R58JHQyNXfHZCPyLJzaDvkw2r2RcLXWbl_fRuLDJHmXRAaoRzo-tAQLptfTZNot8cKyinO_JQ6TcC90nRRWPGzgL9TXWAQFvb7TJ',
    badge: 'EXQUISITE',
    agentId: 'sarah',
    amenities: ['Swimming Pool', 'Gymnasium', 'Sea View'],
    featured: true
  },
  {
    id: '8',
    title: 'Burj Vista Apartment, Downtown',
    price: 4200000,
    location: 'Downtown Dubai',
    address: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    type: 'Apartment',
    beds: 2,
    baths: 3,
    sqft: 1850,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ntPMJwxse69Pzq9BhIKVs9taM-Po7wVkx5Mi_V71MOxGe8sImHWSPdKhMaiw8PnLOjNbLm3Mcy-m6ERDK7O9izH7JgbojHoPoUYwxrFphOzWGQAGSj3EhtoaRwsNBtJngkytyKRjWACEKF8-gh3MBE0zSvz9vyrs2vYjvxZqyZ5JDxEIYj_6I1QG9eWQEHMeanQEIL-gZ_orcgQ4nzkBunKm7EJ-Q5bYkw9aWM87GsBJqQMKJjZeu3TkAs7LoEOsRQU8lC80atNz',
    badge: 'NEW',
    agentId: 'elena',
    amenities: ['Swimming Pool', 'Gymnasium'],
    featured: true
  },
  {
    id: '9',
    title: 'Beachfront Haven, Palm Jumeirah',
    price: 28500000,
    location: 'Palm Jumeirah',
    address: 'Frond K, Private Estate, Palm Jumeirah, Dubai',
    type: 'Villa',
    beds: 5,
    baths: 6,
    sqft: 6700,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm1UnBsAvd7ZCGydIsPRtDUxvMQ7qCYq8lxEPEwSxF1UDBxNDtStVxRMjApVtBWNkP6uZG5pL4H94weYosxC948-XAJ4HPnWqpc4bFBlgtYKGY5BjOKihVngE6WYjAE5jYnzXPWO6h7fRjthFVk3v6rOGxpRzv4HKLi9RjMJ3D6vuITFyRnCPsvfrosfRxj4nLLEDZJ9cUBD98K8udIKXvzsdm_aEpfplMRnGxrZzcTea02NUvnivNP7mLps8Ra1xrgeyBEWpuk1tD',
    badge: 'PREMIUM',
    agentId: 'marcus',
    amenities: ['Swimming Pool', 'Sea View', 'Gymnasium'],
    featured: true
  },
  {
    id: '10',
    title: 'Luxe Retreat, Jumeirah Golf Estates',
    price: 11200000,
    location: 'Jumeirah Golf Estates',
    address: 'Whispering Pines, Golf Lane, Jumeirah Golf Estates, Dubai',
    type: 'Villa',
    beds: 4,
    baths: 5,
    sqft: 5200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw0m0EAyfXkhMiwmnlFD7per1yyrM6YDdAnPy17X8amhsC7suG0AdTkYvYOee9aLlg_uHObzTAqX6g7NlaKaWeEzwc97wwTWDAWDR1P0tQBzstMKYWbsrOeQLl78Ab7q0e-N3sR1imhijXGsD21dBle_SJZdyW-Ijk3VsDVbzwmGc-JwXdwe9DK3OrGHf8JokbjLMD7l9s-qWlnEAhY_D3Q_gdna02sy6XvqAR2iw35PouHM2B7OzxvCDESne0lDvD2KsKifz9MYCR',
    badge: 'PREMIUM',
    agentId: 'julian',
    amenities: ['Swimming Pool', 'Gymnasium'],
    featured: false
  },
  {
    id: '11',
    title: 'Urban Loft, JLT',
    price: 3650000,
    location: 'Jumeirah Lakes Towers',
    address: 'Cluster V, Indigo Tower, Jumeirah Lakes Towers, Dubai',
    type: 'Apartment',
    beds: 3,
    baths: 3,
    sqft: 2400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv9Aen6zXKI34xB5RD4x7xNAY1mVCnBoykr-BOnZx6xsCD52zG7l04pazuEbjDdntt-4FpK8Fgga7r-fdlatC4saG928X2fOEhJW1FpBwytxJWmgZSQEpa2b9Skb3YBPkHWmJFLmFFsXzlBKRNLlAH-9Uu4-hjgbis9V6uxZMqYFZNnLOrH1nk8JDpJBEQfbPDbJ0OmKS5ieTMWIxDpVzXOO0lw1MMVDVmSa7PpI7WjeH7Iv_FD_i49luG1saZ8YIET3M_r3s6P_VV',
    badge: 'NEW',
    agentId: 'elena',
    amenities: ['Gymnasium', 'Swimming Pool'],
    featured: false
  }
];

export const OFF_PLAN_PROJECTS = [
  {
    id: 'op1',
    title: 'Binghatti Skyrise, Business Bay',
    subtitle: 'A Legacy in the Making',
    priceText: 'AED 1.2M',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvxOSXv0ldTE3wk8JhiftYfzuQUPdpQmbhLkmQDywPGTU0VeFhaR8SCKmfs2bY7znkbNsFKzr59rYIWcmBMl1K9trCJagArvVCsdyOu4AtHOJVcU1wSUoKTPmb8XtGokd9E4uz3mj7gAmv3DyfGgaiMH4INcAfG894mhXquco3DLWNVqVKaPrgvjeCDWdfcKxnrvF78P7hjLcd6L6LGX-OYUxyDRHsmPa96712ZzQJedZ0Cnf8FkxKcKIewedMgP1ZjHochuCgtwM-',
    desc: 'Binghatti Skyrise is an architectural masterpiece featuring bold LED illumination strips, sky-high pool terraces, and luxury penthouse residences positioned dynamically in the commercial core of Business Bay.',
    handover: 'Q4 2026',
    paymentPlan: '70/30'
  },
  {
    id: 'op2',
    title: 'Oceanfront Residences, Dubai Islands',
    subtitle: 'Coastal Elegance Redefined',
    priceText: 'AED 2.8M',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB63YJj4TKOtDuWMcHk8A2Xjndke946qOpDybTrqAK7xPiBIu5j33HOxjjNxOhcm4xue6iMCNY88FEj_1tJxBvPh1Et0UXaiikJpnwQrCnmRYYEsXvKmlHCTSmUnq2sZaKt9Cfn7qbGD9dZePfSvR0MqEHrjCukVO-9xcEHBz_32ywPMRS1hce7RXHxg4_hUknOTB6qoefnV5ixBvIqfg1sY8LDSS-q_jbcRlzViuL9ovneykPgN2SFUJjgcFp2RifNBaEveMciTX0l',
    desc: 'Curated low-rise boutique residences showcasing warm sand tones, organic plaster textures, private beach access, and panoramic pool vistas overlooking the turquoise Arabian Gulf in the iconic Dubai Islands.',
    handover: 'Q2 2027',
    paymentPlan: '60/40'
  },
  {
    id: 'op3',
    title: 'The Apex Towers, DIFC',
    subtitle: 'The Heart of Financial Hub',
    priceText: 'AED 3.5M',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByit-4Tt4Erwo79yXhid8IBZ-xcZRqcROCDZ7wwtKvfO5a0sy_Jcd2zRk-LQLLaNTcuf_caUCyOhXEfYuOw-lzarmW6UQnEDGEdGj6JNdewo0oSWnyGmESxHtm0Cw_8Rn1JI9eWPSC5YE2jydePTta0zjp5rSaDTJriZN5Kegg3chHdMD-cu7dZh6cc_HbsVmQHobq-MgVV93xPYutTByq84sJXDTxeit4hOv62uAM73kTsGlMvhmhGg1lD7FCwZ42Iv5bbhr1JKQR',
    desc: 'The landmark of structural innovation. Seamless design combining glass core elements and steel frame beams. Located in the highly dynamic DIFC avenue with elite corporate access and high-floor duplexes.',
    handover: 'Q1 2028',
    paymentPlan: '50/50'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog1',
    category: 'Market Report',
    title: 'Q3 2024: The Rise of Secondary Market Demand',
    excerpt: 'An in-depth analysis of why institutional and retail investors are shifting their focus toward established, hand-over communities this quarter for stable rentals.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7qeIcvZVt8Xgow5zWz894y_w4f7BuiLBqIY7kkjIUrm--HmNEGOOurL88GqHPVBX3LCO9nEjXSgx7DaAvyA86LX0ynS4vWh4q0UiZmorp6IcmahVb3wtSZgl27we6h7ncPvzknSlOvUhOMdERzWW-PGrKaVB_PUIS3tGGDx5C3DJT82yf1jpCUHzekQlk51w_WSDpu4OzT0RIM0B-RN7WBE3nN1RizmkIiddbVBgJ992CLlyX5V9tF73K-t1P8EiKRwvXgOgi6-wx',
    date: '2024-09-15'
  },
  {
    id: 'blog2',
    category: 'Investment Guide',
    title: "The Ultimate Guide to Palm Jumeirah ROI",
    excerpt: "Discover which fronds and premium waterfront villas or duplexes yield the highest annual financial returns on Dubai's most famous man-made island.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbw10q5M-tL7NVNOC5ei2S3S-9kcD0Gei6c40SYauX_iccJR6RkFgvwoMyTpyyiVO_T-baZGz54xxVBtEnBZ2wc1eroi9mFSb8-bwu4xCeCBK3mg6PtMJ2B1gCGvZ52PCjeV5PcVsXmLo4n-DKSRUb4Yk4rbrKGNnfzXED6HNuaLv-26IayrgzDFxPCMP20s5UdlvenBAZmld6bAaujcGuOjWzG-m0YvPrqVvs8JBRM4CjDMy4WGeFMvlr0xdy0TBEPTOCdkc-dHkw',
    date: '2024-10-02'
  },
  {
    id: 'blog3',
    category: 'Area Spotlight',
    title: 'Why City Walk is the New Heart of Urban Living',
    excerpt: 'From high-end European lifestyle walks to signature glass low-rises, explore why Meraas-designed City Walk has captured premium residential preference.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2u8eKgbPtsdzgYL5oVrXEeCbsDpAqDtpXgJBixn7NkGOHsZvLy1pDu5NZ1SAV-2BuoET9dRZKbReGGb9PkrTCn4rSCD_WwRLAoC-IV2jVyAyVlGeyDX9wymF3baL72OE60xWF92Yv_TNwWASfH_6It4zD7k0HSYto98AqaX4kCBWB0O5nXQTlBYpEDuJgFQz1B46zt5pheEofdUFRCMwEGGk3I-U4xI2eRhOpdgD_6nIaDuRXOR6o1DT5Bnvbx8rFnTkzu7IzL98I',
    date: '2024-10-18'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    rating: 5,
    quote: "The level of professionalism at AMX.ae is unmatched. They didn't just sell us a house; they introduced us to our new life in Dubai. Their architectural insight into the properties we viewed was truly impressive.",
    author: "Sir Richard Kensington",
    role: "Founder, Kensington Ventures"
  },
  {
    id: 't2',
    rating: 5,
    quote: "Securing an exclusive off-plan duplex in Business Bay was incredibly easy with their advisors. Julian Vane had early floorplans that werent even public yet. Highly recommended for elite investors.",
    author: "Amara Al-Thani",
    role: "Private Investor, Doha"
  },
  {
    id: 't3',
    rating: 5,
    quote: "Their team managed my residential apartment collection on the Palm seamlessly. Higher yields, zero stress, and precise biannual tax reporting. AMX is truly the gold standard.",
    author: "Dr. Maximilian Schreiber",
    role: "Head of Schreiber MedGroup"
  }
];
