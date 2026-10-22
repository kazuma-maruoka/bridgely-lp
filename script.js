// =========================================================
// Bridgely LP - script.js
// 必要最低限の動きだけを実装しています。
// =========================================================

// ---------- 1. スマホ用メニューの開閉 ----------
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

function closeMenu() {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'メニューを開く');
}

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

// メニュー内のリンクを押したら閉じる
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Escキー・メニューの外側のクリックでも閉じる
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (nav.classList.contains('is-open') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

// PC幅に戻ったら開いた状態をリセット
window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

// ---------- 2. スクロールしたらヘッダーに下線を付ける ----------
const header = document.getElementById('header');

function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ---------- 3. メールアドレスのコピー ----------
const copyEmail = document.getElementById('copyEmail');
const copyStatus = document.getElementById('copyStatus');

copyEmail.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyEmail.dataset.email);
    copyStatus.textContent = 'メールアドレスをコピーしました。';
  } catch (error) {
    // コピーできない環境では、アドレスを選択状態にして手動コピーを案内
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('contactEmail'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = 'アドレスを選択しました。Ctrl+C（Macは⌘+C）でコピーしてください。';
  }
});

// ---------- 4. フッターの年を自動更新 ----------
document.getElementById('year').textContent = new Date().getFullYear();
