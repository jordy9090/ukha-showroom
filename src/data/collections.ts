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
  year: string;
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
    title: "LIMINAL",
    year: "2025",
    handwrittenTitleImage: ukhaImage("liminal-title.png"),
    coverImage: ukhaImage("liminal-cover-transparent.png"),
    description:
      "LIMINAL explores time, space, and humanity within a world composed of points, lines, and planes. It begins with the thought that we are deeply three-dimensional, human beings constrained by space, yet able to sense something mental and metaphysical in another dimension: time. The jewelry takes form as irregular traces of this inner process, emerging through the drawing of geometric graphs.",
    pieces: [
      // Liminal artwork is displayed in collection order.
      {
        id: "liminal-piece-01",
        collectionSlug: "liminal",
        title: "LIMINAL: 01",
        subtitle: "",
        description: "",
        material: "Brass",
        price: "Price on inquiry",
        images: [ukhaImage("liminal-piece-01-cover.jpg")].filter(Boolean),
      },
      {
        id: "liminal-piece-02",
        collectionSlug: "liminal",
        title: "LIMINAL: 02",
        subtitle: "",
        description: "",
        material: "Brass",
        price: "Price on inquiry",
        images: [
          ukhaImage("liminal-piece-02-cover.jpg"),
          ukhaImage("liminal-piece-02-detail-01.jpg"),
          ukhaImage("liminal-piece-02-detail-02.jpg"),
        ].filter(Boolean),
      },
      {
        id: "liminal-piece-03",
        collectionSlug: "liminal",
        title: "LIMINAL: 03",
        subtitle: "",
        description: "",
        material: "Brass",
        price: "Price on inquiry",
        images: [
          ukhaImage("liminal-piece-03-cover.jpg"),
          ukhaImage("liminal-piece-03-detail-01.jpg"),
          ukhaImage("liminal-piece-03-detail-02.jpg"),
        ].filter(Boolean),
      },
      {
        id: "liminal-piece-04",
        collectionSlug: "liminal",
        title: "LIMINAL: 04",
        subtitle: "",
        description: "",
        material: "Brass",
        price: "Price on inquiry",
        images: [
          ukhaImage("liminal-piece-04-cover.jpg"),
          ukhaImage("liminal-piece-04-detail-01.jpg"),
          ukhaImage("liminal-piece-04-detail-02.jpg"),
        ].filter(Boolean),
      },
      {
        id: "liminal-piece-05",
        collectionSlug: "liminal",
        title: "LIMINAL: 05",
        subtitle: "",
        description: "",
        material: "Brass",
        price: "Price on inquiry",
        images: [
          ukhaImage("liminal-piece-05-cover.jpg"),
          ukhaImage("liminal-piece-05-detail-01.jpg"),
        ].filter(Boolean),
      },
      {
        id: "liminal-piece-06",
        collectionSlug: "liminal",
        title: "LIMINAL: 06",
        subtitle: "",
        description: "",
        material: "Brass",
        price: "Sold out",
        images: [
          ukhaImage("liminal-piece-06-cover.jpg"),
          ukhaImage("liminal-piece-06-detail-01.jpg"),
          ukhaImage("liminal-piece-06-detail-02.jpg"),
        ].filter(Boolean),
      },
      {
        id: "liminal-piece-07",
        collectionSlug: "liminal",
        title: "LIMINAL: 07",
        subtitle: "",
        description: "",
        material: "Brass",
        price: "Sold out",
        images: [
          ukhaImage("liminal-piece-07-cover.jpg"),
          ukhaImage("liminal-piece-07-detail-01.jpg"),
          ukhaImage("liminal-piece-07-detail-02.jpg"),
        ].filter(Boolean),
      },
    ],
  },
  {
    slug: "collection-02",
    title: "PANOPTICON",
    year: "2026",
    handwrittenTitleImage: ukhaImage("panopticon-title.png"),
    coverImage: ukhaImage("collection-02-cover.png"),
    description: "PANOPTICON reimagines the prison as a stage for everyday role-playing. Conscious of the gaze of others, we perform identities shaped by relationships and external conditions. Within this space of invisible surveillance, the collection imagines the characters who might inhabit each cell.",
    pieces: [
      {
        id: "collection-02-piece-07",
        collectionSlug: "collection-02",
        title: "PANOPTICON: 01",
        subtitle: "",
        description: "Where does the boundary end?",
        material: "Brass",
        price: "",
        images: [
          ukhaImage("collection-02-piece-07-cover.jpg"),
          ukhaImage("collection-02-piece-07-detail.jpg"),
        ].filter(Boolean),
      },
      {
        id: "collection-02-piece-06",
        collectionSlug: "collection-02",
        title: "PANOPTICON: 02",
        subtitle: "",
        description: "Who defines freedom?",
        material: "Brass",
        price: "",
        images: [
          ukhaImage("collection-02-piece-06-cover.jpg"),
          ukhaImage("collection-02-piece-06-detail-01.jpg"),
          ukhaImage("collection-02-piece-06-detail-02.jpg"),
          ukhaImage("collection-02-piece-06-detail-03.jpg"),
        ].filter(Boolean),
      },
      {
        id: "collection-02-piece-05",
        collectionSlug: "collection-02",
        title: "PANOPTICON: 03",
        subtitle: "",
        description: "What remains after destruction?",
        material: "Brass",
        price: "",
        images: [
          ukhaImage("collection-02-piece-05-detail-01.jpg"),
          ukhaImage("collection-02-piece-05-detail-02.jpg"),
          ukhaImage("collection-02-piece-05-detail-04.jpg"),
          ukhaImage("collection-02-piece-05-detail-05.jpg"),
        ].filter(Boolean),
      },
      {
        id: "collection-02-piece-01",
        collectionSlug: "collection-02",
        title: "PANOPTICON: 04",
        subtitle: "",
        description: "Is fragility a weakness?",
        material: "Brass",
        price: "",
        images: [
          ukhaImage("collection-02-piece-01-cover.jpg"),
          ukhaImage("collection-02-piece-01-detail.jpg"),
          ukhaImage("collection-02-piece-01-detail-02.jpg"),
        ].filter(Boolean),
      },
      {
        id: "collection-02-piece-02",
        collectionSlug: "collection-02",
        title: "PANOPTICON: 05",
        subtitle: "",
        description: "Is isolation ever complete?",
        material: "Brass",
        price: "",
        images: [
          ukhaImage("collection-02-piece-02-cover.jpg"),
          ukhaImage("collection-02-piece-02-detail-01.jpg"),
          ukhaImage("collection-02-piece-02-detail-02.jpg"),
          ukhaImage("collection-02-piece-02-detail-03.jpg"),
        ].filter(Boolean),
      },
      {
        id: "collection-02-piece-03",
        collectionSlug: "collection-02",
        title: "PANOPTICON: 06",
        subtitle: "",
        description: "Who watches the watcher?",
        material: "Brass",
        price: "",
        images: [
          ukhaImage("collection-02-piece-03-cover.jpg"),
          ukhaImage("collection-02-piece-03-detail.jpg"),
        ].filter(Boolean),
      },
      {
        id: "collection-02-piece-04",
        collectionSlug: "collection-02",
        title: "PANOPTICON: 07",
        subtitle: "",
        description: "Can resistance be contained?",
        material: "Brass",
        price: "",
        images: [
          ukhaImage("collection-02-piece-04-cover.jpg"),
          ukhaImage("collection-02-piece-04-detail-01.jpg"),
          ukhaImage("collection-02-piece-04-detail-02.jpg"),
          ukhaImage("collection-02-piece-04-detail-03.jpg"),
        ].filter(Boolean),
      },
      {
        id: "collection-02-piece-08",
        collectionSlug: "collection-02",
        title: "PANOPTICON: 08",
        subtitle: "",
        description: "When does repetition become instinct?",
        material: "Brass",
        price: "",
        images: [
          ukhaImage("collection-02-piece-08-cover.jpg"),
          ukhaImage("collection-02-piece-08-detail.jpg"),
        ].filter(Boolean),
      },
    ],
  },
];

// Add archive/process images here as the archive grows.
export const archiveNotes: ArchiveNote[] = [
  {
    id: "archive-note-0072",
    title: "archive note 0072",
    category: "record",
    src: ukhaImage("archive-note-0072.jpg"),
    aspect: "portrait",
  },
  {
    id: "archive-note-0075",
    title: "archive note 0075",
    category: "process",
    src: ukhaImage("archive-note-0075.jpg"),
    aspect: "portrait",
  },
  {
    id: "archive-note-0195",
    title: "archive note 0195",
    category: "record",
    src: ukhaImage("archive-note-0195.jpg"),
    aspect: "landscape",
  },
  {
    id: "archive-note-6179",
    title: "archive note 6179",
    category: "process",
    src: ukhaImage("archive-note-6179.jpg"),
    aspect: "portrait",
  },
  {
    id: "archive-note-9648",
    title: "archive note 9648",
    category: "record",
    src: ukhaImage("archive-note-9648.jpg"),
    aspect: "landscape",
  },
  {
    id: "archive-note-pc280006",
    title: "archive note pc280006",
    category: "record",
    src: ukhaImage("archive-note-pc280006.jpg"),
    aspect: "landscape",
  },
  {
    id: "archive-note-9776",
    title: "archive note 9776",
    category: "record",
    src: ukhaImage("archive-note-9776.jpg"),
    aspect: "landscape",
  },
  {
    id: "archive-note-9778",
    title: "archive note 9778",
    category: "record",
    src: ukhaImage("archive-note-9778.jpg"),
    aspect: "landscape",
  },
  {
    id: "archive-note-kakao-20260507",
    title: "archive note kakao 20260507",
    category: "process",
    src: ukhaImage("archive-note-kakao-20260507.jpg"),
    aspect: "landscape",
  },
];

// Edit these lines to update the small visit-page description.
export const visitCopy = [
  "컬렉션에서 구매 가능한 피스, 컬렉션 외 피스들은 Wearable Line으로 분류되어 있습니다.\n한국에서만 결제 가능하며, 해외배송은 인스타그램 DM이나 이메일로 연락하시기 바랍니다.",
  "Pieces available for purchase from the collections, as well as pieces outside the collections, are listed under Wearable Line.\nPayment is available in Korea only. For international shipping, please contact us via Instagram DM or email.",
];

// Shown under the studio photo on the Visit page.
export const studioVisitCopy = [
  "오프라인 스튜디오 방문은 DM 문의 부탁드립니다.",
  "For offline studio visits, please contact us via Instagram DM.",
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
