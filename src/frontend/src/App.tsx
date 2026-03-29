import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { backendInterface as BackendWithFeedback } from "./backend.d";
import { useActor } from "./hooks/useActor";

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`section-reveal${visible ? " visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const WA_LINK =
  "https://wa.me/919990768012?text=Hi%2C%20I%20am%20interested%20in%20a%20bulk%20quote%20for%20HydroElite%20water.";

const NAV_ITEMS = [
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "Why Us", href: "#why-us" },
  { label: "Products", href: "#products" },
  { label: "Bulk Orders", href: "#bulk-orders" },
  { label: "Branding", href: "#branding" },
];

const PRIVACY_POLICY = `HydroElite Privacy Policy

Last updated: March 2026

HydroElite Beverages is committed to protecting your privacy. This policy outlines how we collect and use information.

1. Information We Collect: When you contact us for bulk orders, we may collect your name, organization name, phone number, and email address solely for order processing and communication.

2. How We Use Your Information: We use your contact details to respond to bulk order inquiries, process orders, and send relevant business communications.

3. Data Protection: We do not sell, trade, or transfer your information to third parties. Your data is stored securely and used only for business purposes.

4. Contact: For any privacy concerns, email us at officialhydroelite@gmail.com`;

const TERMS_CONDITIONS = `HydroElite Terms & Conditions

1. Bulk Orders Only: HydroElite exclusively accepts bulk institutional orders. We do not sell single bottles or retail quantities.

2. Minimum Order: Minimum order quantity is 100 bottles.

3. Pricing: All pricing is subject to change without notice. Final pricing is confirmed upon receipt of a formal bulk quote request.

4. Payment Terms: 50% advance payment required for all bulk orders. Balance due before dispatch unless otherwise agreed.

5. Delivery: Delivery timelines vary based on order volume and location within Delhi NCR.

6. Quality: Every batch is tested to maintain pH 8.0-9.0 alkalinity standards. Quality certificates available on request.

7. Cancellations: Bulk orders once confirmed and in production cannot be cancelled.

8. Jurisdiction: Disputes subject to Delhi NCR jurisdiction.`;

const ABOUT_US = `About HydroElite

HydroElite is a premium alkaline water brand based in New Delhi, India, dedicated to supplying high-quality hydration solutions to institutions, events, and corporate entities across Delhi NCR.

Our Mission: To provide consistently superior alkaline water that meets the highest quality standards, exclusively through bulk institutional supply.

What We Do: We supply premium pH 8.0-9.0 alkaline water in premium black-label 500ml bottles to events, weddings, corporate offices, gyms, fitness centers, hotels, cafes, and distributors.

Why Bulk Only: Our focus on bulk supply allows us to ensure every bottle meets our rigorous quality standards while offering competitive pricing to our institutional partners.

Location: New Friends Colony, New Delhi - 110025
Email: officialhydroelite@gmail.com
Phone/WhatsApp: +91 9990768012
Instagram: @hydroelite_pvt`;

// ─── Product Cards Data ───────────────────────────────────────────────────────
const PRODUCT_CARDS = [
  {
    category: "EVERYDAY HYDRATION",
    name: "HydroElite Basic",
    size: "250ml Bottle",
    price: "₹10",
    priceBadgeColor: "#D4AF37",
    accentBadge: "₹10 ONLY",
    accentBadgeColor: "#3B82F6",
    image: "/assets/generated/hydroelite-bottle-transparent.dim_600x900.png",
    features: ["Packaged Drinking Water", "BIS Certified", "BPA-Free Bottle"],
  },
  {
    category: "PURE PACKAGED WATER",
    name: "HydroElite Packaged Water",
    size: "500ml Bottle",
    price: "₹20",
    priceBadgeColor: "#D4AF37",
    accentBadge: null,
    accentBadgeColor: null,
    image: "/assets/generated/hydroelite-bottle-transparent.dim_600x900.png",
    features: [
      "BIS Certified",
      "Advanced Filtration",
      "BPA-Free · Pure · Safe",
    ],
  },
  {
    category: "ALKALINE WATER",
    name: "HydroElite pH8+",
    size: "500ml Bottle",
    price: "₹65",
    priceBadgeColor: "#D4AF37",
    accentBadge: "PREMIUM",
    accentBadgeColor: "#D4AF37",
    image: "/assets/generated/hydroelite-bulk-bottle.dim_800x1000.png",
    features: [
      "Alkaline pH 8.0–9.0",
      "Electrolyte Enhanced",
      "FSSAI & BIS Certified",
    ],
  },
];

// ─── Legal Modal ──────────────────────────────────────────────────────────────
function LegalModal({
  trigger,
  title,
  content,
}: {
  trigger: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg bg-[#111] border border-[#D4AF37]/30 text-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-[#D4AF37] text-xl">
            {title}
          </DialogTitle>
        </DialogHeader>
        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
          {content}
        </pre>
      </DialogContent>
    </Dialog>
  );
}

// ─── Feedback Modal ───────────────────────────────────────────────────────────
function FeedbackModal() {
  const { actor } = useActor();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      if (actor) {
        await (actor as unknown as BackendWithFeedback).submitFeedback({
          name,
          rating: BigInt(rating),
          message,
          timestamp: BigInt(Date.now()),
        });
      }
      toast.success("Thank you for your feedback!");
      setOpen(false);
      setName("");
      setMessage("");
      setRating(5);
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [actor, name, rating, message]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          data-ocid="feedback.open_modal_button"
          className="text-xs text-gray-500 hover:text-[#D4AF37] transition-colors underline underline-offset-2"
        >
          Submit Feedback
        </button>
      </DialogTrigger>
      <DialogContent
        data-ocid="feedback.dialog"
        className="max-w-md bg-[#111] border border-[#D4AF37]/30 text-white"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-[#D4AF37] text-xl">
            Share Your Feedback
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <label
              htmlFor="fb-name"
              className="text-xs text-gray-400 uppercase tracking-wider block mb-1"
            >
              Your Name
            </label>
            <Input
              id="fb-name"
              data-ocid="feedback.input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-600"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
              Rating (1–5)
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setRating(n)}
                  className={`w-9 h-9 rounded border text-sm font-medium transition-colors ${
                    rating >= n
                      ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]"
                      : "border-[#2a2a2a] text-gray-500 hover:border-[#D4AF37]/40"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="fb-message"
              className="text-xs text-gray-400 uppercase tracking-wider block mb-1"
            >
              Message
            </label>
            <Textarea
              id="fb-message"
              data-ocid="feedback.textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-600 resize-none"
              rows={3}
              placeholder="Share your experience or thoughts..."
            />
          </div>
          <Button
            data-ocid="feedback.submit_button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-[#D4AF37] hover:bg-[#e8cb6a] text-black font-semibold"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Toaster theme="dark" />

      {/* Announcement Bar */}
      <div className="bg-[#D4AF37] text-black text-center text-xs sm:text-sm font-bold py-2 px-4 tracking-wide">
        🚫 Bulk Orders Only – We Do Not Sell Single Bottles
      </div>

      {/* Sticky Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b border-[#D4AF37]/10 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg shadow-black/50"
            : "bg-[#0a0a0a]/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-wider">
                HydroElite
              </span>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-[#D4AF37]/40 text-[#D4AF37]/80">
                Bulk Only
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.href}
                  data-ocid="nav.link"
                  onClick={() => scrollTo(item.href)}
                  className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  data-ocid="nav.primary_button"
                  className="hidden sm:flex border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-black transition-all duration-300 text-sm font-semibold tracking-wider px-5"
                >
                  Request Bulk Quote
                </Button>
              </a>
              <button
                type="button"
                className="lg:hidden text-gray-300 hover:text-[#D4AF37] p-2"
                onClick={() => setMobileMenuOpen((v) => !v)}
              >
                <div className="w-5 space-y-1.5">
                  <span
                    className={`block h-0.5 bg-current transition-all duration-300 ${
                      mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current transition-all duration-300 ${
                      mobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current transition-all duration-300 ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#111] border-t border-[#2a2a2a] px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left py-2.5 px-3 text-gray-200 hover:text-[#D4AF37] hover:bg-[#1a1a1a] rounded transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3"
            >
              <Button className="w-full border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-black">
                Request Bulk Quote
              </Button>
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hydroelite-bulk-supply.dim_1200x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto py-24 animate-fade-up">
          <p className="text-xs sm:text-sm tracking-[0.4em] text-[#D4AF37] uppercase mb-6 font-semibold">
            Premium Alkaline Water
          </p>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
            HydroElite –{" "}
            <span className="text-[#D4AF37]">Premium Alkaline Water</span>,
            <br className="hidden sm:block" />
            Exclusively for Bulk &amp; Institutional Supply
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Trusted by events, corporates, gyms, and hospitality partners for
            high-quality hydration solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                data-ocid="hero.primary_button"
                className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#e8cb6a] text-black font-bold text-base px-10 py-6 tracking-wide shadow-xl shadow-[#D4AF37]/20 transition-all duration-300"
              >
                Request Bulk Quote
              </Button>
            </a>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("#contact")}
              className="w-full sm:w-auto border border-white/40 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] px-10 py-4 text-base font-semibold tracking-wide transition-all duration-300 rounded"
            >
              Contact Us
            </button>
          </div>
          <p className="mt-6 text-sm text-yellow-400/90 font-medium">
            ⚠️ Bulk orders only. No retail sales.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-px h-12 bg-[#D4AF37]/60 mx-auto" />
        </div>
      </section>

      {/* Who We Serve */}
      <section id="who-we-serve" className="py-24 px-4 sm:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-3">
              Our Clients
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white gold-line gold-line-center pb-4">
              Who We Serve
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
            {[
              {
                emoji: "🎊",
                title: "Events & Weddings",
                desc: "Premium hydration for your most memorable occasions",
              },
              {
                emoji: "🏢",
                title: "Corporate Offices",
                desc: "Elevate workplace wellness with alkaline water",
              },
              {
                emoji: "💪",
                title: "Gyms & Fitness",
                desc: "Fuel performance with pH-balanced hydration",
              },
              {
                emoji: "🏨",
                title: "Hotels & Cafes",
                desc: "Set a premium standard for your guests",
              },
              {
                emoji: "🚚",
                title: "Distributors",
                desc: "Partner with us to expand your premium portfolio",
              },
            ].map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 80}
                className="group bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#D4AF37]/50 rounded p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D4AF37]/10 cursor-default"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-display text-base font-semibold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section id="why-us" className="py-24 px-4 sm:px-8 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-3">
              Our Advantage
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white gold-line gold-line-center pb-4">
              Why Choose HydroElite
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Balanced Alkaline Water",
                desc: "pH 8.0–9.0 for premium hydration. Every batch tested and certified for optimal mineral balance.",
              },
              {
                title: "Premium Black Bottle Design",
                desc: "Stands out in any premium setting. Our signature black bottle communicates luxury at first sight.",
              },
              {
                title: "Bulk Supply Capability",
                desc: "Handles 100 to 10,000+ bottles per order. Scalable supply chain built for institutional demand.",
              },
              {
                title: "Consistent Quality",
                desc: "Every batch tested and certified. FSSAI compliant, BIS certified. Zero compromise on quality.",
              },
              {
                title: "Custom Branding Available",
                desc: "Your logo, your brand. Private label and event branding for complete brand alignment.",
              },
            ].map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 100}
                className={`flex gap-5 p-6 rounded border transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-lg hover:shadow-[#D4AF37]/5 ${
                  i % 2 === 0
                    ? "bg-[#0a0a0a] border-[#1e1e1e]"
                    : "bg-[#161616] border-[#2a2a2a]"
                }`}
              >
                <span className="text-[#D4AF37] text-base mt-0.5 shrink-0">
                  ◆
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal
            className="flex flex-wrap justify-center gap-4 mt-14"
            delay={200}
          >
            {[
              "FSSAI Certified",
              "BIS Approved",
              "pH 8.0–9.0 Guaranteed",
              "Delhi NCR Delivery",
            ].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 border border-[#D4AF37]/30 rounded-full px-5 py-2 text-xs text-[#D4AF37] tracking-wider"
              >
                <span>✓</span> {badge}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 px-4 sm:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-3">
              The Product
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white gold-line gold-line-center pb-4">
              Our Premium Alkaline Water
            </h2>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 border border-[#D4AF37]/40 rounded-full px-4 py-1.5 text-xs text-[#D4AF37] tracking-widest uppercase">
                🚫 Bulk Orders Only
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                HydroElite pH8+
                <span className="block text-[#D4AF37]">Alkaline Water</span>
              </h3>
              <div className="space-y-3">
                {[
                  "500ml Premium Black Bottle",
                  "Alkaline pH 8.0–9.0 Certified",
                  "Electrolyte Enhanced Formula",
                  "FSSAI & BIS Certified",
                ].map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <span className="text-[#D4AF37] text-xs">◆</span>
                    <span className="text-sm">{feat}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed italic border-l-2 border-[#D4AF37]/30 pl-4">
                &ldquo;Designed to stand out in premium environments.&rdquo;
              </p>
              <p className="text-xs text-gray-500 bg-[#1a1a1a] border border-[#2a2a2a] rounded p-3">
                Available exclusively for institutional, event, and corporate
                bulk orders.
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  data-ocid="products.primary_button"
                  className="bg-[#D4AF37] hover:bg-[#e8cb6a] text-black font-bold px-8 py-5 tracking-wide"
                >
                  Request Bulk Quote
                </Button>
              </a>
            </Reveal>
            <Reveal className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-full blur-3xl scale-75" />
                <img
                  src="/assets/generated/hydroelite-bulk-bottle.dim_800x1000.png"
                  alt="HydroElite pH8+ Premium Alkaline Water Bottle"
                  className="relative z-10 max-h-[520px] w-auto object-contain bottle-glow"
                />
              </div>
            </Reveal>
          </div>

          {/* Product Cards Grid */}
          <div className="mt-20">
            <Reveal className="text-center mb-10">
              <p className="text-xs tracking-[0.4em] text-[#D4AF37] uppercase font-semibold">
                CHOOSE YOUR HYDRATION · ALL AVAILABLE FOR BULK ORDERS
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCT_CARDS.map((product, i) => (
                <Reveal
                  key={product.name}
                  delay={i * 100}
                  className="group relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Accent badge at top */}
                  {product.accentBadge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase text-white"
                        style={{
                          backgroundColor:
                            product.accentBadgeColor ?? undefined,
                        }}
                      >
                        {product.accentBadge}
                      </span>
                    </div>
                  )}

                  {/* Bottle image area */}
                  <div className="relative bg-[#111] flex items-center justify-center h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]/60" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative z-10 h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gold price pill */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
                      <span
                        className="text-xs font-bold px-3 py-1.5 rounded-full text-black tracking-wider"
                        style={{ backgroundColor: product.priceBadgeColor }}
                      >
                        {product.price}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5">
                    <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-1 font-semibold">
                      {product.category}
                    </p>
                    <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">{product.size}</p>
                    <ul className="space-y-1.5">
                      {product.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2 text-xs text-gray-400"
                        >
                          <span className="text-[#D4AF37] text-[10px]">◆</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="text-center mt-8" delay={300}>
              <p className="text-xs text-gray-500">
                ⚠️ Note: We accept bulk orders only. Single bottle purchases are
                not available.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bulk Ordering */}
      <section id="bulk-orders" className="py-24 px-4 sm:px-8 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-3">
              Volume Pricing
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white gold-line gold-line-center pb-4">
              Bulk Pricing Tiers
            </h2>
            <p className="text-gray-400 mt-6 text-sm">
              All pricing is custom — contact us for a tailored quote.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tier: "Starter",
                range: "100–500 Bottles",
                desc: "Perfect for events, small offices, and trial orders",
                features: [
                  "Competitive bulk pricing",
                  "Standard 3–5 day delivery",
                  "Quality certificate included",
                  "Dedicated order support",
                ],
                highlight: false,
                badge: null as string | null,
              },
              {
                tier: "Mid-Volume",
                range: "500–1,000 Bottles",
                desc: "Ideal for recurring corporate and hospitality orders",
                features: [
                  "Priority dispatch",
                  "Dedicated account support",
                  "Flexible payment terms",
                  "Custom label option available",
                ],
                highlight: true,
                badge: "Popular" as string | null,
              },
              {
                tier: "Enterprise",
                range: "1,000+ Bottles",
                desc: "Best value for large-scale institutional supply",
                features: [
                  "Best pricing guaranteed",
                  "Dedicated account manager",
                  "Priority SLA",
                  "Full custom branding available",
                ],
                highlight: false,
                badge: "Best Value" as string | null,
              },
            ].map((tier, i) => (
              <Reveal
                key={tier.tier}
                delay={i * 100}
                className={`relative rounded border p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  tier.highlight
                    ? "bg-[#1a1500] border-[#D4AF37] gold-glow"
                    : "bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#D4AF37]/40"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#D4AF37] text-black text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                      {tier.badge}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-xs text-[#D4AF37] tracking-widest uppercase mb-2">
                    {tier.tier}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    {tier.range}
                  </h3>
                  <p className="text-sm text-gray-400">{tier.desc}</p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-gray-300"
                    >
                      <span className="text-[#D4AF37] mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 text-center py-3 border-t border-[#2a2a2a] mb-4">
                  Contact for pricing
                </p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <Button
                    data-ocid={`bulk.request_quote.button.${i + 1}`}
                    className={`w-full font-semibold tracking-wide ${
                      tier.highlight
                        ? "bg-[#D4AF37] hover:bg-[#e8cb6a] text-black"
                        : "border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-black"
                    }`}
                  >
                    Request Quote
                  </Button>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10" delay={300}>
            <p className="text-sm text-gray-400">
              Custom pricing available for large orders.{" "}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:underline"
              >
                Contact us for enterprise rates →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Custom Branding */}
      <section id="branding" className="py-24 px-4 sm:px-8 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-3">
              White Label
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white gold-line gold-line-center pb-4">
              Private Label & Event Branding Available
            </h2>
            <p className="text-gray-400 mt-6 max-w-xl mx-auto">
              Make every bottle represent your brand.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: "🖨️",
                title: "Logo Printing",
                desc: "Your logo printed directly on bottles. High-resolution print for maximum brand impact.",
              },
              {
                icon: "📦",
                title: "Custom Packaging",
                desc: "Branded boxes and crates for a complete premium end-to-end presentation.",
              },
              {
                icon: "🎯",
                title: "Event Branding",
                desc: "Perfect for weddings, conferences, and product launches. Make your event unforgettable.",
              },
            ].map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 120}
                className="group bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#D4AF37]/50 rounded p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D4AF37]/10"
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12" delay={400}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                data-ocid="branding.primary_button"
                className="border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-black px-10 py-5 font-semibold tracking-wider"
              >
                Enquire About Custom Branding
              </Button>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-8 bg-[#111] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        </div>
        <Reveal className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="border border-[#D4AF37]/20 rounded-lg p-10 sm:p-14 bg-[#0a0a0a]/60">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-4">
              Let&apos;s Partner
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Looking for Bulk Supply?{" "}
              <span className="text-[#D4AF37]">Let&apos;s Work Together.</span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto mb-10">
              Join leading events, hotels, gyms, and corporates who trust
              HydroElite for premium hydration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  data-ocid="cta.primary_button"
                  className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#e8cb6a] text-black font-bold px-10 py-6 text-base tracking-wide shadow-xl shadow-[#D4AF37]/20"
                >
                  Request Bulk Quote
                </Button>
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  data-ocid="cta.whatsapp_button"
                  style={{ backgroundColor: "#25D366" }}
                  className="w-full sm:w-auto font-bold px-10 py-6 text-base tracking-wide text-white hover:opacity-90"
                >
                  💬 WhatsApp Us
                </Button>
              </a>
            </div>
            <p className="mt-6 text-xs text-gray-500">
              Response within 24 hours. Bulk orders only.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 sm:px-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-3">
              Reach Us
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white gold-line gold-line-center pb-4">
              Get in Touch
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(
              [
                {
                  icon: "📍",
                  label: "Address",
                  value: "New Friends Colony, New Delhi, 110025",
                  href: null,
                  green: false,
                  red: false,
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "officialhydroelite@gmail.com",
                  href: "mailto:officialhydroelite@gmail.com",
                  green: false,
                  red: false,
                },
                {
                  icon: "💬",
                  label: "WhatsApp",
                  value: "+91 9990768012",
                  href: WA_LINK,
                  green: true,
                  red: false,
                },
                {
                  icon: "📸",
                  label: "Instagram",
                  value: "@hydroelite_pvt",
                  href: "https://www.instagram.com/hydroelite_pvt/",
                  green: false,
                  red: true,
                },
              ] as const
            ).map((item) => (
              <Reveal
                key={item.label}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-6 text-center hover:border-[#D4AF37]/30 transition-colors"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-xs text-[#D4AF37] tracking-widest uppercase mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium transition-colors hover:underline ${
                      item.green
                        ? "text-[#25D366]"
                        : item.red
                          ? "text-[#E1306C]"
                          : "text-gray-300 hover:text-[#D4AF37]"
                    }`}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-gray-300">{item.value}</p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-[#1a1a1a] py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#D4AF37] mb-2">
                HydroElite
              </h3>
              <p className="text-xs text-gray-500 tracking-wider uppercase">
                Premium Alkaline Water | Bulk Supply Only
              </p>
              <div className="mt-4 inline-flex items-center gap-2 border border-red-500/40 rounded-full px-3 py-1">
                <a
                  href="https://www.instagram.com/hydroelite_pvt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#E1306C] hover:text-red-400 transition-colors font-medium"
                >
                  📸 @hydroelite_pvt
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-4">
                Quick Links
              </p>
              <div className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    type="button"
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="block text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-4">
                Legal
              </p>
              <div className="space-y-2">
                <LegalModal
                  trigger={
                    <button
                      type="button"
                      data-ocid="footer.privacy_button"
                      className="block text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                    >
                      Privacy Policy
                    </button>
                  }
                  title="Privacy Policy"
                  content={PRIVACY_POLICY}
                />
                <LegalModal
                  trigger={
                    <button
                      type="button"
                      data-ocid="footer.terms_button"
                      className="block text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                    >
                      Terms &amp; Conditions
                    </button>
                  }
                  title="Terms & Conditions"
                  content={TERMS_CONDITIONS}
                />
                <LegalModal
                  trigger={
                    <button
                      type="button"
                      data-ocid="footer.about_button"
                      className="block text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                    >
                      About Us
                    </button>
                  }
                  title="About HydroElite"
                  content={ABOUT_US}
                />
              </div>
            </div>
          </div>
          <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-600">
                © {new Date().getFullYear()} HydroElite. All rights reserved.
              </p>
              <p className="text-xs text-[#D4AF37]/40 mt-1 tracking-wide">
                🚫 Bulk Orders Only – No Single Bottle Sales
              </p>
            </div>
            <div className="flex items-center gap-4">
              <FeedbackModal />
              <span className="text-gray-700">|</span>
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
              >
                Built with ❤️ using caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="floating.whatsapp_button"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
        title="WhatsApp Us for Bulk Orders"
        aria-label="WhatsApp Us for Bulk Orders"
      >
        <span className="sr-only">WhatsApp Us for Bulk Orders</span>
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
