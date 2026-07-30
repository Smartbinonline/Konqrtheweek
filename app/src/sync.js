/* PocketBase cloud sync — one snapshot record per user + weekly_goals history rows. */
import PocketBase from "pocketbase";

var URL_KEY = "konqr_server_url";
var NOKEY = { requestKey: null }; // disable SDK auto-cancellation (debounced pushes overlap)

function Cloud() {
  this.pb = null;
  this._snapId = null;
  this._lastW = null;
  var u = null;
  try { u = localStorage.getItem(URL_KEY); } catch (e) {}
  if (u) this._init(u);
}

Cloud.prototype._init = function (url) {
  this.pb = new PocketBase(url);
};
Cloud.prototype.url = function () {
  try { return localStorage.getItem(URL_KEY) || ""; } catch (e) { return ""; }
};
Cloud.prototype.isAuthed = function () {
  return !!(this.pb && this.pb.authStore.isValid);
};
Cloud.prototype.email = function () {
  var r = this.pb && this.pb.authStore.record;
  return r ? r.email || "" : "";
};
Cloud.prototype.uid = function () {
  var r = this.pb && this.pb.authStore.record;
  return r ? r.id : null;
};
Cloud.prototype.login = async function (url, email, pass) {
  url = (url || "").replace(/\s+/g, "").replace(/\/+$/, ""); // strip ALL whitespace — mobile keyboards auto-insert spaces after "."
  if (!/^https?:\/\//.test(url)) url = "https://" + url;
  try { localStorage.setItem(URL_KEY, url); } catch (e) {}
  this._init(url);
  this._snapId = null;
  this._lastW = null;
  await this.pb.collection("users").authWithPassword(email, pass, NOKEY);
};
Cloud.prototype.logout = function () {
  this.unsubscribe();
  if (this.pb) this.pb.authStore.clear();
  this._snapId = null;
  this._lastW = null;
};
/* realtime: server pushes snapshot changes from other devices instantly */
Cloud.prototype.subscribe = async function (onData) {
  if (!this.pb || !this.isAuthed()) return;
  var self = this;
  try {
    await this.pb.collection("snapshots").subscribe("*", function (e) {
      try {
        if (!e || !e.record || !e.record.data) return;
        var d = e.record.data;
        if (d.savedAt && d.savedAt === self._lastSavedAt) return; // our own echo
        onData(d);
      } catch (err) {}
    });
  } catch (e) {}
};
Cloud.prototype.unsubscribe = function () {
  try { if (this.pb) this.pb.collection("snapshots").unsubscribe("*"); } catch (e) {}
};
Cloud.prototype.pull = async function () {
  var uid = this.uid();
  if (!uid) return null;
  try {
    // _ts busts the browser HTTP cache — identical GET URLs can otherwise return stale snapshots
    var rec = await this.pb.collection("snapshots").getFirstListItem('owner="' + uid + '"', { requestKey: null, query: { _ts: String(Date.now()) } });
    this._snapId = rec.id;
    return rec.data || null;
  } catch (e) {
    if (e && e.status === 404) { this._snapId = null; return null; }
    throw e;
  }
};
Cloud.prototype.push = async function (snapshot, wgoals) {
  var uid = this.uid();
  if (!uid) return;
  this._lastSavedAt = snapshot && snapshot.savedAt;
  if (this._snapId) {
    try {
      await this.pb.collection("snapshots").update(this._snapId, { data: snapshot }, NOKEY);
    } catch (e) {
      if (e && e.status === 404) this._snapId = null; else throw e;
    }
  }
  if (!this._snapId) {
    try {
      var rec = await this.pb.collection("snapshots").create({ owner: uid, data: snapshot }, NOKEY);
      this._snapId = rec.id;
    } catch (e) {
      // unique-index race: another device created it first — adopt and update
      var ex = await this.pb.collection("snapshots").getFirstListItem('owner="' + uid + '"', NOKEY);
      this._snapId = ex.id;
      await this.pb.collection("snapshots").update(ex.id, { data: snapshot }, NOKEY);
    }
  }
  await this._pushWeekly(uid, wgoals || {});
};
Cloud.prototype._pushWeekly = async function (uid, wgoals) {
  var wj = JSON.stringify(wgoals);
  if (wj === this._lastW) return;
  var prev = {};
  try { prev = this._lastW ? JSON.parse(this._lastW) : {}; } catch (e) {}
  var weeks = Object.keys(wgoals);
  for (var i = 0; i < weeks.length; i++) {
    var wk = weeks[i];
    if (JSON.stringify(wgoals[wk]) === JSON.stringify(prev[wk])) continue;
    try {
      var row = await this.pb.collection("weekly_goals").getFirstListItem('owner="' + uid + '" && week="' + wk + '"', NOKEY);
      await this.pb.collection("weekly_goals").update(row.id, { goals: wgoals[wk] }, NOKEY);
    } catch (e) {
      if (e && e.status === 404) {
        try { await this.pb.collection("weekly_goals").create({ owner: uid, week: wk, goals: wgoals[wk] }, NOKEY); } catch (e2) {}
      }
    }
  }
  this._lastW = wj;
};

export var cloud = new Cloud();
