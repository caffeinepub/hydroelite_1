import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

// ── SVG Icons ──────────────────────────────────────────────────────────────
function DropletIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A84C"
      strokeWidth="1.5"
      role="img"
      aria-label="Alkaline balance droplet icon"
    >
      <title>Alkaline Balance</title>
      <path d="M12 2C6 10 4 14 4 16a8 8 0 0016 0c0-2-2-6-8-14z" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A84C"
      strokeWidth="1.5"
      role="img"
      aria-label="Hydration wave icon"
    >
      <title>Optimal Hydration</title>
      <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
      <path d="M2 17c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A84C"
      strokeWidth="1.5"
      role="img"
      aria-label="Purity shield icon"
    >
      <title>Unmatched Purity</title>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A84C"
      strokeWidth="1.5"
      role="img"
      aria-label="Minerals sparkle icon"
    >
      <title>Essential Minerals</title>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label="WhatsApp"
    >
      <title>WhatsApp</title>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "#hero" },
    { label: "OUR WATER", href: "#features" },
    { label: "PRODUCTS", href: "#products" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      style={{ borderBottom: scrolled ? "1px solid #2A2B2E" : "none" }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-xl md:text-2xl tracking-widest font-semibold text-gold"
          data-ocid="nav.link"
        >
          HYDROELITE
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs tracking-widest text-[#B8B8B8] hover:text-gold transition-colors duration-200 font-medium"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/919999999999?text=I%20want%20to%20order%20HydroElite%20500ml%20water%20bottle"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 border border-gold text-gold text-xs tracking-widest px-5 py-2.5 hover:bg-gold hover:text-black transition-all duration-300"
          data-ocid="nav.primary_button"
        >
          ORDER NOW
        </a>

        <button
          className="lg:hidden text-gold p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
          type="button"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-[#2A2B2E] px-6 py-6"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm tracking-widest text-[#B8B8B8] hover:text-gold transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="https://wa.me/919999999999?text=I%20want%20to%20order%20HydroElite%20500ml%20water%20bottle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border border-gold text-gold text-xs tracking-widest px-5 py-2.5 hover:bg-gold hover:text-black transition-all"
                  data-ocid="nav.primary_button"
                >
                  ORDER NOW
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-water-bg.dim_1920x1080.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.65)" }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="text-xs tracking-ultra text-gold mb-6 md:mb-8 font-sans">
            PREMIUM WATER
          </p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] leading-none tracking-widest font-bold text-gold mb-6">
            HYDROELITE
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-base md:text-xl font-light tracking-widest text-[#B8B8B8] mb-10 md:mb-14"
        >
          Pure Hydration. Elite Performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#products"
            className="border border-gold text-gold text-xs tracking-widest px-10 py-4 hover:bg-gold hover:text-black transition-all duration-300 font-medium"
            data-ocid="hero.primary_button"
          >
            EXPLORE THE ELITE
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 text-[#B8B8B8] text-xs tracking-widest hover:text-gold transition-colors"
            data-ocid="hero.secondary_button"
          >
            DISCOVER MORE <ChevronDown size={14} className="animate-bounce" />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent opacity-60" />
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────
const features = [
  {
    icon: <DropletIcon />,
    title: "ALKALINE BALANCE",
    desc: "High pH 8.5+ for optimal body balance and peak metabolic performance.",
  },
  {
    icon: <WaveIcon />,
    title: "OPTIMAL HYDRATION",
    desc: "Enhanced molecular structure for faster cellular absorption.",
  },
  {
    icon: <ShieldIcon />,
    title: "UNMATCHED PURITY",
    desc: "7-stage filtration process removing 99.99% of contaminants.",
  },
  {
    icon: <SparkleIcon />,
    title: "ESSENTIAL MINERALS",
    desc: "Naturally sourced trace minerals for complete nourishment.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-24 md:py-32"
      style={{ background: "#111214" }}
      data-ocid="features.section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs tracking-ultra text-gold mb-4">
            EXCELLENCE IN EVERY DROP
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-widest text-[#F2F2F2] font-semibold">
            THE HYDROELITE DIFFERENCE
          </h2>
          <div className="mt-6 mx-auto w-16 h-px bg-gold opacity-60" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="relative px-8 py-10 text-center group"
              style={{
                borderLeft: i > 0 ? "1px solid #2A2B2E" : undefined,
                borderTop: "1px solid #2A2B2E",
              }}
              data-ocid={`features.item.${i + 1}`}
            >
              <div className="mb-5 flex justify-center">
                <div className="p-3 border border-[#2A2B2E] group-hover:border-gold transition-colors duration-300">
                  {f.icon}
                </div>
              </div>
              <h3 className="text-xs tracking-widest text-[#F2F2F2] font-semibold mb-3">
                {f.title}
              </h3>
              <p className="text-[13px] text-[#B8B8B8] leading-relaxed font-light">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Product ───────────────────────────────────────────────────────────────────
function Product() {
  return (
    <section
      id="products"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0B0B0C 0%, #111214 50%, #0B0B0C 100%)",
      }}
      data-ocid="products.section"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C9A84C, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs tracking-ultra text-gold mb-4">
            OUR COLLECTION
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-widest text-[#F2F2F2] font-semibold">
            PRODUCT SHOWCASE
          </h2>
          <div className="mt-6 mx-auto w-16 h-px bg-gold opacity-60" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, #C9A84C, transparent 70%)",
                }}
              />
              <img
                src="/assets/generated/hydroelite-bottle-transparent.dim_600x900.png"
                alt="HydroElite 500ml Premium Water Bottle"
                className="relative bottle-glow max-h-96 md:max-h-[500px] w-auto object-contain"
                data-ocid="products.card"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-xs tracking-ultra text-gold mb-3">
                PREMIUM HYDRATION
              </p>
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-widest text-[#F2F2F2] font-semibold leading-tight">
                HYDROELITE
                <br />
                PREMIUM WATER
              </h3>
            </div>

            <div className="w-12 h-px bg-gold opacity-50" />

            <p className="text-[#B8B8B8] text-sm tracking-widest font-light">
              500ml Glass Bottle
            </p>

            <p className="font-display text-4xl md:text-5xl text-gold font-bold tracking-wide">
              ₹40
            </p>

            <ul className="flex flex-col gap-3 text-[13px] text-[#B8B8B8]">
              {[
                "pH 8.5+ Alkaline Water",
                "7-Stage Filtration Process",
                "BPA-Free Premium Glass",
                "Naturally Sourced Minerals",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href="https://wa.me/919999999999?text=I%20want%20to%20order%20HydroElite%20500ml%20water%20bottle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gold text-black text-xs tracking-widest px-8 py-4 hover:bg-gold-light transition-all duration-300 font-semibold"
                data-ocid="products.primary_button"
              >
                <WhatsAppIcon />
                ORDER ON WHATSAPP
              </a>
              <button
                type="button"
                className="border border-[#2A2B2E] text-[#B8B8B8] text-xs tracking-widest px-8 py-4 hover:border-gold hover:text-gold transition-all duration-300"
                data-ocid="products.secondary_button"
              >
                SHOP NOW
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C9A84C, transparent)",
        }}
      />
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      style={{ background: "#111214" }}
      data-ocid="contact.section"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-xs tracking-ultra text-gold mb-4">GET IN TOUCH</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-widest text-[#F2F2F2] font-semibold mb-4">
            CONNECT WITH HYDROELITE
          </h2>
          <p className="text-xs tracking-widest text-gold mb-10">
            NEW DELHI HEAD OFFICE
          </p>
          <div className="w-16 h-px bg-gold opacity-50 mx-auto mb-14" />

          <div className="flex flex-col gap-6 mb-14">
            <div className="flex items-center justify-center gap-4 text-[#B8B8B8] text-sm">
              <MapPin size={16} className="text-gold flex-shrink-0" />
              <span>Connaught Place, New Delhi — 110001, India</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-[#B8B8B8] text-sm">
              <Mail size={16} className="text-gold flex-shrink-0" />
              <a
                href="mailto:hello@hydroelite.in"
                className="hover:text-gold transition-colors"
              >
                hello@hydroelite.in
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 text-[#B8B8B8] text-sm">
              <Phone size={16} className="text-gold flex-shrink-0" />
              <a
                href="tel:+919999999999"
                className="hover:text-gold transition-colors"
              >
                +91 99999 99999
              </a>
            </div>
          </div>

          <a
            href="https://wa.me/919999999999?text=Hello%20HydroElite%2C%20I%20would%20like%20to%20know%20more"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold text-black text-xs tracking-widest px-10 py-4 hover:bg-gold-light transition-all duration-300 font-semibold"
            data-ocid="contact.primary_button"
          >
            <WhatsAppIcon />
            ORDER ON WHATSAPP
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "hydroelite.in";

  return (
    <footer
      className="py-14 border-t"
      style={{ background: "#0B0B0C", borderColor: "#2A2B2E" }}
      data-ocid="footer.section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="font-display text-2xl tracking-widest font-semibold text-gold">
              HYDROELITE
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#B8B8B8] hover:text-gold transition-colors"
                data-ocid="footer.link"
              >
                <SiInstagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#B8B8B8] hover:text-gold transition-colors"
                data-ocid="footer.link"
              >
                <SiFacebook size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-[#B8B8B8] hover:text-gold transition-colors"
                data-ocid="footer.link"
              >
                <SiX size={16} />
              </a>
            </div>
          </div>

          <ul className="flex items-center gap-6 flex-wrap justify-center">
            {["HOME", "OUR WATER", "PRODUCTS", "CONTACT"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-xs tracking-widest text-[#B8B8B8] hover:text-gold transition-colors"
                  data-ocid="footer.link"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#B8B8B8]"
          style={{ borderTop: "1px solid #2A2B2E" }}
        >
          <span>&copy; {year} HydroElite. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: "#0B0B0C", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Product />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
