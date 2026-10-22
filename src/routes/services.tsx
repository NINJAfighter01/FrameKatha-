import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { siteConfig, getWhatsAppLink, getMailtoLink, ServiceItem } from "@/config/site";
import {
  Sparkles,
  Camera,
  Palette,
  SlidersHorizontal,
  ImageIcon,
  Tv,
  Film,
  CheckCircle2,
  MessageCircle,
  Mail,
  Info,
  ArrowRight,
  ShieldAlert
} from "lucide-react";

const iconMap: Record<string, any> = {
  photography: Camera,
  "digital-art": Palette,
  "photo-editing": SlidersHorizontal,
  "poster-design": ImageIcon,
  "thumbnail-design": Tv,
  "video-editing": Film,
};

export function ServicesPage() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 py-8 space-y-16 animate-fade-in">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            <span>Transparent Creative Services &amp; Starting Rates</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-white tracking-tight">
            Services &amp; <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Professional visual storytelling crafted with cinematic precision. Clear starting rates with no hidden fees or complex packages — discuss your exact creative vision directly with creator Paras.
          </p>
        </div>

        {/* Pricing Transparency Banner */}
        <div className="glass-strong rounded-3xl p-5 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gradient-to-r from-cyan-950/20 via-purple-950/20 to-black/40">
          <div className="size-10 rounded-2xl bg-cyan-500/20 text-cyan-400 grid place-items-center shrink-0">
            <Info className="size-5" />
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-white">How Our Pricing Works</p>
            <p className="text-slate-400 leading-relaxed">
              The rates below represent listed starting prices or base calculation rates. Every creative project is unique, so the final scope, resolution, complex visual effects, or delivery timeline can be tailored during our direct project consultation.
            </p>
          </div>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.services.map((service: ServiceItem) => {
            const Icon = iconMap[service.id] || Sparkles;
            const customWhatsAppMsg = `Hello Paras! I would like to discuss a project for ${service.name} (Starting at ${service.price} ${service.unit || ""}).`;

            return (
              <div
                key={service.id}
                className="group glass-strong rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-gradient-to-b from-white/[0.03] to-transparent"
              >
                {/* Service Visual Preview */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                  <img
                    src={service.sampleImage}
                    alt={service.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-black/30" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                      <Icon className="size-3 text-cyan-400" />
                      <span>{service.category}</span>
                    </span>
                  </div>

                  {/* Starting Price Badge */}
                  <div className="absolute bottom-3 right-3 text-right">
                    <div className="px-3 py-1.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-lg">
                      <span className="text-xl font-extrabold font-display gradient-text block">
                        {service.price}
                      </span>
                      {service.unit && (
                        <span className="text-[10px] text-slate-300 block -mt-0.5">
                          {service.unit}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Service Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                      {service.shortDesc}
                    </p>

                    {/* Features List */}
                    <div className="pt-2 space-y-2 border-t border-white/5">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="size-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Basis Clarification Note */}
                    {service.pricingNote && (
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-slate-400 leading-relaxed">
                        <span className="font-semibold text-slate-300 block mb-0.5">Pricing Note:</span>
                        {service.pricingNote}
                      </div>
                    )}
                  </div>

                  {/* Direct Contact CTAs (WhatsApp & Email) */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <a
                      href={getWhatsAppLink(customWhatsAppMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600/90 to-cyan-600/90 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="size-4" />
                      <span>{service.ctaText} (WhatsApp)</span>
                    </a>

                    <div className="flex gap-2">
                      <a
                        href={getMailtoLink(`Inquiry for ${service.name} — FrameKatha`, `Hello Paras,\n\nI am interested in your ${service.name} service.\n\nProject details:\n`)}
                        className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Mail className="size-3.5 text-cyan-400" />
                        <span>Email Inquiry</span>
                      </a>
                      <Link
                        to={`/portfolio?category=${encodeURIComponent(service.category)}`}
                        className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all flex items-center justify-center gap-1"
                        title={`View ${service.category} samples in gallery`}
                      >
                        <span>Samples</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Scope / Non-Standard Requirements Section */}
        <div className="glass-strong rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto text-center space-y-4 bg-gradient-to-br from-purple-950/20 via-black/40 to-cyan-950/20">
          <h2 className="text-2xl font-bold font-display text-white">
            Have a Custom Creative Requirement?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Need a mixed package combining photography, video editing, and custom poster art? Or a fast turnaround for content creation? We tailor every detail directly without rigid tiers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <a
              href={getWhatsAppLink("Hello Paras! I have a custom creative inquiry for FrameKatha.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon text-xs px-6 py-3 w-full sm:w-auto"
            >
              <MessageCircle className="size-4" /> Chat Directly on WhatsApp
            </a>
            <Link
              to="/contact"
              className="btn-ghost-neon text-xs px-6 py-3 w-full sm:w-auto"
            >
              <Mail className="size-4" /> Send Direct Email
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
