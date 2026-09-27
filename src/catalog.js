// Original local botanical illustrations keep the catalog available without external image services.
export const plantGroups = [
  {
    category: "Indoor Favorites",
    plants: [
      {
        id: "snake-plant",
        name: "Snake Plant",
        image: `${import.meta.env.BASE_URL}images/snake-plant.svg`,
        description: "Upright, sculptural leaves for a green corner.",
        priceCents: 1500,
      },
      {
        id: "spider-plant",
        name: "Spider Plant",
        image: `${import.meta.env.BASE_URL}images/spider-plant.svg`,
        description: "Arching leaves and playful little plantlets.",
        priceCents: 1200,
      },
      {
        id: "peace-lily",
        name: "Peace Lily",
        image: `${import.meta.env.BASE_URL}images/peace-lily.svg`,
        description: "Glossy green leaves with elegant white blooms.",
        priceCents: 1800,
      },
      {
        id: "boston-fern",
        name: "Boston Fern",
        image: `${import.meta.env.BASE_URL}images/boston-fern.svg`,
        description: "Soft fronds for a lush, leafy display.",
        priceCents: 2000,
      },
      {
        id: "rubber-plant",
        name: "Rubber Plant",
        image: `${import.meta.env.BASE_URL}images/rubber-plant.svg`,
        description: "Bold, glossy foliage with a sculptural shape.",
        priceCents: 1700,
      },
      {
        id: "aloe-vera",
        name: "Aloe Vera",
        image: `${import.meta.env.BASE_URL}images/aloe-vera.svg`,
        description: "Distinctive, fleshy leaves in a compact rosette.",
        priceCents: 1400,
      },
    ],
  },
  {
    category: "Aromatic Plants",
    plants: [
      {
        id: "lavender",
        name: "Lavender",
        image: `${import.meta.env.BASE_URL}images/lavender.svg`,
        description: "Purple flower spikes with a familiar fragrance.",
        priceCents: 2000,
      },
      {
        id: "jasmine",
        name: "Jasmine",
        image: `${import.meta.env.BASE_URL}images/jasmine.svg`,
        description: "Delicate flowers with a sweet, floral scent.",
        priceCents: 1800,
      },
      {
        id: "rosemary",
        name: "Rosemary",
        image: `${import.meta.env.BASE_URL}images/rosemary.svg`,
        description: "Needle-like leaves with a fresh herbal aroma.",
        priceCents: 1500,
      },
      {
        id: "mint",
        name: "Mint",
        image: `${import.meta.env.BASE_URL}images/mint.svg`,
        description: "Bright green leaves with a refreshing scent.",
        priceCents: 1200,
      },
      {
        id: "lemon-balm",
        name: "Lemon Balm",
        image: `${import.meta.env.BASE_URL}images/lemon-balm.svg`,
        description: "Textured leaves with a gentle citrus fragrance.",
        priceCents: 1400,
      },
      {
        id: "hyacinth",
        name: "Hyacinth",
        image: `${import.meta.env.BASE_URL}images/hyacinth.svg`,
        description: "Clusters of colorful, fragrant spring blooms.",
        priceCents: 2200,
      },
    ],
  },
  {
    category: "Easygoing Greens",
    plants: [
      {
        id: "zz-plant",
        name: "ZZ Plant",
        image: `${import.meta.env.BASE_URL}images/zz-plant.svg`,
        description: "Waxy, deep green leaves on graceful stems.",
        priceCents: 2500,
      },
      {
        id: "pothos",
        name: "Pothos",
        image: `${import.meta.env.BASE_URL}images/pothos.svg`,
        description: "Trailing vines for shelves and hanging planters.",
        priceCents: 1000,
      },
      {
        id: "cast-iron-plant",
        name: "Cast Iron Plant",
        image: `${import.meta.env.BASE_URL}images/cast-iron-plant.svg`,
        description: "Broad, deep green leaves with a classic look.",
        priceCents: 2000,
      },
      {
        id: "succulents",
        name: "Succulents",
        image: `${import.meta.env.BASE_URL}images/succulents.svg`,
        description: "A varied collection of compact, sculptural plants.",
        priceCents: 1800,
      },
      {
        id: "aglaonema",
        name: "Aglaonema",
        image: `${import.meta.env.BASE_URL}images/aglaonema.svg`,
        description: "Patterned foliage that brings color indoors.",
        priceCents: 2200,
      },
      {
        id: "basil",
        name: "Basil",
        image: `${import.meta.env.BASE_URL}images/basil.svg`,
        description: "A fragrant leafy herb for a bright windowsill.",
        priceCents: 900,
      },
    ],
  },
];

export const plantsById = new Map(
  plantGroups
    .flatMap((group) => group.plants)
    .map((plant) => [plant.id, plant]),
);
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const formatMoney = (cents) => moneyFormatter.format(cents / 100);
