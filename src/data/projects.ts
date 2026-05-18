export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  url?: string;
  year: string;
  status?: "live" | "wip" | "soon";
  role?: string;
};

export const projects: Project[] = [
  {
    slug: "mlops-thesis",
    title: "MLOps × Cloud Entegrasyonu",
    description:
      "Mezuniyet tezi. Amazon SageMaker pipeline'ları ile makine öğrenmesi operasyonlarını bulut altyapısına entegre ediyorum — model eğitim/dağıtım otomasyonu ve canlı izleme (monitoring) sistemleri.",
    tech: ["AWS SageMaker", "Terraform", "Python", "MLOps", "Monitoring"],
    year: "2026",
    status: "wip",
    role: "Thesis · Solo",
  },
  {
    slug: "ai-appointment-saas",
    title: "AI Randevu Otomasyonu",
    description:
      "Yerel işletmeler için n8n + WhatsApp API + GPT-4o-mini ile çalışan otomasyonlu randevu SaaS'i. Düşük maliyetli sohbet düğümleri, müşteri akışı, randevu yönetimi.",
    tech: ["n8n", "WhatsApp API", "GPT-4o-mini", "SaaS", "Automation"],
    year: "2025",
    status: "live",
    role: "Founder · Build",
  },
  {
    slug: "multi-agent-cicd",
    title: "Multi-Agent CI/CD Orchestrator",
    description:
      "LangGraph ve LLM konsensüs mekanizmasıyla dağıtım kararı veren çoklu-agent yapısı. Akademik portfolyo projesi; deployment pipeline kararlarını agent'lar arası oylamayla yönetir.",
    tech: ["LangGraph", "LLM", "Python", "CI/CD", "Agents"],
    year: "2025",
    status: "wip",
    role: "R&D · Solo",
  },
  {
    slug: "pet-ai-marketing",
    title: "Pet AI — Strategy & Ad Guide",
    description:
      "Yapay zeka destekli evcil hayvan mobil uygulaması için dijital pazarlama stratejisi, teknik reklam kılavuzu ve büyüme planı.",
    tech: ["Strategy", "Growth", "AI Product"],
    year: "2025",
    status: "live",
    role: "Consulting",
  },
];
