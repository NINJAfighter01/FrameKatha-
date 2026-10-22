/**
 * FrameKatha — Central Studio Configuration File
 *
 * Update studio contact details, pricing, social links, creative process,
 * and portfolio categories from this single file.
 */

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  unit?: string;
  pricingNote?: string;
  shortDesc: string;
  sampleImage: string;
  category: string;
  ctaText: string;
  features: string[];
}

export interface CreativeStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    subheadline: string;
    creator: string;
    creatorRole: string;
    establishedYear: number;
  };
  contact: {
    email: string;
    phone: string;
    whatsappNumber: string;
    whatsappPrefill: string;
    instagramUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    youtubeUrl: string;
  };
  services: ServiceItem[];
  creativeProcess: CreativeStep[];
  galleryCategories: string[];
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "FrameKatha",
    tagline: "Every Frame Tells a Story.",
    subheadline:
      "A creative visual storytelling studio specializing in cinematic photography, digital concept art, professional photo editing, poster design, high-CTR thumbnails, and 4K video editing.",
    creator: "Paras Aware",
    creatorRole: "Visual Storyteller & Creative Director",
    establishedYear: 2026,
  },

  contact: {
    email: "parasaware05@gmail.com",
    phone: "+91 8828447337",
    whatsappNumber: "918828447337", // International format (country code + number)
    whatsappPrefill:
      "Hello Paras! I saw your FrameKatha portfolio and would love to discuss a creative project with you.",
    instagramUrl: "https://instagram.com/framekatha",
    githubUrl: "https://github.com/parasaware30/Framekatha",
    linkedinUrl: "https://linkedin.com",
    youtubeUrl: "https://youtube.com",
  },

  // Exact 6 services and starting prices specified in Section 6.F
  services: [
    {
      id: "photography",
      name: "Photography",
      price: "₹700",
      unit: "starting price",
      pricingNote:
        "Starting price for portraits, outdoor, street, and creative frames. Final scope and package discussed directly based on location, duration, and frame count.",
      shortDesc:
        "High-resolution portrait, architectural, street, and cinematic photography capturing emotion, raw atmosphere, and natural depth of field.",
      sampleImage:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
      category: "Photography",
      ctaText: "Discuss Your Project",
      features: [
        "Portrait, street, and landscape sessions",
        "RAW file capture with professional glass",
        "Natural lighting and high dynamic range",
        "High-resolution print and digital deliverables",
      ],
    },
    {
      id: "digital-art",
      name: "Digital Art",
      price: "₹600",
      unit: "starting price",
      pricingNote:
        "Starting rate per artwork. Final price depends on composition detail, custom illustration requirements, and commercial usage.",
      shortDesc:
        "Original digital illustrations, surreal concept compositions, creative photo manipulations, and atmospheric dimensional artwork.",
      sampleImage:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
      category: "Digital Art",
      ctaText: "Let's Create",
      features: [
        "Original digital concept illustrations",
        "Surreal fantasy and sci-fi compositions",
        "Detailed lighting and texture painting",
        "Commercial web and print licensing options",
      ],
    },
    {
      id: "photo-editing",
      name: "Photo Editing",
      price: "₹150",
      unit: "per photo",
      pricingNote:
        "Listed starting rate of ₹150 per photo for professional retouching. Bulk batches, complex composite manipulation, and RAW grading scope discussed directly.",
      shortDesc:
        "Professional before/after photo retouching, DaVinci & Lightroom color grading, skin tone refinement, object removal, and custom LUT application.",
      sampleImage:
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80",
      category: "Photo Editing",
      ctaText: "Ask About This Service",
      features: [
        "High-contrast color grading & custom LUTs",
        "Skin texture preservation & beauty retouch",
        "Background clean-up and color harmony",
        "Delivery in full RAW/TIFF and WebP formats",
      ],
    },
    {
      id: "poster-design",
      name: "Poster Design",
      price: "₹400",
      unit: "starting price",
      pricingNote:
        "Starting price per custom poster concept. Final pricing depends on typography complexity, custom visual assets, and print dimensions.",
      shortDesc:
        "Minimalist, cinematic movie concept, typography, and promotional event posters crafted with bold geometry, negative space, and visual impact.",
      sampleImage:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
      category: "Poster Design",
      ctaText: "Discuss Your Project",
      features: [
        "Cinematic movie & festival poster layouts",
        "Minimalist aesthetic and bespoke typography",
        "Dual-tone and gradient color balance",
        "Print-ready CMYK and digital RGB versions",
      ],
    },
    {
      id: "thumbnail-design",
      name: "Thumbnail Design",
      price: "₹50",
      unit: "starting price",
      pricingNote:
        "Starting price of ₹50 per custom thumbnail. Tailored for YouTube, Instagram Reels, and social media creators seeking high click-through rates.",
      shortDesc:
        "High-CTR YouTube and social media thumbnail designs engineered for instant viewer curiosity, sharp subject isolation, and vibrant contrast.",
      sampleImage:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      category: "Thumbnail Design",
      ctaText: "Ask About Thumbnails",
      features: [
        "High-CTR psychological design patterns",
        "Sharp foreground subject cutouts & glow",
        "Bold readable mobile typography",
        "Rapid turnaround for content creators",
      ],
    },
    {
      id: "video-editing",
      name: "Video Editing",
      price: "₹150",
      unit: "per 5 minutes of video duration",
      pricingNote:
        "Please note: ₹150 per 5 minutes refers to the pricing basis, not necessarily the final project price for every editing requirement. Final scope, motion graphics, audio mastering, and complexity can be discussed directly.",
      shortDesc:
        "Cinematic 4K edits, YouTube long-form cuts, reels, dynamic pacing, custom sound design, color grading, and smooth visual storytelling.",
      sampleImage:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
      category: "Video Editing",
      ctaText: "Let's Edit Your Video",
      features: [
        "Dynamic pacing, rhythmic cutting, and flow",
        "4K DaVinci Resolve color grading",
        "Sound design, Foley, and licensed music sync",
        "Exported in 16:9 4K and 9:16 vertical reels",
      ],
    },
  ],

  // 5-step creative workflow specified in Section 6.H
  creativeProcess: [
    {
      step: 1,
      title: "Discuss the Idea",
      subtitle: "Vision & Concept Consultation",
      description:
        "We begin with an open discussion about your goals, aesthetic vision, reference styles, moodboards, and specific creative deliverables.",
      iconName: "MessageSquare",
    },
    {
      step: 2,
      title: "Understand the Creative Direction",
      subtitle: "Planning & Art Direction",
      description:
        "Defining color palettes, lighting mood, framing guidelines, typography rules, or visual pacing before beginning production.",
      iconName: "Compass",
    },
    {
      step: 3,
      title: "Produce or Edit the Visual Work",
      subtitle: "Crafting & Post-Production",
      description:
        "Executing the shoot, digital painting, meticulous retouching, color grading, or 4K timeline cutting with artistic dedication.",
      iconName: "Sparkles",
    },
    {
      step: 4,
      title: "Review the Result Together",
      subtitle: "Collaborative Feedback & Polish",
      description:
        "Reviewing the rendered results together through interactive previews to fine-tune tones, color grading, or composition details.",
      iconName: "Eye",
    },
    {
      step: 5,
      title: "Deliver the Agreed Final Work",
      subtitle: "Master Deliverables & Export",
      description:
        "Delivering your polished final master assets in full high resolution across all needed digital and print formats.",
      iconName: "CheckCircle2",
    },
  ],

  galleryCategories: [
    "All",
    "Photography",
    "Digital Art",
    "Photo Editing",
    "Poster Design",
    "Thumbnail Design",
    "Video Editing",
  ],
};

/**
 * Helper to build direct WhatsApp link with prefilled message
 */
export function getWhatsAppLink(customMessage?: string): string {
  const number = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(customMessage || siteConfig.contact.whatsappPrefill);
  return `https://wa.me/${number}?text=${message}`;
}

/**
 * Helper to build direct mailto link
 */
export function getMailtoLink(subject?: string, body?: string): string {
  const email = siteConfig.contact.email;
  const s = encodeURIComponent(subject || "Creative Project Inquiry — FrameKatha");
  const b = encodeURIComponent(body || "Hello Paras,\n\nI would love to discuss a creative project with FrameKatha.\n\nProject details:\n");
  return `mailto:${email}?subject=${s}&body=${b}`;
}
