# DigiTera — Rubab Aslam

A responsive portfolio featuring Rubab Aslam’s graphic design, campaign visuals, product studies, videos, and educational work.

## Features
- Original DigiTera logo and locally hosted project assets
- Filterable six-project gallery, image navigation, accessible modal tabs
- Responsive navigation and native video players
- Service accordions and educator profile
- Validated enquiry form that prepares a WhatsApp or email draft (no server-side submission)
- Reduced-motion support and keyboard-accessible controls

## Run
Open `index.html` in a browser or serve this directory with any static web server. No build process or dependencies are required. Fonts load from Google Fonts with system-font fallbacks.

## Publish on GitHub Pages
In this repository, open **Settings → Pages**, choose **Deploy from a branch**, and select **main / (root)**. Save. GitHub will display the resulting site URL after deployment. All paths are relative and support a repository subdirectory.

## Edit
- Biography, services, contact details: `index.html`
- Project descriptions and gallery images: `projects.js`
- Visual design and responsive layout: `styles.css`
- Interactive behaviour: `app.js`
- Images and video: `assets/`

Project descriptions distinguish independent visual studies from commissioned work and do not make unverified performance claims. No analytics or advertising cookies are configured. Enquiries are only sent when the visitor sends the draft in their chosen app.

## Client-facing portfolio updates

- **Project stories:** Edit the three cards in `index.html` under `#case-studies`. These summarize Qasr Decor (website preview), Apex Limo SF (marketing research), and the coloring-book video ad (playable creative). Their **Project details** buttons use existing project IDs from `projects.js` and open the original accessible portfolio dialog.
- **Floating WhatsApp:** The fixed **Chat with us** link near the end of `index.html` opens `wa.me/923191520187`. Update the number consistently in the header contact links, packages, form handler in `app.js`, and this button if the business number changes.
- **Styling:** New responsive, reduced-motion-friendly styles live in `client-upgrade.css`. Original styling and interaction files are unchanged.
- **Evidence and claims:** Publish client-approved screenshots and actual campaign assets only with permission. Keep website previews, independent research, proposed concepts, and completed commissions clearly distinguished. Add traffic, rankings, sales or review claims only after verifying original data and client permission.
- **Feedback:** Review the existing testimonial text and permission to display names before presenting testimonials as verified client endorsements.
- **Release:** Merge the pull request to publish through an existing main-branch GitHub Pages configuration. Until then the live branch remains unchanged.

## Extended case-study and creative proof pages

- `case-studies.html` + `case-studies.css`: a full, accessible case-study experience linked from the homepage. Describes the design scope for Qasr Decor, marketing research for Apex Limo SF and the completed coloring-book video ad.
- Existing `assets/smartfix.webp`, `assets/smart-ac.webp`, `assets/clean-air.webp` and `assets/clean-dryer.webp` appear in image-led proof galleries on both the homepage and the detail page. Viewers can open the original assets directly.
- The Qasr browser illustration is explicitly **not a screenshot**. To show the real completed website on-page, replace that mock with a permission-cleared screenshot once available.
- Apex Limo SF is classified as marketing **research**, not a DigiTera-built website or published ad campaign.
- Previously displayed testimonial quotes have been taken **off the public-facing draft** because their sources and publication permissions were not provided. The page now emphasizes visible examples of work. If reviews are later supplied and verified, they can be restored with permission.
- The fixed WhatsApp CTA says only **Chat with us** and opens a message draft to the existing number, not an automated chat or fake availability indicator.

### Content needed for richer, measurable case studies

For each project, request (with permission):
1. A genuine screenshot of the project or campaign visual.
2. A brief written scope: the initial business problem, who handled which deliverables, and the timeframe.
3. At least one completed deliverable (final video, site, post design, report excerpt, or screenshot of changes).
4. **Only if the client wants measurable outcomes shown:** a source-supported before/after comparison with dates, units and clear attribution.
5. Written permission for naming the client, reproducing artwork, displaying project metrics and publishing any testimonials.

Do not turn strategies or recommendations into claimed customer outcomes. If approval or metrics are unavailable, accurately label projects as research, creative studies or visual concepts.

### Review and publish

The PR branch holds the complete update and stays separate from the live site. Inspect `index.html` and `case-studies.html` across phone and desktop sizes. Review external project destinations and WhatsApp text before merging. Changes merge into `main` only with the site owner's approval.

## Client-requested clarity and implementation QA

- The homepage now explains **define → build → review** and links into project enquiries, instead of displaying unverified numerical experience or audience claims.
- The case-study page distinguishes the Qasr website preview, Apex marketing research and playable advertising asset in an evidence index. Added specific project scope notes and a research framework clearly labeled as proposed diagnostic steps, not completed campaign findings.
- Added `PROJECT_EVIDENCE.md` for permissions, source artifacts and what can legitimately be described as an outcome.
- Run `node scripts/check-portfolio.mjs` to check hash links, source assets, project IDs and content boundaries. Browser/device QA and external link checks still require a human review.
- The feature PR remains separate from `main`; merging is reserved for owner approval.
