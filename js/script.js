  // メインビジュアルテキストのフェードイン
  window.addEventListener('DOMContentLoaded', () => {
    const visualText = document.querySelector('.main-visual p');
    if (visualText) {
        setTimeout(() => {
            visualText.style.opacity = 1;
        }, 500);
    }
});
// ナビリンクをクリックした時のスムーススクロール処理
// すべての nav のリンクを取得
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // デフォルトのリンク動作を無効にする
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth' // なめらかにスクロールする
      });
    });
  });
  
  // スクロール位置に応じてナビに active クラスをつける処理
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section'); // セクション取得
    const navLinks = document.querySelectorAll('nav a'); // ナビリンク取得
    let current = '';
  
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 80) {
        current = section.getAttribute('id'); // 現在のセクションIDを記録
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove('active'); // 一旦すべて非アクティブ
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active'); // 対象セクションのリンクだけアクティブに
      }
    });
  });
