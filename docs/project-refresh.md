# Project refresh — 2 October 2026

The featured list balances engineering scope, visual design, and how clearly a visitor can explore each product. The ordering is editorial rather than a score:

1. **nayaPoca** — the broadest product: a virtualized, faceted catalog, collections, 3D viewing, browser-side recognition, and contribution/moderation workflows.
2. **naya/bio** — a complete publishing product with a block editor, live previews, theme design, autosave, undo/redo, authentication, and shareable pages.
3. **izna Showcase** — the strongest visual storytelling: six separately art-directed member pages with custom galleries and scroll effects.
4. **Multitwitcher** — a redesigned keyboard-driven launcher, live previews, resizable stream layout, reorder/focus interactions, and chat switching.
5. **izna Seatmate Finder** — interactive venue mapping, realtime data, nearby-seat discovery, recovery, and moderation.
6. **naya Calendar** — polished schedule browsing with local times, member filtering, Google Calendar sync, and subscription.
7. **Plan Dashboard** — a finished local tool with pane management, persisted workspaces, HTML/Markdown rendering, file watching, and cross-tab updates.

Reflective Minds and Crop Helper, along with their unused screenshots, were removed. The old Multitwitcher PNGs were replaced. Private repositories have no public Code button; only Multitwitcher has a public source link. Plan Dashboard runs locally and has no Live site button.

## Screenshot sources

All product images are real browser screenshots, captured at 1440 × 900 and exported to WebP. The raw PNGs and capture scripts are in the sibling `../portfolio-research/` research directory; that directory is outside this website repository.

| Images                                    | Source and state                                                                                                                                                                               |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nayapoca-home`                           | Live landing page with the photocard hero and catalog/collection links.                                                                                                                        |
| `nayapoca-catalog`                        | Live `/catalog?era=18&cardType=4&hasImage=true`; existing public Set The Tempo cards. No seeded records.                                                                                       |
| `nayapoca-viewer`                         | Live `/card/1671`; existing public card in the interactive 3D viewer.                                                                                                                          |
| `nayabio-style`, `nayabio-editor`         | Local `/dev/editor?tab=style` and `/dev/editor`; the repository's existing Juno demo profile. The harness has no saver and makes no database writes.                                           |
| `nayabio-home`                            | Live landing page.                                                                                                                                                                             |
| `showcase-*`                              | Live landing page and `/members/jungeun`, `/members/koko`, `/members/sarang`; existing imagery and interactions.                                                                               |
| `multitwitch-setup`, `multitwitch-watch`  | Live site, with xQc and ESLCS selected in an isolated browser session. Real live preview thumbnails and Twitch embeds; streams were played and no chat messages were sent.                     |
| `seatmap-populated`, `seatmap-neighbours` | Live frontend with browser-only Convex response fixtures: 42 fictional claimed seats, generic nicknames, and sample freebie notes. No real contact details and no production claims or writes. |
| `calendar-month`, `calendar-event`        | Live `https://nayacalendar.com/`, navigated to June 2026 to show an existing, populated schedule. Browser timezone: Asia/Singapore.                                                            |
| `plan-dashboard`                          | Local dashboard pointed at a newly created sample docs tree. Three panes show a fictional portfolio plan, an HTML diagram, and capture notes. No work documents were accessed or copied.       |

Live URLs were checked in the browser. The GitHub homepage for the calendar still pointed at the obsolete Vercel URL; the portfolio uses the owner's confirmed `https://nayacalendar.com/` instead. nayaPoca's initial server-rendered landing sections failed in the capture environment, but the client catalog and viewer loaded their real production data successfully.

## Maintenance

Project content, image labels, alt text, and order live in `src/app/_designs/shared/data.ts`. Search structured data reads the same list. Each screenshot can be opened at full size; multi-image cards have Previous/Next controls and support arrow keys while focused. Landing pages lead each gallery where the product has a dedicated landing page (nayaPoca, naya/bio, and izna Showcase); other products lead with their main interface. Screenshot labels are only used for accessibility, with no visible captions. Technology lists focus on frameworks, languages, services, and APIs. Desktop project buttons jump directly to each horizontal panel. Mobile and reduced-motion layouts use stacked cards.

## Validation

- `npm run check` passes (two existing default-export warnings in config files).
- `npm run build` passes.
- Browser checks cover 1440 × 900 desktop, 1024 × 768 desktop, 390 × 844 mobile, and reduced motion; screenshot Previous/Next and arrow-key controls; first/last project navigation; image loading; and horizontal overflow.
- Reduced-motion testing exposed an existing hydration mismatch in the hero and a missing scroll target in the reduced-motion text reveal. A shared `useSyncExternalStore` media-query hook now keeps server and initial client rendering consistent, the text reveal retains its ref in both modes, and the pinned project layout has a stable root outside the GSAP spacer so React can replace it safely. Live media-preference changes and desktop/mobile layout transitions were also checked.
