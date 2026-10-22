import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { siteConfig, getWhatsAppLink, getMailtoLink } from "@/config/site";
import {
  Camera,
  Film,
  Palette,
  SlidersHorizontal,
  Sparkles,
  MessageSquare,
  MessageCircle,
  Compass,
  Eye,
  CheckCircle2,
  Mail,
  Instagram,
  Github,
  ArrowRight,
  HeartHandshake
} from "lucide-react";

const stepIcons: Record<string, any> = {
  MessageSquare,
  Compass,
  Sparkles,
  Eye,
  CheckCircle2,
};

export function AboutPage() {
  const tools = [
    { name: "Adobe Photoshop", category: "Retouching & Compositing", icon: "🎨" },
    { name: "Adobe Lightroom", category: "Color Grading & RAW Processing", icon: "📷" },
    { name: "DaVinci Resolve", category: "Color Grading & 4K Cinema", icon: "🪄" },
    { name: "Premiere Pro", category: "Cinematic Timeline Editing", icon: "🎬" },
    { name: "After Effects", category: "Motion Graphics & VFX", icon: "✨" },
    { name: "Figma", category: "UI/UX & Poster Typography", icon: "📐" },
    { name: "Three.js & WebGL", category: "Creative Coding & 3D Optics", icon: "🌐" },
    { name: "Sony Alpha Imaging", category: "Full-Frame 4K Capture", icon: "📸" },
  ];

  return (
    <SiteLayout>
      <section className="max-w-5xl mx-auto px-4 py-8 space-y-20 animate-fade-in">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            <span>Creative Visual Storytelling Studio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-white tracking-tight">
            About <span className="gradient-text">FrameKatha</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            "{siteConfig.brand.tagline}" We craft emotive photography, digital concept art, and high-impact color grading designed to help creators and brands connect deeply with their audiences.
          </p>
        </div>

        {/* Studio Philosophy & Creator Section */}
        <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-white/10 flex flex-col md:flex-row gap-8 items-center shadow-2xl bg-gradient-to-br from-white/[0.02] to-transparent">
          <div className="w-full md:w-5/12 aspect-4/5 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl relative group shrink-0">
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&auto=format&fit=crop&q=80"
              alt="Paras Aware — Founder & Creative Director"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">
                Founder &amp; Visual Director
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                {siteConfig.brand.creator}
              </h3>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed md:flex-1">
            <h2 className="text-2xl font-bold font-display text-white">
              Visual Artistry Meets Cinematic Precision
            </h2>
            <p>
              FrameKatha was born from a simple belief: a single frame possesses the power to evoke deep nostalgia, spark intense emotion, and communicate what words cannot.
            </p>
            <p>
              Whether capturing nocturnal architectural heritage under starry skies, transforming flat RAW footage into lush cinematic art, or designing minimalist movie posters, we treat every composition with artistic mindfulness and technical discipline.
            </p>
            <p>
              We collaborate with individuals, independent artists, content creators, and growing personal brands who value visual distinction over generic templates.
            </p>

            {/* Social Links & Direct Connection */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 hover:text-black text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="size-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-pink-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={siteConfig.contact.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-purple-400 transition-colors"
                title="GitHub"
              >
                <Github className="size-4" />
              </a>
              <a
                href={getMailtoLink()}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                title="Email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Creative Process (Section 6.H) */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              The Creative <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Our 5-step collaborative workflow ensures clear communication, artistic alignment, and polished master results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {siteConfig.creativeProcess.map((step) => {
              const StepIcon = stepIcons[step.iconName] || CheckCircle2;
              return (
                <div
                  key={step.step}
                  className="glass-strong rounded-3xl p-6 border border-white/10 flex flex-col justify-between space-y-4 hover:border-cyan-400/40 transition-all duration-300 relative group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="size-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs grid place-items-center">
                        0{step.step}
                      </span>
                      <StepIcon className="size-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <h3 className="text-sm font-bold text-white font-display">
                      {step.title}
                    </h3>
                    <p className="text-[10px] text-cyan-300/80 font-mono">
                      {step.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tools & Craft Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
              Software &amp; Gear
            </span>
            <h2 className="text-3xl font-bold font-display text-white">
              Tools of the <span className="gradient-text">Craft</span>
            </h2>
            <p className="text-xs text-slate-400">
              Industry-standard creative suites powering FrameKatha deliverables
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {tools.map((t) => (
              <div
                key={t.name}
                className="glass-strong rounded-2xl p-4 border border-white/10 hover:border-cyan-500/40 transition-all text-center space-y-2 group"
              >
                <div className="text-2xl group-hover:scale-115 transition-transform">{t.icon}</div>
                <h4 className="text-xs font-bold text-white font-display">{t.name}</h4>
                <p className="text-[10px] text-slate-400">{t.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="glass-strong rounded-3xl p-8 border border-cyan-500/30 text-center space-y-4 max-w-3xl mx-auto shadow-2xl bg-gradient-to-r from-purple-950/20 via-black/40 to-cyan-950/20">
          <h3 className="text-2xl font-bold font-display text-white">
            Ready to Tell Your Story?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Whether you need a photo session, a custom digital illustration, or a cinematic reel edit, let's create something memorable together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <Link to="/portfolio" className="btn-neon text-xs px-6 py-3 w-full sm:w-auto">
              Explore the Gallery <ArrowRight className="size-4" />
            </Link>
            <Link to="/contact" className="btn-ghost-neon text-xs px-6 py-3 w-full sm:w-auto">
              Let's Create Something
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
