---
name: Obsidian Alabaster Editorial
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#45474a'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#76777b'
  outline-variant: '#c6c6ca'
  surface-tint: '#5d5e62'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1a1c1f'
  on-primary-container: '#838488'
  inverse-primary: '#c6c6ca'
  secondary: '#5c5e66'
  on-secondary: '#ffffff'
  secondary-container: '#e0e2ec'
  on-secondary-container: '#62646d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#161c27'
  on-tertiary-container: '#7f8492'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e6'
  primary-fixed-dim: '#c6c6ca'
  on-primary-fixed: '#1a1c1f'
  on-primary-fixed-variant: '#45474a'
  secondary-fixed: '#e0e2ec'
  secondary-fixed-dim: '#c4c6d0'
  on-secondary-fixed: '#191c22'
  on-secondary-fixed-variant: '#44474f'
  tertiary-fixed: '#dee2f2'
  tertiary-fixed-dim: '#c2c6d6'
  on-tertiary-fixed: '#161c27'
  on-tertiary-fixed-variant: '#424753'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '500'
    lineHeight: 76px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 52px
    fontWeight: '500'
    lineHeight: 58px
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-tablet: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system establishes a high-end, editorial aesthetic tailored for creator studio platforms, talent agencies, and creative production suites. It balances the austerity of fine art publishing with the functional precision of modern software.

The target audience comprises elite digital creators, filmmakers, creative directors, and boutique agency founders who value restraint, clarity, and visual impact. The interface intentionally steps back to allow creator media, photography, and video assets to command absolute attention.

The visual style is **Luxury Minimalist with Architectural Framing**. Characterized by expansive negative space, razor-sharp hairline borders, surgical typography hierarchy, and deliberate optical balance. Tactile micro-interactions and whisper-thin outlines replace heavy ornamentation or skeuomorphism.

## Colors

The palette is an intentional, high-restraint composition governed by optical tension between deep charcoal blacks and luminous warm whites.

- **Primary (`#0e1013`)**: Obsidian Black. Applied to dominant headlines, primary call-to-actions, solid state indicators, and key structural marks.
- **Secondary (`#1a1d24`)**: Deep Charcoal. Used for interactive states, inverted card surfaces, sub-headers, and elevated dark elements.
- **Tertiary (`#717684`)**: Polished Slate. Dedicated to secondary body copy, metadata, timestamps, and subtle instructional text.
- **Neutral (`#fbfbfb`)**: Warm Alabaster canvas. Provides an airy, gallery-like ambient backdrop that avoids the sterile, harsh glare of pure `#ffffff`.

### Functional Substrates & Dividers
- **Canvas Base**: `#fbfbfb`
- **Surface Layer 1 (Cards, panels)**: `#ffffff`
- **Surface Layer 2 (Muted blocks, pill tags)**: `#f3f3f5`
- **Hairline Borders & Delimiters**: `#e5e5ea` (primary border), `#f0f0f2` (subtle inner border)
- **Active Focus Ring**: `#0e1013` with 15% opacity spread

## Typography

The typographic hierarchy pairs the structured, sculptural rhythm of **Space Grotesk** for display headers with the balanced geometric clarity of **Plus Jakarta Sans** for running body copy and interface labels.

### Rules of Usage
- **Display & Headlines**: Always render in tight tracking (`-0.01em` to `-0.03em`) and constrained weights (Medium/500). Avoid heavy weights (700+) to maintain an airy editorial feel.
- **Labels & Micro-copy**: Rendered in uppercase with generous tracking (`0.06em` to `0.08em`) to act as architectural indicators, status badges, and section categorizers.
- **Editorial Lead Paragraphs**: Large narrative intros should use `body-lg` set against `#1a1d24` with generous line-height (`28px`) for effortless eye traversal across wide columns.

## Layout & Spacing

The layout model is built on an architectural 12-column fluid grid system bounded by maximum content boundaries (1360px) to preserve editorial readability.

### Breakpoint Matrix
- **Desktop (1280px+)**: 12 columns, `1.5rem` (24px) gutters, `4rem` (64px) screen margins.
- **Tablet (768px - 1279px)**: 8 columns, `1.5rem` (24px) gutters, `2rem` (32px) screen margins.
- **Mobile (< 768px)**: 4 columns, `1rem` (16px) gutters, `1.25rem` (20px) screen margins.

### Spacing Philosophy
Negative space functions as an active structural material rather than empty canvas. Generous vertical intervals (`space-xl` and above) bracket major storytelling modules, media reels, and metric highlights. Internal card padding maintains a strict 1.5:1 ratio between vertical and horizontal padding, creating grounded rectangular containment.

## Elevation & Depth

This design system rejects heavy drop shadows in favor of architectural **surface layering and calibrated hairline boundaries**.

### The Stratification Model
- **Base Canvas**: Fixed at `#fbfbfb`.
- **Level 1 (Card & Module Containers)**: Rendered in `#ffffff` framed by a 1px solid border of `#e5e5ea`. No drop shadow.
- **Level 2 (Dropdowns, Floating Toolbars & Dialogs)**: Pure `#ffffff` framed with a 1px `#e5e5ea` border paired with an ultra-diffused atmospheric shadow: `0 12px 32px -4px rgba(14, 16, 19, 0.04), 0 4px 12px -2px rgba(14, 16, 19, 0.02)`.
- **Level 3 (Image Viewports & Creator Showcases)**: Framed with a 1px inset boundary of `rgba(255, 255, 255, 0.2)` over dark media assets or `rgba(14, 16, 19, 0.06)` over light media assets.

Hover interactions shift the stroke color from `#e5e5ea` to `#0e1013` rather than lifting the element via Z-axis shadow expansion, maintaining a grounded editorial plane.

## Shapes

The design system adheres to a crisp, semi-structured geometric aesthetic using **Level 1 (Soft)** rounding.

- **Base Radius (`0.25rem` / 4px)**: Applied to input elements, dropdown triggers, and micro status chips.
- **Card & Media Container Radius (`rounded-lg` / 8px)**: Applied to portfolio tiles, feature highlights, and content modules.
- **Modal & Surface Radius (`rounded-xl` / 12px)**: Applied to dialog windows, drawer panels, and primary media players.
- **Full Radius (`pill`)**: Reserved solely for small category badges, verified status chips, and avatar cutouts.

All strokes remain consistent at 1px thickness; 2px strokes are reserved exclusively for keyboard focus states.

## Components

### Buttons
- **Primary**: Background `#0e1013`, text `#fbfbfb`, 1px border `#0e1013`. Hover shifts background to `#1a1d24`. Padding: `0.75rem 1.75rem`. Typography: `label-md`.
- **Secondary / Outline**: Background transparent, text `#0e1013`, 1px border `#e5e5ea`. Hover shifts background to `#f3f3f5` and border to `#0e1013`.
- **Tertiary / Ghost**: Background transparent, text `#717684`, no border. Hover shifts text color to `#0e1013`.

### Cards & Studio Tiles
- Surfaces sit on `#ffffff` with a uniform 1px `#e5e5ea` border.
- Hover states transition the border to `#0e1013` over a 200ms ease curve.
- Internal padding spans `1.75rem` (28px) on desktop, scaling to `1.25rem` (20px) on mobile.

### Input Fields
- Background `#ffffff`, text `#0e1013`, placeholder `#717684`.
- 1px border in `#e5e5ea`. Height: 44px. Internal horizontal padding: `1rem`.
- Active focus state introduces a sharp 1px `#0e1013` border accompanied by an ambient `0 0 0 3px rgba(14, 16, 19, 0.06)` outer glow.

### Chips & Metadata Tags
- Height: 24px. Padding: `0 0.625rem`.
- Background `#f3f3f5`, text `#0e1013`, border 1px solid `#e5e5ea`.
- Typography: `label-sm` with full uppercase tracking.

### Checkboxes & Radio Elements
- 18px by 18px bounds. 1px solid `#e5e5ea` border with a `#ffffff` center.
- Checked state fills the box with `#0e1013` featuring an off-white `#fbfbfb` inner icon.

### Studio-Specific Components
- **Media Asset Banner**: Ratio 16:9 or 4:5 framed by a 1px border `#e5e5ea`, accompanied by an integrated floating metadata strip anchored to the bottom edge.
- **Metric Marquee**: Monospaced tabular numeral displays paired with `label-sm` uppercase tags, divided by 1px vertical `#e5e5ea` rules.