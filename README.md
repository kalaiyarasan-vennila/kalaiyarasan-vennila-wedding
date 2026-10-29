# Kalaivarasan & Vennila — merged wedding website

This is the existing React + Vite wedding project with the original curtain-opening intro and landing page retained. The additional custom invitation message, Festivities cards, and responsive countdown sections have been added after the original landing hero. The existing Story, Events, Countdown, Marquee, Gallery, Wishes, Footer, music control, navigation, and cursor components are retained after those new sections.

## Run locally

1. Extract this folder and open it in VS Code.
2. Open a terminal in this folder (the folder containing `package.json`).
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite.

## Added sections

- Invitation message with falling petals and separate desktop/mobile backgrounds.
- Festivities section using the Wedding Ceremony and Reception card artwork. Each card links to a Google Maps search.
- Live countdown to **12 November 2026 at 10:00 AM IST**.
- Mobile responsive layout for the new sections.

## Important files

- `src/components/Curtain.jsx` — original interactive curtain opening.
- `src/components/Hero.jsx` — original landing hero.
- `src/components/CustomInvitationSections.jsx` — added invitation, festivities, and countdown sections.
- `src/styles.css` — original styles plus the new responsive styles.
- `public/assets/` — images used by the added sections.

The new sections were inserted without deleting the original React sections. This intentionally keeps the existing Events and Countdown components as well, so the page includes both the new custom sections and the original components.


## Wedding interactions added
- **Shower your blessings:** tap the heart for a quick shower, or press and hold to fill the ring and shower falling hearts. Blessing counts are stored in this browser.
- **A little fun:** a responsive wedding-themed memory matching game with six pairs and a play-again button.
- **Wedding song:** use the floating music button after opening the invitation to open the YouTube player for `Y0TFzpRodnw`. Press play in the player; browsers often block automatic audio playback until the visitor interacts.


## Latest additions
- Added the supplied wedding invite and reception card images to the festivities section.
- Added the supplied `public/assets/wedding-song.mp3` soundtrack.
- Music starts with a gradual fade-in when the visitor opens/pulls the curtain; guests can pause or resume it with the floating music button.
- Removed the top navigation bar as requested.
- Browser autoplay restrictions mean the first playback begins from the visitor's curtain interaction.
