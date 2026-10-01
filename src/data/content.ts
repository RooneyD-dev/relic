/**
 * All copy, artwork, and artist material below is invented for the RELIC
 * portfolio concept. Nothing here is a real listing, artist, or transaction.
 */

/* One URL per image so the card and the dialog share a single cached file. */
const img = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=76`;

export type ProvenanceEntry = {
  date: string;
  label: string;
  note: string;
};

export type Work = {
  id: string;
  index: string;
  title: string;
  artist: string;
  artistId: string;
  year: string;
  medium: string;
  collection: string;
  edition: string;
  image: string;
  imageAlt: string;
  story: string;
  provenance: ProvenanceEntry[];
};

export type Artist = {
  id: string;
  name: string;
  practice: string;
  based: string;
  bio: string;
  image: string;
  imageAlt: string;
  workId: string;
  featuredTitle: string;
};

export const WORKS: Work[] = [
  {
    id: "slow-horizon",
    index: "01",
    title: "Slow Horizon",
    artist: "Amara Voss",
    artistId: "amara-voss",
    year: "2026",
    medium: "Generative composition, still frame",
    collection: "Light Studies",
    edition: "Edition of 24",
    image: img("photo-1507908708918-778587c9e563"),
    imageAlt:
      "A soft band of teal light bending across a dark field, like a horizon at dusk.",
    story:
      "Voss writes small systems that move light across a frame, then waits for the one moment the rules almost fall apart. Slow Horizon is the still she kept from a run of four hundred: a single band of light that appears to be leaving. The work is generated, but the decision to stop here was entirely hers.",
    provenance: [
      {
        date: "Mar 2026",
        label: "Created",
        note: "Finished by Amara Voss and prepared for the RELIC preview catalogue.",
      },
      {
        date: "Apr 2026",
        label: "First release",
        note: "Listed as an edition of 24 in this fictional concept example.",
      },
      {
        date: "Jun 2026",
        label: "Example transfer",
        note: "Shown moving from the artist's record to an example collector record.",
      },
    ],
  },
  {
    id: "held-air",
    index: "02",
    title: "Held Air",
    artist: "Jun Park",
    artistId: "jun-park",
    year: "2026",
    medium: "Moving image, rendered still",
    collection: "Weight Studies",
    edition: "Open edition",
    image: img("photo-1502691876148-a84978e59af8"),
    imageAlt:
      "A corridor of layered coloured panels receding into the distance.",
    story:
      "Park builds loops that behave like objects. Held Air was rendered until the panels felt heavy enough to touch, then frozen at the frame where the corridor is widest. As an open edition, the piece stays available for as long as the artist keeps it in the catalogue.",
    provenance: [
      {
        date: "Feb 2026",
        label: "Created",
        note: "Rendered and archived by Jun Park as part of the Weight Studies series.",
      },
      {
        date: "May 2026",
        label: "Open edition opened",
        note: "Released without a fixed quantity, as described in this concept example.",
      },
      {
        date: "Jul 2026",
        label: "Catalogue entry updated",
        note: "Artist notes and process stills added to the work's record.",
      },
    ],
  },
  {
    id: "room-for-memory",
    index: "03",
    title: "Room for Memory",
    artist: "Elias Neri",
    artistId: "elias-neri",
    year: "2025",
    medium: "Archival photograph, re-scanned",
    collection: "Borrowed Archive",
    edition: "Edition of 12",
    image: img("photo-1533158307587-828f0a76ef46"),
    imageAlt:
      "A scattered pile of old photographic prints overlapping on a dark surface.",
    story:
      "Neri rescans photographs that were never meant to outlive the people in them, then works the surface until the damage becomes part of the picture. Room for Memory keeps the scratches. The edition is small because the artist scans each print once and then closes the file.",
    provenance: [
      {
        date: "Nov 2025",
        label: "Created",
        note: "Re-scanned and edited by Elias Neri from a borrowed family album.",
      },
      {
        date: "Dec 2025",
        label: "First release",
        note: "Offered as an edition of 12 in this fictional concept example.",
      },
      {
        date: "Aug 2026",
        label: "Example transfer",
        note: "Recorded moving to a second example collector for demonstration.",
      },
    ],
  },
];

export const ARTISTS: Artist[] = [
  {
    id: "amara-voss",
    name: "Amara Voss",
    practice: "Generative composition and light",
    based: "Rotterdam",
    bio: "Voss builds images from rules. Light behaves, then misbehaves, and she keeps the frame where the two meet. Every final still is chosen by hand from hundreds of runs, which is why the series moves so slowly.",
    image: img("photo-1534528741775-53994a69daeb", 1000),
    imageAlt: "Portrait of a woman lit by cool blue light against a plain wall.",
    workId: "slow-horizon",
    featuredTitle: "Slow Horizon",
  },
  {
    id: "jun-park",
    name: "Jun Park",
    practice: "Moving image and digital sculpture",
    based: "Seoul",
    bio: "Park works with motion as a material, rendering loops until they feel heavy enough to belong in a room. He is interested in the moment a moving image stops and becomes an object you can keep.",
    image: img("photo-1558618666-fcd25c85cd64", 1000),
    imageAlt:
      "A filmmaker adjusting a camera rig under studio lighting on location.",
    workId: "held-air",
    featuredTitle: "Held Air",
  },
  {
    id: "elias-neri",
    name: "Elias Neri",
    practice: "Archival photography and memory",
    based: "Lisbon",
    bio: "Neri treats an archive as something you borrow. He re-scans photographs that were never meant to last, works the surface until the damage reads as texture, and writes down where each print came from before it leaves his desk.",
    image: img("photo-1472099645785-5658abf4ff4e", 1000),
    imageAlt:
      "Portrait of an older man with glasses and a grey beard against a plain backdrop.",
    workId: "room-for-memory",
    featuredTitle: "Room for Memory",
  },
];

export const NAV_LINKS = [
  { label: "Discover", href: "#discover" },
  { label: "Artists", href: "#artists" },
  { label: "How it works", href: "#how" },
];

export const STEPS = [
  {
    number: "01",
    title: "Discover",
    body: "Explore curated work and learn about the artist behind it.",
  },
  {
    number: "02",
    title: "Collect",
    body: "Choose an edition and review the terms before continuing.",
  },
  {
    number: "03",
    title: "Keep the record",
    body: "View the piece's edition details and transfer history in one place.",
  },
];

export const RECORD_ITEMS = [
  "Creator attribution.",
  "Edition information.",
  "Collection and transfer history.",
  "Linked artwork details.",
];

export const PRINCIPLES = [
  {
    title: "Artist context",
    body: "Keep creator attribution and the story of the work visible.",
  },
  {
    title: "Clear editions",
    body: "Make edition details easy to understand before collecting.",
  },
  {
    title: "Transparent history",
    body: "Present available provenance information without overstating what it proves.",
  },
];

export const VIDEOS = {
  hero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4",
  manifesto:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4",
  collection:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4",
  provenance:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4",
  footer:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4",
} as const;

export const BACKDROPS = {
  hero: img("photo-1517999144091-3d9dca6d1e43", 1600),
  manifesto: img("photo-1516617442634-75371039cb3a", 1600),
  collection: img("photo-1524169358666-79f22534bc6e", 1600),
  provenance: img("photo-1547826039-bfc35e0f1ea8", 1600),
  footer: img("photo-1541701494587-cb58502866ab", 1600),
} as const;
