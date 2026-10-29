export const site = {
  name: 'Enes Yaprak',
  title: 'DevOps Engineer',
  url: 'https://enesyaprak.com',
  description:
    'Enes Yaprak — DevOps Engineer. Kubernetes, CI/CD, bulut altyapısı ve gözlemlenebilirlik üzerine projeler, notlar ve yazılar.',
  location: 'Eskişehir',
} as const;

/** Üst menü (blog sayfalarında görünür; ana sayfada masaüstünde sol sütun menüsü kullanılır). */
export const nav = [
  { href: '/', label: 'Anasayfa' },
  { href: '/#hakkimda', label: 'Hakkımda' },
  { href: '/#projelerim', label: 'Projelerim' },
  { href: '/blog/', label: 'Blogum' },
  { href: '/#iletisim', label: 'İletişim' },
] as const;

/** Ana sayfa sol sütun menüsü (bölüm çapaları). */
export const sideNav = [
  { href: '#anasayfa', label: 'Anasayfa' },
  { href: '#hakkimda', label: 'Hakkımda' },
  { href: '#projelerim', label: 'Projelerim' },
  { href: '#blogum', label: 'Blogum' },
  { href: '#iletisim', label: 'İletişim' },
] as const;
