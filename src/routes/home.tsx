import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { ShowcaseVideoSection } from "@/components/ShowcaseVideoSection";
import { fetchProjects, fetchTestimonials, fetchSiteSettings, cleanMediaUrl } from "@/lib/api";
import { siteConfig, getWhatsAppLink } from "@/config/site";
import {
  Camera,
  Film,
  Sparkles,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  Palette,
  Image as ImageIcon,
  Tv,
  CheckCircle2,
  MessageSquare,
  Compass,
  Wand2,
  Folder,
  Star,
  Quote
} from "lucide-react";

export function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [projData, testData, settData] = await Promise.all([
          fetchProjects({ featured: true }),
          fetchTestimonials(),
          fetchSiteSettings()
        ]);
        const publicFeatured = Array.isArray(projData) ? projData.filter((p: any) => p.published !== false) : [];
        setFeaturedProjects(publicFeatured);
        setTestimonials(testData);
        setSiteSettings(settData);
      } catch (e) {
        console.error("Failed to load homepage data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const marqueeItems = [
    { text: "CINEMATIC PHOTOGRAPHY", icon: "📸", category: "Photography" },
    { text: "DIGITAL ART & CONCEPTS", icon: "🎨", category: "Digital Art" },
    { text: "4K VIDEO EDITING", icon: "🎬", category: "Video Editing" },
    { text: "DAVINCI COLOR GRADING", icon: "🪄", category: "Photo Editing" },
    { text: "MINIMALIST POSTERS", icon: "🖼️", category: "Poster Design" },
    { text: "HIGH-CTR THUMBNAILS", icon: "⚡", category: "Thumbnail Design" },
    { text: "BEFORE & AFTER RETOUCHING", icon: "🔮", category: "Photo Editing" },
  ];

  return (
    <SiteLayout>
      {/* ── Section A: Full-Screen Cinematic Hero ── */}
      <section className="relative min-h-[88vh] sm:min-h-[90vh] flex items-center justify-center px-4 py-12 sm:py-0 overflow-hidden">
        {/* Lightweight Non-blocking Three.js Particle Optics */}
        <ThreeCanvas />

        {/* Floating Category Visual Pills (Desktop) */}
        <Link
          to="/portfolio?category=Photography"
          className="hidden md:flex absolute top-16 left-6 sm:left-12 items-center gap-2 px-4 py-2 rounded-2xl glass-strong border border-purple-500/40 text-xs font-semibold text-purple-300 animate-float shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-110 hover:border-purple-400 hover:text-white hover:bg-purple-600/20 transition-all cursor-pointer z-20 group"
          title="Click to view Photography"
        >
          <Camera className="size-3.5 text-purple-400 group-hover:animate-bounce" />
          <span>Cinematic Frames</span>
          <span className="text-[10px] text-purple-400 group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>

        <Link
          to="/portfolio?category=Photo%20Editing"
          className="hidden md:flex absolute top-20 right-6 sm:right-12 items-center gap-2 px-4 py-2 rounded-2xl glass-strong border border-cyan-500/40 text-xs font-semibold text-cyan-300 animate-float-reverse shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-110 hover:border-cyan-400 hover:text-white hover:bg-cyan-600/20 transition-all cursor-pointer z-20 group"
          title="Click to view Color Grading"
        >
          <SlidersHorizontal className="size-3.5 text-cyan-400 group-hover:animate-bounce" />
          <span>DaVinci Color Grade</span>
          <span className="text-[10px] text-cyan-400 group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>

        <Link
          to="/portfolio?category=Video%20Editing"
          className="hidden md:flex absolute bottom-16 left-8 sm:left-16 items-center gap-2 px-4 py-2 rounded-2xl glass-strong border border-pink-500/40 text-xs font-semibold text-pink-300 animate-float-reverse shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-110 hover:border-pink-400 hover:text-white hover:bg-pink-600/20 transition-all cursor-pointer z-20 group"
          title="Click to view Video Editing"
        >
          <Film className="size-3.5 text-pink-400 group-hover:animate-bounce" />
          <span>4K Video Production</span>
          <span className="text-[10px] text-pink-400 group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>

        <Link
          to="/portfolio?category=Digital%20Art"
          className="hidden md:flex absolute bottom-20 right-8 sm:right-16 items-center gap-2 px-4 py-2 rounded-2xl glass-strong border border-emerald-500/40 text-xs font-semibold text-emerald-300 animate-float shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-110 hover:border-emerald-400 hover:text-white hover:bg-emerald-600/20 transition-all cursor-pointer z-20 group"
          title="Click to view Digital Art"
        >
          <Palette className="size-3.5 text-emerald-400 group-hover:animate-bounce" />
          <span>Digital Concept Art</span>
          <span className="text-[10px] text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>

        {/* Main Hero Typography & CTAs */}
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in relative z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full glass-strong border border-purple-500/30 text-[11px] sm:text-xs font-semibold text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.25)] max-w-full">
            <Sparkles className="size-3.5 sm:size-4 text-cyan-400 animate-pulse shrink-0" />
            <span className="truncate">Visual Storytelling &amp; Cinematic Media Studio</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-[1.1] text-white">
            FRAMEKATHA
            <span className="gradient-text text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal block mt-2">
              "{siteConfig.brand.tagline}"
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed px-2 font-normal">
            A premium creative portfolio studio specializing in photography, digital concept art, professional photo editing, graphic posters, high-CTR thumbnails, and cinematic video editing.
          </p>

          {/* Primary & Secondary CTAs as demanded by Prompt 6.A */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/portfolio"
              className="btn-neon text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto shadow-xl flex items-center justify-center gap-2"
            >
              <span>Explore the Gallery</span>
              <ArrowRight className="size-4 sm:size-5" />
            </Link>
            <Link
              to="/contact"
              className="btn-ghost-neon text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto flex items-center justify-center"
            >
              <span>Let's Create Something</span>
            </Link>
          </div>

          {/* Mobile Quick Category Tags */}
          <div className="flex md:hidden flex-wrap items-center justify-center gap-2 pt-3 px-2">
            <Link to="/portfolio?category=Photography" className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-semibold">
              📸 Photography
            </Link>
            <Link to="/portfolio?category=Photo%20Editing" className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold">
              🪄 Color Grading
            </Link>
            <Link to="/portfolio?category=Video%20Editing" className="px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-[11px] font-semibold">
              🎬 4K Edits
            </Link>
            <Link to="/portfolio?category=Digital%20Art" className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
              🎨 Digital Art
            </Link>
          </div>
        </div>
      </section>

      {/* ── Infinite Moving Marquee Ticker ── */}
      <section className="relative py-4 overflow-hidden border-y border-white/10 bg-black/50 backdrop-blur-md">
        <div className="animate-marquee flex items-center gap-6 select-none whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <Link
              key={idx}
              to={`/portfolio?category=${encodeURIComponent(item.category)}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/15 transition-all cursor-pointer hover:scale-105 shadow-sm group"
            >
              <span className="group-hover:scale-125 transition-transform">{item.icon}</span>
              <span className="bg-gradient-to-r from-slate-200 via-white to-slate-400 bg-clip-text text-transparent group-hover:text-cyan-300">
                {item.text}
              </span>
              <span className="text-purple-500/60 font-bold ml-1">•</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Work Grid ── */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Handpicked Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mt-1 text-white">
              Featured <span className="gradient-text">Showcase</span>
            </h2>
          </div>
          <Link to="/portfolio" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group">
            <span>Explore Full Gallery</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-strong rounded-3xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
              <Link
                key={p.id}
                to={`/portfolio/${p.slug}`}
                className="group glass-strong card-hover-effect rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between"
              >
                <div className="aspect-4/3 overflow-hidden bg-slate-900 relative">
                  <img
                    src={p.thumbnail || "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800"}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800";
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-cyan-400 border border-cyan-500/30">
                      {p.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                      📁 {p.images?.length || 1}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <span className="text-xs text-slate-300 font-semibold">{p.year} • {p.location || 'Studio'}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{p.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-cyan-400 mt-2">
                      <Eye className="size-4" /> <span>{p.views} Views</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                    {p.tags.slice(0, 3).map((t: string) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Section E: FrameKatha Creative Lab (Before/After Slider) ── */}
      {(siteSettings?.creativeLab?.enabled ?? true) && (
        <section id="creative-lab" className="py-12 max-w-4xl mx-auto px-4 border-t border-white/10">
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold">
              <Wand2 className="size-3.5" />
              <span>{siteSettings?.creativeLab?.badgeText || "FrameKatha Creative Lab"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {siteSettings?.creativeLab?.title || "RAW vs Graded Master"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              {siteSettings?.creativeLab?.description || "Drag the interactive slider below to see how FrameKatha transforms flat RAW camera footage into high-contrast cinematic art."}
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-3 sm:p-6 border border-white/10 shadow-2xl">
            <BeforeAfterSlider
              beforeImage={cleanMediaUrl(siteSettings?.creativeLab?.beforeImage || "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop&q=80&sat=-100")}
              afterImage={cleanMediaUrl(siteSettings?.creativeLab?.afterImage || "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop&q=80")}
              beforeLabel={siteSettings?.creativeLab?.beforeLabel || "Flat RAW Profile"}
              afterLabel={siteSettings?.creativeLab?.afterLabel || "Cinematic Teal & Orange Grade"}
            />
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300 text-[11px]">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{siteSettings?.creativeLab?.footerNote || "Color graded using DaVinci Resolve & custom 3D LUTs"}</span>
              </div>
              <Link
                to={siteSettings?.creativeLab?.ctaLink || "/portfolio?category=Photo%20Editing"}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/15 text-xs"
              >
                <span>{siteSettings?.creativeLab?.ctaText || "View Color Grading Works"}</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Section F: Services & Starting Rates (Preview on Home) ── */}
      <section className="py-16 max-w-7xl mx-auto px-4 border-t border-white/10 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Clear Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mt-1 text-white">
              Services &amp; <span className="gradient-text">Starting Rates</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
              Honest starting rates across our 6 core disciplines. No hidden booking fees.
            </p>
          </div>
          <Link
            to="/services"
            className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All Service Details</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((svc) => (
            <div
              key={svc.id}
              className="glass-strong rounded-3xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {svc.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-lg font-extrabold font-display gradient-text block">
                      {svc.price}
                    </span>
                    <span className="text-[10px] text-slate-400 block -mt-0.5">
                      {svc.unit}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {svc.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <a
                  href={getWhatsAppLink(`Hello Paras! I would like to inquire about ${svc.name} (${svc.price} ${svc.unit || ""}).`)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>Discuss Project</span>
                  <ArrowRight className="size-3" />
                </a>
                <Link
                  to={`/portfolio?category=${encodeURIComponent(svc.category)}`}
                  className="text-[11px] text-slate-400 hover:text-white"
                >
                  View Samples
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section H: The Creative Process (5 Steps) ── */}
      <section className="py-16 max-w-7xl mx-auto px-4 border-t border-white/10 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
            Simple 5-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            The Creative <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            From initial concept discussion to final high-resolution delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {siteConfig.creativeProcess.map((step) => (
            <div
              key={step.step}
              className="glass-strong rounded-3xl p-5 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="size-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs grid place-items-center">
                  0{step.step}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Step {step.step}</span>
              </div>
              <h3 className="text-sm font-bold text-white font-display">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cinematic Showcase Multi-Reel Video (Scroll Autoplay) ── */}
      <ShowcaseVideoSection
        videos={siteSettings?.showcaseVideos}
        videoUrl={siteSettings?.showcaseVideo}
        title={siteSettings?.showcaseVideoTitle}
        subtitle={siteSettings?.showcaseVideoSubtitle}
        enabled={siteSettings?.showcaseVideoEnabled !== false}
      />

      {/* ── Testimonials Section ── */}
      {testimonials.length > 0 && (
        <section className="py-20 max-w-5xl mx-auto px-4 border-t border-white/10">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Collaborations &amp; Feedback
            </span>
            <h2 className="text-3xl font-bold font-display text-white">
              What Collaborators <span className="gradient-text">Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="glass-strong card-hover-effect rounded-3xl p-8 border border-white/10 relative"
              >
                <Quote className="size-8 text-purple-500/20 absolute top-6 right-6" />
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.comment || t.message}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar || t.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                    alt={t.clientName || t.name}
                    className="size-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.clientName || t.name}</h4>
                    <p className="text-xs text-slate-400">{t.clientRole || t.role} • {t.company || 'Creative Partner'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
