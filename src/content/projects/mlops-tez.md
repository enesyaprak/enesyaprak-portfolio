---
title: MLOps Bitirme Tezi
summary: AWS SageMaker Pipelines ile uçtan uca MLOps hattı. Veri kayması (drift) tespit edilince model otomatik yeniden eğitilip endpoint'e dağıtılıyor.
stack: ['AWS SageMaker', 'XGBoost', 'Python', 'S3', 'boto3']
repo: https://github.com/enesyaprak/MLOps-Tez-Projesi
icon: amazonwebservices
featured: true
order: 2
---

Bilgisayar mühendisliği bitirme projesi. Ham veri S3'ten alınıp işleniyor, XGBoost modeli eğitiliyor, Model Registry'ye kaydediliyor ve canlı bir SageMaker endpoint'ine dağıtılıyor. Amaç, bulut tabanlı bir makine öğrenmesi sisteminin veri değiştiğinde kendini onarabildiğini (self-healing) göstermek.
