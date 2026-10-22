import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { fetchProjects, toggleProjectLike } from "@/lib/api";
import {
  Search,
  SlidersHorizontal,
  Eye,
  Sparkles,
  Image as ImageIcon,
  Folder,
  Camera,
  FolderDown,
  Heart,
  MessageSquare,
  QrCode,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Download,
  Film,
  Play
} from "lucide-react";
import { QRCodeModal } from "@/components/QRCodeModal";

const categories = [
  "All",
  "Photography",
  "Digital Art",
  "Photo Editing",
  "Poster Design",
  "Thumbnail Design",
  "Video Editing"
];

function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i.test(url);
}

export function PortfolioPage() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "All";

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQrProject, setSelectedQrProject] = useState<any | null>(null);
  const [isGlobalQrOpen, setIsGlobalQrOpen] = useState(false);

  // Filters & Sorting state
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("latest");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [projectLikes, setProjectLikes] = useState<{ [id: string]: number }>({});

  // Fullscreen Lightbox Modal state
  const [lightboxProjectIndex, setLightboxProjectIndex] = useState<number | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number>(0);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
    } else {
      setActiveCategory("All");
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadPortfolio() {
      setLoading(true);
      try {
        const data = await fetchProjects({
          category: activeCategory,
          search: searchQuery,
          year: selectedYear !== "All" ? parseInt(selectedYear) : undefined,
          featured: featuredOnly ? true : undefined,
          sort_by: sortBy
        });
        const publicProjects = Array.isArray(data) ? data.filter((p: any) => p.published !== false) : [];
        setProjects(publicProjects);

        // Check local storage for liked status
        const liked = new Set<string>();
        const likesMap: { [id: string]: number } = {};
        publicProjects.forEach((p: any) => {
          likesMap[p.id] = p.likes || 0;
          if (localStorage.getItem(`fk_liked_${p.id}`) === "true") {
            liked.add(p.id);
          }
        });
        setLikedIds(liked);
        setProjectLikes(likesMap);
      } catch (e) {
        console.error("Failed to load portfolio:", e);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(loadPortfolio, 200);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, selectedYear, featuredOnly, sortBy]);

  const handleLikeProject = async (projectId: string) => {
    const isCurrentlyLiked = likedIds.has(projectId);
    const newLiked = new Set(likedIds);
    const currentCount = projectLikes[projectId] ?? (projects.find((p) => p.id === projectId)?.likes || 0);

    if (isCurrentlyLiked) {
      newLiked.delete(projectId);
      localStorage.removeItem(`fk_liked_${projectId}`);
      setProjectLikes((prev) => ({ ...prev, [projectId]: Math.max(0, currentCount - 1) }));
    } else {
      newLiked.add(projectId);
      localStorage.setItem(`fk_liked_${projectId}`, "true");
      setProjectLikes((prev) => ({ ...prev, [projectId]: currentCount + 1 }));
    }
    setLikedIds(newLiked);

    try {
      await toggleProjectLike(projectId, isCurrentlyLiked ? "unlike" : "like");
    } catch (e) {
      console.error("Failed to toggle like:", e);
    }
  };

  // Keyboard navigation for Lightbox
  const handlePrevLightbox = useCallback(() => {
    if (lightboxProjectIndex === null || projects.length === 0) return;
    const currentProj = projects[lightboxProjectIndex];
    const imageList = currentProj.images && currentProj.images.length > 0 ? currentProj.images : [currentProj.thumbnail];
    
    if (lightboxImageIndex > 0) {
      setLightboxImageIndex(lightboxImageIndex - 1);
    } else {
      const prevProjIdx = (lightboxProjectIndex - 1 + projects.length) % projects.length;
      setLightboxProjectIndex(prevProjIdx);
      const prevProj = projects[prevProjIdx];
      const prevImages = prevProj.images && prevProj.images.length > 0 ? prevProj.images : [prevProj.thumbnail];
      setLightboxImageIndex(prevImages.length - 1);
    }
  }, [lightboxProjectIndex, lightboxImageIndex, projects]);

  const handleNextLightbox = useCallback(() => {
    if (lightboxProjectIndex === null || projects.length === 0) return;
    const currentProj = projects[lightboxProjectIndex];
    const imageList = currentProj.images && currentProj.images.length > 0 ? currentProj.images : [currentProj.thumbnail];

    if (lightboxImageIndex < imageList.length - 1) {
      setLightboxImageIndex(lightboxImageIndex + 1);
    } else {
      const nextProjIdx = (lightboxProjectIndex + 1) % projects.length;
      setLightboxProjectIndex(nextProjIdx);
      setLightboxImageIndex(0);
    }
  }, [lightboxProjectIndex, lightboxImageIndex, projects]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxProjectIndex === null) return;
      if (e.key === "Escape") {
        setLightboxProjectIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevLightbox();
      } else if (e.key === "ArrowRight") {
        handleNextLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxProjectIndex, handlePrevLightbox, handleNextLightbox]);

  const activeLightboxProject = lightboxProjectIndex !== null ? projects[lightboxProjectIndex] : null;
  const activeLightboxImages = activeLightboxProject
    ? (activeLightboxProject.images && activeLightboxProject.images.length > 0
        ? activeLightboxProject.images
        : [activeLightboxProject.thumbnail])
    : [];
  const currentLightboxMedia = activeLightboxImages[lightboxImageIndex] || activeLightboxProject?.thumbnail || "";

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fade-in">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            <span>Katha Creative Showcase</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            The Katha <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Every frame tells a story. Explore our portfolio of photography, digital concept art, before/after color grading, minimalist posters, and cinematic 4K video edits.
          </p>
          <div className="flex justify-center gap-2 pt-1">
            <button
              onClick={() => setIsGlobalQrOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Share this gallery via QR Code"
            >
              <QrCode className="size-3.5 text-cyan-400" />
              <span>Share Gallery QR</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="glass-strong rounded-3xl p-6 border border-white/10 space-y-6 shadow-xl">
          {/* Category Filter Pills */}
          <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search, Filter Drops & Sorting Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/5">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search title, tag, tool, camera..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Year Filter */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#12121a] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            >
              <option value="All">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#12121a] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            >
              <option value="latest">Sort: Latest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="most_viewed">Sort: Most Viewed</option>
              <option value="featured">Sort: Featured First</option>
            </select>

            {/* Featured Only Toggle */}
            <button
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                featuredOnly
                  ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="size-4 text-cyan-400" />
              {featuredOnly ? "Showing Featured Only" : "Show Featured Only"}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-strong rounded-3xl h-80 animate-pulse" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, pIndex) => (
              <div
                key={p.id}
                className="group glass-strong card-hover-effect rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between"
              >
                {/* Media Thumbnail with Fullscreen Lightbox Trigger */}
                <div
                  className="aspect-4/3 overflow-hidden bg-slate-900 relative cursor-pointer"
                  onClick={() => {
                    setLightboxProjectIndex(pIndex);
                    setLightboxImageIndex(0);
                  }}
                >
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

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-cyan-400 border border-cyan-500/30">
                        {p.category}
                      </span>
                      {p.beforeImage && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-600/80 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                          <SlidersHorizontal className="size-2.5" /> Edit
                        </span>
                      )}
                      {p.video && (
                        <span className="px-2 py-0.5 rounded-full bg-pink-600/80 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                          <Film className="size-2.5" /> Video
                        </span>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30 shrink-0">
                      📁 {p.images?.length || 1}
                    </span>
                  </div>

                  {/* Hover Overlay with Lightbox Trigger */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <span className="text-xs text-slate-300 font-semibold">{p.year} • {p.location || 'Studio'}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{p.title}</h3>
                    <div className="flex items-center justify-between text-xs text-cyan-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Eye className="size-3.5" /> {p.views} Views
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold flex items-center gap-1">
                        <Maximize2 className="size-3" /> Quick Lightbox
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/portfolio/${p.slug}`}
                      className="font-bold text-white text-base hover:text-cyan-400 transition-colors block"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 3).map((t: string) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleLikeProject(p.id)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                          likedIds.has(p.id)
                            ? "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm"
                            : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:text-rose-300 hover:border-rose-500/30"
                        }`}
                        title={likedIds.has(p.id) ? "Unlike" : "Like"}
                      >
                        <Heart className={`size-3.5 ${likedIds.has(p.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                        <span>{projectLikes[p.id] ?? (p.likes || 0)}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedQrProject(p)}
                        className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        title="Get QR Code for this project"
                      >
                        <QrCode className="size-3.5" />
                        <span className="hidden sm:inline">QR</span>
                      </button>
                    </div>

                    <Link
                      to={`/portfolio/${p.slug}`}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>Story</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-strong rounded-3xl border border-white/10 space-y-3">
            <ImageIcon className="size-10 mx-auto text-slate-500" />
            <h3 className="text-lg font-bold text-white">No projects found in this category</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search criteria, category filter, or resetting the filters.
            </p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); setSelectedYear("All"); setFeaturedOnly(false); setSortBy("latest"); }}
              className="btn-ghost-neon text-xs mt-2"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* ── Interactive Fullscreen Lightbox Modal (Keyboard & Touch Controlled) ── */}
      {activeLightboxProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-fade-in select-none"
          onClick={() => setLightboxProjectIndex(null)}
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-cyan-400">
                {activeLightboxImages.length > 1
                  ? `Photo ${lightboxImageIndex + 1} of ${activeLightboxImages.length}`
                  : activeLightboxProject.category}
              </span>
              <span className="text-xs text-white font-bold">{activeLightboxProject.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/portfolio/${activeLightboxProject.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/40 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>View Full Story</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setLightboxProjectIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Media Center Stage */}
          <div
            className="relative flex-1 flex items-center justify-center p-2 my-2 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrevLightbox}
              className="absolute left-2 sm:left-6 z-10 size-12 rounded-full bg-black/70 hover:bg-cyan-500 hover:text-black text-white border border-white/20 transition-all grid place-items-center cursor-pointer shadow-2xl backdrop-blur-md"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Media Display */}
            {isVideoUrl(currentLightboxMedia) || activeLightboxProject.video ? (
              <video
                key={currentLightboxMedia || activeLightboxProject.video}
                src={currentLightboxMedia || activeLightboxProject.video}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            ) : (
              <img
                key={currentLightboxMedia}
                src={currentLightboxMedia}
                alt={activeLightboxProject.title}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300 animate-fade-in"
              />
            )}

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextLightbox}
              className="absolute right-2 sm:right-6 z-10 size-12 rounded-full bg-black/70 hover:bg-cyan-500 hover:text-black text-white border border-white/20 transition-all grid place-items-center cursor-pointer shadow-2xl backdrop-blur-md"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Bottom Caption & Controls */}
          <div
            className="z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs text-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="line-clamp-1 text-center sm:text-left">
              {activeLightboxProject.description}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                Use Left / Right Arrows to Navigate • Esc to Close
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Global Portfolio QR Modal ── */}
      <QRCodeModal
        isOpen={isGlobalQrOpen}
        onClose={() => setIsGlobalQrOpen(false)}
        title="FrameKatha Portfolio"
      />

      {/* ── Per-Project QR Modal ── */}
      {selectedQrProject && (
        <QRCodeModal
          isOpen={!!selectedQrProject}
          onClose={() => setSelectedQrProject(null)}
          projectUrl={`/portfolio/${selectedQrProject.slug}`}
          title={selectedQrProject.title}
          folderName={selectedQrProject.folderName}
          isFolderQR={!!(selectedQrProject.folderName || selectedQrProject.images?.length > 0)}
        />
      )}
    </SiteLayout>
  );
}
