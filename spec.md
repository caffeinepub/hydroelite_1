# HydroElite – B2B Bulk Supply Landing Page

## Current State
The existing site is a retail-focused product showcase with individual product cards (₹10, ₹20, ₹65 bottles), a founder section, comparison panel, feedback form, and consumer-facing content. It needs to be completely replaced with a B2B bulk supply landing page.

## Requested Changes (Diff)

### Add
- New Hero section: headline "HydroElite – Premium Alkaline Water, Exclusively for Bulk & Institutional Supply", subheading about trusted partners, two CTAs ("Request Bulk Quote" / "Contact Us"), note "Bulk orders only. No retail sales."
- Who We Serve section: 5 cards (Events & Weddings, Corporate Offices, Gyms & Fitness Centers, Hotels & Cafes, Distributors) with icons
- Why Choose HydroElite section: 5 features (Balanced Alkaline Water, Premium Black Bottle Design, Bulk Supply Capability, Consistent Quality, Custom Branding Available)
- Product Showcase section: premium black bottle visual, text "Designed to stand out in premium environments.", bulk orders only note
- Bulk Ordering / Pricing Tiers section: 3 tiers (100-500, 500-1000, 1000+), "Custom pricing available for large orders"
- Custom Branding section: title "Private Label & Event Branding Available", Logo Printing, Custom Packaging, Event Branding
- Final CTA section: "Looking for Bulk Supply? Let's Work Together.", buttons for Request Bulk Quote and WhatsApp Us (+91 9990768012)
- Sticky nav with HydroElite logo and CTA
- Contact section with WhatsApp, email, address
- Footer with legal links (Privacy Policy, Terms & Conditions, About Us) and social links
- "Bulk Orders Only – No Single Bottle Sales" note visible throughout

### Modify
- Replace entire App.tsx with new B2B landing page
- Keep existing backend feedback system intact

### Remove
- All retail product cards (₹10, ₹20, ₹65 individual sale)
- Founder section
- Comparison panel
- Consumer-facing hero content
- Lemon+ and any flavored range references
- Distributor recruitment section (replaced with serving distributors)

## Implementation Plan
1. Rewrite App.tsx completely as a single-page B2B landing page with all 7 sections
2. Use dark black/charcoal backgrounds with gold (#D4AF37 / #C9A84C) accents throughout
3. Smooth scroll animations using CSS transitions/Intersection Observer
4. Two generated images: single premium black bottle + bulk supply group shot
5. All CTAs link to WhatsApp (+91 9990768012) or scroll to contact section
6. Preserve existing legal popup content in footer
7. Keep feedback backend call intact (optional feedback button in footer)
