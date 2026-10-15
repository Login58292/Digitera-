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
