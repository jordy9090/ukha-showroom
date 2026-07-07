import { existsSync } from "node:fs";
import path from "node:path";

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
  coverImage?: string;
  description: string;
  pieces: Piece[];
};

// To add or replace showroom/product photos for now, place the file in
// public/images/ukha and update the filenames in this data file.
// A future admin upload flow can sit on top of this without changing the pages.
const ukhaImage = (filename: string) => {
  const assetPath = path.join(process.cwd(), "public", "images", "ukha", filename);

  return existsSync(assetPath) ? `/images/ukha/${filename}` : "";
};

export const collections: Collection[] = [
  {
    slug: "liminal",
    title: "liminal",
    handwrittenTitleImage: "",
    coverImage: ukhaImage("liminal-cover.png"),
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
        images: [ukhaImage("liminal-ring-01.png")].filter(Boolean),
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
        images: [ukhaImage("liminal-ring-02.png")].filter(Boolean),
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
        images: [ukhaImage("liminal-ring-03.png")].filter(Boolean),
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
