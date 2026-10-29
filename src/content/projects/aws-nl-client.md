---
title: AWS NL Client
summary: Doğal dille AWS yönetimi. Yerel LLM (Ollama) + boto3 + Amazon Kendra ile RAG; EC2, S3, IAM, Lambda, CloudWatch ve maliyet sorguları tek sohbet ekranından.
stack: ['AWS', 'Python', 'FastAPI', 'Ollama', 'React']
repo: https://github.com/enesyaprak/aws-nl-client
icon: amazonwebservices
status: devam
featured: true
order: 0
---

"Prod'daki EC2'leri listele", "şu bucket'taki dosyaya presigned URL üret" gibi doğal dil komutlarını AWS API çağrılarına çeviren bir sohbet uygulaması. Model yerelde Ollama ile çalıştığı için API maliyeti sıfır; silme ve durdurma gibi yıkıcı işlemler kullanıcı onayı alınmadan çalışmıyor. Kendra üzerinden RAG modu ile kaynaklı cevap üretiyor; pytest + moto ile AWS'ye bağlanmadan test ediliyor.
