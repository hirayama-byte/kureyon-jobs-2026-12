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

// 会社名（空白で区切った言葉ごと）を、言葉の途中で折り返さない大きさまで小さくする（2026-11-12）
// 例: 「住宅型有料老人ホーム ナーシングホーム北斗」→ スマホでも「住宅型有料老人ホーム」「ナーシングホーム北斗」の2段に
// h = 会社名の見出し（h1・h3）。min より小さくはしない（それでも入らなければ従来どおり言葉の途中で折り返す）
window.fitName = function (h, min) {
  if (!h) return;
  var segs = Array.prototype.slice.call(h.querySelectorAll('span.inline-block'));
  if (!segs.length) return;
  min = min || Number(h.dataset.fitName) || 12;
  h.style.fontSize = '';
  segs.forEach(function (s) { s.style.whiteSpace = 'nowrap'; });
  var size = parseFloat(getComputedStyle(h).fontSize);
  var over = function () { return segs.some(function (s) { return s.scrollWidth > s.clientWidth + 0.5; }); };
  while (over() && size > min) { size -= 0.5; h.style.fontSize = size + 'px'; }
  if (over()) segs.forEach(function (s) { s.style.whiteSpace = ''; }); // 最小でも入らないときは折り返しを許す
  h.querySelectorAll('[data-fit-line]').forEach(window.fitLine); // カッコの行も合わせ直す
};
window.addEventListener('resize', function () {
  document.querySelectorAll('[data-fit-name]').forEach(function (h) { window.fitName(h); });
});
