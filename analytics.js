// アクセス解析（Google アナリティクス 4）
// 測定ID: G-CWSWXCRNXF（プロパティ「くれよん求人特設サイト」）
// サイトを自社ホームページへ移しても、このファイルごと移せば計測はそのまま続く。
// 会社ごとの数字はページのアドレスではなく「会社名（company_name）」で記録するので、移す前後を合計できる。
//
// 記録するイベント
//   page_view     … ページの閲覧（自動）。詳細ページでは company_name 付き
//   select_company… 一覧で会社カードを押した
//   apply_click   … 詳細ページの「WEBから応募する」を押した
//   tel_click     … 詳細ページの電話番号を押した
// ※自分のパソコンで確認しているとき（localhost・ファイルを直接開いたとき）は送らない
(function () {
  var MEASUREMENT_ID = 'G-CWSWXCRNXF';

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  var isLocal = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

  // 詳細ページ（company.html?id=○）なら、その会社の名前
  var company = null;
  if (/company\.html$/.test(location.pathname)) {
    var id = Number(new URLSearchParams(location.search).get('id'));
    company = (window.COMPANIES || []).find(function (x) { return x.id === id; }) || null;
  }

  // ボタン・カードを押したときに呼ぶ: track('apply_click', 会社データ)
  window.track = function (name, c) {
    var params = c ? { company_name: c.companyName, company_id: String(c.id) } : {};
    if (isLocal) { console.log('[analytics]', name, params); return; }
    params.transport_type = 'beacon'; // ページを離れる直前でも送りきる
    window.gtag('event', name, params);
  };

  if (isLocal) { console.log('[analytics] ローカル確認中のため送信しません'); return; }

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(s);

  window.gtag('js', new Date());
  var config = {};
  if (company) {
    config.page_title = company.companyName + ' - この街で働くという選択。 - くれよん特設サイト';
    document.title = config.page_title; // 計測が読み込まれる前にページ名を会社名にしておく

    config.company_name = company.companyName;
    config.company_id = String(company.id);
  }
  window.gtag('config', MEASUREMENT_ID, config);
})();
