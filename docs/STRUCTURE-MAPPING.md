# Model2 structure alignment

Only model2 is refactored. FlyingLyte production is a read-only reference. Matching filenames do not make these donor components interchangeable with production.

## Path mapping

All paths below are relative to src/.

| Old path | New path |
| --- | --- |
| `pages/HomePage.jsx` | `Pages/Home.jsx` |
| `pages/FlightsPage.jsx` | `Pages/FlightsPage.jsx` |
| `pages/HotelsPage.jsx` | `Pages/HotelsPage.jsx` |
| `pages/AboutPage.jsx` | `components/Home/AboutUs.jsx` |
| `pages/PackagesPage.jsx` | `modules/packages/PackageSection.jsx` |
| `components/Navbar.jsx` | `components/Home/Navbar.jsx` |
| `components/Footer.jsx` | `components/Home/Footer/Footer.jsx` |
| `components/home/HeroSection.jsx` | `components/Home/HeroSection.jsx` |
| `components/home/AboutSection.jsx` | `components/Home/AboutSection.jsx` |
| `components/home/ValuesSection.jsx` | `components/Home/ValuesSection.jsx` |
| `components/home/DestinationsSection.jsx` | `components/Home/DestinationsSection.jsx` |
| `components/home/StepsSection.jsx` | `components/Home/StepsSection.jsx` |
| `components/home/EscapeSection.jsx` | `components/Home/CTASection.jsx` |
| `components/HeroArtwork.jsx` | `components/Home/HeroArtwork.jsx` |
| `components/HangingTag.jsx` | `components/Home/HangingTag.jsx` |
| `components/home/FaqSection.jsx` | `components/common/FaqSection.jsx` |
| `components/EnquiryModal.jsx` | `components/common/TripEnquiryPopup.jsx` |
| `components/DepthMotion.jsx` | `components/common/DepthMotion.jsx` |
| `components/SocialRail.jsx` | `components/common/SocialRail.jsx` |
| `components/home/BookingSection.jsx` | `modules/Search/SearchBox.jsx` |
| `components/home/SearchResultsSection.jsx` | `modules/Search/SearchResultsPreview.jsx` |
| `components/PopularPackages.jsx` | `modules/packages/PopularPackages.jsx` |
| `components/PackageImageZoom.jsx` | `modules/packages/PackageImageZoom.jsx` |
| `data/packages.js` | `data/demo/packages.js` |
| `data/trips.js` | `data/demo/trips.js` |
| `style.css` | `index.css` |
| `pages/about.css` | `components/Home/about.css` |
| `pages/packages-page.css` | `modules/packages/packages-page.css` |
| `components/packages.css` | `modules/packages/packages.css` |
| `components/depth.css` | `components/common/depth.css` |
| `components/social.css` | `components/common/social.css` |
| `components/home/escape-planner.css` | `components/Home/escape-planner.css` |

## Final source tree

```text
src/
  App.jsx
  Pages/FlightsPage.jsx
  Pages/Home.jsx
  Pages/HotelsPage.jsx
  assets/domestic-international-hero.png
  components/Home/AboutSection.jsx
  components/Home/AboutUs.jsx
  components/Home/CTASection.jsx
  components/Home/DestinationsSection.jsx
  components/Home/Footer/Footer.jsx
  components/Home/HangingTag.jsx
  components/Home/HeroArtwork.jsx
  components/Home/HeroSection.jsx
  components/Home/Navbar.jsx
  components/Home/StepsSection.jsx
  components/Home/ValuesSection.jsx
  components/Home/about.css
  components/Home/escape-planner.css
  components/common/DepthMotion.jsx
  components/common/FaqSection.jsx
  components/common/SocialRail.jsx
  components/common/TripEnquiryPopup.jsx
  components/common/depth.css
  components/common/social.css
  data/demo/packages.js
  data/demo/trips.js
  hooks/useSmoothScroll.js
  hooks/useTheme.js
  index.css
  main.jsx
  modules/Search/SearchBox.jsx
  modules/Search/SearchResultsPreview.jsx
  modules/packages/PackageDeck.jsx
  modules/packages/PackageImageZoom.jsx
  modules/packages/PackageSection.jsx
  modules/packages/PopularPackages.jsx
  modules/packages/packages-page.css
  modules/packages/packages.css
  motion.css
  theme/config.js
  utils/images.js
  utils/motion.js
```

## Component names

- HomePage → Home
- AboutPage → AboutUs
- PackagesPage → PackageSection
- EscapeSection → CTASection
- BookingSection → SearchBox
- EnquiryModal → TripEnquiryPopup
- SearchResultsSection → SearchResultsPreview

AboutSection remains the homepage teaser; AboutUs is the complete About page. PopularPackages remains the homepage package section; PackageSection is the full packages page. FlightsPage and HotelsPage still forward all props to Home.

## Preserved component contracts

The structure-only refactor preserved props, callbacks, defaults, component bodies and state logic. The table reflects the current contracts after the requested UI changes described below.

| Source path | Exported signature |
| --- | --- |
| `App.jsx` | `App()` |
| `components/common/DepthMotion.jsx` | `MotionCard({children,index,...props})` |
| `components/common/DepthMotion.jsx` | `EscapeArtwork()` |
| `components/common/TripEnquiryPopup.jsx` | `TripEnquiryPopup({modal,setModal,sent,setSent,dialog})` |
| `components/Home/Footer/Footer.jsx` | `Footer({enquire})` |
| `components/Home/HangingTag.jsx` | `HangingTag({ready})` |
| `components/Home/HeroArtwork.jsx` | `HeroArtwork({isHome,isFlights,ready})` |
| `components/Home/AboutSection.jsx` | `AboutSection({intro,enquire})` |
| `modules/Search/SearchBox.jsx` | `SearchBox({page,isFlights,find})` |
| `components/Home/DestinationsSection.jsx` | `DestinationsSection({page,filter,setFilter,saved,setSaved,setZoom,enquire})` |
| `components/Home/CTASection.jsx` | `CTASection({enquire})` |
| `components/common/FaqSection.jsx` | `FaqSection({faq,setFaq})` |
| `components/Home/HeroSection.jsx` | `HeroSection({isHome,isFlights,page,intro})` |
| `modules/Search/SearchResultsPreview.jsx` | `SearchResultsPreview({search,isFlights,page,enquire})` |
| `components/Home/StepsSection.jsx` | `StepsSection({})` |
| `components/Home/ValuesSection.jsx` | `ValuesSection({})` |
| `components/Home/Navbar.jsx` | `Navbar({page,menu,setMenu,theme,setTheme,enquire})` |
| `modules/packages/PackageImageZoom.jsx` | `PackageImageZoom({place,onClose})` |
| `modules/packages/PopularPackages.jsx` | `PopularPackages({enquire,onZoom})` |
| `modules/packages/PackageDeck.jsx` | `PackageDeck({items,resetKey,enquire,onZoom})` |
| `components/common/SocialRail.jsx` | `SocialRail({page,ready=true})` |
| `components/Home/AboutUs.jsx` | `AboutUs({enquire,ready})` |
| `Pages/FlightsPage.jsx` | `FlightsPage(props)` |
| `Pages/Home.jsx` | `Home({isHome,isFlights,page,intro,find,search,enquire,filter,setFilter,saved,setSaved,setZoom,faq,setFaq})` |
| `Pages/HotelsPage.jsx` | `HotelsPage(props)` |
| `modules/packages/PackageSection.jsx` | `PackageSection({enquire,setZoom})` |

TripEnquiryPopup retains modal, setModal, sent, setSent and dialog, including the native dialog ref, focus restoration and local sent state. It does not adopt the production prop contract. Routing, popstate handling, hash navigation and application state remain in App.jsx; no React Router or new stores were added.

## Demo-only behavior

- SearchResultsPreview still displays “Planning preview · No live availability or booking is connected.” Search uses local form state, with no inventory API.
- Destination, stay and package fixtures are under data/demo/. Prices and suggestions remain illustrative.
- Enquiry forms keep the existing local donor behavior; they do not transmit or persist enquiries. There is no booking, authentication or payment integration.
- Saved destinations remain session state. Theme persistence retains the existing implementation.

## Later FlyingLyte integration

- Adapt donor and production prop contracts explicitly before replacing components. Names alone do not establish compatibility.
- Keep production API, authentication, booking, payment and store integration as separate work.
- index.css is the unchanged former style.css; motion.css stays in place. Feature CSS moved with its components. Import declaration order and the module dependency graph are preserved, retaining stylesheet loading order.
- All CSS remains global: resets, generic selectors, theme variables, media queries and animation names can collide with production CSS. Audit cascade/order and selector conflicts before integration; do not assume feature placement provides CSS isolation.
- The structure-only refactor preserved CSS bytes, fonts, URLs, selectors, responsive overrides and animation timings. Subsequent requested UI adjustments are described below. The existing global stylesheet was not split or scoped. External Unsplash images and Google Fonts still need network access.
- Keep the exact capitalization Pages, components/Home, modules/Search and modules/packages on case-sensitive systems.

## Verification

- Baseline production build: passed using npm.cmd run build (PowerShell blocks npm.ps1).
- Structure-only production build: passed (1,612 modules). At that stage, generated JavaScript, CSS and image bundle filenames and sizes matched baseline, and the generated CSS SHA-256 hash was identical.
- A temporary refactor script verified unchanged CSS/data/assets byte for byte and resolved all relative imports using exact on-disk capitalization; the script was removed after verification.
- git diff --check and git diff --cached --check passed. Case-only renames were recorded with git mv via temporary paths; those eight renames are staged, with other edits left unstaged.
- flying_lyte-main status is unchanged from baseline: its pre-existing modified src/App.jsx and untracked src/Pages/AdsTravelLanding.jsx were left untouched.
- Browser checks were unavailable during the structure-only refactor. A local headless Chrome session was subsequently used to validate the requested UI changes below; the full original route/navigation/search checklist has not been exercised.
- No lint or test scripts are defined in package.json. No dependencies were added or upgraded.

## Requested UI adjustments after structure alignment

- The homepage About photograph's hanging tag is smaller below 761px, with proportional padding, text and hanging cord. At 390px the tag measures approximately 191 by 88px instead of 241 by 126px. Desktop tag dimensions are unchanged.
- PopularPackages and PackageSection now use the same PackageDeck markup, responsive styles, swipe handling, arrows, dots, keyboard navigation, photo zoom and enquiry callbacks. Mobile shows a fanned playing-card deck; larger screens retain the packages page's two-column grid.
- PopularPackages no longer needs the old onTilt/onLeave callbacks. Category filters remain local to each page; the deck resets when category, search, sorting or the mobile breakpoint changes. The obsolete homepage-only card CSS was removed.
- Headless Chrome validation passed 48 checks: matching card layouts on both pages at 320, 390, 430, 760, 768 and 1440px; mobile tag limits and unchanged desktop tag sizing; no homepage horizontal overflow; next/previous/dot/keyboard/touch navigation; filters, zoom, enquiry, dark theme, breakpoint resizing, package search/empty state/sorting, and animated card transitions. No browser runtime exceptions were recorded.
- External Unsplash photos did not load in the sandbox browser, so screenshots verified layout with missing image placeholders. Full visual parity with loaded photographs/fonts is not established.
- The final production build passed with 1,613 modules. No packages were added. Only model2 was modified.
