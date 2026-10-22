import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from './SiteNav';
import { MessageCircle, Mail, X, ArrowUp, Instagram, Github, Film, Sparkles } from 'lucide-react';
import { siteConfig, getWhatsAppLink, getMailtoLink } from '@/config/site';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [fabOpen, setFabOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08080c] text-slate-100 font-sans relative overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Dynamic Ambient Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-blob will-change-transform" />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-cyan-500/10 rounded-full blur-3xl animate-blob-delayed will-change-transform" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-blob will-change-transform" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <SiteNav />

      <main className="flex-1 pt-24 pb-12 relative z-10">
        {children}
      </main>

      {/* Floating Controls: Back to Top & Quick Connect FAB */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Back-to-Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="size-11 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-white/20 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md animate-fade-in"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="size-4 text-cyan-400" />
          </button>
        )}

        {/* WhatsApp & Direct Contact Quick Connect Popup */}
        {fabOpen && (
          <div className="glass-strong rounded-3xl p-3 border border-purple-500/40 shadow-2xl space-y-2 animate-fade-in flex flex-col items-stretch min-w-[210px]">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all"
            >
              <MessageCircle className="size-4 text-emerald-400 shrink-0" />
              <div className="text-left">
                <span className="block font-semibold">Chat on WhatsApp</span>
                <span className="block text-[10px] text-emerald-400/80 font-mono">+91 8828447337</span>
              </div>
            </a>
            <a
              href={getMailtoLink()}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
            >
              <Mail className="size-4 text-cyan-400" />
              <span>Send Direct Inquiry</span>
            </a>
          </div>
        )}

        {/* Quick Connect Trigger Button */}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className="size-14 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.6)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/25"
          title="Quick Connect & Direct Inquiry"
          aria-label="Quick Connect"
        >
          {fabOpen ? (
            <X className="size-6 text-white" />
          ) : (
            <div className="relative">
              <MessageCircle className="size-6 text-white" />
              <span className="absolute -top-1 -right-1 size-3 bg-emerald-400 rounded-full border-2 border-[#0a0a0e] animate-ping" />
              <span className="absolute -top-1 -right-1 size-3 bg-emerald-400 rounded-full border-2 border-[#0a0a0e]" />
            </div>
          )}
        </button>
      </div>

      {/* Production-Grade Creative Studio Footer */}
      <footer className="border-t border-white/10 pt-12 pb-8 text-xs text-slate-400 bg-[#060609]/90 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
            {/* Column 1: Brand Info */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <img
                  src="/logo.png"
                  alt="FrameKatha Logo"
                  className="h-9 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                />
                <span className="text-xl font-bold font-display text-white tracking-wide">
                  {siteConfig.brand.name}
                </span>
              </div>
              <p className="text-sm font-semibold gradient-text font-display">
                "{siteConfig.brand.tagline}"
              </p>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                {siteConfig.brand.subheadline}
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore Studio</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Katha Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Services &amp; Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    About FrameKatha
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Contact Creator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Direct Connect */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Connect</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Email</span>
                  <a
                    href={getMailtoLink()}
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Instant WhatsApp</span>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1.5"
                  >
                    <MessageCircle className="size-3.5" />
                    <span>+91 8828447337</span>
                  </a>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={siteConfig.contact.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-pink-400 transition-colors"
                    title="Instagram"
                    aria-label="Instagram"
                  >
                    <Instagram className="size-4" />
                  </a>
                  <a
                    href={siteConfig.contact.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-purple-400 transition-colors"
                    title="GitHub"
                    aria-label="GitHub"
                  >
                    <Github className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Credits */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 border-t border-white/5 pt-6 mt-6">
            <p>© {new Date().getFullYear()} FrameKatha Cinematic Studio. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 shadow-sm backdrop-blur-md">
                <Sparkles className="size-3.5 text-cyan-400 animate-pulse" />
                <span>This website created by</span>
                <span className="font-bold text-sm bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Paras Aware
                </span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
