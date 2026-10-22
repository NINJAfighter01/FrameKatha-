import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { sendMessage } from "@/lib/api";
import { siteConfig, getWhatsAppLink, getMailtoLink } from "@/config/site";
import {
  Mail,
  Send,
  CheckCircle2,
  Instagram,
  Github,
  Linkedin,
  Youtube,
  AlertCircle,
  MessageCircle,
  Sparkles,
  Clock,
  ShieldCheck
} from "lucide-react";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Photography");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    setError("");

    const formattedWhatsAppMsg = `*New FrameKatha Project Inquiry!* 📸\n\n*Name:* ${name.trim()}\n*Email:* ${email.trim()}\n*Service:* ${service}\n*Subject:* ${subject.trim() || `Inquiry for ${service}`}\n\n*Message:*\n${message.trim()}\n\n---\n_Sent via FrameKatha Website_`;
    const waUrl = getWhatsAppLink(formattedWhatsAppMsg);
    setLastWhatsAppUrl(waUrl);

    try {
      await sendMessage({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || `Inquiry for ${service}`,
        message: `[Selected Service: ${service}]\n\n${message.trim()}`
      });
      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // Directly open WhatsApp with pre-filled inquiry details to 8828447337
      window.open(waUrl, "_blank");
    } catch (err: any) {
      setError("Unable to transmit message. You can also contact directly via WhatsApp or Email.");
      window.open(waUrl, "_blank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="max-w-5xl mx-auto px-4 py-8 space-y-12 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            <span>Direct Creative Communication</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Let's Create <span className="gradient-text">Something</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have a photo assignment, digital artwork idea, color grading project, or custom thumbnail request? Reach out directly via WhatsApp, email, or our inquiry form.
          </p>
        </div>

        {/* Quick Instant Channels Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* WhatsApp Direct */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-strong rounded-3xl p-5 border border-emerald-500/30 hover:border-emerald-400/80 transition-all flex items-center justify-between group shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-2xl bg-emerald-500/20 text-emerald-400 grid place-items-center group-hover:scale-110 transition-transform">
                <MessageCircle className="size-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Fastest Response • +91 8828447337
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Chat on WhatsApp
                </h3>
                <span className="text-xs text-slate-400">Direct message with Paras Aware</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>

          {/* Email Direct */}
          <a
            href={getMailtoLink()}
            className="glass-strong rounded-3xl p-5 border border-cyan-500/30 hover:border-cyan-400/80 transition-all flex items-center justify-between group shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-2xl bg-cyan-500/20 text-cyan-400 grid place-items-center group-hover:scale-110 transition-transform">
                <Mail className="size-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                  Official Inquiries
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate max-w-[180px]">
                  {siteConfig.contact.email}
                </h3>
                <span className="text-xs text-slate-400">Send direct project brief</span>
              </div>
            </div>
            <span className="text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>

        {/* Main Grid: Info + Form */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Info Card */}
          <div className="md:col-span-2 glass-strong rounded-3xl p-8 border border-white/10 space-y-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold font-display text-white">FrameKatha Studio</h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We are available for creative visual assignments across photography, digital art commissions, high-volume RAW color grading, and video editing.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300 border-t border-white/10">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Clock className="size-4 text-cyan-400 shrink-0" />
                  <span>Prompt response within 24 hours</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
                  <span>Direct collaboration with the creator</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="text-xs font-semibold text-slate-400 block">Follow &amp; Connect</span>
              <div className="flex gap-2.5">
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
                  href={siteConfig.contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="size-4" />
                </a>
                <a
                  href={siteConfig.contact.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-red-400 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="size-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="md:col-span-3 glass-strong rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
            {sent ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="size-16 mx-auto rounded-full bg-cyan-500/20 text-cyan-400 grid place-items-center">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">Inquiry Received &amp; WhatsApp Connected!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to FrameKatha. Your message has been saved and forwarded to creator Paras Aware on WhatsApp (<span className="text-emerald-400 font-semibold">+91 8828447337</span>).
                </p>
                <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3">
                  <a
                    href={lastWhatsAppUrl || getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-neon text-xs px-5 py-2.5 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    <MessageCircle className="size-4" /> Open in WhatsApp (+91 8828447337)
                  </a>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-ghost-neon text-xs px-4 py-2"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                    <AlertCircle className="size-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1 font-semibold">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Paras Aware"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1 font-semibold">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1 font-semibold">
                      Service of Interest
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#12121a] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="Photography">Photography (From ₹700)</option>
                      <option value="Digital Art">Digital Art (From ₹600)</option>
                      <option value="Photo Editing">Photo Editing (From ₹150/photo)</option>
                      <option value="Poster Design">Poster Design (From ₹400)</option>
                      <option value="Thumbnail Design">Thumbnail Design (From ₹50)</option>
                      <option value="Video Editing">Video Editing (From ₹150/5 min)</option>
                      <option value="Custom Mixed Project">Custom Mixed Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1 font-semibold">
                      Project Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Editorial Portrait Shoot"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-semibold">
                    Project Details &amp; Vision *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project, references, timeframe, or specific deliverables..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-neon w-full py-3.5 text-xs flex justify-center items-center gap-2 disabled:opacity-60 cursor-pointer shadow-lg"
                >
                  {loading ? (
                    "Sending Message..."
                  ) : (
                    <>
                      <Send className="size-4" /> Send Project Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
