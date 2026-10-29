---
title: Her gün kullandığım kubectl kısayolları
description: Terminalde zaman kazandıran birkaç alias, context yönetimi ve sık unuttuğum komutlar.
pubDate: 2026-10-20
tags: ['kubernetes', 'terminal']
---

Küme ile her gün uğraşıyorsan birkaç alias hayatı ciddi kolaylaştırıyor.

## Alias’lar

```bash
alias k='kubectl'
alias kgp='kubectl get pods'
alias kgpa='kubectl get pods -A'
alias kctx='kubectl config use-context'
alias kns='kubectl config set-context --current --namespace'
```

## Hangi pod neden restart oldu?

```bash
kubectl get pods -A --sort-by='.status.containerStatuses[0].restartCount' | tail -n 10
```

## Bir pod’un son çökme sebebi

```bash
kubectl logs <pod> --previous
kubectl describe pod <pod> | grep -A5 'Last State'
```

| Komut | Ne işe yarar |
| --- | --- |
| `kubectl top pods` | Anlık CPU/bellek |
| `kubectl rollout restart deploy/<ad>` | Deploy’u sıfırdan başlat |
| `kubectl debug` | Dağıtılmamış araçlarla ephemeral container |

Bunlar benim listem; seninkiler neler, [yaz bana](/#iletisim).
