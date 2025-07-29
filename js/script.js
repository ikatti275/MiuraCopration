// ページ読み込み後に実行
window.addEventListener('DOMContentLoaded', () => {
  // メインビジュアルテキストのフェードイン
  const visualText = document.querySelector('.main-visual p');
  if (visualText) {
    setTimeout(() => {
      visualText.style.opacity = 1; // 0から1へフェードイン
    }, 500); // 0.5秒後に開始
  }

  // ▼▼▼ スムーススクロール関数 ▼▼▼
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId); // 対象のセクション取得
    if (!target) return;

    const headerOffset = 80; // 固定ヘッダー分のオフセット
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset; // 移動先座標
    const startPosition = window.pageYOffset; // 現在のスクロール位置
    const distance = targetPosition - startPosition; // スクロール距離
    const duration = 800; // スクロール時間（ミリ秒）
    let startTime = null;

    // イージング関数：easeInOutQuad（なめらかに加速→減速）
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // アニメーション実行関数
    function animation(currentTime) {
      if (!startTime) startTime = currentTime; // 初回に開始時間を記録
      const timeElapsed = currentTime - startTime; // 経過時間
      const run = ease(timeElapsed, startPosition, distance, duration); // 現在のスクロール位置を計算
      window.scrollTo(0, run); // スクロール実行

      if (timeElapsed < duration) {
        requestAnimationFrame(animation); // 終了まで繰り返す
      }
    }

    requestAnimationFrame(animation); // スクロール開始
  }

  // ナビゲーションリンクにクリックイベントを設定
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // 通常のリンクジャンプを無効化
      const targetId = this.getAttribute('href'); // リンク先ID（例: #company）
      smoothScrollTo(targetId); // 自作スクロール関数を実行
    });
  });
});

// ▼▼▼ スクロール位置に応じてナビリンクをハイライト ▼▼▼
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section'); // 全セクション取得
  const navLinks = document.querySelectorAll('nav a');   // ナビゲーションリンク取得
  let current = ''; // 現在表示されているセクションID

  // 現在のスクロール位置に該当するセクションを探す
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 100) { // ヘッダー高さ分ずらして検出
      current = section.getAttribute('id'); // 現在のセクションIDを保存
    }
  });

  // ナビリンクに active クラスを付け外し
  navLinks.forEach(link => {
    link.classList.remove('active'); // 一度全ての active を外す
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active'); // 該当するリンクだけ active にする
    }
  });
});
