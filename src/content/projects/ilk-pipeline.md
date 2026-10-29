---
title: İlk CI Pipeline
summary: Küçük bir Python servisini GitHub Actions ve Jenkins ile test edip Docker imajı olarak paketleyen başlangıç hattı.
stack: ['GitHub Actions', 'Jenkins', 'Docker', 'pytest']
repo: https://github.com/enesyaprak/ilk-pipeline
icon: githubactions
order: 3
---

Aynı uygulama için iki ayrı CI tanımı: GitHub Actions workflow'u ve Jenkinsfile. Her push'ta pytest çalışıyor, başarılıysa Dockerfile ile imaj üretiliyor.
