export type Piece = {
  id: string;
  collectionSlug: string;
  title: string;
  subtitle: string;
  description: string;
  material: string;
  price: string;
  images: string[];
};

export type ShowroomImage = {
  id: string;
  title: string;
  src?: string;
  aspect: "portrait" | "landscape";
};

export type ArchiveNote = ShowroomImage & {
  category: "sketch" | "process" | "record";
};

export type Collection = {
  slug: string;
  title: string;
  handwrittenTitleImage?: string;
  description: string;
  pieces: Piece[];
};

// Replace these placeholder image paths with real files in /public/images/ukha.
// Logo: /public/images/ukha/logo.svg or .png
// Handwritten collection title: /public/images/ukha/collections/liminal-title.png
// Product photos: /public/images/ukha/pieces/{piece-id}-{number}.jpg
export const collections: Collection[] = [
  {
    slug: "liminal",
    title: "liminal",
    handwrittenTitleImage: "",
    description:
      "Rings and small objects held between threshold, memory, and quiet daily ritual.",
    pieces: [
      {
        id: "liminal-ring-01",
        collectionSlug: "liminal",
        title: "Liminal Ring 01",
        subtitle: "soft ridge ring",
        description:
          "A low, softened ridge traces the finger like a line found after the surface has settled.",
        material: "Sterling silver, hand finished",
        price: "Price on inquiry",
        images: [],
      },
      {
        id: "liminal-ring-02",
        collectionSlug: "liminal",
        title: "Liminal Ring 02",
        subtitle: "thin contour ring",
        description:
          "An intentionally restrained contour, shaped to feel present without becoming loud.",
        material: "Sterling silver, matte polish",
        price: "Price on inquiry",
        images: [],
      },
      {
        id: "liminal-ring-03",
        collectionSlug: "liminal",
        title: "Liminal Ring 03",
        subtitle: "small hollow ring",
        description:
          "A hollowed form that keeps shadow close to the hand, made for slow inspection.",
        material: "Sterling silver, oxidized detail",
        price: "Price on inquiry",
        images: [],
      },
    ],
  },
];

// Add archive/process images here as the archive grows.
export const archiveNotes: ArchiveNote[] = [
  {
    id: "ring-volume-study",
    title: "ring volume study",
    category: "sketch",
    src: "",
    aspect: "portrait",
  },
  {
    id: "softened-edge-wax",
    title: "softened edge wax model",
    category: "process",
    src: "",
    aspect: "landscape",
  },
  {
    id: "studio-material-record",
    title: "studio material record",
    category: "record",
    src: "",
    aspect: "portrait",
  },
  {
    id: "surface-test",
    title: "surface test",
    category: "process",
    src: "",
    aspect: "landscape",
  },
];

// Replace src values with future showroom/studio photos.
export const offlineShopImages: ShowroomImage[] = [
  {
    id: "entrance-view",
    title: "entrance view",
    src: "",
    aspect: "landscape",
  },
  {
    id: "showroom-table",
    title: "showroom table",
    src: "",
    aspect: "landscape",
  },
  {
    id: "object-shelf",
    title: "object shelf",
    src: "",
    aspect: "portrait",
  },
  {
    id: "studio-detail",
    title: "studio detail",
    src: "",
    aspect: "landscape",
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getPiece(id: string) {
  return collections
    .flatMap((collection) => collection.pieces)
    .find((piece) => piece.id === id);
}
