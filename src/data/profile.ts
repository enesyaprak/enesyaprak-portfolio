/**
 * Kişisel bilgiler. Köşeli parantezli değerler placeholder; gerçek bilgiyle değiştir.
 * Ana sayfanın tamamı bu dosyadan + content/ klasöründen beslenir.
 */
import type { IconName } from '../components/icons';

export interface TechItem {
  name: string;
  icon: IconName;
  url?: string;
}
export interface CareerItem {
  period: string;
  role: string;
  org: string;
  orgUrl?: string;
  text?: string;
  current?: boolean;
}
export interface EducationItem {
  school: string;
  detail?: string;
  period?: string;
  note?: string;
  kind: 'ortaokul' | 'lise' | 'universite';
}
export interface SocialItem {
  label: string;
  handle: string;
  url: string;
  icon: IconName;
}

export const profile = {
  /** Sol sütundaki fotoğraf; public/ altındaki yol. Boşsa baş harfler gösterilir. */
  photo: '' as string,

  /** "Şu an" kartı. Köşeli parantezle başlayan satır gizlenir. */
  now: {
    working: 'OctaPull · on-prem Kubernetes',
    learning: '[Öğrendiğin şey, ör. Talos Linux]',
    timeZone: 'Europe/Istanbul',
    city: 'Eskişehir',
  },

  intro:
    'Merhaba, ben Enes. DevOps mühendisiyim; sistemleri otomatize etmeyi, iyi mimariler tasarlayıp canlıya almayı seviyorum. On-prem ve bulut altyapısı, Kubernetes ve CI/CD ile uğraşırken en çok keyif aldığım an, elle yapılan bir işin bir daha elle yapılmadığı andır.',

  tech: [
    { name: 'Kubernetes', icon: 'kubernetes', url: 'https://kubernetes.io' },
    { name: 'Docker', icon: 'docker', url: 'https://www.docker.com' },
    { name: 'Ansible', icon: 'ansible', url: 'https://www.ansible.com' },
    { name: 'Argo CD', icon: 'argo', url: 'https://argoproj.github.io/cd/' },
    { name: 'AWS', icon: 'amazonwebservices', url: 'https://aws.amazon.com' },
    { name: 'Terraform', icon: 'terraform', url: 'https://www.terraform.io' },
    { name: 'GitHub Actions', icon: 'githubactions', url: 'https://github.com/features/actions' },
    { name: 'Prometheus', icon: 'prometheus', url: 'https://prometheus.io' },
    { name: 'Grafana', icon: 'grafana', url: 'https://grafana.com' },
    { name: 'Helm', icon: 'helm', url: 'https://helm.sh' },
    { name: 'Proxmox', icon: 'proxmox', url: 'https://www.proxmox.com' },
    { name: 'VMware', icon: 'vmware', url: 'https://www.vmware.com' },
    { name: 'Graylog', icon: 'graylog', url: 'https://graylog.org' },
    { name: 'Linux', icon: 'linux' },
  ] as TechItem[],

  career: [
    {
      period: 'Ekim 2026 — şu an',
      role: 'DevOps Engineer',
      org: 'OctaPull',
      orgUrl: 'https://octapull.com',
      text: 'Proxmox ve VMware üzerinde on-prem altyapı, yanında bulut: Kubernetes kümeleri, CI/CD hatları, Graylog ile log yönetimi, izleme ve otomasyon.',
      current: true,
    },
    {
      period: 'Temmuz — Ağustos 2026',
      role: 'Sistem Stajyeri',
      org: 'Dardanel',
      orgUrl: 'https://www.dardanel.com.tr',
      text: 'Bilgi işlem ekibinde sistem yönetimi stajı.',
    },
    { period: 'Şubat — Mart 2025', role: 'Full Stack Stajyeri', org: 'Kodesis' },
    { period: 'Temmuz — Ağustos 2024', role: 'Full Stack Stajyeri', org: 'Hepro Mekatronik' },
  ] as CareerItem[],

  education: [
    { school: 'Melahat Ünügür Ortaokulu', kind: 'ortaokul' },
    { school: 'Muzaffer Çil Anadolu Lisesi', kind: 'lise' },
    {
      school: 'Çanakkale Onsekiz Mart Üniversitesi',
      detail: 'Bilgisayar Mühendisliği',
      kind: 'universite',
    },
  ] as EducationItem[],

  /** Sertifika, ödül, ölçülebilir başarı. Boş bırakılırsa bölüm görünmez. */
  achievements: [
    { title: '[Sertifika / ödül]', year: '[YIL]' },
    { title: '[Ölçülebilir başarı, ör. deploy süresi 40 dk → 8 dk]', year: '[YIL]' },
  ] as { title: string; year: string }[],

  socials: [
    { label: 'GitHub', handle: 'github.com/enesyaprak', url: 'https://github.com/enesyaprak', icon: 'github' },
    { label: 'LinkedIn', handle: 'linkedin.com/in/ensyprk', url: 'https://www.linkedin.com/in/ensyprk', icon: 'linkedin' },
  ] as SocialItem[],

  emails: ['enesyprkone@gmail.com'] as string[],
};
