# Flyinglyte · Model2

Independent travel agency concept with Home (`/`), Flights (`/flights`) and Hotels (`/hotels`). Navigation retains Packages, About Us and Contact Us. Ivory / forest green / coral design, responsive layouts, persistent light/dark toggle, destination filters, saved favourites for the current session, accessible native enquiry dialog and search planning previews.

About Us (`/about`) includes an animated introduction, agency philosophy, mission, values, planning approach and contact invitation. Photos are travel inspiration, not employee portraits. Founder biographies, team details, business milestones, 24/7 support and partnership claims need verified business information before publication. The brand intro runs on document load/reload only; internal Home, logo and page links navigate without reloading the document.

Run `npm install`, then `npm run dev`. Production: `npm run build` and `npm run preview`. On PowerShell with script restrictions, use `npm.cmd` instead of `npm`.

Motion: short, skippable Flyinglyte intro on initial load; client-side page transitions with browser Back/Forward support; floating photo collage and pointer-driven 3D package cards. Click package/stay images to open the keyboard-accessible photo viewer, to see the full photo fitted to the screen without scrolling. The top-right close button or Escape closes the viewer. Reduced-motion preferences disable decorative animation and shorten the intro.

Prices and travel suggestions are illustrative. Search does not query live inventory, enquiry forms do not transmit or save personal information, and no bookings or payments are processed. Images load from Unsplash and fonts from Google Fonts; internet access is needed for these assets. Connect real travel inventory and an enquiry backend before using this for bookings.

## Source structure

Following Model1's organization:

- `src/main.jsx`: React entry point and global styles.
- `src/App.jsx`: routing, transitions and shared application state.
- `src/pages/`: Home, Flights, Hotels and About pages. Flights and Hotels reuse the shared travel layout in HomePage.
- `src/components/`: navigation, footer, dialogs, artwork and package components, with their existing component styles.
- `src/components/home/`: hero, booking, destinations, about, FAQ and other travel page sections.
- `src/data/`: destination, stay and popular package data.
- `src/hooks/`: theme hook.
- `src/theme/`: theme persistence and application helpers.
- `src/utils/`: image URLs and pointer motion helpers.
