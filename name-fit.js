// 会社名の表示用（一覧・詳細ページ共通）
// 会社名に「 （…）」が付いているとき、カッコ部分を名前の下に1行で出す。
// 1行に収まらない幅では、カッコ部分の文字だけを小さくして収める。

// 'にこやかライフハウス （一宮開明 / 一宮猿海道 / 一宮三条）' → { main: 'にこやかライフハウス', sub: '（一宮開明 / 一宮猿海道 / 一宮三条）' }
window.splitName = function (name) {
  var i = (name || '').indexOf(' （');
  if (i < 0) return { main: name || '', sub: '' };
  return { main: name.slice(0, i), sub: name.slice(i + 1) };
};

// el（1行で出したい要素）の文字を、はみ出さない大きさまで小さくする
window.fitLine = function (el) {
  if (!el) return;
  el.style.fontSize = '';
  var size = parseFloat(getComputedStyle(el).fontSize);
  var min = 8;
  while (el.scrollWidth > el.clientWidth + 0.5 && size > min) {
    size -= 0.5;
    el.style.fontSize = size + 'px';
  }
};

window.addEventListener('resize', function () {
  document.querySelectorAll('[data-fit-line]').forEach(window.fitLine);
});
