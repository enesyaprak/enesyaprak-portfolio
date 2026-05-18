# enesyaprak.com — Portfolio

Astro 5 + Tailwind 4 + GSAP + Lenis. Static site, hosted on Hostinger.

## Local development

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # → ./dist
npm run preview    # serve the production build locally
```

## Deploy

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and uploads `dist/` to Hostinger via FTP.

### One-time setup

In the GitHub repo → **Settings → Secrets and variables → Actions**, add:

| Secret           | Example                                  | Where to find on Hostinger                                            |
| ---------------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `FTP_HOST`       | `ftp.enesyaprak.com` or `123.45.67.89`   | hPanel → Hosting → Manage → **Files → FTP Accounts** (Host / IP)      |
| `FTP_USER`       | `u1234567.enesyaprak.com`                | Same panel — FTP username                                             |
| `FTP_PASS`       | (password you set)                       | Same panel — set password if not visible                              |
| `FTP_TARGET_DIR` | `./public_html/` (default; can override) | The web root. For subdomain use `./public_html/<subdomain>/`          |

To trigger a deploy:
- push to `main`, or
- run the workflow manually from the Actions tab (workflow_dispatch).
