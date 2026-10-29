---
title: AI Kube Config Manager
summary: Yerel LLM tabanlı ChatOps aracı. "Chat servisinin replica sayısını 5 yap" gibi komutlarla Kubernetes benzeri yapılandırma dosyalarını güvenle düzenler.
stack: ['Python', 'Docker Compose', 'Ollama', 'Llama 3', 'Flask']
repo: https://github.com/enesyaprak/ai-kube-config-manager
icon: kubernetes
featured: true
order: 1
---

Üç mikroservisten oluşan bir PoC: şema servisi yapıyı doğrular, değer servisi yapılandırma durumunu tutar, bot servisi yerel LLM ile niyeti çözüp değişikliği uygular. Hızlı anahtar kelime eşleştirme ile LLM çıkarımını birleştiren hibrit niyet tespiti, LLM'in bozuk JSON çıktısını onaran ayrıştırıcı ve Qwen2.5 ↔ Llama 3 arasında otomatik model geçişi var.
