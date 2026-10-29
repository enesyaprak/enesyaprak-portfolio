for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  const original = button.querySelector('[data-copy-label]');
  const originalText = original?.textContent ?? '';
  button.addEventListener('click', async () => {
    const value = button.dataset.copy ?? '';
    try {
      await navigator.clipboard.writeText(value);
      if (original) original.textContent = 'Kopyalandı';
      button.classList.add('is-copied');
    } catch {
      if (original) original.textContent = 'Kopyalanamadı';
    }
    window.setTimeout(() => {
      if (original) original.textContent = originalText;
      button.classList.remove('is-copied');
    }, 1800);
  });
}
