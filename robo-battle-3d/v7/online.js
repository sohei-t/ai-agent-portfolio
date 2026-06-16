/**
 * ROBO BATTLE 3D v7 - オンライン対戦ロビー UI (M1b)
 *
 * 役割:
 *   - ハンガーの「🌐 オンライン」から開く全画面ロビーを構築・配線する。
 *   - net.js(NetHub) を使って 部屋作成 / 参加 / 準備 / 開始 を制御。
 *   - ゲーム本体とは「window.RB_startOnlineMatch(match, netCtx)」1点だけで疎結合。
 *     (このフックは game3d.js 側 = M2 で実装。未実装でもロビーは完全動作する。)
 *
 * 設計(ホスト権威):
 *   - ホストがシミュレーションを実行。ゲストは入力を送り、スナップショットを描画する端末。
 *   - ロビーで各自の機体クラス(SAVE.lastClass 相当)を持ち寄り、ホストが roster を確定して
 *     全員に 'start'(seed + roster)を配信 → 全クライアントが同じ配置でバトル開始。
 *
 * このモジュールはシングルプレイのコードには一切触れない(別ファイル + window 経由)。
 */
import { NetHub, MAX_PLAYERS } from './net.js';

// ---- 状態 ----
let net = null;          // NetHub インスタンス(部屋に入っている間だけ存在)
let myReady = false;     // 自分の準備状態
let myName = '';
let metaByPeer = {};     // ホスト: guestId -> { name, class }  (ゲストの持ち寄り情報)
let started = false;     // 二重スタート防止
let autoStartTimer = null; // ホスト: 定員 + 全員 READY で自動開始するカウントダウン
let expectedPlayers = 2; // ホストが設定する対戦人数(2〜4)。定員が揃って全員 READY で開始

// ---- ゲーム本体から渡される情報の取得(疎結合・存在しなくても動く) ----
function myClassKey() {
  try { return (window.RB_getOnlineClass && window.RB_getOnlineClass()) || 'assault'; }
  catch (e) { return 'assault'; }
}
function myDisplayName() {
  return (myName || '').trim() || 'PLAYER';
}

// =================================================================
//  DOM 構築(初回のみ・スタイルも注入)
// =================================================================
let built = false;
function ensureDOM() {
  if (built) return;
  built = true;

  const style = document.createElement('style');
  style.textContent = `
  #ol-root { position: fixed; inset: 0; z-index: 60; display: none;
    background: radial-gradient(circle at 50% 18%, rgba(20,40,60,.96), rgba(6,10,16,.98));
    color: #d7e8f2; font-family: 'Orbitron','Avenir Next',sans-serif;
    -webkit-user-select: none; user-select: none; padding: env(safe-area-inset-top) 16px env(safe-area-inset-bottom); }
  #ol-root.show { display: flex; flex-direction: column; align-items: center; }
  #ol-root .ol-wrap { width: 100%; max-width: 540px; margin: auto; display: flex; flex-direction: column; gap: 14px;
    max-height: 100%; overflow-y: auto; padding: 18px 4px; }
  #ol-root h2 { font-size: 18px; letter-spacing: 3px; color: var(--hud-cyan,#6ef3ff); text-align: center; }
  #ol-root .ol-sub { font-size: 12px; color: #8fb3c8; text-align: center; line-height: 1.6; }
  #ol-root .ol-card { background: rgba(10,18,26,.7); border: 1px solid rgba(110,243,255,.28);
    border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
  #ol-root .ol-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  #ol-root input { flex: 1; min-width: 0; font-family: inherit; font-size: 15px; padding: 11px 13px;
    border-radius: 9px; border: 1px solid rgba(110,243,255,.35); background: rgba(4,10,16,.85); color: #eaf6ff; }
  #ol-root input#ol-join-code { flex: 0 0 130px; letter-spacing: 5px; text-align: center; font-weight: 800; }
  #ol-root button { font-family: inherit; cursor: pointer; font-size: 14px; font-weight: 700; letter-spacing: 1px;
    padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(110,243,255,.4);
    background: rgba(20,34,46,.9); color: #d7e8f2; transition: transform .08s, border-color .15s; }
  #ol-root button:active { transform: scale(.95); }
  #ol-root button:disabled { opacity: .4; cursor: default; }
  #ol-root button.primary { background: linear-gradient(180deg,#37e0d6,#1b8f99); border-color:#5ff0e6; color:#04121a; }
  #ol-root button.go { background: linear-gradient(180deg,#ffd27a,#e89a2e); border-color:#ffd27a; color:#2a1800; font-size:16px; }
  #ol-root button.danger { border-color: rgba(255,80,80,.5); color:#ffb3b3; }
  #ol-root .ol-code { font-size: 34px; letter-spacing: 9px; font-weight: 900; color:#ffd24a; text-align:center; }
  #ol-root .ol-players { display:flex; flex-direction:column; gap:7px; }
  #ol-root .ol-p { display:flex; align-items:center; gap:9px; padding:9px 12px; border-radius:9px;
    background: rgba(4,10,16,.6); border:1px solid rgba(110,243,255,.18); font-size:14px; }
  #ol-root .ol-p .nm { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  #ol-root .ol-p .badge { font-size:11px; padding:2px 8px; border-radius:999px; }
  #ol-root .ol-p .badge.host { background: rgba(255,210,74,.18); color:#ffd24a; }
  #ol-root .ol-p .badge.rdy  { background: rgba(80,255,140,.16); color:#7dffa6; }
  #ol-root .ol-p .badge.wait { background: rgba(255,255,255,.08); color:#9bb; }
  #ol-root .ol-log { font-family: ui-monospace, monospace; font-size:11.5px; line-height:1.6; color:#8aa;
    white-space:pre-wrap; max-height:22vh; overflow-y:auto; background:rgba(2,6,10,.6);
    border:1px solid rgba(110,243,255,.14); border-radius:8px; padding:9px; }
  #ol-root .ol-foot { display:flex; gap:8px; }
  #ol-root .ol-foot button { flex:1; }
  #ol-root .ol-count { display:flex; align-items:center; gap:8px; }
  #ol-root .ol-count .cnt { flex:1; padding:9px 0; font-size:13px; }
  #ol-root .ol-count .cnt.active { background: linear-gradient(180deg,#37e0d6,#1b8f99); border-color:#5ff0e6; color:#04121a; }
  #ol-root .hide { display:none !important; }
  /* ハンガー内のオンラインボタン */
  #online-btn { font-family:inherit; cursor:pointer; }
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'ol-root';
  root.innerHTML = `
    <div class="ol-wrap">
      <h2>◣◢ ONLINE BATTLE</h2>
      <div class="ol-sub">最大 ${MAX_PLAYERS} 人で対戦。1人が「部屋を作る」→ 表示されたコードを他の人が入力して参加。</div>

      <!-- (1) 入室前 -->
      <div class="ol-card" id="ol-join-card">
        <div class="ol-sub" style="text-align:left;margin:0">表示名（対戦中、機体の頭上に色付きで表示されます）</div>
        <div class="ol-row"><input id="ol-name" placeholder="あなたの表示名" maxlength="12" autocomplete="off" spellcheck="false"></div>
        <div class="ol-row"><button id="ol-host-btn" class="primary" style="flex:1">🏠 部屋を作る(ホスト)</button></div>
        <div class="ol-row">
          <input id="ol-join-code" placeholder="コード" inputmode="numeric" maxlength="6" autocomplete="off">
          <button id="ol-join-btn" style="flex:1">🔌 参加する</button>
        </div>
      </div>

      <!-- (2) ロビー -->
      <div class="ol-card hide" id="ol-lobby-card">
        <div class="ol-sub">部屋コード(仲間に伝える)</div>
        <div class="ol-code" id="ol-code">------</div>
        <!-- ホスト専用: 対戦人数の設定 -->
        <div class="ol-count hide" id="ol-count-row">
          <span class="ol-sub" style="margin:0">対戦人数</span>
          <button class="cnt" data-n="2">2人</button>
          <button class="cnt" data-n="3">3人</button>
          <button class="cnt" data-n="4">4人</button>
        </div>
        <div class="ol-players" id="ol-players"></div>
        <div class="ol-foot">
          <button id="ol-ready-btn" class="primary">✔ 準備OK</button>
          <button id="ol-start-btn" class="go hide">⚔ いま居るメンバーで開始</button>
        </div>
      </div>

      <div class="ol-log" id="ol-log"></div>

      <div class="ol-foot">
        <button id="ol-leave-btn" class="danger hide">✖ 退出</button>
        <button id="ol-close-btn">← ハンガーへ戻る</button>
      </div>
    </div>`;
  document.body.appendChild(root);

  // ---- 配線 ----
  $('ol-host-btn').onclick = onHost;
  $('ol-join-btn').onclick = onJoin;
  $('ol-ready-btn').onclick = onToggleReady;
  $('ol-start-btn').onclick = onStart;
  $('ol-leave-btn').onclick = () => leaveRoom(true);
  $('ol-close-btn').onclick = onClose;
  $('ol-join-code').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });
  // 対戦人数セレクタ(ホスト専用)
  for (const b of document.querySelectorAll('#ol-count-row .cnt')) {
    b.onclick = () => {
      expectedPlayers = parseInt(b.dataset.n, 10) || 2;
      for (const x of document.querySelectorAll('#ol-count-row .cnt')) x.classList.toggle('active', x === b);
      log(`👥 対戦人数を ${expectedPlayers} 人に設定`);
      renderPlayersFromState();
    };
  }
}

const $ = (id) => document.getElementById(id);
function log(m) { const el = $('ol-log'); if (!el) return; el.textContent += m + '\n'; el.scrollTop = el.scrollHeight; }

// =================================================================
//  入退室・ロビー操作
// =================================================================
async function onHost() {
  if (net) return;
  myName = $('ol-name').value;
  try {
    setBusy(true);
    net = new NetHub(); wireNet();
    const code = await net.createRoom(myDisplayName());
    enterLobbyUI(code);
    log(`🏠 部屋を作成しました: ${code}`);
  } catch (e) { log('❌ ' + (e.message || e)); net = null; setBusy(false); }
}

async function onJoin() {
  if (net) return;
  myName = $('ol-name').value;
  const code = $('ol-join-code').value.trim();
  if (code.length < 6) { log('⚠️ 6桁のコードを入力してください'); return; }
  try {
    setBusy(true);
    net = new NetHub(); wireNet();
    await net.joinRoom(code, myDisplayName());
    enterLobbyUI(code);
    log(`🔌 部屋 ${code} に参加中… ホストとの接続を確立しています`);
  } catch (e) { log('❌ ' + (e.message || e)); net = null; setBusy(false); }
}

function wireNet() {
  net.on('lobby', (s) => renderLobby(s))
     .on('open', (id) => {
        log(`✅ 接続: ${id === 'host' ? 'ホスト' : id.slice(0,6)}`);
        // ゲストは接続できたら自分の持ち寄り情報(名前/機体/準備状態)をホストへ送る
        if (!net.isHost && id === 'host') net.toHost({ type: 'meta', name: myDisplayName(), cls: myClassKey(), ready: myReady });
        renderPlayersFromState();
     })
     .on('data', onNetData)
     .on('close', (id) => { log(`⚠️ 切断: ${id === 'host' ? 'ホスト' : id.slice(0,6)}`); if (id === 'host' && !net.isHost) { log('ホストが退出しました'); leaveRoom(false); } else renderPlayersFromState(); })
     .on('error', (w, e) => log(`❌ ${w}: ${e && e.message || e}`));
}

function onNetData(peerId, m) {
  if (!m) return;
  if (m.type === 'meta' && net.isHost) {          // ホスト: ゲストの持ち寄り情報を記録
    metaByPeer[peerId] = { name: m.name || peerId.slice(0,6), cls: m.cls || 'assault', ready: !!m.ready };
    renderPlayersFromState();
  } else if (m.type === 'ready' && net.isHost) {   // ホスト: ゲストの準備状態
    metaByPeer[peerId] = metaByPeer[peerId] || { name: peerId.slice(0,6), cls: 'assault' };
    metaByPeer[peerId].ready = !!m.ready;
    renderPlayersFromState();
  } else if (m.type === 'start' && !net.isHost) {  // ゲスト: 開始通知
    beginMatch(m.match, 'guest');
  } else {
    // ゲーム中のメッセージ(位置同期 t:'st'/'snap')はゲーム本体へ委譲
    try { window.RB_onNetData && window.RB_onNetData(peerId, m); } catch (e) {}
  }
}

function onToggleReady() {
  myReady = !myReady;
  $('ol-ready-btn').textContent = myReady ? '⏳ 準備解除' : '✔ 準備OK';
  $('ol-ready-btn').classList.toggle('primary', !myReady);
  if (net && !net.isHost) net.toHost({ type: 'ready', ready: myReady });
  if (net && net.isHost) net.setReady(myReady).catch(() => {});
  renderPlayersFromState();
}

function onStart() {
  if (!net || !net.isHost || started) return;
  const roster = buildRoster();
  if (roster.length < 2) { log('⚠️ もう1人以上の参加が必要です'); return; }
  // ホストがゲーム本体に「全クライアント共通の配置/編成/ステージ」を組ませる
  const match = (window.RB_buildOnlineMatch && window.RB_buildOnlineMatch(roster))
    || { seed: (Math.random() * 1e9) | 0, roster };
  net.broadcast({ type: 'start', match });     // ゲストへ通知(同じ match で開始)
  net.startMatch().catch(() => {});            // RTDB の state を playing に
  log('⚔ バトル開始!');
  beginMatch(match, 'host');
}

/** ホスト: 接続中のピア + 自分から roster を組む。各 entry の id は net 上の peerId。 */
function buildRoster() {
  const list = [{ id: net.selfId, name: myDisplayName(), cls: myClassKey(), host: true }];
  for (const gid of net.peers.keys()) {
    const meta = metaByPeer[gid] || {};
    if (net.peers.get(gid).open) list.push({ id: gid, name: meta.name || gid.slice(0,6), cls: meta.cls || 'assault', host: false });
  }
  return list.slice(0, MAX_PLAYERS);
}

/** ゲーム本体(M2)へ委譲。未実装なら案内だけ出す(M1b の動作確認用)。 */
async function beginMatch(match, role) {
  if (started) return;
  started = true;
  const netCtx = { net, role, selfId: net.selfId, match };
  hideRoot();
  if (typeof window.RB_startOnlineMatch === 'function') {
    try { await window.RB_startOnlineMatch(match, netCtx); log('⚔ バトル開始'); }
    catch (e) { console.error('[online] RB_startOnlineMatch 失敗:', e); log('❌ 開始処理エラー: ' + (e && e.message || e)); started = false; showRoot(); }
  } else {
    started = false;
    showRoot();
    log('ℹ️ 接続・ロビーは正常です(M1b 完了)。対戦同期(M2)は実装待ちのため、まだバトルには入りません。');
    log(`   roster: ${match.roster.map((p) => p.name + '(' + p.cls + ')' + (p.host ? '★' : '')).join(', ')}  seed=${match.seed}`);
  }
}

async function leaveRoom(goBack) {
  if (autoStartTimer) { clearTimeout(autoStartTimer); autoStartTimer = null; }
  try { if (net) await net.leave(); } catch (e) {}
  net = null; myReady = false; metaByPeer = {}; started = false;
  // UI を入室前に戻す
  $('ol-lobby-card').classList.add('hide');
  $('ol-join-card').classList.remove('hide');
  $('ol-leave-btn').classList.add('hide');
  $('ol-ready-btn').textContent = '✔ 準備OK';
  $('ol-ready-btn').classList.add('primary');
  setBusy(false);
  if (goBack) log('✖ 退出しました');
}

function onClose() {
  if (net) { leaveRoom(false); }
  hideRoot();
  // ハンガーへ戻る(ゲーム側が用意していれば呼ぶ)
  try { window.RB_backToHangarFromOnline && window.RB_backToHangarFromOnline(); } catch (e) {}
}

// =================================================================
//  表示更新
// =================================================================
function enterLobbyUI(code) {
  $('ol-join-card').classList.add('hide');
  $('ol-lobby-card').classList.remove('hide');
  $('ol-leave-btn').classList.remove('hide');
  $('ol-code').textContent = code;
  $('ol-start-btn').classList.toggle('hide', !net.isHost);  // スタートはホストのみ
  $('ol-count-row').classList.toggle('hide', !net.isHost);  // 対戦人数設定もホストのみ
  if (net.isHost) {
    for (const b of document.querySelectorAll('#ol-count-row .cnt')) b.classList.toggle('active', parseInt(b.dataset.n, 10) === expectedPlayers);
  }
  setBusy(false);
  renderPlayersFromState();
}

function renderLobby(_s) { renderPlayersFromState(); }

/** ロビーの参加者リストを描画(ホスト/ゲスト共通で見えるよう net 状態から構築) */
function renderPlayersFromState() {
  if (!net) return;
  const box = $('ol-players'); if (!box) return;
  let rows = [];
  if (net.isHost) {
    rows.push(playerRow(myDisplayName(), true, myReady));
    for (const gid of net.peers.keys()) {
      const p = net.peers.get(gid); const meta = metaByPeer[gid] || {};
      rows.push(playerRow(meta.name || gid.slice(0,6), false, !!meta.ready, p.open));
    }
  } else {
    // ゲスト: net.peers には 'host' のみ。ロビー全体は FB の players/room から(lobby イベント)
    const room = net._room || {};
    const hostName = (room.host && room.host.name) || 'HOST';
    rows.push(playerRow(hostName, true, !!(room.host && room.host.ready)));
    const players = room.players || {};
    for (const id of Object.keys(players)) {
      const me = id === net.selfId;
      rows.push(playerRow((players[id].name || id.slice(0,6)) + (me ? ' (あなた)' : ''), false, me ? myReady : !!players[id].ready));
    }
  }
  box.innerHTML = rows.join('');

  // ホスト: 定員到達 + 全員 READY で自動開始。手動「いま居るメンバーで開始」も可
  if (net.isHost) {
    const roster = buildRoster();
    const allReady = roster.length >= 2 && roster.every((p) => p.host ? myReady : (metaByPeer[p.id] && metaByPeer[p.id].ready));
    const full = roster.length >= expectedPlayers;
    const btn = $('ol-start-btn');
    btn.disabled = roster.length < 2;
    btn.textContent = (full && allReady) ? '⚔ まもなく自動開始…' : `⚔ いま居る ${roster.length} 人で開始`;
    maybeAutoStart(full && allReady);
  }
}

/** ホスト: 定員到達 + 全員 READY なら 1.5 秒後に自動開始(条件が崩れたら取消) */
function maybeAutoStart(ready) {
  if (!net || !net.isHost || started) return;
  if (ready && !autoStartTimer) {
    log(`✅ ${expectedPlayers} 人 揃って全員 準備完了！まもなく開始します…`);
    autoStartTimer = setTimeout(() => { autoStartTimer = null; if (!started) onStart(); }, 1500);
  } else if (!ready && autoStartTimer) {
    clearTimeout(autoStartTimer); autoStartTimer = null;
    log('⏸ 開始条件が崩れました(開始を中止)');
  }
}

function playerRow(name, host, ready, open = true) {
  const badge = host
    ? '<span class="badge host">HOST</span>'
    : (open ? (ready ? '<span class="badge rdy">READY</span>' : '<span class="badge wait">待機</span>')
            : '<span class="badge wait">接続中…</span>');
  return `<div class="ol-p"><span class="nm">${escapeHtml(name)}</span>${badge}</div>`;
}

function escapeHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

function setBusy(b) {
  ['ol-host-btn', 'ol-join-btn'].forEach((id) => { const el = $(id); if (el) el.disabled = b; });
}

// =================================================================
//  表示制御 / 公開 API
// =================================================================
function showRoot() { ensureDOM(); $('ol-root').classList.add('show'); }
function hideRoot() { if (built) $('ol-root').classList.remove('show'); }

/** ハンガーの「🌐 オンライン」から呼ばれる入口 */
window.RB_openOnline = function () {
  ensureDOM();
  // 名前の初期値はセーブのプレイヤー名 or 端末記憶
  if (!$('ol-name').value) {
    const saved = (window.RB_getOnlineClass && localStorage.getItem('rb_online_name')) || '';
    $('ol-name').value = saved;
  }
  $('ol-log').textContent = '';
  showRoot();
  log('準備OK。名前を入れて「部屋を作る」か「参加する」を押してください。');
};

// 名前を端末に記憶(任意)
window.addEventListener('beforeunload', () => {
  try { const v = $('ol-name'); if (v && v.value) localStorage.setItem('rb_online_name', v.value); } catch (e) {}
});

// ハンガーの「🌐 オンライン対戦」ボタンを配線(モジュールは defer 実行なので DOM は構築済み)
(function wireHangarButton() {
  const btn = document.getElementById('online-btn');
  if (btn) btn.addEventListener('click', () => window.RB_openOnline());
})();

console.log('[online] ロビー UI 読み込み完了 (M1b)');
