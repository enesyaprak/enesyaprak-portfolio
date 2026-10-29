# enesyaprak.com

Enes Yaprak'ın kişisel sitesi. Astro (statik) + GSAP + Lenis, Cloudflare Pages üzerinde.

## Geliştirme

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check + astro build → dist/
npm run preview    # build çıktısını önizle
npm run cf:dev     # dist/ klasörünü wrangler ile sun (_headers/_redirects dahil)
```

Node 24 (`.node-version`). TypeScript 5.9'da sabit; `typescript@7` `astro check` ile uyumsuz.

## İçerik

- Blog yazıları: `src/content/blog/*.md` — frontmatter: `title, description, pubDate, updatedDate?, tags[], draft, cover?`
- Projeler: `src/content/projects/*.md` — frontmatter: `title, summary, stack[], repo?, url?, icon?, status (devam|yayinda|plan), featured, order`. `repo` varsa satır tıklanınca GitHub'a gider.
- Kişisel bilgiler (tanıtım, teknolojiler, kariyer, eğitim, başarımlar, sosyal hesaplar, e-postalar): `src/data/profile.ts`. Köşeli parantezli değerler placeholder.
- Site adı / menü: `src/data/site.ts`
- Logolar: `src/icons/*.svg` (simple-icons). Yeni logo eklemek için dosyayı koy, `src/components/icons.ts` ve `src/content.config.ts` içindeki listeye adını ekle.

## GitHub verisi

- Sol sütundaki katkı ızgarası ve "Son hareketler" build sırasında github.com/enesyaprak'tan çekilir (`src/utils/github.ts`, token gerekmez).
- GitHub'a ulaşılamazsa `src/data/contributions.json` ve `src/data/github-activity.json` yedekleri kullanılır. Yedekleri tazelemek için: `npm run contrib:snapshot`
- Gizlenecek repolar: `src/utils/github.ts` içindeki `HIDDEN` listesi.

## Tema

- Açık tema beyaz-mavi, koyu tema zümrüt (GitHub yeşili). Tokenlar `src/styles/tokens.css`.
- Seçim `localStorage`'da; ilk boyamadan önce `public/theme.js` uygular (CSP `script-src 'self'` olduğu için harici dosya).

YAML'da iki nokta (`: `) içeren değerleri tırnak içine al.

## Tasarım

Onaylı taslak: "Sabit sol" düzen + beyaz-mavi palet (https://claude.ai/artifact/MnoL46UZ3UcU4ozLSy3sSM). Ana sayfa tek sayfa: sol sabit sütun (isim, rol, menü, GitHub katkı ızgarası), sağda teknolojiler, Hakkımda (tanıtım + kariyer + eğitim), Projelerim, Blogum (kaydırıcı), İletişim. Font IBM Plex Sans + JetBrains Mono.

Katkı ızgarası şimdilik build anında üretilen örnek veri (`src/components/home/ContribGrid.astro`); gerçek GitHub verisine bağlanabilir.

## Yapı

```
src/components/home   Sidebar, ContribGrid, TechOrbs, CareerTimeline, EducationTimeline, ProjectRow, BlogCarousel, ContactBoxes
src/components        Nav, Footer, Icon, PostCard, ProjectCard, CopyButton, TagPill, BaseHead
src/layouts           BaseLayout (head, nav, footer, motion), PostLayout (blog yazısı)
src/pages             index, projeler/, blog/, blog/[id], blog/etiket/[tag], rss.xml, 404
src/scripts           motion.ts (GSAP ScrollTrigger + Lenis: reveal, zaman çizgisi dolumu, aktif menü), nav.ts, copy.ts
src/styles            tokens.css (renk/font tokenları), global.css, prose.css (Markdown)
public/               _headers (güvenlik + cache), _redirects, robots.txt, og.png, favicon.svg
```

Animasyonlar `prefers-reduced-motion: no-preference` koşuluna bağlı; JS yoksa veya kullanıcı hareketi azaltmışsa içerik olduğu gibi görünür.

## Cloudflare'e yayınlama (tek seferlik kurulum)

1. **Repo**: GitHub'a `main` dalıyla push et.
2. **Zone**: Cloudflare → Add domain → `enesyaprak.com` (Free). Verilen iki nameserver'ı not et.
3. **Registrar**: Nameserver'ları Cloudflare'inkilerle değiştir. WHOIS gizliliği açık, transfer kilidi açık. `enesyaprak.com` için otomatik yenileme **açık**, hediye domainler (`.online` vb.) için **kapalı**. Zone "Active" olana kadar bekle (e-posta gelir).
4. **Pages projesi**: Workers & Pages → Create → Pages → **Connect to Git** (Direct Upload sonradan Git'e çevrilemez).
   - Production branch: `main`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variable: `NODE_VERSION=24`
5. **Custom domain**: Pages projesi → Custom domains → `enesyaprak.com` ve `www.enesyaprak.com` ekle. CNAME kayıtlarını Cloudflare kendisi oluşturur; **elle önceden oluşturma** (522 hatası verir).
6. **www → apex**: Rules → Redirect Rules → Create: wildcard `https://www.*` → `https://${1}`, 301, "preserve query string".
7. **pages.dev → apex**: Account → Bulk Redirects → liste oluştur: `https://enesyaprak-com.pages.dev/` → `https://enesyaprak.com/`, 301, subpath matching + preserve path suffix + preserve query string. Listeyi bir Bulk Redirect kuralına bağla.
8. **Hediye domainler**: Her birini zone olarak ekle, registrar'da NS'i değiştir, apex ve `www` için **proxied** (turuncu bulut) `AAAA 100::` kaydı oluştur, aynı Bulk Redirect listesine `https://enesyaprak.online/` → `https://enesyaprak.com/` (include subdomains + subpath + preserve suffix/query, 301) ekle.
9. **E-posta**: Email → Email Routing → etkinleştir (MX/SPF/DKIM otomatik eklenir) → Destination addresses: Gmail adresini ekle ve gelen doğrulama linkine tıkla → Routing rules: `iletisim` → Gmail. Gmail dışı bir adresten test gönder.
   - İsteğe bağlı "Send mail as": Google hesabında 2 adımlı doğrulama → App Password → Gmail Ayarlar → Accounts → "Send mail as" → `iletisim@enesyaprak.com`, SMTP `smtp.gmail.com:587`, TLS, kullanıcı adı tam Gmail adresi. SPF kaydını `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all` yap, `_dmarc` TXT ekle: `v=DMARC1; p=none; rua=mailto:iletisim@enesyaprak.com`.
10. **SSL/TLS**: Full (strict), Always Use HTTPS açık.

### Deploy sonrası kontrol

```bash
curl -I https://www.enesyaprak.com            # 301 → https://enesyaprak.com/
curl -I https://enesyaprak.online/blog/?x=1   # 301 → https://enesyaprak.com/blog/?x=1
curl -I https://enesyaprak.com | grep -i content-security-policy
dig MX enesyaprak.com +short
```

Elle deploy gerekirse (Git bağlantısı olmadan): `npx wrangler login && npm run build && npm run cf:deploy`.

## Yapılacaklar

- [ ] `src/data/site.ts` içindeki GitHub/LinkedIn adreslerini gerçek adreslerle değiştir
- [ ] `src/pages/hakkimda.astro` deneyim listesini doldur
- [ ] Örnek projeleri ve blog yazılarını gerçekleriyle değiştir
- [ ] `public/og.png` görselini istersen yenile (1200×630)
