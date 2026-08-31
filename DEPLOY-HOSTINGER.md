# Deploying to Hostinger

This site is set up to run on Hostinger's Node.js app manager (Passenger-based). That's what `server.js` is for — Passenger needs a plain JS file that boots an HTTP server on `process.env.PORT`, it won't run `next start` or arbitrary npm scripts directly.

## Prerequisites

- A Hostinger plan with **Node.js hosting** (Business/Premium web hosting, or a VPS). Check hPanel → Advanced/Websites for a "Node.js" section. If it's missing, the plan doesn't support it.
- Node.js 20+ available in that Node.js app manager (matches the `engines` field in `package.json`).

## One-time setup

1. hPanel → **Websites** → your domain (or **Advanced → Node.js**) → **Create Application**.
2. Configure:
   - **Node.js version**: 20.x or newer
   - **Application root**: e.g. `social-pulse-website`
   - **Application URL**: your domain (or a subdomain) — this is what wires the domain to the app
   - **Application startup file**: `server.js`
3. Save. Hostinger creates the app folder and gives you SSH/SFTP access.
4. Get the code onto the server:
   - **Git deploy** (if available in hPanel for that app): point it at this repo, branch `master`, deploy path = application root.
   - **Manual**: `git clone`/upload the project into the application root via SSH/SFTP.
5. From the app's SSH/terminal in hPanel:
   ```bash
   npm install
   npm run build
   ```
6. Click **Restart** on the Node app in hPanel. It runs `server.js`, which listens on `process.env.PORT` automatically.

## Pointing the domain

- If the app's **Application URL** was set to your domain in step 2, Hostinger already reverse-proxies that domain into the Node app — nothing else to do.
- If the domain is registered elsewhere and needs to point at this Hostinger hosting:
  - Point the registrar's **nameservers** at Hostinger's (shown in hPanel → Domains), **or**
  - Add an **A record** at your current DNS provider pointing to the Hostinger hosting IP (hPanel → Websites → site → Details).
- DNS changes can take up to 24–48 hours to propagate.

## Redeploying after changes

Every time the code changes:

```bash
git pull            # or re-upload
npm install
npm run build
```

Then click **Restart** on the Node app in hPanel.
