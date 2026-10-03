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

// ---------- 2. スクロールしたらヘッダーに下線を付ける ----------
const header = document.getElementById('header');

function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ---------- 3. お問い合わせフォーム（練習用：実際には送信しません） ----------
const form = document.getElementById('contactForm');
const formError = document.getElementById('formError');
const formDone = document.getElementById('formDone');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // ページの再読み込みを止める

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailPattern.test(email)) {
    formError.hidden = false;
    formDone.hidden = true;
    return;
  }

  formError.hidden = true;
  formDone.hidden = false;
  form.reset();
});

// ---------- 4. フッターの年を自動更新 ----------
document.getElementById('year').textContent = new Date().getFullYear();
